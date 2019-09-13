// import {Injectable} from '@angular/core';
// import {BehaviorSubject, Observable} from 'rxjs';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   isLoginSubject = new BehaviorSubject<boolean>(false);
//
//   isLoggedIn(): Observable<boolean> {
//     return this.isLoginSubject.asObservable();
//   }
//
//   /**
//    *  Login the user then tell all the subscribers about the new status
//    */
//   login(): void {
//     this.isLoginSubject.next(true);
//   }
//
//   /**
//    * Log out the user then tell all the subscribers about the new status
//    */
//   logout(): void {
//     this.isLoginSubject.next(false);
//   }
// }
