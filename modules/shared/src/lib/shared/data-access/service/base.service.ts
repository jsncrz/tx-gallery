import { HttpClient } from '@angular/common/http';
import { Paginate, PaginateDetails, QueryObject } from '../schema/paginate';
import { BehaviorSubject, Subject } from 'rxjs';

export abstract class BaseService<T> {
    protected url = 'http://34.130.20.27:3000/api';
    protected results$: Subject<T[]> = new Subject();
    protected authenticatedUrl: string = this.url + '/v1';
    protected resourceUrl!: string;
    protected loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    protected saving$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    protected currentPage$: Subject<number> = new Subject();
    protected totalPages$: Subject<number> = new Subject();
    protected totalResults$: Subject<number> = new Subject();
    protected filterBy = '';
    protected filterOption: string[] = [];
    protected sortBy = '';
    protected limit = 10;
    protected page = 0;

    constructor(protected httpClient: HttpClient, protected resource: string) {
        this.resourceUrl = `${this.authenticatedUrl}/${resource}`;
     }

    isLoading(): Subject<boolean> {
        return this.loading$;
    }

    isSaving(): Subject<boolean> {
        return this.saving$;
    }

    getResultPagination(): PaginateDetails {
        return {
            page$: this.currentPage$,
            totalPages$: this.totalPages$,
            totalResults$: this.totalResults$
        };
    }

    createQueryObject(filterOption: string[], sortBy: string, limit: number, page: number): QueryObject {
        this.filterOption = filterOption;
        let filter = '';
        filterOption.forEach(filterOption => {
            filter = filter + filterOption + '&';
        });
        this.filterBy = filter;
        this.sortBy = sortBy;
        this.limit = limit;
        this.page = page;
        return {
            filter: `${filter != '' ? `${filter}` : ''}`,
            sortOption: `${sortBy != null ? `sortBy=${sortBy}&` : ''}`,
            limitOption: `${limit != null ? `limit=${limit}&` : ''}`,
            pageOption: `${page != null ? `page=${page}` : ''}`,
        }
    }

    setPaginateResults(result: Paginate<T>) {
        this.results$.next(result.results);
        this.currentPage$.next(result.page);
        this.totalPages$.next(result.totalPages);
        this.totalResults$.next(result.totalResults);
    }

    getResults(): Subject<T[]> {
        return this.results$;
    }

}
