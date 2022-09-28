Setup

1. clone the project
2. create an account for nyt archive api at https://developer.nytimes.com/docs/archive-product/1/overview
3. create an api key:
   1. go to account -> apps
   2. create an app and enable archive api
   3. get your api key
4. in the project folder create .env file
5. add the following lines and paste your key: 
   1. KEY_NYT='{your key}'
   2. DJANGO_SECRET_KEY = '{our django key}'
6. run the following commands (on Windows): 
   1. python3 -m venv venv
   2. venv\Scripts\activate.bat
   3. pip install -r requirements.txt
   4. python manage.py migrate
7. go to api/apps.py
8. uncomment two lines to fill the database
9. run the server: python manage.py runserver
10. run npm run dev in a new terminal window
