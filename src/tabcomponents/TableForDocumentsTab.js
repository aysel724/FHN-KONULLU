import { useMemo, useState, useEffect } from "react";
import "../App.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import { validateElectronDocument } from "../utils/validateUser";
import { TypesData } from "../api/tabComponentsGet/TypesData";
import EditIcon from "../assets/editIcon";

const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [types, setTypes] = useState([]);

  useEffect(() => {
    TypesData(setTypes,"ElectronicDocumentTypes");
  }, []);

  function getTypesNames(arr) {
    return arr.map((e) => e.name);
  }
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "name",
        header: "Sənədin adı",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },

      {
        accessorKey: "electronicDocumentType",
        header: "Sənədin növü",
        editVariant: "select",
        editSelectOptions: getTypesNames(types),
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.electronicDocumentType,
          helperText: validationErrors?.electronicDocumentType,
        },
      },
      {
        accessorKey: "note",
        header: "Qeyd",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.note,
          helperText: validationErrors?.note,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              note: undefined,
            }),
        },
      },
    ],
    [validationErrors, types]
  );

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  //CREATE action
  const handleCreateUser = async ({ values, table }) => {
    const newValidationErrors = validateElectronDocument(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    const newValidationErrors = validateElectronDocument(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm("təsdiq edirsiz?")) {
      deleteUser(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    localization: {
      cancel: "İmtina",

      clearFilter: "Filteri təmizlə",
      clearSearch: "Axtarışı təmizlə",

      clearSort: "Sıralamani təmizlə",
      clickToCopy: "Kopyalamaq üçün klik edin",
      copy: "Kopyala",
      collapse: "Collapse",

      columnActions: "Əməliyyatlar",
      copiedToClipboard: "Buferə kopyalandı",

      edit: "Düzəliş et",
      expand: "Genişləndirin",
      expandAll: "Expand all",
      rowNumber: "No",
      rowNumbers: "Sıra nömrələri",
      rowsPerPage: "Hər səhifədə sətir sayı",
      save: "Yadda saxla",
      search: "Axtar",
      selectedCountOfRowCountRowsSelected:
        "{selectedCount} of {rowCount} row(s) selected",
      select: "Seç",
      showAll: "Hamısını göstər",
      showAllColumns: "Bütün sütunları göstərin",
      showHideColumns: "Sütunları göstər/gizlə",
      showHideFilters: "Filterləri göstər/gizlə",
      showHideSearch: "Axtarışı göstər/gizlə",
      sortByColumnAsc: "Artma üzrə çeşidləyin",
      sortByColumnDesc: "Azalma üzrə çeşidləyin",
      sortedByColumnAsc: "Artma üzrə çeşidləyin",
      sortedByColumnDesc: "Azalma üzrə çeşidləyin",
      thenBy: ", then by ",
      groupByColumn: "{column} üzrə qruplaşdırın",
      groupedBy: "Qruplaşdırın ",
      hideAll: "Hamısını gizlədin",
      hideColumn: "{column} sütununu gizlədin",
      toggleDensity: "Sıxlığı dəyiş",
      filterByColumn: "{column} üzrə filtrləmə",
      filteringByColumn:
        " {column}  üzrə filtrləmə- {filterType} {filterValue}",
      toggleFullScreen: "Tam ekrana keçid",
      toggleSelectAll: "Toggle select all",
      toggleSelectRow: "Toggle select row",
      toggleVisibility: "Görünüşü dəyişdirin",
      ungroupByColumn: "Ungroup by {column}",
      noRecordsToDisplay: "Göstəriləcək qeyd yoxdur",
      noResultsFound: "Heç bir nəticə tapılmadı",
      // ... and many more - see link below for full list of translation keys
    },
    columns,
    data: fetchedUsers,
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5"> əlavə edin</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Düzəliş edin</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Düzəliş et">
          <IconButton onClick={() => table.setEditingRow(row)}>
           <EditIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Sil">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Əlavə edin
      </Button>
    ),

    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return <MaterialReactTable table={table} />;
};

//CREATE hook (post new user to api)
function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["users"], (prevUsers) => [
        ...prevUsers,
        {
          ...newUserInfo,
          id: Math.random(),
        },
      ]);
    },
  });
}

function useGetUsers() {
  let params = useParams();
  let userId = params.id;
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://api-volunteers.fhn.gov.az/api/v1/ElectronicDocuments/GetAll/${userId}`
        );

        return response.data.data;
      } catch (error) {
        // Handle errors here if needed
        console.error("Xəta:", error);
        throw error;
      }
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put user in api)
function useUpdateUser(types) {
  const location = useLocation().pathname.substring(1);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      const data = { ...user };
      console.log(data);

      const url = `https://api-volunteers.fhn.gov.az//api/v1/Education`;

      const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };
      function findArrayElementByTitle(array, title) {
        console.log(
          array.find((element) => {
            return element.name === title;
          })
        );
        return array.find((element) => {
          return element.name === title;
        });
      }

      const newUser = {
        name: user.name,
        priority: user.priority,
        educationTypeId: findArrayElementByTitle(
          types,
          user["educationType.name"]
        ).id,
      };
    },

    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["users"], (prevUsers) =>
        prevUsers?.map((prevUser) =>
          prevUser.id === newUserInfo.id ? newUserInfo : prevUser
        )
      );
    },
  });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
  const location = useLocation().pathname.substring(1);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      console.log(userId);
      try {
        const response = await axios.delete(
          `https://api-volunteers.fhn.gov.az/api/v1/ElectronicDocuments/${userId}`,
          {
            headers: { accept: "*/*" },
          }
        );
        console.log(response.data);

        // Assuming your API returns data in response.data
        return response.data.data;
      } catch (error) {
        // Handle errors here if needed
        console.error("Error fetching users:", error);
        throw error;
      }
    },
    //client side optimistic update
    onMutate: (userId) => {
      queryClient.setQueryData(["users"], (prevUsers) =>
        prevUsers?.filter((user) => user.id !== userId)
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}
const queryClient = new QueryClient();

const Uxtable = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default Uxtable;


