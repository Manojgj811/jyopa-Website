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

role = 'emp'

Authorization = 'Authorization'


@csrf_exempt 
def emplogincheck(request):
    if request.method == "POST":
        data = json.loads(request.body)

        if 'empId' not in data.keys():
            response = ar.entity_missing("empId")
            return HttpResponse(content = json.dumps(response),status=422)

        if 'empPassword' not in data.keys():
            response = ar.entity_missing("empPassword")
            return HttpResponse(content = json.dumps(response),status=422)

        # dictionary used to send to dbhelper
        send_db = {}
            
        # processing candidateUsername 
        send_db['empId'] = data['empId']
            
        # processing candidatePassword    
        send_db['empPassword'] = data['empPassword']

        try:
            status,result = dbhelper.loginemp(send_db)
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
            response = ar.emp_logged_in(result)
            #return make_response(jsonify(response),202)
            return HttpResponse(content = json.dumps(response),status=201)
            #return HttpResponse(status=201)
            
        else:
            return HttpResponse(status=500)
        
@csrf_exempt         
def emppostjob(request):

    if request.method == 'POST':

        try:
            data = json.loads(request.body)
            print(data)
            if data == None:
                raise Exception('no_data')
        except Exception as ex:
            if str(ex) == 'no_data':
                response = ar.found_no_data()
                return HttpResponse(content = json.dumps(response),status=422)

        send_db = {}

        try:
            au.authenticate(request.headers['Authorization'],role)
        except Exception as ex:
            response = ar.authentication_failure(role)
            return HttpResponse(content = json.dumps(response),status=401)
        


        
        # checking for job_title
        field = 'jobTitle'
        if field not in data.keys():
            response = ar.entity_missing(field)
            return HttpResponse(content = json.dumps(response),status=422)
        else:
            try:
                send_db[field] = data[field]
            except Exception as ex:
                if str(ex) == "sanity_fail":
                    response = ar.invalid_input(field)
                else:
                    response = ar.general_entity_error(field)
                return HttpResponse(content = json.dumps(response),status=422)
        

        # checking for job_description
        field = 'jobDescription'
        if field not in data.keys():
            response = ar.entity_missing(field)
            return HttpResponse(content = json.dumps(response),status=422)
        else:
            try:
                send_db[field] = data[field]
            except Exception as ex:
                if str(ex) == "sanity_fail":
                    response = ar.invalid_input(field)
                else:
                    response = ar.general_entity_error(field)
                return HttpResponse(content = json.dumps(response),status=422)
        
        # checking for job_city
        field = 'jobCity'
        if field not in data.keys():
            response = ar.entity_missing(field)
            return HttpResponse(content = json.dumps(response),status=422)
        else:
            try:
                send_db[field] = data[field]
            except Exception as ex:
                if str(ex) == "sanity_fail":
                    response = ar.invalid_input(field)
                else:
                    response = ar.general_entity_error(field)
                return HttpResponse(content = json.dumps(response),status=422)
        
        # checking for job_state
        field = 'jobState'
        if field not in data.keys():
            response = ar.entity_missing(field)
            return HttpResponse(content = json.dumps(response),status=422)
        else:
            try:
                send_db[field] = data[field]
            except Exception as ex:
                if str(ex) == "sanity_fail":
                    response = ar.invalid_input(field)
                else:
                    response = ar.general_entity_error(field)
                return HttpResponse(content = json.dumps(response),status=422)
        

        # checking for job_country
        field = 'jobCountry'
        if field not in data.keys():
            response = ar.entity_missing(field)
            return HttpResponse(content = json.dumps(response),status=422)
        else:
            try:
                send_db[field] = data[field]
            except Exception as ex:
                if str(ex) == "sanity_fail":
                    response = ar.invalid_input(field)
                else:
                    response = ar.general_entity_error(field)
                return HttpResponse(content = json.dumps(response),status=422)

        
         # checking for jobIndustry
        field = 'jobIndustry'
        if field not in data.keys():
            response = ar.entity_missing(field)
            return HttpResponse(content = json.dumps(response),status=422)
        else:
            try:
                send_db[field] = data[field]
            except Exception as ex:
                if str(ex) == "sanity_fail":
                    response = ar.invalid_input(field)
                else:
                    response = ar.general_entity_error(field)
                return HttpResponse(content = json.dumps(response),status=422)
        

        
        # checking for jobSalary
        field = 'jobSalary'
        if field not in data.keys():
            send_db[field] = None
        else:
            try:
                send_db[field] = data[field]
            except Exception as ex:
                if str(ex) == "sanity_fail":
                    response = ar.invalid_input(field)
                else:
                    response = ar.general_entity_error(field)
                return HttpResponse(content = json.dumps(response),status=422)
        

        
        # checking for jobExperience
        field = 'jobExperience'
        if field not in data.keys():
            send_db[field] = None
        else:
            try:
                send_db[field] = data[field]
            except Exception as ex:
                if str(ex) == "sanity_fail":
                    response = ar.invalid_input(field)
                else:
                    response = ar.general_entity_error(field)
                return HttpResponse(content = json.dumps(response),status=422)

        
        # checking for jobType
        field = 'jobType'
        if field not in data.keys():
            response = ar.entity_missing(field)
            return HttpResponse(content = json.dumps(response),status=422)
        else:
            try:
                send_db[field] = data[field]
            except Exception as ex:
                if str(ex) == "sanity_fail":
                    response = ar.invalid_input(field)
                else:
                    response = ar.general_entity_error(field)
                return HttpResponse(content = json.dumps(response),status=422)
        
        # checking for jobStatus
        field = 'jobStatus'
        if field not in data.keys():
            response = ar.entity_missing(field)
            return HttpResponse(content = json.dumps(response),status=422)
        else:
            try:
                send_db[field] = data[field]
            except Exception as ex:
                if str(ex) == "sanity_fail":
                    response = ar.invalid_input(field)
                else:
                    response = ar.general_entity_error(field)
                return HttpResponse(content = json.dumps(response),status=422)
        

        # checking for jobSalary
        field = 'jobQualifications'
        if field not in data.keys():
            response = ar.entity_missing(field)
            return HttpResponse(content = json.dumps(response),status=422)
        else:
            try:
                send_db[field] = data[field]
            except Exception as ex:
                cherrypy.log(str(ex))
                if str(ex) == "sanity_fail":
                    response = ar.invalid_input(field)
                else:
                    response = ar.general_entity_error(field)
                return HttpResponse(content = json.dumps(response),status=422)
        
        # checking for jobSalary
        field = 'jobSkills'
        if field not in data.keys():
            response = ar.entity_missing(field)
            return HttpResponse(content = json.dumps(response),status=422)
        else:
            try:
                send_db[field] = data[field]
            except Exception as ex:
                if str(ex) == "sanity_fail":
                    response = ar.invalid_input(field)
                else:
                    response = ar.general_entity_error(field)
                return HttpResponse(content = json.dumps(response),status=422)

        
        # try inserting to db
        try:
            print(send_db)
            empid = au.get_emp_id_from_token(request.headers['Authorization'])
            print(empid)
            dbhelper.insert_into_job(send_db,empid)
        except Exception as ex:
            print(ex)
            #cherrypy.log(str(ex))
            response = ar.db_error()
            return HttpResponse(content = json.dumps(response),status=500)
        

        return HttpResponse(status=201)

