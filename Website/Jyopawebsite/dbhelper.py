import mysql.connector

def mysqlconnection():
    db = mysql.connector.connect(host='localhost',database='jyopa',user='root',password='')
    return db
    
def create_table_if_not_exist(): 
    #database connection
    try:
        db = mysqlconnection()
    except Exception as ex:
        print(ex)
        return
    # prepare a cursor object using cursor() method
    cursor = db.cursor()

    # Drop table if it already exist using execute() method.
   # cursor.execute("DROP TABLE IF EXISTS candidate_table")

    # Create table as per requirement
    sql = """CREATE TABLE IF NOT EXISTS candidate_table (
             candidate_id INT AUTO_INCREMENT,
             candidate_username CHAR(20) NOT NULL,
             candidate_name CHAR(20),
             candidate_password CHAR(20),
             candidate_dob DATETIME,
             candidate_notice_period VARCHAR(20),
             candidate_current_ctc VARCHAR(20),
             candidate_expected_ctc VARCHAR(20),
             candidate_locations VARCHAR(255),
             candidate_contacts CHAR(20),
             candidate_emails VARCHAR(225),
             candidate_experiences VARCHAR(255),
             candidate_resumes MEDIUMTEXT,
             candidate_qualifications VARCHAR(255),
             candidate_skills VARCHAR(255),
             PRIMARY KEY (candidate_id),
             UNIQUE (candidate_emails))"""
    try:
        print("connecting")
        cursor.execute(sql)
    except Exception as ex:
        print(ex)

    # disconnect from server
    db.close()
#create_table_if_not_exist()

def emp_table_if_not_exist(): 
    #database connection
    db = mysqlconnection()

    # prepare a cursor object using cursor() method
    cursor = db.cursor()

    # Drop table if it already exist using execute() method.
    #cursor.execute("DROP TABLE IF EXISTS Emp_Table")

    # Create table as per requirement
    sql = """CREATE TABLE IF NOT EXISTS Emp_Table (
             emp_primary_id INT AUTO_INCREMENT,
             emp_id CHAR(20) NOT NULL,
             emp_name CHAR(20) NOT NULL,
             emp_email VARCHAR(225),
             emp_contact CHAR(20),
             emp_password CHAR(20),
             emp_manager VARCHAR(20),
             PRIMARY KEY (emp_primary_id),
             UNIQUE (emp_email))"""

    cursor.execute(sql)

    # disconnect from server
    db.close()
#emp_table_if_not_exist()


def create_general_resume_table_if_not_exist(): 
    #database connection
    db = mysqlconnection()

    # prepare a cursor object using cursor() method
    cursor = db.cursor()

    # Drop table if it already exist using execute() method.
    #cursor.execute("DROP TABLE IF EXISTS general_resume_table")

    # Create table as per requirement
    sql = """CREATE TABLE IF NOT EXISTS general_resume_table(
             Id INT AUTO_INCREMENT,
             general_ResumeName VARCHAR(255) NOT NULL,
             general_ResumeEmail VARCHAR(225),
             general_ResumeContact VARCHAR(20),
             general_ResumeResume MEDIUMTEXT,
             general_ResumeFormat VARCHAR(20),
             PRIMARY KEY (Id),
             UNIQUE (general_ResumeEmail))"""

    cursor.execute(sql)

    # disconnect from server
    db.close()
    
#create_general_resume_table_if_not_exist()

def job_details_table():
    #database connection
    db = mysqlconnection()

    # prepare a cursor object using cursor() method
    cursor = db.cursor()

    # Drop table if it already exist using execute() method.
    cursor.execute("DROP TABLE IF EXISTS job_details_table")

    # Create table as per requirement
    sql = """CREATE TABLE IF NOT EXISTS job_details_table (
             job_id INT AUTO_INCREMENT,
             job_title VARCHAR(50) NOT NULL,
             job_description VARCHAR(255),
             job_city CHAR(20),
             job_state CHAR(20),
             job_country CHAR(20),
             job_industry VARCHAR(50),
             job_salary VARCHAR(20),
             job_experience VARCHAR(20),
             job_type CHAR(20),
             job_status CHAR(20),
             job_created_date DATETIME default now(),
             job_fulfilled_date DATE,
             job_qualifications VARCHAR(255),
             job_skills VARCHAR(255),
             emp_primary_id INT,
             PRIMARY KEY (job_id),
             FOREIGN KEY (emp_primary_id) REFERENCES emp_table(emp_primary_id))"""
    try:
        cursor.execute(sql)
    except Exception as ex:
        print(ex)

    # disconnect from server
    db.close()

