from django.db import models
from django.core.exceptions import ValidationError

class Profile(models.Model):
    """
    Singleton model representing the personal details of the developer.
    Enforces that only one record can be created in the database.
    """
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100, help_text="e.g. Senior Full Stack Engineer & Product Designer")
    description = models.TextField(help_text="Short, catchy introduction used in the Hero section.")
    biography = models.TextField(help_text="Detailed autobiography for the About page.")
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    resume_pdf = models.FileField(upload_to='resume/', blank=True, null=True, help_text="Upload your resume PDF.")
    email = models.EmailField()
    location = models.CharField(max_length=100, help_text="e.g. San Francisco, CA")
    github_url = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)
    interests = models.TextField(blank=True, help_text="List your interests/hobbies, e.g. Design, Photography, Open Source")

    def clean(self):
        # Prevent multiple Profile entries
        model_class = self.__class__
        if model_class.objects.exists() and self.pk != model_class.objects.first().pk:
            raise ValidationError("You can only have one Profile record. Please edit the existing record.")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Profile - {self.name}"

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profile"


class Project(models.Model):
    """
    Represents developer portfolio projects.
    """
    title = models.CharField(max_length=150)
    description = models.TextField(help_text="Brief project description for card view.")
    content = models.TextField(blank=True, help_text="Detailed project breakdown (Markdown supported).")
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    demo_url = models.URLField(blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    technologies = models.CharField(
        max_length=255, 
        help_text="Comma-separated list of technologies, e.g. React, Django, Tailwind CSS"
    )
    order = models.IntegerField(default=0, help_text="Sort order for display (lower values first).")

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['order', 'title']


class Skill(models.Model):
    """
    Represents professional skills categorized by layer.
    """
    CATEGORY_CHOICES = [
        ('Frontend', 'Frontend'),
        ('Backend', 'Backend'),
        ('Database', 'Database'),
        ('DevOps', 'DevOps'),
        ('Tools', 'Tools'),
    ]

    name = models.CharField(max_length=50)
    category = models.CharField(max_length=15, choices=CATEGORY_CHOICES)
    order = models.IntegerField(default=0, help_text="Sort order for display.")

    def __str__(self):
        return f"{self.name} ({self.category})"

    class Meta:
        ordering = ['category', 'order', 'name']


class Experience(models.Model):
    """
    Represents professional work history.
    """
    company = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    description = models.TextField(help_text="Responsibilities and achievements. Use newlines for bullet points.")
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True, help_text="Leave blank if current job.")
    location = models.CharField(max_length=100, help_text="e.g. Remote, San Francisco, CA")
    order = models.IntegerField(default=0, help_text="Sort order (lower values first, or sorted by date).")

    def __str__(self):
        return f"{self.position} at {self.company}"

    class Meta:
        ordering = ['order', '-start_date']


class Education(models.Model):
    """
    Represents academic and educational credentials.
    """
    institution = models.CharField(max_length=100)
    degree = models.CharField(max_length=100)
    field_of_study = models.CharField(max_length=100)
    grade = models.CharField(max_length=50, blank=True, null=True, help_text="e.g. GPA: 3.9/4.0 or First Class")
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True, help_text="Leave blank if current study.")
    description = models.TextField(blank=True, help_text="Honors, activities, or course highlights.")
    order = models.IntegerField(default=0, help_text="Sort order.")

    def __str__(self):
        return f"{self.degree} in {self.field_of_study} - {self.institution}"

    class Meta:
        ordering = ['order', '-start_date']
        verbose_name_plural = "Education"


class ContactMessage(models.Model):
    """
    Stores contact form submissions sent from the frontend.
    """
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=150)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Message from {self.name} - {self.subject}"

    class Meta:
        ordering = ['-created_at']
