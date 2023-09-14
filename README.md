Warehouse Management System.
The Warehouse Management System can be accessed by 3 different user roles. The system user roles are Administrator, Supplier Staff, and Customer Staff. Each of the roles has different permissions or restrictions from each other. Users are required to log in with their valid user credentials in order to gain access to the features and functionalities of the system according to their roles.
The Supplier Staff Users and Customer Staff User are mostly view-only features only. Supplier Staff can list all the suppliers and incoming goods or stock of the business while the Customer Staff can list all the customers and outgoing goods or stocks.
Features
Management-Site
•	Home Page
•	Display the summary
•	Low Stock Goods List/Notification
•	Supplier Management
•	Add New Supplier
•	List All Suppliers
•	Edit/Update Supplier Details
•	Delete Supplier
•	Supplier Management
•	Add New Supplier
•	List All Suppliers
•	Edit/Update Supplier Details
•	Delete Supplier
•	Customer Management
•	Add New Customer
•	List All Customers
•	Edit/Update Customer Details
•	Delete Customer
•	Supplier Management
•	Add New Supplier
•	List All Suppliers
•	Edit/Update Supplier Details
•	Delete Supplier
•	User Management
•	Add New User
•	List All Users
•	Edit User Details
•	Delete User Details
•	Stock or Goods Management
•	Add New Stock or Good
•	List All Stock or Goods
•	Edit Stock or Good Details
•	Delete Stock or Good Details
•	Transaction Management
•	Add New Incoming Goods
•	List All Incoming Goods Record
•	Add New Outgoing Goods
•	List All Outgoing Goods Record
•	List All Goods Adjustment Record
•	Reports
•	Generate Printable Incoming Goods Report
•	Generate Printable Outgoing Goods Report
•	Generate Printable Goods Adjustment Report
•	Export Incoming Goods List as PDF
•	Export Outgoing Goods List as PDF
•	Export Goods Adjustment List as PDF
•	Update System Information
•	Update Password
•	Login and Logout

Let's start with the project structure for the Warehouse Management System (WMS) using TypeScript as the frontend, Express.js as the backend, and MongoDB as the database.
(Typescript is superset of Javascript)

Warehouse -management-system/
backend/
 controllers/ 
It is responsible for handling the business logic for each route.

models/
 Includes the Database Models using mongoose to define the schema and interact with the mongoDB database.

routes/
Contains the route handlers for different API endpoints.
App.ts
Main file that initializes the express.js application, sets up middlewares and define routes
Frontend/
public/
Includes static assets like HTML,CSS, and client-side Javascript files.
src/
It includes Typescript files for the frontend application.
Tsconfig.json 
Typescript configuration file for the frontend.
Package.json
Readme.md

Backend Dependicies
Express-> Backend web framework
mongoose ->Mongodb object Modelling for NodeJS
body-parser->middleware to parse incoming request bodies
Cors->middlewares for enabling cross-origin resource sharing 
Bcrypt-> For hashing and Salting user passwords.
Jsonwebtokens: For generating and verifying JSON WEB Tokens for user authentication 

FrontEnd Dependicies:  
Axios: For making HTTP requests to the backend API
React: frontend library for building User Interfaces
React-router-dom: For Handling frontend routing.



admin: This table stores information about administrators of the system. It includes fields such as username, password, name, address, email, phone number, IP address, online status, role level, status, and creation/update timestamps.

admin_level: This table defines different levels of administrators, such as "Administrator," "Staff Supplier," and "Staff Customer." Each level has a name, status, and creation/update timestamps.

customer: This table stores customer information, including ID, name, address, phone number, and creation/update timestamps.

identitas: This table holds identity information for the warehouse management system, such as website details, contact information, and social media links.

limitstock: This table defines the stock limit for the warehouse.

master_barang: This table stores information about different items or products in the warehouse, including ID, name, brand, stock, and creation/update timestamps.

supplier: This table contains details about suppliers, including ID, name, address, phone number, and creation/update timestamps.

transaksi_barang: This table records transactions involving items in the warehouse. It includes fields like transaction ID, quantity, transaction date, status (in or out), item ID, admin user, supplier ID, and customer ID.

sessions: This table stores session information for users, including session ID, IP address, user agent, last activity timestamp, and user data.

