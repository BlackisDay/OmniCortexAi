import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { errorHandler } from "./middleware/errorHandler";
import employeeRoutes from "./routes/employeeRoutes";
import chatRoutes from "./routes/chatRoutes";
import companyRoutes from "./routes/companyRoutes";
import transactionsRoutes from "./routes/financeRoutes";
import legalRoutes from "./routes/legalRoutes";
import schedulesRoutes from "./routes/schedulingRoutes";
import subscriptionRoutes from "./routes/subscriptionRoutes";
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";

dotenv.config();
const app = express();
//Middleware
app.use(errorHandler);


app.use(cors());
app.use(json());

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/legal", legalRoutes);
app.use("/api/schedules", schedulesRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
// Error handling (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
export default app;