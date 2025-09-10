import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthHttpService } from '../services/auth-http.service';
import { AuthActions } from '../types/action-types';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ICurrentUser } from '../../model/ice.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStoreMgrService } from '../../shared/services/local-store-mgr.service';
import { Router } from '@angular/router';

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authHttpService = inject(AuthHttpService),
    localStorageService = inject(LocalStoreMgrService)
  ) => {
    return actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ request }) => {
        return authHttpService.registerUser(request).pipe(
          map((currentUser: ICurrentUser) => {
            localStorageService.setLocalStoreItem(
              'accessToken',
              currentUser.token
            );
            return AuthActions.registerSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              AuthActions.registerFailure({
                error: errorResponse.error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(AuthActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    );
  },
  { functional: true, dispatch: false }
);
