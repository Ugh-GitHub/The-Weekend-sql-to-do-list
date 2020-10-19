CREATE TABLE task_list (
    "id" serial PRIMARY KEY,
    "task" varchar(250) NOT NULL,
    "completed" boolean NOT NULL,
    "timestamp" TIMESTAMP
);

SET timezone = 'America/Chicago';

SELECT * FROM "task_list";

