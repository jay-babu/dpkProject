export interface FirebaseBhajan {
    lyrics: string[];
    imagesURL: string;
    definitions?: string[];
    audioTimings: number[];
}

export interface Bhajan {
    stanza: string[][];
    definitions: string[][];
    audioTimings: number[];
}

export interface DriveMaterial {
    bhajanSource: URL;
    imagePaths: URL[];
    images: HTMLImageElement[];
}