#job_details_table()




def candidate_job_mapping():
    #database connection
    db = mysqlconnection()

    # prepare a cursor object using cursor() method
    cursor = db.cursor()

    # Drop table if it already exist using execute() method.
    cursor.execute("DROP TABLE IF EXISTS candidate_job_mapping")

    # Create table as per requirement
    sql = """CREATE TABLE IF NOT EXISTS candidate_job_mapping (
             job_mapping_id INT AUTO_INCREMENT,
             job_id INT NOT NULL,
             candidate_id INT NOT NULL,
             PRIMARY KEY (job_mapping_id),
             FOREIGN KEY (job_id) REFERENCES job_details_table(job_id),
             FOREIGN KEY (candidate_id) REFERENCES Candidate_Table(candidate_id))"""
    try:
        cursor.execute(sql)
    except Exception as ex:
        print(ex)

    # disconnect from server
    db.close()

#candidate_job_mapping()    

def create_client_query_info_table_if_not_exist(): 
    #database connection
    db = mysqlconnection()

    # prepare a cursor object using cursor() method
    cursor = db.cursor()

    # Drop table if it already exist using execute() method.
    #cursor.execute("DROP TABLE IF EXISTS general_resume_table")

    # Create table as per requirement
    sql = """CREATE TABLE IF NOT EXISTS client_query_info_table(
             Id INT AUTO_INCREMENT,
             client_CompanyName VARCHAR(355) NOT NULL,
             client_ApplicantName VARCHAR(50),
             client_ApplicantDesignation VARCHAR(225),
             client_ApplicantEmail VARCHAR(70),
             client_ApplicantContact VARCHAR(20),
             client_ServiceOpted VARCHAR(500),
             client_Query VARCHAR(200),
             PRIMARY KEY (Id),
             UNIQUE (client_ApplicantEmail))"""

    cursor.execute(sql)

    # disconnect from server
    db.close()
    
#create_client_query_info_table_if_not_exist()
    
def insertintocandidates(send_db):

    
    candidate_username = send_db['candidateUsername'],
    
    candidate_name = send_db['candidateName'],
    candidate_password = send_db['candidatePassword'],
    candidate_dob = send_db['candidateDOB'],
    candidate_notice_period = send_db['candidateNoticePeriod'],
    candidate_current_ctc = send_db['candidateCurrentCTC'],
    candidate_expected_ctc = send_db['candidateExpectedCTC'],
  #  print(type(send_db['candidateDOB']))
    candidate_locations = []
    for i in send_db['candidateLocations']:
        #add = candidate_location(i[0],i[1],i[2])
        candidate_locations.append(i)
        print(candidate_locations)
    
    candidate_contacts = []
    
    for i in send_db['candidateContactNumbers']:
        candidate_contacts.append(i)
        print(candidate_contacts)
        
    candidate_emails = []
    
    for i in send_db['candidateEmails']:
        candidate_emails.append(i)
    
    candidate_experiences = []
    for i in send_db['candidateExperiences']:
        candidate_experiences.append(i)

    candidate_resumes = []
    for i in send_db['candidateResumes']:
        candidate_resumes.append(i)
    
    candidate_qualifications = []
    for i in send_db['candidateQualifications']:
        candidate_qualifications.append(i)
    
    candidate_skills = []
    for i in send_db['candidateSkills']:
        candidate_skills.append(i)
        
    db = mysqlconnection()
    print("connected")
    # prepare a cursor object using cursor() method
    cursor = db.cursor()

    # Prepare SQL query to INSERT a record into the database.
    sql = """INSERT INTO candidate_table(candidate_username, candidate_name, candidate_password, candidate_dob, candidate_notice_period, candidate_current_ctc, candidate_expected_ctc, candidate_locations, candidate_contacts, candidate_emails, candidate_experiences, candidate_resumes, candidate_qualifications, candidate_skills)
            VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
    record = (send_db['candidateUsername'], send_db['candidateName'], send_db['candidatePassword'], send_db['candidateDOB'], send_db['candidateNoticePeriod'], send_db['candidateCurrentCTC'], send_db['candidateExpectedCTC'],str(send_db['candidateLocations'][0]),str(send_db['candidateContactNumbers'][0]),str(send_db['candidateEmails'][0]),str(send_db['candidateExperiences'][0]),str(send_db['candidateResumes'][0]),str(send_db['candidateQualifications'][0]),str(send_db['candidateSkills']))
    #sql = """INSERT INTO candidate_table(candidate_username,candidate_name)
            # VALUES(%s,%s)"""
    #record = (send_db['candidateUsername'],send_db['candidateName'])
    try:
       # Execute the SQL command
       cursor.execute(sql,record)
       # Commit your changes in the database
       db.commit()
       print('comitted')
    except Exception as ex:
       # Rollback in case there is any error
       print(ex)
       db.rollback()
       
    # disconnect from server
    print("closing")
    db.close()
    
    
    

