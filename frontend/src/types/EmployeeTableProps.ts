import Employee from "../Employee";

interface EmployeeTableProps {
  data: Employee[];
  employeeIndex: number;
  pageSize: number;
  deleteEmployee: (id: number) => void;
}

export default EmployeeTableProps;