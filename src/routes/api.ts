import { Router } from 'express';
import userRouter from './constellation-router';


// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/', userRouter);

// Export default.
export default baseRouter;
