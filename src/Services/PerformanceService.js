// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/Department'; // Adjust the URL as needed

export const getDepartments = async () => {
    const response = await axios.get(`${API_URL}/GetDepartments`);
    return response.data;
};

export const getDepartment = async (id) => {
    const response = await axios.get(`${API_URL}/GetDepartment`, { params: { id } });
    return response.data;
};

export const createDepartment = async (department) => {
    const response = await axios.post(`${API_URL}/CreateDepartment`, department);
    return response.data;
};

export const updateDepartment = async (department) => {
    const response = await axios.put(`${API_URL}/UpdateDepartment`, department);
    return response.data;
};