import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStoreMgrService {
  constructor() {}
  public setLocalStoreItem(key: string, value: unknown): void {
    try {
      if (key && value) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (e) {
      console.error('Unable to save to local storage');
    }
  }
  public getLocalStoreItem(key: string): string {
    let resVal: string = '';
    try {
      if (key) {
        const res = localStorage.getItem(key);
        resVal = res && res.length ? res : '';
      }
    } catch (error) {
      console.error('Unable to retrieve from local storage');
    }
    return resVal;
  }
  public deleteFromLocalStore(key: string) {
    if (key) {
      localStorage.removeItem(key);
    }
  }
  public setSessionStoreItem(key: string, value: string) {
    if (key && value) {
      sessionStorage.setItem(key, value);
    }
  }
  public getSessionStoreItem(key: string): string {
    let resVal: string = '';
    if (key) {
      const res = sessionStorage.getItem(key);
      resVal = res && res.length ? res : '';
    }
    return resVal;
  }
  public deleteFromSessionStore(key: string) {
    if (key) {
      sessionStorage.removeItem(key);
    }
  }
}