@csrf_exempt 
def empgetjobs(request):

    if request.method == 'POST':

        try:
            print('data')
            data = json.loads(request.body)
            print(data)
            au.authenticate(request.headers['Authorization'],role)
            
        except Exception as ex:
            print(ex)
            response = ar.authentication_failure(role)
            return HttpResponse(content = json.dumps(response),status=401)

        # checking for startDate
        field = 'startDate'
        if field not in data.keys():
            response = ar.entity_missing(field)
            return HttpResponse(content = json.dumps(response),status=422)
        else:
            try:
                startDate = se.sanitize_dob(data['startDate'])
            except Exception as ex:
                response = ar.invalid_input(field)
                return HttpResponse(content = json.dumps(response),status=422)
        
        # checking for endDate
        field = 'endDate'
        if field not in data.keys():
            response = ar.entity_missing(field)
            return HttpResponse(content = json.dumps(response),status=422)
        else:
            try:
                endDate = se.sanitize_dob(data['endDate'])
            except Exception as ex:
                response = ar.invalid_input(field)
                return HttpResponse(content = json.dumps(response),status=422)

        
        try:
            empid = au.get_emp_id_from_token(request.headers['Authorization'])
            print(empid)
            status,result = dbhelper.get_job_postings(startDate,endDate,empid)
        except Exception as ex:
            print(ex)
            response = ar.db_error()
            return HttpResponse(content = json.dumps(response),status=500)
        
        try:
            response = ar.get_job_postings(result)
            return HttpResponse(content = json.dumps(response),status=200)
        except Exception as ex:
            print(ex)
            response = ar.found_no_data()
            return HttpResponse(content = json.dumps(response),status=422)
        
        response = ar.found_no_data()
        return make_response(jsonify(response),422)

