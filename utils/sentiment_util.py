import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from statistics import mean


class SentimentAnalyzer:

    def __init__(self):
        self.sia = SentimentIntensityAnalyzer()

    def analyze(self, text: str) -> float:
        scores = [
            self.sia.polarity_scores(sentence)["compound"]
            for sentence in nltk.sent_tokenize(text)
        ]
        if len(scores) == 0:
            return 0
        return mean(scores)
