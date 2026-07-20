from django.test import TestCase
from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from .models import Profile, Project, Skill, Experience, Education, ContactMessage
from .serializers import ProjectSerializer

class ProfileModelTest(TestCase):
    def setUp(self):
        self.profile = Profile.objects.create(
            name="John Doe",
            title="Software Developer",
            description="Short description",
            biography="Long biography",
            email="john@example.com",
            location="San Francisco, CA"
        )

    def test_profile_creation(self):
        self.assertEqual(self.profile.name, "John Doe")
        self.assertEqual(str(self.profile), "Profile - John Doe")

    def test_profile_singleton_enforcement(self):
        # Attempting to create a second profile should raise ValidationError
        second_profile = Profile(
            name="Jane Doe",
            title="UI Designer",
            description="Short desc",
            biography="Long bio",
            email="jane@example.com",
            location="New York, NY"
        )
        with self.assertRaises(ValidationError):
            second_profile.save()


class ProjectSerializerTest(TestCase):
    def test_tech_list_parsing(self):
        project = Project.objects.create(
            title="Portfolio Website",
            description="My portfolio project",
            technologies="React, Django, Tailwind CSS, PostgreSQL",
            order=1
        )
        serializer = ProjectSerializer(project)
        # Verify comma-separated tags are parsed into a clean list
        self.assertEqual(
            serializer.data['tech_list'],
            ["React", "Django", "Tailwind CSS", "PostgreSQL"]
        )

    def test_tech_list_parsing_empty(self):
        project = Project.objects.create(
            title="Empty Tech Project",
            description="No techs listed",
            technologies="",
            order=2
        )
        serializer = ProjectSerializer(project)
        self.assertEqual(serializer.data['tech_list'], [])


class ContactMessageAPITest(APITestCase):
    def setUp(self):
        self.valid_payload = {
            "name": "Jane Miller",
            "email": "jane.m@example.com",
            "subject": "Inquiry about freelance services",
            "message": "Hello, I would like to work with you on a React project."
        }
        self.invalid_payload = {
            "name": "",
            "email": "invalid-email",
            "subject": "",
            "message": ""
        }
        # Create an admin user for permission testing
        self.admin_user = User.objects.create_superuser(
            username="admin",
            password="adminpassword",
            email="admin@example.com"
        )

    def test_create_contact_message_anonymous(self):
        response = self.client.post('/api/contact/', self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 1)
        self.assertEqual(ContactMessage.objects.first().name, "Jane Miller")

    def test_create_contact_message_invalid_data(self):
        response = self.client.post('/api/contact/', self.invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # Checks that specific errors are returned
        self.assertIn('name', response.data)
        self.assertIn('email', response.data)
        self.assertIn('subject', response.data)
        self.assertIn('message', response.data)

    def test_list_contact_messages_denied_to_anonymous(self):
        # Anonymous users should not be allowed to list messages
        response = self.client.get('/api/contact/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_contact_messages_allowed_to_admin(self):
        # Create a contact message
        ContactMessage.objects.create(
            name="Test User",
            email="test@example.com",
            subject="Test Subject",
            message="Test Message"
        )
        # Login as admin
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get('/api/contact/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Default pagination check (count key exists)
        self.assertIn('results', response.data)
        self.assertEqual(len(response.data['results']), 1)
