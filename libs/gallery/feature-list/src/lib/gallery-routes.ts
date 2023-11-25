import { Route } from "@angular/router";
import { GalleryComponent } from "./gallery/gallery.component";
import { CharacterService } from "@vgallery/character/data-access";
import { TwitterService } from "@vgallery/gallery/data-access";

export const GALLERY_ROUTES: Route[] = [{
    path: '',
    providers: [
      CharacterService,
      TwitterService,
    ],
    children: [
      {path: '', component: GalleryComponent},
    ],
  }];