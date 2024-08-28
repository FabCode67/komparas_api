import express from 'express';
import { sendJobApplication, getJobApplications, getJobApplicationById, deleteJobApplication } from '../../controllers/jobApplicant';
import isaValidApplication from '../../middleware/validApllication';

import { isAdminAuthenticat } from '../../middleware/auth/authorization';

const applicationRouter = express.Router();

applicationRouter.post('/job-applications', isaValidApplication, sendJobApplication);
applicationRouter.get('/job-applications' ,getJobApplications);
applicationRouter.get('/job-applications/:id', getJobApplicationById);
applicationRouter.delete('/job-applications/:id', deleteJobApplication);

export default applicationRouter;