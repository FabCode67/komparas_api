import e, { Request, Response } from 'express';
import KomparasCode from '../../models/komparasCode';
import { IKomparasCode } from '../../types/komparasCode';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
import twilio from 'twilio';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD1,
    },
});

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
export const addKomparasCode = async (req: Request, res: Response): Promise<void> => {
    try {
        const komparasCode: IKomparasCode = new KomparasCode(req.body);
        const existingKomparasCode = await KomparasCode.findOne({ komparasCode: komparasCode.komparasCode });
        if (existingKomparasCode) {
            res.status(400).json({ message: 'Komparas Code already exists' });
            return;
        }
        const { phoneNumberOrEmail } = req.body;
        const {fullName} = req.body;
        const {contactMethod} = req.body;
        const confirmationLink = `https://komparas.netlify.app/confirm/${komparasCode.komparasCode}`; 


        const mailOptions = {
            from: 'mwanafunzifabrice@gmail.com',
            to: phoneNumberOrEmail,
            subject: 'Komparas Code',
            html: `
            <body style="background-color:grey"> 
              <table align="center" border="0" cellpadding="0" cellspacing="0"
                width="550" bgcolor="white" style="border:2px solid black"> 
                <tbody> 
                  <tr> 
                    <td align="center"> 
                      <table align="center" border="0" cellpadding="0"
                        cellspacing="0" class="col-550" width="550"> 
                        <tbody> 
                          <tr> 
                            <td align="center" style="background-color: #EEBA2B; 
                                height: 50px;"> 
            
                              <a href="#" style="text-decoration: none;"> 
                                <p style="color:white; 
                                    font-weight:bold;"> 
                                  KOMPARAS 
                                </p> 
                              </a> 
                            </td> 
                          </tr> 
                        </tbody> 
                      </table> 
                    </td> 
                  </tr> 
                  <tr style="height: 300px;"> 
                    <td align="center" style="border: none; 
                        border-bottom: 2px solid #EEBA2B; 
                        padding-right: 20px;padding-left:20px"> 
            
                      <p style="font-weight: bolder;font-size: 18px; 
                          letter-spacing: 0.025em; 
                          color:black;"> 
                          Uraho neza <i style="font-weight: normal; font-size:10">${phoneNumberOrEmail}</i>! 
                        <h3>Komparas kode Yawe ni: 👉👉 <h1>
                        ${komparasCode.komparasCode}
                        </h1></h3>
                                         <h1>Nyura hano wemere ko waguze👉👉 <a href=${confirmationLink}>EMEZA</a></h1>

                      </p> 
                    </td> 
                  </tr> 
            
                  <tr style="display: inline-block;"> 
                    <td style="height: 150px; 
                        padding: 20px; 
                        border: none; 
                        border-bottom: 2px solid #EEBA2B; 
                        background-color: white;"> 
                      
                      <h2 style="text-align: left; 
                          align-items: center;"> 
                          QUI SOMMES-NOUS: Des solutions sur mesure qui captivent votre public et vous démarquent de la concurrence
                    </h2> 
                      <p class="data"
                      style="text-align: justify-all; 
                          align-items: center; 
                          font-size: 15px; 
                          padding-bottom: 12px;"> 
                          Des solutions sur mesure qui captivent votre public et vous démarquent de la concurrence
                      </p> 
                      <p> 
                        <a href= 
            "https://develop--brilliant-lolly-1205b8.netlify.app/#service"
                        style="text-decoration: none; 
                            color:black; 
                            border: 2px solid #EEBA2B; 
                            padding: 10px 30px; 
                            font-weight: bold;"> 
                            En savoir plus
                            </a> 
                      </p> 
                    </td> 
                  </tr> 
                  <tr style="border: none; 
                  background-color: black; 
                  height: 40px; 
                  color:white; 
                  padding-bottom: 20px; 
                  text-align: center;"> 
                    
            <td height="40px" align="center"> 
              <p style="color:white; 
              line-height: 1.5em;"> 
              Creativa Poeta 
              </p> 
              <a href="#"
              style="border:none; 
                text-decoration: none; 
                padding: 5px;"> 
                  
              <img height="30"
              src= 
            "https://extraaedgeresources.blob.core.windows.net/demo/salesdemo/EmailAttachments/icon-twitter_20190610074030.png"
              width="30" /> 
              </a> 
              
              <a href="#"
              style="border:none; 
              text-decoration: none; 
              padding: 5px;"> 
              
              <img height="30"
              src= 
            "https://extraaedgeresources.blob.core.windows.net/demo/salesdemo/EmailAttachments/icon-linkedin_20190610074015.png"
            width="30" /> 
              </a> 
              
              <a href="#"
              style="border:none; 
              text-decoration: none; 
              padding: 5px;"> 
              
              <img height="20"
              src= 
            "https://extraaedgeresources.blob.core.windows.net/demo/salesdemo/EmailAttachments/facebook-letter-logo_20190610100050.png"
                width="24"
                style="position: relative; 
                  padding-bottom: 5px;" /> 
              </a> 
            </td> 
            </tr> 
            <tr> 
            <td style="font-family:'Open Sans', Arial, sans-serif; 
                font-size:11px; line-height:18px; 
                color:#999999;" 
              valign="top"
              align="center"> 
            <a href="#"
            target="_blank"
            style="color:#999999; 
                text-decoration:underline;">DÉCLARATION DE CONFIDENTIALITÉ</a> 
                | <a href="#" target="_blank"
                style="color:#999999; text-decoration:underline;">CONDITIONS D'UTILISATION</a> 
                | <a href="#"
                target="_blank"
                style="color:#999999; text-decoration:underline;">RETOUR</a><br> 
                    © 2022 creativa poeta. Tous droits réservés.<br> 
                    Si vous ne souhaitez plus recevoir
                    emails de notre part, s'il vous plaît
                    <a href="#"
                    target="_blank"
                    style="text-decoration:none; 
                        color:#999999;">unsubscribe</a> 
                  </td> 
                  </tr> 
                  </tbody></table></td> 
                </tr> 
                <tr> 
                <td class="em_hide"
                style="line-height:1px; 
                    min-width:700px; 
                    background-color:#ffffff;"> 
                  <img alt=""
                  src="images/spacer.gif"
                  style="max-height:1px; 
                  min-height:1px; 
                  display:block; 
                  width:700px; 
                  min-width:700px;" 
                  width="700"
                  border="0"
                  height="1"> 
                  </td> 
                </tr> 
                </tbody> 
              </table> 
            </body> 
            
        `,
        };
        if(contactMethod === 'email') {
            await transporter.sendMail(mailOptions);
        } else if(contactMethod === 'whatsapp') {
        await client.messages.create({
          body: `*KUVA KURI KOMPARASI*
          Uraho neza @${fullName}! Komparas kode yawe ni: ${komparasCode.komparasCode} Nyura hano wemere ko waguze:  <a href=${confirmationLink}>NDEMEZA KO NAGUSe</a>
          `,
          from: 'whatsapp:+14155238886',
          to: `whatsapp:${phoneNumberOrEmail}`
      });
        }
        else {
            await transporter.sendMail(mailOptions);
            await client.messages.create({
                body: `*KUVA KURI KOMPARASI*
                Uraho neza @${fullName}! Komparas kode yawe ni: ${komparasCode.komparasCode} Nyura hano wemere ko waguze:  <a href=${confirmationLink}>NDEMEZA KO NAGUSe</a>
                `,
          from: 'whatsapp:+14155238886',
          to: `whatsapp:${phoneNumberOrEmail}`
            });
        }
        // await transporter.sendMail(mailOptions);
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
