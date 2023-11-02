import { Route } from "@angular/router";
import { CharacterService, TwitterService } from '@vgallery/shared';
import { GalleryComponent } from "./gallery/gallery.component";

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