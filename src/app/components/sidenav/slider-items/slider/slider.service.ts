import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GitHubFile } from '../../../../interfaces/git-hub-tree';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseLists } from '../../../../interfaces/firebase-lists';
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SliderService {

    private _dpkFolder: BehaviorSubject<Map<string, string[]>>;
    dpkFolder$: Observable<Map<string, string[]>>;


    constructor(private http: HttpClient,
                private fireDB: AngularFirestore,) {
        this._dpkFolder = new BehaviorSubject<Map<string, string[]>>(null);
        this.dpkFolder$ = this._dpkFolder.asObservable();

        const dpks = new Map<string, string[]>();
        this.fireDB.collection<FirebaseLists>(`Lists`).snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as FirebaseLists;
                const id = a.payload.doc.id;
                return { id, ...data };
            })),
            take(1)
        ).subscribe(res => {
            res.forEach(dpk => dpks.set(dpk.id, dpk.title));
            this._dpkFolder.next(dpks);
        });
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
        return gitHubDPKImages;
    }
}
