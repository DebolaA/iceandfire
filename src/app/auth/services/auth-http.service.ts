import { Injectable } from '@angular/core';
import { ICurrentUser, IUser } from '../../model/ice.interface';
import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IRegisterRequest } from '../types/registerRequest.interface';
import { IAuthResponse } from '../types/auth-response.interface';
import { environment } from '../../../environments/environment';
import { ILoginRequest } from '../types/login-request.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  baseUrl: string = environment.authBaseUrl;

  constructor(private http: HttpClient) {}

  registerUser(data: IRegisterRequest): Observable<ICurrentUser> {
    return this.http
      .post<IAuthResponse>(`${this.baseUrl}users`, data.user)
      .pipe(
        tap((res) => console.log(res)),
        map((response) => response.user)
      );
  }

  login(data: ILoginRequest): Observable<ICurrentUser> {
    return this.http
      .get<IAuthResponse>(
        `${this.baseUrl}users/${data.user.email}/${data.user.password}`
      )
      .pipe(
        tap((res) => console.log(res)),
        map((response) => response.user)
      );
  }
}
