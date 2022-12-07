import pandas as pd
import snscrape.modules.twitter as sntwitter

query_array = [['html', 'html5'], 'markdown',
               'css', 'SassCSS', 'getbootstrap', 'tailwindcss']


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
    print(snsquery)
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

  # Remove @, #, RT, links, and new line escape character. Done using regex substitution.
  # These do not add anything to polarity and sentiment and could confuse the algorithm.

  # def cleanTweets(tweet):
  #   tweet = re.sub('@[A-Za-z0-9_]+', '', tweet)
  #   tweet = re.sub('#', '', tweet)
  #   tweet = re.sub('RT[\s]+', '', tweet)
  #   tweet = re.sub('https?:\/\/\S+', '', tweet)
  #   tweet = re.sub('\n', ' ', tweet)
  #   return tweet

  # Apply cleanTweets to every single item in the tweets column

  # tweets_df['Cleaned Tweets'] = tweets_df['Tweets'].apply(cleanTweets)

  # Save this dataframe

  tweets_df.to_csv(f"{query}.csv", index=False)

for item in query_array:
  print(item)
  build_data(item)