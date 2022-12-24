import csv
import os
import json

for dirName, subdirList, fileList in os.walk('.'):
    for fname in fileList:
        if fname.endswith('.csv'):
            with open(os.path.join(dirName, fname), encoding='utf-8') as csv_file:
                csv_reader = csv.DictReader(csv_file)
                data = []
                for row in csv_reader:
                    data.append(row)
                with open(os.path.join(dirName, fname.replace('.csv', '.json')), 'w') as json_file:
                    json.dump(data, json_file)