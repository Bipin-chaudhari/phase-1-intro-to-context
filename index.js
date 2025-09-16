// Your code here
// Create a single employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

// Create multiple employee records
function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
}

// Create a TimeIn event
function createTimeInEvent(employee, dateTimeStamp) {
    const [date, hour] = dateTimeStamp.split(" ");
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });
    return employee;
}

// Create a TimeOut event
function createTimeOutEvent(employee, dateTimeStamp) {
    const [date, hour] = dateTimeStamp.split(" ");
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });
    return employee;
}

// Calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(e => e.date === date);
    const timeOut = employee.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

// Calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
    const hours = hoursWorkedOnDate(employee, date);
    return hours * employee.payPerHour;
}

// Calculate total wages for an employee
function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(e => e.date);
    return dates.reduce((total, d) => total + wagesEarnedOnDate(employee, d), 0);
}

// Calculate payroll for all employees
function calculatePayroll(employees) {
    return employees.reduce((total, emp) => total + allWagesFor(emp), 0);
}

// Export functions if needed for testing
module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll
};
