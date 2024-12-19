import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import EmployeeService from '../../Services/EmployeeService';

const DepartmentFormModal = ({ show, handleClose, handleSubmit, department }) => {
    const [formData, setFormData] = useState({
        id: '',
        departmentName: '',
        managerId: '',
        budget: 0,
        isActive: true,
    });

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await EmployeeService.getEmployees();
                setEmployees(data.records || []);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    useEffect(() => {
        if (department) {
            setFormData({
                id: department.id || '',
                departmentName: department.departmentName || '',
                managerId: department.managerId || '',
                budget: department.budget || '',
                isActive: department.isActive || true,
            });
        }
        else {
            setFormData({
                id: '',
                departmentName: '',
                managerId: '',
                budget: 0,
                isActive: true,
            })
        }
    }, [department]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(formData);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{department ? 'Edit Department' : 'Create Department'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="formDepartmentName">
                        <Form.Label>Department Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="departmentName"
                            value={formData.departmentName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formManagerId">
                        <Form.Label>Manager</Form.Label>
                        <Form.Control
                            as="select"
                            name="managerId"
                            value={formData.managerId}
                            onChange={handleChange}
                        >
                            <option value="">Select Manager</option>
                            {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.employeeName}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBudget">
                        <Form.Label>Budget</Form.Label>
                        <Form.Control
                            type="number"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formIsActive">
                        <Form.Check
                            type="checkbox"
                            label="Is Active"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        />
                    </Form.Group>
                    <Modal.Footer className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default DepartmentFormModal;
