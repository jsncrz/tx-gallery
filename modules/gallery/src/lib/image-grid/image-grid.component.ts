import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { TuiTablePagination, TuiTablePaginationModule } from '@taiga-ui/addon-table';
import { TuiLetModule } from '@taiga-ui/cdk/directives';
import {
    TuiButtonModule, TuiDataListModule, TuiDropdownModule, TuiGroupModule, TuiLabelModule,
    TuiLoaderModule, TuiScrollbarComponent, TuiScrollbarModule, TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiInputModule, TuiSelectModule, TuiTagModule } from '@taiga-ui/kit';
import { BehaviorSubject, Observable, Subject, debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { Character, CharacterService, PaginateDetails, Tweet, TwitterService, getTweetSmall } from 'shared';

@Component({
    selector: 'lib-image-grid',
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule,
        TuiTablePaginationModule, TuiScrollbarModule, TuiLoaderModule, TuiButtonModule, TuiSelectModule,
        TuiDataListModule, TuiDataListWrapperModule, TuiTextfieldControllerModule, TuiGroupModule, TuiInputModule,
        TuiDropdownModule, TuiTagModule, TuiLetModule, TuiLabelModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CharacterService, TwitterService],
    templateUrl: './image-grid.component.html',
    styleUrls: ['./image-grid.component.scss'],
    animations: [
        trigger('hideShowAnimation', [
            transition(':enter', [
                style({}),
                animate("125ms", keyframes([
                    style({ opacity: 0, transform: 'translate3d(50%, 0, 0' }),
                    style({ opacity: 1, transform: 'translate3d(0, 0, 0' }),
                ]))
            ]),
        ]),
    ]
})
export class ImageGridComponent implements OnInit {
    @ViewChild(TuiScrollbarComponent, { read: ElementRef })
    private readonly scrollBar?: ElementRef<HTMLElement>;

    searchForm!: FormGroup;
    getTweetSmall = getTweetSmall;
    tweets$!: Subject<Tweet[]>;
    loading$!: Subject<boolean>;

    dropdownStatus = false;

    sort = 'postDate:desc';
    character: Character | null = null;
    sortOptions: { label: string, value: string }[] = [];
    limit = 30;
    page = 0;
    sortOrder$: Subject<'asc' | 'desc'> = new Subject();
    sortOrder: 'asc' | 'desc' = 'desc';
    paginateDetails!: PaginateDetails;
    characters$: Observable<Character[]> = new BehaviorSubject([]);
    characters: Character[] = [];

    constructor(private twitterService: TwitterService,
        private characterService: CharacterService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) {
        this.characters$ = this.characterService.getAutocompleteCharacter().pipe(tap((characters) => {
            this.characters = characters;
            if (characters.length > 0) {
                this.dropdownStatus = true;
            }
        }));
    }

    ngOnInit() {
        this.initSearchForm();
        this.initSortOptions();
        this.route.queryParamMap.subscribe(
            (params: ParamMap) => {
                if (params.get('tag') != null && '' != params.get('tag') as string) {
                    this.character = {} as Character;
                    this.character.tag = params.get('tag') as string;
                }
                if (params.get('page') != null && !isNaN(parseInt(params.get('page') as string))) {
                    this.page = parseInt(params.get('page') as string);
                }
                this.getTweets();
                this.paginateDetails = this.twitterService.getResultPagination();
                this.loading$ = this.twitterService.isLoading();
            }
        );
    }

    initSearchForm() {
        this.searchForm = new FormGroup({
            name: new FormControl(''),
            sortField: new FormControl({ label: 'Post Date', value: 'postDate' }),
        });
        this.searchForm.get('name')?.valueChanges.pipe(debounceTime(400))
            .subscribe((name) => {
                this.dropdownStatus = false;
                if (name?.length > 2) {
                    this.characterService.getTagsByName(name);
                }
            });
        this.searchForm.get('sortField')?.valueChanges.pipe(distinctUntilChanged())
            .subscribe(() => {
                this.page = 0;
                this.sort = this.searchForm.get('sortField')?.value?.value + ':' + this.sortOrder;
                this.getTweets();
            });
        this.sortOrder$.pipe(distinctUntilChanged())
            .subscribe(() => {
                this.sort = this.searchForm.get('sortField')?.value?.value + ':' + this.sortOrder;
                this.getTweets();
            });
    }

    initSortOptions() {
        this.sortOptions.push({ label: 'Post Date', value: 'postDate' });
        this.sortOptions.push({ label: 'Like Count', value: 'likeCount' });
    }

    inputClicked(event: boolean) {
        if (event && this.characters?.length > 0) {
            this.dropdownStatus = true;
        }
    }

    onSelected(character: Character): void {
        this.character = character;
        this.getTweets();
    }

    sortOrderClicked() {
        this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
        this.sortOrder$.next(this.sortOrder === 'desc' ? 'asc' : 'desc');
        this.page = 0;
    }

    removeTag() {
        this.character = null;
        this.searchForm.get('name')?.reset();
        this.getTweets();
    }

    paginationChanged(pagination: TuiTablePagination) {
        this.limit = pagination.size;
        this.page = pagination.page;
        this.getTweets();
    }

    getTweets() {
        const filter: string[] = [];
        let tag = '';
        if (this.character != null) {
            filter.push(`tags=${this.character.tag}`);
            tag = this.character.tag;
        }
        this.tweets$ = this.twitterService.getTweets(filter, this.sort, this.limit, this.page + 1);
        if (this.scrollBar) {
            const { nativeElement } = this.scrollBar;
            nativeElement.scrollTop = 0;
        }
        const url = this.router.createUrlTree([], {
            relativeTo: this.route, queryParams:
                { tag: tag, page: this.page }
        }).toString()
        this.location.go(url);
    }

    clickImage(user: string, tweetId: string) {
        window.open(`https://twitter.com/${user}/status/${tweetId}`, "_blank");
    }
}
