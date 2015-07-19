from bs4 import BeautifulSoup
from urllib import urlopen
import json
def get_manufacturers():
	html_file = urlopen('')
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
		names.append({"name": str(an_a.contents[0])})
	data["manufacturers"] = names
	with open('manufacturer.json', 'w') as f:
	     json.dump(data, f)
get_manufacturers()