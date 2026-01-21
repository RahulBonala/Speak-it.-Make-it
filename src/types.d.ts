interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
}

interface SpeechRecognitionEvent {
    results: {
        [index: number]: {
            [index: number]: {
                transcript: string;
            };
        };
    };
}

interface SpeechRecognitionErrorEvent {
    error: string;
}

interface SpeechRecognition {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    onstart: (event: Event) => void;
    onend: (event: Event) => void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
}
