import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiAlertModule, TuiDialogModule, TuiRootModule } from "@taiga-ui/core";
import { TuiIslandModule } from '@taiga-ui/kit';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { ScreenSizeService } from 'shared';
import { BreakpointObserver } from '@angular/cdk/layout';
@Component({
  standalone: true,
  imports: [RouterModule, TuiRootModule, TuiDialogModule, TuiAlertModule, TuiIslandModule,
            NavigationComponent],
  selector: 'vg-root',
  providers: [ScreenSizeService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'VT Gallery';

  constructor(private screenService: ScreenSizeService,
    private breakpointObserver: BreakpointObserver){}
  
  ngOnInit(): void {
    this.initBreakpointDetection();
  }

  initBreakpointDetection() {
    if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
      this.screenService.setIsPortrait();
    }
  }
}
