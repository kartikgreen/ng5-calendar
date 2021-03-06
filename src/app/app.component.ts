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
  previousClicked: boolean = false;
  DialogRef: MatDialogRef<DialogComponent>;
  numberOfDaysInMonth: any;
  weekDays: any = {};
  weekWiseWeekDays: any = {};
  monthIndex: number = new Date().getMonth();
  weekIndex: number = 0;
  dayIndex: number = 0;
  dayNameOfTheMonth;
  beginningOfTheWeek;
  calendarViewType;
  monthHighlight: boolean = false;
  dayOfTheMonth;
  dayWithEvents;
  testData: any;
  currentMonth: number = new Date().getMonth();
  currentDate: string = new Date().getDate().toString();
  eventsPerDayOfTheMonth;
  monthWiseDays: any = {};
  eventsData: any = {
    "data": [
        { "year": 2018, "month": 5, "date": 1, 
         "events": [
           {"events_name": 'test name1', "events_location": 'Brampton'},
           {"events_name": 'test name2', "events_location": 'Toronto'},
           {"events_name": 'test name3', "events_location": 'Scarborough'}
          ] 
        },
        { "year": 2018, "month": 5, "date": 2, 
         "events": [
           {"events_name": 'test name4', "events_location": 'Brampton'},
           {"events_name": 'test name5', "events_location": 'Toronto'},
           {"events_name": 'test name6', "events_location": 'Scarborough'}
          ] 
        },
        { "year": 2018, "month": 2, "date": 28, 
        "events": [
          {"events_name": 'test name7', "events_location": 'Brampton'},
          {"events_name": 'test name8', "events_location": 'Toronto'},
          {"events_name": 'test name9', "events_location": 'Scarborough'}
         ] 
        },
        { "year": 2018, "month": 3, "date": 14, 
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

  attachEventsToTheDate(days) {
    const currentEventsData= this.eventsData.data.filter(x => {
      const month = this.getMonthName(x.month - 1);
      return x.year === this.currentYear && month === this.getMonthName(this.monthIndex);
    });
    return days.map((x) => {
      const currentEventInfo = currentEventsData.find(y =>  y.date == x);
      if(currentEventInfo) { 
          return {[x]: currentEventInfo.events}
      } else {
        return {[x]: []}
      }
    })
  }
  attachEventsToOtherMonthsDate(date, year, month_index) {
    const currentEventsData= this.eventsData.data.filter(x => {
      const month = this.getMonthName(x.month - 1);
      return x.year === year && month === this.getMonthName(month_index);
    });
    const currentEventInfo = currentEventsData.find(y =>  y.date == date);
    if(currentEventInfo) { 
        return {[date + '-other month']: currentEventInfo.events}
    } else {
      return {[date + '-other month']: []}
    }
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
    this.monthIndex += 1;
    if (this.monthIndex > 11) {
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

  getNextMonthDetails() {
    if (this.monthIndex === 11) {
      const nextMonth = 0;
      const year = this.currentYear + 1;
      return [nextMonth, year];
    }
    const nextMonth = this.monthIndex + 1;
    const year = this.currentYear;
    return [nextMonth, year];
  }

  getPreviousMonthDetails() {
    if (this.monthIndex === 0) {
      const previousMonth = 11;
      const year = this.currentYear -1;
      return [previousMonth, year];
    }
    const previousMonth = this.monthIndex - 1;
    const year = this.currentYear;
    return [previousMonth, year];
  }
  
  previousDayClicked() {
    this.dayIndex --;
    if (this.dayIndex < 0) {
      this.dayIndex = this.daysInMonth(this.monthIndex + 1, this.currentYear)-1;
    }
    this.getDayOfTheMonth(this.dayIndex);
  }
  
  nextDayClicked() {
    this.dayIndex ++;
    if (this.dayIndex >= this.daysInMonth(this.monthIndex + 1, this.currentYear)) {
      this.dayIndex = 0;
    }
    this.getDayOfTheMonth(this.dayIndex);
  }

  previousWeekButtonClicked() {
    this.weekIndex --;
    if (this.getFirstDayOfTheMonth() === 'sunday') {
      if (this.weekIndex === 1) {
        this.previousButtonClicked();
      }
    }
    
    else if (this.weekIndex <= 0) {
      this.previousClicked = true;
      this.previousButtonClicked();
      this.weekIndex = this.calculateNumberOfRowsForCurrentMonth() - 1;
    }
    this.getWeekOfTheMonth(this.weekIndex);
    console.log('weekindex', this.weekIndex);
  }

  nextWeekButtonClicked() {
    this.previousClicked = false;
    let weekIndexSkipped = this.calculateNumberOfRowsForCurrentMonth();
    this.weekIndex ++;
    if (this.getLastDayOfTheMonth() !== 'saturday') {
      weekIndexSkipped = this.calculateNumberOfRowsForCurrentMonth()-1;
    }
    if (this.weekIndex >= weekIndexSkipped) {
      this.weekIndex = 0;
      this.nextButtonClicked();
    }
    this.getWeekOfTheMonth(this.weekIndex);
  }
  getLastDayOfTheMonth() {
    return this.calculateDayBasedOnDate(`${this.getMonthName(this.monthIndex)}/
      ${this.daysInMonth(this.monthIndex + 1, this.currentYear)}/${this.currentYear}`)
  }
  getFirstDayOfTheMonth() {
    console.log(`${this.getMonthName(this.monthIndex - 1)}/
    ${1}/${this.currentYear}`);
    return this.calculateDayBasedOnDate(`${this.getMonthName(this.monthIndex - 1)}/
      ${1}/${this.currentYear}`)
  }

  getWeekOfTheMonth(i) {
    console.log('received', i);
    this.weekWiseWeekDays.sunday = this.weekDays.sunday.filter(x => x === this.weekDays.sunday[i]);
    this.weekWiseWeekDays.monday = this.weekDays.monday.filter(x => x === this.weekDays.monday[i]);
    this.weekWiseWeekDays.tuesday = this.weekDays.tuesday.filter(x => x === this.weekDays.tuesday[i]);
    this.weekWiseWeekDays.wednesday = this.weekDays.wednesday.filter(x => x === this.weekDays.wednesday[i]);
    this.weekWiseWeekDays.thursday = this.weekDays.thursday.filter(x => x === this.weekDays.thursday[i]);
    this.weekWiseWeekDays.friday = this.weekDays.friday.filter(x => x === this.weekDays.friday[i]);
    this.weekWiseWeekDays.saturday = this.weekDays.saturday.filter(x => x === this.weekDays.saturday[i]);
  }

  getDayOfTheMonth(i) {
    this.dayNameOfTheMonth = this.calculateDayBasedOnDate(`${this.getMonthName(this.monthIndex)}/${i+1}/${this.currentYear}`);
    const dayWithEvents = this.attachEventsToTheDate(this.numberOfDaysInMonth.map(x => x + 1));
    this.dayOfTheMonth = Object.keys(dayWithEvents[i]).toString();
    Object.values(dayWithEvents[i]).map(x => this.eventsPerDayOfTheMonth = x);
    return;
  }

  getTotalNumberOfDays() {
    const totalNumberOfDays = this.daysInMonth(this.monthIndex + 1, this.currentYear);
    this.numberOfDaysInMonth = Array(totalNumberOfDays).fill(0).map((x,i)=>i);
    this.attachEventsToTheDate(this.numberOfDaysInMonth.map(x => x + 1)).map(m => {
      const dayNumber = parseInt(Object.keys(m).toString());
      if (this.calculateDayBasedOnDate(`${this.getMonthName(this.monthIndex)}/${dayNumber}/${this.currentYear}`) === 'sunday') {
        this.weekDays.sunday.push(m); 
      }
      if (this.calculateDayBasedOnDate(`${this.getMonthName(this.monthIndex)}/${dayNumber}/${this.currentYear}`) === 'monday') {
        this.weekDays.monday.push(m); 
      }
      if (this.calculateDayBasedOnDate(`${this.getMonthName(this.monthIndex)}/${dayNumber}/${this.currentYear}`) === 'tuesday') {
        this.weekDays.tuesday.push(m); 
      }
      if (this.calculateDayBasedOnDate(`${this.getMonthName(this.monthIndex)}/${dayNumber}/${this.currentYear}`) === 'wednesday') {
        this.weekDays.wednesday.push(m); 
      }
      if (this.calculateDayBasedOnDate(`${this.getMonthName(this.monthIndex)}/${dayNumber}/${this.currentYear}`) === 'thursday') {
        this.weekDays.thursday.push(m); 
      }
      if (this.calculateDayBasedOnDate(`${this.getMonthName(this.monthIndex)}/${dayNumber}/${this.currentYear}`) === 'friday') {
        this.weekDays.friday.push(m); 
      }
      if (this.calculateDayBasedOnDate(`${this.getMonthName(this.monthIndex)}/${dayNumber}/${this.currentYear}`) === 'saturday') {
        this.weekDays.saturday.push(m); 
      }
    });
    this.getBeginningAndEndOfTheWeek().then(x => {
      let totalNumberOfDaysInPreviousMonth = this.daysInMonth(this.getPreviousMonthDetails()[0] + 1, this.getPreviousMonthDetails()[1]);
      let i: any = x[0];
      for (i <= 0; i--;) {
        this.weekDays[this.calculateDayBasedOnDate(i)].unshift(this.attachEventsToOtherMonthsDate(totalNumberOfDaysInPreviousMonth, 
          this.getPreviousMonthDetails()[1], this.getPreviousMonthDetails()[0]));
        totalNumberOfDaysInPreviousMonth --;
      }
      let k = 1;
      for (let j: any = x[1] + 1; j <= 6;) {
        this.weekDays[this.calculateDayBasedOnDate(j)].push(this.attachEventsToOtherMonthsDate(k, this.getNextMonthDetails()[1], 
          this.getNextMonthDetails()[0]));
        j++;
        k++;
      }
      this.getNextMonthDetails();
      this.monthWiseDays = this.weekDays;
    }).then(x => {
      if (this.previousClicked) {
        this.weekIndex = this.calculateNumberOfRowsForCurrentMonth() - 1;
        console.log('when are you getting old', this.weekIndex);
        this.getWeekOfTheMonth(this.weekIndex);
        this.dayIndex = 0;
        this.getDayOfTheMonth(this.dayIndex);
      } else {
        this.weekIndex = 0;
        this.getWeekOfTheMonth(this.weekIndex);
        this.dayIndex = 0;
        this.getDayOfTheMonth(this.dayIndex);
      }
    });
  }
  
  getOtherMonthsDay(day) {
    if (day.split('-')[1] === 'other month') {
      return day.split('-')[0];
    } else {
      return day;
    }
  }

  highlightOtherMonth(day) {
    if (day.split('-')[1] === 'other month') {
      return true;
    } else {
      return false;
    }
  }

  getCurrentWeek() {
    this.weekIndex = Math.ceil((new Date().getDate() + this.getStartingDayOfTheWeek(this.dayNameOfTheMonth)) / 7)-1;
    this.getWeekOfTheMonth(this.weekIndex);
  }

  getCurrentDay() {
    this.dayIndex = new Date().getDate()-1;
    this.getDayOfTheMonth(this.dayIndex);
  }

  calculateNumberOfRowsForCurrentMonth() {
    return Math.ceil((this.daysInMonth(this.monthIndex + 1, this.currentYear) + 
      this.getStartingDayOfTheWeek(this.dayNameOfTheMonth)) / 7);
  }

  getBeginningAndEndOfTheWeek() {
    const weekDays = this.weekDays;
    let beginningOfTheWeek;
    let endOfTheWeek;
    const totalNumberOfDays = this.daysInMonth(this.monthIndex + 1, this.currentYear)
    Object.keys(weekDays).forEach(function (key, index) {
      const weekdays = weekDays[key];
      weekdays.map(o => {
        if (parseInt(Object.keys(o).toString()) === 1) {
           beginningOfTheWeek = index;
        }
        if (parseInt(Object.keys(o).toString()) === totalNumberOfDays) {
          endOfTheWeek = index;
       }
      });
    });
    return new Promise((resolve, reject) => {
      resolve([beginningOfTheWeek, endOfTheWeek]);
    });
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  onCalendarViewTypeChange(event) {
    if (event === 'week') {
      if (this.monthIndex === new Date().getMonth()) {
        this.getCurrentWeek();
        return
      }
      this.weekIndex = 0;
      this.getWeekOfTheMonth(this.weekIndex);
    }
    if (event === 'day') {
      if (this.monthIndex === new Date().getMonth()) {
        this.getCurrentWeek();
        this.getCurrentDay();
        return
      }
      this.dayIndex = 0;
      this.getDayOfTheMonth(this.dayIndex);
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
  
  getStartingDayOfTheWeek(day) {
    switch (day) {
      case "sunday":
          day = 0;
          break;
      case "monday":
          day = 1;
          break;
      case "tuesday":
          day = 2;
          break;
      case "wednesday":
          day = 3;
          break;
      case "thursday":
          day = 4;
          break;
      case "friday":
          day = 5;
          break;
      case "saturday":
          day = 6;
    }
    return day;
  }
}