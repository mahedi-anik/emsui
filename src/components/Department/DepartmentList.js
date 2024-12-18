// src/Components/Department/DepartmentList.js
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import DepartmentService from '../../Services/DepartmentService';
import DepartmentFormModal from './DepartmentFormModal';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [showModal, setShowModal] = useState (false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const data = await DepartmentService.getDepartments();
            console.log(data); // Log the data to check its structure
            if (Array.isArray(data)) {
                setDepartments(data);
            } else {
                console.error('Expected an array but got:', data);
            }
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const handleShow = (department = null) => {
        setSelectedDepartment(department);
        setShowModal(true);
    };

    const handleClose = () => {
        setSelectedDepartment(null);
        setShowModal(false);
    };

    const handleSubmit = async (department) => {
        if (department.id) {
            await DepartmentService.updateDepartment(department);
        } else {
            await DepartmentService.createDepartment(department);
        }
        fetchDepartments();
    };

    return (
        <div class="card">
            <div>
            <h2>Department List &nbsp;
            <Button variant="primary" onClick={() => handleShow()}>
                Add New
            </Button>
            </h2>
            </div>
            
            
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Department Name</th>
                        <th>Manager ID</th>
                        <th>Employee Name</th>
                        <th>Budget</th>
                        <th>Is Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
    {departments.length > 0 ? (
        departments.map((department) => (
            <tr key={department.id}>
                <td>{department.departmentName}</td>
                <td>{department.managerId}</td>
                <td>{department.employeeName}</td>
                <td>{department.budget}</td>
                <td>{department.isActive ? 'Active' : 'Inactive'}</td>
                <td>
                    <Button variant="warning" onClick={() => handleShow(department)}>
                        Edit
                    </Button>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="6" className="text-center">No departments available.</td>
        </tr>
    )}
</tbody>

            </table>
            <DepartmentFormModal
                show={showModal}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                department={selectedDepartment}
            />
        </div>
    );
};

export default DepartmentList;