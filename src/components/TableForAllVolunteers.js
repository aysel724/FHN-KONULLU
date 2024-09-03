import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "../App.css";
import React from "react";
import axios from "axios";
import { MRT_Localization_AZ } from "material-react-table/locales/az";
import logo from "../components/images/FHNLogo.png";
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
import { useExcelJS } from "react-use-exceljs";
import { mkConfig, generateCsv, download } from "export-to-csv";

// columnHelper.accessor('lastName', {
//   header: 'Last Name',
//   size: 120,
// }),
// columnHelper.accessor('company', {
//   header: 'Company',
//   size: 300,
// }),
// columnHelper.accessor('city', {
//   header: 'City',
// }),
// columnHelper.accessor('country', {
//   header: 'Country',
//   size: 220,
// }),
// ];

const Example = () => {
  const columnHelper = createMRTColumnHelper();
  const versinon = true;
  const handleDownload = async () => {
    try {
      const response = await axios.get(
        "https://api-volunteers.fhn.gov.az/api/v1/Volunteers"
      );
      const users = response.data.data;
      const usersForCsv = users.map((user) => ({
        id: user.id,
        name: `${user.name} ${user.surname}`, // Example: Concatenate name and surname
        email: user.email,
        // Add more fields as needed, ensuring they are simple data types
      }));

      const csvConfig = mkConfig({
        fieldSeparator: "  ,",
        decimalSeparator: ".",
        useKeysAsHeaders: true,
      });
      const csv = generateCsv(csvConfig)(usersForCsv);

      // Download the CSV file
      download(csvConfig)(csv);
    } catch (error) {
      console.error("Error downloading data:", error);
      // Handle error if needed
    }
  };

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const excel = useExcelJS({
  //   filename: "Könüllülər.xlsx",
  //   worksheets: [
  //     {
  //       name: "Sheet 1",
  //       columns: [
  //         {
  //           header: "fin",
  //           key: "pinCode",
  //           width: 30,
  //         },
  //         {
  //           header: "Ad soyad",
  //           key: "name",
  //           width: 32,
  //         },
  //         {
  //           header: "Doğum tarixi.",
  //           key: "name",
  //           width: 30,
  //         },
  //         {
  //           header: "ailə statusu",
  //           key: "maritalStatus",
  //           width: 30,
  //         },
  //       ],
  //     },
  //   ],
  // });
  // const onClick = () => {
  //   // excel.download();
  // };
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
        size: 350,
        accessorKey: "fullName",
        header: "Ad soyad",
        enableEditing: versinon,
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
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img
              alt="avatar"
              height={40}
              src={row.original.photo || "/path/to/default/avatar.png"} // Provide a default avatar URL if necessary
              loading="lazy"
              style={{ borderRadius: "20%", transition: "transform 0.3s ease" }}
            />
            <span>{renderedCellValue}</span>
          </Box>
        ),
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
        size: 250,
        accessorKey: "security",
        header: "Daxili təhlükəzlik rəyi",
        enableEditing: false,
        cellClassName: "custom-cell",
        muiEditTextFieldProps: {
          color: " red",
          error: !!validationErrors?.security,
          helperText: validationErrors?.security,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              security: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
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
          //optionally add validation checking for onBlur or onChange
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
          //remove any previous validation errors when user focuses on the input
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
        header: " Ailə statusu",
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
    ],
    [validationErrors]
  );

  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();

  //CREATE action

  let params = useParams();
  let id = params.id;
  const table = useMaterialReactTable({
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
    initialState: {
      columnVisibility: { id: false },
    },
    data: fetchedUsers,
    muiTableBodyRowProps: ({ row }) => ({
      sx: {
        cursor: "pointer",
      },
    }),

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
  });

  return (
    <div className="table-container">
      <MaterialReactTable table={table} />
    </div>
  );
};

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
            user.securityCheckResults[0]?.securityCheckResultName?.name ||
            "Yoxlanmayab"
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

    email: !validateEmail(user.email) ? "Xananı doldurun" : "",
  };
}
