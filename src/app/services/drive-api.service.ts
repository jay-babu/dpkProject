import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DriveMaterialList } from '../interfaces/drive';

@Injectable({
    providedIn: 'root'
})
export class DriveAPIService {
    driveURL = 'https://www.googleapis.com/drive/v3/files';

    constructor(private http: HttpClient) {
    }

    getListOfFolders(rootFolderId: string) {
        return this.getListOfFiles(`'${ rootFolderId }' in parents and mimeType = 'application/vnd.google-apps.folder'`);
    }

    getListOfFiles(q: string, orderBy = 'name', fields = 'files(name, id, mimeType)') {
        const key = environment.firebaseConfig.apiKey;
        const params: HttpParams = new HttpParams().set('q', q).set('orderBy', orderBy).set('fields', fields).set('key', key);
        return this.http.get<DriveMaterialList>(this.driveURL, { params });
    }
}
