import { Injectable } from '@angular/core';
import { DriveAPIService } from '../../../../services/drive-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GitHubTree } from '../../../../interfaces/git-hub-tree';

@Injectable({
    providedIn: 'root'
})
export class SliderService {

    private _dpkFolder: BehaviorSubject<Map<string, string[]>>;
    dpkFolder$: Observable<Map<string, string[]>>;


    constructor(private driveAPIService: DriveAPIService, private http: HttpClient) {
        this._dpkFolder = new BehaviorSubject<Map<string, string[]>>(null);
        this.dpkFolder$ = this._dpkFolder.asObservable();

        const dpks = new Map<string, string>().set('Dhun', '1EI8HFzxxO94jyXMIC4mmSKEWF9dKTDcB')
            .set('Prathana', '1ncfYSnh6WRercX8KtgCsDrk6fsnVzBEw').set('Kirtan', '1aczJKsMPPblN7yNdFuoiYXfJXH7Tc_yU');
        this.dpkFolder(dpks);
    }

    dpkFolder(dpks: Map<string, string>) {
        const dpkFolderList = new Map<string, string[]>();
        for (const [ category, id ] of dpks) {
            const dpkObservable = this.driveAPIService.getListOfFolders(id);
            dpkObservable.subscribe(
                DPKs => {
                    const titles = DPKs.files.map(slider => slider.name);
                    dpkFolderList.set(category, titles);
                }
            );
        }
        this._dpkFolder.next(dpkFolderList);
    }

    getGitHubURL(category: string, title: string) {
        const coverRepo = 'https://raw.githubusercontent.com/jayp0521/dpkCover/master/';
        if (this.detectBrowser) {
            const ghWebp: URL = new URL(`${ coverRepo }${ category }/${ title }.webp`);
            return [ ghWebp ];
        }
        const ghJPG: URL = new URL(`${ coverRepo }${ category }/${ title }.jpg`);
        return [ ghJPG ];
    }

    get detectBrowser() {
        const userAgent = navigator.userAgent;
        if (userAgent.search(`Safari`) > -1) {
            if (userAgent.search(`CriOS`) > -1) {
                return false;
            } else return userAgent.search(`Chrome`) > -1;
        }
    }

    get gitHubImages() {
        const gitHubDPKImages = new Set<string>();

        for (const category of [ '93648413ef90b292c80c0ee88b53ee347c5d538d', '3fa480e66773120a4f6618387bd0d94e483c836c', ]) {
            const gitURL = new URL(`https://api.github.com/repos/jayp0521/dpkCover/git/trees/${ category }`);

            this.http.get<GitHubTree>(gitURL.href).subscribe(coverImages => {
                for (const file of coverImages.tree) {
                    gitHubDPKImages.add(file.path)
                }
            });
        }
        return gitHubDPKImages;
    }
}
