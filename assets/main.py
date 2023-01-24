import pandas as pd
import snscrape.modules.twitter as sntwitter
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from transformers import pipeline
# nltk.download('stopwords')
# nltk.download('wordnet')
# nltk.download('omw-1.4')

def build_data(pass_query):
    specific_model = pipeline(model="cardiffnlp/twitter-roberta-base-sentiment-latest")

    def cleanTweets(tweet):
        rand_chars = ['-', '|', '&', '+', ',', '/', '\\']
        tweet = re.sub(r'@[A-Za-z]+|#|RT[\s]+|https?:\/\/\S+|\n', '', tweet)
        tweet = tweet.lower().split()
        wl = WordNetLemmatizer()
        tweet = ' '.join([wl.lemmatize(word) for word in tweet if not word in set(stopwords.words('english')) and not word in rand_chars])
        return tweet

    if (type(pass_query) == list and len(pass_query) > 1):
        snsquery = f"({' OR '.join(pass_query)}) lang:en"
        query = pass_query[0]
    else:
        snsquery = pass_query + " lang:en"
        query = pass_query
    tweets = []
    success_count = 0

    for tweet in sntwitter.TwitterSearchScraper(snsquery).get_items():
        if success_count == 15:
            break
        sentiment_dict = specific_model(tweet.content)
        sentiment, confidence = [sentiment_dict[0]['label'], sentiment_dict[0]['score']]
        if sentiment == "positive" or sentiment == "negative":
            success_count +=1
            tweets.append([tweet.date, tweet.content, tweet.user.username, tweet.id, tweet.url, cleanTweets(tweet.content),
            sentiment, confidence])
    tweets_df = pd.DataFrame(tweets,
        columns=['Date', 'Tweet', 'User', 'Tweet ID', 'Tweet Url', 'Cleaned Tweet', 'Sentiment', 'Confidence'])
    tweets_df.to_json(f"json/{query}.json", orient="records", force_ascii=False)
    tweets_df.to_csv(f"csv/{query}.csv", index=False)
    print('Finished ' + query)

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

if __name__ == "__main__":
    main()