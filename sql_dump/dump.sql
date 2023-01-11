CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"name" TEXT NOT NULL ,
	"email" TEXT NOT NULL UNIQUE,
	"senha" TEXT NOT NULL,
	"pictureUrl" TEXT NOT NULL ,
	"createdAt" timestamp without time zone DEFAULT now() NOT NULL
);

CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY,
	"userId" integer NOT NULL UNIQUE,
	"token" TEXT NOT NULL ,
	"createdAt" timestamp without time zone DEFAULT now() NOT NULL
);

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

CREATE TABLE "trends" (
	"id" serial PRIMARY KEY,
	"trend" TEXT NOT NULL ,
	"postId" integer NOT NULL
);

CREATE TABLE "posts" (
	"id" serial PRIMARY KEY,
	"userId" integer NOT NULL,
	"link" TEXT NOT NULL UNIQUE ,
	"description" TEXT NOT NULL,
	"likeQtd" integer DEFAULT 0 not null,
	"createdAt" timestamp without time zone DEFAULT now() NOT NULL
);

CREATE TABLE "follows" (
	"id" serial PRIMARY KEY,
	"followerId" integer NOT NULL,
    "followedId" integer NOT NULL
);

CREATE TABLE "likes" (
	"id" serial PRIMARY KEY,
	"userId" integer NOT NULL,
	"postId" integer NOT NULL,
	"createdAt" timestamp without time zone DEFAULT now() NOT NULL
);

CREATE TABLE "postImage"
(
   "id" serial PRIMARY KEY,
    "postId" integer NOT NULL,
    "url" text COLLATE pg_catalog."default" NOT NULL,
    "imageDescription" text COLLATE pg_catalog."default" NOT NULL,
    "imageUrl" text COLLATE pg_catalog."default" NOT NULL,
	"title" text NOT NULL,
    "createdAt" timestamp without time zone NOT NULL DEFAULT now()
);

ALTER TABLE"postImage" ADD CONSTRAINT "postImage_fk0" FOREIGN KEY ("postId")  REFERENCES "posts" ("id");

ALTER TABLE "trends" ADD CONSTRAINT "trends_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("id");

ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("id");

