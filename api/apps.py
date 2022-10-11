from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    # uncomment to run the startup script
    # after running comment it out
    # def ready(self):
    #     run_download_script()





