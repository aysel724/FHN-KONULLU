import { useMemo, useState } from "react";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import DeleteIcon from "@mui/icons-material/Delete";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import EditIcon from "../assets/icons/editIcon";

const Example = () => {
  const [imageData, setImageData] = useState(null);
  const navigate = useNavigate();
  const handleExportToExcel = async (table) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Get visible columns
    const visibleColumns = table.getState().columnVisibility;

    // Add header row
    const headers = table.getHeaderGroups().flatMap(
      (group) =>
        group.headers
          .filter((header) => visibleColumns[header.id] !== false)
          .map((header) => header.columnDef?.header || header.id) // Fallback to header.id if columnDef.header is undefined
    );

    console.log("Headers:", headers); // Ensure headers are correctly populated

    const headerRow = worksheet.addRow(headers);
    headerRow.eachCell({ includeEmpty: true }, (cell) => {
      cell.font = { bold: true, size: 14 };
    });

    worksheet.getColumn(1).width = 0; // Adjust width for Column 1
    worksheet.getColumn(2).width = 30; // Adjust width for Column 2
    worksheet.getColumn(3).width = 30; // Adjust width for Column 3
    worksheet.getColumn(4).width = 30; // Adjust width for Column 1
    worksheet.getColumn(5).width = 30; // Adjust width for Column 2
    worksheet.getColumn(6).width = 30; // Adjust width for Column 3
    worksheet.getColumn(7).width = 30; // Adjust width for Column 1
    worksheet.getColumn(8).width = 30; // Adjust width for Column 2
    worksheet.getColumn(9).width = 30; // Adjust width for Column 3
    worksheet.getColumn(10).width = 0;
    // Add data rows
    table.getRowModel().rows.forEach((row) => {
      const rowData = headers.map((header) => row.original[header] || ""); // Ensure you handle undefined values
      worksheet.addRow(rowData);
    });
    // Save the Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer]), "konulluler.xlsx");
    });
  };

  const [types, setTypes] = useState([]);
  useEffect(() => {
    const TypesData = async () => {
      try {
        const response = await axios.get(
          `https://api-volunteers.fhn.gov.az/api/v1/Volunteers`,
          {
            headers: { accept: "*/*" },
          }
        );
        console.log(response.data.data);
        const newData = response.data.data.map((e) => {
          const user = {
            name: e.name,
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
    console.log(arr); // This logs the input array `arr`

    // Mapping over the array to create objects with index as `key` and `name` from each element
    const mappedArray = arr.map((e) => e);
    console.log(mappedArray); // This logs the mapped array with `key` and `name`

    return mappedArray; // Returning the mapped array
  }

  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: true,
        size: 80,
      },
      {
        accessorKey: "name",
        header: "Tədbirin adı",
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
        accessorKey: "departmentInCharge",
        header: "Tədbiri keçirən qurum",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.departmentInCharge,
          helperText: validationErrors?.departmentInCharge,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              departmentInCharge: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "startDate",
        header: "Tədbirin başlama tarixi",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.startDate,
          helperText: validationErrors?.startDate,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              startDate: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "finishDate",
        header: "Tədbirin bitmə tarixi",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.finishDate,
          helperText: validationErrors?.finishDate,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              finishDate: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "eventDuration",
        header: "Tədbirin müddəti",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.eventDuration,
          helperText: validationErrors?.eventDuration,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              eventDuration: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "eventPlace",
        header: "Tədbirin keçirilmə yeri",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.eventPlace,
          helperText: validationErrors?.eventPlace,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              eventPlace: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "personInCharge",
        header: " Tədbir üzrə məsul şəxs",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.personInCharge,
          helperText: validationErrors?.personInCharge,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              personInCharge: undefined,
            }),
        },
      },

      {
        accessorKey: "note",
        header: "qeyd",
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
      {
        accessorKey: "sum",
        header: "iştirakçı sayı",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.id,
          helperText: validationErrors?.id,

          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              id: undefined,
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
    positionActionsColumn: "last",
    localization: {
      cancel: "İmtina",

      clearFilter: "Filteri təmizlə",
      clearSearch: "Axtarışı təmizlə",

      clearSort: "Sıralamani təmizlə",
      clickToCopy: "Kopyalamaq üçün klik edin",
      copy: "Kopyala",
      collapse: "Collapse",

      columnActions: "Əməliyyatlar",
      copiedToClipboard: "Buferə kopyalandı",

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
      // ... and many more - see link below for full list of translation keys
    },
    muiTableContainerProps: { sx: { maxHeight: "600px" } },

    enableRowNumbers: true,
    enableStickyHeader: true,
    rowNumberDisplayMode: "original",
    columns,

    //optionally customize the row virtualizer

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
      columnVisibility: { id: false },
      columnPinning: { right: ["mrt-row-actions"] },
    },
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
        <DialogTitle variant="h5">Yeni tədbir əlavə edin</DialogTitle>
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
        <Tooltip title="Ətraflı">
          <VisibilityIcon
            style={{ marginTop: "8px" }}
            onClick={() => navigate(`/events/${row.id}`)}
            variant="contained"
          >
            Ətraflı
          </VisibilityIcon>
        </Tooltip>
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
      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/newevents");
          }}
        >
          Yeni tədbir əlavə et
        </Button>
        <Button variant="contained" onClick={() => handleExportToExcel(table)}>
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

  return <MaterialReactTable table={table} />;
};

function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      console.log(user);
      const url = `https://api-volunteers.fhn.gov.az/api/v1/Events`;
      const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };
      axios
        .post(url, user, { headers })
        .then((response) => {
          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["users"], (prevUsers = []) => [
        ...prevUsers,
        newUserInfo,
      ]);
    },
  });
}

function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          "https://api-volunteers.fhn.gov.az/api/v1/Events"
        );
        const users = response.data.data.map((user) => ({
          ...user,

          sum: user.volunteers.length,
          // files: user.eventAttachments.forEach((e) => e.id),
        }));
        console.log(users);
        return users;
      } catch (error) {
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
      const data = { ...user };
      console.log(data);
      //send api update request here

      const url = `https://api-volunteers.fhn.gov.az/api/v1/Events`;

      const headers = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };
      console.log(user);
      axios
        .put(url, data, { headers })
        .then((response) => {
          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["users"], (prevUsers) => [
        ...prevUsers,
        {
          ...newUserInfo,
        },
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
          `https://api-volunteers.fhn.gov.az/api/v1/Events/${userId}`,
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
    name: !validateRequired(user.name) ? "Xana boş qala bilməz" : "",
    startDate: !validateRequired(user.startDate) ? "Xana boş qala bilməz" : "",
    personInCharge: !validateRequired(user.personInCharge)
      ? "Xana boş qala bilməz"
      : "",
    finishDate: !validateRequired(user.finishDate)
      ? "Xana boş qala bilməz"
      : "",
  };
}
