import axios from 'axios';

const API_URL = 'https://localhost:7084/api/PerformanceReview'; 

const getPerformanceReviews = async (searchTerm = '', pageIndex = 0, pageSize = 10, sortField = '', sortOrder = '') => {
    const params = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        sortField: String,
        sortOrder: 0
    };

    if (searchTerm) {
        params.searchTerm = searchTerm;
    }

    const response = await axios.get(`${API_URL}/GetPerformanceReviews`, { params });
    return response.data;
};

const getEmployeePerformanceHistory = async (id) => {
    if (!id || typeof id !== 'string') {
        throw new Error("A valid GUID Id (string) is required to fetch the employee details.");
    }

    try {
        // Pass the ID in the URL path
        const response = await axios.get(`${API_URL}/GetEmployeePerformanceHistory/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching employee performance details:", error);
        throw error;
    }
};

const createPerformanceReview = async (department) => {
    const response = await axios.post(`${API_URL}/createPerformanceReview`, department);
    return response.data;
};

const updatePerformanceReview = async (department) => {
    const response = await axios.put(`${API_URL}/updatePerformanceReview`, department);
    return response.data;
};

export default {
    getPerformanceReviews,
    createPerformanceReview,
    updatePerformanceReview,
    getEmployeePerformanceHistory
};