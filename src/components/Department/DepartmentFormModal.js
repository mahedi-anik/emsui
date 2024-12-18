// src/Components/Department/DepartmentFormModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const DepartmentFormModal = ({ show, handleClose, handleSubmit, department }) => {
    const [formData, setFormData] = useState({
        id: '',
        departmentName: '',
        managerId: '',
        employeeName: '',
        budget: 0,
        isActive: true,
    });

    useEffect(() => {
        if (department) {
            setFormData(department);
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
                        <Form.Label>Manager ID</Form.Label>
                        <Form.Control
                            type="text"
                            name="managerId"
                            value={formData.managerId}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmployeeName">
                        <Form.Label>Employee Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="employeeName"
                            value={formData.employeeName}
                            onChange={handleChange}
                            
                        />
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
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default DepartmentFormModal;