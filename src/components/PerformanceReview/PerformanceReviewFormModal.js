import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import DepartmentService from '../../Services/DepartmentService';
import EmployeeService from '../../Services/EmployeeService';

const PerformanceReviewFormModal = ({ show, handleClose, handleSubmit, performanceReview }) => {
    const [formData, setFormData] = useState({
        id: '',
        employeeId: '',
        reviewDate: '',
        reviewScore: '',
        reviewNote: '',
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
        if (performanceReview) {
            const formattedDate = performanceReview.reviewDate && performanceReview.reviewDate !== '0001-01-01T00:00:00'
                ? new Date(performanceReview.reviewDate).toISOString().split('T')[0]
                : '';
            setFormData({
                id: performanceReview.id || '',
                employeeId: performanceReview.employeeId || '',
                reviewDate: formattedDate,
                reviewScore: performanceReview.reviewScore || '',
                reviewNote: performanceReview.reviewNote || '',
                isActive: performanceReview.isActive || true,
            });
        }
        else {
            setFormData({
                id: '',
                employeeId: '',
                reviewDate: '',
                reviewScore: '',
                reviewNote: '',
                isActive: true,
            })
        }
    }, [performanceReview]);

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
                <Modal.Title>{performanceReview ? 'Update Employee Performance Review Info' : 'Add Employee Performance Review'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Row>

                        <Col md={6}>
                            <Form.Group controlId="formEmployeeId">
                                <Form.Label>Employee Name</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="employeeId"
                                    value={formData.employeeId}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Employee</option>
                                    {employees.map((employee) => (
                                        <option key={employee.id} value={employee.id}>
                                            {employee.employeeName}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formReviewDate">
                                <Form.Label>Review Date</Form.Label>
                                <Form.Control
                                    type="Date"
                                    name="reviewDate"
                                    value={formData.reviewDate}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formReviewScore">
                                <Form.Label>Review Score</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="reviewScore"
                                    value={formData.reviewScore}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formReviewNote">
                                <Form.Label>Review Note</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="reviewNote"
                                    value={formData.reviewNote}
                                    onChange={handleChange}

                                />
                            </Form.Group>
                        </Col>
                    </Row>


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

export default PerformanceReviewFormModal;