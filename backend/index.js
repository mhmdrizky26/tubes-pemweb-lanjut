import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js"
import RoleRoute from "./routes/RoleRoute.js"
import CategoryRoute from "./routes/CategoryRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import TransactionRoute from "./routes/TransactionRoute.js";
import TransactionDetailRoute from './routes/TransactionDetailRoute.js';
import CartRoute from './routes/CartRoute.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(RoleRoute);
app.use(CategoryRoute);
app.use(ProductRoute);
app.use(TransactionRoute);
app.use(TransactionDetailRoute);
app.use(CartRoute);
app.use('/uploads', express.static('uploads'));

app.listen(5000,()=>console.log('Server up and running.....'));