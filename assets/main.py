import pandas as pd
import snscrape.modules.twitter as sntwitter
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from transformers import pipeline
from wordcloud import WordCloud
from collections import Counter
import json
import os
import matplotlib.pyplot as plt
from pywaffle import Waffle
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('omw-1.4')

def use_transformer(tweet):
    specific_model = pipeline(model="cardiffnlp/twitter-roberta-base-sentiment-latest")
    sentiment_dict = specific_model(tweet)
    return [sentiment_dict[0]['label'], sentiment_dict[0]['score']]

def build_data(pass_query):
    if (type(pass_query) == list and len(pass_query) > 1):
        snsquery = f"({' OR '.join(pass_query)}) lang:en"
        query = pass_query[0]
    else:
        snsquery = pass_query + " lang:en"
        query = pass_query
    tweets = []
    print('currently on ' + snsquery)
    for tweet in sntwitter.TwitterSearchScraper(snsquery).get_items():
        if len(tweets) == 500:
            break
        tweets.append([tweet.date, tweet.content, tweet.user.username, tweet.id, tweet.url])
    tweets_df = pd.DataFrame(tweets, columns=['Date', 'Tweet', 'User', 'Tweet ID', 'Tweet Url'])

    def cleanTweets(tweet):
        tweet = re.sub(r'@[A-Za-z]+|#|RT[\s]+|https?:\/\/\S+|\n', '', tweet)
        tweet = tweet.lower().split()
        wl = WordNetLemmatizer()
        tweet = ' '.join([wl.lemmatize(word) for word in tweet if not word in set(stopwords.words('english'))])
        return tweet

    tweets_df['Cleaned Tweet'] = tweets_df['Tweet'].apply(cleanTweets)
    tweets_df['Sentiment'], tweets_df['Confidence'] = list(zip(*tweets_df.apply(lambda x: use_transformer(x['Cleaned Tweet']), axis=1)))
    tweets_df.to_json(f"{query.replace('#', '')}.json", orient="records", lines=True)
    tweets_df.to_csv(f"{query.replace('#', '')}.csv", index=False)
    print('Done with ' + query)

def generate_wordclouds():
    bad_words = ['vuejs', 'rubyonrails', '-', '|', '&', '+', ',', '_js', '_org', '/']
    for file in os.listdir('csv'):
        if file.endswith('.csv'):
            df = pd.read_csv(os.path.join('csv', file))
            words = df['Cleaned Tweet'].apply(lambda x: str(x).split())
            words = [word for sublist in words for word in sublist]
            file_name, file_ext = os.path.splitext(file)
            words = [word for word in words if word.replace('.', ' ').replace(' ', '').lower() not in file_name.replace(
                ' ', '').lower() and word not in bad_words]
            json_object = json.dumps(Counter(words))
            with open(f'./wordcounts/{file_name}.json', 'w') as file:
                file.write(json_object)
            # wordcloud = WordCloud().generate_from_frequencies(word_counts)
            # wordcloud.to_file(f'./wordcloud/{file_name}.png')

def waffle_maker():
    for file in os.listdir('csv'):
        if file.endswith('.csv'):
            df = pd.read_csv(os.path.join('csv', file))
            value_counts = df['Sentiment'].value_counts().to_frame().reindex(
                ['positive', 'negative', 'neutral'])
            fig = plt.figure(FigureClass=Waffle, rows=25, values=value_counts.Sentiment,
                             labels=['Positive', 'Negative', 'Neutral'], legend={'loc': 'upper left', 'bbox_to_anchor': (1.05, 1)})
            file_name, file_ext = os.path.splitext(file)
            plt.savefig(f'../public/waffles/{file_name}.png', bbox_inches='tight').close()

def main():
    query_array = [ "vitest", "playwrightweb", "fbjest", "Cypress_io", "storybookjs",
        'supabase', 'pocketbase', 'appwrite', 'awsamplify', 'cockroachdb', ['planetscale', 'planetscaledata'],
        ['@code', 'visualstudiocode', 'vsc', 'vs code'], 'VisualStudio',
        ['intellijidea', 'intellij'], "pycharm", "phpstorm", "neovim",
        ["javascript", "js", "ecmascript"], ["typescript", "ts"], "elmlang",
        ["nodejs", "node"], "deno_land",
        "react js", ["angular js", "@angular"], ["vue", "vuejs", "vue3"], ["svelte", "sveltejs"], "solid js", "alpine js",
        "stenciljs", ["lit js", "buildWithLit"], ["qwik", "qwik js", "QwikDev", "qwikcity"],
        "next js", ["astrodotbuild", "astro js"], ["remix js", "remix_run"], ["nuxt_js", "nuxt"],
        ["express js", "UseExpressJS"], ["fastify", "fastifyjs"], ["nestframework", "nest js"],
        ["strapijs", "strapi"], "jquery", "vite_js", "webpack", "rollupjs",
        ["python", "python3", "python2", "ThePSF"], "pythonflask", "djangoproject", "fastapi",
        ["html5", "html"], "css", "markdown", "SassCSS", "getbootstrap",  "tailwindcss",
        ["@java", "#java"], 'kotlin', ["springframework", "spring boot"],
        ["aspnet", "ASP.NET"], "#Blazor", ["official_php", "php"], ["laravelphp", "Laravel"],
        "golang", "rustlang", "dart_lang", ["FlutterDev", "Flutter framework"],
        ["@rails", "ruby on rails"], "SwiftLang", "codevapor", "elixirlang", "elixirphoenix",
        "mysql", "PostgreSQL", "SQLite", "mariadb", ["SQLServer", "microsoft sql server"],
        "MongoDB", ["Redisinc", "redis"],
        ["azure", "Microsoft Azure"], ["awscloud", "AWS", "amazon web services"],
        ["googlecloud", "Google Cloud Platform"], ["Firebase", "Firestore"],"heroku", "digitalocean",
        ["@Docker", "#Docker"], ["kubernetesio", "kubernetes"], "github", "Git", "powershell"]

    for item in query_array:
        build_data(item)

    generate_wordclouds()

    waffle_maker()
