import EmployeeTableProps from "../types/EmployeeTableProps";
import { Link } from "react-router-dom";

const EmployeeTable: React.FC<EmployeeTableProps> = ({ data, pageSize, deleteEmployee, employeeIndex }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th style={{ width: '100px' }}>No.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Country</th>
          <th>Contact</th>
          <th style={{ width: '100px' }}></th>
        </tr>
      </thead>
      <tbody>
        {data.map((employee, index) => (
          <tr key={employee.id}>
            <td>{employeeIndex + index + 1}</td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.country}</td>
            <td>{employee.contact}</td>
            <td>
              <div className="dropdown d-flex justify-content-center">
                <a className="btn btn-sm btn-outline-secondary" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-solid fa-ellipsis"></i></a>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li><Link to={`/update/${employee.id}`} className="dropdown-item">Edit</Link></li>
                  <li><a className="dropdown-item" href="#" onClick={() => deleteEmployee(employee.id)}>Delete</a></li>
                </ul>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
