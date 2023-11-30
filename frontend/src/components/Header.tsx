import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="col-12 col-md-10 d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-2">
      <h3 className="mb-0">Employee Management</h3>
      <div className="col-2">
        <Link to="/employee/form" className="btn btn-primary float-end">
          Add New Employee
        </Link>
      </div>
    </header>
  );
}