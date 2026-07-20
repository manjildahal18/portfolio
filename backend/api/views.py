from rest_framework import viewsets, permissions, filters
from .models import Profile, Project, Skill, Experience, Education, ContactMessage
from .serializers import (
    ProfileSerializer, ProjectSerializer, SkillSerializer,
    ExperienceSerializer, EducationSerializer, ContactMessageSerializer
)

class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows Profile details to be viewed.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows Projects to be viewed, searched, and filtered.
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'technologies', 'description']
    ordering_fields = ['order', 'title']
    ordering = ['order', 'title']

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by featured status: /api/projects/?is_featured=true
        is_featured = self.request.query_params.get('is_featured')
        if is_featured is not None:
            queryset = queryset.filter(is_featured=is_featured.lower() == 'true')
            
        # Filter by technology tag: /api/projects/?tech=React
        tech = self.request.query_params.get('tech')
        if tech:
            queryset = queryset.filter(technologies__icontains=tech.strip())
            
        return queryset


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows Skills to be viewed.
    """
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    filter_backends = [filters.OrderingFilter]
    ordering = ['category', 'order', 'name']

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by category: /api/skills/?category=Frontend
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__iexact=category.strip())
            
        return queryset


class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows Work Experience to be viewed.
    """
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    filter_backends = [filters.OrderingFilter]
    ordering = ['order', '-start_date']


class EducationViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows Education to be viewed.
    """
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    filter_backends = [filters.OrderingFilter]
    ordering = ['order', '-start_date']


class ContactMessageViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows public posting of contact messages,
    while restricting retrieval and modification to Admin users.
    """
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def get_permissions(self):
        # Allow anyone to submit a contact form
        if self.action == 'create':
            return [permissions.AllowAny()]
        # Restrict listing, viewing details, updating, and deleting to admin users
        return [permissions.IsAdminUser()]
