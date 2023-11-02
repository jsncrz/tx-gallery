import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TuiLetModule } from '@taiga-ui/cdk/directives';
import {
    TuiButtonModule, TuiDataListModule, TuiDropdownModule, TuiGroupModule, TuiLabelModule,
    TuiLoaderModule,
    TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { TuiAccordionModule, TuiDataListWrapperModule, TuiInputModule, TuiSelectModule, TuiTagModule } from '@taiga-ui/kit';
import { Observable, Subject } from 'rxjs';
import { Character } from '@vgallery/shared';

@Component({
    selector: 'lib-gallery-search',
    standalone: true,
    templateUrl: './gallery-search.component.html',
    styleUrls: ['./gallery-search.component.scss'],
    imports: [CommonModule, RouterModule, ReactiveFormsModule,
        TuiLoaderModule, TuiButtonModule, TuiSelectModule,TuiDataListModule, 
        TuiDataListWrapperModule, TuiTextfieldControllerModule, TuiGroupModule, TuiInputModule,
        TuiDropdownModule, TuiTagModule, TuiLetModule, TuiLabelModule, TuiAccordionModule
    ],
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
export class GallerySearchComponent implements OnInit {
    @Input() isPortrait!: boolean;
    
    @Input() loading$!: Subject<boolean>;

    @Input() searchForm!: FormGroup;
    @Input() dropdownStatus = false;
    @Input() groups: { label: string, value: string }[] = [];
    sortOptions: { label: string, value: string }[] = [];
    @Input() character: Character | null = null;
    @Input() sortOrder: 'asc' | 'desc' = 'desc';
    @Input() characters$: Observable<Character[]> = new Subject();

    @Output() characterSelected: EventEmitter<Character> = new EventEmitter();
    @Output() sortOrderChanged: EventEmitter<string> = new EventEmitter();
    @Output() tagRemoved: EventEmitter<void> = new EventEmitter();
    @Output() characterInputClicked: EventEmitter<void> = new EventEmitter();

    ngOnInit() {
        this.initSortOptions();
    }

    initSortOptions() {
        this.sortOptions.push({ label: 'Post Date', value: 'postDate' });
        this.sortOptions.push({ label: 'Like Count', value: 'likeCount' });
    }

    inputClicked(event: boolean, characters: Character[]) {
        if (event && characters?.length > 0) {
            this.characterInputClicked.emit();
        }
    }

    onSelected(character: Character): void {
        this.characterSelected.emit(character);
    }

    sortOrderClicked() {
        this.sortOrderChanged.emit();
    }

    removeTag() {
        this.tagRemoved.emit();
    }
}
