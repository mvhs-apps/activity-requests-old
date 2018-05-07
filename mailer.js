const nodemailer = require('nodemailer');

require('dotenv').config();

module.exports.sendMail = (data) => {
  const recipient = data.recipient;
  const subject = data.subject;
  const messageHTML = data.messageHTML;

  return new Promise((resolve, reject) => {
    if (!(recipient && subject && messageHTML)) {
      reject('Not enough parameters');
    }

    const mailOptions = {
      from: '"MVHS Approvals"' + process.env.GMAIL_USERNAME,
      to: recipient,
      subject: subject,
      text: messageHTML.replace(/<(?:.|\n)*?>/gm, ''),
      html: messageHTML,
    };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    transporter.sendMail(mailOptions).
        then(() => resolve()).
        catch((err) => reject(err));
  });
};
