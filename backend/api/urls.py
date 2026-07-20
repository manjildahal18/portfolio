from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProfileViewSet, ProjectViewSet, SkillViewSet,
    ExperienceViewSet, EducationViewSet, ContactMessageViewSet
)

# Initialize DRF Router
router = DefaultRouter()
router.register(r'profile', ProfileViewSet, basename='profile')
router.register(r'projects', ProjectViewSet, basename='projects')
router.register(r'skills', SkillViewSet, basename='skills')
router.register(r'experience', ExperienceViewSet, basename='experience')
router.register(r'education', EducationViewSet, basename='education')
router.register(r'contact', ContactMessageViewSet, basename='contact')

# Wire up URLs using include
urlpatterns = [
    path('', include(router.urls)),
]
