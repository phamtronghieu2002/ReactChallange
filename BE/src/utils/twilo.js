const { twilioClient, twilioConfig } = require("~/config/twilio");





function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}
const sendAccessCode = async (phoneNumber) => {
  
    const accessCode = generateOTP();
    
    await twilioClient.messages.create({
      body: `Your OTP code is ${accessCode}. It is valid for 5 minutes.`,
      from: twilioConfig.from,
      to: phoneNumber,
    });

    return accessCode;
}
export { sendAccessCode, generateOTP };