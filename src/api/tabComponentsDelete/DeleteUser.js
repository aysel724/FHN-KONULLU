// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { BASE_URL } from "../baseURL";

// export function useDeleteUser(endPoint) {
//     const queryClient = useQueryClient();
//     return useMutation({
//       mutationFn: async (userId) => {
//         console.log(userId);
//         try {
//           const response = await axios.delete(
//             `${BASE_URL}/${endPoint}/${userId}`,
//             {
//               headers: { accept: "*/*" },
//             }
//           );
//           console.log(response.data);
  
//           return response.data.data;
//         } catch (error) {
//           console.error("Error fetching users:", error);
//           throw error;
//         }
//       },
//       onMutate: (userId) => {
//         queryClient.setQueryData(["users"], (prevUsers) =>
//           prevUsers?.filter((user) => user.id !== userId)
//         );
//       },
//     });
//   }