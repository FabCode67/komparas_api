"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSubscribers = exports.confirmationController = void 0;
const subscribe_1 = __importDefault(require("../../models/subscribe"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});
const confirmationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }
    try {
        const subscriber = yield subscribe_1.default.findOne({ token });
        if (!subscriber) {
            return res.status(404).json({ error: "Votre abonnement n'est pas valide, veuillez vous réabonner!" });
        }
        if (subscriber.confirmed) {
            return res.status(200).json({ message: 'Votre abonnement est déjà confirmé ; restez en contact avec nous!' });
        }
        subscriber.confirmed = true;
        yield subscriber.save();
        return res.status(200).json({ message: "Votre abonnement a été confirmé. Merci d'avoir choisi de travailler avec nous!" });
    }
    catch (error) {
        return res.status(500).json({ error: 'Opps, réessayez.' });
    }
});
exports.confirmationController = confirmationController;
const getAllSubscribers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscribers = yield subscribe_1.default.find();
        res.json(subscribers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllSubscribers = getAllSubscribers;
const subscribeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: "L'e-mail est requis" });
    }
    try {
        const existingSubscriber = yield subscribe_1.default.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ error: 'Cet e-mail est déjà abonné. Veuillez utiliser une adresse e-mail différente.' });
        }
        const token = (0, uuid_1.v4)();
        const subscriber = new subscribe_1.default({ email, token });
        yield subscriber.save();
        const confirmationLink = `https://develop--brilliant-lolly-1205b8.netlify.app/?token=${token}`;
        const mailOptions = {
            from: 'mwanafunzifabrice@gmail.com',
            to: email,
            subject: 'Subscription Confirmation',
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
                            CREATIVA POETA 
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
                    Salut <i style="font-weight: normal; font-size:10">${email}</i>! 
                  <br> Nous sommes ravis de vous compter à bord. Restez à l'écoute des dernières mises à jour et actualités. 
                  <h1>Veuillez confirmer votre email ici👉👉 <a href=${confirmationLink}>CONFIRMER</a></h1>
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
        yield transporter.sendMail(mailOptions);
        return res.json({ message: 'Subscribed successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = subscribeController;
