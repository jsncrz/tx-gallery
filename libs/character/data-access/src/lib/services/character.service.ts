import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paginate } from '@vgallery/core/api-types';
import { BaseService } from '@vgallery/core/http-client';
import { Observable, Subject, debounceTime, distinctUntilChanged, first, map } from 'rxjs';
import { Character } from '../models/character';

@Injectable()
export class CharacterService extends BaseService<Character> {
    private characterAutoComplete$: Subject<Character[]> = new Subject();

    constructor(httpClient: HttpClient) {
        super(httpClient, 'character');
    }

    private refreshCharacter(filter: string[], sortBy: string, limit: number, page: number) {
        this.loading$.next(true);
        const queryObj = this.createQueryObject(filter, sortBy, limit, page);
        this.httpClient.get<Paginate<Character>>(`${this.resourceUrl}/?${queryObj.filter}`
            + `${queryObj.sortOption}${queryObj.limitOption}${queryObj.pageOption}`)
            .pipe(debounceTime(500), distinctUntilChanged(),)
            .subscribe({
                next: (result) => {
                    this.setPaginateResults(result);
                },
                error: (err) => {
                    console.error(err);
                },
                complete: () => {
                    this.loading$.next(false);
                }
            });
    }

    getCharacters(filter: string[], sortBy: string, limit: number, page: number): Subject<Character[]> {
        this.refreshCharacter(filter, sortBy, limit, page);
        return this.results$;
    }

    createCharacter(character: Character): Observable<string> {
        this.saving$.next(true);
        return this.httpClient.post(`${this.resourceUrl}`, character, { responseType: 'text' })
            .pipe(map((character) => {
                this.saving$.next(false);
                this.refreshCharacter(this.filterOption, this.sortBy, this.limit, this.page);
                return character;
            }));
    }

    getCharactersByName(name: string, group: string) {
        this.httpClient.get<Character[]>(`${this.resourceUrl}/getCharactersByName?name=${name}&group=${group}`)
            .pipe(first())
            .subscribe({
                next: (result) => {
                    this.characterAutoComplete$.next(result);
                },
                error: (err) => {
                    console.error(err);
                },
                complete: () => {
                    this.loading$.next(false);
                }
            });
    }

    clearAutonameResults() {
        this.characterAutoComplete$.next([]);
    }

    getAutocompleteCharacter(): Observable<Character[]> {
        return this.characterAutoComplete$.pipe(distinctUntilChanged());
    }

}
