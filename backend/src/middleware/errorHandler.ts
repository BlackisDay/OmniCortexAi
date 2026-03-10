import { Request, Response, NextFunction } from "express";

// Custom error type
interface AppError extends Error {
  statusCode?: number;
}

// Error handling middleware
export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack); // Log the full stack for debugging

  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    error: message,
  });
};