def insert_into_general_resume_table(send_db):

    
    general_ResumeName = send_db['generalResumeName'],
    general_ResumeContact = send_db['generalResumeContact'],
    general_ResumeEmail = send_db['generalResumeEmail'],
    general_ResumeResume = send_db['generalResumeResume'],
    general_ResumeFormat = send_db['generalResumeFormat'],
    
    db = mysqlconnection()
    print("connected")
    # prepare a cursor object using cursor() method
    cursor = db.cursor()

    # Prepare SQL query to INSERT a record into the database.
    sql = """INSERT INTO general_resume_table(general_ResumeName, general_ResumeEmail, general_ResumeContact, general_ResumeResume, general_ResumeFormat)
            VALUES(%s, %s, %s, %s, %s)"""
    record = (send_db['generalResumeName'],  send_db['generalResumeEmail'],send_db['generalResumeContact'], send_db['generalResumeResume'], send_db['generalResumeFormat'])
    #sql = """INSERT INTO candidate_table(candidate_username,candidate_name)
            # VALUES(%s,%s)"""
    #record = (send_db['candidateUsername'],send_db['candidateName'])
    try:
       # Execute the SQL command
       cursor.execute(sql,record)
       # Commit your changes in the database
       db.commit()
       print('comitted')
    except Exception as ex:
       # Rollback in case there is any error
       print(ex)
       db.rollback()
       
    # disconnect from server
    print("closing")
    db.close()
    
    
    
    
    
    
def logincandidate(send_db):
    #database connection
    db = mysqlconnection()

    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    #sql = """SELECT * FROM candidate_table WHERE candidate_username ="""+send_db['candidateUsername']+""" and candidate_password ="""+ send_db['candidatePassword']
    #sql = """SELECT * FROM candidate_table WHERE candidate_username ="""+send_db['candidateUsername']+""" and candidate_password ="""+ send_db['candidatePassword']> '%d'" % (1000)
    #sql = "SELECT * FROM candidate_table WHERE = '%s','%s'" % (1000)
    sql = ("SELECT * FROM candidate_table WHERE candidate_emails = %s AND candidate_password =%s")
    try:
        # Execute the SQL command
        cursor.execute(sql,(send_db['candidateEmails'],send_db['candidatePassword']))
        #cursor.execute(sql)
        # Fetch all the rows in a list of lists.
        results = cursor.fetchall()
        print(results)
        result = {}
        if len(results) > 0:
            status = "Done"

            
            for row in results:
                result['candidate_id'] = row[0]
                result['candidateUsername'] = row[1]
                result['candidateName'] = row[2]
                result['candidatePassword'] = row[3]
                result['candidateDOB'] = row[4].strftime("%m/%d/%Y")
                result['candidateNoticePeriod'] = row[5]
                result['candidateCurrentCTC'] = row[6]
                result['candidateExpectedCTC'] = row[7]
                result['candidateLocations'] = row[8]
                result['candidateContactNumbers'] = row[9]
                result['candidateEmails'] = row[10]
                result['candidateExperiences'] = row[11]
                result['candidateResumes'] = row[12]
                result['candidateQualifications'] = row[13]
                result['candidateSkills'] = row[14]

            print(result)    
        else: 
            status = "Fail"
        #print(results)
        
              
              
         # Now print fetched result
       # print ("candidateUsername = %s, candidateName = %s, candidatePassword = %s, candidateDOB = %s, candidateNoticePeriod = %s, candidateCurrentCTC = %s, candidateExpectedCTC = %s, candidateLocations = %s, candidateContactNumbers = %s, candidateEmails = %s,candidateExperiences = %s, candidateResumes = %s, candidateQualifications = %s, candidateSkills = %s ",
        # (candidateUsername, candidateName, candidatePassword, candidateDOB, candidateNoticePeriod, candidateCurrentCTC, candidateExpectedCTC,candidateLocations,
        #candidateContactNumbers, candidateEmails, candidateExperiences, candidateResumes, candidateQualifications, candidateSkills ))
          
    except:
        print ("Error: unable to fecth data")

