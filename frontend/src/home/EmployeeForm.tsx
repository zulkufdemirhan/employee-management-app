import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    country: yup.string().required("Country is required"),
    contact: yup.string().required("Contact is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      country: "",
      contact: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (!id) {
          await createEmployee(values);
        } else {
          await updateEmployee(values, id);
        }
        navigate("/");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  useEffect(() => {
    if (id) {
      getEmployee(id);
    }
  }, [id]);

  const getEmployee = async (id: string) => {
    try {
      const res = await axios.get(`http://localhost:3001/employees/${id}`);
      if (res.status === 200) {
        formik.setValues(res.data);
      }
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };

  const createEmployee = async (data: { name: string; email: string; country: string; contact: string }) => {
    try {
      const res = await axios.post("http://localhost:3001/employees/", data);
      if (res.status === 200) {
        toast.success(res.data);
      }
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  const updateEmployee = async (data: { name: string; email: string; country: string; contact: string }, id: string) => {
    try {
      const res = await axios.put(`http://localhost:3001/employees/${id}`, data);
      if (res.status === 200) {
        toast.success(res.data);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="col-12 col-md-10">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input 
            type="text"
            className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            placeholder="Enter a name"
          />
          {formik.touched.name && formik.errors.name && <div className="invalid-feedback">{formik.errors.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Enter an email"
          />
          {formik.touched.email && formik.errors.email && <div className="invalid-feedback">{formik.errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">Country</label>
          <input 
            type="text"
            className={`form-control ${formik.touched.country && formik.errors.country ? 'is-invalid' : ''}`}
            id="country"
            name="country"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.country}
            placeholder="Enter a country"
          />
          {formik.touched.country && formik.errors.country && <div className="invalid-feedback">{formik.errors.country}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="contact" className="form-label">Contact</label>
          <input 
            type="text"
            className={`form-control ${formik.touched.contact && formik.errors.contact ? 'is-invalid' : ''}`}
            id="contact"
            name="contact"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.contact}
            placeholder="Enter a contact"
          />
          {formik.touched.contact && formik.errors.contact && <div className="invalid-feedback">{formik.errors.contact}</div>}
        </div>
        <input type="submit" className="btn btn-primary me-3" value={id ? "Update" : "Add"}/>
        <Link to={"/"} className="btn btn-outline-secondary">Back</Link>
      </form>
    </div>
  );
}

export default EmployeeForm;
