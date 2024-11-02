import { NextResponse } from 'next/server';
import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { email, password, name } = await request.json();

    // Hash password
    const hashedPassword = await hash(password, 10);

    try {
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
        const data = await request.json();
        const post = await prisma.post.create({ data });
        return NextResponse.json(post);
    } catch (error) {
        NextResponse.json({ error: "Failed to create user" });
    }
}
