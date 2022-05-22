from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import ast
import re
import mysql.connector


relevtags=['Hobbies','HOBBIES','ExtraCurricularActivities','Activites','ACTIVITIES','Projects','PROJECTS','WORK','Work','ACHIEVEMENTS','Achievements','SKILLS','Skills','Experience','EXPERIENCE','Qualification','QUALIFICATION','Education','EDUCATION','EDUCATIONAL','Educational']

def mysqlconnection():
    db = mysql.connector.connect(host='jyopa.com',database='jyopawebsite',user='jyopac',password='JyopaConnexion@123')
    return db

@csrf_exempt
def getResumeData(request):
    if request.method == "GET":
        result = {}
        result['res'] = request.GET
        return HttpResponse(content = json.dumps(result),status=201)

@csrf_exempt
def extractResumeData(request):
    if request.method == "GET":
        result = {}
        text = request.GET['resumeData'] 
        num2 = re.sub(r'[\n]', "", text)
        slist = num2.split()
        edu=extracteducation(slist)
        skill=extractskills(slist)
        result['education'] = edu
        result['skill'] = skill

    return HttpResponse(content = json.dumps(result),status=201)

def extracteducation(s):
    global relevtags
    text=""
    for i in range(0,len(s)):
        temp=str(s[i]).strip()
        #print(i)

        if not temp.find("EDUCATION") or not temp.find("EDUCATIONAL") or not temp.find("Education") or not temp.find("Educational") or not temp.find("QUALIFICATION"):
            #print(temp)
            #print("found")
            for j in range(i+1,len(s)):
                if str(s[j]).strip() not in relevtags:
                    text=text+str(s[j]).strip()+" "
                else:
                    break
        else:

            continue
    return text

def extractskills(s):
    global relevtags
    text=""
    for i in range(0,len(s)):
        temp=str(s[i]).strip()
        #print(i)

        if not temp.find("SKILLS") or not temp.find("Skills"):
            #print(temp)
            #print("found")
            for j in range(i+1,len(s)):
                if str(s[j]).strip() not in relevtags:
                    text=text+str(s[j]).strip()+" "
                else:
                    break
        else:

            continue
    return text


def getResumes(request):
    
    #print(request.method)
    if request.method == "GET":

        db = mysqlconnection()
        cursor = db.cursor()
        eid = request.GET['id']
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

        
        return HttpResponse(content = json.dumps(result),status=201)

