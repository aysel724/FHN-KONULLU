import React from "react";
import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv"; // or use your library of choice here
import { usersData } from "../makeData";

const columnHelper = createMRTColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    size: 40,
  }),
  columnHelper.accessor("firstName", {
    header: "First Name",
    size: 120,
  }),
  columnHelper.accessor("lastName", {
    header: "Last Name",
    size: 120,
  }),
  columnHelper.accessor("company", {
    header: "Company",
    size: 300,
  }),
  columnHelper.accessor("city", {
    header: "City",
  }),
  columnHelper.accessor("country", {
    header: "Country",
    size: 220,
  }),
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const Example = () => {
  const table = useMaterialReactTable({
    columns,
    data: usersData,
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => {
      const handleExportRows = (rows) => {
        // Transform data to include only the selected rows
        const filteredData = rows.map((row) => row.original);

        // Generate CSV
        const csv = generateCsv({
          ...csvConfig,
          useKeysAsHeaders: true,
        })(filteredData);
        download(csvConfig)(csv);
      };

      const handleExportByVisibility = () => {
        // Get the visible columns
        const visibleColumns = table
          .getAllColumns()
          .filter((col) => col.getIsVisible());

        // Map visible columns to headers
        const headers = visibleColumns.map((col) => col.id);

        // Transform data to include only visible columns
        const filteredData = usersData.map((row) => {
          const filteredRow = {};
          visibleColumns.forEach((col) => {
            filteredRow[col.id] = row[col.id];
          });
          return filteredRow;
        });

        // Generate CSV
        const csv = generateCsv({
          ...csvConfig,
          useKeysAsHeaders: true,
          headers,
        })(filteredData);
        download(csvConfig)(csv);
      };

      return (
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            padding: "8px",
            flexWrap: "wrap",
          }}
        >
          <Button
            onClick={handleExportByVisibility}
            startIcon={<FileDownloadIcon />}
          >
            Export Visible Columns
          </Button>
          <Button
            disabled={table.getPrePaginationRowModel().rows.length === 0}
            onClick={() =>
              handleExportRows(table.getPrePaginationRowModel().rows)
            }
            startIcon={<FileDownloadIcon />}
          >
            Export All Rows
          </Button>
          <Button
            disabled={table.getRowModel().rows.length === 0}
            onClick={() => handleExportRows(table.getRowModel().rows)}
            startIcon={<FileDownloadIcon />}
          >
            Export Page Rows
          </Button>
          <Button
            disabled={
              !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
            }
            onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
            startIcon={<FileDownloadIcon />}
          >
            Export Selected Rows
          </Button>
        </Box>
      );
    },
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
