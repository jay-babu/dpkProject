export interface GitHubTree {
    sha: string;
    url: string;
    tree: GitHubFile[];
}

interface GitHubFile {
    path: string;
    mode: string;
    type: string;
    sha: string;
    size: number;
    url: string;
}
