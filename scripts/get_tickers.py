from api.models import FinancialArticle
import json


def get_tickers():
    tickers = list(map(
        lambda res: json.loads(res['tickers']),
        FinancialArticle.objects.all().values('tickers')
    ))
    t_set = set()
    for tk_list in tickers:
        t_set.update(tk_list)
    return t_set


def run():
    print(get_tickers())
