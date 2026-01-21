import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            // Return a mocked response for demo if key is missing
            console.warn("GROQ_API_KEY not found. Returning mock response.");
            return NextResponse.json({ text: "Demo Mode: Voice transcription requires a valid Groq API Key." });
        }

        const groq = new Groq({ apiKey });

        const completion = await groq.audio.transcriptions.create({
            file: file,
            model: "whisper-large-v3",
            response_format: "json",
            language: "en",
            temperature: 0.0,
        });

        return NextResponse.json({ text: completion.text });

    } catch (error) {
        console.error("Transcription error:", error);
        return NextResponse.json({ error: "Failed to transcribe audio" }, { status: 500 });
    }
}
