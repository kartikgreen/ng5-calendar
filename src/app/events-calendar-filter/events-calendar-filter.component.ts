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

  ngOnInit() {
    this.selection.onChange.subscribe((events) => {
      if (!this.toggleMaster) {
        this.eventsCalendarRepositoryService.getEventsData(this.selection.selected);
      }
    });
  }

  individualCheckBoxClicked(event) {
    event.stopPropagation();
    this.toggleMaster = false;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  getSelection() {
    console.log('selected item is', this.selection.selected);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.toggleMaster = true;
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
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