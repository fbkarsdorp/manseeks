import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordlistComponent } from './wordlist.component';

describe('WordlistComponent', () => {
  let component: WordlistComponent;
  let fixture: ComponentFixture<WordlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
