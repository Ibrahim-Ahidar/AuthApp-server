const Employee = require("../model/Employee");

const getAllEmpolyees = async (req, res) => {
    const employees = await Employee.find().lean();
    return res.json(employees);
}
const createEmployee = async (req, res) => {
    const { firstname, lastname } = req.body;
    if (!firstname || !lastname) {
        return res.status(400).json({ "message": "firstname and lastname are required." });
    }

    const result = await Employee.create({ firstname, lastname });
    return res.status(201).json(result);
}
const updateEmployee = async (req, res) => {
    const { firstname, lastname, id } = req.body;
    if (!id) {
        return res.status(400).json({ "message": "id is required." });
    }

    const employee = await Employee.findById(id).exec();
    if (!employee) {
        return res.status(404).json({ "message": `Employee ${id} not found.` });
    }

    if (firstname) employee.firstname = firstname;
    if (lastname) employee.lastname = lastname;

    const result = await employee.save();
    return res.json(result);
}
const deleteEmployee = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ "message": "id is required." });
    }

    const employee = await Employee.findById(id).exec();
    if (!employee) {
        return res.status(404).json({ "message": `Employee ${id} not found.` });
    }

    const result = await Employee.deleteOne({ _id: id });
    return res.json(result);
}
const getEmployee = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ "message": "id is required." });
    }

    const employee = await Employee.findById(id).lean();
    if (!employee) {
        return res.status(404).json({ "message": `Employee ${id} not found.` });
    }
    return res.json(employee);
}
module.exports = {
    getAllEmpolyees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
};
