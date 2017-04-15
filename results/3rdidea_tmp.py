with open('results_3rd.csv') as datafile:
    lines = datafile.readlines()
count_sum = sum([float(line.split(',')[1]) for line in lines])

for line in lines:
    infos = line.split(',')
    print(infos[0] + '\t' + str(float(infos[1])/count_sum * 1000))
