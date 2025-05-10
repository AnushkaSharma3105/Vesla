from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import SensorData

def home(request):
    latest_data = SensorData.objects.last()
    return render(request, 'core/index.html', {'data': latest_data})

def about(request):
    return render(request, 'core/about.html')

def contact(request):
    if request.method == 'POST':
        # Process form data
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        
        # Here you would typically:
        # 1. Validate data
        # 2. Send email/store in database
        # 3. Return JSON response for AJAX or redirect
        
        messages.success(request, 'Message sent successfully!')
        return redirect('contact')  # Redirect to prevent form resubmission
    
    return render(request, 'core/contact.html')

def products(request):
    return render(request, 'core/products.html')

def dashboard(request):
    if not request.user.is_authenticated:
        # Redirect to auth project's login with next parameter
        return redirect('http://127.0.0.1:8080/auth/login/?next=/dashboard/')
    all_data = SensorData.objects.order_by('-timestamp')[:10]
    return render(request, 'core/dashboard.html', {'all_data': all_data})