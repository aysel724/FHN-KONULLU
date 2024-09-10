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
import { edudegree, edutype } from "../makeData";
import DeleteIcon from "@mui/icons-material/Delete";

const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [types, setTypes] = useState([]);
  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    const TypesData = async () => {
      try {
        const response = await axios.get(
          `https://api-volunteers.fhn.gov.az/api/v1/EducationTypes`,
          {
            headers: { accept: "*/*" },
          }
        );
        console.log(response.data.data);
        const newData = response.data.data.map((e) => {
          const user = {
            name: e.name,
            id: e.id,
          };

          return user;
        });

        console.log(newData);
        setTypes(newData);
      } catch (error) {
        // Handle errors here if needed
        console.error("Error fetching users:", error);
        throw error;
      }
    };
    TypesData();
  }, []);

  function getTypesNames(arr) {
    return arr.map((e) => e.name);
  }

  useEffect(() => {
    const TypesData = async () => {
      try {
        const response = await axios.get(
          `https://api-volunteers.fhn.gov.az/api/v1/EducationDegrees`,
          {
            headers: { accept: "*/*" },
          }
        );
        console.log(response.data.data);
        const newData = response.data.data.map((e) => {
          const user = {
            name: e.name,
            id: e.id,
          };

          return user;
        });

        console.log(newData);
        setDegrees(newData);
      } catch (error) {
        // Handle errors here if needed
        console.error("Error fetching users:", error);
        throw error;
      }
    };
    TypesData();
  }, []);

  function getdegreeNames(arr) {
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
        accessorKey: "educationEnterprise",
        header: "Təhsil aldığı müəssəsinin adı",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.educationEnterprise,
          helperText: validationErrors?.educationEnterprise,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              educationEnterprise: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },

      {
        accessorKey: "educationType.name",
        header: "Təhsilin tip",
        editVariant: "select",
        editSelectOptions: getTypesNames(types),
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
        },
      },
      {
        accessorKey: "degree",
        header: "Təhsilinin dərəcəsi",
        editVariant: "select",
        editSelectOptions: getdegreeNames(degrees),
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.degree,
          helperText: validationErrors?.degree,
        },
      },

      {
        accessorKey: "diplomaSerialNumber",
        header: "Diplomun seriya və nömrəsi",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.diplomaSerialNumber,
          helperText: validationErrors?.diplomaSerialNumber,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              diplomaSerialNumber: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "qualification",
        header: "İxtisas",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.qualification,
          helperText: validationErrors?.qualification,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              qualification: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "faculty",
        header: "Fakültə",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.faculty,
          helperText: validationErrors?.faculty,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              faculty: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },

      {
        accessorKey: "diplomaGivenDate",
        header: "Diplomun verilmə tarixi",
        muiEditTextFieldProps: {
          label: "",
          required: true,
          error: !!validationErrors?.diplomaGivenDate,
          helperText: "Diplomun verilmə tarixi",

          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              diplomaGivenDate: undefined,
            }),
          InputProps: {
            inputProps: {
              type: "date", // Set the input type to 'date'
            },
          },
        },
        //optionally add validation checking for onBlur or onChange
      },

      {
        accessorKey: "startDate",
        header: "Başlama tarixi",
        muiEditTextFieldProps: {
          label: "",
          required: true,
          error: !!validationErrors?.startDate,
          helperText: "Başlama tarixi",
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              startDate: undefined,
            }),
          InputProps: {
            inputProps: {
              type: "date",
              helperText: "", // Set the input type to 'date'
            },
          },
        },
      },
      {
        accessorKey: "endDate",
        header: "Bitmə tarixi",
        muiEditTextFieldProps: {
          label: "",
          required: true,
          error: !!validationErrors?.endDate,
          helperText: "Bitmə tarixi",
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              endDate: undefined,
            }),
          InputProps: {
            inputProps: {
              type: "date", // Set the input type to 'date'
            },
          },
        },
      },
    ],
    [validationErrors, types, degrees]
  );

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
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.55594 12L2.84473 15L5.68957 14.25L12.8017 6.75L10.668 4.5L3.55594 12Z"
                fill="#4B7D83"
              />
              <path
                d="M10.668 4.5L12.8017 6.75M9.24561 15H14.9353"
                stroke="#4B7D83"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
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
      console.log(user);

      const url = `https://api-volunteers.fhn.gov.az/api/v1/Education`;

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
        volunteerId: userId,
        faculty: user.faculty,
        qualification: user.qualification,
        diplomaSerialNumber: user.diplomaSerialNumber,
        diplomaGivenDate: convertDate(user.diplomaGivenDate),
        educationEnterprise: user.educationEnterprise,
        startDate: convertDate(user.startDate),
        endDate: convertDate(user.endDate),
        educationTypeId: findArrayElementByTitle(
          types,
          user["educationType.name"]
        ),
      };
      console.log(newUser);

      try {
        const response = await axios.post(url, newUser, { headers });
        // window.location.reload();
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
          `https://api-volunteers.fhn.gov.az/api/v1/Education/GetAll/${userId}`
        );

        const users = response.data.data.map((user) => ({
          ...user,

          degree: `${user.educationType.educationDegrees[0].name}`,
        }));
        console.log(response.data.data, "users");

        return users;
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
      console.log(user);

      const url = `https://api-volunteers.fhn.gov.az/api/v1/Education`;

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
        volunteerId: userId,
        faculty: user.faculty,
        qualification: user.qualification,
        diplomaSerialNumber: user.diplomaSerialNumber,
        diplomaGivenDate: convertDate(user.diplomaGivenDate),
        educationEnterprise: user.educationEnterprise,
        startDate: convertDate(user.startDate),
        endDate: convertDate(user.endDate),
        educationTypeId: findArrayElementByTitle(
          types,
          user["educationType.name"]
        ),
      };
      console.log(newUser);

      try {
        const response = await axios.put(url, newUser, { headers });
        // window.location.reload();
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

//DELETE hook (delete user in api)
function useDeleteUser() {
  const location = useLocation().pathname.substring(1);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      console.log(userId);
      try {
        const response = await axios.delete(
          `https://api-volunteers.fhn.gov.az/api/v1/Education/${userId}`,
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

const validateRequired = (value) => !!value.length;

function validateUser(user) {
  return {
    gender: !validateRequired(user.gender) ? "First Name is Required" : "",
  };
}
