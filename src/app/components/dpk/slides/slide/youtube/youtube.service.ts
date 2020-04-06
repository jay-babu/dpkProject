import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { YoutubeChannelList, YoutubeVideoMeta } from '../../../../../interfaces/youtube-channel-list';
import { DpkParseService } from '../../dpk-parse.service';

@Injectable({
    providedIn: 'root'
})
export class YoutubeService {

    youtubeAPI = `https://www.googleapis.com/youtube/v3/search`;

    private _youtubeId: BehaviorSubject<string>;
    youtubeId$: Observable<string>;

    private _paused: BehaviorSubject<boolean>;
    paused$: Observable<boolean>;

    approvedVideos: Map<string, string>;

    filterVideos: YoutubeVideoMeta[];

    constructor(private http: HttpClient, private dpkParseService: DpkParseService,) {
        this._youtubeId = new BehaviorSubject<string>(null);
        this.youtubeId$ = this._youtubeId.asObservable();

        this._paused = new BehaviorSubject<boolean>(true);
        this.paused$ = this._paused.asObservable();

        this.approvedVideos = new Map<string, string>([ [ 'Chesta', 'V_mKI9pJxYA' ] ]);

        this.dpkParseService.firebaseBhajan$.subscribe(firebaseBhajan => {
            const yid = this.approvedVideos.get(firebaseBhajan.title);
            (yid) ? this.youtubeId = yid : this.listYoutubeVideos();
        });
    }

    private set youtubeId(yid: string) {
        this._youtubeId.next(yid);
    }

    toggle() {
        this._paused.next(!this._paused.value);
    }

    get youtubeURL() {
        const youtubeURL = new URL(this.youtubeAPI);
        youtubeURL.searchParams.set('part', 'snippet, id');
        youtubeURL.searchParams.set('channelId', 'UCuQNLnncEruW0pllaE0ZeKQ');
        youtubeURL.searchParams.set('maxResults', '30');
        youtubeURL.searchParams.set('order', 'date');
        youtubeURL.searchParams.set('key', environment.firebaseConfig.apiKey);
        youtubeURL.searchParams.set('ngsw-bypass', 'true');
        return youtubeURL;
    }

    listYoutubeVideos() {
        const youtubeURL = this.youtubeURL;

        this.http.get<YoutubeChannelList>(youtubeURL.href).subscribe(videos => {
            const items = videos.items;
            this.filterVideos = items.filter(video => /^Guruhari Darshan/.test(video.snippet.title));
            this.randomVideoId();
        });
    }

    randomVideoId() {
        this.youtubeId = this.filterVideos[Math.floor((Math.random() * this.filterVideos.length))].id.videoId;
    }
}
