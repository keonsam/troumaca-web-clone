export class SuccessMessage {
  type: string;
  name: string;
  show: boolean;
  process: string;
  constructor(type: string, name: string, show: boolean, process: string) {
    this.type = type;
    this.name = name;
    this.show = show;
    this.process = process;
  }
}
