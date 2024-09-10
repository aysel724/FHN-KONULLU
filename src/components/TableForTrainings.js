import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
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
import { fakeData1 } from "../makeData";
import DeleteIcon from "@mui/icons-material/Delete";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import axios from "axios";
import { useEffect } from "react";
import EditIcon from "../assets/icons/editIcon";
const Example = () => {
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

  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },

      {
        accessorKey: `mesTrainingName.name`,
        header: "Təlimin adı",
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
        header: "Təlimi keçirən qurum",
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
        header: "Təlimin başlama tarixi",
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
        header: "Təlimin bitmə tarixi",
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
        size: 200,
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
        header: " Təlim üzrə məsul şəxs",
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
      {
        size: 200,
        accessorKey: `trainingResult.name`,
        header: "Təlimin nəticəsi",
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
        accessorKey: "priority",
        header: "Prioritet",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.priority,
          helperText: validationErrors?.priority,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              priority: undefined,
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
    enableColumnVirtualization: false,
    enableGlobalFilterModes: true,
    enableRowVirtualization: true,
    enablePagination: true,
    enableRowNumbers: true,
    enableStickyHeader: true,
    rowNumberDisplayMode: "original",
    columns,

    rowVirtualizerOptions: { overscan: 2 }, //optionally customize the row virtualizer
    virtualizerProps: { overscan: 2 },
    data: fetchedUsers,
    muiTableBodyRowProps: ({ row }) => ({
      sx: {
        cursor: "pointer",
      },
    }),
    MRT_EditActionButtons,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
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

    onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5">Yeni tədbir əlavə edin</DialogTitle>
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
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Ətraflı">
          <VisibilityIcon
            style={{ marginTop: "8px" }}
            onClick={() => navigate(`/MesTrainings/${row.id}`)}
            variant="contained"
          >
            Ətraflı
          </VisibilityIcon>{" "}
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
            navigate("/newtrainings");
          }}
        >
          Yeni təlim əlavə et
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
      const url = `https://api-volunteers.fhn.gov.az/api/v1/Mestrainings`;

      const headers = {
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
      };

      axios
        .post(url, user, { headers })
        .then((response) => {
          console.log("Response:", response.data);
          console.log(user);
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
          id: (Math.random() + 1).toString(36).substring(7),
        },
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
          "https://api-volunteers.fhn.gov.az/api/v1/MesTrainings"
        );
        // console.log(response.data.data);
        // const names = response.data.data.map(
        //   (e) => e.name + "  " + e.surname + " " + e.fatherName
        // );
        // console.log(names);
        // return response.data.data;

        const users = response.data.data.map((user) => ({
          ...user,

          sum: user.volunteers.length,
        }));

        return users;
      } catch (error) {
        // Handle errors here if needed
        console.error("Error fetching users:", error);
        throw error;
      }
    },
    refetchOnWindowFocus: false,
  });
}

// function useGetUsers() {
//   return useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       try {
//         const response = await axios.get(
//           "https://api-volunteers.fhn.gov.az/api/v1/MesTrainings"
//         );
//         const user = response.data.data;
//         return user;
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         throw error;
//       }
//     },
//     refetchOnWindowFocus: false,
//   });
// }

function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      // const data = { ...user };
      const data = {
        // mesTrainingNameId: 1,
        // departmentInCharge: user.departmentInCharge,
        // description: user.description,
        // startDate: user.startDate,
        // finishDate: user.finishDate,
        // trainingDuration: user.trainingDuration,
        // trainingPlace: user.trainingPlace,
        // trainingMaster: user.trainingMaster,
        // trainingResultId: 1,

        // mesTrainingAttachmentFiles: [],
        // id: user.id,
        // priority: user.priority,
        id: 53,
        description: "123",
        startDate: "2024-09-08T00:00:00Z",
        finishDate: "2024-09-15T00:00:00Z",
        departmentInCharge: "123",
        trainingDuration: "123",
        trainingPlace: "123",
        trainingMaster: "123",
        priority: 1,
        mesTrainingNameId: 2,
        trainingResultId: 2,
        mesTrainingAttachmentFiles: [],
      };
      console.log(data);
      //send api update request here

      const url = `https://api-volunteers.fhn.gov.az/api/v1/MesTrainings`;

      const headers = {
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
      };
      axios
        .put(url, data, { headers })
        .then((response) => {
          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    //client side optimistic update
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
      console.log(userId);

      try {
        const response = await axios.delete(
          `https://api-volunteers.fhn.gov.az/api/v1/MesTrainings/${userId}`,
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
  });
}
const queryClient = new QueryClient();

const Uxtable = () => (
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default Uxtable;

const validateRequired = (value) => {
  return !!value && !!value.length;
};

function validateUser(user) {
  return {
    name: !validateRequired(user.name) ? "First Name is Required" : "",
  };
}