The structure and relationships among these tables suggest a system for managing various warehouse operations, including adding and updating administrators, tracking inventory levels, managing suppliers and customers, and recording transactions involving items.








npm install jspdf jspdf-autotable





-- Create the admin table
CREATE TABLE admin (
  admin_user varchar(25) PRIMARY KEY,
  admin_pass varchar(50) NOT NULL,
  admin_nama varchar(30) NOT NULL,
  admin_alamat varchar(250) NOT NULL,
  admin_email varchar(100) NOT NULL,
  admin_telepon varchar(15) NOT NULL,
  admin_ip varchar(12) NOT NULL,
  admin_online int NOT NULL,
  admin_level_kode int NOT NULL,
  admin_status varchar(100) NOT NULL,
  admin_created timestamp NOT NULL DEFAULT current_timestamp(),
  admin_updated timestamp NOT NULL DEFAULT current_timestamp()
);

-- Create the admin_level table
CREATE TABLE admin_level (
  admin_level_kode serial PRIMARY KEY,
  admin_level_nama varchar(30) NOT NULL,
  admin_level_status char(1) NOT NULL,
  admin_level_created timestamp NOT NULL DEFAULT current_timestamp(),
  admin_level_updated timestamp NOT NULL DEFAULT current_timestamp()
);

-- Create the customer table
CREATE TABLE customer (
  id_customer serial PRIMARY KEY,
  nama_customer varchar(100) NOT NULL,
  alamat_customer varchar(100) NOT NULL,
  notelp_customer varchar(12) NOT NULL,
  customer_created timestamp NOT NULL DEFAULT current_timestamp(),
  customer_updated timestamp NOT NULL DEFAULT current_timestamp()
);

-- Create the identitas table
CREATE TABLE identitas (
  identitas_id serial PRIMARY KEY,
  identitas_website varchar(250) NOT NULL,
  identitas_deskripsi text NOT NULL,
  identitas_keyword text NOT NULL,
  identitas_alamat varchar(250) NOT NULL,
  identitas_notelp char(20) NOT NULL,
  identitas_fb varchar(100) NOT NULL,
  identitas_email varchar(100) NOT NULL,
  identitas_tw varchar(100) NOT NULL,
  identitas_gp varchar(100) NOT NULL,
  identitas_yb varchar(100) NOT NULL,
  identitas_favicon varchar(250) NOT NULL,
  identitas_author varchar(100) NOT NULL,
  identitas_created timestamp NOT NULL DEFAULT current_timestamp(),
  identitas_updated timestamp NOT NULL DEFAULT current_timestamp()
);

-- Create the limitstock table
CREATE TABLE limitstock (
  limitstock_id serial PRIMARY KEY,
  stock int NOT NULL,
  limitstock_created timestamp NOT NULL DEFAULT current_timestamp(),
  limitstock_updated timestamp NOT NULL DEFAULT current_timestamp()
);

-- Create the master_barang table
CREATE TABLE master_barang (
  id_barang serial PRIMARY KEY,
  nama_barang varchar(255) NOT NULL,
  merek varchar(255) NOT NULL,
  stock int NOT NULL,
  barang_created timestamp NOT NULL DEFAULT current_timestamp(),
  barang_updated timestamp NOT NULL DEFAULT current_timestamp()
);

-- Create the sessions table
CREATE TABLE sessions (
  session_id varchar(40) PRIMARY KEY,
  ip_address varchar(16) NOT NULL,
  user_agent varchar(120) NOT NULL,
  last_activity bigint NOT NULL DEFAULT 0,
  user_data text NOT NULL
);

-- Create the supplier table
CREATE TABLE supplier (
  id_supplier serial PRIMARY KEY,
  nama_supplier varchar(100) NOT NULL,
  alamat_supplier varchar(100) NOT NULL,
  notelp_supplier varchar(12) NOT NULL,
  supplier_created timestamp NOT NULL DEFAULT current_timestamp(),
  supplier_updated timestamp NOT NULL DEFAULT current_timestamp()
);

-- Create the transaksi_barang table
CREATE TABLE transaksi_barang (
  id_transaksi serial PRIMARY KEY,
  jumlah int,
  tanggal_transaksi timestamp,
  transaksi_updated timestamp NOT NULL DEFAULT current_timestamp(),
  status_pergerakan char(1) NOT NULL,
  id_barang int NOT NULL,
  admin_user varchar(119) NOT NULL,
  id_supplier int NOT NULL,
  id_customer int NOT NULL
);

