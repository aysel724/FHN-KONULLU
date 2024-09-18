import { useMemo, useState, useEffect } from "react";
import "../App.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { notification } from "antd";
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

import DeleteIcon from "@mui/icons-material/Delete";
import { validateEducation } from "../utils/validateUser";
import { TypesData } from "../api/tabComponentsGet/TypesData";
import EditIcon from "../assets/icons/editIcon";
import { BASE_URL } from "../api/baseURL";
import formatDateTİme from "../utils/convertDate";
import convertDate from "../utils/converTime";
import { MRT_Localization_AZ } from "material-react-table/locales/az";

const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [types, setTypes] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const token = localStorage.getItem("authToken");
  const role = jwtDecode(token).unique_name;
  useEffect(() => {
    TypesData(setTypes,'EducationTypes');
  }, []);

  function getTypesNames(arr) {
    return arr.map((e) => e.name);
  }

  useEffect(() => {
    const TypesData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/EducationDegrees`,
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
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              educationEnterprise: undefined,
            }),
        },
      },
      {
        accessorKey: "educationType.name",
        header: "Təhsilin tip",
        editVariant: "select",
        editSelectOptions: getTypesNames(types),
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.["educationType.name"],
          helperText: validationErrors?.["educationType.name"],
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
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              diplomaSerialNumber: undefined,
            }),
        },
      },
      {
        accessorKey: "qualification",
        header: "İxtisas",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.qualification,
          helperText: validationErrors?.qualification,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              qualification: undefined,
            }),
        },
      },
      {
        accessorKey: "faculty",
        header: "Fakültə",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.faculty,
          helperText: validationErrors?.faculty,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              faculty: undefined,
            }),
        },
      },
      {
        accessorKey: "diplomaGivenDate",
        header: "Diplomun verilmə tarixi",
        Cell: ({ cell }) => formatDateTİme(cell.getValue()),
        muiEditTextFieldProps: {
          label: "",
          required: true,
          error: !!validationErrors?.diplomaGivenDate,
          helperText: "Diplomun verilmə tarixi",
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
              helperText: "", 
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
    const newValidationErrors = validateEducation(values);
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
    const newValidationErrors = validateEducation(values);
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
      console.log(user);

      const url = `${BASE_URL}/Education`;

      const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      
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
      console.log(newUser,'newUSer');

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
          `${BASE_URL}/Education/GetAll/${userId}`
        );

        const users = response.data.data.map((user) => ({
          ...user,
          diplomaGivenDate:
            convertDate(user.diplomaGivenDate) !== "NaN-NaN-NaNTNaN:NaN:NaNZ"
              ? convertDate(user.diplomaGivenDate)
              : null,
          endDate:
            convertDate(user.endDate) !== "NaN-NaN-NaNTNaN:NaN:NaNZ"
              ? convertDate(user.endDate)
              : null,
          degree: `${user.educationType.educationDegrees[0]?.name}`,
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

      const url = `${BASE_URL}/Education`;

      const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      
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
        console.log(response);
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
    //   onError: (error, newUserInfo, context) => {
    //     // Rollback in case of error
    //     queryClient.setQueryData(["users"], context.previousUsers);
    //     console.error("Error updating user:", error);
    //   },
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
          `${BASE_URL}/Education/${userId}`,
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
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default Uxtable;

