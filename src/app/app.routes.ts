import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'characters',
        loadChildren: () => import('characters').then(mod => mod.CHARACTERS_ROUTE),
        title: 'Characters'
    },
    {
        path: 'gallery',
        loadChildren: () => import('gallery').then(mod => mod.GALLERY_ROUTES),
        title: 'Gallery'
    },
    { path: '**', redirectTo: '/gallery', pathMatch: 'full' },
];
