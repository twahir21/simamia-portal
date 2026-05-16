import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        console.log("Body received:", body);
        console.dir(body, { depth: null });

        console.log("..........json file ......");
        console.log(JSON.stringify(body, null, 2));

        return NextResponse.json({
            success: true,
            message: "Payload processed successfully",
            data: body,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong",
            },
            { status: 500 }
        );
    }
}