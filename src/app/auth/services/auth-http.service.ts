import { Injectable } from '@angular/core';
import { ICurrentUser, IUser } from '../../model/ice.interface';
import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IRegisterRequest } from '../types/registerRequest.interface';
import { IRegisterResponse } from '../types/register-response.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  baseUrl: string = environment.authBaseUrl;

  constructor(private http: HttpClient) {}

  registerUser(data: IRegisterRequest): Observable<ICurrentUser> {
    return this.http
      .post<IRegisterResponse>(`${this.baseUrl}users`, data.user)
      .pipe(
        tap((res) => console.log(res)),
        map((response) => response.user)
      );
  }
}
