import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakPage } from './speak.page';

describe('SpeakPage', () => {
  let component: SpeakPage;
  let fixture: ComponentFixture<SpeakPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpeakPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
