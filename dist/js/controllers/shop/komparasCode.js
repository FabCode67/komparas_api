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
exports.updateIsSoldConfirmToTrue = exports.getKomparasCodeBykomparasCode = exports.getKomparasCodes = exports.addKomparasCode = void 0;
const komparasCode_1 = __importDefault(require("../../models/komparasCode"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const twilio_1 = __importDefault(require("twilio"));
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD1,
    },
});
const client = (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const addKomparasCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const komparasCode = new komparasCode_1.default(req.body);
        const existingKomparasCode = yield komparasCode_1.default.findOne({ komparasCode: komparasCode.komparasCode });
        if (existingKomparasCode) {
            res.status(400).json({ message: 'Komparas Code already exists' });
            return;
        }
        const { phoneNumberOrEmail } = req.body;
        const { fullName } = req.body;
        const { contactMethod } = req.body;
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
        if (contactMethod === 'email') {
            yield transporter.sendMail(mailOptions);
        }
        else if (contactMethod === 'whatsapp') {
            yield client.messages.create({
                body: `*KUVA KURI KOMPARASI*
          Uraho neza @${fullName}! Komparas kode yawe ni: ${komparasCode.komparasCode} Nyura hano wemere ko waguze:  <a href=${confirmationLink}>NDEMEZA KO NAGUSe</a>
          `,
                from: 'whatsapp:+14155238886',
                to: `whatsapp:${phoneNumberOrEmail}`
            });
        }
        else {
            yield transporter.sendMail(mailOptions);
            yield client.messages.create({
                body: `*KUVA KURI KOMPARASI*
                Uraho neza @${fullName}! Komparas kode yawe ni: ${komparasCode.komparasCode} Nyura hano wemere ko waguze:  <a href=${confirmationLink}>NDEMEZA KO NAGUSe</a>
                `,
                from: 'whatsapp:+14155238886',
                to: `whatsapp:${phoneNumberOrEmail}`
            });
        }
        // await transporter.sendMail(mailOptions);
        const newKomparasCode = yield komparasCode.save();
        res.status(201).json(newKomparasCode);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.addKomparasCode = addKomparasCode;
const getKomparasCodes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const komparasCodes = yield komparasCode_1.default.find();
        res.status(200).json({ komparasCodes });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getKomparasCodes = getKomparasCodes;
const getKomparasCodeBykomparasCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const komparasCode = yield komparasCode_1.default.findOne({ komparasCode: req.params.komparasCode });
        // check if the komparasCode exists
        if (!komparasCode) {
            res.status(404).json({ status: false, error: 'Komparas Code ukoresheje ntibaho' });
            return;
        }
        res.status(200).json({ komparasCode });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getKomparasCodeBykomparasCode = getKomparasCodeBykomparasCode;
const updateIsSoldConfirmToTrue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const komparasCode = yield komparasCode_1.default.findOne({ komparasCode: req.params.komparasCode });
        if (!komparasCode) {
            res.status(404).json({ status: false, error: 'Komparas Code ukoresheje ntibaho' });
            return;
        }
        yield komparasCode_1.default.findOneAndUpdate({ komparasCode: req.params.komparasCode }, { sold_confirm: true });
        res.status(200).json({ status: true, message: 'Koparas Kode Yemejwe neza!' });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.updateIsSoldConfirmToTrue = updateIsSoldConfirmToTrue;
