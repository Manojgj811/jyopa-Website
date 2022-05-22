    var scheduler = 691200000;
    var today_epoch = new Date().valueOf();
    today_epoch = today_epoch+76200000;
    var before_7_epoch = today_epoch-scheduler ;
    var after_7_epoch = today_epoch+scheduler;

    var today = new Date(today_epoch);
    var after_7_days = new Date(after_7_epoch);
    var before_7_days = new Date(before_7_epoch);

    var static_today = new Date(today_epoch);
    var static_before_7_days = new Date(before_7_epoch);
    var static_1_month_epoch= today_epoch-(scheduler*4);
    var static_1_month = new Date(static_1_month_epoch);


// console.log(today + "\n" + after_7_days + "\n" + before_7_days);

function convert_to_date_format(day){
var dd = day.getDate();
var mm = day.getMonth()+1; 
var yyyy = day.getFullYear();

if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 

return day = dd+'/'+mm+'/'+yyyy;
}

// console.log(convert_to_date_format(today));
// console.log(convert_to_date_format(after_7_days));
// console.log(convert_to_date_format(before_7_days));

var start_Date = convert_to_date_format(static_before_7_days);
var end_Date = convert_to_date_format(static_today);
var static_1_month_Date= convert_to_date_format(static_1_month);
console.log(static_1_month_Date);