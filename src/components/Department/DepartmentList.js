import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col, Pagination } from 'react-bootstrap';
import DepartmentService from '../../Services/DepartmentService';
import DepartmentFormModal from './DepartmentFormModal';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchDepartments();
    }, [pageIndex, pageSize, searchTerm]);

    const fetchDepartments = async () => {
        try {
            const data = await DepartmentService.getDepartments(searchTerm, pageIndex, pageSize);
            console.log(data); 
            if (data?.isSuccess && Array.isArray(data.records)) {
                setDepartments(data.records);
                setTotalRecords(data.totalRecords); 
            } else {
                console.error('Unexpected response structure:', data);
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

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setPageIndex(0); 
    };

    const handlePageChange = (newPageIndex) => {
        setPageIndex(newPageIndex);
    };

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setPageIndex(0); 
    };

    const totalPages = Math.ceil(totalRecords / pageSize);

    return (
        <div className="card">
            <div className="card-body">
                <Row className="mb-6">
                    <Col md={8}>
                        <h2>Department List</h2> &nbsp;
                        <Button variant="primary" onClick={() => handleShow()}>Add New</Button>
                    </Col>
                    <Col md={4} className="text-right">
                        {/* Search Input */}
                        <Form.Control
                            type="text"
                            placeholder="Search by Department Name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="mb-2"
                        />
                    </Col>
                </Row>



                {/* Departments Table */}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Department Name</th>
                            <th>Manager Name</th>
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
                                <td colSpan="5" className="text-center">No departments available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <Row>
                    <Col>
                        <div className="d-flex justify-content-between">
                            <div>
                                <label>Items per page:</label>
                                <select value={pageSize} onChange={handlePageSizeChange} className="ml-2">
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                            </div>

                            <Pagination>
                                <Pagination.Prev
                                    onClick={() => handlePageChange(pageIndex - 1)}
                                    disabled={pageIndex === 0}
                                />
                                <Pagination.Item>{pageIndex + 1}</Pagination.Item>
                                <Pagination.Next
                                    onClick={() => handlePageChange(pageIndex + 1)}
                                    disabled={pageIndex === totalPages - 1}
                                />
                            </Pagination>
                        </div>
                    </Col>
                </Row>
            </div>

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
