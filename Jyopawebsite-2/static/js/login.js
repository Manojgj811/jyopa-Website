jQuery(document).ready(function($){
    const main_url = url();
    "use strict";

    $('.cand_login').click(function() {
        console.log("login");
        //alert("login");
        var f = $('form.cand_login_form').find('.form-group');
        var candidateEmails = document.getElementById("candidate_Emails").value,
            candidatePassword = document.getElementById("candidatePassword").value;
        // ferror = validate(f);
        // if (!ferror) return false;
        // else var str = $(this).serialize();
       // var action = $(this).attr('action');
      //  if (!action) {
       //     action = 'v1/candidate/login';
       // }
        $.ajax({
            type: "POST",
            url: "/candidatelogin/",
            data: '{"candidateEmails":"'+ candidateEmails +'","candidatePassword":"'+ candidatePassword +'"}',
            success: function(msg) {
                msg1 = JSON.stringify(msg);
                var data = JSON.parse(msg);
                console.log(data);
                var authToken = data['authtoken'];
                writeCookie('sessionId', authToken, 1);
                window.location = "/candidate/";
            },
            error: function(msg) {
                msg1 = JSON.stringify(msg);
                var data = JSON.parse(msg1);
                console.log(data);
                $('.validation').html('Please enter Valid details').show('blind');
            }
        });
        return false;
    });

    $('.regist_cand').click(function() { 
       // alert("registered")
        var f = $('form.registerCandForm').find('.form-group');
        var candidateUsername = document.getElementById("candidate_Username").value,
            candidateName = document.getElementById("candidateName").value,
            candidatePassword = document.getElementById("candidate_Password").value,
            candidateDOB = document.getElementById("candidateDOB").value,
            candidateCurrentCTC = document.getElementById("candidateCurrentCTC").value,
            candidateExpectedCTC = document.getElementById("candidateExpectedCTC").value,
            candidateNoticePeriod = document.getElementById("candidateNoticePeriod").value,
            candidateLocation1 = document.getElementById("jobCity").value,
            candidateLocation2 = document.getElementById("jobState").value,
            candidateLocation3 = document.getElementById("jobCountry").value,
            candidateContactNumbers = document.getElementById("candidateContactNumbers").value,
            candidateEmails = document.getElementById("candidateEmails").value,
            candidateQual = document.getElementById("education").value,
            candidateCollege = document.getElementById("college").value,
            candidateScore = document.getElementById("candidateScore").value,
            candidateSkill1 = document.getElementById("candidateSkill1").value,
            candidateSkills2 = document.getElementById("candidateSkill2").value,
            candidateSkills3 = document.getElementById("candidateSkill3").value,
            candidateCompany = document.getElementById("compdet").value,
            candidatePosition = document.getElementById("pos").value,
            candidateTime = document.getElementById("months").value;
            //console.log("FILE IS" + base64);
            var candidateResumes = base64;
        //ferror = validate(f);
       // console.log("ferror");
       // console.log("{\n\"candidateUsername\": \"" + candidateUsername + "\",\"candidateName\": \"" + candidateName + "\",\"candidatePassword\": \"" + candidatePassword + "\",\"candidateDOB\": \"" + candidateDOB + "\",\"candidateNoticePeriod\": " + candidateNoticePeriod + ",\"candidateCurrentCTC\":" + candidateCurrentCTC + ",\"candidateExpectedCTC\": " + candidateExpectedCTC + ",\"candidateLocations\": [[\"" + candidateLocation1 + "\",\"" + candidateLocation2 + "\",\"" + candidateLocation3 + "\"]],\"candidateContactNumbers\": [" + candidateContactNumbers + "],\"candidateEmails\": [\"" + candidateEmails + "\"],\"candidateExperiences\": [[\"" + candidateCompany + "\",\"" + candidatePosition + "\"," + candidateTime + "]],\"candidateResumes\": [[\"" + candidateResumes + "\",\"pdf\"]],\"candidateQualifications\": [[\"" + candidateQual + "\",\"" + candidateCollege + "\"," + candidateScore + "]],\"candidateSkills\": [\"" + candidateSkill1 + "\",\"" + candidateSkills2 + "\",\"" + candidateSkills3 + "\"]}");
       // if (!ferror) return false;
       // else var str = $(this).serialize();
       // var action = $(this).attr('action');
        //console.log("OUTSIDE ACTION");
        // if (!action) {
        //     action = 'v1/candidate/register';
        //     console.log(main_url + action);
        // }
      //  regValue = "{\n\"candidateUsername\": \"" + candidateUsername + "\",\"candidateName\": \"" + candidateName + "\",\"candidatePassword\": \"" + candidatePassword + "\",\"candidateDOB\": \"" + candidateDOB + "\",\"candidateNoticePeriod\": " + candidateNoticePeriod + ",\"candidateCurrentCTC\":" + candidateCurrentCTC + ",\"candidateExpectedCTC\": " + candidateExpectedCTC + ",\"candidateLocations\": [[\"" + candidateLocation1 + "\",\"" + candidateLocation2 + "\",\"" + candidateLocation3 + "\"]],\"candidateContactNumbers\": [" + candidateContactNumbers + "],\"candidateEmails\": [\"" + candidateEmails + "\"],\"candidateExperiences\": [[\"" + candidateCompany + "\",\"" + candidatePosition + "\"," + candidateTime + "]],\"candidateResumes\": [[\"" + candidateResumes + "\",\"pdf\"]],\"candidateQualifications\": [[\"" + candidateQual + "\",\"" + candidateCollege + "\"," + candidateScore + "]],\"candidateSkills\": [\"" + candidateSkill1 + "\",\"" + candidateSkills2 + "\",\"" + candidateSkills3 + "\"]}",
        //alert(regValue);
       // console.log("{\n\"candidateUsername\": \"" + candidateUsername + "\",\"candidateName\": \"" + candidateName + "\",\"candidatePassword\": \"" + candidatePassword + "\",\"candidateDOB\": \"" + candidateDOB + "\",\"candidateNoticePeriod\": " + candidateNoticePeriod + ",\"candidateCurrentCTC\":" + candidateCurrentCTC + ",\"candidateExpectedCTC\": " + candidateExpectedCTC + ",\"candidateLocations\": [[\"" + candidateLocation1 + "\",\"" + candidateLocation2 + "\",\"" + candidateLocation3 + "\"]],\"candidateContactNumbers\": [" + candidateContactNumbers + "],\"candidateEmails\": [\"" + candidateEmails + "\"],\"candidateExperiences\": [[\"" + candidateCompany + "\",\"" + candidatePosition + "\"," + candidateTime + "]],\"candidateResumes\": [[\"" + candidateName + "\",\"pdf\"]],\"candidateQualifications\": [[\"" + candidateQual + "\",\"" + candidateCollege + "\"," + candidateScore + "]],\"candidateSkills\": [\"" + candidateSkill1 + "\",\"" + candidateSkills2 + "\",\"" + candidateSkills3 + "\"]}");
        $.ajax({
            type: "POST",
            url: "/candidateregister/",
            //data : '{"candidateUsername":"'+ candidateUsername +'","candidateName":"'+ candidateName +'","candidatePassword":"'+ candidatePassword +'"}',
            data: '{"candidateUsername":"'+ candidateUsername +'","candidateName":"'+ candidateName +'","candidatePassword":"'+ candidatePassword +'","candidateDOB":"'+ candidateDOB +'","candidateNoticePeriod":"'+ candidateNoticePeriod +'","candidateCurrentCTC":"'+ candidateCurrentCTC +'","candidateExpectedCTC":"'+ candidateExpectedCTC +'","candidateLocations": [["'+ candidateLocation1 +'","'+ candidateLocation2 +'","'+ candidateLocation3 +'"]],"candidateContactNumbers": ["'+ candidateContactNumbers +'"],"candidateEmails": ["'+ candidateEmails +'"],"candidateExperiences": [["'+ candidateCompany +'","'+ candidatePosition +'","'+ candidateTime +'"]],"candidateResumes": [["'+ candidateResumes +'","pdf"]],"candidateQualifications": [["'+ candidateQual +'","'+ candidateCollege +'","'+ candidateScore +'"]],"candidateSkills": ["'+ candidateSkill1 +'","'+ candidateSkills2 +'","'+ candidateSkills3 +'"]}',

            //"\",\"candidateDOB\": \"" + candidateDOB + "\",\"candidateNoticePeriod\": " + candidateNoticePeriod + ",\"candidateCurrentCTC\":" + candidateCurrentCTC + ",\"candidateExpectedCTC\": " + candidateExpectedCTC + ",\"candidateLocations\": [[\"" + candidateLocation1 + "\",\"" + candidateLocation2 + "\",\"" + candidateLocation3 + "\"]],\"candidateContactNumbers\": [" + candidateContactNumbers + "],\"candidateEmails\": [\"" + candidateEmails + "\"],\"candidateExperiences\": [[\"" + candidateCompany + "\",\"" + candidatePosition + "\"," + candidateTime + "]],\"candidateResumes\": [[\"" + candidateResumes + "\",\"pdf\"]],\"candidateQualifications\": [[\"" + candidateQual + "\",\"" + candidateCollege + "\"," + candidateScore + "]],\"candidateSkills\": [\"" + candidateSkill1 + "\",\"" + candidateSkills2 + "\",\"" + candidateSkills3 + "\"]}",
            success: function(msg){
                console.log("completed:Success");
                $("#sendmessage").addClass("show");
                $("#errormessage").removeClass("show");
                $('.registerEmpForm').find("input, textarea").val("");
                            //action = 'v1/candidate/login';  
                            $.ajax({
                            url: "/login/",
                            type: "POST",
                           // dataType: "json",
                            //headers: {
                                //"Content-Type": "application/json"
                           // },
                            data: '{"candidateUsername":"'+ candidateUsername +'","candidateName":"'+ candidateName +'","candidatePassword":"'+ candidatePassword +'","candidateDOB":"'+ candidateDOB +'","candidateNoticePeriod":"'+ candidateNoticePeriod +'","candidateCurrentCTC":"'+ candidateCurrentCTC +'","candidateExpectedCTC":"'+ candidateExpectedCTC +'","candidateLocations": [["'+ candidateLocation1 +'","'+ candidateLocation2 +'","'+ candidateLocation3 +'"]],"candidateContactNumbers": ["'+ candidateContactNumbers +'"],"candidateEmails": ["'+ candidateEmails +'"],"candidateExperiences": [["'+ candidateCompany +'","'+ candidatePosition +'","'+ candidateTime +'"]],"candidateResumes": [["'+ candidateResumes +'","pdf"]],"candidateQualifications": [["'+ candidateQual +'","'+ candidateCollege +'","'+ candidateScore +'"]],"candidateSkills": ["'+ candidateSkill1 +'","'+ candidateSkills2 +'","'+ candidateSkills3 +'"]}',

                            success: function(msg) {
                               // msg1 = JSON.stringify(msg);
                               // var data = JSON.parse(msg1);
                               // console.log(data);
                               // var authToken = data.authtoken;
                               // writeCookie('sessionId', authToken, 1);
                                window.location = "/login/";
                            },
                            error: function(msg) {
                                msg1 = JSON.stringify(msg);
                                var data = JSON.parse(msg1);
                                console.log(data);
                                // $('.validation').html('Please enter Valid details').show('blind');
                            }
                        });
            },
            error: function(msg) {
                $("#sendmessage").removeClass("show");
                $("#errormessage").addClass("show");
                $('#errormessage').html("Something went wrong, Please check your Entries Again!");
            }

        });
        console.log("IM HERE");
        return false;
    });
     

$('.search_job').click(function() {

        search_job();
      // alert("comentted");
        return false;

});

});

