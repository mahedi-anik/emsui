// src/Service/DepartmentService.js
import axios from 'axios';

const API_URL = 'https://localhost:7084/api/department'; // Adjust the URL as needed

const getDepartments = async (searchTerm = '', pageIndex = 0, pageSize = 10, sortField = '', sortOrder = '') => {
    const response = await axios.get(`${API_URL}/getDepartments`, {
        params: {
            searchTerm: searchTerm || '',  // Set to empty string if not provided
            pageIndex: pageIndex,
            pageSize: pageSize,
            sortField: String,
            sortOrder:  "asc" | "desc"
        }
    });
    return response.data;
};

const createDepartment = async (department) => {
    const response = await axios.post(`${API_URL}/createDepartment`, department);
    return response.data;
};

const updateDepartment = async (department) => {
    const response = await axios.put(`${API_URL}/updateDepartment`, department);
    return response.data;
};

export default {
    getDepartments,
    createDepartment,
    updateDepartment,
};