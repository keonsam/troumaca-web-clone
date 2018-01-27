
import {mapObjectProps2} from "./object.property.mapper2";

describe('main test', () => {
  it('always pass', () => {
    expect(1).toBe(1);
  });
});

export class FromAttrOne {

  private _str:string;
  private _int:number;
  private _bol:boolean;

  private _arr:string[];

  constructor() {
  }

  get str(): string {
    return this._str;
  }

  set str(value: string) {
    this._str = value;
  }

  get int(): number {
    return this._int;
  }

  set int(value: number) {
    this._int = value;
  }

  get bol(): boolean {
    return this._bol;
  }

  set bol(value: boolean) {
    this._bol = value;
  }

  get arr(): string[] {
    return this._arr;
  }

  set arr(value: string[]) {
    this._arr = value;
  }

}

export class ToAttrOne {

  private _str:string;
  private _int:number;
  private _bol:boolean;

  private _arr:string[];

  constructor() {
  }

  get str(): string {
    return this._str;
  }

  set str(value: string) {
    this._str = value;
  }

  get int(): number {
    return this._int;
  }

  set int(value: number) {
    this._int = value;
  }

  get bol(): boolean {
    return this._bol;
  }

  set bol(value: boolean) {
    this._bol = value;
  }

  get arr(): string[] {
    return this._arr;
  }

  set arr(value: string[]) {
    this._arr = value;
  }

}

describe('simple copy test', () => {
  let fromAttrOne:FromAttrOne = new FromAttrOne();
  fromAttrOne.str = "string value";
  fromAttrOne.int = 21;
  fromAttrOne.bol = true;

  fromAttrOne.arr = ["as", "ga", "nm"];

  let mapObjectProps = mapObjectProps2(fromAttrOne, new ToAttrOne());

  it('string value is equal', () => {
    expect(fromAttrOne.str).toBe(mapObjectProps.str);
  });

  it('int value is equal', () => {
    expect(fromAttrOne.int).toBe(mapObjectProps.int);
  });

  it('boolean value is equal', () => {
    expect(fromAttrOne.bol).toBe(mapObjectProps.bol);
  });



});

describe('simple copy array', () => {
  let fromAttrOne:FromAttrOne = new FromAttrOne();
  fromAttrOne.str = "string value";
  fromAttrOne.int = 21;
  fromAttrOne.bol = true;

  let mapObjectProps = mapObjectProps2(fromAttrOne, new ToAttrOne());

  it('string value is equal', () => {
    expect(fromAttrOne.str).toBe(mapObjectProps.str);
  });

  it('int value is equal', () => {
    expect(fromAttrOne.int).toBe(mapObjectProps.int);
  });

  it('boolean value is equal', () => {
    expect(fromAttrOne.bol).toBe(mapObjectProps.bol);
  });

});