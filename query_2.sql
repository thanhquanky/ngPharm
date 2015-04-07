CREATE TABLE user(
	username
	password
	first_name
	last_name
	gender
	birth_date
	address
	phone_number
	is_staff
	PRIMARY KEY (username)
);
CREATE TABLE vendor(
	name
	email
	address
	phone_number
	PRIMARY KEY (name)
);
CREATE TABLE unit(
	unit_id
	unit_name
	PRIMARY KEY (unit_id)
);
CREATE TABLE drug(
	drug_id
	drug_name
	usage
	side_effect
	warning
	PRIMARY KEY (drug_id)
);
CREATE TABLE drug_item(
	drug_id
	expiration_date
	imported_date
	quantity_left
	FOREIGN KEY (drug_id) REFERENCES drug(drug_id),
	PRIMARY KEY(drug_id)
);
CREATE TABLE patient(
	patient_id
	first_name
	last_name
	email
	phone_number
	birth_date
	PRIMARY KEY (patient_id)
);
CREATE TABLE invoice(
	invoice_id
	imported_date
	vendor
	FOREIGN KEY (vendor) REFERENCES vendor(name),
	PRIMARY KEY (invoice_id)
);
CREATE TABLE invoice_item(
	invoice_id
	drug_id
	expiration_date
	unit
	quantity
	cost
	FOREIGN KEY (invoice_id) REFERENCES invoice(invoice_id),
	PRIMARY KEY (invoice_id, drug_id, expiration_date)
);
CREATE TABLE disease(
	disease_id
	name
	cause
	PRIMARY KEY (disease_id)
);
CREATE TABLE to_buy_list(
	drug_id
	quantity
	FOREIGN KEY (drug_id) REFERENCES drug(drug_id)
);	
CREATE TABLE prescription(
	prescription_id
	disease_id
	patient_id
	FOREIGN KEY (patient_id) REFERENCES patient(patient_id),
	FOREIGN KEY (disease_id) REFERENCES disease(disease_id),
	PRIMARY KEY (prescription_id)
);
CREATE TABLE prescription_item(
	prescription_id
	drug_id
	unit_id
	quantity
	FOREIGN KEY (drug_id) REFERENCES drug(drug_id),
	FOREIGN KEY (unit_id) REFERENCES unit(unit_id),
	FOREIGN KEY (prescription_id) REFERENCES prescription(prescription_id)
);	

