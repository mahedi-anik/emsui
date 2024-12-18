// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DepartmentList from './components/Department/DepartmentList';

const App = () => {
  return (
    <div class="card text-center">
      <div class="card-header">
        Employee Management System
      </div>
      <div class="card-body">
        <DepartmentList />
      </div>
      <div class="card-footer text-muted">
        ASP.NET TEST -Dec 2024- Qtec Solution Limited
      </div>
    </div>

  );
};

export default App;