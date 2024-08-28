import { bootstrapApplication } from '@angular/platform-browser';
import { provideToastr } from 'ngx-toastr';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { AppRouting } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInceptron } from './app/inceptron';

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInceptron,
      multi: true,
    },
    importProvidersFrom(AppRouting, HttpClientModule),
    provideAnimationsAsync(),
    provideToastr(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '255791283750-mpdln5a284jiqtvfg07ss34lnul4dktb.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('963460514633605'),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
}).catch((err) => console.error(err));
