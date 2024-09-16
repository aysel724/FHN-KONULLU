import { useMemo, useState, useEffect } from "react";
import "../App.css";
import { useParams } from "react-router-dom";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
import { fakeData6, usStates } from "../makeData";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TypesData } from "../api/tabComponentsGet/TypesData";
import { BASE_URL } from "../api/baseURL";
const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [types, setTypes] = useState([]);

  useEffect(() => {
    
    TypesData(setTypes,'TrainingResults');
  }, []);

  function getTypesNames(arr) {
    return arr.map((e) => e.name);
  }

  const pagBUTTON = document.querySelector(
    ".css-uqq6zz-MuiFormLabel-root-MuiInputLabel-root"
  );
  if (pagBUTTON) {
    pagBUTTON.textContent = "Göstərilən";
  }
  const navigate = useNavigate();
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
        header: "Ad soyad",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              fullName: undefined,
            }),
        },
      },

      {
        accessorKey: "pinCode",
        header: "fin",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.pinCode,
          helperText: validationErrors?.pinCode,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              pinCode: undefined,
            }),
        },
      },
      {
        accessorKey: "comments",
        header: "Qeyd",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.comments,
          helperText: validationErrors?.comments,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              comments: undefined,
            }),
        },
      },
      {
        accessorKey: "evaluationResult",
        header: "Nəticə",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.evaluationResult,
          helperText: validationErrors?.evaluationResult,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              evaluationResult: undefined,
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
    rowNumberDisplayMode: "original",
    enableRowNumbers: true,
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
      initialState: {
        columnPinning: { right: ["mrt-row-actions"] },
      },
      displayColumnDefOptions: { "mrt-row-actions": { size: 150 } },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5">Tədbirə könüllü əlavə edin</DialogTitle>
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

    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Ətraflı">
          <VisibilityIcon
            style={{ marginTop: "8px" }}
            onClick={() => navigate(`/Volunteers/${row.id}`)}
            variant="contained"
          >
            Ətraflı
          </VisibilityIcon>
        </Tooltip>
        <Tooltip title="Sil">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Qiymətləndir">
          <Button
            style={{ marginTop: "8px" }}
            onClick={() => table.setEditingRow(row)}
            variant="contained"
          >
            Qİymətləndİr
          </Button>
        </Tooltip>
      </Box>
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

//READ hook (get users from api)
function useGetUsers() {
  let params = useParams();
  let userId = params.id;
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/MesTrainings/${userId}`
        );
        // console.log(response.data.data);
        // const names = response.data.data.map(
        //   (e) => e.name + "  " + e.surname + " " + e.fatherName
        // );
        // console.log(names);
        // return response.data.data;

        // const users = response.data.data.volunteers.map((user) => ({
        //   ...user,
        //   fullName: `${user.name} ${user.surname} ${user.fatherName}`.trim(),
        // }));
        const user = response.data.data.volunteers;

        console.log(user);
        return user;
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
  let params = useParams();
  let userId = params.id;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      console.log(user);

      const url = `${BASE_URL}/MesTrainings/EvaluateVolunteer`;

      const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      const newUser = {
        volunteerId: user.id,
        mesTrainingId: userId,
        evaluationResult: user.evaluationResult,
        comments: user.comments,
      };
      console.log(newUser);

      try {
        const response = await axios.post(url, newUser, { headers });
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
  });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
  let params = useParams();
  let userId = params.id;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      console.log(userId);

      try {
        const response = await axios.delete(
          `${BASE_URL}/MesTrainings/${userId}/${user}`,
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
    onMutate: (userId) => {
      queryClient.setQueryData(["users"], (prevUsers) =>
        prevUsers?.filter((user) => user.id !== userId)
      );
    },
  });
}

const queryClient = new QueryClient();

const Uxtable = () => (
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default Uxtable;

const validateRequired = (value) => !!value.length;

function validateUser(user) {
  return {
    volunteer: !validateRequired(user.volunteer)
      ? "First Name is Required"
      : "",
  };
}
