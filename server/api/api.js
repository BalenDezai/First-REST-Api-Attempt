import express from 'express';
import employeeRoute from './employee/employeeRouter';
import walletRoute from './wallet/walletRouter';
import scheduleRoute from './schedule/scheduleRoutes';
import jobRoute from './job/jobRouter';
import workRoute from './work/workRouter';

const router = express.Router();

router.use('/employee', employeeRoute);
router.use('/employee:id/schedule', scheduleRoute);
router.use('/employee/:id/wallet', walletRoute);
router.use('/employee/:id/job', jobRoute);
router.use('/employee/:id/work', workRoute);

export default router;
