export class Credential {

  credentialId: string;
  username: string;
  companyName: string;
  password: string;
  confirmedPassword: string;
  changedPassword: string;
  rememberMe: boolean;
  accountType: string;
  usernameType: string;
  credentialStatus: string;

  constructor(username?: string, password?: string, changedPassword?: string, rememberMe?: boolean) {
    this.username = username;
    this.password = password;
    this.changedPassword = changedPassword;
    this.rememberMe = rememberMe;
  }

}
