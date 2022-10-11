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
   DJANGO_SECRET_KEY='{our django key}'
   ```
6. run the following commands (on Windows): 
   ```
   python -m venv venv
   venv\Scripts\activate.bat
   pip install -r requirements.txt
   python manage.py migrate
   ```
7. open python terminal and run:
   ```
   >>> import nltk
   >>> nltk.download('all')
   ```
8. go to frontend/ and run:
   ```
   npm install --save --legacy-peer-deps
   npm run dev
   ```
9. run startup script 
   ```
   python manage.py runscript download_articles
   ```
10. run the server
   ```
   python manage.py runserver
   ```
