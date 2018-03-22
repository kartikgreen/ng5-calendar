import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsCalendarFilterComponent } from './events-calendar-filter.component';

describe('EventsCalendarFilterComponent', () => {
  let component: EventsCalendarFilterComponent;
  let fixture: ComponentFixture<EventsCalendarFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsCalendarFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsCalendarFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
