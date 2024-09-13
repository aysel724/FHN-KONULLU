

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
import { fakeData6, results } from "../makeData";
import DeleteIcon from "@mui/icons-material/Delete";
import { BASE_URL } from "../api/baseURL";
import { FaDownload } from "react-icons/fa6"
import { TypesData } from "../api/tabComponentsGet/TypesData";
import EditIcon from "../assets/icons/editIcon";
import Base64ToBlob from "../utils/base64ToBlob";
import {validateElectronDocument} from '.././utils/validateUser'
const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [types, setTypes] = useState([]);
  const [file, setFile] = useState(null);

 const handleFileChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    // Dosya uzantısını kontrol et
    const validExtensions = ['docx', 'pdf'];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      setValidationErrors({
        ...validationErrors,
        file: "Yalnız .docx ve .pdf dosyaları seçebilirsiniz."
      });
      // Dosya türü geçerli değil, işlemi sonlandır
      setFile(null); // Dosya state'ini temizle
      return;
    }

    // Dosya geçerli ise işlemi devam ettir
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setFile(base64String);
      setValidationErrors({
        ...validationErrors,
        file: undefined // Dosya seçimi geçerli, hata mesajını kaldır
      });
    };
    reader.readAsDataURL(file);
  } else {
    setValidationErrors({
      ...validationErrors,
      file: "Fayl seçilməlidir."
    });
    setFile(null); // Dosya seçilmediğinde state'i temizle
  }
};

  
  useEffect(() => {
        TypesData(setTypes,"ElectronicDocumentTypes");
      }, []);

  function getTypesNames(arr) {
    return arr.map((e) => e.name);
  }
    const handleDownload = async (documentUrl) => {
    try {
      const response = await fetch(`${BASE_URL}/ElectronicDocuments/DownloadFile/${documentUrl}`, {
        method: 'GET',
      });
      const jsonResponse = await response.json();
      const { fileName, fileContent, contentType } = jsonResponse.data;
      const blob = Base64ToBlob(fileContent, contentType || 'application/octet-stream');
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || 'downloaded_file'; 
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
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
          error: !!validationErrors?.["electronicDocumentType.name"],
          helperText: validationErrors?.["electronicDocumentType.name"],
        },
      },

      {
        accessorKey: "name",
        header: "Sənədin adı",
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
        },
      },
      {
                accessorKey: "documentUrl",
                header: "Sənəd",
                Cell: ({ row }) => (
                  <button
                  onClick={() => handleDownload(row.original.id)}
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#4F75FF',
                    display: 'flex',
                    gap: '5px',
                    cursor: 'pointer', 
                  }}
                >
                  <FaDownload />
                  Yüklə
                </button>               
                ),
                muiEditTextFieldProps: {
                  required: true,
                  error: !!validationErrors?.documentUrl,
                  onFocus: () =>
                    setValidationErrors({
                      ...validationErrors,
                      documentUrl: undefined,
                    }),
                },
              },
      {
        accessorKey: "file",
        header: "Fayl",
        muiEditTextFieldProps: {
          required: true,
          type: "file",
          error: !!validationErrors?.file,
          helperText: validationErrors?.file,
          onChange: handleFileChange, 
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
    const newValidationErrors = validateElectronDocument(values);
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
    const newValidationErrors = validateElectronDocument(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null); 
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
           <EditIcon/>
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
          table.setCreatingRow(true);
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
function useCreateUser(types, file) {
  let params = useParams();
  let userId = params.id;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      const url =
        `${BASE_URL}/ElectronicDocuments`;
      const headers = {
        Accept: "*/*",
      };

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
        const contentType = "application/octet-stream"; 
        const base64String = file; 
        const blob = Base64ToBlob(base64String, contentType);

        formData.append("File", blob, "filename"); 
      } catch (error) {
        console.error("Error converting base64 to Blob:", error);
        throw error; 
      }

      try {
        const response = await axios.post(url, formData, { headers });
        window.location.reload();
        console.log(response.data);
      } catch (error) {
        console.error("Error during request:", error);
        throw error;
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
          `${BASE_URL}/ElectronicDocuments/GetAll/${userId}`
        );

        console.log(response.data.data);
        return response.data.data;
      } catch (error) {
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      console.log(userId);
      try {
        const response = await axios.delete(
          `${BASE_URL}/ElectronicDocuments/${userId}`,
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


