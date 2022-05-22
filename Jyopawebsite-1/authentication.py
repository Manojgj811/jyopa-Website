import jwt
#from MainApp import app
import datetime
from.import config
#import cherrypy

def authenticate(token,role):


    try:
        
        payload = jwt.decode(token,config.auth_key,algorithms='HS256')
        if payload['expiration'] < datetime.datetime.utcnow().timestamp():
            raise Exception('expired')
        if payload['role'] == role:
            return
        # default check for admin
        elif payload['role'] == 'admin':
            return
    
    except Exception as ex:
        raise Exception(ex)
    
    
    raise Exception

    return


def authorize(role,authid):
    try:
        payload = {
                    'expiration': (datetime.datetime.utcnow() + datetime.timedelta(days=1,seconds=0)).timestamp(),
                    'issuedat': datetime.datetime.utcnow().timestamp(),
                    'role': role,
                    'sub':authid
                }

        authtoken =  jwt.encode(
            payload,
            config.auth_key,
            algorithm='HS256'
        )

    except Exception as ex:
        print(ex)
        raise Exception(ex)
    return authtoken



def get_emp_id_from_token(token):
    try:
        payload = jwt.decode(token,config.auth_key,algorithms = 'HS256')
        print(payload)
        print("payload")
        return payload['sub']
    except:
        raise Exception()
    
    return

