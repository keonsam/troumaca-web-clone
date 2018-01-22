import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTypeClassTopMenuComponent } from './asset-type-class-top-menu.component';

describe('AssetTypeClassTopMenuComponent', () => {
  let component: AssetTypeClassTopMenuComponent;
  let fixture: ComponentFixture<AssetTypeClassTopMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetTypeClassTopMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetTypeClassTopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
