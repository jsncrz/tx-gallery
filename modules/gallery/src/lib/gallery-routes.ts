import { Route } from "@angular/router";
import { CharacterService, ScreenSizeService, TwitterService } from "shared";
import { GalleryComponent } from "./gallery/gallery.component";

export const GALLERY_ROUTES: Route[] = [{
    path: '',
    providers: [
      CharacterService,
      TwitterService,
      ScreenSizeService
    ],
    children: [
      {path: '', component: GalleryComponent},
    ],
  }];