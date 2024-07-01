import { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "../App.css";
import React from "react";
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
  GridToolbar
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { usersData, usStates } from "../makeData";
import DeleteIcon from "@mui/icons-material/Delete";

import { useExcelJS } from "react-use-exceljs";

const Example = () => {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState([]);
  const virtualizerInstanceRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
 
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    //scroll to the top of the table when the sorting changes
    try {
      virtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting]);




  const excel = useExcelJS({
    filename: "Könüllülər.xlsx",
    worksheets: [
      {
        name: "Sheet 1",
        columns: [
          {
            header: "fin",
            key: "userData.fin",
            width: 30,
          },
          {
            header: "Ad soyad",
            key: "userData.name",
            width: 32,
          },
          {
            header: "Doğum tarixi.",
            key: "birthDate",
            width: 30,
          },
          {
            header: "ailə statusu",
            key: "maritalStatus",
            width: 30,
          },
         
        ],
      },
    ],
  });
  const onClick = () => {
    excel.download(usersData);
  };
  const navigate = useNavigate();

  const [validationErrors, setValidationErrors] = useState({});

  const pagBUTTON = document.querySelector(
    ".css-uqq6zz-MuiFormLabel-root-MuiInputLabel-root"
  );
  if (pagBUTTON) {
    pagBUTTON.textContent = "Göstərilən";
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'userId',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },

      {
        accessorKey: "name",
        header: "Ad soyad",
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
        size: 160,
        accessorKey: "fin",
        header: "FİN KOD",
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
      // form.append('name', userData.name);
      // form.append('surname', userData.surname);
      // form.append('fatherName', userData.fatherName);
      // form.append('gender', userData.gender);
      // form.append('militaryReward', userData.militaryReward);
      // form.append('birthDate', userData.birthDate);
      // form.append('height', userData.height);
      // form.append('citizenship', userData.citizenship);
      // form.append('maritalStatus', userData.maritalStatus);
      // form.append('identityCardGivenStructureName', userData.identityCardGivenStructureName);
      // form.append('identityCardReceivingDate', userData.identityCardReceivingDate);
      // form.append('registrationAddress', userData.registrationAddress);
      // form.append('currentAddress', userData.currentAddress);
      // form.append('photo', userData.photo); 
     
      {
        size: 90,
        accessorKey: "gender",
        header: "Cins",
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
        accessorKey: "status",
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
        accessorKey: "birthDate",
        header: "Doğum tarixi",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.birthDate,
          helperText: validationErrors?.birthDate,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              birthDate: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },

      {
   
        accessorKey: "maritalStatus",
        header: " Ailə statusu",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.maritalStatus,
          helperText: validationErrors?.maritalStatus,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              maritalStatus: undefined,
            }),
        },
      },
      {
        accessorKey: "email", 
        header: "E-poçt ünvanı",
        muiEditTextFieldProps: {
          type: "email",
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
        accessorKey: "phoneNumber1",
        header: "Əlaqə nömrəsi",
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.phoneNumber1,
          helperText: validationErrors?.phoneNumber1,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              phoneNumber1: undefined,
            }),
        },
      },
      {
        accessorKey:`startDate`,
        header: "Fəaliyyətə başlama tarixi",
        muiEditTextFieldProps: {
          label: "",
     
          required: true,
          error: !!validationErrors?.startDate,
          helperText: validationErrors?.startDate,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              startDate: undefined,
            }),
        },
      },
      // {
      //   accessorKey: `mesTrainings.finishDate`,
      //   header: "Fəaliyyətin bitmə vaxtı",
      //   muiEditTextFieldProps: {
    
      //     label: "",
      //     required: true,
      //     error: !!validationErrors?.finishDate,
      //     helperText: validationErrors?.finishDate,
      //     //remove any previous validation errors when user focuses on the input
      //     onFocus: () =>
      //       setValidationErrors({
      //         ...validationErrors,
      //         finishDate: undefined,
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
    className:"table-1",
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
    onSortingChange: setSorting,
    state: { isLoading, sorting },
    virtualizerInstanceRef, //optional
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
        <DialogTitle variant="h5">Yeni könüllü əlavə edin</DialogTitle>
        <DialogContent  
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text"  table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Düzəliş edin</DialogTitle >
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons  variant="text" table={table} row={row}  
  />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Ətraflı">
          <VisibilityIcon
            style={{ marginTop: "8px" }}
            onClick={(event) => {
              console.log(row.id);
              navigate(row.id);
            }}
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
            navigate("/newvolonteer");
          }}
        >
          Yeni könüllü əlavə edin
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

  return( <div className="table-container">
    <MaterialReactTable table={table} /></div>
  ) 
};

//CREATE hook (post new user to api)
function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      //send api update request here\\\https://10.70.3.176/api/v1/Volunteers?page=1&pageSize=0
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
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get users from api)
function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await axios.get("https://api-volunteers.fhn.gov.az/api/v1/Volunteers?page=1&pageSize=0");
        console.log(response.data.data[0].mesTrainings[0].startDate);

       
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
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
const validateEmail = (mail) =>
  !!mail.length &&
  mail
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

function validateUser(user) {
  return {
    firstName: !validateRequired(user.firstName)
      ? "First Name is Required"
      : "",
    lastName: !validateRequired(user.fin) ? "Last Name is Required" : "",
    email: !validateEmail(user.mail) ? "Incorrect Email Format" : "",
  };
}
