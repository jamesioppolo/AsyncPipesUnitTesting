import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private visibleSubject = new Subject<boolean>();
  visibleObservable: Observable<boolean> = this.visibleSubject.asObservable();

  triggerVisibility() {
    this.visibleSubject.next(true);
  }
  
  reset() {
    this.visibleSubject.next(false);
  }
}
