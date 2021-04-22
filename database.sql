CREATE TABLE "koalas" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (20) NOT NULL,
	"gender" VARCHAR (5) NOT NULL,
    "age" integer,
    "ready_to_transfer" BOOLEAN DEFAULT FALSE,
    "notes" VARCHAR (200) NOT NULL
);

DROP TABLE "koalas";

INSERT INTO "koalas" 
	("name", "gender", "age", "ready_to_transfer", "notes") 
VALUES 
	('Scotty', 'M', 4, TRUE, 'Born in Guatemala'),
	('Jean', 'F', 5, TRUE, 'Allergic to lots of lava'),
	('Ororo', 'F', 7, FALSE, 'Loves listening to Paula (Abdul)'),
	('Logan', 'M', 15, FALSE, 'Loves the sauna'),
	('Charlie', 'M', 9, TRUE, 'Loves Nirvana'),
	('Betsy', 'F', 4, TRUE, 'Has a pet iguana');
	
SELECT * FROM "koalas";