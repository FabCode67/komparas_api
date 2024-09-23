import { Request, Response } from 'express';
import KomparasCode from '../../models/komparasCode';
import { IKomparasCode } from '../../types/komparasCode';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD1,
    },
});

export const addKomparasCode = async (req: Request, res: Response): Promise<void> => {
    try {
        const komparasCode: IKomparasCode = new KomparasCode(req.body);
        const existingKomparasCode = await KomparasCode.findOne({ komparasCode: komparasCode.komparasCode });

        if (existingKomparasCode) {
            res.status(400).json({ message: 'Komparas Code already exists' });
            return;
        }

        const { phoneNumberOrEmail, shopEmail, contactMethod } = req.body;

        const clientConfirmationLink = `https://komparas.netlify.app/client/confirm/${komparasCode.komparasCode}`;
        const shopConfirmationLink = `https://komparas.netlify.app/shop/confirm/${komparasCode.komparasCode}`;

        // Prepare the mailOptions for the client
        const clientMailOptions = {
            from: 'mwanafunzifabrice@gmail.com',
            to: phoneNumberOrEmail,
            subject: 'Komparas Code - Client Confirmation',
            html: `
            <body style="background-color:grey"> 
              <table align="center" border="0" cellpadding="0" cellspacing="0"
                width="550" bgcolor="white" style="border:2px solid black"> 
                <tbody> 
                  <tr> 
                    <td align="center" style="background-color: #EEBA2B; height: 50px;"> 
                      <a href="#" style="text-decoration: none;"> 
                        <p style="color:white; font-weight:bold;"> KOMPARAS </p> 
                      </a> 
                    </td> 
                  </tr> 
                  <tr style="height: 300px;"> 
                    <td align="center" style="border: none; border-bottom: 2px solid #EEBA2B; 
                        padding-right: 20px; padding-left:20px"> 
                      <p style="font-weight: bolder; font-size: 18px; letter-spacing: 0.025em; color:black;"> 
                          Uraho neza <i style="font-weight: normal; font-size:10">${phoneNumberOrEmail}</i>! 
                        <h3>Komparas kode Yawe ni: 👉👉 <h1>${komparasCode.komparasCode}</h1></h3>
                        <h1>Nyura hano wemere ko waguze👉👉 <a href=${clientConfirmationLink}>EMEZA</a></h1>
                      </p> 
                    </td> 
                  </tr> 
                </tbody>
              </table>
            </body>
            `,
        };

        // Prepare the mailOptions for the shop
        const shopMailOptions = {
            from: 'mwanafunzifabrice@gmail.com',
            to: shopEmail,
            subject: 'Komparas Code - Shop Confirmation',
            html: `
            <body style="background-color:grey"> 
              <table align="center" border="0" cellpadding="0" cellspacing="0"
                width="550" bgcolor="white" style="border:2px solid black"> 
                <tbody> 
                  <tr> 
                    <td align="center" style="background-color: #EEBA2B; height: 50px;"> 
                      <a href="#" style="text-decoration: none;"> 
                        <p style="color:white; font-weight:bold;"> KOMPARAS </p> 
                      </a> 
                    </td> 
                  </tr> 
                  <tr style="height: 300px;"> 
                    <td align="center" style="border: none; border-bottom: 2px solid #EEBA2B; 
                        padding-right: 20px; padding-left:20px"> 
                      <p style="font-weight: bolder; font-size: 18px; letter-spacing: 0.025em; color:black;"> 
                          Hello Shop, your Komparas Code is: <h1>${komparasCode.komparasCode}</h1>
                          <h1>Please confirm your order here: 👉👉 <a href=${shopConfirmationLink}>CONFIRM</a></h1>
                      </p> 
                    </td> 
                  </tr> 
                </tbody>
              </table>
            </body>
            `,
        };

        // Send email based on contactMethod
        if (contactMethod === 'email') {
            if (phoneNumberOrEmail) {
                await transporter.sendMail(clientMailOptions);
            }
            if (shopEmail) {
                await transporter.sendMail(shopMailOptions);
            }
        }

        // Save KomparasCode in the database
        const newKomparasCode: IKomparasCode = await komparasCode.save();
        res.status(201).json(newKomparasCode);

    } catch (error) {
        res.status(500).send(error);
    }
};

