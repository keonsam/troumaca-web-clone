export class Credential {

  credentialId: string;
  username: string;
  password: string;
  changedPassword: string;
  rememberMe: boolean;
  credentialStatus: string;

  constructor(username?: string, password?: string, changedPassword?: string, rememberMe?: boolean) {
    this.username = username;
    this.password = password;
    this.changedPassword = changedPassword;
    this.rememberMe = rememberMe;
  }

}
