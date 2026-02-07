import {Router} from 'express';
import { getAllEmployees, addEmployee, updateEmployee, deleteEmployee } from '../controllers/employee.controller';

const router = Router();
router.get('/allEmployees', getAllEmployees);
router.post('/addEmployee', addEmployee);
router.put('/updateEmployee/:employeeID', updateEmployee);
router.delete('/deleteEmployee/:employeeID', deleteEmployee);

export default router;