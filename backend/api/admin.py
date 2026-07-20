from django.contrib import admin
from django.utils.html import format_html
from .models import Profile, Project, Skill, Experience, Education, ContactMessage

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'email', 'location', 'image_preview')
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.profile_image:
            return format_html('<img src="{}" style="max-height: 80px; border-radius: 6px;" />', obj.profile_image.url)
        return "No Image"
    image_preview.short_description = "Image Preview"

    # Limit Profile creation if one already exists
    def has_add_permission(self, request):
        if Profile.objects.exists():
            return False
        return super().has_add_permission(request)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_featured', 'order', 'technologies', 'image_preview')
    list_editable = ('is_featured', 'order')
    list_filter = ('is_featured',)
    search_fields = ('title', 'technologies', 'description')
    ordering = ('order', 'title')
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 60px; border-radius: 4px;" />', obj.image.url)
        return "No Image"
    image_preview.short_description = "Thumbnail"


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'order')
    list_editable = ('order',)
    list_filter = ('category',)
    search_fields = ('name',)
    ordering = ('category', 'order', 'name')


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('position', 'company', 'location', 'start_date', 'end_date', 'order')
    list_editable = ('order',)
    list_filter = ('location', 'company')
    search_fields = ('position', 'company', 'description')
    ordering = ('order', '-start_date')


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree', 'field_of_study', 'institution', 'start_date', 'end_date', 'order')
    list_editable = ('order',)
    search_fields = ('degree', 'field_of_study', 'institution')
    ordering = ('order', '-start_date')


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at', 'is_read')
    list_editable = ('is_read',)
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('name', 'email', 'subject', 'message', 'created_at')
    ordering = ('-created_at',)

    # Restrict modification of contact messages other than is_read
    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        # We allow change but fields are read-only, allowing marking as read
        return True
