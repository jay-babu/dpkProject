export interface FirebaseBhajan {
    lyrics: string[];
    imagesURL: string;
    gujarati?: string[];
    definitions?: string[];
    audioTimings?: number[];
}

// stanzaVisible Init is English
// altStanza Init is Gujarati
export interface Bhajan {
    stanzaVisible: string[][];
    definitions: string[][];
    altStanza: string[][];
    audioTimings: number[];
}

export interface DriveMaterial {
    bhajanSource: URL;
    imagePaths: URL[];
    images: HTMLImageElement[];
}
