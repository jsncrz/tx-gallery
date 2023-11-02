import { HttpClient } from '@angular/common/http';
import { Paginate, PaginateDetails, QueryObject } from '../schema/paginate';
import { BehaviorSubject, Subject } from 'rxjs';

export abstract class BaseService<T> {
    // protected url = 'http://34.130.20.27:3000/api';
    protected url = 'http://localhost:3000/api';
    protected results$: Subject<T[]> = new Subject();
    protected authenticatedUrl: string = this.url + '/v1';
    protected resourceUrl!: string;
    protected loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    protected saving$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    protected currentPage$: Subject<number> = new Subject();
    protected currentPage = 0;
    protected totalPages$: Subject<number> = new Subject();
    protected totalPages = 0
    protected totalResults$: Subject<number> = new Subject();
    protected totalResults = 0
    protected filterBy = '';
    protected filterOption: string[] = [];
    protected sortBy = '';
    protected limit = 10;
    protected page = 0;
    private paginateDetails: Subject<PaginateDetails> = new Subject();

    constructor(protected httpClient: HttpClient, protected resource: string) {
        this.resourceUrl = `${this.authenticatedUrl}/${resource}`;
        this.currentPage$.subscribe((currentPage) => this.currentPage = currentPage);
        this.totalPages$.subscribe((totalPages) => this.totalPages = totalPages);
        this.totalResults$.subscribe((totalResults) => this.totalResults = totalResults);
     }

    isLoading(): Subject<boolean> {
        return this.loading$;
    }

    isSaving(): Subject<boolean> {
        return this.saving$;
    }

    getResultPagination(): Subject<PaginateDetails> {
        return this.paginateDetails;
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
        this.paginateDetails.next({
            page: result.page,
            totalPages: result.totalPages,
            totalResults: result.totalResults
        });
    }

    getResults(): Subject<T[]> {
        return this.results$;
    }

}
