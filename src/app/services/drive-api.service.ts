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

    getDPKFolder(rootFolderId: string) {
        return this.getListOfFiles(`'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`);
    }

    getListOfFiles(q: string, orderBy = 'name', fields = 'files(name, id, mimeType)') {
        const key = environment.driveConfig.key;
        const params: HttpParams = new HttpParams().set('q', q).set('orderBy', orderBy).set('fields', fields).set('key', key);
        return this.http.get<DriveImageList>(this.driveURL, { params });
    }

    exportImageDriveURL(id: string) {
        return `https://drive.google.com/uc?export=view&id=${id}`;
    }

    preloadImage(driveFileURL: string) {
        const image = new Image();
        image.src = driveFileURL;
        return image;
    }

    exportThumbnailDriveURL(id: string) {
        return `https://drive.google.com/thumbnail?id=${id}&sz=h210`;
    }
}
