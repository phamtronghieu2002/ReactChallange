import { Twilio } from "twilio";
import env from "./env";


const twilioConfig = {
    accountSid: env.TWILIO_ACCOUNT_SID,
    authToken: env.TWILIO_AUTH_TOKEN,
    from: env.TWILIO_PHONE_NUMBER,
};

const twilioClient = new Twilio(twilioConfig.accountSid, twilioConfig.authToken);

export { twilioClient,twilioConfig };