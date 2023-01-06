CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"name" TEXT NOT NULL UNIQUE,
	"email" TEXT NOT NULL UNIQUE,
	"senha" TEXT NOT NULL,
	"pictureUrl" TEXT NOT NULL UNIQUE,
	"createdAt" timestamp without time zone DEFAULT now() NOT NULL
);

CREATE TABLE "trends" (
	"id" serial PRIMARY KEY,
	"trend" TEXT NOT NULL UNIQUE,
	"postId" INTEGER NOT NULL
);

CREATE TABLE "posts" (
	"id" serial PRIMARY KEY,
	"userId" integer NOT NULL,
	"link" TEXT NOT NULL UNIQUE,
	"description" TEXT NOT NULL,
	"likeQtd" integer DEFAULT 0 not null,
	"createdAt" timestamp without time zone DEFAULT now() NOT NULL
);

CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY,
	"userId" integer NOT NULL UNIQUE,
	"token" TEXT NOT NULL UNIQUE,
	"createdAt" timestamp without time zone DEFAULT now() NOT NULL
);

CREATE TABLE "likes" (
	"id" serial PRIMARY KEY,
	"userId" integer NOT NULL,
	"postId" integer NOT NULL,
	"createdAt" timestamp without time zone DEFAULT now() NOT NULL
);

ALTER TABLE "trends" ADD CONSTRAINT "trends_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("id");

ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("id");

INSERT INTO users (name, email, senha, "pictureUrl") VALUES ('teste','teste1@email.com', 123, '');
