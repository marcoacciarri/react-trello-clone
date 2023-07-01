import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { todos } = await request.json();

    const response = await openai.createChatCompletion({
        model: "gtp-3.5-turbo",
        temperature: 0.8,
        n: 1, //number of responses
        stream: false,
        messages: [
            {
                role: "system",
                content: `When responding, welcome the user always as Marco and say welcome to the Trello todo app. Limit the response to 200 characters.`
            },
            {
                role: "user",
                content: `Hi there, provide a summary of the following todos. Count how many todos are in the following categories such as to do, in progress and done them tell the user to have a product day! Here is that data: ${JSON.stringify(todos)
                    }`
            }
        ]
    });

    const { data } = response;

    console.log('openai response: ', data);
    console.log(data.choices[0].message);

    return NextResponse.json(data.choices[0].message);
}