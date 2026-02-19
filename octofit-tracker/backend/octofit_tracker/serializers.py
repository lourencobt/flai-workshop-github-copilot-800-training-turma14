from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout


class UserSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'team', 'created_at']

    def get_id(self, obj):
        return str(obj._id)


class TeamSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Team
        fields = ['id', 'name', 'description', 'created_at']

    def get_id(self, obj):
        return str(obj._id)


class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Activity
        fields = ['id', 'user_email', 'activity_type', 'duration', 'calories', 'date', 'created_at']

    def get_id(self, obj):
        return str(obj._id)


class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Leaderboard
        fields = ['id', 'user_email', 'user_name', 'team', 'total_calories', 'total_activities', 'last_updated']

    def get_id(self, obj):
        return str(obj._id)


class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'activity_type', 'difficulty', 'estimated_duration', 'estimated_calories', 'created_at']

    def get_id(self, obj):
        return str(obj._id)
