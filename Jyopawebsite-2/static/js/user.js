var candResume;
var fileName;
var heavy_count;
var jobids = [];
var start_Date = convert_to_date_format(static_before_7_days);
var end_Date = convert_to_date_format(static_today);

jQuery(document).ready(function($) {
    $("#userProfDet").hide();
    $("#appliedJobs").hide();
    $("#showProf").click(function() {
        getdetails();
        $("#intro").hide();
        $("#main").hide();
        $("#appliedJobs").hide();
        $("#userProfDet").show();
    });

    $("#showIntro").click(function() {
        $("#userProfDet").hide();
        $("#intro").show();
        $("#appliedJobs").hide();

    }); 

    //const main_url = url();
    "use strict";
    var sId = readCookie('sessionId');
    console.log(sId);

    function getdetails() {
        //var action = 'v1/getCandidateDetails';
        $.ajax({
            type: "POST",
            url: "/getcandidatedetails/",
            data:'{"token":"'+sId+'"}',
            success: function(msg) {
                
                msg1 = JSON.stringify(msg);
                var data = JSON.parse(msg);
                heavy_count = Object.keys(data['candidateDetails']['candidate_jobs_applied']).length;
                console.log(heavy_count);
                console.log(data);
               
                var location = data['candidateDetails']['candidateLocations'];
                location = location.replace(/'/g, '"');
                location = JSON.parse(location);
                
                candName = data['candidateDetails']['candidateName'];
                console.log(candName);
                document.getElementById('username').innerHTML = candName;


                var resume = data['candidateDetails']['candidateResumes'];
                candResume = resume;

                candResume = candResume.replace(/'/g, '"');
                candResume = JSON.parse(candResume);
                candResume = candResume[0];
                console.log(candResume);
                fileName = candName + "_Jyopa";
                document.getElementById('candidate_name').value = candName;
                document.getElementById('candidateDOB').value = data['candidateDetails']['candidateDOB'];
                document.getElementById('candidate_emails').value = data['candidateDetails']['candidateEmails'];
                document.getElementById('candidate_contacts').value = data['candidateDetails']['candidateContactNumbers'];
                document.getElementById('city').value = location[0];
                document.getElementById('state').value = location[1];
                document.getElementById('country').value = location[2];
                for (i = 0; i < heavy_count; i++) {

                    jobids[i] = data['candidateDetails']['candidate_jobs_applied'][i];
                    console.log(jobids[i]);
                    
                }
                // console.log(candResume);
            },
            error: function(msg) {
                var msg1 = JSON.stringify(msg);
                var data = JSON.parse(msg1);
                console.log("ERROR" + msg1);
            }

        });
    }
    getdetails();
    
    $("#showJobs").click(function() {
        //alert("appliedjob");
        $("#userProfDet").hide();
        $("#main").hide();
        $("#intro").hide();
       // action = 'v1/candidate/getJobs';
        $("#applied_Jobs.row").empty();
        $("#applied_Jobs.row").append($("<h2 id=results_heading></h2>"));
        document.getElementById("results_heading").innerHTML = "";

        $.ajax({

            type: "POST",
            url: "/candidateGetJobs/",
           
            // data: {
            //      startDate: '1/4/2019',
            //     endDate: '18/10/2023'
            // },
            data: '{"startDate": "1/4/2019", "endDate": "18/10/2023"}',
            success: function(msg) {
                
                msg1 = JSON.stringify(msg);
                var parseData = JSON.parse(msg);
                var data = parseData['jobpostings'];
                var count = Object.keys(data).length;
                var status = "active";
                console.log(count);
                $("#appliedJobs").show();
                document.getElementById("results_heading").innerHTML = "Applied Jobs";
                if (count < 1) {
                    document.getElementById("results_heading").innerHTML = "Not Applied to any jobs";
                }
                for (var i = 0; i < count; i++) {
                    for (var j = 0; j < heavy_count; j++) {
                        if (data[i]['job_id'] == jobids[j]) {
                            console.log(data[i]['job_id']);
                            var decodedJobDesc = decodeURIComponent(escape(atob(data[i]['job_description'])));
                             var jobDesc= decodedJobDesc;
                             var job_qualifications = data[i]['job_qualifications'];
                        job_qualifications = job_qualifications.replace(/'/g, '"');
                        job_qualifications = JSON.parse(job_qualifications);
                        job_qualifications = job_qualifications.toString();
                        
                        var job_skills = data[i]['job_skills'];
                        job_skills = job_skills.replace(/'/g, '"');
                        job_skills = JSON.parse(job_skills);
                        job_skills = job_skills.toString();
                             //var jobs = data[i]['job_qualifications'];
                            $("#applied_Jobs.row").append($(
                                //"<div class=\"col-lg-12 \" ><div class=\"box wow fadeInLeft\"><div class=\"section-header\"><h5>Posted on: " + data[i]['job_created_date'] + "</h5><h4><a href=\"#jobid\" data-toggle=\"tooltip\" title=\"" + jobDesc + "\">" + data[i]['job_title'] + "</a></h4><p> " + data[i]['job_qualifications'] + ", " + data[i]['job_skills'] + "<br><i class=\"fa fa-briefcase\" aria-hidden=\"true\"></i> " + data[i]['job_industry'] + "<span><i class=\"fa fa-clock-o\" aria-hidden=\"true\"></i> " + data[i]['job_experience'] + " Years<span><i class=\"fa fa-map-marker\" aria-hidden=\"true\"></i> " + data[i]['job_city'] + ", " + data[i]['job_state'] + ", " + data[i]['job_country'] + "</span><br>Job Function: " + jobDesc + "</p></div></div></div>"
                                //"<div class=\"col-lg-12 \" ><div class=\"box wow fadeInLeft\"><div class=\"section-header\"><h5>Posted on: " + data[i]['job_created_date'] + "</h5><h4><a href=\"#jobid\" data-toggle=\"tooltip\" title=\"" + jobDesc + "\">" + data[i]['job_title'] + "</a></h4><p><i class=\"fa fa-graduation-cap \" aria-hidden=\"true\"></i> " + job_qualifications + "<span><i class=\"fa fa-rupee\" aria-hidden=\"true\"></i> " + data[i]['job_salary'] + " LPA<br><i class=\"fa fa-briefcase\" aria-hidden=\"true\"></i> " + data[i]['job_industry'] + "<span><i class=\"fa fa-clock-o\" aria-hidden=\"true\"></i> " + data[i]['job_experience'] + " Years<span><i class=\"fa fa-map-marker\" aria-hidden=\"true\"></i> " + data[i]['job_city'] + ", " + data[i]['job_state'] + ", " + data[i]['job_country'] + "</span><br>Job Function: "+ job_skills + " <br> <a href=\"#description\" id=\"view_jobDescription"+data[i]['job_id']+"\" name=\"jobDescription"+data[i]['job_id']+"\" class=\"view_data\" style=\"color:green;\" >View Description</a> <a href=\"#description\" name=\"jobDescription"+data[i]['job_id']+"\" id=\"unview_jobDescription"+data[i]['job_id']+"\" class=\"unview_data\" style=\"color: red\" >Close Description</a> <pre id=\"jobDescription"+data[i]['job_id']+"\" style = \"white-space:pre-wrap;\">" + jobDesc + "</pre></p></div></div></div>"
                                //));
								"<div class=\"col-lg-12 \" ><div class=\"box wow fadeInLeft\"><div class=\"section-header\"><h5>Posted on: " + data[i]['job_created_date'] + "</h5><h4><a href=\"#jobid\" data-toggle=\"tooltip\" title=\"" + jobDesc + "\">" + data[i]['job_title'] + "</a></h4><p><i class=\"fa fa-graduation-cap \" aria-hidden=\"true\"></i> " + job_qualifications + "<span><i class=\"fa fa-rupee\" aria-hidden=\"true\"></i> " + data[i]['job_salary'] + " LPA<br><i class=\"fa fa-briefcase\" aria-hidden=\"true\"></i> " + data[i]['job_industry'] + "<span><i class=\"fa fa-clock-o\" aria-hidden=\"true\"></i> " + data[i]['job_experience'] + " Years<span><i class=\"fa fa-map-marker\" aria-hidden=\"true\"></i> " + data[i]['job_city'] + ", " + data[i]['job_state'] + ", " + data[i]['job_country'] + "</span><br>Job Function: "+ job_skills + "<br>Job Function: " + jobDesc + " </p></div></div></div>"
                                ));


                                $("#jobDescription"+data[i]['job_id']).show();
                                 $('.unview_data').hide(); 
                        }
                       
                    }
                    $('.view_data').click(function(){
                        $(this).hide();    
                        $("#unview_"+this.name).show();
                        $("#"+this.name).show();
                       });
    
                   $('.unview_data').click(function(){
                        $(this).hide();
                        
                        $("#view_"+this.name).show();
                        $("#"+this.name).hide();
                       });

                }
               
            },
            error: function(msg) {
                var msg1 = JSON.stringify(msg);
                var data = JSON.parse(msg1);
                console.log("ERROR" + msg1);
                document.getElementById("errorMsg").innerHTML = "There seems to be issue at our end, We are Trying to fix it soon! Sorry for the inconvinience.";
            }

        });

        return false;
    });

    $('.search_job').click(function() {
        //alert("user");
        $("#main").show();
        $("#intro").show();
        action = 'v1/candidate/getJobs';
        skill = (document.getElementById("jobkey").value).toUpperCase();
        console.log(skill);
        var s = start_Date;
        var end = end_Date;
        $("#getJobs.row").empty();
        $("#getJobs.row").append($("<h2 id=results_heading></h2>"));
        document.getElementById("results_heading").innerHTML = "";
        if (document.getElementById("jobkey").value == "") {
            document.getElementById("results_heading").innerHTML = "Enter Some value for Skills";
            return;
        }
        $.ajax({
            type: "POST",
            url: "/candidateGetJobs/",
            data: '{"startDate": "1/4/2019", "endDate": "18/10/2023", "skills": "'+ skill +'"}',
            //data: '{ "startDate": "'+start_Date+'", "endDate": "'+end_Date+'", "skills": "'+ skill +'"}',
          //  url: main_url + action,
          //  type: "GET",
            // data: {
            //     startDate: start_Date,
            //     endDate: end_Date,
            //     skills: skill,
            // },
            success: function(msg) {
               
                msg1 = JSON.stringify(msg);
                var parseData = JSON.parse(msg);
                var data = parseData['jobpostings'];
                var status = "active";
                var count = Object.keys(data).length;
                console.log(count);

                document.getElementById("results_heading").innerHTML = "Your Search Results";
                if (count < 1) {
                    document.getElementById("results_heading").innerHTML = "No Jobs Matched Your Search Request";
                }
                for (var i = 0; i < count; i++) {
                     var decodedJobDesc = decodeURIComponent(escape(atob(data[i]['job_description'])));
                             var jobDesc= decodedJobDesc;

                             console.log(jobDesc);
                             

                        if (jobids.includes(data[i]['job_id'])) {

                            var job_qualifications = data[i]['job_qualifications'];
                        job_qualifications = job_qualifications.replace(/'/g, '"');
                        job_qualifications = JSON.parse(job_qualifications);
                        job_qualifications = job_qualifications.toString();
                        
                        var job_skills = data[i]['job_skills'];
                        job_skills = job_skills.replace(/'/g, '"');
                        job_skills = JSON.parse(job_skills);
                        job_skills = job_skills.toString();

                            console.log("job Already Applied");

                            $("#getJobs.row").append($(

                                     "<div class=\"col-lg-12 \" ><div class=\"box wow fadeInLeft\"><div class=\"section-header\"><h5>Posted on: " + data[i]['job_created_date'] + "</h5><h4><a href=\"#jobid\" data-toggle=\"tooltip\" title=\"" + jobDesc + "\">" + data[i]['job_title'] + "</a></h4><p><i class=\"fa fa-graduation-cap \" aria-hidden=\"true\"></i> " + job_qualifications + "<span><i class=\"fa fa-rupee\" aria-hidden=\"true\"></i> " + data[i]['job_salary'] + " LPA<br><i class=\"fa fa-briefcase\" aria-hidden=\"true\"></i> " + data[i]['job_industry'] + "<span><i class=\"fa fa-clock-o\" aria-hidden=\"true\"></i> " + data[i]['job_experience'] + " Years<span><i class=\"fa fa-map-marker\" aria-hidden=\"true\"></i> " + data[i]['job_city'] + ", " + data[i]['job_state'] + ", " + data[i]['job_country'] + "</span><br>Job Function: "+ job_skills+ " <br> <a href=\"#description\" id=\"view_jobDescription"+ data[i]['job_id']+"\" name=\"jobDescription"+data[i]['job_id']+"\" class=\"view_data\" style=\"color:green;\" >View Description</a> <a href=\"#description\" name=\"jobDescription"+data[i]['job_id']+"\" id=\"unview_jobDescription"+data[i]['job_id']+"\" class=\"unview_data\" style=\"color: red\" >Close Description</a> <pre id=\"jobDescription"+data[i]['job_id']+"\" style = \"white-space:pre-wrap;\">" + jobDesc + "<a href=\"/login/\" id=\"" + data[i]['job_id'] + "\" class=\"btn-apply scrollto\" style=\"background: #000;color: #fff;\">Already Applied!</a></p></div></div></div>"                        ));
                        }
                    else if (data[i]['job_status'] == status) {
                        var job_qualifications = data[i]['job_qualifications'];
                        job_qualifications = job_qualifications.replace(/'/g, '"');
                        job_qualifications = JSON.parse(job_qualifications);
                        job_qualifications = job_qualifications.toString();
                        
                        var job_skills = data[i]['job_skills'];
                        job_skills = job_skills.replace(/'/g, '"');
                        job_skills = JSON.parse(job_skills);
                        job_skills = job_skills.toString();
                        console.log(data[i]['job_status']);
                        $("#getJobs.row").append($(
                            "<div class=\"col-lg-12 \" ><div class=\"box wow fadeInLeft\"><div class=\"section-header\"><h5>Posted on: " + data[i]['job_created_date'] + "</h5><h4><a href=\"#jobid\" data-toggle=\"tooltip\" title=\"" + data[i]['job_description'] + "\">" + data[i]['job_title'] + "</a></h4><p> " + job_qualifications+ ", " + job_skills + "<br><i class=\"fa fa-briefcase\" aria-hidden=\"true\"></i> " + data[i]['job_industry'] + "<span><i class=\"fa fa-clock-o\" aria-hidden=\"true\"></i> " + data[i]['job_experience'] + " Years<span><i class=\"fa fa-map-marker\" aria-hidden=\"true\"></i> " + data[i]['job_city'] + ", " + data[i]['job_state'] + ", " + data[i]['job_country'] + "</span><br>Job Function: " + jobDesc + "<a href=\"#portfolio\" style=\"\" id=\"" + data[i]['job_id'] + "\" class=\"btn-apply scrollto apply_job\">Apply Now</a></p></div></div></div>"
                        ));



                        $('.apply_job').click(function() {
                            jobid1 = this.id;
                            console.log(jobid1);
                            console.log("Clicked Apply");
                           
                           // action = 'v1/candidate/apply';
                            $.ajax({
                                type: "POST",
                                url: "/applytojob/",
                                data: '{"jobId":"'+jobid1 +'","token":"'+sId+'"}',
                                success: function(msg) {
                                    msg1 = JSON.stringify(msg);
                                    //var data = JSON.parse(msg);
                                    console.log(msg1);
                                    $('#'+jobid1).off('click');
                                    $('#'+jobid1).html("Applied Successfully");
                                    $('#'+jobid1).css({'background-color': '#008000' , 'color': '#fff'});
                                },
                                error: function(msg) {
                                    var msg1 = JSON.stringify(msg);
                                    var data = JSON.parse(msg1);
                                    console.log("ERROR" + msg1);
                                }

                            });

                            return false;
                        });


                    }

                    else {
                        document.getElementById("results_heading").innerHTML = "No Active Jobs Currently";
                    }
                    $("#jobDescription"+data[i].job_id).hide();
                        $('.unview_data').hide(); 
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

                

}
            },
            error: function(msg) {
                var msg1 = JSON.stringify(msg);
                var data = JSON.parse(msg1);
                console.log("ERROR" + msg1);
                document.getElementById("errorMsg").innerHTML = "There seems to be issue at our end, We are Trying to fix it soon! Sorry for the inconvinience.";
            }

        });

        return false;
    });



});

function fileDownload() {
    download(candResume, fileName);
}
