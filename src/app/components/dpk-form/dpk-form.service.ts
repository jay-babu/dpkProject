import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { DriveAPIService } from '../../services/drive-api.service';


@Injectable({
    providedIn: 'root'
})
export class DpkFormService {

    DPKs = new Map<string, string>();

    constructor(private fireDB: AngularFirestore, private driveAPIService: DriveAPIService, private afAuth: AngularFireAuth) {
    }

    validSubmission: (form: FormGroup) => Promise<ValidationErrors> = async (form: FormGroup) => {
        let status: ValidationErrors = null;

        const lyrics = form.value.lyrics;
        const imagesURL = form.value.imagesURL;
        const definitions = form.value.definitions;

        if (lyrics === null) {
            form.patchValue({ lyrics: '' });
        }
        if (imagesURL === null) {
            form.patchValue({ imagesURL: '' });
        }
        if (definitions === null) {
            form.patchValue({ definitions: '' });
        }

        if (imagesURL) {
            await this.verifyURL(imagesURL).then(res => status = res);
        }

        if (status === null && form.value.title) {
            await this.verifyTitleInDrive(form.value.title, this.DPKs.get(`${form.value.dpk}`))
                .then(res => status = (res.length !== 0) ? null : { titleNotInDrive: true });
        }

        if (status === null && form.value.title) {
            await this.photosEqualSlides(imagesURL, lyrics).then(res => status = res);
        }

        const lyricsArr: string[] = lyrics.split(/\n{2,}/g);

        if (status === null && definitions !== '') {
            const definitionsArr: string[] = definitions.split(/\n{2,}/g);
            status = (lyricsArr.length === definitionsArr.length) ? null : { lyricsDef: true };
        }
        return status;
    };

    submitDPK(fg: FormGroup) {
        this.fireDB
            .collection(fg.value.dpk).doc(fg.value.title)
            .set({
                lyrics: fg.value.lyrics.split(/\n{2,}/g),
                definitions: fg.value.definitions.split(/\n{2,}/g),
                imagesURL: fg.value.imagesURL,
                title: fg.value.title,
                author_uid: this.afAuth.auth.currentUser.uid,
            }).then(_ => _, err => console.error(err));
    }

    async verifyTitleInDrive(title: string, dpkId: string) {
        let filesArr: { id: string; name: string }[] = [];
        await this.driveAPIService
            .getListOfFiles(`'${dpkId}' in parents and mimeType = 'application/vnd.google-apps.folder' and name = '${title}'`)
            .toPromise().then(files => filesArr = files.files);
        return filesArr;
    }

    async verifyURL(imagesURL: string) {
        // Initial Style https://drive.google.com/drive/folders/1SGORrTaUwiRIekhS6j1obM28P4D7RlXq?usp=sharing
        try {
            const url = new URL(imagesURL);
            const path = url.pathname.split('/');
            const hostname = url.hostname;
            let status = null;
            if (!(hostname === 'drive.google.com' && path[1] === 'drive' && path[2] === 'folders')) {
                status = { badURL: true };
            }
            if (status) {
                return status;
            }
            return status;
        } catch {
            return { badURL: true };
        }
    }

    async photosEqualSlides(imagesURL: string, lyrics: string) {
        const url = new URL(imagesURL);
        const path = url.pathname.split('/');
        const id = path[3];
        let status = null;

        await this.driveAPIService.getListOfFiles(`'${id}' in parents`).toPromise().then(
            files => {
                if (lyrics.split(/\n{2,}/g).length !== files.files.length) {
                    status = { NotEqualPhotos: true };
                }
            }
        );
        return status;
    }

    openDPKSlides(form: FormGroup) {
        window.open(environment.url + 'dpk/' + form.value.dpk + '/' + form.value.title, '_blank');
    }

    getDPKRadio() {
        this.driveAPIService.getDPKRadio(`1NFdcrnJLViJgJyz9MiSxkCQOll3v5QnQ`)
            .subscribe(foldersObject => {
                const folders = foldersObject.files;
                for (const folder of folders) {
                    this.DPKs.set(folder.name, folder.id);
                }
            });
        return this.DPKs;
    }
}
