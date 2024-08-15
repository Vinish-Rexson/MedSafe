




from django.contrib import admin
from django.urls import path
from hospital import views
from django.contrib.auth.views import LoginView,LogoutView
from django.conf import settings
from django.conf.urls.static import static



#-------------FOR ADMIN RELATED URLS
urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.home_view,name=''),



    path('aboutus', views.aboutus_view),
    path('contactus', views.contactus_view),
    path('publicgraph', views.publicgraph,name='publicgraph'),


    path('adminclick', views.adminclick_view),
    path('doctorclick', views.doctorclick_view),
    path('patientclick', views.patientclick_view),

    path('adminlogin', views.admin_signup_view),
    path('doctorlogin', views.doctor_signup_view,name='doctorsignup'),
    path('patientlogin', views.patient_signup_view),
    
    path('adminlogin', LoginView.as_view(template_name='admin_login.html')),
    path('doctorlogin', LoginView.as_view(template_name='doctor_login.html')),
    path('patientlogin', LoginView.as_view(template_name='patient_login.html')),


    path('afterlogin', views.afterlogin_view,name='afterlogin'),
    path('logout/', LogoutView.as_view(template_name='index.html'),name='logout'),


    path('admin-dashboard', views.admin_dashboard_view,name='admin-dashboard'),

    path('admin-doctor', views.admin_doctor_view,name='admin-doctor'),
    path('admin-view-doctor', views.admin_view_doctor_view,name='admin-view-doctor'),
    path('delete-doctor-from-hospital/<int:pk>', views.delete_doctor_from_hospital_view,name='delete-doctor-from-hospital'),
    path('update-doctor/<int:pk>', views.update_doctor_view,name='update-doctor'),
    path('admin-add-doctor', views.admin_add_doctor_view,name='admin-add-doctor'),
    path('admin-approve-doctor', views.admin_approve_doctor_view,name='admin-approve-doctor'),
    path('approve-doctor/<int:pk>', views.approve_doctor_view,name='approve-doctor'),
    path('reject-doctor/<int:pk>', views.reject_doctor_view,name='reject-doctor'),
    path('admin-view-doctor-specialisation',views.admin_view_doctor_specialisation_view,name='admin-view-doctor-specialisation'),


    path('admin-patient', views.admin_patient_view,name='admin-patient'),
    path('admin-view-patient', views.admin_view_patient_view,name='admin-view-patient'),
    path('delete-patient-from-hospital/<int:pk>', views.delete_patient_from_hospital_view,name='delete-patient-from-hospital'),
    path('update-patient/<int:pk>', views.update_patient_view,name='update-patient'),
    path('admin-add-patient', views.admin_add_patient_view,name='admin-add-patient'),
    path('admin-approve-patient', views.admin_approve_patient_view,name='admin-approve-patient'),
    path('approve-patient/<int:pk>', views.approve_patient_view,name='approve-patient'),
    path('reject-patient/<int:pk>', views.reject_patient_view,name='reject-patient'),
    path('admin-discharge-patient', views.admin_discharge_patient_view,name='admin-discharge-patient'),
    path('discharge-patient/<int:pk>', views.discharge_patient_view,name='discharge-patient'),
    path('download-pdf/<int:pk>', views.download_pdf_view,name='download-pdf'),
    path('admin-patient-report-view', views.admin_patient_report_view,name='admin-patient-report'),
    path('admin-patient-report/<int:pk>', views.admin_patient_report_generate,name='admin-patient-report'),


    path('admin-appointment', views.admin_appointment_view,name='admin-appointment'),
    path('admin-view-appointment', views.admin_view_appointment_view,name='admin-view-appointment'),
    path('admin-add-appointment', views.admin_add_appointment_view,name='admin-add-appointment'),
    path('admin-approve-appointment', views.admin_approve_appointment_view,name='admin-approve-appointment'),
    path('approve-appointment/<int:pk>', views.approve_appointment_view,name='approve-appointment'),
    path('reject-appointment/<int:pk>', views.reject_appointment_view,name='reject-appointment'),
    path('availability',views.availability_view,name='availability'),
    path('avail-doctor/<int:pk>',views.avail_doctor,name='avail-doctor'),
    path('unavail-doctor/<int:pk>',views.unavail_doctor,name='unavail-doctor'),
    path('report-pdf/<int:pk>', views.report_pdf_view,name='report-pdf'),
    path('admin-manage', views.manage_videos, name='admin-manage'),
    path('admin-delete/<int:video_id>/', views.delete_video, name='admin-delete'),

]


#---------FOR DOCTOR RELATED URLS-------------------------------------
urlpatterns +=[
    path('doctor-dashboard', views.doctor_dashboard_view,name='doctor-dashboard'),
    path('search', views.search_view,name='search'),

    path('doctor-patient', views.doctor_patient_view,name='doctor-patient'),
    path('doctor-view-patient', views.doctor_view_patient_view,name='doctor-view-patient'),
    path('doctor-view-discharge-patient',views.doctor_view_discharge_patient_view,name='doctor-view-discharge-patient'),

    path('doctor-appointment', views.doctor_appointment_view,name='doctor-appointment'),
    path('doctor-view-appointment', views.doctor_view_appointment_view,name='doctor-view-appointment'),
    path('doctor-delete-appointment',views.doctor_delete_appointment_view,name='doctor-delete-appointment'),
    path('delete-appointment/<int:pk>', views.delete_appointment_view,name='delete-appointment'),
    path('1-1_chat_doctor', views.one_on_onechat_doctor,name='1-1_chat_doctor'),
    path('doctor-upload', views.upload_video, name='doctor-upload'),
    path('doctor-chat-view', views.doctor_chat_view, name='doctor-chat-view'),
]




#---------FOR PATIENT RELATED URLS-------------------------------------
urlpatterns +=[

    path('patient-dashboard', views.patient_dashboard_view,name='patient-dashboard'),
    path('patient-appointment', views.patient_appointment_view,name='patient-appointment'),
    path('patient-book-appointment', views.patient_book_appointment_view,name='patient-book-appointment'),
    path('patient-view-appointment', views.patient_view_appointment_view,name='patient-view-appointment'),
    path('patient-view-doctor', views.patient_view_doctor_view,name='patient-view-doctor'),
    path('searchdoctor', views.search_doctor_view,name='searchdoctor'),
    path('patient-discharge', views.patient_discharge_view,name='patient-discharge'),
    path('patient_medtube', views.patient_medtube,name='patient_medtube'),
    path('patient-report-view', views.patient_report_view,name='patient-report-view'),
    path('patient-reports', views.patient_reports,name='patient-reports'),
    path('chat_bot', views.chat_gemini, name='chat_gemini'),
    path('patient-graph', views.patient_graph,name='patient-graph'),
    path('1-1_chat', views.one_on_onechat,name='1-1_chat'),
    path('patient-chat-view', views.patient_chat_view, name='doctor-chat-view'),
    path('report-searchdoctor', views.search_doctor_reports_view,name='report-searchdoctor'),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)