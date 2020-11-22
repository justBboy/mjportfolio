from django.shortcuts import render
from .models import Project
from .forms import ContactForm
from django.http import JsonResponse
import json
from django.core.mail import send_mail, BadHeaderError

def home_view(request):
    projects = Project.objects.all()
    form = ContactForm()
    return render(request, 'index.html', {'projects': projects, 'form': form})


def contact_view(request):
    if request.method == "POST":
        post_data = json.loads(request.body.decode('utf-8'))
        print(post_data)
        form = ContactForm(post_data)
        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']
            try:
                send_mail(name, f'from {email}, {message}' ,'bornscience1@gmail.com', ['asaregid506@gmail.com'], fail_silently=False)
            except BadHeaderError:
                return JsonResponse({"error": "there was an error, try again"}, status=400)
            return JsonResponse({'success': 'Your message has been sent'})
        else:
            return JsonResponse({"error": "fill the form with correct data"}, status=400)