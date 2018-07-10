const router = require('express').Router();
const verifyToken = require('../middleware/authMIddleware/verifyToken');
const getFullUser = require('../middleware/authMIddleware/getFullUser');
const verifyRole = require('../middleware/authMIddleware/verifyRole');
const employeeRoute = require('./employee/employeeRouter');
const walletRoute = require('./wallet/walletRouter');
const scheduleRoute = require('./schedule/scheduleRoutes');
const jobRoute = require('./job/jobRouter');
const workRoute = require('./work/workRouter');
const userRoutes = require('./user/userRouter');

const verifyTokenAndGetUser = [verifyToken(), getFullUser()];

router.use('/users', verifyTokenAndGetUser, verifyRole(), userRoutes);
router.use('/employees', verifyTokenAndGetUser, employeeRoute);
router.use('/employees/:id/schedules', verifyTokenAndGetUser, scheduleRoute);
router.use('/employees/:id/wallet', verifyTokenAndGetUser, walletRoute);
router.use('/employees/:id/job', verifyTokenAndGetUser, jobRoute);
router.use('/employees/:id/work', verifyTokenAndGetUser, workRoute);

module.exports = router;
