import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../api/baseURL";

export const useLanguages = () => {
  const [languages, setLanguages] = useState([]);
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/LanguageNames`
        );
        setLanguages(response.data.data);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
    fetchLanguages();
  }, []);
  return languages;
};

export const useComputerSkills = () => {
  const [computerSkill, setComputerSkill] = useState([]);
  useEffect(() => {
    const fetchComputerSkills = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/ComputerSkillNames`
        );
        setComputerSkill(response.data.data);
      } catch (error) {
        console.error("Error fetching computer skills:", error);
      }
    };
    fetchComputerSkills();
  }, []);
  return computerSkill;
};

export const useEducationDegree = () => {
  const [education, setEducation] = useState([]);
  useEffect(() => {
    const fetchEducationDegrees = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/EducationDegrees`
        );
        setEducation(response.data.data);
      } catch (error) {
        console.error("Error fetching education degrees:", error);
      }
    };
    fetchEducationDegrees();
  }, []);
  return education;
};

export const useSecurityStatus = () => {
  const [securityStatus, setSecurityStatus] = useState([]);
  useEffect(() => {
    const fetchSecurityStatus = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/SecurityCheckResultName`
        );
        setSecurityStatus(response.data.data);
      } catch (error) {
        console.error("Error fetching security status:", error);
      }
    };
    fetchSecurityStatus();
  }, []);
  return securityStatus;
};

export const useVoluntaryStatus = () => {
  const [valunaryStatus, setValuntaryStatus] = useState([]);
  useEffect(() => {
    const fetchSecurityStatus = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/VoluntaryOfMesStatuses`
        );
        setValuntaryStatus(response.data.data);
      } catch (error) {
        console.error("Error fetching security status:", error);
      }
    };
    fetchSecurityStatus();
  }, []);
  return valunaryStatus;
};
