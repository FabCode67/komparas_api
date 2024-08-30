import { Request, Response } from "express";
import JobApplicant  from "../models/jobApplicant";
import IjobApplicant from "../types/job";


export const sendJobApplication = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fullName, email, phone, backgroundInfo } = req.body;
        const jobApplication = new JobApplicant({
            fullName,
            email,
            phone,
            backgroundInfo
        });
        await jobApplication.save();
        res.status(201).json({ message: "Gusaba akazi byakozwe neza", data: jobApplication });
    } catch (error) {
        throw error;
    }
};

export const getJobApplications = async (req: Request, res: Response): Promise<void> => {
    try {
        const jobApplications: IjobApplicant[] = await JobApplicant.find();
        res.status(200).json({ message:'Abasabye akazi',data:jobApplications });
    } catch (error) {
        throw error;
    }
};


export const getJobApplicationById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: string = req.params.id;
        const jobApplication: IjobApplicant | null = await JobApplicant.findById({ _id: id });
        if (!jobApplication) {
            res.status(404).json({ message: 'Page musabye ntayihari, mwongere mugerageze!' });
        }
        res.status(200).json({ message: 'Soma birambuye', data: jobApplication });
    } catch (error) {
        throw error;
    }
};

export const deleteJobApplication = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: string = req.params.id;
        const deletedJobApplication: IjobApplicant | null = await JobApplicant.findByIdAndRemove({ _id: id });
        if (!deletedJobApplication) {
            res.status(404).json({ message: 'Ibyo musabye ntabihari, mwongere mugerageze!' });
        }
        res.status(200).json({ message: 'Bikozwe neza'});
    } catch (error) {
        throw error;
    }
};

export const togglePriority = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const id: string = req.params.id;
      const jobApplication = await JobApplicant.findById(id);
      if (!jobApplication) {
        return res.status(404).json({ message: 'Application not found' });
      }
      jobApplication.isPriotized = !jobApplication.isPriotized;
      await jobApplication.save();
      return res.status(200).json({ message: 'Priority updated successfully', data: jobApplication });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
};