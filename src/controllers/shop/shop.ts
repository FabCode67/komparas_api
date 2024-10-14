import { Request, Response } from 'express';
import Shop from '../../models/shop';
import { IShop } from '../../types/shop';
import { v2 as cloudinaryV2, UploadStream } from "cloudinary";
import streamifier from "streamifier";
import { AuthRequest } from '../../middleware/auth/authorization';

// get all shops that are accepted or not by admin and only show the accepted shops to the customers
export const getAllShops = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      // If the user is logged in, show all shops
      if (req.user) {
        const shops = await Shop.find(); // Fetch all shops
        res.status(200).json(shops);
      } else {
        // If not logged in, show only accepted shops
        const acceptedShops = await Shop.find({ isAccepted: true }); // Only fetch accepted shops
        res.status(200).json(acceptedShops);
      }
    } catch (error) {
      res.status(500).send({ message: 'Server Error', error });
    }
  };

export const addShop = async (req: Request, res: Response): Promise<void> => {
    try {
        const shop: IShop = new Shop(req.body);
        const image = req.file;
        if (!image) {
            res.status(400).json({
                status: false,
                message: 'Please upload a Logo file',
            });
            return;
        }
        const working_hours: Array<{ day: string; time_range: string }> = req.body.working_hours?.map((spec: any) => ({
            day: spec?.day?.toString(),
            time_range: spec?.time_range?.toString(),
        }));
        shop.working_hours = working_hours;
        const existingShop = await Shop.findOne({ name: shop.name });
        if (existingShop) {
            res.status(400).json({ message: 'Shop with the same name already exists' });
            return;
        }
        const existingEmail = await Shop.findOne({ email: shop.email });
        if (existingEmail) {
            res.status(400).json({ message: 'Shop with the same email already exists' });
            return;
        }
        const result: UploadStream = cloudinaryV2.uploader.upload_stream(
            { folder: 'image' },
            async (error, cloudinaryResult: any) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({
                        status: false,
                        message: 'Something went wrong',
                    });
                }
                shop.image = cloudinaryResult.secure_url;
                // add auto incriment shop numbe
                shop.shop_number = Math.floor(Math.random() * 1000000);
                // check if the shop number already exists
                const existingShopNumber = await Shop.findOne({ shop_number: shop.shop_number });
                if (existingShopNumber) {
                    shop.shop_number = Math.floor(Math.random() * 1000000);
                }
                const newShop: IShop = await shop.save();
                res.status(201).json({ message: 'Shop added successfully', newShop });
            }
        );
        streamifier.createReadStream(image.buffer).pipe(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateShop = async (req: Request, res: Response): Promise<void> => {
    try {
        const shop: IShop | null = await Shop.findById(req.params.id);
        if (!shop) {
            res.status(404).json({ message: 'Shop not found' });
            return;
        }
        const image = req.file;
        const working_hours: Array<{ day: string; time_range: string }> = req.body.working_hours?.map((spec: any) => ({
            day: spec?.day?.toString(),
            time_range: spec?.time_range?.toString(),
        }));
        shop.name = req.body.name || shop.name;
        shop.owner = req.body.owner || shop.owner;
        shop.location = req.body.location || shop.location;
        shop.working_hours = working_hours.length ? working_hours : shop.working_hours;
        shop.phone = req.body.phone || shop.phone;
        shop.email = req.body.email || shop.email;
        shop.location_discription = req.body.location_discription || shop.location_discription;
        shop.description = req.body.description || shop.description;
        // check if the shop has a shop number if not generate one
        if (!shop.shop_number) {
            shop.shop_number = Math.floor(Math.random() * 1000000);
        }
        // check if the shop number already exists
        const existingShopNumber = await Shop.findOne({ shop_number: shop.shop_number });
        if (existingShopNumber) {
            shop.shop_number = Math.floor(Math.random() * 1000000); 
        }
        if (image) {
            const result: UploadStream = cloudinaryV2.uploader.upload_stream(
                { folder: 'image' },
                async (error, cloudinaryResult: any) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({
                            status: false,
                            message: 'Something went wrong',
                        });
                    }
                    shop.image = cloudinaryResult.secure_url;
                    const updatedShop: IShop = await shop.save();
                    res.status(200).json(updatedShop);
                }
            );
            streamifier.createReadStream(image.buffer).pipe(result);
        } else {
            const updatedShop: IShop = await shop.save();
            res.status(200).json(updatedShop);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getShopById = async (req: Request, res: Response): Promise<void> => {
    try {
        const shop: IShop | null = await Shop.findById(req.params.id);
        if (shop) {
            res.status(200).json(shop);
        } else {
            res.status(404).send('Shop not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteShop = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedShop: IShop | null = await Shop.findByIdAndDelete(req.params.id);
        if (deletedShop) {
            res.status(200).json(deletedShop);
        } else {
            res.status(404).send('Shop not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

//mark shop as accepted or unacceptable using toggling the isAccepted field

export const toggleShopAcceptance = async (req: Request, res: Response): Promise<void> => {
    try {
        const shop: IShop | null = await Shop.findById(req.params.id);
        if (shop) {
            shop.isAccepted = !shop.isAccepted;
            const updatedShop: IShop = await shop.save();
            res.status(200).json({ message: 'Shop acceptance status updated successfully', updatedShop });
        } else {
            res.status(404).send('Shop not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

