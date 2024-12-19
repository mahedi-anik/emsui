import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col, Pagination } from 'react-bootstrap';
import EmployeeService from '../../Services/EmployeeService';
import EmployeeFormModal from './EmployeeFormModal';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, [pageIndex, pageSize, searchTerm]);

    const fetchEmployees = async () => {
        try {
            const data = await EmployeeService.getEmployees(searchTerm, pageIndex, pageSize);
            console.log(data); 
            if (data?.isSuccess && Array.isArray(data.records)) {
                setEmployees(data.records);
                setTotalRecords(data.totalRecords); 
            } else {
                console.error('Unexpected response structure:', data);
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleShow = (employee = null) => {
        setSelectedEmployee(employee);
        setShowModal(true); 
    };

    const handleClose = () => {
        setSelectedEmployee(null); 
        setShowModal(false); 
    };
    
    useEffect(() => {
        console.log('Modal state changed:', showModal);
    }, [showModal]);
    

    const handleSubmit = async (employee) => {
        if (employee.id) {
            await EmployeeService.updateEmployee(employee);
        } else {
            await EmployeeService.createEmployee(employee);
        }
        fetchEmployees();
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
                        <h2>Employee List</h2> &nbsp;
                        <Button variant="primary" onClick={() => handleShow()}>Add New</Button>
                    </Col>
                    <Col md={4} className="text-right">
                        {/* Search Input */}
                        <Form.Control
                            type="text"
                            placeholder="Search by Employee Name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="mb-2"
                        />
                    </Col>
                </Row>



                {/* employees Table */}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Department</th>
                            <th>Position</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>DOJ</th>
                            <th>Is Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0 ? (
                            employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.employeeName}</td>
                                    <td>{employee.departmentName}</td>
                                    <td>{employee.position}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td>
    {employee.joiningDate
        ? new Intl.DateTimeFormat("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        }).format(new Date(employee.joiningDate))
        : "N/A"}
</td>
                                    <td>{employee.isActive ? 'Active' : 'Inactive'}</td>
                                    <td>
                                        <Button variant="warning" onClick={() => handleShow(employee)}>
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No employees available.</td>
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

            <EmployeeFormModal
                show={showModal}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                employee={selectedEmployee}
            />
        </div>
    );
};

export default EmployeeList;
