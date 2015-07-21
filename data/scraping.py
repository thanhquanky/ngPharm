from bs4 import BeautifulSoup
from urllib import urlopen
import json
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
	# print str(a_list[0].contents[0])
	# Push into data
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
def get_drugs():
	html_file = urlopen('drugs.html')
	soup = BeautifulSoup(html_file, 'html5')
	my_table = soup.find_all("table")[0]
	print my_table.attrs
	# all_rows = my_table.find_all('tbody')[0].find_all('tr')
	# print len(all_rows)
get_drugs()