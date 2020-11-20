from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(max_length=128, widget=forms.TextInput(attrs={
        'class': 'show',
        'placeholder': 'name'
    }))
    email = forms.CharField(max_length=128, widget=forms.TextInput(attrs={
        'class': 'show',
        'placeholder': 'email'
    }))
    message = forms.CharField(max_length=1500, widget=forms.Textarea(attrs={
        'placeholder': 'Your Project details'
    }))