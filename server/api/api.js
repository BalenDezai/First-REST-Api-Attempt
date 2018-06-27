const router = require('express').Router();
const employeeRoute = require('./employee/employeeRouter');
const walletRoute = require('./wallet/walletRouter');
const scheduleRoute = require('./schedule/scheduleRoutes');
const jobRoute = require('./job/jobRouter');
const workRoute = require('./work/workRouter');

router.use('/employees', employeeRoute);
router.use('/employees/:id/schedules', scheduleRoute);
router.use('/employees/:id/wallet', walletRoute);
router.use('/employees/:id/job', jobRoute);
router.use('/employees/:id/work', workRoute);

module.exports = router;
