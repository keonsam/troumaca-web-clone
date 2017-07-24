import {Subject} from "rxjs/Subject";

export function loginSubjectProviderFactory ():Subject<boolean> {
  let subject:Subject<boolean> = new Subject<boolean>();
  if (!subject) {
    subject = new Subject<boolean>();
  }
  return subject;
}

export let loginSubjectProvider = {
  provide: 'loginSubject',
  useFactory: loginSubjectProviderFactory
};