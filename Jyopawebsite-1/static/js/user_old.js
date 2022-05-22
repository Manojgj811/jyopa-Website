var candResume;
var fileName;
var heavy_count;
var jobids = [];  


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

    const main_url = url();
    "use strict";
    var sId = readCookie('sessionId');
    console.log(sId);

    function getdetails() {
        var action = 'v1/getCandidateDetails';

        $.ajax({
            url: main_url + action,
            type: "GET",
            dataType: "json",
            headers: {
                "Authorization": sId
            },
            success: function(msg) {
                heavy_count = Object.keys(msg.candidate_jobs_applied).length;
                console.log(heavy_count);
                msg1 = JSON.stringify(msg);
                var data = JSON.parse(msg1);
                candName = data.candidate_name;
                document.getElementById('username').innerHTML = candName;
                candResume = data.candidate_resumes[0].candidateResume;
                fileName = candName + "_Jyopa";
                document.getElementById('candidate_name').value = candName;
                document.getElementById('candidateDOB').value = data.candidateDOB;
                document.getElementById('candidate_emails').value = data.candidate_emails;
                document.getElementById('candidate_contacts').value = data.candidate_contacts;
                document.getElementById('city').value = data.candidate_locations[0].city;
                document.getElementById('state').value = data.candidate_locations[0].state;
                document.getElementById('country').value = data.candidate_locations[0].country;
                for (i = 0; i < heavy_count; i++) {
                    jobids[i] = data.candidate_jobs_applied[i];
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
        $("#userProfDet").hide();
        $("#main").hide();
        $("#intro").hide();
        action = 'v1/candidate/getJobs';
        $("#applied_Jobs.row").empty();
        $("#applied_Jobs.row").append($("<h2 id=results_heading></h2>"));
        document.getElementById("results_heading").innerHTML = "";

        $.ajax({
            url: main_url + action,
            type: "GET",
            data: {
                startDate: '1/4/2019',
                endDate: '18/10/2019'
            },
            success: function(msg) {
                var count = Object.keys(msg).length;
                msg1 = JSON.stringify(msg);
                var data = JSON.parse(msg1);
                var status = "active";
                console.log(count);
                $("#appliedJobs").show();
                document.getElementById("results_heading").innerHTML = "Applied Jobs";
                if (count < 1) {
                    document.getElementById("results_heading").innerHTML = "Not Applied to any jobs";
                }
                for (var i = 0; i < count; i++) {
                    for (var j = 0; j < heavy_count; j++) {
                        if (data[i].job_id == jobids[j]) {
                            console.log(data[i].job_id);
                            $("#applied_Jobs.row").append($(
                                "<div class=\"col-lg-12 \" ><div class=\"box wow fadeInLeft\"><div class=\"section-header\"><h5>Posted on: " + data[i].job_created_date + "</h5><h4><a href=\"#jobid\" data-toggle=\"tooltip\" title=\"" + data[i].job_description + "\">" + data[i].job_title + "</a></h4><p> " + data[i].job_qualifications + ", " + data[i].job_skills + "<br><i class=\"fa fa-briefcase\" aria-hidden=\"true\"></i> " + data[i].job_industry + "<span><i class=\"fa fa-clock-o\" aria-hidden=\"true\"></i> " + data[i].job_experience + " Years<span><i class=\"fa fa-map-marker\" aria-hidden=\"true\"></i> " + data[i].job_city + ", " + data[i].job_state + ", " + data[i].job_country + "</span><br>Job Function: " + data[i].job_description + "</p></div></div></div>"
                            ));
                        }

                    }


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
        // $("#main").show();
        // $("#intro").show();
        action = 'v1/candidate/getJobs';
        skill = (document.getElementById("jobkey").value).toUpperCase();
        console.log(skill);
        $("#getJobs.row").empty();
        $("#getJobs.row").append($("<h2 id=results_heading></h2>"));
        document.getElementById("results_heading").innerHTML = "";
        if (document.getElementById("jobkey").value == "") {
            document.getElementById("results_heading").innerHTML = "Enter Some value for Skills";
            return;
        }
            console.log("Displaying Recent Jobs Between : " + static_1_month_Date, start_Date);
        $.ajax({
            url: main_url + action,
            type: "GET",
            data: {
                startDate: static_1_month_Date,
                endDate: start_Date,
                skills: skill,
            },
            success: function(msg) {
                var count = Object.keys(msg).length;
                msg1 = JSON.stringify(msg);
                var data = JSON.parse(msg1);
                var status = "active";
                console.log(count);

                document.getElementById("results_heading").innerHTML = "Your Search Results";
                if (count < 1) {
                    document.getElementById("results_heading").innerHTML = "No Jobs Matched Your Search Request";
                }
                $("#getJobs.row").append($("<br><div class=\"col-lg-8\" id=results_h4></div>"));
                document.getElementById("results_h4").innerHTML = "Redefined Search with : " + skill;
                for (var i = 0; i < count; i++) {
                        if (jobids.includes(data[i].job_id)) {
                            console.log("job Already Applied");
                            $("#getJobs.row").append($(
                            "<div class=\"col-lg-12 \" ><div class=\"box wow fadeInLeft\"><div class=\"section-header\"><h5>Posted on: " + data[i].job_created_date + "</h5><h4><a href=\"#jobid\" data-toggle=\"tooltip\" title=\"" + data[i].job_description + "\">" + data[i].job_title + "</a></h4><p> " + data[i].job_qualifications + ", " + data[i].job_skills + "<br><i class=\"fa fa-briefcase\" aria-hidden=\"true\"></i> " + data[i].job_industry + "<span><i class=\"fa fa-clock-o\" aria-hidden=\"true\"></i> " + data[i].job_experience + " Years<span><i class=\"fa fa-map-marker\" aria-hidden=\"true\"></i> " + data[i].job_city + ", " + data[i].job_state + ", " + data[i].job_country + "</span><br>Job Function: " + data[i].job_description + "<a href=\"#portfolio\" id=\"" + data[i].job_id + "\" class=\"btn-apply scrollto\" style=\"background: #000;color: #fff;\">Already Applied!</a></p></div></div></div>"
                        ));
                        }
                    else if (data[i].job_status == status) {
                        console.log(data[i].job_status);
                        $("#getJobs.row").append($(
                            "<div class=\"col-lg-12 \" ><div class=\"box wow fadeInLeft\"><div class=\"section-header\"><h5>Posted on: " + data[i].job_created_date + "</h5><h4><a href=\"#jobid\" data-toggle=\"tooltip\" title=\"" + data[i].job_description + "\">" + data[i].job_title + "</a></h4><p> " + data[i].job_qualifications + ", " + data[i].job_skills + "<br><i class=\"fa fa-briefcase\" aria-hidden=\"true\"></i> " + data[i].job_industry + "<span><i class=\"fa fa-clock-o\" aria-hidden=\"true\"></i> " + data[i].job_experience + " Years<span><i class=\"fa fa-map-marker\" aria-hidden=\"true\"></i> " + data[i].job_city + ", " + data[i].job_state + ", " + data[i].job_country + "</span><br>Job Function: " + data[i].job_description + "<a href=\"#portfolio\" style=\"\" id=\"" + data[i].job_id + "\" class=\"btn-apply scrollto apply_job\">Apply Now</a></p></div></div></div>"
                        ));

                        $('.apply_job').click(function() {
                            jobid1 = this.id;
                            console.log(jobid1);
                            console.log("Clicked Apply");
                            action = 'v1/candidate/apply';
                            $.ajax({
                                url: main_url + action,
                                type: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": sId
                                },
                                data: "{\"jobId\":" + jobid1 + "}",
                                dataType: "json",
                                success: function(msg) {
                                    msg1 = JSON.stringify(msg);
                                    var data = JSON.parse(msg1);
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