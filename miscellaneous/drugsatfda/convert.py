import csv
import re
def txt_to_array(file_name):
	file_read = file_name + '.txt'
	fr = open(file_read, "r")
	data_array = fr.readlines()
	return data_array
def fix_array(file_name):
	data_array = txt_to_array(file_name)
	headers = data_array[0]
	# data_array = data_array[1:]
	notgood = 0
	for i in range(len(data_array)):
		element = data_array[i]
		if ';' in element:
			index = element.find(';')
			element = element[:index] + '/' + element[index + 1:]
		element = re.split('\s+', element)
		if len(element) < 9:
			continue
		# print element[4]
		if not element[4].isdigit():
			element[3] = element[3] + element[4]
			element[4] = element[5]
		data_array[i] = element
	# print data_array
	print notgood
	return data_array
def txt_to_csv(file_name):
	data_array = fix_array(file_name)
	file_write = file_name + ".csv"
	fw = open(file_write, "w")
	csvWriter = csv.writer(fw)
	csvWriter.writerows(data_array)
	fw.close()
# txt_to_csv('AppDoc')
# txt_to_csv('AppDocType_Lookup')
# txt_to_csv('application')
# txt_to_csv('ChemTypeLookup')
# txt_to_csv('DocType_lookup')
txt_to_csv('Product')
# txt_to_csv('Product_tecode')
# txt_to_csv('RegActionDate')
# txt_to_csv('ReviewClass_Lookup')
