import { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";
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
import { useParams } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import  { validateFHNVolunterActivity } from '.././utils/validateUser'
import { TypesData } from "../api/tabComponentsGet/TypesData";
const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [types, setTypes] = useState([]);
  const [endDate, setEndDate] = useState(false)

  useEffect(() => {
    TypesData(setTypes,"MesVoluntaryActivityEndReasons");
    console.log(types);
  }, []);

  const getTypesNames = (types) => {
    if (!types) return [];
    return types.map(type => type.name);
  };

  const handleDateChange = (event) => {
    if (event.target.value) {
      setEndDate(true); 
    } else {
      setEndDate(false);
    }
  };


  const columns = useMemo(() => [
    {
      accessorKey: "id",
      header: "Id",
      enableEditing: false,
      size: 80,
    },
    {
      accessorKey: "startDate",
      header: "Başlama tarixi",
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors?.startDate,
        helperText: validationErrors?.startDate,
        onFocus: () =>
          setValidationErrors({
            ...validationErrors,
            startDate: undefined,
          }),
        InputProps: {
          inputProps: {
            type: "date",
          },
        },
      },
    },
    {
      accessorKey: "endDate",
      header: "Bitmə tarixi",
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors?.endDate,
        helperText: validationErrors?.endDate,
        onFocus: () =>
          setValidationErrors({
            ...validationErrors,
            endDate: undefined,
          }),
        InputProps: {
          inputProps: {
            type: "date",
            onChange: handleDateChange,
          },
        },
      },
    },

      {
        accessorKey: "mesVoluntaryActivityEndReason.name",
        header: "Fəaliyyətin bitmə səbəbi",
        editVariant: "select",
        enableEditing: endDate,
        editSelectOptions: getTypesNames(types),
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.["mesVoluntaryActivityEndReason.name"],
          helperText: validationErrors?.["mesVoluntaryActivityEndReason.name"],
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
  ], [validationErrors, types, endDate]);
  

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser(types);
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser(types);
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  //CREATE action
  const handleCreateUser = async ({ values, table }) => {
    // setEndDate(values)
    const newValidationErrors = validateFHNVolunterActivity(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      console.log("Validation errors present:", newValidationErrors);  
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    const newValidationErrors = validateFHNVolunterActivity(values);
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
    enableRowNumbers: true,
    enableStickyHeader: true,
    rowNumberDisplayMode: "original",
    localization: {
      cancel: "İmtina",

      clearFilter: "Filteri təmizlə",
      clearSearch: "Axtarışı təmizlə",
      actions: "Əməliyyatlar",
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
    initialState: {
      columnVisibility: { id: false },
      columnPinning: { right: ["mrt-row-actions"] },
    },
    onCreatingRowCancel:  () => {
      setValidationErrors({});
      setEndDate(false);
    },
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5"> Əlavə edin</DialogTitle>
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
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.55594 12L2.84473 15L5.68957 14.25L13.9297 5.5605C14.1963 5.27921 14.3461 4.89775 14.3461 4.5C14.3461 4.10226 14.1963 3.72079 13.9297 3.4395L13.8073 3.3105C13.5406 3.0293 13.1789 2.87132 12.8017 2.87132C12.4245 2.87132 12.0628 3.0293 11.796 3.3105L3.55594 12Z"
                stroke="#4B7D83"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.55594 12L2.84473 15L5.68957 14.25L12.8017 6.75L10.668 4.5L3.55594 12Z"
                fill="#4B7D83"
              />
              <path
                d="M10.668 4.5L12.8017 6.75M9.24561 15H14.9353"
                stroke="#4B7D83"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
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
function useCreateUser(types) {
  let params = useParams();
  let userId = params.id;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      function findArrayElementByTitle(array, title) {
        if (title === undefined) {
          return null;
        } else {
          return array.find((element) => {
            return element.name === title;
          }).id;
        }
      }

      function convertDate(date) {
        const dateObject = new Date(date);

        // Get UTC time string
        const utcYear = dateObject.getUTCFullYear();
        const utcMonth = dateObject.getUTCMonth() + 1; // months are zero-indexed
        const utcDay = dateObject.getUTCDate();
        const utcHours = dateObject.getUTCHours();
        const utcMinutes = dateObject.getUTCMinutes();
        const utcSeconds = dateObject.getUTCSeconds();

        // Construct the UTC date string in ISO 8601 format
        const utcDateTimeString = `${utcYear}-${utcMonth
          .toString()
          .padStart(2, "0")}-${utcDay.toString().padStart(2, "0")}T${utcHours
          .toString()
          .padStart(2, "0")}:${utcMinutes
          .toString()
          .padStart(2, "0")}:${utcSeconds.toString().padStart(2, "0")}Z`;
        return utcDateTimeString;
      }

      const newUser = {
        volunteerId: userId,
        startDate: convertDate(user.startDate),
        endDate:
          convertDate(user.endDate) !== "NaN-NaN-NaNTNaN:NaN:NaNZ"
            ? convertDate(user.endDate)
            : null,
        // mesVoluntaryActivityEndReasons:
        //   user["mesVoluntaryActivityEndReason.name"],
        mesVoluntaryActivityEndReasonId: findArrayElementByTitle(
          types,
          user["mesVoluntaryActivityEndReason.name"]
        ),
        note: user.note,
      };
      console.log(newUser);
      const url = `https://api-volunteers.fhn.gov.az/api/v1/VoluntaryOfMeses`;
      const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };
      console.log(newUser);
      axios
        .post(url, newUser, { headers })
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
  let params = useParams();
  let userId = params.id;
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://api-volunteers.fhn.gov.az/api/v1/VoluntaryOfMeses/GetAll/${userId}`
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
//UPDATE hook (put user in api)
function useUpdateUser(types) {
  let params = useParams();
  let userId = params.id;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      //send api update request here
      function findArrayElementByTitle(array, title) {
        if (title === undefined) {
          return null;
        } else {
          return array.find((element) => {
            return element.name === title;
          }).id;
        }
      }
      const url = "https://api-volunteers.fhn.gov.az/api/v1/VoluntaryOfMeses";

      const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };
      function convertDate(date) {
        const dateObject = new Date(date);

        // Get UTC time string
        const utcYear = dateObject.getUTCFullYear();
        const utcMonth = dateObject.getUTCMonth() + 1; // months are zero-indexed
        const utcDay = dateObject.getUTCDate();
        const utcHours = dateObject.getUTCHours();
        const utcMinutes = dateObject.getUTCMinutes();
        const utcSeconds = dateObject.getUTCSeconds();

        // Construct the UTC date string in ISO 8601 format
        const utcDateTimeString = `${utcYear}-${utcMonth
          .toString()
          .padStart(2, "0")}-${utcDay.toString().padStart(2, "0")}T${utcHours
          .toString()
          .padStart(2, "0")}:${utcMinutes
          .toString()
          .padStart(2, "0")}:${utcSeconds.toString().padStart(2, "0")}Z`;
        return utcDateTimeString;
      }

      
      const newUser = {
        id: user.id,
        volunteerId: parseInt(userId),
        startDate: convertDate(user.startDate),
        endDate:
          convertDate(user.endDate) !== "NaN-NaN-NaNTNaN:NaN:NaNZ"
            ? convertDate(user.endDate)
            : null,
        mesVoluntaryActivityEndReasonId: findArrayElementByTitle(
          types,
          user["mesVoluntaryActivityEndReason.name"]
        ),
        note: user.note,
      };
      console.log(newUser);
      axios
        .put(url, newUser, { headers })
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
          `https://api-volunteers.fhn.gov.az/api/v1/VoluntaryOfMeses/${userId}`,
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



