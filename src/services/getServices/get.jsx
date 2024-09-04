import { useState, useEffect } from 'react';
import axios from 'axios';

export const useLanguages = () => {
  const [languages, setLanguages] = useState([]);
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get('https://api-volunteers.fhn.gov.az/api/v1/LanguageNames');
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
        const response = await axios.get('https://api-volunteers.fhn.gov.az/api/v1/ComputerSkillNames');
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
        const response = await axios.get('https://api-volunteers.fhn.gov.az/api/v1/EducationDegrees');
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
        const response = await axios.get('https://api-volunteers.fhn.gov.az/api/v1/SecurityCheckResultName');
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
        const response = await axios.get('https://api-volunteers.fhn.gov.az/api/v1/VoluntaryOfMesStatuses');
        setValuntaryStatus(response.data.data);
      } catch (error) {
        console.error("Error fetching security status:", error);
      }
    };
    fetchSecurityStatus();
  }, []);
  return valunaryStatus;
};