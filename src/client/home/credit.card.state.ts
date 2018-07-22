export class CreditCardState {
  private _methodId: string;
  private _cardName: string;
  private _cardNumber: string;
  private _cardExpDate: Date;
  private _cardCVV: string;

  get methodId(): string {
    return this._methodId;
  }

  set methodId(value: string) {
    this._methodId = value;
  }

  get cardName(): string {
    return this._cardName;
  }

  set cardName(value: string) {
    this._cardName = value;
  }

  get cardNumber(): string {
    return this._cardNumber;
  }

  set cardNumber(value: string) {
    this._cardNumber = value;
  }

  get cardExpDate(): Date {
    return this._cardExpDate;
  }

  set cardExpDate(value: Date) {
    this._cardExpDate = value;
  }

  get cardCVV(): string {
    return this._cardCVV;
  }

  set cardCVV(value: string) {
    this._cardCVV = value;
  }

  toJson() {
    return {
      methodId: this.methodId,
      cardName: this.cardName,
      cardNumber: this.cardNumber,
      cardExpDate: this.cardExpDate,
      cardCVV: this.cardCVV
    }
  }
}
