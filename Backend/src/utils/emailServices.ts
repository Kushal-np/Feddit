import nodemailer from "nodemailer"

interface EmailOptions{
    to:string;
    subject:string;
    html:string;
}

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_ID! ,
        pass:process.env.PASS_ID!,
    },
});

export const sendEmail = async(options:EmailOptions): Promise<void> =>{
    const mailOptions = {
        from : `"Feddit" <${process.env.EMAIL_ID}>`,
        to:options.to,
        subject:options.subject,
        html:options.html,
    };

    await transporter.sendMail(mailOptions);
};