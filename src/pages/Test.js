import { useMemo, useState } from 'react';
import "../App.css"
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

import {
  QueryClient,
  QueryClientProvider,

  useQuery,
} from '@tanstack/react-query';

import DeleteIcon from '@mui/icons-material/Delete';
const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Ad soyad',
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
        accessorKey: 'fin',
        header: 'avata2',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.fin,
          helperText: validationErrors?.fin,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              fin: undefined,
            }),
        },
      },
    ],
    [validationErrors]
  );

  function useGetUsers() {
    return useQuery({
      queryKey: ['s'],
      queryFn: async () => {
        try {
          const response = await fetch('');
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          const data = await response.json();
          return data.data; // Assuming the user data is under 'data' property
     
        } catch (error) {
          throw new Error('Failed to fetch users: ' + error.message);
        }
      },
      refetchOnWindowFocus: false,
    });
  }

  const { data: fetchedUsers = [], isError, isLoading } = useGetUsers();

  const table = useMaterialReactTable({
    positionActionsColumn: 'last',
    columns,
    data: fetchedUsers,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    getRowId: (row) => row.id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return <MaterialReactTable table={table} />;
};const queryClient = new QueryClient();

const Uxtable = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);
export default Uxtable;


