import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiAlertModule, TuiDialogModule, TuiRootModule } from "@taiga-ui/core";
import { TuiIslandModule } from '@taiga-ui/kit';
import { NavigationComponent } from './layout/navigation/navigation.component';

@Component({
  standalone: true,
  imports: [RouterModule, TuiRootModule, TuiDialogModule, TuiAlertModule, TuiIslandModule,
            NavigationComponent],
  selector: 'vg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'VT Gallery';
}
