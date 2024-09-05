import { useMemo, useState } from "react";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { fakeData1 } from "../makeData";
import DeleteIcon from "@mui/icons-material/Delete";
import { useExcelJS } from "react-use-exceljs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { H1 } from "@blueprintjs/core";
const Example = () => {
  const navigate = useNavigate();
  const excel = useExcelJS({
    filename: "Tədbirlər siyahısı.xlsx",
    worksheets: [
      {
        name: "Sheet 1",
        columns: [
          {
            header: "Tədbirin adı",
            key: "name",
            width: 30,
          },
          {
            header: "Başlama vaxtı",
            key: "startDate",
            width: 32,
          },
          {
            header: "Bitmə tarixi",
            key: "finishDate",
            width: 30,
          },
          {
            header: "Tədbirin keçirilmə ünvanı",
            key: "eventPlace",
            width: 30,
          },
          {
            header: "Tədbirin müddəti",
            key: "time",
            width: 32,
          },
          {
            header: "Tədbir üzrə məsul şəxs",
            key: "couch",
            width: 30,
          },
        ],
      },
    ],
  });
  const onClick = () => {
    excel.download();
  };
  const pagBUTTON = document.querySelector(
    ".css-uqq6zz-MuiFormLabel-root-MuiInputLabel-root"
  );
  if (pagBUTTON) {
    pagBUTTON.textContent = "Göstərilən";
  }
  const [types, setTypes] = useState([]);
  useEffect(() => {
    const TypesData = async () => {
      try {
        const response = await axios.get(
          `https://api-volunteers.fhn.gov.az/api/v1/Volunteers`,
          {
            headers: { accept: "*/*" },
          }
        );
        console.log(response.data.data);
        const newData = response.data.data.map((e) => {
          const user = {
            name: e.name,
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
    console.log(arr); // This logs the input array `arr`

    // Mapping over the array to create objects with index as `key` and `name` from each element
    const mappedArray = arr.map((e) => e);
    console.log(mappedArray); // This logs the mapped array with `key` and `name`

    return mappedArray; // Returning the mapped array
  }

  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: true,
        size: 80,
      },
      {
        accessorKey: "name",
        header: "Tədbirin adı",
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
        accessorKey: "departmentInCharge",
        header: "Tədbiri keçirən qurum",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.departmentInCharge,
          helperText: validationErrors?.departmentInCharge,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              departmentInCharge: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "startDate",
        header: "Tədbirin başlama tarixi",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.startDate,
          helperText: validationErrors?.startDate,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              startDate: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "finishDate",
        header: "Tədbirin bitmə tarixi",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.finishDate,
          helperText: validationErrors?.finishDate,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              finishDate: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "eventDuration",
        header: "Tədbirin müddəti",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.eventDuration,
          helperText: validationErrors?.eventDuration,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              eventDuration: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "eventPlace",
        header: "Tədbirin keçirilmə yeri",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.eventPlace,
          helperText: validationErrors?.eventPlace,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              eventPlace: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "personInCharge",
        header: " Tədbir üzrə məsul şəxs",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.personInCharge,
          helperText: validationErrors?.personInCharge,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              personInCharge: undefined,
            }),
        },
      },

      {
        accessorKey: "note",
        header: "qeyd",
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
        },
      },
      {
        accessorKey: "sum",
        header: "iştirakçı sayı",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.id,
          helperText: validationErrors?.id,

          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              id: undefined,
            }),
        },
      },
      // {
      //   accessorKey: "volunteers",
      //   header: "konulluler",
      //   muiEditTextFieldProps: {
      //     required: true,
      //     error: !!validationErrors?.volunteers,
      //     helperText: validationErrors?.volunteers,
      //     //remove any previous validation errors when user focuses on the input
      //     onFocus: () =>
      //       setValidationErrors({
      //         ...validationErrors,
      //         volunteers: undefined,
      //       }),
      //   },
      // },

      // {
      //   accessorKey: "volunteers",
      //   header: "konulluler",
      //   editVariant: "select",
      //   editSelectOptions: getTypesNames(types),
      //   muiEditTextFieldProps: {
      //     select: true,
      //     error: !!validationErrors?.state,
      //     helperText: validationErrors?.state,
      //   },
      // },
      // {
      //   accessorKey: "volunteerIds",
      //   header: "konulluler",
      //   muiEditTextFieldProps: {
      //     required: true,
      //     error: !!validationErrors?.volunteerIds,
      //     helperText: validationErrors?.volunteerIds,
      //     //remove any previous validation errors when user focuses on the input
      //     onFocus: () =>
      //       setValidationErrors({
      //         ...validationErrors,
      //         volunteerIds: undefined,
      //       }),
      //   },
      // },
    ],
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
  } = useGetUsers();
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

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
    const newValidationErrors = validateUser(values);
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
    positionActionsColumn: "last",
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
    muiTableContainerProps: { sx: { maxHeight: "600px" } },

    enableRowNumbers: true,
    enableStickyHeader: true,
    rowNumberDisplayMode: "original",
    columns,

    //optionally customize the row virtualizer

    data: fetchedUsers,
    muiTableBodyRowProps: ({ row }) => ({
      sx: {
        cursor: "pointer", //you might want to change the cursor too when adding an onClick
      },
    }),
    MRT_EditActionButtons,
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
        <DialogTitle variant="h5">Yeni tədbir əlavə edin</DialogTitle>
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
        <Tooltip title="Ətraflı">
          <VisibilityIcon
            style={{ marginTop: "8px" }}
            onClick={() => navigate(`/events/${row.id}`)}
            variant="contained"
          >
            Ətraflı
          </VisibilityIcon>
        </Tooltip>
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
      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/newevents");
          }}
        >
          Yeni tədbir əlavə et
        </Button>
        <Button variant="contained" onClick={onClick}>
          Excelə export
        </Button>
      </div>
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      console.log(user);
      const url = `https://api-volunteers.fhn.gov.az/api/v1/Events`;
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
      queryClient.setQueryData(["users"], (prevUsers = []) => [
        ...prevUsers,
        newUserInfo,
      ]);
    },
  });
}

function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          "https://api-volunteers.fhn.gov.az/api/v1/Events"
        );
        const users = response.data.data.map((user) => ({
          ...user,

          sum: user.volunteers.length,
        }));

        return users;
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      const data = { ...user };
      console.log(data);
      //send api update request here

      const url = `https://api-volunteers.fhn.gov.az/api/v1/Events`;

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

function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      console.log(userId);

      try {
        const response = await axios.delete(
          `https://api-volunteers.fhn.gov.az/api/v1/Events/${userId}`,
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
    name: !validateRequired(user.name) ? "Xana boş qala bilməz" : "",
    startDate: !validateRequired(user.startDate) ? "Xana boş qala bilməz" : "",
    personInCharge: !validateRequired(user.personInCharge)
      ? "Xana boş qala bilməz"
      : "",
    finishDate: !validateRequired(user.finishDate)
      ? "Xana boş qala bilməz"
      : "",
  };
}
