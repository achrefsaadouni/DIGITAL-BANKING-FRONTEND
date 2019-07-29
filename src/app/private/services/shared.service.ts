import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // tslint:disable-next-line:variable-name
  private _breadcrumb: string[];
  constructor() {
  }

  get breadcrumb(): string[] {
    return this._breadcrumb;
  }

  set breadcrumb(value: string[]) {
    this._breadcrumb = value;
  }
}
