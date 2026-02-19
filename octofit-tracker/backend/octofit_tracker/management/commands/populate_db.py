from django.core.management.base import BaseCommand
from api.models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime, timedelta
import random


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing data...')
        
        # Delete existing data using Django ORM
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()
        
        self.stdout.write(self.style.SUCCESS('Existing data cleared!'))
        
        # Create Teams
        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(
            name='Team Marvel',
            description='Avengers assemble! The mightiest heroes defending Earth.'
        )
        team_dc = Team.objects.create(
            name='Team DC',
            description='Justice League united! Protecting humanity with power and justice.'
        )
        
        self.stdout.write(self.style.SUCCESS(f'Created teams: {team_marvel.name}, {team_dc.name}'))
        
        # Create Users (Superheroes)
        self.stdout.write('Creating superhero users...')
        
        marvel_heroes = [
            {'name': 'Tony Stark', 'email': 'ironman@avengers.com'},
            {'name': 'Steve Rogers', 'email': 'captainamerica@avengers.com'},
            {'name': 'Thor Odinson', 'email': 'thor@asgard.com'},
            {'name': 'Bruce Banner', 'email': 'hulk@avengers.com'},
            {'name': 'Natasha Romanoff', 'email': 'blackwidow@avengers.com'},
            {'name': 'Peter Parker', 'email': 'spiderman@avengers.com'},
        ]
        
        dc_heroes = [
            {'name': 'Clark Kent', 'email': 'superman@justiceleague.com'},
            {'name': 'Bruce Wayne', 'email': 'batman@justiceleague.com'},
            {'name': 'Diana Prince', 'email': 'wonderwoman@justiceleague.com'},
            {'name': 'Barry Allen', 'email': 'flash@justiceleague.com'},
            {'name': 'Arthur Curry', 'email': 'aquaman@justiceleague.com'},
            {'name': 'Hal Jordan', 'email': 'greenlantern@justiceleague.com'},
        ]
        
        users = []
        for hero in marvel_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                team=team_marvel.name
            )
            users.append(user)
        
        for hero in dc_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                team=team_dc.name
            )
            users.append(user)
        
        self.stdout.write(self.style.SUCCESS(f'Created {len(users)} superhero users'))
        
        # Create Activities
        self.stdout.write('Creating activities...')
        activity_types = ['Running', 'Cycling', 'Swimming', 'Weightlifting', 'Yoga', 'Boxing']
        activities = []
        
        for user in users:
            # Create 5-10 activities per user
            num_activities = random.randint(5, 10)
            for i in range(num_activities):
                activity_type = random.choice(activity_types)
                duration = random.randint(30, 120)
                calories = duration * random.randint(5, 10)
                days_ago = random.randint(0, 30)
                
                activity = Activity.objects.create(
                    user_email=user.email,
                    activity_type=activity_type,
                    duration=duration,
                    calories=calories,
                    date=datetime.now() - timedelta(days=days_ago)
                )
                activities.append(activity)
        
        self.stdout.write(self.style.SUCCESS(f'Created {len(activities)} activities'))
        
        # Create Leaderboard entries
        self.stdout.write('Creating leaderboard entries...')
        
        for user in users:
            user_activities = Activity.objects.filter(user_email=user.email)
            total_calories = sum(a.calories for a in user_activities)
            total_activities_count = user_activities.count()
            
            Leaderboard.objects.create(
                user_email=user.email,
                user_name=user.name,
                team=user.team,
                total_calories=total_calories,
                total_activities=total_activities_count
            )
        
        self.stdout.write(self.style.SUCCESS(f'Created {len(users)} leaderboard entries'))
        
        # Create Workouts
        self.stdout.write('Creating workout suggestions...')
        
        workouts_data = [
            {
                'name': 'Super Soldier Training',
                'description': 'High-intensity workout inspired by Captain America',
                'activity_type': 'Weightlifting',
                'difficulty': 'Hard',
                'estimated_duration': 60,
                'estimated_calories': 500
            },
            {
                'name': 'Spider Agility Drills',
                'description': 'Quick reflexes and agility training like Spider-Man',
                'activity_type': 'Running',
                'difficulty': 'Medium',
                'estimated_duration': 45,
                'estimated_calories': 400
            },
            {
                'name': 'Asgardian Strength',
                'description': 'Build godlike strength with Thor-inspired exercises',
                'activity_type': 'Weightlifting',
                'difficulty': 'Hard',
                'estimated_duration': 90,
                'estimated_calories': 700
            },
            {
                'name': 'Flash Speed Run',
                'description': 'Sprint training to channel your inner speedster',
                'activity_type': 'Running',
                'difficulty': 'Hard',
                'estimated_duration': 30,
                'estimated_calories': 350
            },
            {
                'name': 'Atlantean Swimming',
                'description': 'Aquatic workout for underwater endurance',
                'activity_type': 'Swimming',
                'difficulty': 'Medium',
                'estimated_duration': 60,
                'estimated_calories': 450
            },
            {
                'name': 'Bat Combat Training',
                'description': 'Martial arts and combat skills training',
                'activity_type': 'Boxing',
                'difficulty': 'Hard',
                'estimated_duration': 75,
                'estimated_calories': 600
            },
            {
                'name': 'Amazon Warrior Yoga',
                'description': 'Balance and flexibility with warrior poses',
                'activity_type': 'Yoga',
                'difficulty': 'Easy',
                'estimated_duration': 45,
                'estimated_calories': 200
            },
            {
                'name': 'Iron Man Endurance',
                'description': 'Build stamina for long battles',
                'activity_type': 'Cycling',
                'difficulty': 'Medium',
                'estimated_duration': 60,
                'estimated_calories': 500
            },
        ]
        
        for workout_data in workouts_data:
            Workout.objects.create(**workout_data)
        
        self.stdout.write(self.style.SUCCESS(f'Created {len(workouts_data)} workouts'))
        
        self.stdout.write(self.style.SUCCESS('\n=== Database population completed! ==='))
        self.stdout.write(f'Teams: {Team.objects.count()}')
        self.stdout.write(f'Users: {User.objects.count()}')
        self.stdout.write(f'Activities: {Activity.objects.count()}')
        self.stdout.write(f'Leaderboard entries: {Leaderboard.objects.count()}')
        self.stdout.write(f'Workouts: {Workout.objects.count()}')
