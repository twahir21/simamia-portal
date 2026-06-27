import { NextRequest, NextResponse } from 'next/server';

// --- Types based on Beem USSD Documentation ---

interface UssdIncomingPayload {
    request_id: number;
    response: string | number; // What the user typed
}

interface UssdIncomingRequest {
    command: 'initiate' | 'continue' | 'terminate';
    msisdn: string;
    session_id: string;
    operator: string;
    payload: UssdIncomingPayload;
}

interface UssdOutgoingPayload {
    request_id: number;
    request: string; // The text/menu to show the user
}

interface UssdOutgoingResponse {
    msisdn: string;
    operator: string;
    session_id: string;
    command: 'initiate' | 'continue' | 'terminate';
    payload: UssdOutgoingPayload;
}

// --- Main Route Handler ---

export async function POST(request: NextRequest) {
    try {
        const body: UssdIncomingRequest = await request.json();
        const { command, msisdn, session_id, operator, payload } = body;
        const { request_id, response } = payload;

        let nextCommand: 'initiate' | 'continue' | 'terminate' = 'continue';
        let nextRequestText = '';

        // Note: We increment request_id to tell the Beem Hub the user has moved 
        // to the next step. (Beem's official sample code has a bug where it 
        // echoes the same request_id, which causes infinite loops).
        let nextRequestId = request_id + 1;

        // ==========================================
        // USSD MENU STATE MACHINE
        // ==========================================

        if (command === 'initiate') {
            // STEP 0: Session starts. Show the Main Menu.
            nextRequestText = "Welcome to My App!\n1. Buy Airtime\n2. Check Balance\n3. Exit";
            nextRequestId = 1; // Next callback will be for Step 1
            nextCommand = 'continue';
        }
        else if (command === 'continue') {
            const userInput = String(response).trim();

            // STEP 1: User is responding to the Main Menu
            if (request_id === 1) {
                if (userInput === '1') {
                    nextRequestText = "Enter Amount (e.g., 1000):";
                    nextRequestId = 2; // Move to Step 2
                    nextCommand = 'continue';
                }
                else if (userInput === '2') {
                    nextRequestText = "Your current balance is $10.00.\nThank you!";
                    nextCommand = 'terminate'; // End session
                }
                else if (userInput === '3') {
                    nextRequestText = "Thank you! Goodbye.";
                    nextCommand = 'terminate'; // End session
                }
                else {
                    // Invalid input, show main menu again
                    nextRequestText = "Invalid option.\n1. Buy Airtime\n2. Check Balance\n3. Exit";
                    nextRequestId = 1; // Stay on Step 1
                    nextCommand = 'continue';
                }
            }

            // STEP 2: User is responding to the "Enter Amount" prompt
            else if (request_id === 2) {
                if (userInput === '0') {
                    // "0" is a standard USSD convention for "Back"
                    nextRequestText = "Welcome to My App!\n1. Buy Airtime\n2. Check Balance\n3. Exit";
                    nextRequestId = 1; // Go back to Step 1
                    nextCommand = 'continue';
                }
                else {
                    const amount = parseFloat(userInput);
                    if (!isNaN(amount) && amount > 0) {
                        // TODO: Integrate actual Beem Payment/Airtime API logic here!
                        nextRequestText = `Success! You have purchased ${amount} TZS airtime.\nThank you!`;
                        nextCommand = 'terminate'; // End session
                    }
                    else {
                        nextRequestText = "Invalid amount. Please enter a valid number.\nEnter Amount (e.g., 1000):";
                        nextRequestId = 2; // Stay on Step 2
                        nextCommand = 'continue';
                    }
                }
            }

            // Fallback for unexpected steps
            else {
                nextRequestText = "Session error. Please dial *1113# again.";
                nextCommand = 'terminate';
            }
        }
        else if (command === 'terminate') {
            // The network or user forcefully closed the session
            nextCommand = 'terminate';
            nextRequestText = "Goodbye!";
        }

        // ==========================================
        // BUILD & SEND RESPONSE TO BEEM
        // ==========================================

        const responseData: UssdOutgoingResponse = {
            msisdn,
            operator,
            session_id,
            command: nextCommand,
            payload: {
                request_id: nextRequestId,
                request: nextRequestText,
            },
        };

        return NextResponse.json(responseData);

    } catch (error) {
        console.error('USSD Callback Error:', error);

        // Return a safe fallback to terminate the session on the user's phone
        return NextResponse.json({
            msisdn: '',
            operator: '',
            session_id: '',
            command: 'terminate',
            payload: {
                request_id: 0,
                request: 'An error occurred. Please try again later.',
            },
        });
    }
}