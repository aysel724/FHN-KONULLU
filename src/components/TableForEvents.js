import { useMemo, useState } from 'react';
import "../App.css"
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { fakeData1 } from '../makeData';
import DeleteIcon from '@mui/icons-material/Delete';
import { useExcelJS } from "react-use-exceljs"
const Example = () => {


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
  })
  const onClick = () => {
    excel.download(fakeData1)
  }
  const [validationErrors, setValidationErrors] = useState({});
  const tc = document.querySelector(".css-bbxzxe");
  if (tc){
     tc.innerHTML = "Əməliyyatlar";
  }
 const pagBUTTON = document.querySelector(".css-uqq6zz-MuiFormLabel-root-MuiInputLabel-root")
 if(pagBUTTON){
   pagBUTTON.textContent = "Göstərilən"
 }

  const columns = useMemo(
    () => [
    
      // {
      //   accessorKey: 'id',
      //   header: 'Id',
      //   enableEditing: false,
      //   size: 80,
      // },
      {
        accessorKey: 'name',
        header: 'Tədbirin adı',
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
        accessorKey: 'start',
        header: 'Tədbirin başlama tarixi',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.start,
          helperText: validationErrors?.start,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              start: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'finish',
        header: "Tədbirin başlama tarixi",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.finish,
          helperText: validationErrors?.finish,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              finish: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'time',
        header: 'Tədbirin müddəti',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.time,
          helperText: validationErrors?.time,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              time: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'adress',
        header: 'Tədbirin keçirilmə yeri',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.adress,
          helperText: validationErrors?.addres,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              adress: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'couch',
        header: ' Tədbir üzrə məsul şəxs',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.couch,
          helperText: validationErrors?.couch,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              couch: undefined,
            }),
        },
      },
      {
        accessorKey: 'number',
        header: 'iştirakçı sayı',
        muiEditTextFieldProps: {
          
          required: true,
          error: !!validationErrors?.number,
          helperText: validationErrors?.number,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              number: undefined,
            }),
        },
      },
      
      {
        accessorKey: 'note',
        header: 'qeyd',
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
    [validationErrors],
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
    if (window.confirm('təsdiq edirsiz?')) {
      deleteUser(row.original.id);
    }
  };

  

  const table = useMaterialReactTable({ 
    positionActionsColumn: "last",
    columns,
    data: fetchedUsers,
    
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {  
        minHeight: '500px',
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
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons  variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Düzəliş edin</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons  
       variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Düzəliş et">
          <IconButton onClick={() => table.setEditingRow(row)}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.55594 12L2.84473 15L5.68957 14.25L13.9297 5.5605C14.1963 5.27921 14.3461 4.89775 14.3461 4.5C14.3461 4.10226 14.1963 3.72079 13.9297 3.4395L13.8073 3.3105C13.5406 3.0293 13.1789 2.87132 12.8017 2.87132C12.4245 2.87132 12.0628 3.0293 11.796 3.3105L3.55594 12Z" stroke="#4B7D83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3.55594 12L2.84473 15L5.68957 14.25L12.8017 6.75L10.668 4.5L3.55594 12Z" fill="#4B7D83"/>
<path d="M10.668 4.5L12.8017 6.75M9.24561 15H14.9353" stroke="#4B7D83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
    renderTopToolbarCustomActions: ({ table }) => (< div style={{display:"flex", flexDirection:"row", gap:"20px"}}>
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
       <Button variant="contained" onClick={onClick}>Excelə export</Button></div>
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
      queryClient.setQueryData(['events'], (prevEvets) => [
        ...prevEvets,
        {
          ...newUserInfo,
          id: (Math.random()+1)
         
        }, 
      ]);
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get users from api)
function useGetUsers() {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      //send api request here
      await new Promise((resolve) => setTimeout(resolve, 5000)); //fake api call
      return Promise.resolve(fakeData1);
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put user in api)
function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (event) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newEventInfo) => {
      queryClient.setQueryData(['events'], (prevEvets) =>
        prevEvets?.map((prevEvets) =>
          prevEvets.id === newEventInfo.id ? newEventInfo : prevEvets,
        ),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
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
      queryClient.setQueryData(['events'], (prevEvets) =>
      prevEvets?.filter((event) => event.id !== eventId),
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
      ? 'First Name is Required'
      : '',
   start: !validateRequired(user.start) ? 'Last Name is Required' : '',
 
  };
}
