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
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { edudegree, edutype } from "../makeData";
import DeleteIcon from "@mui/icons-material/Delete";
import { TypesData } from "../api/tabComponentsGet/TypesData";
import { BASE_URL } from "../api/baseURL";
import formatDateTİme from "../utils/convertDate";
import { MRT_Localization_AZ } from "material-react-table/locales/az";

const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [types, setTypes] = useState([]);

  useEffect(() => {
    TypesData(setTypes,"MesTrainingNames");
  }, []);

  function getTypesNames(arr) {
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
        accessorKey: "description",
        header: "Təlimin məzmənu",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.description,
          helperText: validationErrors?.description,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              description: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },

      {
        accessorKey: "mesTrainingName.name",
        header: "Təlimin adı",
        editVariant: "select",
        editSelectOptions: getTypesNames(types),
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
        },
      },

      {
        accessorKey: "startDate",
        header: "Təlimin başlama tarixi",
        Cell: ({ cell }) => formatDateTİme(cell.getValue()),
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
        accessorKey: "finishDate",
        header: "Təlimin bitmə tarixi",
        Cell: ({ cell }) => formatDateTİme(cell.getValue()),
        muiEditTextFieldProps: {
          label: "",
          required: true,
          error: !!validationErrors?.finishDate,
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
      {
        accessorKey: "trainingDuration",
        header: "Təlimin müddəti",
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
        header: "Təlimin keçirilmə yeri",
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
        header: "Təhsilə başlama tarixi",
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
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "evaluationResult",
        header: "Könüllünun nəticəsi",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.evaluationResult,
          helperText: validationErrors?.evaluationResult,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              evaluationResult: undefined,
            }),
        },
      },
    ],
    [validationErrors, types]
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
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
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
    localization:MRT_Localization_AZ,
    columns,
    enableRowNumbers: true,
    data: fetchedUsers,
    createDisplayMode: "modal", 
    editDisplayMode: "modal",
    enableEditing: false,
    initialState: {
      columnVisibility: { id: false },
    },
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

function useGetUsers() {
  let params = useParams();
  let userId = params.id;
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/Volunteers/${userId}`
        );

        console.log(response.data.data);
        return response.data.data.mesTrainings;
      } catch (error) {
        // Handle errors here if needed
        console.error("Xəta:", error);
        throw error;
      }
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put user in api////)
function useUpdateUser(types) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      const data = { ...user };
      console.log(data);
      //send api update request here

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
        });
      }

      const newUser = {
        name: user.name,
        priority: user.priority,
        educationTypeId: findArrayElementByTitle(
          types,
          user["educationType.name"]
        ).id,
      };

    },
    //client side optimistic update
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["users"], (prevUsers) =>
        prevUsers?.map((prevUser) =>
          prevUser.id === newUserInfo.id ? newUserInfo : prevUser
        )
      );
    },
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
  });
}

const queryClient = new QueryClient();

const Uxtable = () => (
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default Uxtable;

