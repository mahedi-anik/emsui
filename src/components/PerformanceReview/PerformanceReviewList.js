import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col, Pagination,Modal  } from 'react-bootstrap';
import PerformanceService from '../../Services/PerformanceService';
import PerformanceReviewFormModal from './PerformanceReviewFormModal';

const PerformanceReviewList = () => {
    const [performanceReviews, setPerformanceReviews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPerformanceReview, setSelectedPerformanceReview] = useState(null);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [employeeHistory, setEmployeeHistory] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPerformanceReviews();
    }, [pageIndex, pageSize, searchTerm]);

    const fetchPerformanceReviews = async () => {
        try {
            const data = await PerformanceService.getPerformanceReviews(searchTerm, pageIndex, pageSize);
            console.log(data);
            if (data?.isSuccess && Array.isArray(data.records)) {
                setPerformanceReviews(data.records);
                setTotalRecords(data.totalRecords);
            } else {
                console.error('Unexpected response structure:', data);
            }
        } catch (error) {
            console.error('Error fetching performanceReviews:', error);
        }
    };

    const handleShow = (performanceReview = null) => {
        setSelectedPerformanceReview(performanceReview);
        setShowModal(true);
    };

    const handleClose = () => {
        setSelectedPerformanceReview(null);
        setShowModal(false);
    };

    useEffect(() => {
        console.log('Modal state changed:', showModal);
    }, [showModal]);


    const handleSubmit = async (performanceReview) => {
        if (performanceReview.id) {
            await PerformanceService.updatePerformanceReview(performanceReview);
        } else {
            await PerformanceService.createPerformanceReview(performanceReview);
        }
        fetchPerformanceReviews();
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

    const handleViewHistory = async (employeeId) => {
        try {
            const historyData = await PerformanceService.getEmployeePerformanceHistory(employeeId);
            setEmployeeHistory(historyData);
            setShowHistoryModal(true);
        } catch (error) {
            console.error('Error fetching employee performance history:', error);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <Row className="mb-6">
                    <Col md={8}>
                        <h2>Employee's Performance-Review List</h2> &nbsp;
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
                            <th>Review Date</th>
                            <th>Review Score</th>
                            <th>Review Note</th>
                            <th>Is Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {performanceReviews.length > 0 ? (
                            performanceReviews.map((performanceReview) => (
                                <tr key={performanceReview.id}>
                                    <td>{performanceReview.employeeName}</td>
                                    <td>
                                        {performanceReview.reviewDate
                                            ? new Intl.DateTimeFormat("en-US", {
                                                month: "2-digit",
                                                day: "2-digit",
                                                year: "numeric",
                                            }).format(new Date(performanceReview.reviewDate))
                                            : "N/A"}
                                    </td>
                                    <td>{performanceReview.reviewScore}</td>
                                    <td>{performanceReview.reviewNote}</td>
                                    <td>{performanceReview.isActive ? 'Active' : 'Inactive'}</td>
                                    <td>
                                        <Button variant="warning" onClick={() => handleShow(performanceReview)}>
                                            Edit
                                        </Button>
                                        &nbsp;
                                        <Button variant="info" onClick={() => handleViewHistory(performanceReview.employeeId)}>
                                            View
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No performance review available.</td>
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

            <PerformanceReviewFormModal
                show={showModal}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                performanceReview={selectedPerformanceReview}
            />
            {/* Employee History Modal */}
            <Modal show={showHistoryModal} onHide={() => setShowHistoryModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Employee Performance History</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {employeeHistory.length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Employee Name </th>
                                    <th>Review Date</th>
                                    <th>Review Score</th>
                                    <th>Review Note</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employeeHistory.map((history, index) => (
                                    <tr key={index}>
                                        <td>{history.employeeName}</td>
                                        <td>{new Intl.DateTimeFormat("en-US").format(new Date(history.reviewDate))}</td>
                                        <td>{history.reviewScore}</td>
                                        <td>{history.reviewNote}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No history available.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowHistoryModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PerformanceReviewList;
