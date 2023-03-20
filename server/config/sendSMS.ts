
import { Twilio } from 'twilio'
import log from "../utils/logger";

const accountSid = `${process.env.TWILIO_ACCOUNT_SID}`;
const authToken = `${process.env.TWILIO_AUTH_TOKEN}`;
const from = `${process.env.TWILIO_PHONE_NUMBER}`;

const client = new Twilio(accountSid, authToken)


export const sendSms = (to: string, body: string, txt: string) => {
  try {
    client.messages
      .create({
        body: `Quiz App ${txt} - ${body}`,
        from,
        to
      })
      .then(message => console.log(message.sid));

  } catch (err) {
    log.error(err)
  }
}
