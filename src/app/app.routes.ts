import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'characters',
        loadComponent: () => import('characters').then((m) => m.CharactersComponent),
    },
    {
        path: 'gallery',
        loadComponent: () => import('gallery').then((m) => m.GalleryComponent),
    },
];
