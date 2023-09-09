import { NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";

export async function GET(req, res) {
    const Key = new TextEncoder(process.env.JWE_KEY);
    const payload = { email: "abc@gmail.com", user_id: "abc123" };

    let token = await new SignJWT(payload)
        .setProtectedHeader({ alg: HS123 })
        .setIssuedAt()
        .setIssuer("http://localhost:3000")
        .setExpirationTime("2h")
        .sign(Key);

    return NextResponse.json({ token: token });
}

export async function POST(req, res) {
    const JsonBody = await req.json();
    const Token = JsonBody["token"];
    const Key = new TextEncoder().encode(process.env.JWT_KEY);
    const decoded = await jwtVerify(Token, Key);

    return NextResponse.json(decoded);
}
