import { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { jwtDecode } from "jwt-decode";
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
import { notification } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import { validateFHNVolunterActivity } from ".././utils/validateUser";
import { TypesData } from "../api/tabComponentsGet/TypesData";
import { BASE_URL } from "../api/baseURL";
import EditIcon from "../assets/icons/editIcon";
import formatDateTİme from "../utils/convertDate";
import convertDate from "../utils/converTime";

import { MRT_Localization_AZ } from "material-react-table/locales/az";

const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [types, setTypes] = useState([]);
  const [endDate, setEndDate] = useState(false);
  const token = localStorage.getItem("authToken");
  const role = jwtDecode(token).unique_name;
  useEffect(() => {
    TypesData(setTypes, "MesVoluntaryActivityEndReasons");
  }, []);

  const getTypesNames = (types) => {
    if (!types) return [];
    return types.map((type) => type.name);
  };
  const getDateNames = (types) => {
    if (!types) return [];
    return types.map((type) => type.startDate);
  };

  const handleDateChange = (event) => {
    if (event.target.value) {
      setEndDate(true);
    } else {
      setEndDate(false);
    }
  };

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

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "startDate",
        header: "Başlama tarixi",
        Cell: ({ cell }) => formatDateTİme(cell.getValue()),
        muiEditTextFieldProps: {
          label: "",
          required: true,
          error: !!validationErrors?.startDate,
          helperText: validationErrors?.startDate
            ? validationErrors?.startDate
            : "Başlama tarixi",
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
          helperText: validationErrors?.endDate
            ? validationErrors?.endDate
            : "Bitmə tarixi",
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
    ],
    [validationErrors, types, endDate]
  );

  //CREATE action
  const handleCreateUser = async ({ values, table }) => {
    // setEndDate(values)
    const newValidationErrors = validateFHNVolunterActivity(values);
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
    const newValidationErrors = validateFHNVolunterActivity(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values); //exit editing mode
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
    localization: MRT_Localization_AZ,
    columns,
    data: fetchedUsers,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
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
    onCreatingRowCancel: () => {
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

      const newUser = {
        volunteerId: userId,
        startDate: convertDate(user.startDate),
        endDate:
          convertDate(user.endDate) !== "NaN-NaN-NaNTNaN:NaN:NaNZ"
            ? convertDate(user.endDate)
            : null,
        // mesVoluntaryActivityEndReasons:
        mesVoluntaryActivityEndReasonId: findArrayElementByTitle(
          types,
          user["mesVoluntaryActivityEndReason.name"]
        ),
        note: user.note,
      };
      console.log(newUser);
      const url = `${BASE_URL}/VoluntaryOfMeses`;
      const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };
      console.log(newUser);
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
          `${BASE_URL}/VoluntaryOfMeses/GetAll/${userId}`
        );

        console.log(response.data.data, "get");

        return response.data.data;
      } catch (error) {
        console.error("Xəta:", error);
        throw error;
      }
    },
    refetchOnWindowFocus: false,
  });
}
// function useUpdateUser(types, endDate) {
//   let params = useParams();
//   let userId = params.id;
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (user) => {
//       function findArrayElementByTitle(array, title) {
//         console.log(
//           array.find((element) => {
//             return element.name === title;
//           })
//         );
//         return array.find((element) => {
//           return element.name === title;
//         }).id;
//       }
//       const url = `${BASE_URL}/VoluntaryOfMeses`;
//       const headers = {
//         Accept: "*/*",
//         "Content-Type": "application/json",
//       };

//       const newUser = {
//         id: user.id,
//         volunteerId: parseInt(userId),
//         startDate: convertDate(user.startDate),
//         endDate:
//           convertDate(user.endDate) !== "NaN-NaN-NaNTNaN:NaN:NaNZ"
//             ? convertDate(user.endDate)
//             : null,
//         mesVoluntaryActivityEndReasonId: findArrayElementByTitle(
//           types,
//           user["mesVoluntaryActivityEndReason.name"]
//         ),
//         note: user.note,
//       };
//       console.log(newUser);
//       axios
//         .put(url, newUser, { headers })
//         .then((response) => {
//           console.log("Response:", response.data);
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["users"]); // Refetch users after successful creation
//     },
//     onMutate: (newUserInfo) => {
//       queryClient.setQueryData(["users"], (prevUsers = []) => [
//         ...prevUsers,
//         {
//           ...newUserInfo,
//         },
//       ]);
//     },
//   });
// }

function useUpdateUser(types, endDate) {
  const params = useParams();
  const userId = params.id;
  const queryClient = useQueryClient();

  // Helper function to find ID by title
  const findArrayElementByTitle = (array, title) => {
    const element = array.find((element) => element.name === title);
    return element ? element.id : null;
  };

  return useMutation({
    mutationFn: async (user) => {
      function findArrayElementByTitle(array, title) {
        if (title === undefined || array === undefined) {
          return null;
        } else {
          const foundElement = array.find((element) => element.name === title);
          return foundElement ? foundElement.id : null;
        }
      }
      const url = `${BASE_URL}/VoluntaryOfMeses`;
      const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };
      const newUser = {
        id: user.id,
        volunteerId: parseInt(userId, 10),
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
      console.log(newUser, "newUser");
      axios.put(url, newUser, { headers }).then((response) => response.data);
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
  const location = useLocation().pathname.substring(1);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      console.log(userId);
      try {
        const response = await axios.delete(
          `${BASE_URL}/VoluntaryOfMeses/${userId}`,
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

const Uxtable = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
};
export default Uxtable;
