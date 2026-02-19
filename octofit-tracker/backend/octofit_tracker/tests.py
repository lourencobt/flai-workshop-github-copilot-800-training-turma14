from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime


class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            name="Test User",
            email="test@example.com",
            team="Test Team"
        )

    def test_user_creation(self):
        self.assertEqual(self.user.name, "Test User")
        self.assertEqual(self.user.email, "test@example.com")
        self.assertEqual(self.user.team, "Test Team")
        self.assertIsNotNone(self.user._id)


class TeamModelTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(
            name="Test Team",
            description="Test Description"
        )

    def test_team_creation(self):
        self.assertEqual(self.team.name, "Test Team")
        self.assertEqual(self.team.description, "Test Description")
        self.assertIsNotNone(self.team._id)


class ActivityModelTest(TestCase):
    def setUp(self):
        self.activity = Activity.objects.create(
            user_email="test@example.com",
            activity_type="Running",
            duration=30,
            calories=300,
            date=datetime.now()
        )

    def test_activity_creation(self):
        self.assertEqual(self.activity.user_email, "test@example.com")
        self.assertEqual(self.activity.activity_type, "Running")
        self.assertEqual(self.activity.duration, 30)
        self.assertEqual(self.activity.calories, 300)
        self.assertIsNotNone(self.activity._id)


class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.leaderboard = Leaderboard.objects.create(
            user_email="test@example.com",
            user_name="Test User",
            team="Test Team",
            total_calories=1000,
            total_activities=10
        )

    def test_leaderboard_creation(self):
        self.assertEqual(self.leaderboard.user_email, "test@example.com")
        self.assertEqual(self.leaderboard.user_name, "Test User")
        self.assertEqual(self.leaderboard.total_calories, 1000)
        self.assertEqual(self.leaderboard.total_activities, 10)
        self.assertIsNotNone(self.leaderboard._id)


class WorkoutModelTest(TestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name="Morning Run",
            description="A nice morning run",
            activity_type="Running",
            difficulty="Medium",
            estimated_duration=30,
            estimated_calories=300
        )

    def test_workout_creation(self):
        self.assertEqual(self.workout.name, "Morning Run")
        self.assertEqual(self.workout.activity_type, "Running")
        self.assertEqual(self.workout.difficulty, "Medium")
        self.assertEqual(self.workout.estimated_duration, 30)
        self.assertIsNotNone(self.workout._id)


class APIEndpointsTest(APITestCase):
    def test_api_root(self):
        response = self.client.get('/api/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)
