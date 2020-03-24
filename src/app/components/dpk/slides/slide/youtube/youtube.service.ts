import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { YoutubeChannelList, YoutubeVideoMeta } from '../../../../../interfaces/youtube-channel-list';

@Injectable({
    providedIn: 'root'
})
export class YoutubeService {

    youtubeAPI = `https://www.googleapis.com/youtube/v3/search`;

    private _youtubeId: BehaviorSubject<string>;
    youtubeId$: Observable<string>;

    constructor(private http: HttpClient) {
        this._youtubeId = new BehaviorSubject<string>(null);
        this.youtubeId$ = this._youtubeId.asObservable();

        this.listYoutubeVideos();
    }

    private set youtubeId(yid: string) {
        this._youtubeId.next(yid);
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
            const filteredVideos: YoutubeVideoMeta[] = items.filter(video => /^Guruhari Darshan/.test(video.snippet.title));
            this.randomVideoId(filteredVideos);
        });
    }

    randomVideoId(youtubeVideos: YoutubeVideoMeta[]) {
        this.youtubeId = youtubeVideos[Math.floor((Math.random() * youtubeVideos.length))].id.videoId;
    }
}
