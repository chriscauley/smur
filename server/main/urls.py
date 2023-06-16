from django.contrib import admin
from django.urls import path

from main.views import solve

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/solve/", solve),
]