document.getElementById('seachjobform').addEventListener('submit', function(e) {
    // search(document.getElementById('jobkey'));
    e.preventDefault();
    search_job();
}, false);
    
function search_job() {
   // alert("login");
      //  action = 'v1/candidate/getJobs';
        str = (document.getElementById("jobkey").value).toUpperCase();
        var res = str.replace(/[^a-zA-Z #+0-9 ]/g, ",");
        skill = res;
        console.log(skill);
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
            data: '{ "startDate": "1/4/2019", "endDate": "18/10/2030", "skills": "'+ skill +'"}',
            success: function(msg) {
               
                msg1 = JSON.stringify(msg);
                var parseData = JSON.parse(msg);
                var data = parseData['jobpostings'];
                var count = Object.keys(data).length;
                var status = "active";
                console.log(count);
                document.getElementById("results_heading").innerHTML = "Your Search Results";
                if (count < 1) {
                    document.getElementById("results_heading").innerHTML = "No Jobs Matched Your Search Request";
                }
                 $("#getJobs.row").append($("<br><div class=\"col-lg-8\" id=results_h4></div>"));
                             document.getElementById("results_h4").innerHTML = "Redefined Search with : " + skill;
                for (var i = 0; i < count; i++) {
                    if (data[i]['job_status'] == status) {
                        console.log(data[i]['job_status']);
                        var decodedJobDesc = decodeURIComponent(escape(atob(data[i]['job_description'])));
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
                            "<div class=\"col-lg-12 \" ><div class=\"box wow fadeInLeft\"><div class=\"section-header\"><h5>Posted on: " + data[i]['job_created_date'] + "</h5><h4><a href=\"#jobid\" data-toggle=\"tooltip\" title=\"" + jobDesc + "\">" + data[i]['job_title'] + "</a></h4><p><i class=\"fa fa-graduation-cap \" aria-hidden=\"true\"></i> " + job_qualifications + "<span><i class=\"fa fa-rupee\" aria-hidden=\"true\"></i> " + data[i]['job_salary'] + " LPA<br><i class=\"fa fa-briefcase\" aria-hidden=\"true\"></i> " + data[i]['job_industry'] + "<span><i class=\"fa fa-clock-o\" aria-hidden=\"true\"></i> " + data[i]['job_experience'] + " Years<span><i class=\"fa fa-map-marker\" aria-hidden=\"true\"></i> " + data[i]['job_city'] + ", " + data[i]['job_state'] + ", " + data[i]['job_country'] + "</span><br>Job Function: "+ job_skills + " <br> <a href=\"#description\" id=\"view_jobDescription"+data[i]['job_id']+"\" name=\"jobDescription"+data[i]['job_id']+"\" class=\"view_data\" style=\"color:green;\" >View Description</a> <a href=\"#description\" name=\"jobDescription"+data[i]['job_id']+"\" id=\"unview_jobDescription"+data[i]['job_id']+"\" class=\"unview_data\" style=\"color: red\" >Close Description</a> <pre id=\"jobDescription"+data[i]['job_id']+"\" style = \"white-space:pre-wrap;\">" + jobDesc + "</pre><a href=\"/login/\"  data-target=\"#jopSigninModal\" class=\"btn-apply scrollto apply_job\">Apply Now</a></p></div></div></div>"
                        ));
                        $("#jobDescription"+data[i]['job_id']).hide();
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
                document.getElementById("errorMsg").innerHTML = "There seems to be issue at our end, We are Trying to fix it soon! Sorry for the inconvinience.";
            }

        });

        return false;
    }



//End of file