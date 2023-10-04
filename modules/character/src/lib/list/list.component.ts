import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TuiTableModule, TuiTablePagination, TuiTablePaginationModule } from '@taiga-ui/addon-table';
import { TuiButtonModule, TuiDataListModule, TuiGroupModule, TuiLoaderModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiInputModule, TuiSelectModule, TuiTagModule } from '@taiga-ui/kit';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

import { Character, CharacterGroup, CharacterService, PaginateDetails, TwitterService } from 'shared';

@Component({
  selector: 'lib-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule,
    TuiLoaderModule, TuiTableModule, TuiTablePaginationModule, TuiTagModule, TuiButtonModule, TuiSelectModule,
    TuiDataListModule, TuiDataListWrapperModule, TuiTextfieldControllerModule, TuiGroupModule, TuiInputModule
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [CharacterService, TwitterService]
})
export class ListComponent implements OnInit {
  loading$!: Subject<boolean>;
  saving$!: Subject<boolean>;
  searchForm!: FormGroup;

  characters$!: Subject<Character[]>;
  limit = 30;
  page = 0;
  sortOrder = 'desc';
  sort = 'name:asc';
  columns = ['pictureUrl', 'tlName', 'group']
  groups: { label: string, value: string }[] = [];
  sortOptions: { label: string, value: string }[] = [];
  paginateDetails!: PaginateDetails;

  constructor(private characterService: CharacterService,
    private twitterService: TwitterService,
    private router: Router) {
    this.initGroups();
    this.initSortOptions();
  }

  ngOnInit() {
    this.initSearchForm();
    this.getCharacter();
    this.paginateDetails = this.characterService.getResultPagination();
    this.loading$ = this.characterService.isLoading();
    this.saving$ = this.characterService.isSaving();
  }

  initSearchForm() {
    this.searchForm = new FormGroup({
      name: new FormControl(''),
      group: new FormControl(''),
      sortField: new FormControl('tlName'),
    });
    this.searchForm.get('group')?.valueChanges
      .subscribe(() => { this.getCharacter(); });
    this.searchForm.get('name')?.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => { this.getCharacter(); });
  }

  initGroups() {
    this.groups.push({ label: 'Default', value: '' });
    this.groups.push({ label: CharacterGroup.Hololive, value: CharacterGroup.Hololive });
    this.groups.push({ label: CharacterGroup.Nijisanji, value: CharacterGroup.Nijisanji });
    this.groups.push({ label: CharacterGroup.VSPO, value: CharacterGroup.VSPO });
  }

  initSortOptions() {
    this.sortOptions.push({ label: 'Name', value: 'tlName' });
    this.sortOptions.push({ label: 'Date', value: '_id' });
    this.sortOptions.push({ label: 'Last Sync', value: 'lastSynced' });
  }

  syncClicked(id: string) {
    this.twitterService.syncTweet(id);
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
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc'
    this.sort = this.searchForm.get('sortField')?.value + ':' + this.sortOrder;
    this.getCharacter();
  }

  getCharacter() {
    const filter: string[] = [];
    if (this.searchForm.get('name') != null && this.searchForm.get('name')?.value != '') {
      filter.push(`tlName=${this.searchForm.get('name')?.value}`);
    }
    if (this.searchForm.get('group') != null && this.searchForm.get('group')?.value != '') {
      filter.push(`group=${this.searchForm.get('group')?.value}`);
    }
    this.characters$ = this.characterService.getCharacters(filter, this.sort, this.limit, this.page + 1);
  }

  searchTag(tag: string) {
    this.router.navigateByUrl(`gallery?tag=${tag}`);
  }

}
