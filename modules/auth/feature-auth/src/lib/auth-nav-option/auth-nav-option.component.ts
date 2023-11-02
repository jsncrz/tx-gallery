import { CommonModule } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { TuiButtonModule, TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'lib-auth-nav-option',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent, 
    TuiButtonModule],
  templateUrl: './auth-nav-option.component.html',
  styleUrls: ['./auth-nav-option.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthNavOptionComponent {
  fromButton = '';

  constructor(@Inject(TuiDialogService) private readonly dialogs: TuiDialogService) { } 

  showDialog(content: PolymorpheusContent<TuiDialogContext>, fromButton: string): void {
    if(fromButton === 'login') {
      this.fromButton = 'login';
    } else if(fromButton === 'signup') {
      this.fromButton = 'signup';
    }
    this.dialogs.open(content, {appearance: 'auth-dialog', dismissible: false, size: 's'}).subscribe();
  }

  clickedAuthAction(action: string) {
    console.log(action);
    this.fromButton = action;
  }
}
