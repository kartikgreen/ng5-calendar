import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentYear: number = 2018;
  numberOfDaysInMonth: any;
  weekDays: any = {};
  index: number = 0;
  beginningOfTheWeek;
  answer;
  eventsData: any = {
    "data": [
        { "year": "2017", "month": "January", "date": 7, 
         "events": ["event1", "event2", "event3"] 
        },
        { "year": "2017", "month": "January", "date": 7, 
         "events": ["event9", "event10", "event11"] 
        },
        { "year": "2018", "month": "February", "date": 18, 
         "events": ["event3", "event4", "event5"] 
        },
        { "year": "2018", "month": "June", "date": 9, 
         "events": ["event3", "event4", "event5"] 
        }
    ]
  }
   groupEvents(events) {
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday',
      'thursday', 'friday', 'saturday'
    ];
    return events.data.reduce((result, item) => {
      console.log('hello',result); 
      const key = item.month.toLowerCase() + " " + item.year;
      
      // if (!result[key]) {
      //   result[key] = Object.assign(...dayNames.map(day => ({
      //     [day]: {}
      //   })));
        
      //   const dt = new Date("1 " + key);
      //   const month = dt.getMonth();
        
      //   while (dt.getMonth() === month) {
      //     result[key][dayNames[dt.getDay()]][dt.getDate()] = [];
      //     dt.setDate(dt.getDate() + 1);
      //   }
        
      // }
      const dt = new Date(item.date + " " + key);
      result[key][dayNames[dt.getDay()]][dt.getDate()].push(...item.events);
      return result;
    }, {});
  }

  ngOnInit() {
    this.resetWeekDays();
    this.getTotalNumberOfDays();
  }

  // attachEventsToTheDate() {
  //   console.log('sunday', JSON.stringify(this.weekDays.sunday));
  //   // var i = 0;
  //   this.eventsData.data.reduce((result, item, index, array) => {
  //     // result[item.month] = [];
  //     if (item.month === this.getMonthName(this.index)) {
  //       var answer = this.weekDays.sunday.reduce((answer, iteml) => {
  //         // alert(iteml);
  //       // alert(iteml);
  //       answer['sunday'] = [];
  //       answer['sunday'].push({
  //         [iteml]: ['test']
  //       });
  //       if (item.date === iteml) {
  //         alert(item.date);
  //         answer['sunday'].push({
  //           [iteml]: [item.events]
  //         });
  //       }
  //       return result;  
  //       },{});
  //       console.log('a is ',answer);
  //       // alert(item.date + ' ' + item.events);
  //     }
  //     // i++;
  //     // console.log('result', result, 'item', item[1].month, 'array', array);
  //   return result;
  //   }, {}); //an empty array
  // }

  // sunday.map(x => ({[x]: data.find(y => y.date == x).events}))

  attachEventsToTheDate() {
    console.log('eeloooo', this.weekDays.sunday.map(x => {
      var actual = this.eventsData.data.find(y => y.date == x);
      if(actual) {
          return {[x]: actual.events}
      } else {
          return {[x]: []}
      }
  }))
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
      this.attachEventsToTheDate();
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

  // this.daysInMonth(7,2009); // output is 31
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
