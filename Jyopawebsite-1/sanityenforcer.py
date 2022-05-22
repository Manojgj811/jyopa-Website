#from passlib.hash import sha512_crypt
import datetime
#import cherrypy

error = "sanity_fail"
alphabets_string_string = "abcdefghijklmnopqrstuvwxyz"
list_of_allowed_symbols = []

# normal sanity
def sanitize_normal(location):

    location = location.strip()

    if location == "":
        raise Exception(error)

    for i in location:
        if not i.isalpha() and i not in " ":
            raise Exception(error)

    return location

# number sanity
def sanitize_number(number):

    if type(number) != int:
        raise Exception(error)

    return number


# decimal sanity
def sanitize_decimal(decimal):

    if type(decimal) != float:
        raise Exception(error)
    
    return decimal
    
# candidateId sanity
def sanitize_username(username):
    
    username = username.strip()

    if username == "":
        raise Exception(error)

    for i in username:
        if not i.isalpha() and not i.isnumeric() and i not in "_" and i not in "-":
            raise Exception(error)
    return username


# email sanity
def sanitize_email(email):
    email = email.strip()

    if email == "":
        raise Exception(error)
    if "@" not in email:
        raise Exception(error)
    if "." not in email:
        raise Exception(error)
    for i in email:
        if not i.isalpha() and i not in "@_-." and not i.isnumeric():
            raise Exception(error)
    
    return email

# contact sanity
def sanitize_contact(contact):

    for i in contact:
        sanitize_number(i)
    

    return contact

# password sanity and encryption
def sanitize_password(password):

    if password == "":
        raise Exception(error)
    
    try:
        password = sha512_crypt.encrypt(password)
    except:
        raise Exception(error)
    return password

def sanitize_dob(dob):

    if dob == "":
        raise Exception(error)

    try:
        dob1 = datetime.datetime.strptime(dob,"%d/%m/%Y")
    except:
        raise Exception(error)
    return dob1

def sanitize_resume(resume):
    pass
    return

def sanitize_locations(locations):

    if len(locations) == 0:
        raise Exception(error)
    

    for i in locations:
        if len(i) != 3:
            raise Exception(error)
        for j in i:
            try:
                sanitize_normal(j)
            except Exception as ex:
                raise Exception(str(ex))
    
    return locations

def sanitize_contacts(contacts):

    if len(contacts) == 0:
        raise Exception(error)
    
    for i in contacts:
        try:
            sanitize_number(i)
        except Exception as ex:
            cherrypy.log(str(ex))
            raise Exception(error)
        
    return contacts

def sanitize_emails(emails):

    if len(emails) == 0:
        raise Exception(error)
    
    for i in emails:
        try:
            sanitize_email(i)
        except:
            raise Exception(error)
    
    return emails

def sanitize_experiences(experiences):

    if len(experiences) == 0:
        raise Exception(error)
    
    for i in experiences:
        if len(i) !=3:
            raise Exception(error)
        try:
            sanitize_content(i[0])
            sanitize_normal(i[1])
            sanitize_number(i[2])
        except:
            raise Exception(error)

        
        
        
    return experiences

def sanitize_resumes(resumes):

    if len(resumes) == 0:
        raise Exception(error)
    
    for i in resumes:
        if len(i) != 2:
            raise Exception(error)
        for j in i:
            try:
                sanitize_resume(j)
            except:
                raise Exception(error)
        
    return resumes


def sanitize_qualifications(qualifications):

    if len(qualifications) == 0:
        raise Exception(error)
    
    for i in qualifications:
        if len(i) != 3:
            raise Exception(error)
        try:
            i[0] = sanitize_normal(i[0])
            i[1] = sanitize_normal(i[1])
            i[2] = sanitize_number(i[2])
        except Exception as ex:
            cherrypy.log(str(ex))
            raise Exception(error)

    return qualifications

def sanitize_skills(skills):

    if len(skills) == 0:
        raise Exception(error)
    
    
    return skills

def sanitize_content(content):

    if len(content) == 0:
        raise Exception(error)
    
    if type(content) != str:
        raise Exception(error)
    
    return content

def sanitize_skills_filter(skills):

    if skills == None:
        raise Exception(error)
    
    else:

        try:
            send = skills.split(',')
        except Exception as ex:
            raise Exception(error)
    
    return send


def description_filter(description):
    
    try:
        description = description
    except Exception as ex:
        raise Exception(error)

    return  description
