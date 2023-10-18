import { Subject } from "rxjs";

export interface Paginate<T> {
    limit: number,
    page: number,
    results: T[],
    totalPages: number,
    totalResults: number,
}

export interface PaginateDetails {
    page: number,
    totalPages: number,
    totalResults: number,
}

export interface QueryObject {
    filter: string,
    sortOption: string,
    limitOption: string,
    pageOption: string,
}
