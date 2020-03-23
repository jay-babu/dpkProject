export interface FirebaseBhajan {
    title: string;
    lyrics: string[];
    audioLink?: string;
    gujarati?: string[];
    definitions?: string[];
    audioTimings?: number[];
    author_uid?: string;
}

// stanzaVisible Init is English
// altStanza Init is Gujarati
export interface Bhajan {
    stanzaVisible: string[][];
    definitions: string[][];
    altStanza: string[][];
    audioTimings: number[];
    audioLink?: URL;
}
