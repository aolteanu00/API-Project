#get the data from txt file
def getData(pathToData):
    arr = []
    try:
        f = open(pathToData)
        data = f.readlines()
        for line in data:
            date = int(line.split()[0])
            temp = float(line.split()[1])
            arr.append([date,temp])
        return arr
    except (RuntimeError):
        print(RuntimeError)


#print(getData("tempReconstructions/mobergReconstruction.txt")[1000])
#print(getData("tempReconstructions/christiansenReconstruction.txt")[1000])
#print(getData("tempReconstructions/shiReconstruction.txt")[0])
