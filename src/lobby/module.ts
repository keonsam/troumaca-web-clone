import {ModuleInformation} from "./module.information";

export class Module {
  private _moduleId: string;
  private _name: string;
  private _subscribed: string;
  private _information: ModuleInformation;

  get moduleId(): string {
    return this._moduleId;
  }

  set moduleId(value: string) {
    this._moduleId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get subscribed(): string {
    return this._subscribed;
  }

  set subscribed(value: string) {
    this._subscribed = value;
  }

  get information(): ModuleInformation {
    return this._information;
  }

  set information(value: ModuleInformation) {
    this._information = value;
  }
}
