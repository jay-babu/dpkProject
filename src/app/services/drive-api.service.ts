import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DriveImageList } from '../interfaces/drive';

@Injectable({
    providedIn: 'root'
})
export class DriveAPIService {
    driveURL = 'https://www.googleapis.com/drive/v3/files';

    constructor(private http: HttpClient) {
    }

    getDPKRadio(rootFolderId: string) {
        return this.getListOfFiles(`'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`);
    }

    getListOfFiles(q: string, orderBy = 'name', fields = 'files(name, id)') {
        const key = environment.driveConfig.key;
        const params: HttpParams = new HttpParams().set('q', q).set('orderBy', orderBy).set('fields', fields).set('key', key);
        return this.http.get<DriveImageList>(this.driveURL, { params });
    }

    getImage(id: string) {
        const image = new Image();
        image.src = `https://drive.google.com/uc?export=view&id=${id}`;
        return image;
    }

    getFile(id: string) {
        const key = environment.driveConfig.key;
        const params: HttpParams = new HttpParams().set('key', key).set('alt', 'media');
        return this.http.get(this.driveURL + id, { params });
    }
}
