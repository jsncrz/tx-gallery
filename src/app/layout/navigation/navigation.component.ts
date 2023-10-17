import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiDropdownModule, TuiHostedDropdownModule, TuiLinkModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiAccordionModule, TuiToggleModule } from '@taiga-ui/kit';
import { ScreenService } from 'shared';

@Component({
  selector: 'vg-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule,
    TuiAccordionModule, TuiSidebarModule, TuiActiveZoneModule, TuiLinkModule, TuiSvgModule,
    TuiButtonModule, TuiHostedDropdownModule, TuiDropdownModule, TuiToggleModule,
    FormsModule
  ],
  providers: [ScreenService],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements AfterViewInit {

  animationDisabled = true;
  open = false;

  constructor(private screenService: ScreenService) {}

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
    this.screenService.setTheme(value ? 'onDark' : '')
  }

  get endlessScroll() {
    return this.screenService.getScrollMode() === 'endless';
  }

  set endlessScroll(value) {
    this.screenService.setScrollMode(value ? 'endless' : '')
  }
}
