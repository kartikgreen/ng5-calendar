import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentYear: number = 2018;
  numbers: any;
  weekDays: any = {};
  index: number = 0;
  beginningOfTheWeek;

  ngOnInit() {
    this.resetWeekDays();
    this.getTotalNumberOfDays();
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
    this.numbers = Array(totalNumberOfDays).fill(0).map((x,i)=>i);
    this.numbers.map(m => {
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
    this.checkWhichWeekDaysHasOne();
    this.weekDays.thursday.splice(4, 0, '-');
  }

  checkWhichWeekDaysHasOne() {
    const weekDays = this.weekDays;
    Object.keys(weekDays).forEach(function (key, index) {
      const weekdays = weekDays[key];
      weekdays.map(o => { 
        if (o === 1) {
          const beginningOfTheWeek = index;
          // this.beginningOfTheWeek = beginningOfTheWeek;
          console.log('chkwhichweekdays', beginningOfTheWeek);
          // console.log(`${key} has ${o} at the index ${index}`);
        }
      });
    });
  }

  daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
  }

  calculateDayBasedOnDate(dateInput) {
    const date = new Date(dateInput);  
    let day: any = date.getDay(); 
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
