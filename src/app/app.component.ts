import { Component } from '@angular/core';
import { DialogComponent } from './dialog.component';
import {VERSION, MatDialog, MatDialogRef} from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentYear: number = 2018;
  DialogRef: MatDialogRef<DialogComponent>;
  numberOfDaysInMonth: any;
  weekDays: any = {};
  index: number = 0;
  beginningOfTheWeek;
  answer;
  sundayWithEvents;
  demo = {
    'key1': 'ANGULAR 2',
    'key2': 'Pardeep',
    'key3': 'Jain',
  }
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
        { "year": 2018, "month": "January", "date": 7, 
         "events": [
           {"events_name": 'test name1', "events_location": 'Brampton'},
           {"events_name": 'test name2', "events_location": 'Toronto'},
           {"events_name": 'test name3', "events_location": 'Scarborough'}
          ] 
        },
        { "year": 2018, "month": "January", "date": 28, 
         "events": [
           {"events_name": 'test name1', "events_location": 'Brampton'},
           {"events_name": 'test name2', "events_location": 'Toronto'},
           {"events_name": 'test name3', "events_location": 'Scarborough'}
          ] 
        },
        { "year": 2018, "month": "February", "date": 18, 
         "events": ["event3", "event4", "event5"] 
        },
        { "year": 2018, "month": "June", "date": 9, 
         "events": ["event3", "event4", "event5"] 
        }
    ]
  }
  constructor(private dialog: MatDialog) {}
  ngOnInit() {
    this.resetWeekDays();
    this.getTotalNumberOfDays();
  }
  showEvents(events) {
    console.log('show more events clicked', events);
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  attachEventsToTheDate(week_days) {
    const currentYearAndMonth = this.eventsData.data.filter(x => {
      return x.year === this.currentYear && x.month === this.getMonthName(this.index);
    });
    return week_days.map((x, i) => {
      var actual = currentYearAndMonth.find(y =>  y.date == x);
      if(actual) { 
          return {[x]: actual.events}
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
    this.index += 1;
    if (this.index >= 11) {
      this.index = 0;
      this.currentYear ++;
    }
    this.getTotalNumberOfDays();
  }

  previousButtonClicked() {
    this.resetWeekDays();
    this.index -= 1;
    if (this.index < 0) {
      this.index = 11;
      this.currentYear --;
    }
    this.getTotalNumberOfDays();
  }

  getTotalNumberOfDays() {
    const totalNumberOfDays = this.daysInMonth(this.index + 1, this.currentYear);
    this.numberOfDaysInMonth = Array(totalNumberOfDays).fill(0).map((x,i)=>i);
    this.numberOfDaysInMonth.map(m => {
      if (this.calculateDayBasedOnDate(`${this.getMonthName(this.index)}/${m+1}/${this.currentYear}`) === 'sunday') {
        this.weekDays.sunday.push(m + 1); 
      }
      if (this.calculateDayBasedOnDate(`${this.getMonthName(this.index)}/${m+1}/${this.currentYear}`) === 'monday') {
        this.weekDays.monday.push(m + 1); 
      }
      if (this.calculateDayBasedOnDate(`${this.getMonthName(this.index)}/${m+1}/${this.currentYear}`) === 'tuesday') {
        this.weekDays.tuesday.push(m + 1); 
      }
      if (this.calculateDayBasedOnDate(`${this.getMonthName(this.index)}/${m+1}/${this.currentYear}`) === 'wednesday') {
        this.weekDays.wednesday.push(m + 1); 
      }
      if (this.calculateDayBasedOnDate(`${this.getMonthName(this.index)}/${m+1}/${this.currentYear}`) === 'thursday') {
        this.weekDays.thursday.push(m + 1); 
      }
      if (this.calculateDayBasedOnDate(`${this.getMonthName(this.index)}/${m+1}/${this.currentYear}`) === 'friday') {
        this.weekDays.friday.push(m + 1); 
      }
      if (this.calculateDayBasedOnDate(`${this.getMonthName(this.index)}/${m+1}/${this.currentYear}`) === 'saturday') {
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
