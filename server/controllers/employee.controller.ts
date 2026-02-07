// src/controllers/employee.controller.ts
import { Request, Response } from "express";
import {User} from '../models/employee.model';

// To Fetch All Employees
export const getAllEmployees = async (req: Request, res: Response) => {
    try{
        const users = await User.find();
        console.log(users);
        return res.status(200).json({success: true, message: "Employees fetched successfully", users});
    }catch(error){
        return res.status(400).json({success: false, message: "Error: ", error})
    }
}

// Adding of New Employee
export const addEmployee = async(req: Request, res: Response) => {
    try{
        const {employeeID, fname, mname, lname, email, userName, password, role} = req.body;
        const empID = await User.findOne({employeeID:employeeID});
        const empEmail = await User.findOne({email:email});
        if(empID){
            console.log("Employee ID already exist!")
            return res.status(400).json({success: false, message:"Employee ID already exist!"});
        }else{
            if(empEmail){
                console.log("Email already exist!");
                return res.status(400).json({success: false, message:"Email already exist!"});
            }else{
                const newEmployee = new User({
                    employeeID : employeeID,
                    firstName : fname,
                    middleName : mname,
                    lastName : lname,
                    email : email,
                    username : userName,
                    password : password,
                    role: role
                });
                await newEmployee.save();
                const user = await User.find();
                console.log("Successfully added new employee!")
            }   return res.status(200).json({success: true, message:"Successfully added new employee!"});
        }
    }catch(error){
        console.log("Error", error);
    }
}

//Update Employee
export const updateEmployee = async(req: Request, res: Response) => {
    try{
        const {employeeID} = req.params;
        const {fname, mname, lname, email, userName, password, role} = req.body;
        const filter = {employeeID:employeeID};
        const update = {
            firstName : fname,
            middleName : mname,
            lastName : lname,
            email : email,
            username : userName,
            password : password,
            role: role
        };

        const response = await User.findOneAndUpdate(filter, update,{
            new: true,
            runValidators: true //to ensure the schema validation
        });

        if(!response){
            console.log("Employee doesn't exist!");
            return res.status(400).json({success: false, message:"Employee doesn't exist!"});
        }else{
            console.log("Successfully updated employee!");
            return res.status(200).json({success: true, message:"Successfully updated employee!"});
        }
    }catch(error){
        console.log("Error", error);
    }
}

// Delete Employee
export const deleteEmployee = async (req: Request, res: Response) => {
    try{
        const {employeeID} = req.params;
        console.log(employeeID);
        const response = await User.findOneAndDelete({employeeID:employeeID});
        if(response){
            console.log("Successfully Deleted!");
            return res.status(200).json({success: true, message:"Successfully deleted employee!"});
        }else{
            console.log("No Employee Found!");
            return res.status(400).json({success: false, message:"No employee found!"});
        }
    }catch(error){
        console.log("Error", error);
    }
}
