/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function(employee) {
    return {
      firstName: employee[0],
      familyName: employee[1],
      title: employee[2],
      payPerHour: employee[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  let createEmployeeRecords = function(records) {
    return records.map(record => {
      return createEmployeeRecord(record);
    })
  }
  
  function createTimeInEvent(datetime) {
    let [date, hour] = datetime.split(' ')
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
    })
    return this
  }
  
  function createTimeOutEvent(datetime) {
    let [date, hour] = datetime.split(' ')
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date,
    })
    return this
  }
  
  function hoursWorkedOnDate(date) {
    let clockedIn = this.timeInEvents.find(element => element.date === date);
    let clockedOut = this.timeOutEvents.find(element => element.date === date);
    return (clockedOut.hour - clockedIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(date) {
    let totalAmountEarned = (hoursWorkedOnDate.call(this, date))* this.payPerHour;
    return totalAmountEarned;
  }
  
  
  let calculatePayroll = function(arrayOfEmployeeRecords){
      return arrayOfEmployeeRecords.reduce(function(memo, rec){
          return memo + allWagesFor.call(rec)
      }, 0)
  }
  
  
  let findEmployeeByFirstName = function(employees, firstName) {
    return employees.find(function(employee){
      return employee.firstName === firstName
    })
  }