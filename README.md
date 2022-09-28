# Setup

1. clone the project
2. create an account for NYT archive [api](https://developer.nytimes.com/docs/archive-product/1/overview)
3. create an api key:
   1. go to account -> apps
   2. create an app and enable archive api
   3. get your api key
4. in the project folder create .env file
5. add the following lines and paste your key: 
   ```
   KEY_NYT='{your key}'
   DJANGO_SECRET_KEY = '{our django key}'
   ```
6. run the following commands (on Windows): 
   ```
   python3 -m venv venv
   venv\Scripts\activate.bat
   pip install -r requirements.txt
   python manage.py migrate
   ```
8. go to api/apps.py
9. uncomment two lines to run the startup script
10. run the server: ```python manage.py runserver```
11. run ```npm run dev``` in a new terminal window
