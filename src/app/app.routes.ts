import { Route } from '@angular/router';
import { TuiDialogService } from '@taiga-ui/core';
import { ScreenService } from '@vgallery/shared';

export const appRoutes: Route[] = [
    {
        path: '',
        loadChildren: () => import('@vgallery/home/feature-home').then(mod => mod.HOME_ROUTE),
        title: 'Home',
        providers: [ScreenService, TuiDialogService],
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
