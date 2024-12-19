import axios from 'axios';

const API_URL = 'https://localhost:7084/api/Employee';

const getEmployees = async (searchTerm = '', pageIndex = 0, pageSize = 10, sortField = '', sortOrder = '') => {
    const params = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        sortField: String,
        sortOrder: 0
    };

    if (searchTerm) {
        params.searchTerm = searchTerm;
    }

    const response = await axios.get(`${API_URL}/GetEmployees`, { params });
    return response.data;
};
const getEmployee = async (id) => {
    if (!id || typeof id !== 'string') {
        throw new Error("A valid GUID Id (string) is required to fetch the employee details.");
    }

    try {
        const response = await axios.get(`${API_URL}/GetEmployee`, { params: { id } });
        return response.data;
    } catch (error) {
        console.error("Error fetching employee details:", error);
        throw error;
    }
};

const createEmployee = async (employee) => {
    const response = await axios.post(`${API_URL}/createEmployee`, employee);
    return response.data;
};

const updateEmployee = async (employee) => {
    const response = await axios.put(`${API_URL}/updateEmployee`, employee);
    return response.data;
};

export default {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
};