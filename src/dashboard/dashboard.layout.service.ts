import {BehaviorSubject, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {SuccessMessage} from './success-message/success.message';


@Injectable({
  providedIn: 'root',
})
export class DashboardLayoutService {
  success: BehaviorSubject<SuccessMessage> = new BehaviorSubject<SuccessMessage>(null);
  error: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

}