-- Insert data into admin_level
INSERT INTO admin_level (admin_level_nama, admin_level_status, admin_level_created, admin_level_updated)
VALUES
  ('Administrator', 'A', current_timestamp, current_timestamp),
  ('Staff Supplier', 'A', current_timestamp, current_timestamp),
  ('Staff Customer', 'A', current_timestamp, current_timestamp);

-- Insert data into master_barang
INSERT INTO master_barang (nama_barang, merek, stock, barang_created, barang_updated)
VALUES
  ('Test Item', 'Test Brand', 80, current_timestamp, current_timestamp),
  ('Item 01', 'B ONE', 1, current_timestamp, current_timestamp),
  ('Item 02', 'B ONE', 192, current_timestamp, current_timestamp),
  ('Item 03', 'B TWO', 111, current_timestamp, current_timestamp),
  ('Item 04', 'B THREE', 80, current_timestamp, current_timestamp),
  ('Item 05', 'B FOUR', 268, current_timestamp, current_timestamp),
  ('Product 101', 'Brand 101', 70, current_timestamp, current_timestamp);

-- Insert data into supplier
INSERT INTO supplier (nama_supplier, alamat_supplier, notelp_supplier, supplier_created, supplier_updated)
VALUES
  ('XYZ Suppliers', '774 Black Street', '45478540', current_timestamp, current_timestamp),
  ('Ultimate Suppliers', '550 Allace Avenue', '01478500', current_timestamp, current_timestamp),
  ('Verion Supplies', '558 Black Street', '01478540', current_timestamp, current_timestamp),
  ('Avant Suppliers', '440 Enim St', '04550010', current_timestamp, current_timestamp),
  ('Pegasus Suppliers', '5514 Eros Avenue', '40145550', current_timestamp, current_timestamp),
  ('QWER Suppliers', '7741 D Street', '41000140', current_timestamp, current_timestamp),
  ('Supplier 101', 'Test supplier', '09123564789', current_timestamp, current_timestamp);

-- Insert data into customer
INSERT INTO customer (nama_customer, alamat_customer, notelp_customer, customer_created, customer_updated)
VALUES
  ('John Watson', '855 Rosemary St', '46552000', current_timestamp, current_timestamp),
  ('Jack Stuart', '854 Louis St', '04522260', current_timestamp, current_timestamp),
  ('Douglas Stover', '17 Lake Forest Drive', '06665210', current_timestamp, current_timestamp),
  ('Curtis Maury', '1342 Wayside Lane', '10458600', current_timestamp, current_timestamp),
  ('Betty Wright', '1205 Cardinal Lane', '01478000', current_timestamp, current_timestamp),
  ('George', '19 Gerald Bates Drive', '03690005', current_timestamp, current_timestamp),
  ('Richard', '469 Providence Lane', '01478005', current_timestamp, current_timestamp),
  ('Casie Dixon', '361 Bassel St', '02580014', current_timestamp, current_timestamp),
  ('Will Williams', '4569 Down St', '45654000', current_timestamp, current_timestamp),
  ('Customer 101', 'Sample Address 101', '0931456789', current_timestamp, current_timestamp);

-- Insert data into identitas
INSERT INTO identitas (identitas_website, identitas_deskripsi, identitas_keyword, identitas_alamat, identitas_notelp, identitas_fb, identitas_email, identitas_tw, identitas_gp, identitas_yb, identitas_favicon, identitas_author, identitas_created, identitas_updated)
VALUES
  ('http://www.example.com', 'Example Description', 'example, sample, demo', '1234 Elm Street', '(123) 456-7890', 'http://www.facebook.com/example', 'info@example.com', 'http://www.twitter.com/example', 'http://plus.google.com/+example', 'http://www.youtube.com/example', 'http://www.example.com/favicon.ico', 'Example Author', current_timestamp, current_timestamp);

-- Insert data into limitstock
INSERT INTO limitstock (stock, limitstock_created, limitstock_updated)
VALUES
  (100, current_timestamp, current_timestamp);

