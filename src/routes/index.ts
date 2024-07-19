import { Router } from 'express';
import productRouter from '../product/ProductController';


const router = Router();

router.use('', productRouter);

export default router;
