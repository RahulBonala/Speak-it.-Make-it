import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            console.warn("OPENAI_API_KEY not found. Returning mock response.");
            return NextResponse.json({ text: "Demo Mode: Voice transcription requires a valid OpenAI API Key." });
        }

        const openAiFormData = new FormData();
        openAiFormData.append("file", file, file.name || "audio.webm");
        openAiFormData.append("model", "whisper-1");
        openAiFormData.append("response_format", "json");

        const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`
            },
            body: openAiFormData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("OpenAI Whisper Error:", errorText);
            return NextResponse.json({ error: "Failed to transcribe audio with OpenAI" }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json({ text: data.text });

    } catch (error) {
        console.error("Transcription error:", error);
        return NextResponse.json({ error: "Failed to transcribe audio" }, { status: 500 });
    }
}
