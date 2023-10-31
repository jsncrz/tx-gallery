import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-web-apis/common';
import { TuiBrightness } from '@taiga-ui/core';

@Injectable({
    providedIn: 'root'
})
export class ScreenService {

    scrollMode: string | null = '';
    darkMode: string | null = '';
    private isPortrait = false

    constructor(@Inject(LOCAL_STORAGE) readonly storage: Storage) {
        this.scrollMode = this.storage.getItem('scrollMode');
        this.darkMode = this.storage.getItem('darkMode');
    }

    setIsPortrait() {
        this.isPortrait = true;
        this.storage.setItem('scrollMode', 'endless');
    }

    setTheme(theme: TuiBrightness | '') {
        this.storage.setItem('darkMode', theme);
        this.darkMode = theme;
    }

    setScrollMode(scrollMode: string) {
        this.storage.setItem('scrollMode', scrollMode);
        this.scrollMode = scrollMode;
    }

    getTheme(): TuiBrightness | null  {
        return this.storage.getItem('darkMode') as TuiBrightness;
    }

    getScrollMode(): string | null  {
        return this.storage.getItem('scrollMode');
    }

    getIsPortrait() {
        return this.isPortrait;
    }

    getIsEndlessScroll() {
        return Boolean(this.getScrollMode() != null && this.getScrollMode() === 'endless');
    }
}