-- Insert data into admin
INSERT INTO admin (admin_user, admin_pass, admin_nama, admin_alamat, admin_email, admin_telepon, admin_ip, admin_online, admin_level_kode, admin_status, admin_created, admin_updated)
VALUES
  ('admin', 'adminpass', 'Admin User', '1234 Elm Street', 'admin@example.com', '1234567890', '192.168.1.1', 1, 1, 'Active', current_timestamp, current_timestamp);





More MeaningFul Database

Table admin {
  username varchar(25) [primary key]
  password varchar(50) [not null]
  full_name varchar(30) [not null]
  element varchar(250) [not null]
  email varchar(100) [not null]
  telephone varchar(15) [not null]
  ip_address varchar(12) [not null]
  is_online int [not null]
  admin_level_code int [not null, ref: > admin_level.admin_level_code]
  status varchar(100) [not null]
  created_at timestamp [not null]
  updated_at timestamp [not null]
}

Table role {
  role_code serial [primary key]
  role_name varchar(30) [not null]
  status char(1) [not null]
  created_at timestamp [not null]
  updated_at timestamp [not null]
}
Table customer {
  customer_id serial [primary key]
  name varchar(100) [not null]
  address varchar(100) [not null]
  phone varchar(12) [not null]
  created_at timestamp [not null, default: "current_timestamp"]
  updated_at timestamp [not null, default: "current_timestamp"]
}

Table identity {
  identity_id serial [primary key]
  website varchar(250) [not null]
  description text [not null]
  keywords text [not null]
  address varchar(250) [not null]
  contact_number char(20) [not null]
  facebook varchar(100) [not null]
  email varchar(100) [not null]
  twitter varchar(100) [not null]
  google_plus varchar(100) [not null]
  youtube varchar(100) [not null]
  favicon varchar(250) [not null]
  author varchar(100) [not null]
  created_at timestamp [not null, default: "current_timestamp"]
  updated_at timestamp [not null, default: "current_timestamp"]
}

Table stock_limit {
  limit_id serial [primary key]
  available_stock int [not null]
  created_at timestamp [not null, default: "current_timestamp"]
  updated_at timestamp [not null, default: "current_timestamp"]
}

Table product {
  product_id serial [primary key]
  product_name varchar(255) [not null]
  brand varchar(255) [not null]
  current_stock int [not null]
  created_at timestamp [not null, default: "current_timestamp"]
  updated_at timestamp [not null, default: "current_timestamp"]
}

Table session {
  session_id varchar(40) [not null, default: '0']
  ip_address varchar(16) [not null, default: '0']
  user_agent varchar(120) [not null]
  last_activity int [not null, default: 0]
  user_data text [not null]
}

Table supplier {
  supplier_id serial [primary key]
  supplier_name varchar(100) [not null]
  supplier_address varchar(100) [not null]
  supplier_phone varchar(12) [not null]
  created_at timestamp [not null, default: "current_timestamp"]
  updated_at timestamp [not null, default: "current_timestamp"]
}

Table transaction {
  transaction_id serial [primary key]
  quantity int
  transaction_date timestamp [default: "current_timestamp"]
  transaction_updated timestamp [not null, default: "current_timestamp"]
  movement_status char(1) [not null]
  product_id int [not null, ref: > product.product_id]
  admin_username varchar(119) [not null, ref: > admin.username]
  supplier_id int [not null, ref: > supplier.supplier_id]
  customer_id int [not null, ref: > customer.customer_id]
}

Table incoming_transaction {
  incoming_id serial [primary key]
  transaction_id int [not null, ref: > transaction.transaction_id]
  incoming_updated timestamp [not null, default: "current_timestamp"]
  supplier_id int [not null, ref: > supplier.supplier_id]
}

Table outgoing_transaction {
  outgoing_id serial [primary key]
  transaction_id int [not null, ref: > transaction.transaction_id]
  outgoing_updated timestamp [not null, default: "current_timestamp"]
  customer_id int [not null, ref: > customer.customer_id]
}

























1.	admin Table:
•	Connected to: admin_level Table (via admin_level_kode)
•	Connected to: transaksi_barang Table (via admin_user)
2.	admin_level Table:
•	Connected to: admin Table (via admin_level_kode)
3.	customer Table:
•	Connected to: transaksi_barang Table (via id_customer)
4.	identitas Table:
•	Not directly connected to other tables (holds general identity information for the application)
5.	limitstock Table:
•	Connected to: master_barang Table (via id_barang)
6.	master_barang Table:
•	Connected to: limitstock Table (via id_barang)
•	Connected to: transaksi_barang Table (via id_barang)
7.	sessions Table:
•	Not directly connected to other tables (stores session information)
8.	supplier Table:
•	Connected to: transaksi_barang Table (via id_supplier)
9.	transaksi_barang Table:
•	Connected to: admin Table (via admin_user)
•	Connected to: customer Table (via id_customer)
•	Connected to: supplier Table (via id_supplier)
•	Connected to: master_barang Table (via id_barang)





