    const main_url = url();
    "use strict";
    var skill;
    var data_to_send;
    

function recent_jobs(start_Date,end_Date){
    skill = (document.getElementById("jobkey").value).toUpperCase();
    data_to_send = '{"startDate": "'+start_Date+'", "endDate": "'+end_Date+'" }';
    console.log("Displaying Recent Jobs Between : " + start_Date , end_Date);
        action = 'v1/candidate/getJobs';
        $("#getJobs.row").empty();
        $("#getJobs.row").append($("<h2 id=results_heading></h2>"));
        document.getElementById("results_heading").innerHTML = "Recently Posted Jobs";
        if (skill != ""){ 
            data_to_send = '{"startDate":"'+start_Date+'", "endDate" : "'+end_Date+'" , "skills": "'+skill+'" }';
     $("#getJobs.row").append($("<br><div class=\"col-lg-8\" id=results_h4></div>"));
        document.getElementById("results_h4").innerHTML = "Redefined Search with : " + skill;

   }
    console.log(skill);
        $("#getJobs.row").append($("<div id=\"loading\"><img src=\"img/loader.gif\"></div>"));// 
        $.ajax({
            type: "POST",
            url: "/candidateGetJobs/",
            data: data_to_send,
            success: function(msg) {
                document.getElementById("loading").style.display="none";
                 msg1 = JSON.stringify(msg);
                var parseData = JSON.parse(msg);
                var data = parseData['jobpostings'];
                if(data == null){

                    var count = 0;
                }else{
                var count = Object.keys(data).length;
                }
               // var count = Object.keys(data).length;
                var status = "active";
                // console.log(count);

                if (count < 1) {
                    $("#getJobs.row").empty();
                     $("#getJobs.row").append($("<h2 id=results_heading></h2>"));
                     document.getElementById("results_heading").innerHTML = "No More Jobs To show";
                        if (skill != ""){ 
                            $("#getJobs.row").append($("<br><div class=\"col-lg-8\" id=results_h4></div>"));
                             document.getElementById("results_h4").innerHTML = "Redefined Search with : " + skill;
                                        }

                                }

                for (var i = count-1 ; i >= 0 ; i--) {
                    if (data[i].job_status == status) {
                        // console.log(data[i].job_status);
                        var decodedJobDesc = decodeURIComponent(escape(atob(data[i].job_description)));
                        var jobDesc= decodedJobDesc;

                        var job_qualifications = data[i].job_qualifications;
                        job_qualifications = job_qualifications.replace(/'/g, '"');
                        job_qualifications = JSON.parse(job_qualifications);
                        job_qualifications = job_qualifications.toString();
                        
                        var job_skills = data[i].job_skills;
                        job_skills = job_skills.replace(/'/g, '"');
                        job_skills = JSON.parse(job_skills);
                        job_skills = job_skills.toString();

                        $("#getJobs.row").append($(
                            "<div class=\"col-lg-12 \" ><div class=\"box wow fadeInLeft\"><div class=\"section-header\"><h5>Posted on: " + data[i].job_created_date + "</h5><h4><a href=\"#jobid\" data-toggle=\"tooltip\" title=\"" + jobDesc + "\">" + data[i].job_title + "</a></h4><p><i class=\"fa fa-graduation-cap \" aria-hidden=\"true\"></i> " + job_qualifications + "<span><i class=\"fa fa-rupee\" aria-hidden=\"true\"></i> " + data[i].job_salary + " LPA<br><i class=\"fa fa-briefcase\" aria-hidden=\"true\"></i> " + data[i].job_industry + "<span><i class=\"fa fa-clock-o\" aria-hidden=\"true\"></i> " + data[i].job_experience + " Years<span><i class=\"fa fa-map-marker\" aria-hidden=\"true\"></i> " + data[i].job_city + ", " + data[i].job_state + ", " + data[i].job_country + "</span><br>Job Function: "+ job_skills + " <br> <a href=\"#description\" id=\"view_jobDescription"+data[i].job_id+"\" name=\"jobDescription"+data[i].job_id+"\" class=\"view_data\" style=\"color:green;\" >View Description</a> <a href=\"#description\" name=\"jobDescription"+data[i].job_id+"\" id=\"unview_jobDescription"+data[i].job_id+"\" class=\"unview_data\" style=\"color: red\" >Close Description</a> <pre id=\"jobDescription"+data[i].job_id+"\" style = \"white-space:pre-wrap;\">" + jobDesc + "</pre><a href=\"/login/\"   class=\"btn-apply scrollto apply_job\">Apply Now</a></p></div></div></div>"
                        ));
                        $("#jobDescription"+data[i].job_id).hide();
                        $('.unview_data').hide();                                               
                           } else {
                        document.getElementById("results_heading").innerHTML = "No Active Jobs Currently";
                    }
                }
                 
                $('.view_data').click(function(){
                     $(this).hide();    
                     $("#unview_"+this.name).show();
                     $("#"+this.name).show();
                    });

                $('.unview_data').click(function(){
                     $(this).hide();
                     $("#"+this.name).hide();
                     $("#view_"+this.name).show();
                    });


            },
            error: function(msg) {
                var msg1 = JSON.stringify(msg);
                var data = JSON.parse(msg1);
                console.log("ERROR" + msg1);
        // $("#getJobs.row").append($("<div id=\"loading\">Error occured! Please retry</div>"));// 
            }

        });
    }

    recent_jobs(start_Date,end_Date);
    

function get_new_data(){
     // console.log(before_7_days);
     end_Date = convert_to_date_format(before_7_days);
     before_7_epoch = before_7_epoch - scheduler;
     before_7_days = new Date(before_7_epoch);
     start_Date = convert_to_date_format(before_7_days);
     // console.log("Displaying jobs for :" + start_Date , end_Date);
     console.log("Start Date : " + start_Date + "\nEnd Date : " + end_Date );
     recent_jobs(start_Date,end_Date);

}

// get_old_data();

function get_old_data(){

    before_7_epoch = before_7_epoch + scheduler;
    before_7_days = new Date(before_7_epoch);
    start_Date =  convert_to_date_format(before_7_days);
    after_7_epoch = before_7_epoch + scheduler;
    after_7_days = new Date(after_7_epoch);
    end_Date = convert_to_date_format(after_7_days);
    // console.log("Displaying jobs for :" + start_Date , end_Date);
    console.log("Start Date : " + start_Date + "\nEnd Date : " + end_Date );
    recent_jobs(start_Date,end_Date);


}

function latest_jobs(){
     document.getElementById("jobkey").value="",
     before_7_epoch = today_epoch-scheduler;
     before_7_days = static_before_7_days;
     var start_Date = convert_to_date_format(static_before_7_days);
     var end_Date = convert_to_date_format(static_today);
     console.log("Start Date : " + start_Date + "\nEnd Date : " + end_Date );
     recent_jobs(start_Date,end_Date);
}