'use server';

// 1. Define a clear type for the state
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
  // 2. Extract and Validate data
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { 
      success: false, 
      message: "Please fill in all fields." 
    };
  }

  try {
    // 3. Simulate API delay / Database Check
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 4. Logic (In production, replace with DB call & bcrypt.compare)
    if (username === "admin" && password === "password") {
      // Return success data
      return { 
        success: true, 
        message: "Welcome back, Admin!" 
      };
    }

    console.log("env: ", process.env.KEY)

    // 5. Generic error to prevent "Username Enumeration"
    return { 
      success: false, 
      message: "The credentials provided are incorrect." 
    };

  } catch (error) {
    // 6. Global error handling
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "A server error occurred. Please try again later." 
    };
  }
}