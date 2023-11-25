import { BaseObject } from '@vgallery/core/api-types';

export interface Tweet extends BaseObject {
    tweetId: string;
    tags: string[];
    user: string;
    url: string;
    likeCount: number;
    postDate: Date;
}

export function getTweetSmall(url: string): string {
    return url + ':small'
}