# disconnect from server
    db.close()
    
    return status,result


def get_candidate_details(eid):

    #database connection
    db = mysqlconnection()
    cursor = db.cursor()
    #print(eid)
    sql = ("SELECT * FROM candidate_table WHERE candidate_id = %s")
    try:
        cursor.execute(sql,(eid,))
        results = cursor.fetchall()
        result = {}
        for row in results:
                result['candidate_id'] = row[0]
                result['candidateUsername'] = row[1]
                result['candidateName'] = row[2]
                result['candidatePassword'] = row[3]
                result['candidateDOB'] = row[4].strftime("%m/%d/%Y")
                result['candidateNoticePeriod'] = row[5]
                result['candidateCurrentCTC'] = row[6]
                result['candidateExpectedCTC'] = row[7]
                result['candidateLocations'] = row[8]
                result['candidateContactNumbers'] = row[9]
                result['candidateEmails'] = row[10]
                result['candidateExperiences'] = row[11]
                result['candidateResumes'] = row[12]
                result['candidateQualifications'] = row[13]
                result['candidateSkills'] = row[14]
    except Exception as ex:
        print(ex)
        raise Exception(ex)

    sql = ("SELECT job_id FROM candidate_job_mapping WHERE candidate_id = %s")
    try:
        jobid = []
        cursor.execute(sql,(eid,))
        results = cursor.fetchall()
        for row in results:
            jobid.append(row[0])
            
        jobid = list(dict.fromkeys(jobid))
        result['candidate_jobs_applied'] = jobid
    except:
        raise Exception(dberror)    
    db.close()
    return result
    
def loginemp(send_db):

    #database connection
    db = mysqlconnection()
    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    
    sql = ("SELECT * FROM Emp_Table WHERE emp_id = %s AND emp_password =%s")
    try:
        # Execute the SQL command
        cursor.execute(sql,(send_db['empId'],send_db['empPassword']))
        #cursor.execute(sql)
        # Fetch all the rows in a list of lists.
        results = cursor.fetchall()
        print(results)
        if len(results) > 0:
            status = "Done"

            result = {}
            for row in results:
                result['Id'] = row[0]
                result['empId'] = row[1]
                result['empName'] = row[2]
                result['empEmail'] = row[3]
                result['empContact'] = row[4]
                result['empPassword'] = row[5]
                result['empManager'] = row[6]

            print(result)    
        else: 
            status = "Fail"

    except Exception as ex:
        print(ex)
        print ("Error: unable to fecth data")

    # disconnect from server
    db.close()
    
    return status,result            

def insert_into_job(send_db,id):
    try:

        db = mysqlconnection()
        print("connected")
        # prepare a cursor object using cursor() method
        cursor = db.cursor()

        # Prepare SQL query to INSERT a record into the database.
        sql = """INSERT INTO job_details_table(job_title, job_description, job_city, job_state, job_country, job_industry, job_salary, job_experience, job_type, job_status, job_qualifications, job_skills, emp_primary_id)
              VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        record = (send_db['jobTitle'], send_db['jobDescription'], send_db['jobCity'], send_db['jobState'], send_db['jobCountry'], send_db['jobIndustry'], send_db['jobSalary'],send_db['jobExperience' ],send_db['jobType'],send_db['jobStatus'],str(send_db['jobQualifications']),str(send_db['jobSkills']),id)
        #sql = """INSERT INTO candidate_table(candidate_username,candidate_name)
            # VALUES(%s,%s)"""
        #record = (send_db['candidateUsername'],send_db['candidateName'])
        try:
           # Execute the SQL command
           cursor.execute(sql,record)
           # Commit your changes in the database
           db.commit()
           print('comitted')
        except Exception as ex:
           # Rollback in case there is any error
           print(ex)
           db.rollback()
       
        # disconnect from server
        print("closing")
        db.close()
        
    except Exception as ex:
        raise Exception(ex)
    
    return    


