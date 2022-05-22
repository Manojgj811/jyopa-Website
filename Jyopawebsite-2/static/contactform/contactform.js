jQuery(document).ready(function($) {
  const main_url = url();
  "use strict";
  $('.general_query').click(function() {
    var f = $('form.contactForm').find('.form-group');
    var generalQueryName=document.getElementById("general_name").value, generalQueryEmail=document.getElementById("general_email").value, generalQueryContact=document.getElementById("general_contact").value ,generalQueryContent=document.getElementById("general_message").value;
    ferror = validate(f);
    if (!ferror) return false;
    else var str = $(this).serialize();
    var action = $(this).attr('action');
    if( ! action ) {
      action = 'v1/candidate/postGeneralQuery';
    }
    $.ajax({
      url: main_url+action,
      type: "POST",
      dataType: "json",
      headers:{
        "Content-Type": "application/json"
      },
      data: "{\n\t\"generalQueryName\" : \""+generalQueryName+"\",\n\t\"generalQueryEmail\" : \""+generalQueryEmail+"\",\n\t\"generalQueryContact\" : "+generalQueryContact+",\n\t\"generalQueryContent\" : \""+generalQueryContent+"\"\n}",
      success: function(msg) {
        $("#sendmessage").addClass("show");
        $("#errormessage").removeClass("show");
        $('.contactForm').find("input, textarea").val("");
      },
      error: function (msg) {
        $("#sendmessage").removeClass("show");
        $("#errormessage").addClass("show");
        $('#errormessage').html("Something went wrong, Please check your Entries Again!");
      }

    });
    
    return false;
  });


  $('.client_query').click(function() {
	//alert("client"); 
    var f = $('form.contactForm').find('.form-group');
    var clientCompanyName=document.getElementById("cmp_name").value, clientApplicantName=document.getElementById("emp_name").value,clientApplicantDesignation=document.getElementById("emp_designation").value ,clientApplicantEmail=document.getElementById("emp_email").value,clientApplicantContact=document.getElementById("emp_contact").value , clientServiceOpted=document.getElementById("emp_service").value, clientQuery=document.getElementById("client_msg").value;
    ferror = validate(f);
	 
    if (!ferror) return false;
    else var str = $(this).serialize();
   // var action = $(this).attr('action');
   // if( ! action ) {
     // action = 'v1/client/postQuery';
   // }
  //  console.log(main_url+action);
    $(".form").append($("<div id=\"loading\"><center><img src=\"./img/sending.gif\"></center></div>"));
        $.ajax({
          type: "POST",
          url: "/clientqueryinfotable/",
      
      //dataType: "json",
      //headers:{
       // "Content-Type": "application/json"
     // },
	  data: '{"clientCompanyName":"'+ clientCompanyName +'","clientApplicantName":"'+ clientApplicantName +'","clientApplicantDesignation":"'+ clientApplicantDesignation +'","clientApplicantEmail":"'+ clientApplicantEmail +'","clientApplicantContact":"'+ clientApplicantContact +'","clientServiceOpted":"'+ clientServiceOpted +'","clientQuery":"'+ clientQuery +'"}',

      //data: "{\n\t\"clientCompanyName\" : \""+clientCompanyName+"\",\n\t\"clientApplicantName\":\""+clientApplicantName+"\",\n\t\"clientApplicantDesignation\" : \""+clientApplicantDesignation+"\",\n\t\"clientApplicantEmail\" :\""+clientApplicantEmail+"\",\n\t\"clientApplicantContact\" : "+clientApplicantContact+",\n\t\"clientServiceOpted\" : \""+clientServiceOpted+"\",\n\t\"clientQuery\" : \""+clientQuery+"\"\n}",
      success: function(msg) {
        $("#loading").empty();
        $("#sendmessage").addClass("show");
        $("#errormessage").removeClass("show");
        $('.contactForm').find("input, textarea").val("");
      },
      error: function (msg) {
        $("#loading").empty();
        $("#sendmessage").removeClass("show");
        $("#errormessage").addClass("show");
        $('#errormessage').html("Something went wrong, Please check your Entries Again!");
      }
    });
    return false;
  });

  $('.logintoadmin').click(function() {

    var f = $('form.adminform').find('.form-group');
    var adminName=document.getElementById("adminName").value, adminPassword=document.getElementById("adminPassword").value;
    ferror = validate(f);
    if (!ferror) return false;
    else var str = $(this).serialize();
    var action = $(this).attr('action');
    if( ! action ) {
      action = 'v1/admin/login';
    }
    $.ajax({
      url: main_url+action,
      type: "POST",
      dataType: "json",
      headers:{
        "Content-Type": "application/json"
      },
      data: "{\n\t\"adminName\":\""+adminName+"\",\n\t\"adminPassword\":\""+adminPassword+"\"\n}",
      success: function(msg) {
        msg1 = JSON.stringify(msg);
        var data = JSON.parse(msg1);
        var authToken = data.authtoken;
        writeCookie('adm_sessionId', authToken, 1);
        window.location = "./admin.html";

      },
      error: function (msg) {
        $('.validation').html('Please enter Valid details').show('blind');
      }
    });
    return false;
  });
  
  $('.logintoemp').click(function() {
    var f = $('form.adminform').find('.form-group');
    var empId=document.getElementById("empId").value, empPassword=document.getElementById("empPassword").value;
    ferror = validate(f);
    if (!ferror) return false;
    else var str = $(this).serialize();
   // var action = $(this).attr('action');
   // if( ! action ) {
    //  action = 'v1/emp/login';
   // }
    $.ajax({
      type: "POST",
      url: '/emplogincheck/',
      data: '{"empId":"'+ empId +'","empPassword":"'+ empPassword +'"}',

     // data: "{\n\t\"empId\":\""+empId+"\",\n\t\"empPassword\":\""+empPassword+"\"\n}",
      success: function(msg) {
        msg1 = JSON.stringify(msg);
        var data = JSON.parse(msg);
        var authToken = data['authtoken'];
        console.log(authToken);
        writeCookie('emp_sessionId', authToken, 1);
        window.location = "/employee/";

      },
      error: function (msg) {
        $('.validation').html('Please enter Valid details').show('blind');
      }
    });
    return false;
  });
  
  $('.regist_emp').click(function() {

    var f = $('form.registerEmpForm').find('.form-group');
    var empId=document.getElementById("empid").value, empName=document.getElementById("empname").value,empEmail=document.getElementById("empemail").value ,empContact=document.getElementById("empphone").value,empPassword=document.getElementById("emppassword").value , empManager=document.getElementById("empmanname").value;
    ferror = validate(f);
    console.log(ferror);
    console.log("{\n\t\"empId\" : \""+empId+"\",\n\t\"empName\":\""+empName+"\",\n\t\"empEmail\" : \""+empEmail+"\",\n\t\"empContact\" :"+empContact+",\n\t\"empPassword\" : "+empPassword+",\n\t\"empManager\" : \""+empManager+"\"\n}");
    if (!ferror) return false;
    else var str = $(this).serialize();
    var action = $(this).attr('action');
    console.log("OUTSIDE ACTION");
    if( ! action ) {
      action = 'v1/admin/empRegister';
      console.log(main_url+action);
    }
    $.ajax({
      url: main_url+action,
      type: "POST",
      dataType: "json",
      headers:{
        "Content-Type": "application/json",
        "Authorization" : readCookie('adm_sessionId')
      },
      data: "{\n\t\"empId\" : \""+empId+"\",\n\t\"empName\":\""+empName+"\",\n\t\"empEmail\" : \""+empEmail+"\",\n\t\"empContact\" :"+empContact+",\n\t\"empPassword\" : \""+empPassword+"\",\n\t\"empManager\" : \""+empManager+"\"\n}",
      success: function(msg) {
        console.log("completed:Success");
        $("#sendmessage").addClass("show");
        $("#errormessage").removeClass("show");
        $('.registerEmpForm').find("input, textarea").val("");
        
      },
      error: function (msg) {
        $("#sendmessage").removeClass("show");
        $("#errormessage").addClass("show");
        $('#errormessage').html("Something went wrong, Please check your Entries Again!");
      }
    });
    return false;
  });
  
});






//End of file