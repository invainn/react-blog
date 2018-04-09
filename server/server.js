// This was quickly put together
// I am also not a DBA

// needs to use sqlite3 es6 promise based in future refactor

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/api/posts', (req, res, next) => {
    db.serialize(() => {
        db.all('SELECT * FROM USER_Posts', (err, results) => {
            res.status(200).send(results);
        });
    });
});

app.post('/api/posts', (req, res, next) => {
    db.serialize(() => {
        db.run(`
            INSERT INTO USER_Posts (Title, Categories, Content)
            VALUES ('${req.body.Title}', '${req.body.Categories}', '${req.body.Content}') 
        `, (err, result) =>{
            if(err) {
                next(err);
            }
        });

        db.get('SELECT * FROM USER_Posts ORDER BY ID DESC', (err, result) => res.status(200).send(result));
    });
});

app.get('/api/posts/:id', (req, res, next) => {
    db.serialize(() => {
        db.get(`SELECT * FROM USER_Posts as UP WHERE UP.ID = ${req.params.id}`, (err, results) => {
            res.status(200).send(results);
        });
    });
});

app.delete('/api/posts/:id', (req, res, next) => {
    db.serialize(() => {
        db.get(`SELECT * FROM USER_Posts as UP WHERE UP.ID = ${req.params.id}`, (err, result) => {
            res.status(200).send(result);
        });

        db.run(`DELETE FROM USER_Posts WHERE ID = ${req.params.id}`, (err) => {
            if(err) {
                next(err);
            }
        }) 
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('it broke :(');
});

function initServer(err) {
    if(err) {
        console.error(err);
        return;
    }

    app.listen(port);
    console.log(`listening on ${port}`);
}

const db = new sqlite3.Database('./database.sqlite', sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, initServer);