@csrf_exempt
def getapplicants(request):
    if request.method == 'POST':
        try:
            print('getapplicants')
            data = json.loads(request.body)
            print(data)
            au.authenticate(request.headers['Authorization'],role)
        except Exception as ex:
            print(ex)
            response = ar.authentication_failure(role)
            return HttpResponse(content = json.dumps(response),status=401)
            
        send_db = {}
        # check for field jobId
        field = 'JobId'
        if field not in data.keys():
            response = ar.entity_missing(field)
            return HttpResponse(content = json.dumps(response),status=422)
        else:
            try:
                send_db[field] = data[field]
            except Exception as ex:
                if str(ex) == "sanity_fail":
                    response = ar.invalid_input(field)
                else:
                    response = ar.general_entity_error(field)
                return HttpResponse(content = json.dumps(response),status=401)
        
        try:
            result = dbhelper.get_job_applicants(send_db)
            if result == None:
                response = []
                return HttpResponse(content = json.dumps(response),status=200)
            
        except Exception as ex:
            response = ar.db_error()
            return HttpResponse(content = json.dumps(response),status=500)
        

        try:
            response = ar.get_job_applicants(result)
        except Exception as ex:
            response = ar.found_no_data()
            return HttpResponse(content = json.dumps(response),status=500)


        
        return HttpResponse(content = json.dumps(response),status=200)





@csrf_exempt
def empgetcandidatedetails(request):

    if request.method == 'POST':

        try:
            print('data')
            data = json.loads(request.body)
            print(data)
            au.authenticate(request.headers['Authorization'],role)
            
        except Exception as ex:
            print(ex)
            response = ar.authentication_failure(role)
            return HttpResponse(content = json.dumps(response),status=401)


        # get candidateId
        field = 'candidateId'
        if field not in data.keys():
            response = ar.entity_missing(field)
            return HttpResponse(content = json.dumps(response),status=422)
        else:
            try:
                candidateId = data[field]
            except Exception as ex:
                if str(ex) == "sanity_fail":
                    response = ar.invalid_input(field)
                else:
                    response = ar.general_entity_error(field)
                return HttpResponse(content = json.dumps(response),status=401)
        

        try:
            result = dbhelper.emp_get_candidate_details(candidateId)
            if result == None:
                response = []
                return HttpResponse(content = json.dumps(response),status=200)
        except Exception as ex:
            response = ar.db_error()
            return HttpResponse(content = json.dumps(response),status=500)

        
        try:
            response = ar.get_candidate_details(result)
        except Exception as ex:
            response = ar.found_no_data()
            return HttpResponse(content = json.dumps(response),status=500)

        

        return HttpResponse(content = json.dumps(response),status=200)    
    
