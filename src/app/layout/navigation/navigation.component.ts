import { animate, keyframes, style, transition, trigger } from '@angular/animations';
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
  animations: [
    trigger('logoAnimation', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate("350ms", keyframes([
          style({ opacity: 1, transform: 'translate3d(0%, 0, 0)'}),
          style({ opacity: 1, transform: 'translate3d(-13%, 5%, 0', scale: 1.30 },),
        ]))
      ]),
      transition(':enter', [
        style({ opacity: 1 }),
        animate("350ms", keyframes([
          style({ opacity: 1, transform: 'translate3d(-13%, 5%, 0', scale: 1.30 },),
          style({ opacity: 1, transform: 'translate3d(0%, 0, 0', scale: 1 }),
        ]))
      ]),
    ]),
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
    queueMicrotask(() => {   this.animationDisabled = false; })
  }
}
