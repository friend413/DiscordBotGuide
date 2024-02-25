
let date1 = new Date();
console.log(date1);
let date2 = new Date('2024-03-22T15:00:00.000+0000');
// Convert dates to timestamps and get the max value
let maxDate = new Date(Math.max(date1.getTime(), date2.getTime()));

// Create a new Date object to avoid modifying the original date
let nextMonthDate = new Date(maxDate);

// Increment the month
nextMonthDate.setMonth(maxDate.getMonth() + 1);

// Check if the month was correctly set (considering the scenario of going from January 31 to February 28/29)
// If the month is not as expected (it has skipped to the next month), correct the date by setting it to the last day of the previous month
if (nextMonthDate.getMonth() !== (maxDate.getMonth() + 1) % 12) {
    nextMonthDate.setDate(0); // setDate(0) sets the date to the last day of the previous month
}

console.log(nextMonthDate);