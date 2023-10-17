import { Route } from '@angular/router';
import { ScreenService } from 'shared';

export const appRoutes: Route[] = [
    {
        path: 'characters',
        loadChildren: () => import('characters').then(mod => mod.CHARACTERS_ROUTE),
        title: 'Characters',
        providers: [ScreenService]
    },
    {
        path: 'gallery',
        loadChildren: () => import('gallery').then(mod => mod.GALLERY_ROUTES),
        title: 'Gallery',
        providers: [ScreenService]
    },
    { path: '**', redirectTo: '/gallery', pathMatch: 'full' },
];
