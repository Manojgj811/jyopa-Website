from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
#from django.shortcuts import redirect
from.import dbhelper
from.import apiresponses as ar
from.import authentication as au
from.import sanityenforcer as se
import json
import ast

def home(request):
    return render(request,'index.html')

def team(request):
    return render(request,'team.html')


def jobseeker (request):
    return render(request,'jobseeker.html')

@csrf_exempt
def login(request):
    return render(request,'login.html')
    
@csrf_exempt    
def candidate(request):
    return render(request,'candidate.html')
    
def emplogin(request):
    return render(request,'emplogin.html')

def employee(request):
    return render(request,'employee.html')
    
@csrf_exempt
def candidateregister(request):
    
    if request.method == "POST":
        # get posted json
        data = json.loads(request.body)

        # dictionary used to send to dbhelper
        send_db = {}

        # processing candidateUsername 
        send_db['candidateUsername'] = data['candidateUsername']

        # processing candidateName
        send_db['candidateName'] = data['candidateName']
        
        # processing candidatePassword    
        send_db['candidatePassword'] = data['candidatePassword']

        # processing candidateDateOfbirth
        send_db['candidateDOB'] = data['candidateDOB']

        # processing notice period
        send_db['candidateNoticePeriod'] = data['candidateNoticePeriod']

        # processing current ctc
        send_db['candidateCurrentCTC'] = data['candidateCurrentCTC']

        # processing expected ctc
        send_db['candidateExpectedCTC'] = data['candidateExpectedCTC']

        # processing locations
        send_db['candidateLocations'] = data['candidateLocations']

        # processing contacts
        send_db['candidateContactNumbers'] = data['candidateContactNumbers']

        # processing emails
        send_db['candidateEmails'] = data['candidateEmails']

        # processing experiences
        send_db['candidateExperiences'] = data['candidateExperiences']

        # processing resumes
        send_db['candidateResumes'] = data['candidateResumes']

        # processing qualifications
        send_db['candidateQualifications'] = data['candidateQualifications']

        # processing skills
        send_db['candidateSkills'] = data['candidateSkills']
        
        try:
            #dbhelper.create_table_if_not_exist()
            dbhelper.insertintocandidates(send_db)
        except Exception as ex:
            return HttpResponse(status=500)
        print(data.keys())
    return HttpResponse(status=201)
    #dbhelper.insert_into_candidates()
    
    
    
    
    
@csrf_exempt
def generalresumetable(request):
    print("resume")
    if request.method == "POST":
        # get posted json
        data = json.loads(request.body)
        print(data)
        # dictionary used to send to dbhelper
        send_db = {}

        # processing candidateUsername 
        send_db['generalResumeName'] = data['generalResumeName']

        # processing candidateName
        send_db['generalResumeContact'] = data['generalResumeContact']
        
        # processing candidatePassword    
        send_db['generalResumeEmail'] = data['generalResumeEmail']

        # processing candidateDateOfbirth
        send_db['generalResumeResume'] = data['generalResumeResume']

        # processing notice period
        send_db['generalResumeFormat'] = data['generalResumeFormat']

       
        try:
            #dbhelper.create_table_if_not_exist()
            dbhelper.insert_into_general_resume_table(send_db)
        except Exception as ex:
            return HttpResponse(status=500)
        print(data.keys())
    return HttpResponse(status=201)
    #dbhelper.general_resume_table()


   
@csrf_exempt    
def candidatelogin(request):
        print('login')
        if request.method == "POST":
        # get posted json
            data = json.loads(request.body)
            #print(data.keys())

            if 'candidateEmails' not in data.keys():
                response = ar.entity_missing("candidateEmails")
                return HttpResponse(content = json.dumps(response),status=422)

            if 'candidatePassword' not in data.keys():
                response = ar.entity_missing("candidatePassword")
                return HttpResponse(content = json.dumps(response),status=422)
        
            # dictionary used to send to dbhelper
            send_db = {}
            
            # processing candidateUsername 
            send_db['candidateEmails'] = data['candidateEmails']
            
            # processing candidatePassword    
            send_db['candidatePassword'] = data['candidatePassword']

            
            try:
              status,result = dbhelper.logincandidate(send_db)
             #val = ast.literal_eval(result['candidateSkills'])
             #print(val[0])
            except Exception as ex:
                print(ex)
                if str(ex) == "user_not_found":
                    return HttpResponse(status=500)
                elif str(ex) == "password_incorrect":
                    response = ar.password_incorrect()
                    return HttpResponse(status=500)
                else:
                    return ex

            if status == "Done":
                response = ar.candidate_logged_in(result)
                
                print(response)
                #return make_response(jsonify(response),202)
                return HttpResponse(content = json.dumps(response),status=201)
                #return HttpResponse(status=201)
            
            else:
                return HttpResponse(status=500)



@csrf_exempt 
def getcandidatedetails(request):

    try:
        data=json.loads(request.body)
        #print(data.keys())
        print("Hi")
        print(data['token'])
       # print(request.headers)
        au.authenticate(data['token'],'user')
    except Exception as ex:
        print(ex)
        response = ar.authentication_failure('user')
        return HttpResponse(content = json.dumps(response),status=401)
    

    try:
        eid = au.get_emp_id_from_token(data['token'])
        print("eid")
    except Exception as ex:
        print(ex)
        response = ar.db_error()
        return make_response(jsonify(response),500)
    
    try:
        result = dbhelper.get_candidate_details(eid)
        print(result)
        response = ar.get_candidate_details(result)
        return HttpResponse(content = json.dumps(response),status=201)
    except Exception as ex:
        print(ex)
        response = ar.db_error()
        return HttpResponse(status=500)


    response  = ar.found_no_data()
    return HttpResponse(content = json.dumps(response),status=401)

