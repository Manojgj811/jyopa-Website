from django.urls import path
from.import views
from.import emproutes
#from .views import redirect_view


urlpatterns = [
    path('home/',views.home,name='home'),
    path('team/',views.team,name='team'),
    path('jobseeker/',views.jobseeker,name='jobseeker'),
    path('login/',views.login,name='login'),
    path('candidateregister/',views.candidateregister,name='candidateregister'),
    path('generalresumetable/',views.generalresumetable,name='generalresumetable'),
    path('candidatelogin/',views.candidatelogin,name='candidatelogin'),
    path('candidate/',views.candidate,name='candidate'),
    path('getcandidatedetails/',views.getcandidatedetails,name='getcandidatedetails'),
    path('emplogin/',views.emplogin,name='emplogin'),
    path('emplogincheck/',emproutes.emplogincheck,name='emplogincheck'),
    path('emppostjob/',emproutes.emppostjob,name='emppostjob'),
    path('empgetjobs/',emproutes.empgetjobs,name='empgetjobs'),
    path('getapplicants/',emproutes.getapplicants,name='getapplicants'),
    path('empgetcandidatedetails/',emproutes.empgetcandidatedetails,name='empgetcandidatedetails'),
    path('employee/',views.employee,name='employee'),
    path('candidateGetJobs/',views.candidateGetJobs,name='candidateGetJobs'),
    path('applytojob/',views.applytojob,name='applytojob'),
    path('clientqueryinfotable/',views.clientqueryinfotable,name='clientqueryinfotable'),
    path('candidateupdateresume/',views.candidateupdateresume,name='candidateupdateresume'),

    
]

