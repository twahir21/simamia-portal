import { NextResponse } from "next/server";

export function POST (req: Request) {
    try {
        const body = req.json();

        console.log("Body received: ", body);

        return NextResponse.json({
            success: false,
            message: "Payload processed successfully"
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error instanceof Error ? 
                        error.message :
                        "Something went wrong"
        })
    }
}