import json, csv
from pymongo import MongoClient

client = MongoClient('localhost', 27017)  # default mongo port is 27017
database = client["proj_4"]

client.drop_database("proj_4") #deletes existing database before init.


# ADDING GLOBAL TEMPS
collection = database['globalTemp']
with open("globalTemp.csv", newline='') as data_file:
    #print(data_file)
    reader = csv.reader(data_file, delimiter=',')
    #print(reader)
    rowNum = 0
    for row in reader:
        #print(rowNum)
        if (rowNum > 4):
            #print(float(row[1]))
            #print(row)
            collection.insert_one({'year': float(row[0]), 'temp': float(row[1])})
        rowNum += 1
    #print(globalTempData)
    #collection.insert_many(globalTempData)
    #print(rowNum)


# ADDING EXTREME TEMPS
collection = database['tempExtremes']
with open('tempExtremes.csv', newline='') as data_file:
    reader = csv.reader(data_file, delimiter=',')
    rowNum = 0
    for row in reader:
        if (rowNum > 0):
            collection.insert_one({'year': float(row[0]), 'above': float(row[1]), 'below': float(row[2]) })
        rowNum += 1
    #print("done")


# ADDING FACTORY HEATS
collection = database['factory']
with open('industrialcombenergy-2014.csv', newline='') as data_file:
    reader = csv.reader(data_file, delimiter=',')
    rowNum = 0
    for row in reader:
        if (rowNum > 0):
            state = row[13]
            zip = row[14]
            MMBtu_total = float(row[20]) # total heat
            GWht_total = float(row[21]) # total energy
            collection.insert_one({'state':state, 'zip':zip, 'MMBtu_total':MMBtu_total, 'GWht_total':GWht_total})
        rowNum += 1

client.close()
