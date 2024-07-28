import { patchState, signalStore, withState } from '@ngrx/signals';
import {
  payload,
  withDevtools,
  withRedux,
} from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { AuthAPI } from '../../api/auth/auth.api';

export interface SignInRequest {
  email: string;
  password: string;
}

export interface AuthSignalStoreModel {
  signIn: SignInRequest & { isLoading: boolean };
  signUp: {
    email: string;
    password: string;
    isLoading: false;
  };
}

export const initialState: AuthSignalStoreModel = {
  signIn: {
    email: '',
    password: '',
    isLoading: false,
  },
  signUp: {
    email: '',
    password: '',
    isLoading: false,
  },
};

export const AuthSignalStore = signalStore(
  withDevtools('[auth signal store]'),
  withState(initialState),
  withRedux({
    actions: {
      signInRequest: payload<{ request: SignInRequest }>(),
      signInRequestSuccess: payload(),
      signInRequestFailure: payload(),
    },
    reducer(actions, on) {
      on(actions.signInRequest, (signalStore, { request }) =>
        patchState(signalStore, {
          signIn: { ...request, isLoading: true },
        }),
      );
    },
    effects(actions, create) {
      const authAPI = inject(AuthAPI);
      return {
        signIn$: create(actions.signInRequest).pipe(),
      };
    },
  }),
);
