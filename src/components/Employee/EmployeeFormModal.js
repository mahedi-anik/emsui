import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import DepartmentService from '../../Services/DepartmentService';

const EmployeeFormModal = ({ show, handleClose, handleSubmit, employee }) => {
    const [formData, setFormData] = useState({
        id: '',
        employeeName: '',
        departmentId: '',
        position: '',
        email: '',
        phone: '',
        joiningDate: '',
        address: '',
        isActive: true,
    });

    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const data = await DepartmentService.getDepartments();
                setDepartments(data.records || []);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchDepartments();
    }, []);


    useEffect(() => {
        if (employee) {
            const formattedJoiningDate = employee.joiningDate && employee.joiningDate !== '0001-01-01T00:00:00'
                ? new Date(employee.joiningDate).toISOString().split('T')[0]
                : '';
            setFormData({
                id: employee.id || '',
                employeeName: employee.employeeName || '',
                departmentId: employee.departmentId || '',
                position: employee.position || '',
                email: employee.email || '',
                phone: employee.phone || '',
                address: employee.address || '',
                joiningDate: formattedJoiningDate,
                isActive: employee.isActive || true,
            });
        } else {
            setFormData({
                id: '',
                employeeName: '',
                departmentId: '',
                position: '',
                email: '',
                phone: '',
                address: '',
                joiningDate: '',
                isActive: true,
            });
        }
    }, [employee]);

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
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{employee ? 'Update Employee Info' : 'Add New Employee Info'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formEmployeeName">
                                <Form.Label>Employee Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="employeeName"
                                    value={formData.employeeName}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formDepartmentId">
                                <Form.Label>Department</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="departmentId"
                                    value={formData.departmentId}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Department</option>
                                    {departments.map((department) => (
                                        <option key={department.id} value={department.id}>
                                            {department.departmentName}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formPosition">
                                <Form.Label>Position</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formJoiningDate">
                                <Form.Label>Joining Date</Form.Label>
                                <Form.Control
                                    type="Date"
                                    name="joiningDate"
                                    value={formData.joiningDate}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}

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

export default EmployeeFormModal;