export const getKomparasCodes = async (req: Request, res: Response): Promise<void> => {
    try {
        const komparasCodes: IKomparasCode[] = await KomparasCode.find();
        res.status(200).json({ komparasCodes });
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getKomparasCodeBykomparasCode = async (req: Request, res: Response): Promise<void> => {
    try {
        const komparasCode: IKomparasCode | null = await KomparasCode.findOne({ komparasCode: req.params.komparasCode });
        // check if the komparasCode exists

        if (!komparasCode) {
            res.status(404).json({ status:false, error: 'Komparas Code ukoresheje ntibaho' });
            return;
        }
        res.status(200).json({ komparasCode });
    } catch (error) {
        res.status(500).send(error);
    }
}

export const updateIsSoldConfirmToTrue = async (req: Request, res: Response): Promise<void> => {
    try {
        const komparasCode: IKomparasCode | null = await KomparasCode.findOne({ komparasCode: req.params.komparasCode });
        if (!komparasCode) {
            res.status(404).json({ status:false, error: 'Komparas Code ukoresheje ntibaho' });
            return;
        }
        await KomparasCode.findOneAndUpdate({ komparasCode: req.params.komparasCode }, { sold_confirm: true });
        res.status(200).json({ status:true, message: 'Koparas Kode Yemejwe neza!' });
    } catch (error) {
        res.status(500).send(error);
    }
}

export const updateIsShopSoldConfirmToTrue = async (req: Request, res: Response): Promise<void> => {
    try {
        const komparasCode: IKomparasCode | null = await KomparasCode.findOne({ komparasCode: req.params.komparasCode });
        if (!komparasCode) {
            res.status(404).json({ status:false, error: 'Komparas Code ukoresheje ntibaho' });
            return;
        }
        await KomparasCode.findOneAndUpdate({ komparasCode: req.params.komparasCode }, { shop_sold_confirm: true });
        res.status(200).json({ status:true, message: 'Koparas Kode Yemejwe neza!' });
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getLatestComparasCodeByfullName = async (req: Request, res: Response): Promise<void> => {
    try {
        const komparasCode: IKomparasCode | null = await KomparasCode.findOne({ fullName: req.params.fullName }).sort({ createdAt: -1 });
        if (!komparasCode) {
            res.status(404).json({ status:false, error: 'Komparas Code ukoresheje ntibaho' });
            return;
        }
        res.status(200).json({ komparasCode });
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getLatestComparasCodeByEmailOrPhoneNumber = async (req: Request, res: Response): Promise<void> => {
    try {
        const komparasCode: IKomparasCode | null = await KomparasCode
            .findOne({phoneNumberOrEmail: req.params.emailOrPhoneNumber})
            .sort({ createdAt: -1 });
        if (!komparasCode) {
            res.status(404).json({ status:false, error: 'Komparas Code ukoresheje ntibaho' });
            return;
        }
        const mailOptions = {
          from: 'mwanafunzifabrice@gmail.com',
          to: komparasCode.phoneNumberOrEmail, 
          subject: 'Your Komparas Code', 
          text: `Dear ${komparasCode.fullName},\n\nYour Komparas Code is: ${komparasCode.komparasCode}\n\nThank you for shopping with ${komparasCode.shopName}.`, // Plain text body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ status: false, error: 'Failed to send email' });
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).json({ status: true, message: 'Email sent successfully', komparasCode });
        }
    });

         res.status(200).json({ komparasCode });
    } catch (error) {
        res
            .status(500)
    }
}