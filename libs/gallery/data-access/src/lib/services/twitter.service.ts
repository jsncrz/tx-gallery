import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, first } from 'rxjs';
import { Paginate } from '@vgallery/core/api-types/src';
import { BaseService } from '@vgallery/core/http-client/src';
import { Tweet } from '../models/tweet';

@Injectable()
export class TwitterService extends BaseService<Tweet> {

    constructor(httpClient: HttpClient) {
        super(httpClient, 'tweets');
    }

    private refreshTweets(filter: string[], sortBy: string, limit: number, page: number) {
        this.loading$.next(true);
        const queryObj = this.createQueryObject(filter, sortBy, limit, page);
        this.httpClient.get<Paginate <Tweet>>(`${this.resourceUrl}/getTweets?${queryObj.filter}`
            + `${queryObj.sortOption}${queryObj.limitOption}${queryObj.pageOption}`)
            .pipe(first())
            .subscribe({
                next: (tweets) => {
                    this.setPaginateResults(tweets);
                },
                error: (err) => {
                    console.error(err);
                },
                complete: () => {
                    this.loading$.next(false);
                }
            });
    }

    getTweets(filter: string[], sortBy: string, limit: number, page: number): Subject<Tweet[]> {
        this.refreshTweets(filter, sortBy, limit, page);
        return this.results$;
    }

}
