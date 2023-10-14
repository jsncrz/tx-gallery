import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { TuiTablePagination } from '@taiga-ui/addon-table';
import { BehaviorSubject, Observable, Subject, debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { Character, CharacterService, PaginateDetails, ScreenSizeService, Tweet, TwitterService, getTweetSmall } from 'shared';
import { GallerySearchComponent } from '../gallery-search/gallery-search.component';
import { ImageGridComponent } from '../image-grid/image-grid.component';

@Component({
  selector: 'lib-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule,
    GallerySearchComponent, ImageGridComponent
  ],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  isPortrait = false;
  getTweetSmall = getTweetSmall;
  tweets$!: Subject<Tweet[]>;
  loading$!: Subject<boolean>;

  searchForm!: FormGroup;
  dropdownStatus = false;
  sort = 'postDate:desc';
  character: Character | null = null;
  sortOrder$: Subject<'asc' | 'desc'> = new Subject();
  sortOrder: 'asc' | 'desc' = 'desc';
  characters$: Observable<Character[]> = new BehaviorSubject([]);

  limit = 30;
  page = 0;
  paginateDetails!: PaginateDetails;

  constructor(private twitterService: TwitterService,
    private characterService: CharacterService,
    private screenSizeService: ScreenSizeService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.characters$ = this.characterService.getAutocompleteCharacter().pipe(tap((characters) => {
      if (characters.length > 0) {
        this.dropdownStatus = true;
      }
    }));
  }

  ngOnInit() {
    this.isPortrait = this.screenSizeService.getIsPortrait();
    this.initSearchForm()
    this.initGallery()
  }

  /* ---------------------------- Search Functions ---------------------------- */
  initSearchForm() {
    this.searchForm = new FormGroup({
      name: new FormControl(''),
      sortField: new FormControl({ label: 'Post Date', value: 'postDate' }),
    });
    this.searchForm.get('name')?.valueChanges.pipe(debounceTime(400))
      .subscribe((name) => {
        this.dropdownStatus = false;
        if (name?.length > 2) {
          this.characterService.getCharactersByName(name, '');
        } else {
          this.characterService.clearAutonameResults();
        }
      });
    this.searchForm.get('sortField')?.valueChanges.pipe(distinctUntilChanged())
      .subscribe(() => {
        this.page = 0;
        this.sort = this.searchForm.get('sortField')?.value?.value + ':' + this.sortOrder;
        this.getTweets();
      });
    this.sortOrder$.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.page = 0;
        this.sort = this.searchForm.get('sortField')?.value?.value + ':' + this.sortOrder;
        this.getTweets();
      });
  }

  characterInputClicked() {
      this.dropdownStatus = true;
  }

  onSelected(character: Character): void {
    this.character = character;
    this.getTweets();
  }

  sortOrderClicked() {
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
    this.sortOrder$.next(this.sortOrder === 'desc' ? 'asc' : 'desc');
  }

  removeTag() {
    this.character = null;
    this.searchForm.get('name')?.reset();
    this.getTweets();
  }

  /* ---------------------------- Gallery Functions --------------------------- */
  initGallery() {
    this.tweets$ = this.twitterService.getResults();
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
    this.twitterService.getTweets(filter, this.sort, this.limit, this.page + 1);
    if (!this.screenSizeService.getIsPortrait()) {
      const url = this.router.createUrlTree([], {
        relativeTo: this.route, queryParams:
          { tag: tag, page: this.page }
      }).toString()
      this.location.go(url);
    }
  }

}
