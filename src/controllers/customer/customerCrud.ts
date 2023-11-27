import Customer from "../../models/customer";
import { Request, Response } from "express";
import { ICustomer } from "../../types/customers";

export const addCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const body = req.body as Pick<ICustomer, "name" | "age">;

    const customer: ICustomer = new Customer({
      name: body.name,
      age: body.age,
    });

    const newCustomer: ICustomer = await customer.save();
    const allCustomers: ICustomer[] = await Customer.find({});

    res
      .status(201)
      .json({ message: "Customer added", customer: newCustomer, customers: allCustomers });
  } catch (error) {
    throw error;
  }
};


export const getCustomers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const customers: ICustomer[] = await Customer.find({});
    res.status(200).json({ customers });
  } catch (error) {
    throw error;
  }
};

export const updateCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateCustomer: ICustomer | null = await Customer.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allCustomers: ICustomer[] = await Customer.find({});
    res.status(200).json({
      message: "Customer updated",
      customer: updateCustomer,
      customers: allCustomers,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedCustomer: ICustomer | null = await Customer.findByIdAndRemove(
      req.params.id
    );
    const allCustomers: ICustomer[] = await Customer.find({});
    res.status(200).json({
      message: "Customer deleted",
      customer: deletedCustomer,
      customers: allCustomers,
    });
  } catch (error) {
    throw error;
  }
};

export const getCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const customer: ICustomer | null = await Customer.findById(req.params.id);
    res.status(200).json({
      message: "Customer found",
      customer: customer,
    });
  } catch (error) {
    throw error;
  }
};

