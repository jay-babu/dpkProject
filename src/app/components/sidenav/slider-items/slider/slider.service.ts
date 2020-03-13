import { Injectable } from '@angular/core';
import { DriveAPIService } from '../../../../services/drive-api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SliderService {

    private _dpkFolder: BehaviorSubject<Map<string, string[]>>;
    dpkFolder$: Observable<Map<string, string[]>>;


    constructor(private driveAPIService: DriveAPIService) {
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
        const ghURL: URL = new URL(`https://github.com/jayp0521/dpkCover/blob/master/${ category }/${ title }.webp`);
        ghURL.searchParams.set('raw', 'true');
        return ghURL;
    }

    // private dpkMaterial(DPKs: DriveMaterialList): Slider[] {
    //     const dpk: Slider[] = [];
    //     for (const DPK of DPKs.files) {
    //         const name = DPK.name;
    //         this.driveAPIService.getListOfFiles(`'${ DPK.id }' in parents`).pipe(take(1)).subscribe(images => {
    //             const imageID = images.files[0].id;
    //             const imageURL = this.driveAPIService.exportImageDriveURL(imageID);
    //             dpk.push({
    //                 name,
    //                 imageID,
    //                 image: imageURL,
    //             });
    //         });
    //     }
    //     return dpk;
    // }
}