1.	Transaksi_Barang Table:
•	The transaksi_barang table tracks the movement of goods, including out-going goods.
•	The status_pergerakan column indicates whether the movement is "masuk" (incoming) or "keluar" (outgoing) for each transaction.
•	Outgoing goods transactions are identified with a status_pergerakan value of '2'.
•	The id_barang column associates the transaction with a specific product (item) in the master_barang table.
•	The jumlah column indicates the quantity of goods being moved.
2.	Master_Barang Table:
•	The master_barang table stores information about different products or items.
•	The id_barang column is used to uniquely identify each product.
•	The nama_barang column holds the name or description of the product.
3.	Customer and Supplier Relationships:
•	Outgoing goods transactions are typically associated with customers or suppliers.
•	In the transaksi_barang table, the id_customer column represents the customer receiving the outgoing goods, while the id_supplier column represents the supplier involved.
4.	Status and Timestamps:
•	The tanggal_transaksi column records the date and time of the outgoing goods transaction.
•	The transaksi_updated column records the last update timestamp for the transaction.





1.	Customer User Role:
•	Create a separate user role specifically for customers.
•	Customers will have limited access and privileges compared to administra-tors or staff.
•	Customers should only be able to view products, add items to their cart, and make purchases.
2.	User Authentication and Authorization:
•	Implement user authentication and authorization mechanisms to ensure that customers can log in securely.
•	Customers should only have access to their own account and the functionali-ties meant for them.
3.	User Interface for Customers:
•	Design a user-friendly interface for customers where they can browse and search for products.
•	Provide options to view product details, add items to the cart, and proceed to checkout.
4.	Shopping Cart and Checkout:
•	Implement a shopping cart functionality where customers can add products and review their selections before making a purchase.
•	Provide a secure checkout process for customers to enter shipping infor-mation, payment details, and complete the purchase.
5.	Product Availability and Pricing:
•	Ensure that customers can see accurate information about product availabil-ity and pricing.
•	Display real-time or near-real-time stock levels to prevent overselling.
6.	Order History and Tracking:
•	Customers should be able to view their order history and track the status of their orders.
•	Provide order confirmation emails and tracking information to keep custom-ers informed.
7.	Privacy and Security:
•	Implement proper security measures to protect customer data, such as sen-sitive account information and payment details.
8.	Customer Support:
•	Offer customer support channels (e.g., email, chat, or phone) for customers to get assistance with their orders or any issues they encounter.




Updated Database

Table admin {
  username varchar(25) [primary key]
  password varchar(50) [not null]
  full_name varchar(30) [not null]
  element varchar(250) [not null]
  email varchar(100) [not null]
  telephone varchar(15) [not null]
  ip_address varchar(12) [not null]
  is_online int [not null]
  admin_level_code int [not null, ref: > role.role_code]
  status varchar(100) [not null]
  created_at timestamp [not null]
  updated_at timestamp [not null]
}

Table role {
  role_code serial [primary key]
  role_name varchar(30) [not null]
  status char(1) [not null]
  created_at timestamp [not null]
  updated_at timestamp [not null]
}

Table customer {
  customer_id serial [primary key]
  name varchar(100) [not null]
  address varchar(100) [not null]
  phone varchar(12) [not null]
  created_at timestamp [not null, default: "current_timestamp"]
  updated_at timestamp [not null, default: "current_timestamp"]
}

Table identity {
  identity_id serial [primary key]
  website varchar(250) [not null]
  description text [not null]
  keywords text [not null]
  address varchar(250) [not null]
  contact_number char(20) [not null]
  facebook varchar(100) [not null]
  email varchar(100) [not null]
  twitter varchar(100) [not null]
  google_plus varchar(100) [not null]
  youtube varchar(100) [not null]
  favicon varchar(250) [not null]
  author varchar(100) [not null]
  created_at timestamp [not null, default: "current_timestamp"]
  updated_at timestamp [not null, default: "current_timestamp"]
}

