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

router.put(`/completed/:id`, (req, res) => {
    //console.log('in PUT request', req.body.direction, req.params.id);
    // IF statement with parameter to undo completion
    // if (req.body.status) {
        let queryText = `UPDATE task_list
        SET "timestamp" = CURRENT_TIMESTAMP, "completed?" = TRUE
        WHERE id = $1;`
    // }
    // else {
    // let queryText = `UPDATE task_list
    //     SET "timestamp" = null, "completed?" = FALSE
    //     WHERE id = $1;`
    // }


    
    

    
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



router.post('/', (req, res) => {
    // req.body statements


    let queryText = '';
    pool.query(queryText).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log("error with request", error);
        res.sendStatus(500);
    });
})

module.exports = router;