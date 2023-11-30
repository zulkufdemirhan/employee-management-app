import { v4 as uuid } from "uuid";

let employees = [
  {
    id: uuid(),
    name: "John",
    email: "mr_wick@continantel.com",
    country: "USA",
    contact: "+01122312323"
  },
  {
    id: uuid(),
    name: "Rick",
    email: "rick@hotmail.com",
    country: "Turkey",
    contact: "+90512399123"
  }
];

export const getEmployees = (req, res) => {
  const { page = 1, pageSize = 2 } = req.query;
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  const paginatedEmployees = employees.slice(startIndex, endIndex);
  
  const totalEmployees = employees.length;

  res.send({
    data: paginatedEmployees,
    totalEmployees: totalEmployees,
    isLastPage: endIndex >= totalEmployees,
  });
};

export const showEmployee = (req, res) => {
  const id = req.params.id;
  const employee = employees.find((e) => e.id == id);

  if(!employee) {
    res.status(400).send("Employee not found!");
  }
  res.send(employee);
};

export const createEmployee = (req, res) => {
  const { name, email, country, contact } = req.body;

  const employee = {
    id: uuid(),
    name: name,
    email: email,
    country: country,
    contact: contact
  };

  employees.push(employee);
  res.send("New employee created!")
};

export const deleteEmployee = (req, res) => {
  const id = req.params.id;
  const employee = employees.find((e) => e.id == id);
  employees = employees.filter((e) => e.id !== id);

  if(!employee) {
    res.status(400).send("Employee deleted!");
  }

  res.send(employee);
};

export const updateEmployee = (req, res) => {
  const id = req.params.id;
  const employee = employees.find((e) => e.id == id);
  const { name, email, country, contact } = req.body;

  if(!employee) {
    res.status(400).send("Employee not found!");
  }

  employee.name    = name;
  employee.email   = email;
  employee.country = country;
  employee.contact = contact;

  res.send("Employee updated!");
};