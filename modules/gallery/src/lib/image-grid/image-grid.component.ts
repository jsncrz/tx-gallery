import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TuiTablePagination, TuiTablePaginationModule } from '@taiga-ui/addon-table';
import {
    TuiLoaderModule, TuiScrollbarComponent, TuiScrollbarModule
} from '@taiga-ui/core';
import { Subject } from 'rxjs';
import { PaginateDetails, Tweet, getTweetSmall } from 'shared';

@Component({
    selector: 'lib-image-grid',
    standalone: true,
    imports: [CommonModule, TuiTablePaginationModule, TuiScrollbarModule, TuiLoaderModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [],
    templateUrl: './image-grid.component.html',
    styleUrls: ['./image-grid.component.scss'],
})
export class ImageGridComponent {
    @ViewChild(TuiScrollbarComponent, { read: ElementRef })
    private readonly scrollBar?: ElementRef<HTMLElement>;

    getTweetSmall = getTweetSmall;
    @Input() tweets$!: Subject<Tweet[]>;
    @Input() loading$!: Subject<boolean>;

    @Input() limit = 30;
    @Input() page = 0;
    @Input() paginateDetails!: PaginateDetails;
    @Output() paginationChanged: EventEmitter<TuiTablePagination> = new EventEmitter();

    pageChanged(pagination: TuiTablePagination) {
        this.paginationChanged.emit(pagination);
        if (!this.scrollBar) {
            return;
        }
        const { nativeElement } = this.scrollBar;
        nativeElement.scrollTop = 0;
    }

    clickImage(user: string, tweetId: string) {
        window.open(`https://twitter.com/${user}/status/${tweetId}`, "_blank");
    }
}