#def redirect_view(request):
    #response = redirect('redirect-success/')
    #return response

     
@csrf_exempt    
def candidateGetJobs(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        skills_field = 'skills'
       
        
        

        # processing startDate
        field = 'startDate'
        if field not in data.keys():
            if skills_field not in data.keys():
                response = ar.entity_missing(field)
                return HttpResponse(content = json.dumps(response),status=422)
        else:
            try:
                startDate = se.sanitize_dob(data[field])
            except Exception as ex:
                response = ar.invalid_input(field)
                return HttpResponse(content = json.dumps(response),status=422)

        # processing endDate
        field = 'endDate'
        if field not in data.keys():
            if skills_field not in data.keys():
                response = ar.entity_missing(field)
                return HttpResponse(content = json.dumps(response),status=422)
        else:
            try:
                endDate = se.sanitize_dob(data[field])
            except Exception as ex:
                response = ar.invalid_input(field)
                return HttpResponse(content = json.dumps(response),status=422)
            
         # processing field skill
        field = 'skills'
        if field not in data.keys():
            skills = None
        else:
            try:
                skills = se.sanitize_skills_filter(data[field])
            except Exception as ex:
                if str(ex) == "sanity_fail":
                    response = ar.invalid_input(field)
                else:
                    response = ar.general_entity_error(field)
                return HttpResponse(content = json.dumps(response),status=422)


        try:
            print(startDate)
            print(endDate)
            print(skills)
            result = dbhelper.get_jobs_candidate(startDate,endDate,skills)
            response = ar.get_job_postings(result)
            return HttpResponse(content = json.dumps(response),status=200)
        except Exception as ex:
            response = ar.db_error()
            return HttpResponse(content = json.dumps(response),status=500)

        
        response = ar.found_no_data()
        return HttpResponse(content = json.dumps(response),status=500)   

@csrf_exempt 
def applytojob(request):
    if request.method == 'POST':
        send_db = {}
        try:
            data = json.loads(request.body)
            print("job")
            print(data['token'])
        except:
            response = ar.found_no_data()
            return HttpResponse(content = json.dumps(response),status=422)

        try:
            au.authenticate(data['token'],'user')
        except Exception as ex:
            response = ar.authentication_failure('user')
            return HttpResponse(content = json.dumps(response),status=422)

        # get jobid
        field = 'jobId'
        if field not in data.keys():
            response = ar.entity_missing(field)
            return HttpResponse(content = json.dumps(response),status=422)
        else:
            try:
                send_db[field] = se.sanitize_number(int(data[field]))
                
            except Exception as ex:
                print(ex)
                if str(ex) == "sanity_fail":
                    response = ar.invalid_input(field)
                    return HttpResponse(content = json.dumps(response),status=422)
                else:
                    response = ar.general_entity_error(field)
                    return HttpResponse(content = json.dumps(response),status=422)


        try:
            send_db['candidateId'] = au.get_emp_id_from_token(data['token'])
        except Exception as ex:
            print(ex)
            response = ar.db_error()
            return HttpResponse(content = json.dumps(response),status=500)


        # populate db
        try:
            print('came')
            dbhelper.apply_for_job(send_db)
        except:
            response = ar.db_error()
            return HttpResponse(content = json.dumps(response),status=422)


        return HttpResponse(status=200)


@csrf_exempt
def clientqueryinfotable(request):
    
    if request.method == "POST":
        # get posted json
        data = json.loads(request.body)

        # dictionary used to send to dbhelper
        print(data)
        send_db = {}

        # processing candidateUsername 
        send_db['clientCompanyName'] = data['clientCompanyName']

        # processing candidateName
        send_db['clientApplicantName'] = data['clientApplicantName']
        
        # processing candidatePassword    
        send_db['clientApplicantDesignation'] = data['clientApplicantDesignation']

        # processing candidateDateOfbirth
        send_db['clientApplicantEmail'] = data['clientApplicantEmail']

        # processing notice period
        send_db['clientApplicantContact'] = data['clientApplicantContact']

        # processing candidateDateOfbirth
        send_db['clientServiceOpted'] = data['clientServiceOpted']

        # processing notice period
        send_db['clientQuery'] = data['clientQuery']

       
        try:
            #dbhelper.create_table_if_not_exist()
            dbhelper.insert_into_client_query_info_table(send_db)
        except Exception as ex:
            return HttpResponse(status=500)
        print(data.keys())
    return HttpResponse(status=201)
    #dbhelper.general_resume_table()

@csrf_exempt
def candidateupdateresume(request):

    print("came")
    if request.method == "POST":
        # get posted json
        data = json.loads(request.body)
        print(data)

        send_db = {}
        # processing resumes
        send_db['candidateResumes'] = data['candidateResumes']

        # processing email
        send_db['candidate_email'] = data['candidate_email']
        

        try:
            dbhelper.updatecandidateresume(send_db)
            #dbhelper.updatecandidateresume(send_db)
        except Exception as ex:
            return HttpResponse(status=500)
        
    return HttpResponse(status=201)
        

    
    
