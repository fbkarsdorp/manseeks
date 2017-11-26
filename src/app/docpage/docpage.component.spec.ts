import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocpageComponent } from './docpage.component';

describe('DocpageComponent', () => {
  let component: DocpageComponent;
  let fixture: ComponentFixture<DocpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
