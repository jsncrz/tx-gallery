import { Route } from '@angular/router';
import { ScreenService } from '@vgallery/core/settings/src';

export const appRoutes: Route[] = [
    {
        path: '',
        loadChildren: () => import('@vgallery/home/feature-home').then(mod => mod.HOME_ROUTE),
        title: 'Home',
        providers: [ScreenService],
    },
    {
        path: 'characters',
        loadChildren: () => import('@vgallery/characters/feature-list').then(mod => mod.CHARACTERS_ROUTE),
        title: 'Characters',
        providers: [ScreenService]
    },
    {
        path: 'gallery',
        loadChildren: () => import('@vgallery/gallery/feature-list').then(mod => mod.GALLERY_ROUTES),
        title: 'Gallery',
        providers: [ScreenService]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
