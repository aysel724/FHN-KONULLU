import React, { createContext, useState, useContext, useEffect } from "react";

const VolunteersContext = createContext();

export const useVolunteers = () => useContext(VolunteersContext);

export const VolunteersProvider = ({ children }) => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [queryString, setQueryString] = useState(null);

  useEffect(() => {
    if (queryString) {
      const fetchVolunteers = async () => {
        setLoading(true);
        const url = `https://api-volunteers.fhn.gov.az/api/v1/Volunteers/GetByFilter?filter=${queryString}`;

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
        } catch (error) {
          console.error("Error fetching volunteers:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchVolunteers();
    }
  }, [queryString]);

  //   const users = response.data.data.map((user) => ({
  //     ...user,
  //     fullName: `${user.name} ${user.surname} ${user.fatherName}`.trim(),
  //     security: `${
  //       user.securityCheckResults[0]?.securityCheckResultName?.name ||
  //       "Yoxlanmayıb"
  //     }`,
  //   }));
  return (
    <VolunteersContext.Provider value={{ volunteers, setQueryString, loading }}>
      {children}
    </VolunteersContext.Provider>
  );
};
