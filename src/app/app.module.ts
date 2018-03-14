import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {EventsCalendarRepositoryService} from './events-calendar-filter/events-calendar-repository.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog.component';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ValuesPipe } from './key-value-pipe';
import { EventsCalendarFilterComponent } from './events-calendar-filter/events-calendar-filter.component';

@NgModule({
  declarations: [
    AppComponent, ValuesPipe, DialogComponent, EventsCalendarFilterComponent
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
  bootstrap: [AppComponent]
})
export class AppModule { }
