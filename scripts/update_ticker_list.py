from typing import List, Dict
from pathlib import Path
from api.models import FinancialArticle
import json
import requests


def fetch_company_name(ticker: str) -> str:
    data = requests.get(f'https://api.tickertick.com/tickers?p={ticker}').json()
    return data['tickers'][0]['company_name']


def get_all_tickers_in_db() -> List[Dict[str, str]]:
    tickers = list(map(
        lambda res: json.loads(res['tickers']),
        FinancialArticle.objects.all().values('tickers')
    ))
    t_set = set()
    for tk_list in tickers:
        t_set.update(tk_list)
    companies = []
    for ticker in t_set:
        companies.append({
            "ticker": ticker,
            "company_name": fetch_company_name(ticker)
        })
    return companies


def write_json_to_file(data):
    path = Path(__file__).parent.parent.joinpath('frontend', 'src', 'data', 'tickers.json')
    with open(path, "w") as outfile:
        outfile.write(json.dumps({'ticker_list': data}))


def run():
    data = get_all_tickers_in_db()
    write_json_to_file(data)

