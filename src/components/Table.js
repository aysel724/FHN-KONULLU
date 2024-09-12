import { useMemo, useState, version, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "../App.css";
import React from "react";
import axios from "axios";
import {
  createMRTColumnHelper,
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
  GridToolbar,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

import { useVolunteers } from "../context/VolunterContext";

const Example = () => {
  const [securityTypes, setSecurityTypes] = useState([]);

  useEffect(() => {
    const TypesData = async () => {
      try {
        const response = await axios.get(
          `https://api-volunteers.fhn.gov.az/api/v1/SecurityCheckResultName`,
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
        setSecurityTypes(newData);
      } catch (error) {
        // Handle errors here if needed
        console.error("Error fetching users:", error);
        throw error;
      }
    };
    TypesData();
  }, []);

  function getSecurityTypesNames(arr) {
    return arr.map((e) => e.name);
  }

  const token = localStorage.getItem("authToken");
  // const role = jwtDecode(token).unique_name;
  const role = "atef";
  console.log(role);
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
    worksheet.getColumn(10).width = 30;
    worksheet.getColumn(11).width = 30;
    worksheet.getColumn(13).width = 0;
    table.getRowModel().rows.forEach((row) => {
      const rowData = headers.map((header) => row.original[header] || ""); // Ensure you handle undefined values
      worksheet.addRow(rowData);
    });
    // Save the Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer]), "konulluler.xlsx");
    });
  };
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const [validationErrors, setValidationErrors] = useState({});

  // CONTEXT VOLUNTER
  const { volunteers } = useVolunteers();
  console.log(volunteers, "volunteers");
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },

      {
        size: 300,
        accessorKey: "fullName",
        header: "Ad soyad",
        enableEditing: false,
        muiEditTextFieldProps: {
          enableClickToCopy: true,
          required: true,
          error: !!validationErrors?.fullName,
          helperText: validationErrors?.fullName,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              fullName: undefined,
            }),
        },
      },

      {
        size: 160,
        accessorKey: "pinCode",
        header: "FİN KOD",
        enableEditing: false,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.pinCode,
          helperText: validationErrors?.pinCode,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              pinCode: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },

      {
        accessorKey: "security",
        header: "Daxili təhlükəzlik rəyi",
        enableEditing: role !== "Volunteers",
        editVariant: "select",
        editSelectOptions: getSecurityTypesNames(securityTypes),
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.security,
          helperText: validationErrors?.security,
        },
      },
      {
        size: 250,
        accessorKey: "description",
        header: "Daxili təhlükəzlik qeydi",
        enableEditing: role !== "Volunteers",
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
        },
      },
      {
        size: 250,
        accessorKey: "voluntaryOfMesStatus.name",
        header: "Status",
        enableEditing: false,
        muiEditTextFieldProps: {
          error: !!validationErrors?.security,
          helperText: validationErrors?.security,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              security: undefined,
            }),
        },
      },

      {
        size: 90,
        accessorKey: "gender",
        enableEditing: false,
        header: "Cins",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.gender,
          helperText: validationErrors?.gender,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              gender: undefined,
            }),
        },
      },

      {
        accessorKey: "birthDate",
        header: "Doğum tarixi",
        enableEditing: false,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.birthDate,
          helperText: validationErrors?.birthDate,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              birthDate: undefined,
            }),
        },
      },

      {
        accessorKey: "maritalStatus",
        header: "Ailə statusu",
        enableEditing: false,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.maritalStatus,
          helperText: validationErrors?.maritalStatus,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              maritalStatus: undefined,
            }),
        },
      },
      {
        accessorKey: "email",
        header: "E-poçt ünvanı",
        enableEditing: role === "Volunteers",
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },
      },
      {
        accessorKey: "phoneNumber1",
        header: "Əlaqə nömrəsi",
        enableEditing: role === "Volunteers",
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.phoneNumber1,
          helperText: validationErrors?.phoneNumber1,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              phoneNumber1: undefined,
            }),
        },
      },
      {
        accessorKey: "phoneNumber2",
        header: "Əlaqə nömrəsi",
        enableEditing: role === "Volunteers",
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.phoneNumber2,
          helperText: validationErrors?.phoneNumber2,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              phoneNumber2: undefined,
            }),
        },
      },
    ],
    [validationErrors, securityTypes]
  );
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();
  const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateUser(
    role,
    securityTypes
  );
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

  const handleSaveUser = async ({ values, table }) => {
    // const newValidationErrors = validateUser(values);
    // if (Object.values(newValidationErrors).some((error) => error)) {
    //   setValidationErrors(newValidationErrors);
    //   return;
    // }
    // setValidationErrors({});

    await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };
  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm("təsdiq edirsiz?")) {
      deleteUser(row.original.id);
    }
  };

  let params = useParams();
  let id = params.id;

  const table = useMaterialReactTable({
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
    enableClickToCopy: true,
    muiTableContainerProps: { sx: { maxHeight: "600px" } },
    muiEditTextFieldProps: {
      variant: "outlined",
    },
    enableRowNumbers: true,
    enableStickyHeader: true,
    rowNumberDisplayMode: "original",
    columns,
    data: volunteers.length > 0 ? volunteers : fetchedUsers,
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
      columnVisibility: { id: false, description: role !== "Volunteers" },
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
        <DialogTitle variant="h5">Yeni könüllü əlavə edin</DialogTitle>
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
    // renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
    //   <>
    //     <DialogTitle variant="h3"></DialogTitle>
    //     <DialogContent
    //       sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
    //     >
    //       {internalEditComponents} {/* or render custom edit components here */}
    //     </DialogContent>
    //     <DialogActions>
    //       <MRT_EditActionButtons variant="text" table={table} row={row} />
    //     </DialogActions>
    //   </>
    // ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        {/* {role === "Volunteers" && (
          <Button variant="contained" onClick={() => table.setEditingRow(row)}>
            status
          </Button>
        )} */}
        <Tooltip title="Ətraflı">
          <VisibilityIcon
            style={{ marginTop: "8px" }}
            onClick={() => navigate(`/Volunteers/${row.id}`)}
            variant="contained"
          >
            Ətraflı
          </VisibilityIcon>
        </Tooltip>
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
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.55594 12L2.84473 15L5.68957 14.25L12.8017 6.75L10.668 4.5L3.55594 12Z"
                fill="#4B7D83"
              />
              <path
                d="M10.668 4.5L12.8017 6.75M9.24561 15H14.9353"
                stroke="#4B7D83"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
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
      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/newvolonteer");
          }}
        >
          Yeni könüllü əlavə edin
        </Button>

        {/* <Button variant="contained" onClick={handleDownload}>
          Excelə export
        </Button> */}
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

  return (
    <div className="table-container">
      <MaterialReactTable table={table} />
    </div>
  );
};

