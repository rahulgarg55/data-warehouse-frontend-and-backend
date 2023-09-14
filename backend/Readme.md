Table "users" {
  "id" int [pk]
  "email" varchar(255) [not null]
  "password" varchar(255) [not null]
  "ip_address" varchar(16)
  "isonline" tinyint(1)
  "role_code" int
  "created_at" datetime [not null]
  "updated_at" datetime [not null]
  PRIMARY KEY ("id")
  INDEX ("role_code")
  FOREIGN KEY ("role_code") REFERENCES "role" ("role_code")
}

Table "role" {
  "role_code" int [pk]
  "role_name" varchar(30) [not null]
  "status" char(1) [not null]
  "created_at" datetime [not null] default: `CURRENT_TIMESTAMP`
  "updated_at" datetime [not null] default: `CURRENT_TIMESTAMP`
}

Table "customer" {
  "customer_id" bigint [pk, increment]
  "name" varchar(100) [not null]
  "address" varchar(100) [not null]
  "phone" varchar(12) [not null]
  "created_at" datetime [not null] default: `CURRENT_TIMESTAMP`
  "updated_at" datetime [not null] default: `CURRENT_TIMESTAMP`
  "role_code" int
  FOREIGN KEY ("role_code") REFERENCES "role" ("role_code")
}

Table "product" {
  "product_id" bigint [pk, increment]
  "product_name" varchar(255) [not null]
  "brand" varchar(255) [not null]
  "current_stock" int [not null]
  "price" decimal(10,2) [not null]
  "supplier_id" bigint
  "created_at" datetime [not null] default: `CURRENT_TIMESTAMP`
  "updated_at" datetime [not null] default: `CURRENT_TIMESTAMP`
  FOREIGN KEY ("supplier_id") REFERENCES "supplier" ("supplier_id") ON DELETE SET NULL
}

Table "supplier" {
  "supplier_id" bigint [pk, increment]
  "supplier_name" varchar(100) [not null]
  "supplier_address" varchar(100) [not null]
  "supplier_phone" varchar(12) [not null]
  "created_at" datetime [not null] default: `CURRENT_TIMESTAMP`
  "updated_at" datetime [not null] default: `CURRENT_TIMESTAMP`
  "role_code" int
  FOREIGN KEY ("role_code") REFERENCES "users" ("role_code") ON DELETE SET NULL
}

Table "identity" {
  "identity_id" bigint [pk, increment]
  "website" varchar(250) [not null]
  "description" text [not null]
  "keywords" text [not null]
  "address" varchar(250) [not null]
  "contact_number" char(20) [not null]
  "facebook" varchar(100) [not null]
  "email" varchar(100) [not null]
  "twitter" varchar(100) [not null]
  "google_plus" varchar(100) [not null]
  "youtube" varchar(100) [not null]
  "favicon" varchar(250) [not null]
  "author" varchar(100) [not null]
  "created_at" datetime [not null] default: `CURRENT_TIMESTAMP`
  "updated_at" datetime [not null] default: `CURRENT_TIMESTAMP`
}

Table "transaction" {
  "transaction_id" bigint [pk, increment]
  "transaction_date" date [not null]
  "user_id" int [not null]
  "total_amount" decimal(10,2) [not null]
  "transaction_type" enum('incoming', 'outgoing') [not null]
  FOREIGN KEY ("user_id") REFERENCES "users" ("id")
}

Table "incoming_transaction" {
  "incoming_transaction_id" bigint [pk, increment]
  "transaction_date" datetime [not null]
  "admin_id" int [not null]
  "total_amount" decimal(10,2) [not null]
  FOREIGN KEY ("admin_id") REFERENCES "users" ("id")
}

Table "incoming_transaction_detail" {
  "incoming_transaction_detail_id" bigint [pk, increment]
  "incoming_transaction_id" bigint [not null]
  "product_id" bigint [not null]
  "quantity" int [not null]
  "price" decimal(10,2) [not null]
  FOREIGN KEY ("incoming_transaction_id") REFERENCES "incoming_transaction" ("incoming_transaction_id")
  FOREIGN KEY ("product_id") REFERENCES "product" ("product_id")
}

Table "outgoing_transaction" {
  "outgoing_transaction_id" bigint [pk, increment]
  "transaction_date" datetime [not null]
  "customer_id" bigint [not null]
  "total_amount" decimal(10,2) [not null]
  FOREIGN KEY ("customer_id") REFERENCES "customer" ("customer_id")
}
