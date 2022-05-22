function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));

}
var base64 = "";
async function progress_bar(){
    // console.log("You are in progress_bar");
    var i=0;
    document.getElementById("progress").style.visibility="";
    document.getElementById("progress-bar").style.width="0%";
    do{ 
        console.log("File is still uploading" + i);
        for (var x = 0; x<=100; x++){
            await sleep(x);
            document.getElementById("progress-bar").style.width=x+"%";
            document.getElementById("progress-bar").innerHTML= x+"%";
        }  
        i=i+1+base64.length; 
        // console.log("got the file" +i);  
        document.getElementById("progress-bar").innerHTML= "File Verified, Please click Upload to Continue";           
        document.getElementById("form_buttons").style.visibility="";
    } 
    while(i<base64.length);
    console.log(base64.length);
    // console.log(base64);
}

async function progress_bar1(){
    // console.log("You are in progress_bar");
    var i=0;
    document.getElementById("progress1").style.visibility="";
    document.getElementById("progress-bar1").style.width="0%";
    do{ 
        console.log("File is still uploading" + i);
        for (var x = 0; x<=100; x++){
            await sleep(x);
            document.getElementById("progress-bar1").style.width=x+"%";
            document.getElementById("progress-bar1").innerHTML= x+"%";
        }  
        i=i+1+base64.length; 
        console.log("got the file" +i);  
        document.getElementById("progress-bar1").innerHTML= "File Verified, Please click Register to Continue";           
        document.getElementById("form_buttons1").style.visibility="";
    } 
    while(i<base64.length);
    console.log(base64.length);
    // console.log(base64);
}
//async
 function convertToBase64(get_file) {
    //Read File
    var selectedFile = get_file;

    //Check File is not Empty
    if (selectedFile.length > 0) {
        // Select the very first file from list
        var fileToLoad = selectedFile[0];
        // FileReader function for read the file.
        var fileReader = new FileReader();
        // Onload of file read the file content
        fileReader.onload = function(fileLoadedEvent) {
            base64 = fileLoadedEvent.target.result;
            // Print data in console
            console.log("CONVERSION SUCCESSFULL");

        };
        // Convert data to base64
        fileReader.readAsDataURL(fileToLoad);

    }
    // await sleep(1500);
    // console.log(base64);

}

function get_unsigned_doc(unsigned_resume){
        convertToBase64(unsigned_resume);
        progress_bar();
}

function get_signed_doc(unsigned_resume){
        convertToBase64(unsigned_resume);
        progress_bar1();
}

function get_file(unsigned_resume){
    
    console.log(unsigned_resume);
    convertToBase65(unsigned_resume);

}

function convertToBase65(get_file) {
    //Read File
    var selectedFile = get_file;

    //Check File is not Empty
    if (selectedFile.length > 0) {
        // Select the very first file from list
        var fileToLoad = selectedFile[0];
        // FileReader function for read the file.
        var fileReader = new FileReader();
        // Onload of file read the file content
        fileReader.onload = function(fileLoadedEvent) {
            base64 = fileLoadedEvent.target.result;
            // Print data in console
            console.log("CONVERSION SUCCESSFULL");
            update_Resume();

        };
        // Convert data to base64
        fileReader.readAsDataURL(fileToLoad);

    }
    // await sleep(1500);
    // console.log(base64);

}

jQuery(document).ready(function($) {

    const main_url = url();
    "use strict";
    //Contact
    $('.upload_file').click(function() {
        //alert("hai");
        var f = $('form.upload_resume').find('.form-group');
        var generalResumeName = document.getElementById("cand_name").value,
            generalResumeEmail = document.getElementById("cand_email").value,
            generalResumeFormat = "PDF",
            generalResumeContact = document.getElementById("cand_ct").value;
        // console.log(generalQueryName,generalQueryEmail,generalQueryContact,generalQueryContent);
        // var base64 =convertToBase64();
       // ferror = validate(f);
        //console.log("FILE IS" + base64);
        var generalResumeResume = base64;
        console.log("{\n\t\"generalResumeName\" : \"" + generalResumeName + "\",\n\t\"generalResumeEmail\" : \"" + generalResumeEmail + "\",\n\t\"generalResumeResume\" : \"" + generalResumeResume + "\",\n\t\"generalResumeFormat\" : \"" + generalResumeFormat + "\",\n\t\"generalResumeContact\" : " + generalResumeContact + "\n}");
        // console.log(ferror);
       // if (!ferror) return false;
       // else var str = $(this).serialize();
       // var action = $(this).attr('action');
        // console.log("OUTSIDE ACTION");
       // if (!action) {
       //     action = 'v1/candidate/postGeneralResume';
            // console.log(main_url+action);
       // }
        //alert("enter");
        $.ajax({
            type:"POST",
            url:"/generalresumetable/",
           // dataType: "json",
           // headers: {
           //     "Content-Type": "application/json"
            //},
            data:'{"generalResumeName":"'+ generalResumeName +'","generalResumeContact":"'+ generalResumeContact +'","generalResumeEmail":"'+ generalResumeEmail +'","generalResumeResume":"'+ generalResumeResume +'","generalResumeFormat":"'+ generalResumeFormat +'"}',
            success: function(msg) {
                base64 = "";
                console.log("successfully added");
                
                $("#sendmessage").addClass("show");
                $("#errormessage").removeClass("show");
                $('.upload_resume').find("input, textarea").val("");

            },
            error: function(msg) {
                var msg1 = JSON.stringify(msg);
                console.log("ERROR"+ msg1)
                $("#sendmessage").removeClass("show");
                $("#errormessage").addClass("show");
                $('#errormessage').html("Something went wrong, Please check your Entries Again!");
            }

        });

        return false;
    });

});

function update_Resume()
{

var candidateResumes = base64;
//var generalResumeFormat = "PDF";

console.log("file"+base64);
var candidate_email =  document.getElementById("candidate_emails").value;
//alert(candidate_email);
$.ajax({
    type:"POST",
    url:"/candidateupdateresume/",
   // dataType: "json",
   // headers: {
   //     "Content-Type": "application/json"
    //},
    data:'{"candidateResumes": [["'+ candidateResumes +'","pdf"]],"candidate_email":"'+ candidate_email +'"}',
    success: function(msg) {
        base64 = "";
        console.log("successfully updated");
        alert("successfully Updated");
        //$("#sendmessage").addClass("show");
       // $("#errormessage").removeClass("show");
       // $('.upload_resume').find("input, textarea").val("");
    },
    error: function(msg) {
        var msg1 = JSON.stringify(msg);
        console.log("ERROR"+ msg1)
        $("#sendmessage").removeClass("show");
        $("#errormessage").addClass("show");
        $('#errormessage').html("Something went wrong, Please check your Entries Again!");
    }

});

}