import { Component } from '@angular/core';
import { DialogComponent } from './dialog.component';
import {VERSION, MatDialog, MatDialogRef} from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentYear: number = (new Date()).getFullYear();
  DialogRef: MatDialogRef<DialogComponent>;
  numberOfDaysInMonth: any;
  weekDays: any = {};
  weekWiseWeekDays: any = {};
  monthIndex: number = 0;
  weekIndex: number = 0;
  beginningOfTheWeek;
  calendarViewType;
  eventsDatas = [
    {
      "...": []
    },
    {
      "7": [
        "event1",
        "event2",
        "event3"
      ]
    },
    {
      "14": []
    },
    {
      "21": []
    },
    {
      "28": []
    }
  ]
  
  eventsData: any = {
    "data": [
        { "year": 2018, "month": 1, "date": 7, 
         "events": [
           {"events_name": 'test name1', "events_location": 'Brampton'},
           {"events_name": 'test name2', "events_location": 'Toronto'},
           {"events_name": 'test name3', "events_location": 'Scarborough'}
          ] 
        },
        { "year": 2018, "month": 1, "date": 28, 
         "events": [
           {"events_name": 'test name4', "events_location": 'Brampton'},
           {"events_name": 'test name5', "events_location": 'Toronto'},
           {"events_name": 'test name6', "events_location": 'Scarborough'}
          ] 
        },
        { "year": 2018, "month": 2, "date": 18, 
        "events": [
          {"events_name": 'test name7', "events_location": 'Brampton'},
          {"events_name": 'test name8', "events_location": 'Toronto'},
          {"events_name": 'test name9', "events_location": 'Scarborough'}
         ] 
        },
        { "year": 2018, "month": 6, "date": 9, 
        "events": [
          {"events_name": 'test name10', "events_location": 'Brampton'},
          {"events_name": 'test name11', "events_location": 'Toronto'},
          {"events_name": 'test name12', "events_location": 'Scarborough'}
         ] 
        }
    ]
  }
  constructor(private dialog: MatDialog) {}
  
  ngOnInit() {
    this.resetWeekDays();
    this.getTotalNumberOfDays();
  }
  
  showEvents(events) {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: events
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  attachEventsToTheDate(week_days) {
    const currentEventsData= this.eventsData.data.filter(x => {
      const month = this.getMonthName(x.month - 1);
      return x.year === this.currentYear && month === this.getMonthName(this.monthIndex);
    });
    return week_days.map((x) => {
      const eventInfo = currentEventsData.find(y =>  y.date == x);
      if(eventInfo) { 
          return {[x]: eventInfo.events}
      } else {
          return {[x]: []}
      }
    })
  }

  resetWeekDays() {
    this.weekDays.sunday = [];
    this.weekDays.monday = [];
    this.weekDays.tuesday = [];
    this.weekDays.wednesday = [];
    this.weekDays.thursday = [];
    this.weekDays.friday = [];
    this.weekDays.saturday = [];
  }

  resetWeekWiseWeekDays() {
    this.weekWiseWeekDays.sunday = [];
    this.weekWiseWeekDays.monday = [];
    this.weekWiseWeekDays.tuesday = [];
    this.weekWiseWeekDays.wednesday = [];
    this.weekWiseWeekDays.thursday = [];
    this.weekWiseWeekDays.friday = [];
    this.weekWiseWeekDays.saturday = [];
  }

  getMonthName(index) {
    const month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    return month[index];
  } 

  nextButtonClicked() {
    this.resetWeekDays();
    this.monthIndex += 1;
    if (this.monthIndex >= 11) {
      this.monthIndex = 0;
      this.currentYear ++;
    }
    this.getTotalNumberOfDays();
  }

  previousButtonClicked() {
    this.resetWeekDays();
    this.monthIndex -= 1;
    if (this.monthIndex < 0) {
      this.monthIndex = 11;
      this.currentYear --;
    }
    this.getTotalNumberOfDays();
  }

  previousWeekButtonClicked() {
    this.weekIndex --;
    if (this.weekIndex < 0) {
      this.weekIndex = 4;
    }
    this.getWeekOfTheMonth(this.weekIndex);
  }

  nextWeekButtonClicked() {
    this.weekIndex ++;
    if (this.weekIndex >= 5) {
      this.weekIndex = 0;
    }
    this.getWeekOfTheMonth(this.weekIndex);
  }

  getWeekOfTheMonth(i) {
    console.log('i-', i);
    this.weekWiseWeekDays.sunday = this.weekDays.sunday.filter(x => x === this.weekDays.sunday[i]);
    this.weekWiseWeekDays.monday = this.weekDays.monday.filter(x => x === this.weekDays.monday[i]);
    this.weekWiseWeekDays.tuesday = this.weekDays.tuesday.filter(x => x === this.weekDays.tuesday[i]);
    this.weekWiseWeekDays.wednesday = this.weekDays.wednesday.filter(x => x === this.weekDays.wednesday[i]);
    this.weekWiseWeekDays.thursday = this.weekDays.thursday.filter(x => x === this.weekDays.thursday[i]);
    this.weekWiseWeekDays.friday = this.weekDays.friday.filter(x => x === this.weekDays.friday[i]);
    this.weekWiseWeekDays.saturday = this.weekDays.saturday.filter(x => x === this.weekDays.saturday[i]);
  }

  getDayOfTheMonth(d) {
    console.log(`${this.getMonthName(this.monthIndex)}/${d+1}/${this.currentYear}`);
    console.log(this.calculateDayBasedOnDate(`${this.getMonthName(this.monthIndex)}/${d+1}/${this.currentYear}`));
  }

  getTotalNumberOfDays() {
    const totalNumberOfDays = this.daysInMonth(this.monthIndex + 1, this.currentYear);
    this.numberOfDaysInMonth = Array(totalNumberOfDays).fill(0).map((x,i)=>i);
    this.numberOfDaysInMonth.map(m => {
      if (this.calculateDayBasedOnDate(`${this.getMonthName(this.monthIndex)}/${m+1}/${this.currentYear}`) === 'sunday') {
        this.weekDays.sunday.push(m + 1); 
      }
      if (this.calculateDayBasedOnDate(`${this.getMonthName(this.monthIndex)}/${m+1}/${this.currentYear}`) === 'monday') {
        this.weekDays.monday.push(m + 1); 
      }
      if (this.calculateDayBasedOnDate(`${this.getMonthName(this.monthIndex)}/${m+1}/${this.currentYear}`) === 'tuesday') {
        this.weekDays.tuesday.push(m + 1); 
      }
      if (this.calculateDayBasedOnDate(`${this.getMonthName(this.monthIndex)}/${m+1}/${this.currentYear}`) === 'wednesday') {
        this.weekDays.wednesday.push(m + 1); 
      }
      if (this.calculateDayBasedOnDate(`${this.getMonthName(this.monthIndex)}/${m+1}/${this.currentYear}`) === 'thursday') {
        this.weekDays.thursday.push(m + 1); 
      }
      if (this.calculateDayBasedOnDate(`${this.getMonthName(this.monthIndex)}/${m+1}/${this.currentYear}`) === 'friday') {
        this.weekDays.friday.push(m + 1); 
      }
      if (this.calculateDayBasedOnDate(`${this.getMonthName(this.monthIndex)}/${m+1}/${this.currentYear}`) === 'saturday') {
        this.weekDays.saturday.push(m + 1); 
      }
    });
    this.checkWhichWeekDaysHasOne().then(x => {
      let i: any = x;
      for (i <= 0; i--;) {
        this.weekDays[this.calculateDayBasedOnDate(i)].unshift('...');
      }
    }).then(x => {
      // Now we need to change the structure of json to attach events to the data
      this.weekDays.sunday = this.attachEventsToTheDate(this.weekDays.sunday);
      this.weekDays.monday = this.attachEventsToTheDate(this.weekDays.monday);
      this.weekDays.tuesday = this.attachEventsToTheDate(this.weekDays.tuesday);
      this.weekDays.wednesday = this.attachEventsToTheDate(this.weekDays.wednesday);
      this.weekDays.thursday = this.attachEventsToTheDate(this.weekDays.thursday);
      this.weekDays.friday = this.attachEventsToTheDate(this.weekDays.friday);
      this.weekDays.saturday = this.attachEventsToTheDate(this.weekDays.saturday);
      this.getWeekOfTheMonth(0);
      console.log('sunday', this.weekDays.sunday);
    });
  }

  checkWhichWeekDaysHasOne() {
    const weekDays = this.weekDays;
    let beginningOfTheWeek;
    Object.keys(weekDays).forEach(function (key, index) {
      const weekdays = weekDays[key];
      weekdays.map(o => { 
        if (o === 1) {
           beginningOfTheWeek = index;
        }
      });
    });
    return new Promise((resolve, reject) => {
      resolve(beginningOfTheWeek);
    });
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  onCalendarViewTypeChange(event) {
    console.log(event);
    if (event === 'week') {
      this.getWeekOfTheMonth(0);
    }
    if (event === 'day') {
      this.getDayOfTheMonth(1);
    }
  }

  calculateDayBasedOnDate(dateInput) {
    let day;
    if (dateInput >= 0) {
      day = dateInput;
    } else {
      const date = new Date(dateInput);  
       day = date.getDay();
    }
    switch (day) {
      case 0:
          day = "sunday";
          break;
      case 1:
          day = "monday";
          break;
      case 2:
          day = "tuesday";
          break;
      case 3:
          day = "wednesday";
          break;
      case 4:
          day = "thursday";
          break;
      case 5:
          day = "friday";
          break;
      case 6:
          day = "saturday";
    }
    return day;
  }
  
}