Table stock_limit {
  limit_id serial [primary key]
  available_stock int [not null]
  created_at timestamp [not null, default: "current_timestamp"]
  updated_at timestamp [not null, default: "current_timestamp"]
}

Table product {
  product_id serial [primary key]
  product_name varchar(255) [not null]
  brand varchar(255) [not null]
  current_stock int [not null]
  created_at timestamp [not null, default: "current_timestamp"]
  updated_at timestamp [not null, default: "current_timestamp"]
}

Table session {
  session_id varchar(40) [not null, default: '0']
  ip_address varchar(16) [not null, default: '0']
  user_agent varchar(120) [not null]
  last_activity int [not null, default: 0]
  user_data text [not null]
}

Table supplier {
  supplier_id serial [primary key]
  supplier_name varchar(100) [not null]
  supplier_address varchar(100) [not null]
  supplier_phone varchar(12) [not null]
  created_at timestamp [not null, default: "current_timestamp"]
  updated_at timestamp [not null, default: "current_timestamp"]
}

Table transaction {
  transaction_id serial [primary key]
  quantity int
  transaction_date timestamp [default: "current_timestamp"]
  transaction_updated timestamp [not null, default: "current_timestamp"]
  movement_status varchar(8) [not null]
  product_id int [not null, ref: > product.product_id]
  admin_username varchar(119) [not null, ref: > admin.username]
  supplier_id int [not null, ref: > supplier.supplier_id]
  customer_id int [not null, ref: > customer.customer_id]
}

Table incoming_transaction {
  incoming_id serial [primary key]
  transaction_id int [not null, ref: > transaction.transaction_id]
  incoming_updated timestamp [not null, default: "current_timestamp"]
  supplier_id int [not null, ref: > supplier.supplier_id]
}

Table outgoing_transaction {
  outgoing_id serial [primary key]
  transaction_id int [not null, ref: > transaction.transaction_id]
  outgoing_updated timestamp [not null, default: "current_timestamp"]
  customer_id int [not null, ref: > customer.customer_id]
}




Role Numeric Identifiers: Define numeric identifiers for the roles, for example:
•	Admin: 1
•	Customer: 2








Super admin
Admin->multiple
Staff


USE datawarehouse


my-app/
├── backend/
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── productController.js
│   │   └── ...
│   ├── models/
│   │   ├── userModel.js
│   │   ├── productModel.js
│   │   └── ...
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   └── ...
│   └── server.js
├── public/
│   ├── index.html
│   ├── styles.css
│   ├── images/
│   ├── scripts/
│   └── ...
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── scripts/
│   └── ...
├── jsconfig.json
├── package.json
├── package-lock.json
├── LICENSE
├── README.md
└── yarn.lock





1.	Create Modules: Create a module for each table in your schema. Modules group related components together.
•	src/admin/admin.module.ts
•	src/role/role.module.ts
•	src/customer/customer.module.ts
•	src/identity/identity.module.ts
•	src/stock-limit/stock-limit.module.ts
•	src/product/product.module.ts
•	src/session/session.module.ts
•	src/supplier/supplier.module.ts
•	src/transaction/transaction.module.ts
•	src/incoming-transaction/incoming-transaction.module.ts
•	src/outgoing-transaction/outgoing-transaction.module.ts
2.	Create Controllers: Create controllers for each module to handle incoming re-quests and delegate to services.
•	src/admin/admin.controller.ts
•	src/role/role.controller.ts
•	src/customer/customer.controller.ts
•	src/identity/identity.controller.ts
•	src/stock-limit/stock-limit.controller.ts
•	src/product/product.controller.ts
•	src/session/session.controller.ts
•	src/supplier/supplier.controller.ts
•	src/transaction/transaction.controller.ts
•	src/incoming-transaction/incoming-transaction.controller.ts
•	src/outgoing-transaction/outgoing-transaction.controller.ts
3.	Create Services: Create services for each module to handle business logic. Services interact with the database and provide data to controllers.
•	src/admin/admin.service.ts
•	src/role/role.service.ts
•	src/customer/customer.service.ts
•	src/identity/identity.service.ts
•	src/stock-limit/stock-limit.service.ts
•	src/product/product.service.ts
•	src/session/session.service.ts
•	src/supplier/supplier.service.ts
•	src/transaction/transaction.service.ts
•	src/incoming-transaction/incoming-transaction.service.ts
•	src/outgoing-transaction/outgoing-transaction.service.ts
4.	Create Entities: Create entities for each table to define the database structure. Enti-ties map to database tables.
•	src/admin/admin.entity.ts
•	src/role/role.entity.ts
•	src/customer/customer.entity.ts
•	src/identity/identity.entity.ts
•	src/stock-limit/stock-limit.entity.ts
•	src/product/product.entity.ts
•	src/session/session.entity.ts
•	src/supplier/supplier.entity.ts
•	src/transaction/transaction.entity.ts
•	src/incoming-transaction/incoming-transaction.entity.ts
•	src/outgoing-transaction/outgoing-transaction.entity.ts
5.	Define Relationships: Use decorators and methods in entities to define relation-ships between tables (e.g., OneToOne, OneToMany, ManyToOne).
6.	Business Logic and Validation: Implement business logic and validation in services and controllers according to your requirements.
7.	Routes and API Endpoints: Define routes and API endpoints in controllers using decorators (e.g., @Get, @Post, @Put, @Delete).
8.	Middleware and Guards: Implement middleware for authentication, logging, etc. Use guards for authorization.




