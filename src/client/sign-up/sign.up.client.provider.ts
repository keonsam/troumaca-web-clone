import {AppConfig} from '../../app.config';
import {UUIDGenerator} from '../../uuid.generator';
import {SignUpClient} from './sign.up.client';
import {SignUpClientHttp} from './sign.up.client.http';
import {SignUpClientMock} from './sign.up.client.mock';

export function signUpClientFactory (appConfig: AppConfig, uuidGenerator: UUIDGenerator): SignUpClient {
  let signUpClient: SignUpClient;
  if (appConfig.remoteEndPoints) {
    signUpClient = new SignUpClientHttp(uuidGenerator);
  } else {
    signUpClient = new SignUpClientMock();
  }
  return signUpClient;
}

export let signUpClientProvider = {
  provide: SignUpClient,
  useFactory: signUpClientFactory,
  deps: [AppConfig, UUIDGenerator]
};
