-- -------------------------------------------------------------
-- TablePlus 3.10.0(348)
--
-- https://tableplus.com/
--
-- Database: ghkarma
-- Generation Time: 2021-03-04 3:28:38.5370 PM
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."accounts";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS accounts_id_seq;

-- Table Definition
CREATE TABLE "public"."accounts" (
    "id" int4 NOT NULL DEFAULT nextval('accounts_id_seq'::regclass),
    "compound_id" varchar NOT NULL,
    "user_id" int4 NOT NULL,
    "provider_type" varchar NOT NULL,
    "provider_id" varchar NOT NULL,
    "provider_account_id" varchar NOT NULL,
    "refresh_token" text,
    "access_token" text,
    "access_token_expires" timestamptz,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."sessions";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS sessions_id_seq;

-- Table Definition
CREATE TABLE "public"."sessions" (
    "id" int4 NOT NULL DEFAULT nextval('sessions_id_seq'::regclass),
    "user_id" int4 NOT NULL,
    "expires" timestamptz NOT NULL,
    "session_token" varchar NOT NULL,
    "access_token" varchar NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."users";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "name" varchar,
    "email" varchar,
    "email_verified" timestamptz,
    "image" varchar,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."verification_requests";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS verification_requests_id_seq;

-- Table Definition
CREATE TABLE "public"."verification_requests" (
    "id" int4 NOT NULL DEFAULT nextval('verification_requests_id_seq'::regclass),
    "identifier" varchar NOT NULL,
    "token" varchar NOT NULL,
    "expires" timestamptz NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

