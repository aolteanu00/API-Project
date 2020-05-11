# proj4
## Project WildFire

### ROSTER
Alex Olteanu (PM)
- Supervise team, ensures deadlines
- helping with front end development

Biraj Chowdhury
- Working to visualize data with D3
- Front-end layouts

Connor Oh
- Working to visualize data with D3
- Using javascript to manipulate data

Manfred Tan
- Working with data sets and storing data
- Creating helper methods for data

## Description
- This is a project based on relating average temperature per state data and number of factories using combustion energy data to the number of wildfires in certain areas
- It will represented by a map of the USA and a pie chart
- For the USA Map, each state will show:
  * the number of wildfires during the selected month and year in each state
  * the average temperature in all states during the selected month and year
  * the number of factories using combustion energy during the selected month and year in each state
- For the Pie chart:
  * it will first show the percentage of states with wildfires during the selected month and year
  * then it will show the percentage of those states with wildfires that had an average temperature above 80
  * then it will show the percentage of those states with wildfires that had factories using combustion energy

## Datasets and APIs
Factories Dataset: https://data.world/us-doe-gov/19c607fa-1687-4bc4-a6dd-74b88b849644 <br />
Wildfire Dataset: https://firms.modaps.eosdis.nasa.gov/download <br />
Temperature Dataset: https://www.ncdc.noaa.gov/cag/global/time-series <br />
Extreme Tempuratures: https://www.ncdc.noaa.gov/extremes/cei/graph/us/01-12/1/data.csv <br />
Approximated Historial Tempurature Data1: https://www.climatelevels.org/files/nhtemp-moberg2005.txt <br />
Approximated Historial Tempurature Data2: https://www1.ncdc.noaa.gov/pub/data/paleo/contributions_by_author/christiansen2012/christiansen2012.txt <br />
Approximated Historial Tempurature Data3: https://www1.ncdc.noaa.gov/pub/data/paleo/contributions_by_author/shi2013/shi2013nh.txt <br />

## Instructions

Download the repo by cloning it
```
git clone https://github.com/aolteanu00/proj4.git
```

Enter the folder and download the requirements
```
cd proj4
pip install -r requirements.txt
```

Run the code
```
python __init__.py
```
