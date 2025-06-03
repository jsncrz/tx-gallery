import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AbstractTuiThemeSwitcher } from '@taiga-ui/cdk';

@Component({
  selector: 'vg-dark-theme',
  template: '',
  standalone: true,
  styleUrls: ['./dark-theme.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DarkThemeComponent extends AbstractTuiThemeSwitcher {}
