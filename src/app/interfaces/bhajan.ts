import { Observable } from 'rxjs';
import { DriveImageList } from './drive';

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
    driveBhajanImages$: Observable<DriveImageList>;
}
