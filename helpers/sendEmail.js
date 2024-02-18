import sgMail from "@sendgrid/mail";

export const sendEmail = async (data) => {
  const { SENDGRID_API_KEY } = process.env;

  sgMail.setApiKey(SENDGRID_API_KEY);
  const email = {
    ...data,
    from: "ditto-cage-0s@icloud.com",
  };
  await sgMail.send(email);
  return true;
};
