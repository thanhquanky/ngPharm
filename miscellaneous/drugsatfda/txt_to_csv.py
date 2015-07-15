import csv
def txt_to_csv(file_name):
	file_read = file_name + '.txt'
	fr = open(file_read, "r")
	file_write = file_name + ".csv"
	fw = open(file_write, "w")
	csvWriter = csv.writer(fw)
	data_array = fr.readlines()
	for i in range(len(data_array)):
		data_array[i] = data_array[i].split()
	csvWriter.writerows(data_array)
	fw.close()
txt_to_csv('AppDoc')