1.	Admin APIs:
•	POST /admin/login: Login an admin user by validating credentials.
•	GET /admin/:adminId: Get admin details by admin ID.
2.	Customer APIs:
•	GET /customers: Get a list of all customers.
•	GET /customers/:customerId: Get customer details by customer ID.
•	POST /customers: Create a new customer.
•	PUT /customers/:customerId: Update customer details.
•	DELETE /customers/:customerId: Delete a customer.
3.	Product APIs:
•	GET /products: Get a list of all products.
•	GET /products/:productId: Get product details by product ID.
•	POST /products: Create a new product.
•	PUT /products/:productId: Update product details.
•	DELETE /products/:productId: Delete a product.
4.	Transaction APIs:
•	GET /transactions: Get a list of all transactions.
•	GET /transactions/:transactionId: Get transaction details by transaction ID.
•	POST /transactions: Create a new transaction.
•	PUT /transactions/:transactionId: Update transaction details.
•	DELETE /transactions/:transactionId: Delete a transaction.
5.	Supplier APIs:
•	GET /suppliers: Get a list of all suppliers.
•	GET /suppliers/:supplierId: Get supplier details by supplier ID.
•	POST /suppliers: Create a new supplier.
•	PUT /suppliers/:supplierId: Update supplier details.
•	DELETE /suppliers/:supplierId: Delete a supplier.
6.	Incoming Transaction APIs:
•	GET /incoming-transactions: Get a list of all incoming transactions.
•	GET /incoming-transactions/:incomingId: Get incoming transaction details by incoming ID.
•	POST /incoming-transactions: Create a new incoming transaction.
•	PUT /incoming-transactions/:incomingId: Update incoming transaction details.
•	DELETE /incoming-transactions/:incomingId: Delete an incoming transac-tion.
7.	Outgoing Transaction APIs:
•	GET /outgoing-transactions: Get a list of all outgoing transactions.
•	GET /outgoing-transactions/:outgoingId: Get outgoing transaction details by outgoing ID.
•	POST /outgoing-transactions: Create a new outgoing transaction.
•	PUT /outgoing-transactions/:outgoingId: Update outgoing transaction details.
•	DELETE /outgoing-transactions/:outgoingId: Delete an outgoing transac-tion.
8.	Identity APIs:
•	GET /identity: Get the identity/branding information of the business.

 


my-app/
|-- backend/
|   |-- src/
|   |   |-- controllers/
|   |   |   |-- auth.controller.ts
|   |   |-- services/
|   |   |   |-- auth.service.ts
|   |   |-- modules/
|   |   |   |-- auth.module.ts
|   |   |-- main.ts
|   |-- tsconfig.json
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |   |-- LoginPage.js
|   |   |   |-- DashboardPage.js
|   |   |-- App.js
|   |   |-- index.js
|   |-- package.json
|-- package.json
|-- README.md



