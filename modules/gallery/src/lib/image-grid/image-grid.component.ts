import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TuiTablePagination, TuiTablePaginationModule } from '@taiga-ui/addon-table';
import { TuiScrollService } from '@taiga-ui/cdk';
import {
    TuiDataListModule,
    TuiDropdownModule,
    TuiHostedDropdownModule,
    TuiLinkModule,
    TuiLoaderModule, TuiScrollbarComponent, TuiScrollbarModule, TuiSvgModule
} from '@taiga-ui/core';
import { TuiItemsWithMoreModule, TuiTagModule } from '@taiga-ui/kit';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Subject, debounceTime } from 'rxjs';
import { PaginateDetails, ScreenService, Tweet, getTweetSmall } from 'shared';

@Component({
    selector: 'lib-image-grid',
    standalone: true,
    imports: [CommonModule, TuiTablePaginationModule, TuiScrollbarModule, TuiLoaderModule,
        TuiSvgModule, TuiLinkModule, InfiniteScrollModule, TuiItemsWithMoreModule, TuiTagModule, TuiDropdownModule,
        TuiHostedDropdownModule, TuiDataListModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TuiScrollService],
    templateUrl: './image-grid.component.html',
    styleUrls: ['./image-grid.component.scss'],
})
export class ImageGridComponent {
    @ViewChild(TuiScrollbarComponent, { read: ElementRef })
    private readonly scrollBar?: ElementRef<HTMLElement>;
    debouncer: Subject<TuiTablePagination> = new Subject<TuiTablePagination>();
    scrollDistance = 1;
    getTweetSmall = getTweetSmall;

    @Input() tweets$!: Subject<Tweet[]>;
    @Input() tweets!: Tweet[];
    @Input() loading$!: Subject<boolean>;
    @Input() limit = 30;
    @Input() page = 0;
    @Input() paginateDetails!: PaginateDetails;
    @Output() paginationChanged: EventEmitter<TuiTablePagination> = new EventEmitter();

    constructor(private screenService: ScreenService) {
        this.debouncer
            .pipe(debounceTime(250))
            .subscribe((value) => this.paginationChanged.emit(value));
    }

    onScrollDown() {
        this.debouncer.next({ page: this.page + 1, size: this.limit });
        this.scrollDistance = this.scrollDistance / 2;
    }

    pageChanged(pagination: TuiTablePagination) {
        this.debouncer.next(pagination);
        if (!this.scrollBar) {
            return;
        }
        const { nativeElement } = this.scrollBar;
        nativeElement.scrollTop = 0;
    }

    clickImage(user: string, tweetId: string) {
        window.open(`https://twitter.com/${user}/status/${tweetId}`, "_blank");
    }

    get isPortrait() {
        return this.screenService.getIsPortrait() || this.screenService.getScrollMode() === 'endless';
    }
}
