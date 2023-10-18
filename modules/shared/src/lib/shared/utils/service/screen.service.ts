import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { TuiBrightness } from '@taiga-ui/core';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-web-apis/common';

@Injectable({
    providedIn: 'root'
})
export class ScreenService {

    scrollMode: string | null = '';
    darkMode: string | null = '';
    private isPortrait = false

    private storageItem: Subject<{key:string, value: string}> = new Subject();
    constructor(@Inject(LOCAL_STORAGE) readonly storage: Storage) {
        this.storageItem
            .pipe(debounceTime(250), distinctUntilChanged())
            .subscribe((keyValuePair) => this.storage.setItem(keyValuePair.key, keyValuePair.value));
        this.scrollMode = this.storage.getItem('scrollMode');
        this.darkMode = this.storage.getItem('darkMode');
    }

    setIsPortrait() {
        this.isPortrait = true;
        this.storageItem.next({key: 'scrollMode', value:'endless'});
    }

    setTheme(theme: TuiBrightness | '') {
        this.storageItem.next({key: 'darkMode', value:theme});
        this.darkMode = theme;
    }

    setScrollMode(scrollMode: string) {
        this.storageItem.next({key: 'scrollMode', value:scrollMode});
        this.scrollMode = scrollMode;
    }

    getTheme(): TuiBrightness | null  {
        return this.darkMode as TuiBrightness;
    }

    getScrollMode(): string | null  {
        return this.scrollMode;
    }

    getIsPortrait() {
        return this.isPortrait;
    }

    getIsEndlessScroll() {
        return Boolean(this.getScrollMode() != null && this.getScrollMode() === 'endless');
    }
}