GET /roles/:roleCode:  Endpoint to get role details by role code. Input: roleCode (path parameter) Output: Role details (role_name, status, created_at, updated_at)  POST /check-role:  Endpoint to check the role of a logged-in user (admin or customer). Input: User's role code (role_code) sent in the request body. Output: Response indicating whether the user is an admin or a customer. jaise pehle role aya ki wo admin hai ya customer



─src
    ├───app
    │   ├───auth
    │   ├───components
    │   │   ├───MatxCustomizer
    │   │   ├───MatxLayout
    │   │   │   └───Layout1
    │   │   ├───MatxSidenav
    │   │   ├───MatxTheme
    │   │   │   ├───SecondarySidenavTheme
    │   │   │   └───SidenavTheme
    │   │   ├───MatxVerticalNav
    │   │   ├───NotificationBar
    │   │   └───SecondarySidebar
    │   ├───contexts
    │   ├───hooks
    │   ├───utils
    │   └───views
    │       ├───charts
    │       │   └───echarts
    │       ├───dashboard
    │       │   └───shared
    │       ├───material-kit
    │       │   ├───auto-complete
    │       │   ├───buttons
    │       │   ├───checkbox
    │       │   ├───dialog
    │       │   ├───expansion-panel
    │       │   ├───forms
    │       │   ├───icons
    │       │   ├───menu
    │       │   ├───radio
    │       │   ├───slider
    │       │   ├───snackbar
    │       │   ├───switch
    │       │   └───tables
    │       └───sessions
    └───fake-db
        └───db





Tree Structure for Backend code

backend/
  ├── src/
  │   ├── admin/
  │   │   ├── dto/
  │   │   ├── admin.controller.ts
  │   │   ├── admin.service.ts
  │   │   └── admin.module.ts
  │   ├── auth/
  │   │   ├── dto/
  │   │   ├── auth.controller.ts
  │   │   ├── auth.service.ts
  │   │   └── auth.module.ts
  │   ├── customer/
  │   │   ├── dto/
  │   │   ├── customer.controller.ts
  │   │   ├── customer.service.ts
  │   │   └── customer.module.ts
  │   ├── identity/
  │   │   ├── dto/
  │   │   ├── identity.controller.ts
  │   │   ├── identity.service.ts
  │   │   └── identity.module.ts
  │   ├── product/
  │   │   ├── dto/
  │   │   ├── product.controller.ts
  │   │   ├── product.service.ts
  │   │   └── product.module.ts
  │   ├── session/
  │   │   ├── dto/
  │   │   ├── session.controller.ts
  │   │   ├── session.service.ts
  │   │   └── session.module.ts
  │   ├── supplier/
  │   │   ├── dto/
  │   │   ├── supplier.controller.ts
  │   │   ├── supplier.service.ts
  │   │   └── supplier.module.ts
  │   ├── transaction/
  │   │   ├── dto/
  │   │   ├── transaction.controller.ts
  │   │   ├── transaction.service.ts
  │   │   └── transaction.module.ts
  │   ├── incoming-transaction/
  │   │   ├── dto/
  │   │   ├── incoming-transaction.controller.ts
  │   │   ├── incoming-transaction.service.ts
  │   │   └── incoming-transaction.module.ts
  │   ├── outgoing-transaction/
  │   │   ├── dto/
  │   │   ├── outgoing-transaction.controller.ts
  │   │   ├── outgoing-transaction.service.ts
  │   │   └── outgoing-transaction.module.ts
  │   ├── app.controller.ts
  │   ├── app.module.ts
  │   └── main.ts
  ├── test/
  │   ├── admin/
  │   ├── auth/
  │   ├── customer/
  │   ├── identity/
  │   ├── product/
  │   ├── session/
  │   ├── supplier/
  │   ├── transaction/
  │   ├── incoming-transaction/
  │   ├── outgoing-transaction/
  │   ├── app.e2e-spec.ts
  │   └── jest-e2e.json
  ├── .gitignore
  ├── nest-cli.json
  ├── package.json
  ├── README.md
  ├── tsconfig.build.json
  ├── tsconfig.json
  └── yarn.lock



Table user {
  email varchar(100) [primary key]
  password varchar(50) [not null]
  ip_address varchar(12) [not null]
  is_online varchar [not null]
  user_level_code int [not null, ref: > role.role_code] // if 1 admin if 2 customer
  status varchar(100) [not null]
  created_at timestamp [not null]
  updated_at timestamp [not null]
}# data-warehouse-frontend-and-backend
