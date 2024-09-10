import { useId, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";
import TableForEducationDegree from "../components/TableForEducationDegree";
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
import axios from "axios";
import { columnNames, headerNames } from "../makeData";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "../assets/icons/editIcon";

const Example = () => {
  const location = useLocation().pathname.substring(1);
  const [validationErrors, setValidationErrors] = useState({});

  const pagBUTTON = document.querySelector(
    ".css-uqq6zz-MuiFormLabel-root-MuiInputLabel-root"
  );
  if (pagBUTTON) {
    pagBUTTON.textContent = "Göstərilən say";
  }
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 50,
      },

      {
        accessorKey: "name",
        header: headerNames[location].h1,
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
        accessorKey: "priority",
        header: "Prioritet",
        muiEditTextFieldProps: {
          type: "number",
          required: true,
          error: !!validationErrors?.priority,
          helperText: validationErrors?.priority,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              priority: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
    ],

    columnNames[location].map((column) => {
      return {
        accessorKey: column.accessorKey,
        header: column.header,
        editVariant: column.isSelectable ? "select" : false,
        editSelectOptions: column.isSelectable ? column.isSelectable : [],
      };
    }),
    [validationErrors]
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
  } = useGetUsers(location);
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  //CREATE action
  const handleCreateUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);

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
    // const newValidationErrors = validateUser(values);
    // if (Object.values(newValidationErrors).some((error) => error)) {
    //   setValidationErrors(newValidationErrors);
    //   return;
    // }
    // setValidationErrors({});

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
    positionActionsColumn: "last",
    columns,
    enableRowNumbers: true,
    data: fetchedUsers,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    initialState: {
      columnVisibility: { id: false },
      columnPinning: { right: ["mrt-row-actions"] },
    },
    getRowId: (row) => row.id,
    displayColumnDefOptions: {
      "mrt-row-actions": { size: 150, header: "Əməliyyatlar" },
    },
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: "error",
          children: "Məlumatların yüklənməsi zamanı xəta baş verdi",
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
        <DialogTitle variant="h5">Əlavə edin</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents}
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
          {internalEditComponents}
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

function useCreateUser() {
  const location = useLocation().pathname.substring(1);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      console.log(user);
      const url = `https://api-volunteers.fhn.gov.az/api/v1/${location}`;
      const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };
      axios
        .post(url, user, { headers })
        .then((response) => {
          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["users"], (prevUsers) => [
        ...prevUsers,
        {
          ...newUserInfo,
        },
      ]);
    },
  });
}

function useGetUsers() {
  const location = useLocation().pathname.substring(1);
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://api-volunteers.fhn.gov.az/api/v1/${location}`,
          {
            headers: { accept: "*/*" },
          }
        );
        console.log(response.data);
        return response.data.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put user in api)
function useUpdateUser() {
  const location = useLocation().pathname.substring(1);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      const data = { ...user };
      console.log(data);
      //send api update request here

      const url = `https://api-volunteers.fhn.gov.az/api/v1/${location}`;

      const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };
      console.log(user);
      axios
        .put(url, data, { headers })
        .then((response) => {
          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    //client side optimistic update
    //client side optimistic update
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["users"], (prevUsers) =>
        prevUsers?.map((prevUser) =>
          prevUser.id === newUserInfo.id ? newUserInfo : prevUser
        )
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
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
          `https://api-volunteers.fhn.gov.az/api/v1/${location}/${userId}`,
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

const Uxtable = () => {
  const location = useLocation().pathname.substring(1);
  return (
    //Put this with your other react-query providers near root of your app
    <>
      <div>
        <h1>{headerNames[location].h1}</h1>
      </div>

      <QueryClientProvider client={queryClient}>
        <Example />
      </QueryClientProvider>
    </>
  );
};

export default Uxtable;
const validateRequired = (value) => {
  return !!value && !!value.length;
};

function validateUser(user) {
  return {
    name: !validateRequired(user.name) ? "Xana boş qala bilməz" : "",
    priority: !validateRequired(user.priority) ? "Xana boş qala bilməz" : "",
  };
}
// return {
//   firstName: !validateRequired(user.firstName)
//     ? "First Name is Required"
//     : "",
//   lastName: !validateRequired(user.fin) ? "Last Name is Required" : "",
//   email: !validateEmail(user.mail) ? "Incorrect Email Format" : "",
// };
