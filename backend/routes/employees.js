import express from "express";
import { createEmployee, deleteEmployee, getEmployees, showEmployee, updateEmployee } from "../controllers/employees.js";

const router = express.Router();

router.get("/", getEmployees);
router.get("/:id", showEmployee);
router.post("/", createEmployee);
router.delete("/:id", deleteEmployee);
router.put("/:id", updateEmployee);

export default router;