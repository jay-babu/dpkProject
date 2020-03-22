import { Injectable } from '@angular/core';
import { DriveAPIService } from '../../../../services/drive-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GitHubFile } from '../../../../interfaces/git-hub-tree';

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
        let index = 0;
        for (const [ category, id ] of dpks.entries()) {

            setTimeout(() => {
                const dpkObservable = this.driveAPIService.getListOfFolders(id);
                dpkObservable.subscribe(
                    DPKs => {
                        const titles = DPKs.files.map(slider => slider.name);
                        dpkFolderList.set(category, titles);
                    }
                );
            }, 2000 * index++);
        }
        this._dpkFolder.next(dpkFolderList);
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
        const gitHubDPKImages = new Map<string, string>();

        for (const category of [ 'Kirtan', 'Prathana', ]) {
            const gitURL = new URL(`https://api.github.com/repos/jayp0521/dpkCover/contents/${ category }`);

            this.http.get<GitHubFile[]>(gitURL.href).subscribe(coverImages => {
                for (const file of coverImages) {
                    gitHubDPKImages.set(file.name, file.download_url);
                }
            });
        }
        console.log(gitHubDPKImages);
        return gitHubDPKImages;
    }
}
