import { AuthNavOptionComponent } from '@vgallery/auth/feature-auth';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiDropdownModule, TuiHostedDropdownModule, TuiLinkModule, TuiSvgModule, TuiTooltipModule } from '@taiga-ui/core';
import { TuiAccordionModule, TuiToggleModule } from '@taiga-ui/kit';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { ScreenService } from '@vgallery/shared';

@Component({
  selector: 'vg-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule,
    TuiAccordionModule, TuiSidebarModule, TuiActiveZoneModule, TuiLinkModule, TuiSvgModule,
    TuiButtonModule, TuiHostedDropdownModule, TuiDropdownModule, TuiToggleModule,
    TuiTooltipModule,
    FormsModule,
    AuthNavOptionComponent
  ],
  providers: [ScreenService],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements AfterViewInit {

  animationDisabled = true;
  open = false;
  private darkMode$: Subject<boolean> = new Subject();
  private endlessMode$: Subject<boolean> = new Subject();

  constructor(private screenService: ScreenService) {
      this.darkMode$
            .pipe(debounceTime(250), distinctUntilChanged())
            .subscribe((value) => this.screenService.setTheme(value ? 'onDark' : ''));
      this.endlessMode$
            .pipe(debounceTime(1000), distinctUntilChanged())
            .subscribe((value) => {
              window.location.reload();
              this.screenService.setScrollMode(value ? 'endless' : '');
            });
    }

  toggle(open: boolean): void {
    this.open = open;
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => { this.animationDisabled = false; })
  }

  get darkMode() {
    return this.screenService.getTheme() === 'onDark';
  }

  set darkMode(value) {
    this.darkMode$.next(value);
  }

  get endlessScroll() {
    return this.screenService.getScrollMode() === 'endless';
  }

  set endlessScroll(value) {
    this.endlessMode$.next(value);
  }

}
