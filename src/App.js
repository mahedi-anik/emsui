import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DepartmentList from './components/Department/DepartmentList';
import EmployeeList from './components/Employee/EmployeeList';
import PerformanceReview from './components/Employee/EmployeeList';

const App = () => {
  return (
    <Router>
      <div className="container mt-3">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Employee Management System
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/department">Department</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/employee">Employee</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/performance-review">Performance Review</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="card mt-3">
          <div className="card-body">
            <Routes>
              <Route path="/department" element={<DepartmentList />} />
              <Route path="/employee" element={<EmployeeList />} />
              <Route path="/performance-review" element={<PerformanceReview />} />
              <Route path="/" element={<h4>Welcome to Employee Management System!</h4>} />
            </Routes>
          </div>
          <div className="card-footer text-muted">
            ASP.NET TEST - Dec 2024 - Qtec Solution Limited
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;

