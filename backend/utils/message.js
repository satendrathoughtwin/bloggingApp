import twilio from "twilio";
const sendMessage = async (msg, RECEIVER_MOBILE_NO) => {
  const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
  try {
    const result = await client.messages.create({
      body: msg,
      from: process.env.SENDER_MOBILE_NO,
      to: RECEIVER_MOBILE_NO,
    });
    if (result) {
      console.log("message sent")
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("error",err)
    return false;
  }
};

export default sendMessage;
