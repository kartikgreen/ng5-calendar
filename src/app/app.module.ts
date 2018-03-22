import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {EventsCalendarRepositoryService} from './components/events-calendar-filter/events-calendar-repository.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';

import { EventsCalendarViewComponent } from './components/events-calendar-view/events-calendar-view.component';
import { ValuesPipe } from './pipes/key-value-pipe';
import { EventsCalendarFilterComponent } from './components/events-calendar-filter/events-calendar-filter.component';

@NgModule({
  declarations: [
    EventsCalendarViewComponent, ValuesPipe, DialogComponent, EventsCalendarFilterComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    HttpClientModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [EventsCalendarRepositoryService],
  entryComponents: [DialogComponent],
  bootstrap: [EventsCalendarViewComponent]
})
export class AppModule { }
