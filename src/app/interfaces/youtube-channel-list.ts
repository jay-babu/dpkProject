export interface YoutubeChannelList {
    kind: string
    etag: string
    nextPageToken: string
    items: YoutubeVideoMeta[]
}

export interface YoutubeVideoMeta {
    id: YoutubeVideoId
    snippet: YoutubeSnippet
}

interface YoutubeVideoId {
    kind: string
    videoId: string
}

interface YoutubeSnippet {
    title: string
    thumbnails: any
}
