import express from 'express';
import peopleRoute from './person/peopleRouter';
import walletRoute from './wallet/walletRouter';
import jobRoute from './job/jobRouter';
import workRoute from './work/workRouter';

const router = express.Router();

router.use('/people', peopleRoute);
router.use('/people/:id/wallet', walletRoute);
router.use('/people/:id/job', jobRoute);
router.use('/people/:id/work', workRoute);

export default router;
