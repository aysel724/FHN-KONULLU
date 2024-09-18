import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { notification } from "antd";
import axios from "axios";
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
import { jwtDecode } from "jwt-decode";
import DeleteIcon from "@mui/icons-material/Delete";
import { validateVolunterActivity } from "../utils/validateUser";
import EditIcon from "../assets/icons/editIcon";
import formatDateTİme from "../utils/convertDate";
import convertDate from "../utils/converTime";
import { BASE_URL } from "../api/baseURL";
import { MRT_Localization_AZ } from "material-react-table/locales/az";
const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const token = localStorage.getItem("authToken");
  const role = jwtDecode(token).unique_name;
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Könüllülük fəaliyyətinin adı",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
        },
      },
      {
        accessorKey: "startDate",
        header: "Başlama tarixi",
        Cell: ({ cell }) => formatDateTİme(cell.getValue()),
        muiEditTextFieldProps: {
          label: "",
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
        Cell: ({ cell }) => formatDateTİme(cell.getValue()),
        muiEditTextFieldProps: {
          label: "",
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
            },
          },
        },
      },
      {
        accessorKey: "description",
        header: "Məzmun",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.description,
          helperText: validationErrors?.description,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              description: undefined,
            }),
        },
      },
      {
        accessorKey: "interestOfVoluntryField",
        header: "Könüllülük fəaliyyətinə maraq göstərilən sahə",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.interestOfVoluntryField,
          helperText: validationErrors?.interestOfVoluntryField,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              interestOfVoluntryField: undefined,
            }),
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
    const newValidationErrors = validateVolunterActivity(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null);
  };

  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    const newValidationErrors = validateVolunterActivity(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null);
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("təsdiq edirsiz?")) {
      deleteUser(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    localization: MRT_Localization_AZ,
    columns,
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

    columns,

    onCreatingRowCancel: () => setValidationErrors({}),
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
    renderRowActions: ({ row, table }) =>
      role === "Volunteers" && (
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Tooltip title="Düzəliş et">
            <IconButton onClick={() => table.setEditingRow(row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Sil">
            <IconButton
              color="error"
              onClick={() => openDeleteConfirmModal(row)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),

    renderTopToolbarCustomActions: ({ table }) => (
      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        {role === "Volunteers" && (
          <Button
            variant="contained"
            onClick={() => {
              table.setCreatingRow(true);
            }}
          >
            Əlavə edİn
          </Button>
        )}
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
  let params = useParams();
  let userId = params.id;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      console.log(user);

      const url = `${BASE_URL}/VoluntaryActivities`;
      const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };
      const newUser = {
        name: user.name,
        note: user.note,
        volunteerId: userId,
        interestOfVoluntryField: user.interestOfVoluntryField,
        description: user.description,
        endDate: convertDate(user.endDate),
        startDate: convertDate(user.startDate),
      };

      try {
        const response = await axios.post(url, newUser, { headers });

        notification.success({
          message: "Əlavə olundu",
          description: "Yeni məlumat uğurla əlavə olundu",
        });

        return response.data;
      } catch (error) {
        // Check if the error is an Axios error and has a response
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          const description =
            status === 409 ? "İstifadəçi artıq mövcuddur." : "Xəta baş verdi";

          notification.error({
            message: "Xəta",
            description,
          });
        } else {
          // For other errors or network errors
          notification.error({
            message: "Xəta",
            description: "Xəta baş verdi",
          });
        }
        // Rethrow error to trigger onError
      }
    },
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["users"], (prevUsers) => [
        ...(prevUsers || []),
        newUserInfo,
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
          `${BASE_URL}/VoluntaryActivities/GetAll/${userId}`
        );

        console.log(response);
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
function useUpdateUser() {
  let params = useParams();
  let userId = params.id;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      console.log(user);
      const url = `${BASE_URL}/VoluntaryActivities`;
      const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };
      const newUser = {
        id: user.id,
        name: user.name,
        note: user.note,
        volunteerId: userId,
        interestOfVoluntryField: user.interestOfVoluntryField,
        description: user.description,
        endDate: convertDate(user.endDate),
        startDate: convertDate(user.startDate),
      };

      try {
        const response = await axios.put(url, newUser, { headers });
        window.location.reload();
        console.log(newUser);
        console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // Refetch users after successful update
    },
    onMutate: async (newUserInfo) => {
      // Optional: Optimistic update
      await queryClient.cancelQueries(["users"]);
      const previousUsers = queryClient.getQueryData(["users"]);

      queryClient.setQueryData(["users"], (old = []) => [
        ...old.filter((user) => user.id !== newUserInfo.id),
        newUserInfo,
      ]);

      // Optionally, return a context to rollback if needed
      return { previousUsers };
    },
    onError: (error, newUserInfo, context) => {
      // Rollback in case of error
      queryClient.setQueryData(["users"], context.previousUsers);
      console.error("Error updating user:", error);
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
          `${BASE_URL}/VoluntaryActivities/${userId}`,
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
