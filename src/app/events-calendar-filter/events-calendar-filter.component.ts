import {Component} from '@angular/core';
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

  ngOnInit() {
    this.selection.onChange.subscribe((events) => {
      if (!this.toggleMaster) {
        const test = this.selection.selected.map(x => x.id);
        console.log('test----------->', test);
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
  getSelection() {
    console.log('selecteddddd item is', this.selection.selected);
  }

  masterToggle() {
    this.toggleMaster = true;
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
        const test = this.selection.selected.map(x => x.id);
        console.log('test----------->', test);
        this.eventsCalendarRepositoryService.getEventsData(this.selection.selected);
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