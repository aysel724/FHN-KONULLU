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
import formatDateTİme from "../utils/convertDate";
import { BASE_URL } from "../api/baseURL";
import { MRT_Localization_AZ } from "material-react-table/locales/az";

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
          `${BASE_URL}/Volunteers`,
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
    console.log(arr);

    const mappedArray = arr.map((e) => e);
    console.log(mappedArray); 

    return mappedArray;
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
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
        },
      },
      {
        accessorKey: "departmentInCharge",
        header: "Tədbiri keçirən qurum",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.departmentInCharge,
          helperText: validationErrors?.departmentInCharge,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              departmentInCharge: undefined,
            }),
        },
      },
      {
        accessorKey: "startDate",
        header: "Tədbirin başlama tarixi",
        Cell: ({ cell }) => formatDateTİme(cell.getValue()),
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.startDate,
          helperText: validationErrors?.startDate,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              startDate: undefined,
            }),
        },
      },
      {
        accessorKey: "finishDate",
        header: "Tədbirin bitmə tarixi",
        Cell: ({ cell }) => formatDateTİme(cell.getValue()),
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.finishDate,
          helperText: validationErrors?.finishDate,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              finishDate: undefined,
            }),
        },
      },
      {
        accessorKey: "eventDuration",
        header: "Tədbirin müddəti",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.eventDuration,
          helperText: validationErrors?.eventDuration,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              eventDuration: undefined,
            }),
        },
      },
      {
        accessorKey: "eventPlace",
        header: "Tədbirin keçirilmə yeri",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.eventPlace,
          helperText: validationErrors?.eventPlace,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              eventPlace: undefined,
            }),
        },
      },
      {
        accessorKey: "personInCharge",
        header: " Tədbir üzrə məsul şəxs",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.personInCharge,
          helperText: validationErrors?.personInCharge,
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
    localization: MRT_Localization_AZ,
    muiTableContainerProps: { sx: { maxHeight: "600px" } },

    enableRowNumbers: true,
    enableStickyHeader: true,
    rowNumberDisplayMode: "original",
    columns,


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
    onEditingRowCancel: () => setValidationErrors({}),
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
      const url = `${BASE_URL}/Events`;
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
          `${BASE_URL}/Events`
        );
        const users = response.data.data.map((user) => ({
          ...user,

          sum: user.volunteers.length,
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

      const url = `${BASE_URL}/Events`;

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
          `${BASE_URL}/Events/${userId}`,
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
