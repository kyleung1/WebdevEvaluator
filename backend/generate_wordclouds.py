import os
import pandas as pd
from wordcloud import WordCloud
from collections import Counter
import json

directory = 'csv'

for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.csv'):
            df = pd.read_csv(os.path.join(root, file))

            column = df['Cleaned Tweet']

            words = column.apply(lambda x: str(x).split())

            words = [word for sublist in words for word in sublist]

            file_name, file_ext = os.path.splitext(file)

            words = [word for word in words if word.replace('.', ' ').replace(' ', '').lower() not in file_name.replace(' ', '').lower() and word != 'vuejs' and word != 'rubyonrails']

            word_counts = Counter(words)

            json_object = json.dumps(word_counts)

            with open(f'./wordcounts/{file_name}.json', 'w') as file:
                file.write(json_object)

            # wordcloud = WordCloud().generate_from_frequencies(word_counts)

            # wordcloud.to_file(f'./wordcloud/{file_name}.png')

            # print(file + ' done')
