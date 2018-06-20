const router = require('express').Router();
const employeeRoute = require('./employee/employeeRouter');
const walletRoute = require('./wallet/walletRouter');
const scheduleRoute = require('./schedule/scheduleRoutes');
const jobRoute = require('./job/jobRouter');
const workRoute = require('./work/workRouter');

router.use('/employee', employeeRoute);
router.use('/employee:id/schedule', scheduleRoute);
router.use('/employee/:id/wallet', walletRoute);
router.use('/employee/:id/job', jobRoute);
router.use('/employee/:id/work', workRoute);

module.exports = router;
