'use server';

import { cookies } from 'next/headers';

export type ActionState = {
  success: boolean;
  message: string;
  errors?: {
    username?: string[];
    password?: string[];
  };
} | null;

export async function loginAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return {
      success: false,
      message: 'Please fill in all fields.',
    };
  }

  try {
    const USERNAME = process.env.USERNAME;
    const PASSWORD = process.env.PASSWORD;
    const KEY = process.env.KEY;

    if (!USERNAME || !PASSWORD || !KEY) {
      return { success: false, message: 'Server misconfigured' };
    }

    if (username !== USERNAME || password !== PASSWORD) {
      return { success: false, message: 'Invalid credentials' };
    }

    // Proper cookie generation
    (await cookies()).set({
      name: 'authToken',
      value: KEY,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return {
      success: true,
      message: 'Welcome back, Admin!',
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'A server error occurred.',
    };
  }
}
