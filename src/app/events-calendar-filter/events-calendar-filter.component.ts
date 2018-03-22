import {Component, Input, Output, EventEmitter} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {EventsCalendarRepositoryService} from './events-calendar-repository.service';

@Component({
  selector: 'app-events-calendar-filter',
  templateUrl: './events-calendar-filter.component.html',
  styleUrls: ['./events-calendar-filter.component.css']
})
export class EventsCalendarFilterComponent  {
  constructor(private eventsCalendarRepositoryService: EventsCalendarRepositoryService) {

  }
  displayedColumns = ['select', 'position'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  selection = new SelectionModel<any>(true, []);
  toggleMaster: boolean = false;
  eventsLocation;
  eventParameters;
  categories: Array<number>;
  @Input() eventsDate;
  @Output() eventsData: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit() {
    this.selection.onChange.subscribe((events) => {
      if (!this.toggleMaster) {
        this.categories = this.selection.selected.map(x => x.id);
        this.eventsCalendarRepositoryService.getEventsData(this.selection.selected);
      }
    });
  }

  onEventsLocationChange(events) {
    console.log('events location', events, this.eventsLocation);
  }

  individualCheckBoxClicked(event) {
    event.stopPropagation();
    this.toggleMaster = false;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.toggleMaster = true;
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
        this.categories = this.selection.selected.map(x => x.id);
        this.eventsCalendarRepositoryService.getEventsData(this.selection.selected);
  }
  getEventsData() {
    if (this.categories && this.eventsDate && this.eventsLocation) {
      this.eventParameters = {
        "Id": this.eventsLocation,
        "Categories": this.categories,
        "StartDate": this.eventsDate[0],
        "EndDate": this.eventsDate[1]
      }
      this.eventsCalendarRepositoryService.getEventsData(this.eventParameters);
      this.eventsData.emit(this.eventParameters);
    }
  }
}

export interface EventsCategory {
  id: number;
  category: string;
}

const ELEMENT_DATA: EventsCategory[] = [
  {"id": 1, "category": "Business Events"},
  {"id": 2, "category": "Sports"},
  {"id": 3, "category": "Entertainment"},
  {"id": 4, "category": "Political Events"},
  {"id": 5, "category": "Weather Alerts"},
  {"id": 6, "category": "Travel Interruptions"}
];