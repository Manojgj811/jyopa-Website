
var resumeCollection = [];


jQuery(document).ready(function($) {
	$(document).on('click', '.btn-add', function() {
    console.log("INSIDE DOC DOWLOAD");
        var controlForm = $('table');
        var currentEntry = ($(this).closest('tr'));
        var  filename = currentEntry.find('#resname').text()+"_Jyopa_Resume";
        var newValue = parseInt(currentEntry.find("#itemno").text());
	      download(resumeCollection[newValue-1], filename);

    });

    const main_url = url();
  	"use strict";
	   var sId = readCookie('adm_sessionId');
     console.log(sId);

	$('.viewcqdata').click(function() {
      action = 'v1/admin/getClientQueries?startDate=01/6/2019&endDate=02/10/2019';
    $.ajax({
      url: main_url+action,
      type: "GET",
      dataType: "json",
      headers:{
            "Authorization": sId
      },
      success: function(msg) {
      	 var count = Object.keys(msg).length;
         msg1 = JSON.stringify(msg);
        var data = JSON.parse(msg1);
         console.log(count);
          if ($("#cqCollectionTable tbody").length == 0) {
          $("#cqCollectionTable").append("<tbody></tbody>");
    }	
    	for (var i = 0; i < count; i++) {
    	
        $("#cqCollectionTable tbody").append(
      "<tr>" +
        "<td>"+data[i].client_company_name+"</td>"+
        "<td>"+data[i].client_applicant_name+"</td>"+
        "<td>"+data[i].client_applicant_designation+"</td>"+
        "<td>"+data[i].client_service_opted+"</td>"+
        "<td>"+data[i].client_applicant_contact+"</td>"+
        "<td><a href=\"mailto:"+data[i].client_applicant_email+"\">"+data[i].client_applicant_email+"</a></td>"+
        "<td>"+data[i].client_query+"</td>"+
      "</tr>"
      );
    }
      },
      error: function (msg) {
        document.getElementById("errorMsg").innerHTML='Please login again to Continue!';
    }

  });
    
    return false;
  });

	$('.closecqdata').click(function() {
			$("#cqCollectionTable").find('tbody').detach();
	});


	$('.viewgqdata').click(function() {
      action = '/v1/admin/getGeneralQueries?startDate=01/6/2019&endDate=10/10/2019';
 	  
    $.ajax({
      url: main_url+action,
      type: "GET",
      dataType: "json",
      headers:{
            "Authorization": sId
      },
      success: function(msg) {
      	 var count = Object.keys(msg).length;
         msg1 = JSON.stringify(msg);
        var data = JSON.parse(msg1);
         console.log(count);
          if ($("#gqCollectionTable tbody").length == 0) {
      $("#gqCollectionTable").append("<tbody></tbody>");
    }	
    	for (var i = 0; i < count; i++) {
    	
        $("#gqCollectionTable tbody").append(
      "<tr>" +
        "<td>"+data[i].general_query_name+"</td>"+
        "<td>"+data[i].general_query_contact+"</td>"+
        "<td><a href=\"mailto:"+data[i].general_query_email+"\">"+data[i].general_query_email+"</td>"+
        "<td>"+data[i].general_query_content+"</td>"+
      "</tr>"
      );
    }
      },
      error: function (msg) {
        var msg1 = JSON.stringify(msg);
        var data = JSON.parse(msg1);
      	console.log("ERROR"+ msg1);
        document.getElementById("errorgqMsg").innerHTML='Please login again to Continue!';

    
    }

  });
    
    return false;
  });

	$('.closegqdata').click(function() {
			$("#gqCollectionTable").find('tbody').detach();
	});

	$('.viewresumedata').click(function() {
      action = '/v1/emp/getGeneralResumes?startDate=02/06/2019&endDate=10/10/2019';
    $.ajax({
      url: main_url+action,
      type: "GET",
      dataType: "json",
      headers:{
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
      	"<td id=\"itemno\">"+(i+1)+"</td>"+
        "<td id=\"resname\" >"+data[i].general_resume_name+"</td>"+
        "<td>"+data[i].general_resume_contact+"</td>"+
        "<td>"+data[i].general_resume_email+"</td>"+
        "<td>  <button class=\"btn btn-danger btn-add\" type=\"button\">Resume Download</button></td>"+
      "</tr>"
      );

       resumeCollection[i] = data[i].general_resume_resume;
    }

      },
      error: function (msg) {
        var msg1 = JSON.stringify(msg);
        var data = JSON.parse(msg1);
      	console.log("ERROR"+ msg1);
        document.getElementById("errorresumeMsg").innerHTML='Please login again to Continue!';

    
    }

  });
    
    return false;
  });

	$('.closeresumedata').click(function() {
			$("#resumeCollectionTable").find('tbody').detach();
	});

});

