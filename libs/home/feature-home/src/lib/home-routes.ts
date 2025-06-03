import { Route } from "@angular/router";
import { HomeComponent } from "./home/home.component";

export const HOME_ROUTE: Route[] = [{
    path: '',
    providers: [
    ],
    children: [
      {path: '', component: HomeComponent},
    ],
  }];