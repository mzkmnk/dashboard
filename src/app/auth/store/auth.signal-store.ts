import { inject } from '@angular/core';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { AuthAPI } from '../../api/auth/auth.api';
import { RouterSignalStore } from '../../shared/store/router.signal-store';

export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignInResponse {
  code: string;
}

export interface SignUpRequest {
  username: string;
  password: string;
}

export interface SignUpResponse {
  code: string;
}

export interface AuthSignalStoreModel {
  signIn: SignInRequest & { isLoading: boolean };
  signUp: SignUpRequest & { isLoading: boolean };
}

export const initialState: AuthSignalStoreModel = {
  signIn: {
    username: '',
    password: '',
    isLoading: false,
  },
  signUp: {
    username: '',
    password: '',
    isLoading: false,
  },
};

export const AuthSignalStore = signalStore(
  withDevtools('[auth signal store]'),
  withState(initialState),
  withMethods(
    (
      signalStore,
      authAPI = inject(AuthAPI),
      routerSignalStore = inject(RouterSignalStore),
    ) => ({
      /**
       * signInRequest
       */
      signInRequest: rxMethod<SignInRequest>(
        pipe(
          tap((request) =>
            patchState(signalStore, {
              signIn: { ...request, isLoading: true },
            }),
          ),
          switchMap((request) => {
            return authAPI.signIn(request).pipe(
              tapResponse({
                next: (): void => {
                  routerSignalStore.navigate({ path: 'internal/home' });
                },
                error: () =>
                  patchState(signalStore, (signalState) => ({
                    ...signalState,
                    signIn: { ...signalState.signIn, isLoading: false },
                  })),
              }),
            );
          }),
        ),
      ),

      /**
       * signUpRequest
       */
      signUpRequest: rxMethod<SignUpRequest>(
        pipe(
          tap((request) =>
            patchState(signalStore, {
              signUp: { ...request, isLoading: true },
            }),
          ),
          switchMap((request) => {
            return authAPI.signUp(request).pipe(
              tapResponse({
                next: (response): void => {
                  routerSignalStore.navigate({ path: 'internal/home' });
                },
                error: (): void => {
                  patchState(signalStore, (signalState) => ({
                    ...signalState,
                    signUp: { ...signalState.signUp, isLoading: false },
                  }));
                },
              }),
            );
          }),
        ),
      ),
    }),
  ),
);
