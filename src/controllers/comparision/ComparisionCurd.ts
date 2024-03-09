import Comparison from "../../models/comparision";
import { Request, Response } from "express";
import { IComparison } from "../../types/comparision";

export const addProductToComparison = async (
    req: Request,
    res: Response
    ): Promise<void> => {
    try {
        const body = req.body as Pick<IComparison, "userId" | "productId">;
    
        const comparison: IComparison = new Comparison({
        userId: body.userId,
        productId: body.productId,
        });
    
        const newComparison: IComparison = await comparison.save();
        res
        .status(201)
        .json({ message: "Product added to comparison", comparison: newComparison });
    } catch (error) {
        throw error;
    }
};

export const getProductComparison = async (
    req: Request,
    res: Response
    ): Promise<void> => {
    try {
        const comparisons: IComparison[] = await Comparison.find({});
        res.status(200).json({ comparisons });
    } catch (error) {
        throw error;
    }
}

export const deleteProductFromComparison = async (
    req: Request,
    res: Response
    ): Promise<void> => {
    try {
        const {
        params: { id },
        } = req;
        const deleteComparison: IComparison | null = await Comparison.findByIdAndDelete(
        { _id: id }
        );
        const allComparisons: IComparison[] = await Comparison.find({});
        res.status(200).json({
        message: "Product deleted from comparison",
        comparison: deleteComparison,
        comparisons: allComparisons,
        });
    } catch (error) {
        throw error;
    }
};


