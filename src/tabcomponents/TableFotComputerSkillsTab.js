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
import { TypesData } from "../api/tabComponentsGet/TypesData";
import EditIcon from "../assets/editIcon";

const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [types, setTypes] = useState([]);
  const [degrees, setDegrees] = useState([]);
  useEffect(() => {
    TypesData(setTypes,"ComputerSkillNames");
    TypesData(setTypes,"SkillLevels");

  }, []);

  function getTypesNames(arr) {
    return arr.map((e) => e.name);
  }

  function getDegreesNames(arr) {
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
        accessorKey: "computerSkillName.name",
        header: "Biliyin adı",
        editVariant: "select",
        editSelectOptions: getTypesNames(types),
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
        },
      },

      {
        accessorKey: "skillLevel.name",
        header: "Biliyin dərəcəsi",
        editVariant: "select",
        editSelectOptions: getDegreesNames(degrees),
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
        },
      },
      {
        accessorKey: "note",
        header: "Qeyd",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.note,
          helperText: validationErrors?.note,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              note: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },

      {
        accessorKey: "priority",
        header: "Prioritet",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.priority,
          helperText: validationErrors?.priority,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              priority: undefined,
            }),
        },
      },
    ],
    [validationErrors, types, degrees]
  );

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser(
    types,
    degrees
  );
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateUser(
    types,
    degrees
  );
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  //CREATE action
  const handleCreateUser = async ({ values, table }) => {
    // const newValidationErrors = validateUser(values);
    // if (Object.values(newValidationErrors).some((error) => error)) {
    //   setValidationErrors(newValidationErrors);
    //   return;
    // }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    // const newValidationErrors = validateUser(values);
    // if (Object.values(newValidationErrors).some((error) => error)) {
    //   setValidationErrors(newValidationErrors);
    //   return;
    // }
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
    enableRowNumbers: true,
    enableStickyHeader: true,
    rowNumberDisplayMode: "original",
    data: fetchedUsers,
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    initialState: {
      columnVisibility: { id: false },
      columnPinning: { right: ["mrt-row-actions"] },
    },
    displayColumnDefOptions: {
      "mrt-row-actions": { size: 150, header: "Əməliyyatlar" },
    },

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
          table.setCreatingRow(true); 
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

function useCreateUser(types, degrees) {
  let params = useParams();
  let userId = params.id;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      console.log(user);

      const url = `https://api-volunteers.fhn.gov.az/api/v1/ComputerSkills`;

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
        }).id;
      }

      const newUser = {
        priority: user.priority,
        note: user.note,
        volunteerId: userId,
        computerSkillNameId: findArrayElementByTitle(
          types,
          user["computerSkillName.name"]
        ),
        skillLevelId: findArrayElementByTitle(degrees, user["skillLevel.name"]),
      };
      // console.log(newUser);

      try {
        const response = await axios.post(url, newUser, { headers });
        window.location.reload();
        // console.log(user);
        console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    },
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["users"], (prevUsers = []) => [
        ...prevUsers,
        {
          ...newUserInfo,
        },
      ]);
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), // Uncomment to refetch users after mutation
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
          `https://api-volunteers.fhn.gov.az/api/v1/ComputerSkills/GetAll/${userId}`
        );

        console.log(response.data.data);
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

function useUpdateUser(types, degrees) {
  let params = useParams();
  let userId = params.id;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      console.log(user);

      const url = `https://api-volunteers.fhn.gov.az/api/v1/ComputerSkills`;

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
        }).id;
      }

      const newUser = {
        id: user.id,
        priority: user.priority,
        note: user.note,
        volunteerId: userId,
        computerSkillNameId: findArrayElementByTitle(
          types,
          user["computerSkillName.name"]
        ),
        skillLevelId: findArrayElementByTitle(degrees, user["skillLevel.name"]),
      };
      // console.log(newUser);

      try {
        const response = await axios.put(url, newUser, { headers });
        window.location.reload();
        // console.log(user);
        console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    },
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["users"], (prevUsers = []) => [
        ...prevUsers,
        {
          ...newUserInfo,
        },
      ]);
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), // Uncomment to refetch users after mutation
  });
}

function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      console.log(userId);
      try {
        const response = await axios.delete(
          `https://api-volunteers.fhn.gov.az/api/v1/ComputerSkills/${userId}`,
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
    // onSettled: () => queryClientes({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
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


