from dataclasses import fields
from rest_framework import serializers

from .models import CandidatesAPplied, Job


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'


class CandidatesAppliedSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidatesAPplied
        fields = ('user', 'resume', 'appliedAt', 'job')
