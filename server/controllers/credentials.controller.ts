// src/controllers/user.controller.ts

// Import Request and Response types from Express for typing HTTP requests and responses
import { Request, Response } from 'express';

// Controller function to handle fetching all users
export const getAllUsers = (req: Request, res: Response) => {
  // Send a JSON response back to the client
  res.json({ message: "Fetching all users..." });
};

// Controller function to handle fetching a single user by ID
export const getUserById = (req: Request, res: Response) => {

  // Extract the user ID from the URL parameters
  const { id } = req.params;

  // Send a JSON response containing the requested user ID
  res.json({ message: `Fetching user with ID: ${id}` });
};