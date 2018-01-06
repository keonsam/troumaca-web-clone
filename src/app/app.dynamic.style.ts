export class AppDynamicStyle {

  private _isWithSidePanel:boolean = false;
  private _isNoPaddingContent:boolean = false;
  private _isWithPattern:boolean = false;


  constructor(isWithSidePanel?: boolean, isNoPaddingContent?: boolean, isWithPattern?: boolean) {
    this._isWithSidePanel = isWithSidePanel;
    this._isNoPaddingContent = isNoPaddingContent;
    this._isWithPattern = isWithPattern;
  }

  get isWithSidePanel(): boolean {
    return this._isWithSidePanel;
  }

  set isWithSidePanel(value: boolean) {
    this._isWithSidePanel = value;
  }

  get isNoPaddingContent(): boolean {
    return this._isNoPaddingContent;
  }

  set isNoPaddingContent(value: boolean) {
    this._isNoPaddingContent = value;
  }

  get isWithPattern(): boolean {
    return this._isWithPattern;
  }

  set isWithPattern(value: boolean) {
    this._isWithPattern = value;
  }
}