export interface FirebaseBhajan {
    lyrics: string[];
    imagesURL: string;
    gujarati?: string[];
    definitions?: string[];
    audioTimings?: number[];
}

export interface Bhajan {
    stanza: string[][];
    definitions: string[][];
    gujarati: string[][];
    audioTimings: number[];
}

export interface DriveMaterial {
    bhajanSource: URL;
    imagePaths: URL[];
    images: HTMLImageElement[];
}
