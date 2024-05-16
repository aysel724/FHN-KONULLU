import { useMemo, useRef, useState, useNavigate } from 'react';
import "../App.css"
import React from 'react';
import { Modal } from "react-bootstrap";
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
import { fakeData, usStates } from '../makeData';
import DeleteIcon from '@mui/icons-material/Delete';


const Example = () => {

  const columnVirtualizerInstanceRef = useRef(null);
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
      {  size: 90,
        accessorKey: 'fin',
        header: 'FİN KOD',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.fin,
          helperText: validationErrors?.fin,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              fin: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
    
      // {
      //   accessorKey: 'id',
      //   header: 'Id',
      //   enableEditing: false,
      //   size: 90,
      // },
      {
        accessorKey: 'firstName',
        header: 'Ad soyad',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.firstName,
          helperText: validationErrors?.firstName,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {size: 90,
        accessorKey: 'gender',
        header: 'Cins',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.gender,
          helperText: validationErrors?.gender,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              gender: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'status',
        header: "Status",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.status,
          helperText: validationErrors?.status,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
             status: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'birthdate',
        header: 'Doğum tarixi',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.birthdate,
          helperText: validationErrors?.birthdate,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              birthdate: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
     
      {size: 50,
        accessorKey: 'famylystatus',
        header: ' Ailə statusu',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.famylystatus,
          helperText: validationErrors?.famylystatus,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              famylystatus: undefined,
            }),
        },
      },
      {
        accessorKey: 'mail',
        header: 'Email',
        muiEditTextFieldProps: {
          type: 'email',
          required: true,
          error: !!validationErrors?.mail,
          helperText: validationErrors?.mail,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              mail: undefined,
            }),
        },
      },
      {
        accessorKey: 'start',
        header: 'Fəaliyyətə başlama tarixi',
        muiEditTextFieldProps: {
          label :"",
          type: 'date',
          required: true,
          error: !!validationErrors?.start,
          helperText: validationErrors?.start,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              start: undefined,
            }),
        },
      }, {
        accessorKey: 'finish',
        header: 'Fəaliyyətin bitmə vaxtı',
        muiEditTextFieldProps: {
          type: 'date',
          label :"",

          required: true,
          error: !!validationErrors?.finish,
          helperText: validationErrors?.finish,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              finish: undefined,
            }),
        },
      },
      
      {
        accessorKey: 'state',
        header: 'Status',
        editVariant: 'select',
        editSelectOptions: usStates,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
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
    // enableRowNumbers : true,
    // enableColumnPinning: true,

  positionActionsColumn: "last",

    columns,
    data: fetchedUsers,
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    initialState: {
      columnPinning: { right: ['mrt-row-actions'] },
    },

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
      
        <DialogTitle variant="h5">Yeni könüllü əlavə edin</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions >
          <MRT_EditActionButtons variant="text" table={table} row={row}  />
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
    renderRowActions: ({ row, table  , }) => (
      
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
    renderTopToolbarCustomActions: ({ table }) => (<>
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
       Yeni könüllü əlavə edin
      </Button>

<Button  
variant="contained"
onClick={() => {
  table.setCreatingRow(true); 

 
  //simplest way to open the create row modal with no default values
  //or you can pass in a row object to set default values with the `createRow` helper function
  // table.setCreatingRow(
  //   createRow(table, {
  //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
  //   }),
  // );
}}
>
IAMAS INTEGRASIYA

</Button> </>
    ),
  
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return <MaterialReactTable table={table}  />;
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
      queryClient.setQueryData(['users'], (prevUsers) => [
        ...prevUsers,
        {
          ...newUserInfo,
          id: (Math.random())
         
        }, 
      ]);
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get users from api)
function useGetUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      //send api request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve(fakeData);
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put user in api)
function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(['users'], (prevUsers) =>
        prevUsers?.map((prevUser) =>
          prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
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
    mutationFn: async (userId) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (userId) => {
      queryClient.setQueryData(['users'], (prevUsers) =>
        prevUsers?.filter((user) => user.id !== userId),
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
const validateEmail = (mail) =>
  !!mail.length &&
  mail
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

function validateUser(user) {
  return {
    firstName: !validateRequired(user.firstName)
      ? 'First Name is Required'
      : '',
    lastName: !validateRequired(user.fin) ? 'Last Name is Required' : '',
    email: !validateEmail(user.mail) ? 'Incorrect Email Format' : '',
  };
}
