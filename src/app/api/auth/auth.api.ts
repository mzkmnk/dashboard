import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../env/environment';
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '../../auth/store/auth.signal-store';

@Injectable({
  providedIn: 'root',
})
export class AuthAPI {
  private readonly http = inject(HttpClient);

  signIn = (request: SignInRequest): Observable<SignInResponse> => {
    return this.http.post<SignInResponse>(
      `${environment.API.base}/signIn`,
      request,
    );
  };

  signUp = (request: SignUpRequest): Observable<SignUpResponse> => {
    return this.http.post<SignUpResponse>(
      `${environment.API.base}/signUp`,
      request,
    );
  };
}
