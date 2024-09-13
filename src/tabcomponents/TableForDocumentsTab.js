import { useMemo, useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { useLocation, useParams } from "react-router-dom";
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
import { notification } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";

const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [types, setTypes] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Получите первый выбранный файл

    if (file) {
      // Преобразуйте файл в base64, если это нужно
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1]; // Удалите префикс 'data:[<mediatype>];base64,'
        setFile(base64String); // Сохраните base64 строку в состоянии или другой переменной
      };
      reader.readAsDataURL(file); // Прочитайте файл как Data URL
    }
  };
  useEffect(() => {
    const TypesData = async () => {
      try {
        const response = await axios.get(
          `https://api-volunteers.fhn.gov.az/api/v1/ElectronicDocumentTypes`,
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
    return arr.map((e) => e.name);
  }
  const downloadFile = async (fileUrl) => {
    try {
      const response = await axios.get(fileUrl, {
        responseType: "blob", // Important for binary data
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "filename.pdf"); // Specify a default filename or extract from the response
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },

      {
        accessorKey: "electronicDocumentType.name",
        header: "Sənədin növü",
        editVariant: "select",
        editSelectOptions: getTypesNames(types),
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
        },
      },

      {
        accessorKey: "name",
        header: "Sənədin adı",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,

          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
        },
      },
      {
        accessorKey: "documentUrl",
        header: "Sənəd",
        Cell: ({ cell }) => {
          const url = cell.getValue();
          return url ? (
            <a href={url} rel="noopener noreferrer" download>
              Yüklə
            </a>
          ) : (
            "No Document"
          );
        },
      },

      // {
      //   accessorKey: "documentUrl",
      //   header: "Sənəd",
      //   muiEditTextFieldProps: {
      //     required: true,
      //     error: !!validationErrors?.documentUrl,

      //     //remove any previous validation errors when user focuses on the input
      //     onFocus: () =>
      //       setValidationErrors({
      //         ...validationErrors,
      //         documentUrl: undefined,
      //       }),
      //   },
      // },

      {
        accessorKey: "file",
        header: "Fayl",
        muiEditTextFieldProps: {
          required: true,
          type: "file",
          error: !!validationErrors?.file,
          helperText: validationErrors?.file,
          onChange: handleFileChange, // Обработчик изменения файла
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              file: undefined,
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
    [validationErrors, types]
  );

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser(
    types,
    file
  );
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
    // const newValidationErrors = validateUser(values);
    // if (Object.values(newValidationErrors).some((error) => error)) {
    //   setValidationErrors(newValidationErrors);
    //   return;
    // }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    // const newValidationErrors = validateUser(values);
    // if (Object.values(newValidationErrors).some((error) => error)) {
    //   setValidationErrors(newValidationErrors);
    //   return;
    // }
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
    columns,
    data: fetchedUsers,
    localization: {
      cancel: "İmtina",

      clearFilter: "Filteri təmizlə",
      clearSearch: "Axtarışı təmizlə",

      clearSort: "Sıralamani təmizlə",
      clickToCopy: "Kopyalamaq üçün klik et",
      copy: "Kopyala",
      collapse: "Collapse",

      columnActions: "Əməliyyatlar",
      copiedToClipboard: "Buferə kopyalandı",
      of: "/",
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
    },
    positionActionsColumn: "last",
    data: fetchedUsers,

    enableRowNumbers: true,
    enableStickyHeader: true,
    rowNumberDisplayMode: "original",
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
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.55594 12L2.84473 15L5.68957 14.25L12.8017 6.75L10.668 4.5L3.55594 12Z"
                fill="#4B7D83"
              />
              <path
                d="M10.668 4.5L12.8017 6.75M9.24561 15H14.9353"
                stroke="#4B7D83"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
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
        Əlavə edin
      </Button>
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

function base64ToBlob(base64String, contentType) {
  const base64Data = base64String.replace(/^data:[a-zA-Z0-9+\/]+;base64,/, ""); // Удаление префикса
  const byteCharacters = atob(base64Data); // Декодирование base64
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
}

function useCreateUser(types, file) {
  let params = useParams();
  let userId = params.id;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      const url =
        "https://api-volunteers.fhn.gov.az/api/v1/ElectronicDocuments"; // Замените на реальный URL
      const headers = {
        Accept: "*/*",
        // "Content-Type" не нужен для multipart/form-data, браузер установит это автоматически
      };

      // Функция для нахождения элемента массива по названию
      function findArrayElementByTitle(array, title) {
        const element = array.find((element) => element.name === title);
        return element ? element.id : null;
      }

      const formData = new FormData();
      formData.append(
        "ElectronicDocumentTypeId",
        findArrayElementByTitle(types, user["electronicDocumentType.name"])
      );
      formData.append("Note", user.note);
      formData.append("Name", user.name);
      formData.append("VolunteerId", userId);
      console.log();
      try {
        // Преобразование base64 строки в Blob
        const contentType = "application/pdf"; // Убедитесь, что это правильный contentType
        const base64String = file; // Убедитесь, что user.file содержит корректную base64 строку
        const blob = base64ToBlob(base64String, contentType);

        formData.append("File", blob, "filename.pdf"); // Укажите правильное имя файла и тип, если необходимо
      } catch (error) {
        console.error("Error converting base64 to Blob:", error);
        throw error; // Прекратить выполнение в случае ошибки преобразования
      }

      try {
        const response = await axios.post(url, formData, { headers });
        window.location.reload();
        console.log(response.data);
      } catch (error) {
        console.error("Error during request:", error);
        throw error; // Прекратить выполнение в случае ошибки запроса
      }
    },
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["users"], (prevUsers = []) => [
        ...prevUsers,
        { ...newUserInfo },
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
          `https://api-volunteers.fhn.gov.az/api/v1/ElectronicDocuments/GetAll/${userId}`
        );

        console.log(response.data.data);
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

function useUpdateUser(types) {
  let params = useParams();
  let userId = params.id;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      const url = `https://api-voluocuments`;
      const headers = {
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
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
      const formData = new FormData();
      formData.append("Id", user.id);
      formData.append("Name", user.name);
      formData.append(
        "ElectronicDocumentTypeId",
        findArrayElementByTitle(types, user["electronicDocumentType.name"])
      );
      formData.append("Note", user.note);
      formData.append("volunteerId", userId);

      function base64ToBlob(base64String, contentType) {
        const byteCharacters = atob(base64String); // Decode base64
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: contentType });
      }

      const contentType = "*/*";
      const base64String = `${user.file}`; // Example base64 string
      const blob = base64ToBlob(base64String, contentType);

      formData.append("File", blob, "filename");

      try {
        const response = await axios.put(url, formData, { headers });
        window.location.reload();
        console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    },
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["users"], (prevUsers = []) => [
        ...prevUsers,
        { ...newUserInfo },
      ]);
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
          `https://api-volunteers.fhn.gov.az/api/v1/ElectronicDocuments/${userId}`,
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
    gender: !validateRequired(user.gender) ? "First Name is Required" : "",
  };
}
