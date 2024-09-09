import axios from "axios";
import { BASE_URL } from "../baseURL";

export const TypesData = async (setTypes,endPoint) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/${endPoint}`,
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