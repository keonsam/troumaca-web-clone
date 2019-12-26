export class SuccessMessage {
  type: string;
  name: string;
  show: boolean;
  constructor(type: string, name: string, show: boolean) {
    this.type = type;
    this.name = name;
    this.show = show;
  }
}
