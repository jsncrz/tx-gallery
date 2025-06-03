import { Route } from "@angular/router";
import { CharactersComponent } from "./characters/characters.component";
import { CharacterService } from "@vgallery/character/data-access";

export const CHARACTERS_ROUTE: Route[] = [{
    path: '',
    providers: [
      CharacterService,
    ],
    children: [
      {path: '', component: CharactersComponent},
    ],
  }];