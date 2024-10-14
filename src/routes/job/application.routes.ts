import express from 'express';
import { sendJobApplication, getJobApplications, getJobApplicationById, deleteJobApplication, togglePriority } from '../../controllers/jobApplicant';
import isaValidApplication from '../../middleware/validApllication';
import { replyToJobApplicant } from '../../controllers/replyJobApplicant';


import { authenticate } from '../../middleware/auth/authorization';

const applicationRouter = express.Router();

applicationRouter.post('/job-applications', isaValidApplication, sendJobApplication);
applicationRouter.get('/job-applications' ,getJobApplications);
applicationRouter.get('/job-applications/:id', getJobApplicationById);
applicationRouter.delete('/job-applications/:id', deleteJobApplication);
applicationRouter.post('/job-applications/:id/reply', replyToJobApplicant);
applicationRouter.put('/job-applications/:id/prioritize', togglePriority);

export default applicationRouter;