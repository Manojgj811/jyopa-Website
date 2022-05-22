#from MainApp.schemas import candidate_login_schema,emp_schema,emps_schema,client_query_schema,client_query_schemas,general_queries_schema,general_resumes_schema,admin_login_schema,get_job_postings_schema,get_job_applications_schema
#import jwt
import datetime
#from MainApp import app
from.import authentication as au


def invalid_input(error_field):

    response = {
        "error":"Unprocessable Entity",
        "errorMessage":"invalid input -> "+error_field
        }
        
    return response

def entity_missing(error_field):

    response = {
        "error":"Entity Missing",
        "errorMessage":error_field+" entity missing"
    }

    return response

def general_entity_error(error_field):

    response = {
        "error":"Error Processing Entity",
        "errorMessage":"Something went wrong processing entity "+error_field
    }

    return response

def db_error():
    response = {
        "error":"Error interacting with database",
        "errorMessage":"Something went wrong when interacting with database"
    }
    return response

def user_not_found():
    resposne = {
        "error":"HTTP_404_NOT_FOUND",
        "errorMessage": "user_not_found"
    }
    return resposne

def password_incorrect():
    resoponse = {
        "error":"HTTP_401_UNAUTHORIZED",
        "errorMessage":"Password incorrect"
    }   
    return resoponse

def general_login_error():
    response = {
        "error":"HTTP_404_NOT_FOUND",
        "errorMessage":"Login Faied"
    }
    return response

def candidate_logged_in(result):
    try:
           print(result['candidate_id'])
           authtoken = au.authorize('user',result['candidate_id'])
           print(authtoken)
    except Exception as e:
        return e
    try:
       #candidate_login_details = candidate_login_schema.dump(result)
        #send = {}
        #send['candidateDetails'] = result
        #send['authtoken'] = authtoken
        send = {
            "candidateDetails":result,
            "authtoken":authtoken
         }
    except Exception as e:
        return e
    return send

def found_no_data():
    response = {
        "error":"404_NOT_FOUND",
        "errorMessage":"Data Not Found in Payload"
    }
    return response

def already_exists_in_db(error_field):
    response = {
        "error":"Unique Constraint",
        "errorMessage":error_field+" already exists"
    }
    return response

def emp_logged_in(result):
    try:
            authtoken=au.authorize('emp',result['Id'])
    except Exception as e:
        return e
    try:
        #empDetails = emp_schema.dump(result)
        #send = {}
        #send['empDetails'] = empDetails.data
        #send['authtoken'] = authtoken
        send = {
            "empDetails":result,
            "authtoken":authtoken
         }
    except Exception as ex:
        raise Exception(ex)
    return send

def get_client_query(result):
    try:
        return client_query_schemas.dump(result).data
    except Exception as ex:
        raise Exception(ex)

def get_general_queries(result):
    try:
        return general_queries_schema.dump(result).data
    except Exception as ex:
        raise Exception(ex)
    
def get_general_resumes(result):
    try:
        return general_resumes_schema.dump(result).data
    except Exception as ex:
        raise Exception(ex)




def authentication_failure(role):
    try:
        response = {
            "errorCode":401,
            "errorMessage":"authentication failed for "+role
        }
    except Exception as ex:
        raise Exception(ex)
    
    return response     


def admin_logged_in(result):
    try:
            authtoken=au.authorize('admin',result.admin_id)
    except Exception as e:
        return e
    adminDetails = admin_login_schema.dump(result)
    send = {}
    send['adminDetails'] = adminDetails.data
    send['authtoken'] = authtoken
    return send

def get_job_postings(result):
    try:
        send = {
            "jobpostings":result
         }
        return send
        #return get_job_postings_schema.dump(result).data
    except Exception as ex:
        raise Exception(ex)


def get_candidate_details(result):
    try:
        send = {
            "candidateDetails":result
         }
        return send
    except Exception as ex:
        raise Exception(ex)


def get_job_applicants(result):
    try:
        send = {
            "jobapplicants":result
         }
        return send
        #return get_job_applications_schema.dump(result).data
    except Exception as ex:
        raise Exception(ex)