def get_job_postings(startDate,endDate,id):

    try:

        db = mysqlconnection()
        print("connected")
        # prepare a cursor object using cursor() method
        cursor = db.cursor()

        sql = ("SELECT * FROM job_details_table WHERE job_created_date >= %s AND job_created_date <= %s AND emp_primary_id = %s")
        allRows = []
        cursor.execute(sql,(startDate,endDate,id))
        #cursor.execute(sql)
        # Fetch all the rows in a list of lists.
        results = cursor.fetchall()
        if len(results) > 0:
            status = "Done"
           
            result = {}
            for row in results:
                result['job_id'] = row[0]
                result['job_title'] = row[1]
                result['job_description'] = row[2]
                result['job_city'] = row[3]
                result['job_state'] = row[4]
                result['job_country'] = row[5]
                result['job_industry'] = row[6]
                result['job_salary'] = row[7]
                result['job_experience'] = row[8]
                result['job_type'] = row[9]
                result['job_status'] = row[10]
                result['job_created_date'] = row[11].strftime('%m/%d/%Y')
                result['job_fulfilled_date'] = row[12]
                result['job_qualifications'] = row[13]
                result['job_skills'] = row[14]
                allRows.append(result)
                result = {}

            print(allRows)    
        else: 
            status = "Fail"
        #print(results)
        
              
              
         # Now print fetched result
       # print ("candidateUsername = %s, candidateName = %s, candidatePassword = %s, candidateDOB = %s, candidateNoticePeriod = %s, candidateCurrentCTC = %s, candidateExpectedCTC = %s, candidateLocations = %s, candidateContactNumbers = %s, candidateEmails = %s,candidateExperiences = %s, candidateResumes = %s, candidateQualifications = %s, candidateSkills = %s ",
        # (candidateUsername, candidateName, candidatePassword, candidateDOB, candidateNoticePeriod, candidateCurrentCTC, candidateExpectedCTC,candidateLocations,
        #candidateContactNumbers, candidateEmails, candidateExperiences, candidateResumes, candidateQualifications, candidateSkills ))
          
    except Exception as ex:
        print(ex)
        print ("Error: unable to fecth data")

    # disconnect from server
    db.close()
    
    return status,allRows


def get_job_applicants(send_db):

    try:
        db = mysqlconnection()
        print("connected")
        # prepare a cursor object using cursor() method
        cursor = db.cursor()

        sql = ("SELECT * FROM candidate_job_mapping WHERE job_id = %s")
        allRows = []
        cursor.execute(sql,(int(send_db['JobId']),))
        #cursor.execute(sql)
        # Fetch all the rows in a list of lists.
        results = cursor.fetchall()
                       
        if len(results) > 0:

           
            result = {}
            for row in results:
                result['job_mapping_id'] = row[0]
                result['job_id'] = row[1]
                result['candidate_id'] = row[2]

                allRows.append(result)
                result = {}

            print(allRows)
        else: 
            return None
        
    except Exception as ex:
        print(ex)
        raise Exception(ex)
    
    db.close()
    
    return allRows



def emp_get_candidate_details(candidateId):
    
    try:
        db = mysqlconnection()
        print("connected")
        # prepare a cursor object using cursor() method
        cursor = db.cursor()

        sql = ("SELECT * FROM candidate_table WHERE candidate_id = %s")

        cursor.execute(sql,(candidateId,))
        #cursor.execute(sql)
        # Fetch all the rows in a list of lists.
        results = cursor.fetchall()


        if len(results) > 0:

            result = {}
            for row in results:
                result['candidate_name'] = row[2]
                result['candidate_contacts'] = row[9]
                result['candidate_emails'] = row[10]
                result['candidate_resumes'] = row[12]

            print(result)
        else: 
            return None
        
    except Exception as ex:
        raise Exception(ex)
    
    db.close()
    
    return result


