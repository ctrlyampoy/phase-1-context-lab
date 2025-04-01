// Creates an employee record from an array
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Creates multiple employee records from an array of arrays
function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
}

// Creates a time in event for an employee
function createTimeInEvent(employee, dateTime) {
    if (!dateTime || typeof dateTime !== 'string') {
        throw new Error("Invalid date/time format");
    }
    
    const [date, hour] = dateTime.split(' ');
    
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });
    
    return employee;
}

// Creates a time out event for an employee
function createTimeOutEvent(employee, dateTime) {
    if (!dateTime || typeof dateTime !== 'string') {
        throw new Error("Invalid date/time format");
    }
    
    const [date, hour] = dateTime.split(' ');
    
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });
    
    return employee;
}

// Calculates hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    
    if (!timeIn || !timeOut) {
        throw new Error("Missing time in/out event for date");
    }
    
    return (timeOut.hour - timeIn.hour) / 100;
}

// Calculates wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
    const hours = hoursWorkedOnDate(employee, date);
    return hours * employee.payPerHour;
}

// Calculates all wages for an employee
function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(event => event.date);
    return dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
}

// Finds an employee by first name
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

// Calculates payroll for all employees
function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}