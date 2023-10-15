import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiLinkModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiAccordionModule } from '@taiga-ui/kit';

@Component({
  selector: 'vg-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule,
    TuiAccordionModule, TuiSidebarModule, TuiActiveZoneModule, TuiLinkModule, TuiSvgModule,
    TuiButtonModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements AfterViewInit {

  animationDisabled = true;
  open = false;

  toggle(open: boolean): void {
    this.open = open;
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => { this.animationDisabled = false; })
  }
}
