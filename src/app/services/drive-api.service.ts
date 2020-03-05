import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DriveMaterialList } from '../interfaces/drive';
import { Observable, Subject } from 'rxjs';
import { DriveMaterial } from '../interfaces/bhajan';

@Injectable({
    providedIn: 'root'
})
export class DriveAPIService {
    driveURL = 'https://www.googleapis.com/drive/v3/files';

    private _driveMaterial: Subject<DriveMaterial>;
    driveMaterial$: Observable<DriveMaterial>;
    driveMaterial: DriveMaterial;


    constructor(private http: HttpClient) {
        this.driveMaterial = { bhajanSource: undefined, imagePaths: [], images: [] };
        this._driveMaterial = new Subject<DriveMaterial>();
        this.driveMaterial$ = this._driveMaterial.asObservable();
    }

    set bhajanID(materialID: string) {
        this.driveMaterial = { bhajanSource: undefined, imagePaths: [], images: [] };
        const driveBhajanImages$ = this.getListOfFiles(`'${ materialID }' in parents`);
        this.bhajanImages(driveBhajanImages$);
    }

    private set driveMaterialSubject(material: DriveMaterial) {
        this._driveMaterial.next(material);
    }

    private bhajanImages(driveBhajanImages$: Observable<DriveMaterialList>) {
        driveBhajanImages$.subscribe(driveFiles => {
            const imagePaths: URL[] = [];
            for (const item of driveFiles.files) {
                const mimeType = item.mimeType.split('/')[0];
                if (mimeType === 'audio') {
                    this.driveMaterial.bhajanSource = this.exportImageDriveURL(item.id);
                } else if (mimeType === 'image') {
                    imagePaths.push(this.exportImageDriveURL(item.id))
                }
            }
            this.driveMaterial.imagePaths = imagePaths;
            this.imageDownload(this.driveMaterial.imagePaths);
            this.driveMaterialSubject = this.driveMaterial;
        });
    }

    private imageDownload(files: URL[]) {
        for (const [ index, driveFile ] of files.entries()) {
            this.driveMaterial.images[index] = this.preloadImage(driveFile);
        }
    }

    getListOfFolders(rootFolderId: string) {
        return this.getListOfFiles(`'${ rootFolderId }' in parents and mimeType = 'application/vnd.google-apps.folder'`);
    }

    getListOfFiles(q: string, orderBy = 'name', fields = 'files(name, id, mimeType)') {
        const key = environment.driveConfig.key;
        const params: HttpParams = new HttpParams().set('q', q).set('orderBy', orderBy).set('fields', fields).set('key', key);
        return this.http.get<DriveMaterialList>(this.driveURL, { params });
    }

    exportImageDriveURL(id: string) {
        const url = new URL(`${ this.driveURL }/${ id }`);
        url.searchParams.set('key', environment.driveConfig.key);
        url.searchParams.set('alt', 'media');
        return url;
    }

    preloadImage(driveFileURL: URL) {
        const image = new Image();
        image.src = driveFileURL.href;
        return image;
    }
}