def get_jobs_candidate(startDate,endDate,skills):
    if skills == None:
        try:
            db = mysqlconnection()
            print("connected")
            # prepare a cursor object using cursor() method
            cursor = db.cursor()

            sql = ("SELECT * FROM job_details_table WHERE job_created_date >= %s AND job_created_date <= %s AND job_status = %s")

            cursor.execute(sql,(startDate,endDate,'active'))
            #cursor.execute(sql)
            #Fetch all the rows in a list of lists.
            results = cursor.fetchall()

            if len(results) > 0:

                allRows = []
                result = {}
                for row in results:
                    result['job_id'] = row[0]
                    result['job_title'] = row[1]
                    result['job_description'] = row[2]
                    result['job_city'] = row[3]
                    result['job_state'] = row[4]
                    result['job_country'] = row[5]
                    result['job_industry'] = row[6]
                    result['job_salary'] = row[7]
                    result['job_experience'] = row[8]
                    result['job_type'] = row[9]
                    result['job_status'] = row[10]
                    result['job_created_date'] = row[11].strftime('%m/%d/%Y')
                    result['job_fulfilled_date'] = row[12]
                    result['job_qualifications'] = row[13]
                    result['job_skills'] = row[14]

                    allRows.append(result)
                    result = {}

                print(allRows)
            else: 
                return None
        
        except Exception as ex:
            print(ex)
            raise Exception(ex)
    
        db.close()
    
        return allRows
  
    if skills != None:

        #results = []
        db = mysqlconnection()
        print("connected")
        # prepare a cursor object using cursor() method
        cursor = db.cursor()
        
        for i in skills:
            try:

                sql = ("SELECT * FROM job_details_table WHERE job_skills LIKE %s AND job_created_date >= %s AND job_created_date <= %s AND job_status = %s")

                cursor.execute(sql,('%'+i+'%',startDate,endDate,'active'))
                #cursor.execute(sql)
                #Fetch all the rows in a list of lists.
                results = cursor.fetchall()
                allRows = []
                if len(results) > 0:

                   
                    result = {}
                    for row in results:
                        result['job_id'] = row[0]
                        result['job_title'] = row[1]
                        result['job_description'] = row[2]
                        result['job_city'] = row[3]
                        result['job_state'] = row[4]
                        result['job_country'] = row[5]
                        result['job_industry'] = row[6]
                        result['job_salary'] = row[7]
                        result['job_experience'] = row[8]
                        result['job_type'] = row[9]
                        result['job_status'] = row[10]
                        result['job_created_date'] = row[11].strftime('%m/%d/%Y')
                        result['job_fulfilled_date'] = row[12]
                        result['job_qualifications'] = row[13]
                        result['job_skills'] = row[14]

                        allRows.append(result)
                        result = {}

                    print(allRows)
                else: 
                    allRows

            except Exception as ex:
                print(ex)
                raise Exception(ex)
        return allRows


def apply_for_job(send_db):

    try:
        db = mysqlconnection()
        print("connected")
        # prepare a cursor object using cursor() method
        cursor = db.cursor()

        # Prepare SQL query to INSERT a record into the database.
        sql = """INSERT INTO candidate_job_mapping(job_id, candidate_id)
              VALUES(%s, %s)"""
        record = (send_db['jobId'], send_db['candidateId'])
        try:
           # Execute the SQL command
           cursor.execute(sql,record)
           # Commit your changes in the database
           db.commit()
           print('comitted')
        except Exception as ex:
           # Rollback in case there is any error
           print(ex)
           db.rollback()
       
        # disconnect from server
        print("closing")
        db.close()
        
    except Exception as ex:
        raise Exception(ex)

    return

def insert_into_client_query_info_table(send_db):

    try:
        db = mysqlconnection()
        print("connected")
        # prepare a cursor object using cursor() method
        cursor = db.cursor()

        # Prepare SQL query to INSERT a record into the database.
        sql = """INSERT INTO client_query_info_table(client_CompanyName, client_ApplicantName, client_ApplicantDesignation, client_ApplicantEmail, client_ApplicantContact, client_ServiceOpted, client_Query)
                VALUES(%s, %s, %s, %s, %s, %s, %s)"""
        record = (send_db['clientCompanyName'], send_db['clientApplicantName'], send_db['clientApplicantDesignation'], send_db['clientApplicantEmail'], send_db['clientApplicantContact'], send_db['clientServiceOpted'], send_db['clientQuery'])
        #sql = """INSERT INTO candidate_table(candidate_username,candidate_name)
                # VALUES(%s,%s)"""
        #record = (send_db['candidateUsername'],send_db['candidateName'])
    except Exception as ex:
        print(ex)
    try:
       # Execute the SQL command
       cursor.execute(sql,record)
       # Commit your changes in the database
       db.commit()
       print('comitted')
    except Exception as ex:
       # Rollback in case there is any error
       print(ex)
       db.rollback()
       
    # disconnect from server
    print("closing")
    db.close()
    
    
    
def updatecandidateresume(send_db):

    try:
        db = mysqlconnection()
        print("connected")
        # prepare a cursor object using cursor() method
        cursor = db.cursor()

        sql =  "UPDATE candidate_table SET candidate_resumes = %s WHERE candidate_emails = %s"

        record = (str(send_db['candidateResumes'][0]), send_db['candidate_email'])

        cursor.execute(sql,record)
        # Commit your changes in the database
        db.commit()
        print('comitted')

    except Exception as ex:
       # Rollback in case there is any error
       print(ex)
       db.rollback()
       
    # disconnect from server
    print("closing")
    db.close()







       

        
       
