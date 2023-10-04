import { Subject } from "rxjs";

export interface Paginate<T> {
    limit: number,
    page: number,
    results: T[],
    totalPages: number,
    totalResults: number,
}

export interface PaginateDetails {
    page$: Subject<number>,
    totalPages$: Subject<number>,
    totalResults$: Subject<number>,
}

export interface QueryObject {
    filter: string,
    sortOption: string,
    limitOption: string,
    pageOption: string,
}
