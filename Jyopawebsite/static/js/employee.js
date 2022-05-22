var resumeCollection = [];

jQuery(document).ready(function($) {
    $(document).on('click', '.btn-add', function() {
        console.log("INSIDE DOC DOWLOAD");
        var controlForm = $('table');
        var currentEntry = ($(this).closest('tr'));
        var filename = currentEntry.find('#resname').text() + "_Jyopa_Resume";
        var newValue = parseInt(currentEntry.find("#itemno").text());
        console.log(newValue);
        console.log(resumeCollection[newValue]);
        download(resumeCollection[newValue], filename);
    });

    //const main_url = url();
    "use strict";
    var esId = readCookie('emp_sessionId');
    console.log(esId);

    function getJobs() {
       // action = 'v1/emp/getJobs';
        $("#listedJobs.row").empty();
        $("#listedJobs.row").append($("<h2 id=results_heading></h2>"));
        document.getElementById("results_heading").innerHTML = "";
        var d1 = '{"startDate":"1/4/2019","endDate":"18/10/2023"}';
        console.log(d1);
        $.ajax({
            type: "POST",
            url: "/empgetjobs/",
            data: '{"startDate":"1/4/2019","endDate":"18/10/2023","token":"'+ esId +'"}',
            // data: {
            //     startDate: '1/4/2019',
            //     endDate: '18/10/2023'
            // },
           
            success: function(msg) {
               
                msg1 = JSON.stringify(msg);
                var parseData = JSON.parse(msg);
                var data = parseData['jobpostings'];

                if(data == null){

                    var count = 0;
                }else{
                var count = Object.keys(data).length;
                }

                //var count = Object.keys(data).length;
                var status = "active";
                var logdata = data[0]['job_description'];
                console.log(data);
                document.getElementById("results_heading").innerHTML = "Jobs Posted";
                if (count < 1) {
                    document.getElementById("results_heading").innerHTML = "No Jobs added by you yet";
                }
                for (var i = 0; i < count; i++) {
                    {   
                        var decodedJobDesc = decodeURIComponent(escape(atob(data[i]['job_description'])));
                        console.log(decodedJobDesc);
                        var jobDesc= decodedJobDesc;

                        var job_qualifications = data[i]['job_qualifications'];
                        job_qualifications = job_qualifications.replace(/'/g, '"');
                        job_qualifications = JSON.parse(job_qualifications);
                        job_qualifications = job_qualifications.toString();
                        
                        var job_skills = data[i]['job_skills'];
                        job_skills = job_skills.replace(/'/g, '"');
                        job_skills = JSON.parse(job_skills);
                        job_skills = job_skills.toString();



                        $("#listedJobs.row").append($(
                            "<div class=\"col-lg-12 \" ><div class=\"box wow fadeInLeft\"><div class=\"section-header\"><h5>Posted on: " + data[i]['job_created_date'] + "</h5><h4><a href=\"#jobid\" data-toggle=\"tooltip\" title=\"" + jobDesc + "\">" + data[i]['job_title'] + "</a></h4><p><i class=\"fa fa-graduation-cap \" aria-hidden=\"true\"></i> " + job_qualifications + "<span><i class=\"fa fa-rupee\" aria-hidden=\"true\"></i> " + data[i]['job_salary'] + " LPA<br><i class=\"fa fa-briefcase\" aria-hidden=\"true\"></i> " + data[i]['job_industry'] + "<span><i class=\"fa fa-clock-o\" aria-hidden=\"true\"></i> " + data[i]['job_experience'] + " Years<span><i class=\"fa fa-map-marker\" aria-hidden=\"true\"></i> " + data[i]['job_city'] + ", " + data[i]['job_state'] + ", " + data[i]['job_country'] + "</span><br>Job Function: "+ job_skills + " <br> <a href=\"#description\" id=\"view_jobDescription"+data[i]['job_id']+"\" name=\"jobDescription"+data[i]['job_id']+"\" class=\"view_data\" style=\"color:green;\" >View Description</a> <a href=\"#description\" name=\"jobDescription"+data[i]['job_id']+"\" id=\"unview_jobDescription"+data[i]['job_id']+"\" class=\"unview_data\" style=\"color: red\" >Close Description</a> <pre id=\"jobDescription"+data[i]['job_id']+"\" style = \"white-space:pre-wrap;\">" + jobDesc +  "<a href=\"#resumeCollection\" id=\"" + data[i]['job_id'] + "\" class=\"btn-apply scrollto get_candidates\">Get Candidate List</a></p></div></div></div>"
                        ));
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


                        $('.get_candidates').click(function() {
                            $("#resumeCollectionTable").find('tbody').detach();
                            resumeCollection = [];
                            var j = 0;
                            jobid1 = this.id;
                            console.log(jobid1);
                           // action = 'v1/emp/getApplicants?JobId=' + jobid1;
                            $.ajax({
                                type: "POST",
                                url: "/getapplicants/",
                                data: '{"JobId":"'+jobid1+'","token":"'+esId+'"}',
                                success: function(msg) { 
                                    msg1 = JSON.stringify(msg);
                                    console.log(msg1);
                                    var parseData = JSON.parse(msg);
                                    msg = parseData['jobapplicants']
                                    var count = Object.keys(msg).length;
                                    for (var i = 0; i < count; i++) {
                                        console.log(msg[i]['candidate_id']);

                                        $.ajax({
                                            type: "POST",
                                            //url: main_url + "v1/emp/getCandidateDetails?candidateId=" + msg[i]['candidate_id'],
                                            url: "/empgetcandidatedetails/" ,
                                            data: '{"candidateId":"'+msg[i]['candidate_id']+'","token":"'+esId+'"}',
                                            success: function(msg) {
                                                msg1 = JSON.stringify(msg);
                                                var data = JSON.parse(msg);
                                                msg = data['candidateDetails'];
                                                console.log(msg);

                                                if ($("#resumeCollectionTable tbody").length == 0) {
                                                    $("#resumeCollectionTable").append("<tbody></tbody>");
                                                }
                                                j = j + 1;
                                                $("#resumeCollectionTable tbody").append(
                                                    "<tr>" +
                                                    "<td id=\"itemno\">" + j + "</td>" +
                                                    "<td id=\"resname\" >" + msg['candidate_name'] + "</td>" +
                                                    "<td>" + msg['candidate_contacts'] + "</td>" +
                                                    "<td>" + msg['candidate_emails'] + "</td>" +
                                                    "<td>" + jobid1 + "</td>" +
                                                    "<td>  <button class=\"btn btn-danger btn-add\" style=\"background: #0c2e8a;border: 0;border-radius: 3px;padding: 10px 30px;color: #fff;transition: 0.4s;cursor: pointer;margin-top: 5px;\" type=\"button\">Resume Download</button></td>" +
                                                    "</tr>"
                                                );

                                                var resume = msg['candidate_resumes'];
                                                var candResumes = resume;

                                                        candResumes = candResumes.replace(/'/g, '"');
                                                        candResumes = JSON.parse(candResumes);
                                                        candResumes = candResumes[0];

                                               // resumeCollection[j] = msg.candidate_resumes[0].candidateResume;
                                               resumeCollection[j] = candResumes;
                                                console.log(resumeCollection[j]);

                                            },
                                            error: function(msg) {
                                                var msg1 = JSON.stringify(msg);
                                                var data = JSON.parse(msg1);
                                                console.log("ERROR" + msg1);
                                                document.getElementById("errorresumeMsg").innerHTML = 'Please login again to Continue!';

                                            }

                                        })
                                    }

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
                }

            },
            error: function(msg) {
                var msg1 = JSON.stringify(msg);
                var data = JSON.parse(msg1);
                console.log("ERROR" + msg1);
                //alert("You will be logged out due to inactivity, Please login again to continue!");
                logout();
                window.location = "/emplogin/";
                document.getElementById("errorMsg").innerHTML = "There seems to be issue at our end, We are Trying to fix it soon! Sorry for the inconvinience.";
            }

        });

        return false;
    };

    getJobs();

    $('.viewresumedata').click(function() {
        action = '/v1/emp/getGeneralResumes?startDate=02/06/2019&endDate=10/10/2019';

        $.ajax({
            url: main_url + action,
            type: "GET",
            dataType: "json",
            headers: {
                "Authorization": sId
            },
            success: function(msg) {
                var count = Object.keys(msg).length;
                msg1 = JSON.stringify(msg);
                var data = JSON.parse(msg1);
                if ($("#resumeCollectionTable tbody").length == 0) {
                    $("#resumeCollectionTable").append("<tbody></tbody>");
                }
                for (var i = 0; i < count; i++) {

                    $("#resumeCollectionTable tbody").append(
                        "<tr>" +
                        "<td id=\"itemno\">" + (i + 1) + "</td>" +
                        "<td id=\"resname\" >" + data[i].general_resume_name + "</td>" +
                        "<td>" + data[i].general_resume_contact + "</td>" +
                        "<td>" + data[i].general_resume_email + "</td>" +
                        "<td>  <button class=\"btn btn-danger btn-add\" style=\"background: #0c2e8a;\" type=\"button\">Resume Download</button></td>" +
                        "</tr>"
                    );

                    resumeCollection[i] = data[i].general_resume_resume;
                }

            },
            error: function(msg) {
                var msg1 = JSON.stringify(msg);
                var data = JSON.parse(msg1);
                console.log("ERROR" + msg1);
                document.getElementById("errorresumeMsg").innerHTML = 'Please login again to Continue!';


            }

        });

        return false;
    });
    $('.list_job').click(function() {
        
        var f = $('form.newListing').find('.form-group');
        var jobTitle = (document.getElementById("jobTitle").value).toUpperCase(),
            jobDescription1 = document.getElementById("jobDescription").value,
            jobCity = (document.getElementById("jobCity").value).toUpperCase(),
            jobState = (document.getElementById("jobState").value).toUpperCase(),
            jobCountry = (document.getElementById("jobCountry").value).toUpperCase(),
            jobIndustry = (document.getElementById("jobIndustry").value).toUpperCase(),
            jobSalary = document.getElementById("jobSalary1").value +'-'+ document.getElementById("jobSalary2").value ,
            jobExperience = document.getElementById("jobExperience1").value +'-'+ document.getElementById("jobExperience2").value,
            jobType = (document.getElementById("jobType").value).toUpperCase(),
            jobQualifications = document.getElementById("jobQualifications").value;

       
        var encodedString = btoa(unescape(encodeURIComponent(jobDescription1)));
        console.log(encodedString);
        jobDescription = encodedString;
        
        
        var str = (document.getElementById("jobSkills").value).toUpperCase();
        str = str.replace(/\s*,\s*/g, ",");
        var res = str.replace(/[^a-zA-Z #+0-9 ]/g, "\",\"");
        var jobSkills = res;
        console.log("{\n\t\"jobTitle\":\"" + jobTitle + "\",\n\t\"jobDescription\":\"" + jobDescription + "\",\n\t\"jobCity\":\"" +jobCity+ "\",\n\t\"jobState\":\"" + jobState + "\",\n\t\"jobCountry\":\"" + jobCountry + "\",\n\t\"jobIndustry\":\"" + jobIndustry + "\",\n\t\"jobSalary\":" + jobSalary + ",\n\t\"jobExperience\":" + jobExperience + ",\n\t\"jobType\":\"" + jobType + "\",\n\t\"jobStatus\":\"active\",\n\t\"jobQualifications\":[\"" + jobQualifications + "\"],\n\t\"jobSkills\":[\"" + jobSkills + "\"]\n}\t");
        ferror = validate(f);
        console.log(ferror);
        if (!ferror) return false;
        else var str = $(this).serialize();
       // var action = $(this).attr('action');
        console.log("OUTSIDE ACTION");
        var d= '{"jobTitle":"'+ jobTitle +'","jobDescription":"'+ jobDescription +'","jobCity":"'+ jobCity +'","jobState":"'+ jobState +'","jobCountry":"'+ jobCountry +'","jobIndustry":"'+ jobIndustry +'","jobSalary":"'+ jobSalary +'","jobExperience":"'+ jobExperience +'","jobType":"'+ jobType +'","jobStatus":"active","jobQualifications": ["'+ jobQualifications +'"],"jobSkills": ["'+ jobSkills +'"]}';
        console.log(d);
       // if (!action) {
          //  action = 'v1/emp/postJob';
          //  console.log(main_url + action);
       // }
       var sid = readCookie('emp_sessionId');
        $.ajax({
            type: "POST",
            headers: {"Content-Type": "application/json"},
            url: "/emppostjob/",
           // data: "{\n\t\"jobTitle\":\"" + jobTitle + "\",\n\t\"jobDescription\":\"" + jobDescription + "\",\n\t\"jobCity\":\"" + jobCity + "\",\n\t\"jobState\":\"" + jobState + "\",\n\t\"jobCountry\":\"" + jobCountry + "\",\n\t\"jobIndustry\":\"" + jobIndustry + "\",\n\t\"jobSalary\":\"" + jobSalary + "\",\n\t\"jobExperience\":\"" + jobExperience + "\",\n\t\"jobType\":\"" + jobType + "\",\n\t\"jobStatus\":\"active\",\n\t\"jobQualifications\":[\"" + jobQualifications + "\"],\n\t\"jobSkills\":[\"" + jobSkills + "\"]\n}\t",
            data: '{"token":"'+ sid +'","jobTitle":"'+ jobTitle +'","jobDescription":"'+ jobDescription +'","jobCity":"'+ jobCity +'","jobState":"'+ jobState +'","jobCountry":"'+ jobCountry +'","jobIndustry":"'+ jobIndustry +'","jobSalary":"'+ jobSalary +'","jobExperience":"'+ jobExperience +'","jobType":"'+ jobType +'","jobStatus":"active","jobQualifications": ["'+ jobQualifications +'"],"jobSkills": ["'+ jobSkills +'"]}',

            success: function(msg) {
                console.log("completed:Success");
                $("#sendmessage").addClass("show");
                $("#errormessage").removeClass("show");
                $('.newListing').find("input, textarea").val("");

            },
            error: function(msg) {
                msg1 = JSON.stringify(msg);
                console.log(msg1);
                $("#sendmessage").removeClass("show");
                $("#errormessage").addClass("show");
                $('#errormessage').html("Something went wrong, Please check your Entries Again!");
            }
        });
        return false;
    });

    $('.closeresumedata').click(function() {
        $("#resumeCollectionTable").find('tbody').detach();
    });

});