const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js')

// GET
router.get('/', (req, res) => {
    pool.query('SELECT * FROM "koalas";')
        .then(function (dbRes) {
            res.send(dbRes.rows);
        })
        .catch(function (err) {
            console.log(err);
            res.sendStatus(500);
        });

});

// POST
router.post('/', (req, res) => {
    console.log('req.body', req.body);
    let queryString = `
    INSERT INTO "koalas" 
	    ("name", "gender", "age", "ready_to_transfer", "notes")
        VALUES
            ($1, $2, $3, $4, $5);
    `;
    // SUBJECT TO CHANGE BASED ON CLIENT SIDE OBJECT
    let queryArgs = [
        req.body.name,        // $1
        req.body.gender,         // $2
        req.body.age,     // $3
        req.body.ready_to_transfer, //$4
        req.body.notes           // $5
    ];
    // console.log('query string is: ', queryString);
    pool.query(queryString, queryArgs)
        // Get back DB results
        .then(function (dbRes) {
            res.sendStatus(201);
        })
        // Or, handle DB errors
        .catch(function (err) {
            console.log(err);
            res.sendStatus(500);
        });
});

// PUT
router.put('/koalas/ready_to_transfer/:id', (req, res) => {
    let koalaId = req.params.id;
    let sqlText = `UPDATE "koalas" SET "ready_to_transfer"='TRUE' WHERE "id"=$1`;
    pool.query(sqlText, [koalaId])
        .then((resDB) => {
            res.sendStatus(200);
        }).catch((error) => {
            // console.log(error);
            res.sendStatus(500);
        });
});

// DELETE

module.exports = koalaRouter;