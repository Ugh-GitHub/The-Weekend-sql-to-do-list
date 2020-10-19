const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "task_list";'; // DECIDE WHAT GOES HERE FOR TABLE NAME
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log("error with request", error);
        res.sendStatus(500);
    });
});

router.delete('/delete/:id', (req, res) => {

    console.log('in DELETE',req.params.id);
    let queryText = `DELETE FROM "task_list" WHERE "id" = $1;`;
    
    // THE NUMBER MATTERS, IT INDICATES WHICH PLACEHOLDER IS WHICH
    
    pool.query(queryText, [req.params.id]).then((result) => {
        // logs out ALL of the data from the database in the terminal (>.<)
        //console.log('result from database', result);
        res.sendStatus(200);
    }).catch((error)=>{
        console.log("error with get request",error);
        res.sendStatus(500);
    });


})


router.post('/', (req, res) => {
    // req.body statements
    let task = req.body.task;
    let completed = req.body.completed;
    let queryText = '';
    if (req.body.timestamp !== null) {
        queryText = `INSERT INTO "task_list" ("task", "completed", "timestamp")
        VALUES($1, $2, CURRENT_TIMESTAMP);`;
        pool.query(queryText, [task, completed]).then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log("error with request", error);
            res.sendStatus(500);
        });
    }
    else {
        queryText = `INSERT INTO "task_list" ("task", "completed")
        VALUES($1, $2);`;
    pool.query(queryText, [task, completed]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log("error with request", error);
        res.sendStatus(500);
    });
    }
});

router.put(`/completed/:id`, (req, res) => {
    console.log('in PUT request', req.body.completed, req.params.id);
    // res.sendStatus(200);
    let queryText = '';
    if (req.body.completed !== "false") {
        console.log("hi ma",req.body.completed);
        queryText = `UPDATE task_list
        SET "timestamp" = NULL, "completed" = FALSE
        WHERE id = $1;`;
        
    }
    else {
        console.log("hi pa",req.body.completed);
        queryText = `UPDATE "task_list" SET "completed" = TRUE, "timestamp" = CURRENT_TIMESTAMP WHERE "id" = $1;`;
    }

    
    // THE NUMBER MATTERS, IT INDICATES WHICH PLACEHOLDER IS WHICH
    
    pool.query(queryText, [req.params.id]).then((result) => {
        console.log(queryText);
        // logs out ALL of the data from the database in the terminal (>.<)
        //console.log('result from database', result);
        res.sendStatus(200);
    }).catch((error)=>{
        console.log("error with get request",error);
        res.sendStatus(500);
    });
});


module.exports = router;