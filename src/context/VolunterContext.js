import { message } from "antd";
import React, { createContext, useState, useContext, useEffect } from "react";
import { BASE_URL } from "../api/baseURL";

const VolunteersContext = createContext();

export const useVolunteers = () => useContext(VolunteersContext);

export const VolunteersProvider = ({ children }) => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [queryString, setQueryString] = useState(null);
  const [statusCode, setStatusCode] = useState(1)

  useEffect(() => {
    if (queryString) {
      const fetchVolunteers = async () => {
        setLoading(true);
        const url = `${BASE_URL}/Volunteers/GetByFilter?filter=${queryString}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          const users = data.data.map((user) => ({
            ...user,
            fullName: `${user.name} ${user.surname} ${user.fatherName}`.trim(),
            security: `${
              user.securityCheckResults[0]?.securityCheckResultName?.name ||
              "Yoxlanmayıb"
            }`,
          }));
          setVolunteers(users || []);
          setStatusCode(2)
        } catch (error) {
          console.error("Error fetching volunteers:", error);
          setStatusCode(false)
          message.error('Məlumat tapılmadı')
        } finally {
          setLoading(3);
        }
      };
      fetchVolunteers();
    }
  }, [queryString]);


  return (
    <VolunteersContext.Provider value={{ volunteers, statusCode, setQueryString, loading, setStatusCode }}>
      {children}
    </VolunteersContext.Provider>
  );
};
