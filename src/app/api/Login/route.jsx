import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET(req, res) {
    const { searchParams } = new URL(req.url);
    let ToEmail = searchParams.get("email");

    //Transporter
    let Transporter = nodemailer.createTransport({
        host: "mail.teamrabbil.com",
        port: 25,
        secure: false,
        auth: {
            user: "info@teamrabbil.com",
            pass: "~sR4[bhaC[Qs",
        },
        tls: { rejectUnauthorized: false },
    });

    //prepare Email
    let myEmail = {
        form: "Test Email from Next JS Application <info@teamrabbil.com>",
        to: ToEmail,
        subject: "Test Email from Next JS Application",
        text: "Test Email from Next JS Application",
    };

    try {
        let result = await Transporter.sendMail(myEmail);
        return NextResponse.json({ msg: result });
    } catch {
        return NextResponse.json({ msg: "Fail" });
    }
}
