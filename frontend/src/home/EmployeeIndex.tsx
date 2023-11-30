import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import { toast } from 'react-toastify';
import Employee from "../Employee";
import axios from "axios";

interface Props {
  pageSize: number;
}

export const EmployeeIndex: React.FC<Props> = ({ pageSize }) => {
  const [data, setData] = useState<Employee[]>([]);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [employeeCount, setEmployeeCount] = useState<number>(0);
  const [deletedData, setDeletedData] = useState<Employee[]>([]);
  
  const getEmployees = async () => {
    try {
      const res = await axios.get<{ data: Employee[]; isLastPage: boolean; totalEmployees: number }>(
        `http://localhost:3001/employees?page=${currentPage}`
      );
      if (res.status === 200) {
        setData(res.data.data);
        setStartIndex((currentPage - 1) * pageSize);
        setIsLastPage(res.data.isLastPage);
        setEmployeeCount(res.data.totalEmployees);
      }
    } catch (error: any) {
      toast.error("Error fetching employees:", error);
    }
  };
  
  const deleteEmployee = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      try {
        const res = await axios.delete<Employee[]>(
          `http://localhost:3001/employees/${id}`
        );
        
        if (res.status === 200) {
          setDeletedData((prevData) => [...prevData, ...data.filter((employee) => employee.id === id)]);
          getEmployees();
        }
      } catch (error: any) {
        toast.error("Someting went wrong:", error);
      }
    }
  };
  

  useEffect(() => {
    getEmployees();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="col-12 col-md-10">
      <EmployeeTable data={data} pageSize={pageSize} deleteEmployee={deleteEmployee} employeeIndex={startIndex} />
      <Pagination
        currentPage={currentPage}
        isLastPage={isLastPage}
        totalPageItem={employeeCount}
        onPageChange={handlePageChange}
      />
      <div className="w-100 border my-5"></div>
      <h3 className="mb-2 py-3">Deleted Employees</h3>
      <EmployeeTable data={deletedData} pageSize={pageSize} deleteEmployee={() => {}} employeeIndex={0} />
    </div>
  );
};