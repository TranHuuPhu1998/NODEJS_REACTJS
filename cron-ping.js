const cron = require('node-cron');
const fs = require('fs');
const nodemailer = require("nodemailer");

const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`;
const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`;
const REFRESH_TOKEN = `${process.env.MAIL_REFRESH_TOKEN}`;
const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`;

// doc https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples
cron.schedule('1-59 * * * *', function() {
  console.log('---------------------');
  console.log('Running Cron Job');
  fs.unlink('./error.log', err => {
    if (err) throw err;
    console.log('Error file successfully deleted');
  });
});

cron.schedule('2-59 * * * *', async function () {
  console.log('---------------------');
  console.log('Running Cron Job');

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_MAIL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      access_token,
    },
  });

  const mailOptions = {
    from: SENDER_MAIL,
    to: to,
    subject: "Quiz App",
    html: `<p>Congratulations! You're almost set to start using Quiz App.
      Just click the button below to validate your email address.
    </p>`,
  };

  const result = await transport.sendMail(mailOptions);

  console.log('SEND EMAIL:', result);
});
