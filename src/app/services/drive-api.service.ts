import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DriveAPIService {

    constructor(private http: HttpClient) {
    }

    getListofFiles(q: string, orderBy = 'name', fields = 'files(name, id)') {
        const key = environment.driveConfig.key;
        const params: HttpParams = new HttpParams().set('q', q).set('orderBy', orderBy).set('fields', fields).set('key', key);
        const headers: HttpHeaders = new HttpHeaders().set('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict');
        const url = 'https://www.googleapis.com/drive/v3/files';
        // this.http.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
        return this.http.get(url, {params, headers});
    }

    getFile(id: string) {
        const key = environment.driveConfig.key;
        const url = 'https://www.googleapis.com/drive/v3/files/';
        const params: HttpParams = new HttpParams().set('key', key).set('alt', 'media');
        return this.http.get(url + id, {params});
    }
}
