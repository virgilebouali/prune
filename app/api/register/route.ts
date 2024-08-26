// app/api/register/route.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Handler for POST requests
export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    console.log({ username, password });

    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: 'Username and password are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if the username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username }, // Correct usage with a unique field
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'Username already taken.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return new Response(
      JSON.stringify({ message: 'User registered successfully!' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  } finally {
    await prisma.$disconnect();
  }
}
