import pandas as pd
import snscrape.modules.twitter as sntwitter
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from textblob import TextBlob
from transformers import pipeline
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('omw-1.4')

query_array = [['html', 'html5']]

def use_transformer(tweet):
  specific_model = pipeline(model="cardiffnlp/twitter-roberta-base-sentiment-latest")
  sentiment_dict = specific_model(tweet)
  return [sentiment_dict[0]['label'], sentiment_dict[0]['score']]

def build_data(pass_query):
  snsquery = ''
  query = ''
  lang = "lang:en"
  if(type(pass_query) == list):
    for index, item in enumerate(pass_query):
      if (index == 0):
        query = item
        snsquery = "(" + item
      else:
        snsquery = snsquery + " OR " + item
    snsquery = snsquery + ") " + lang
  else:
    query = pass_query
    snsquery = pass_query + " " + lang
  tweets = []
  limit = 500

  for tweet in sntwitter.TwitterSearchScraper(snsquery).get_items():

      if len(tweets) == limit:
          break

      tweets.append([tweet.date, tweet.content,
                    tweet.user.username, tweet.id, tweet.url])

  tweets_df = pd.DataFrame(
      tweets, columns=['Date', 'Tweet', 'User', 'Tweet ID', 'Tweet Url'])

  def cleanTweets(tweet):
    tweet = re.sub('@[A-Za-z]+', '', tweet)
    tweet = re.sub('#', '', tweet)
    tweet = re.sub('RT[\s]+', '', tweet)
    tweet = re.sub('https?:\/\/\S+', '', tweet)
    tweet = re.sub('\n', ' ', tweet)
    tweet = tweet.lower()
    tweet = tweet.split()
    wl = WordNetLemmatizer()
    tweet = [wl.lemmatize(word) for word in tweet if not word in set(stopwords.words('english'))]
    tweet = ' '.join(tweet)
    return tweet

  tweets_df['Cleaned Tweet'] = tweets_df['Tweet'].apply(cleanTweets)
  tweets_df['Sentiment'], tweets_df['Confidence'] = list(zip(*tweets_df.apply(lambda x: use_transformer(x['Cleaned Tweet']), axis = 1)))

  tweets_df.to_csv(f"{query}.csv", index=False)

for item in query_array:
  build_data(item)