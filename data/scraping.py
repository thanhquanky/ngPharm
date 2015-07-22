from bs4 import BeautifulSoup
from urllib import urlopen
import json
from random import randint
def get_manufacturers():
	html_file = urlopen('pharmaceutical_companies.html')
	soup = BeautifulSoup(html_file, 'html5')
	column_list = []
	a_list = []
	mydivs = soup.find_all("div")
	for i in range(len(mydivs)):
		if 'class' in mydivs[i].attrs:
			if 'column-split' in mydivs[i]['class']:
				column_list.append(mydivs[i])
	for a_column in column_list:
		all_a = a_column.find_all('a')
		for an_a in all_a:
			a_list.append(an_a)
	#
	data = {}
	names = []
	for an_a in a_list:
		names.append({"name": str(an_a.contents[0]), "url": an_a['href']})
	data["manufacturers"] = names
	with open('manufacturer.json', 'w') as f:
	     json.dump(data, f)
def get_currencies():
	html_file = urlopen('Currency_codes.html')
	soup = BeautifulSoup(html_file, 'html5')
	my_tables = soup.find_all('table')[0]
	all_rows = my_tables.find_all('tbody')[0].find_all('tr')
	currency_list = []
	for a_row in all_rows:
		exported = {}
		row_data = a_row.find_all('td')
		exported['code'] = str(row_data[0].contents[0].contents[0])
		exported['name'] = row_data[1].contents[0]
		currency_list.append(exported)
	#
	data = {}
	data["currencies"] = currency_list
	with open('currency.json', 'w') as f:
		json.dump(data, f)
	print currency_list[0]
def get_drugs(file_name):
	html_file = urlopen('' + file_name)
	soup = BeautifulSoup(html_file, 'html5')
	drug_list = []
	tables = soup.find_all('table')[0:2]
	rows = tables[0].find_all('tr')[1:] + tables[1].find_all('tr')[1:]
	for a_row in rows:
		datas = a_row.find_all('td')
		a_drug = {}
		a_drug['manufacturer'] = randint(0, 9)
		a_drug['generic'] = datas[0].contents[0].replace('<br/>', '').replace('\n', '').replace('\t', '')
		a_drug['name'] = datas[1].contents[0].replace('<br/>', '').replace('\n', '').replace('\t', '')
		a_drug['use'] = datas[2].contents[0].replace('<br/>', '').replace('\n', '').replace('\t', '')
		drug_list.append(a_drug)
	return drug_list
def write_drugs():
	drug_list_1 = get_drugs('top_200_drugs_1.html')
	drug_list_2 = get_drugs('top_200_drugs_2.html')
	print len(drug_list_2)
	data = {}
	data["drugs"] = drug_list_1 + drug_list_2
	with open('drug.json', 'w') as f:
		json.dump(data, f)
write_drugs()