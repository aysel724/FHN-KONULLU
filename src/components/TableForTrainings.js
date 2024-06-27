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
import { useEffect } from "react";
const Example = () => {
  const url = "https://reqres.in/api/users?page=2";

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
            key: "start",
            width: 32,
          },
          {
            header: "Bitmə tarixi",
            key: "finish",
            width: 30,
          },
          {
            header: "Tədbirin keçirilmə ünvanı",
            key: "adress",
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
    excel.download(fakeData1);
  };
  const pagBUTTON = document.querySelector(
    ".css-uqq6zz-MuiFormLabel-root-MuiInputLabel-root"
  );
  if (pagBUTTON) {
    pagBUTTON.textContent = "Göstərilən";
  }

  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [
     
      {
        accessorKey: `mesTrainingName.name`,
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
        header: "Tədbirin başlama tarixi",
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
        accessorKey: "trainingDuration",
        header: "Tədbirin müddəti",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.trainingDuration,
          helperText: validationErrors?.trainingDuration,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              trainingDuration: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "trainingPlace",
        header: "Tədbirin keçirilmə yeri",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.trainingPlace,
          helperText: validationErrors?.trainingPlace,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              trainingPlace: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "trainingMaster",
        header: " Tədbir üzrə məsul şəxs",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.trainingMaster,
          helperText: validationErrors?.trainingMaster,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              trainingMaster: undefined,
            }),
        },
      },
      {
        accessorKey: "volunteer",
        header: "iştirakçı sayı",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.volunteer,
          helperText: validationErrors?.volunteer,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              volunteer: undefined,
            }),
        },
      },
      {
        accessorKey: `trainingResult.name`,
        header: "Tədbirin nəticəsi",
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

    muiTableContainerProps: { sx: { maxHeight: '600px' } },
    enableColumnVirtualization: false,
    enableGlobalFilterModes: true,
    enableRowVirtualization: true,
    enablePagination:true,
    enableRowNumbers: true,
    enableStickyHeader: true,
    rowNumberDisplayMode: "original",
    columns,
    rowCount:5,
  
 
    rowVirtualizerOptions: { overscan: 2 }, //optionally customize the row virtualizer
    virtualizerProps: { overscan: 2 },
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
      columnPinning: { right: ["mrt-row-actions"] ,},
    },
    displayColumnDefOptions: { 'mrt-row-actions': { size: 150 } },
    

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
            table.setCreatingRow(true); //simplest way to open the create row modal with no default values
            //or you can pass in a row object to set default values with the `createRow` helper function
            // table.setCreatingRow(
            //   createRow(table, {
            //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
            //   }),
            // );
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

//CREATE hook (post new user to api)
function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      try {
        // Send API update request using Axios
        await axios.post("https://reqres.in/api/users", user);

        // Fake delay for demonstration purposes
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return Promise.resolve();
      } catch (error) {
        // Handle errors
        return Promise.reject(error);
      }
    },
    // Client-side optimistic update
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["users"], (prevEvents) => [
        ...prevEvents,
        {
          ...newUserInfo,
          id: Math.random() + 1,
        },
      ]);
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), // refetch users after mutation, disabled for demo
  });
}

function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await axios.get("https://api-volunteers.fhn.gov.az/api/v1/MesTrainings");
        console.log(response.data);
        // Assuming your API returns data in response.data
        return response.data.data;
      } catch (error) {
        // Handle errors here if needed
        console.error("Error fetching users:", error);
        throw error;
      }
    },
    refetchOnWindowFocus: false,
  });
} 

function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      try {
        // Make API call using Axios
        await axios.put("https://reqres.in/api/users/2", user);

        // Fake delay for demonstration
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return Promise.resolve();
      } catch (error) {
        // Handle error
        console.error("Error updating user:", error);
        throw error;
      }
    },
    // Client side optimistic update
    onMutate: (newEventInfo) => {
      queryClient.setQueryData(["users"], (prevEvents) =>
        prevEvents?.map((prevEvent) =>
          prevEvent.id === newEventInfo.id ? newEventInfo : prevEvent
        )
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), // refetch users after mutation, disabled for demo
  });
}
//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (eventId) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (eventId) => {
      queryClient.setQueryData(["events"], (prevEvets) =>
        prevEvets?.filter((event) => event.id !== eventId)
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
   name: !validateRequired(user.name)
      ? "First Name is Required"
      : "",
  };
}
