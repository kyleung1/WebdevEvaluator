import pandas as pd
import snscrape.modules.twitter as sntwitter
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from transformers import pipeline
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('omw-1.4')


def use_transformer(tweet):
    specific_model = pipeline(
        model="cardiffnlp/twitter-roberta-base-sentiment-latest")
    sentiment_dict = specific_model(tweet)
    return [sentiment_dict[0]['label'], sentiment_dict[0]['score']]


def build_data(pass_query):
    lang = "lang:en"
    if (type(pass_query) == list and len(pass_query) > 1):
        snsquery = f"({' OR '.join(pass_query)}) {lang}"
        query = pass_query[0]
    else:
        snsquery = pass_query + " " + lang
        query = pass_query
    tweets = []
    limit = 500

    print('currently on ' + snsquery)

    for tweet in sntwitter.TwitterSearchScraper(snsquery).get_items():
        if len(tweets) == limit:
            break

        tweets.append([tweet.date, tweet.content,
                      tweet.user.username, tweet.id, tweet.url])

    tweets_df = pd.DataFrame(
        tweets, columns=['Date', 'Tweet', 'User', 'Tweet ID', 'Tweet Url'])

    def cleanTweets(tweet):
        tweet = re.sub(r'@[A-Za-z]+|#|RT[\s]+|https?:\/\/\S+|\n', '', tweet)
        tweet = tweet.lower()
        tweet = tweet.split()
        wl = WordNetLemmatizer()
        tweet = ' '.join([wl.lemmatize(word) for word in tweet if not word in set(
            stopwords.words('english'))])
        return tweet

    tweets_df['Cleaned Tweet'] = tweets_df['Tweet'].apply(cleanTweets)
    tweets_df['Sentiment'], tweets_df['Confidence'] = list(
        zip(*tweets_df.apply(lambda x: use_transformer(x['Cleaned Tweet']), axis=1)))

    tweets_df.to_json(f"{query}.json", orient="records", lines=True)

    tweets_df.to_csv(f"{query}.csv", index=False)

    print('Done with ' + query)

def main():
    query_array = [
        "webpack",
        "rollupjs",
        "stenciljs",
        "vitest",
        "playwrightweb",
        "fbjest",
        "Cypress_io",
        "storybookjs",
        "elmlang",
        'supabase',
        'pocketbase',
        'appwrite',
        'awsamplify',
        'cockroachdb',
        ['planetscale', 'planetscaledata'],
        'kotlin',
        ['@code', 'visualstudiocode', 'vsc', 'vs code'],
        'VisualStudio',
        ['intellijidea', 'intellij'],
        "pycharm",
        "phpstorm",
        "neovim",
        ["javascript", "js", "ecmascript"],
        ["typescript", "ts"],
        ["nodejs", "node"],
        "deno_land",
        "react js",
        ["angular js", "@angular"],
        ["vue", "vuejs", "vue3"],
        ["svelte", "sveltejs"],
        "solid js",
        "alpine js",
        ["lit js", "buildWithLit"],
        ["qwik", "qwik js", "QwikDev", "qwikcity"],
        "next js",
        ["astrodotbuild", "astro js"],
        ["fastify", "fastifyjs"],
        ["remix js", "remix_run"],
        ["express js", "UseExpressJS"],
        ["nestframework", "nest js"],
        ["nuxt_js", "nuxt"],
        ["strapijs", "strapi"],
        "vite_js",
        "jquery",
        ["python", "python3", "python2", "ThePSF"],
        "pythonflask",
        "djangoproject",
        "fastapi",
        ["html5", "html"],
        "css",
        "markdown",
        "SassCSS",
        "getbootstrap",
        "tailwindcss",
        ["@java", "#java"],
        ["springframework", "spring boot"],
        ["aspnet", "ASP.NET"],
        "#Blazor",
        ["official_php", "php"],
        ["laravelphp", "Laravel"],
        "golang",
        "rustlang",
        "dart_lang",
        ["FlutterDev", "Flutter framework"],
        ["@rails", "ruby on rails"],
        "SwiftLang",
        "codevapor",
        "elixirlang",
        "elixirphoenix",
        "mysql",
        "PostgreSQL",
        "SQLite",
        ["SQLServer", "microsoft sql server"],
        "mariadb",
        "MongoDB",
        ["Redisinc", "redis"],
        ["awscloud", "AWS", "amazon web services"],
        ["googlecloud", "Google Cloud Platform"],
        ["azure", "Microsoft Azure"],
        ["Firebase", "Firestore"],
        "heroku",
        "digitalocean",
        ["@Docker", "#Docker"],
        ["kubernetesio", "kubernetes"],
        "github",
        "Git",
        "powershell"
    ]

    for item in query_array:
        build_data(item)

if __name__ == "__main__":
    main()