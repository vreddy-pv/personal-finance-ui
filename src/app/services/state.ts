import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public refresh = signal(false);

  constructor() { }

  public notify() {
    this.refresh.set(!this.refresh());
  }
}
