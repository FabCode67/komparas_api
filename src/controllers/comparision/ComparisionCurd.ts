import Comparison from "../../models/comparision";
import { Request, Response } from "express";
import { IComparison } from "../../types/comparision";
import products from "../../models/products";

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
            const comparisionProductsId = comparisons.map((comparison) => comparison.productId);
            const productsInfo = await products.find({ _id: { $in: comparisionProductsId } });
            res.status(200).json({ comparisons, productsInfo });
        } catch (error) {
            throw error;
        }
}
export const getAllInfoOFProductsOnComparison = async (
    req: Request,
    res: Response
    ): Promise<void> => {
        try {
            const comparisons: IComparison[] = await Comparison.find({});
            const productsInfo = await products.find({});
            res.status(200).json({ comparisons, productsInfo });
        } catch (error) {
            throw error;
        }
}
export const getProductComparisonByUser = async (
    req: Request,
    res: Response
    ): Promise<void> => {
    try {
        const {
        params: { userId },
        } = req;
        const comparisons: IComparison[] = await Comparison.find({ userId: userId });
        const comparisionProductsId = comparisons.map((comparison) => comparison.productId);
        const productsInfo = await products.find({ _id: { $in: comparisionProductsId } });
        res.status(200).json({ comparisons, productsInfo });
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


