import Joi, { Schema } from 'joi';

const jobApplicantSchema: Schema = Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    backgroundInfo: Joi.string().required()
});
const validateApplication = (applicationData: Record<string, any>) => {
    return jobApplicantSchema.validate(applicationData);
  };

export default validateApplication;

