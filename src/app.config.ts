import {Injectable} from "@angular/core";

@Injectable()
export class AppConfig {

  private _apiEndpoint: string;
  private _title: string;
  private _remoteEndPoints: boolean;
  private server: string = "http://ec2-18-204-213-58.compute-1.amazonaws.com:3000/";
  private local: string = "http://localhost:3000";
  constructor() {
    // this._apiEndpoint = "api.heroes.com";
    this._apiEndpoint = this.server;
    this._title = "Troumaca";
    this._remoteEndPoints = false;
  }

  get remoteEndPoints():boolean {
    return this._remoteEndPoints;
  }

  set remoteEndPoints(value:boolean) {
    this._remoteEndPoints = value;
  }
  get title():string {
    return this._title;
  }

  set title(value:string) {
    this._title = value;
  }
  get apiEndpoint():string {
    return this._apiEndpoint;
  }

  set apiEndpoint(value:string) {
    this._apiEndpoint = value;
  }

}
