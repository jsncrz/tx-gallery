import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TuiTableModule, TuiTablePagination, TuiTablePaginationModule } from '@taiga-ui/addon-table';
import { TuiButtonModule, TuiDataListModule, TuiGroupModule, TuiLoaderModule, TuiScrollbarModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiAccordionModule, TuiDataListWrapperModule, TuiInputModule, TuiSelectModule, TuiTagModule } from '@taiga-ui/kit';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Character, CharacterGroup, CharacterService, PaginateDetails, ScreenSizeService } from 'shared';

@Component({
  selector: 'lib-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule,
    TuiLoaderModule, TuiTableModule, TuiTablePaginationModule, TuiTagModule, TuiButtonModule, TuiSelectModule,
    TuiDataListModule, TuiDataListWrapperModule, TuiTextfieldControllerModule, TuiGroupModule, TuiInputModule,
    TuiScrollbarModule, TuiAccordionModule 
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  loading$!: Subject<boolean>;
  saving$!: Subject<boolean>;
  searchForm!: FormGroup;

  isPortrait = false;

  characters$!: Subject<Character[]>;
  limit = 30;
  page = 0;
  sortOrder$: Subject<'asc' | 'desc'> = new Subject();
  sortOrder: 'asc' | 'desc' = 'desc';
  sort = 'debutDate:desc';
  columns = ['pictureUrl', 'tlName', 'group']
  groups: { label: string, value: string }[] = [];
  sortOptions: { label: string, value: string }[] = [];
  paginateDetails!: PaginateDetails;

  constructor(private characterService: CharacterService,
    private router: Router,
    private screenSizeService: ScreenSizeService) {
    this.initGroups();
    this.initSortOptions();
  }

  ngOnInit() {
    this.isPortrait = this.screenSizeService.getIsPortrait();
    console.log(this.isPortrait);
    this.initSearchForm();
    this.characters$ = this.characterService.getResults();
    this.getCharacter();
    this.paginateDetails = this.characterService.getResultPagination();
    this.loading$ = this.characterService.isLoading();
    this.saving$ = this.characterService.isSaving();
  }

  initSearchForm() {
    this.searchForm = new FormGroup({
      name: new FormControl(''),
      group: new FormControl({ label: 'Default', value: '' }),
      sortField: new FormControl({ label: 'Debut', value: 'debutDate' }),
    });
    this.searchForm.get('group')?.valueChanges.pipe(distinctUntilChanged())
      .subscribe(() => { this.getCharacter(); });
    this.searchForm.get('name')?.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => { this.getCharacter(); });
    this.searchForm.get('sortField')?.valueChanges.pipe(distinctUntilChanged())
      .subscribe(() => {
        this.sort = this.searchForm.get('sortField')?.value?.value + ':' + this.sortOrder;
        this.getCharacter();
      });
    this.sortOrder$.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.sort = this.searchForm.get('sortField')?.value?.value + ':' + this.sortOrder;
        this.getCharacter();
      });
  }

  initGroups() {
    this.groups.push({ label: 'Default', value: '' });
    this.groups.push({ label: CharacterGroup.Hololive, value: CharacterGroup.Hololive });
    this.groups.push({ label: CharacterGroup.HololiveEn, value: CharacterGroup.HololiveEn });
    this.groups.push({ label: CharacterGroup.Nijisanji, value: CharacterGroup.Nijisanji });
    this.groups.push({ label: CharacterGroup.NijisanjiEn, value: CharacterGroup.NijisanjiEn });
    this.groups.push({ label: CharacterGroup.VSPO, value: CharacterGroup.VSPO });
    this.groups.push({ label: CharacterGroup.Neoporte, value: CharacterGroup.Neoporte });
    this.groups.push({ label: CharacterGroup.Nanashi, value: CharacterGroup.Nanashi });
    this.groups.push({ label: CharacterGroup.Independent, value: CharacterGroup.Independent });
  }

  initSortOptions() {
    this.sortOptions.push({ label: 'Name', value: 'tlName' });
    this.sortOptions.push({ label: 'Debut', value: 'debutDate' });
  }

  onTwitterClicked(url: string) {
    window.open(url, '_blank');
  }

  limitChanged(limit: number) {
    this.limit = limit;
    this.getCharacter();
  }

  paginationChanged(pagination: TuiTablePagination) {
    this.limit = pagination.size;
    this.page = pagination.page;
    this.getCharacter();
  }

  sortOrderClicked() {
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
    this.sortOrder$.next(this.sortOrder === 'desc' ? 'asc' : 'desc');
  }

  getCharacter() {
    const filter: string[] = [];
    if (this.searchForm.get('name') != null && this.searchForm.get('name')?.value != '') {
      filter.push(`tlName=${this.searchForm.get('name')?.value}`);
    }
    if (this.searchForm.get('group') != null && this.searchForm.get('group')?.value != '' && this.searchForm.get('group')?.value?.value != '') {
      filter.push(`group=${this.searchForm.get('group')?.value?.value}`);
    }
    this.characterService.getCharacters(filter, this.sort, this.limit, this.page + 1);
  }

  searchTag(tag: string) {
    this.router.navigateByUrl(`gallery?tag=${tag}`);
  }

}
