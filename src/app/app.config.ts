import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from "@angular/platform-browser/animations";
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { TuiRootModule } from "@taiga-ui/core";
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(TuiRootModule),
  provideAnimations(),
  provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
  provideHttpClient()],
};
