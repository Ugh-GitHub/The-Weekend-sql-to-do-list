CREATE TABLE task_list (
    "id" serial PRIMARY KEY,
    "task" varchar(250) NOT NULL,
    "completed" boolean NOT NULL,
    "timestamp" TIMESTAMP
);

INSERT INTO "task_list" ("task", "completed", "timestamp")
        VALUES('Make bed', FALSE, NULL),
        ('Fight dragons', TRUE, CURRENT_TIMESTAMP),
        ('Finish HW',TRUE,CURRENT_TIMESTAMP);

SET timezone = 'CST6CDT';


-- Test statements

-- SELECT * FROM "task_list";

-- UPDATE task_list
--         SET "timestamp" = CURRENT_TIMESTAMP, "completed" = TRUE
--         WHERE id = 2;
        
-- UPDATE task_list
--         SET "timestamp" = NULL, "completed" = FALSE
--         WHERE id = 1;

