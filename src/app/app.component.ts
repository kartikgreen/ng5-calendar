import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentYear: number = 2018;
  numbers: any;
  index: number = 0;
  ngOnInit(){
    this.getTotalNumberOfDays();
    console.log(this.calculateDayBasedOnDate('08/02/1992'));
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
    this.index += 1;
    if (this.index >= 11) {
      this.index = 0;
      this.currentYear ++;
    }
    this.getTotalNumberOfDays();
  }
  previousButtonClicked() {
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
    console.log('Total days', this.numbers);
  }
  daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
  }
  calculateDayBasedOnDate(dateInput) {
    const date = new Date(dateInput);  
    let day: any = date.getDay(); 
      switch (day) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
      }
    return day;
  }
}
