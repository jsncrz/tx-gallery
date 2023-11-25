import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { TuiAlertModule, TuiBrightness, TuiDialogModule, TuiModeModule, TuiRootModule, TuiThemeNightModule } from "@taiga-ui/core";
import { TuiIslandModule } from '@taiga-ui/kit';
import { ScreenService } from '@vgallery/core/settings';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { DarkThemeComponent } from './layout/theme/dark-theme/dark-theme.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, TuiRootModule, TuiDialogModule, TuiAlertModule, TuiIslandModule,
    TuiThemeNightModule, TuiModeModule,
    NavigationComponent, DarkThemeComponent],
  selector: 'vg-root',
  providers: [ScreenService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'VT Gallery';

  constructor(private screenService: ScreenService,
    private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.initBreakpointDetection();
  }

  initBreakpointDetection() {
    if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
      this.screenService.setIsPortrait();
    }
  }

  get mode(): TuiBrightness | null {
    return this.screenService.getTheme();
  }
}
