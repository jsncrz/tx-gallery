import { Route } from "@angular/router";
import { CharacterService, ScreenSizeService } from "shared";
import { CharactersComponent } from "./characters/characters.component";

export const CHARACTERS_ROUTE: Route[] = [{
    path: '',
    providers: [
      CharacterService,
      ScreenSizeService
    ],
    children: [
      {path: '', component: CharactersComponent},
    ],
  }];