const express = require('express');
const router = express.Router();
const employeesControler = require("../../controler/employeesControler");
const ROLES_LIST = require("../../config/roles_list").ROLES_LIST;
const verifyRoles = require("../../middleware/verifyRoles");

router.route('/')
    .get(employeesControler.getAllEmpolyees)
    .post(verifyRoles(ROLES_LIST.admin, ROLES_LIST.editor), employeesControler.createEmployee)
    .put(verifyRoles(ROLES_LIST.admin, ROLES_LIST.editor),employeesControler.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.admin),employeesControler.deleteEmployee);

router.route('/getOne')
    .get(employeesControler.getEmployee);


module.exports = router;