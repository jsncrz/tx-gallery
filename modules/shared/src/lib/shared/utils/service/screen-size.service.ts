import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class ScreenSizeService {

    private isPortrait = false

    setIsPortrait() {
        this.isPortrait = true;
    }

    getIsPortrait() {
        return this.isPortrait;
    }
}
