# Manfred Tan

from pymongo import MongoClient
import datetime
from pprint import pprint

client = MongoClient('localhost', 27017)  # default mongo port is 27017
db = client["proj_4"]
globalTemp = db['globalTemp']
tempExtremes = db['tempExtremes']
