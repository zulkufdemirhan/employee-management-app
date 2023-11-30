import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { EmployeeIndex } from './home/EmployeeIndex';
import EmployeeForm  from './home/EmployeeForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <ToastContainer/>
      <div className="container d-flex flex-column align-items-center vh-100 mt-5">
        <Header/>
        <Routes>
          <Route path="/" element={<EmployeeIndex pageSize={2}/>}/>
          <Route path="/employee/form" element={<EmployeeForm/>}/>
          <Route path="/update/:id" element={<EmployeeForm/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;