//CREATE hook (post new user to api)
function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      //send api update request here\\\https://10.70.3.176/api/v1/Volunteers?page=1&pageSize=0
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
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get users from api)
function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          "https://api-volunteers.fhn.gov.az/api/v1/Volunteers"
        );
        // console.log(response.data.data);
        // const names = response.data.data.map(
        //   (e) => e.name + "  " + e.surname + " " + e.fatherName
        // );
        // console.log(names);
        // return response.data.data;

        const users = response.data.data.map((user) => ({
          ...user,
          fullName: `${user.name} ${user.surname} ${user.fatherName}`.trim(),
          security: `${
            user.securityCheckResults[user.securityCheckResults.length - 1]
              ?.securityCheckResultName?.name || "Yoxlanmayıb"
          }`,
          description: `${
            user.securityCheckResults[user.securityCheckResults.length - 1]
              ?.description || "Yoxlanmayıb"
          }`,
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

//UPDATE hook (put user in api)
function useUpdateUser(role, securityTypes) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      if (role === "Volunteers") {
        const formData = new FormData();
        formData.append("Id", user.id);
        formData.append("Email", user.email);
        formData.append("PhoneNumber1", user.phoneNumber1);
        formData.append("PhoneNumber2", user.phoneNumber2);
        formData.append("CheckFromIamas", false);
        formData.append("QueryParams", {
          additionalProp1: "string",
          additionalProp2: "string",
          additionalProp3: "string",
        });

        console.log("salam");
        //send api update request here

        const url = `https://api-volunteers.fhn.gov.az/api/v1/Volunteers`;

        const headers = {
          Accept: "*/*",
        };

        axios
          .put(url, formData, { headers })
          .then((response) => {
            console.log("Response:", response.data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        const url = `https://api-volunteers.fhn.gov.az/api/v1/Volunteers/AddVolunteerCheckResult`;

        const headers = {
          Accept: "*/*",
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

        const data = {
          securityCheckResultNameId: findArrayElementByTitle(
            securityTypes,
            user.security
          ),
          volunteerId: user.id,
          description: user.description,
        };
        console.log(data);
        axios
          .post(url, data, { headers })
          .then((response) => {
            console.log("Response:", response.data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
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

function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      console.log(userId);

      try {
        const response = await axios.delete(
          `https://api-volunteers.fhn.gov.az/api/v1/Volunteers/${userId}`,
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
const validateEmail = (mail) =>
  !!mail.length &&
  mail
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

function validateUser(user) {
  return {
    phoneNumber1: !validateRequired(user.phoneNumber1) ? "Xananı doldurun" : "",
    phoneNumber2: !validateRequired(user.phoneNumber2) ? "Xananı doldurun" : "",
    email: !validateEmail(user.email) ? "Xananı doldurun" : "",
  };
}
