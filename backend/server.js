const express = require('express')
const app = express()
const port = 8000

app.use(express.json())

const cors = require('cors')
app.use(cors())

const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'coolgecko123',
    database: 'DBUI'
})

connection.connect()

app.get('/', (req,res) => {
    res.send('hello world')
})

app.put('/parse',(req,res) => {
    console.log(req.body)

    try {
        const body = req.body
        const name = body['first'] + " " + body["last"]
        const age = body["age"]
        const isAdmin = body["admin"] ? "is an admin" : "is not an admin"
        const message = `${name} is ${age} years old and ${isAdmin}`
        res.status(200)
        res.send(message)
    } catch (err) {
        console.log(err)
    }
})

app.get('/db', (req, res) => {
    connection.query('SHOW TABLES', (err, rows, fields) => {
        if (err) throw err

        console.log(rows)
        res.status(200)
        res.send(rows)
    })
})

app.post('/user', (req, res) => {
    const {email, user_name, password, security_question, security_question_answer} = req.body
    const query = `INSERT INTO user (email, user_name, password, security_question, security_question_answer) VALUES ('${email}', '${user_name}', '${password}', '${security_question}', '${security_question_answer}')`
    connection.query(query, (err, rows, fields) => {
        if (err) throw err

        console.log(rows)
        res.status(200)
        res.send(true)
    })
})

app.get('/users', (req, res) => {
    connection.query('SELECT * FROM user;', (err, rows, fields) => {
        if (err) throw err

        res.status(200)
        res.send(rows)
    })
})

// get user with '/user?email='someEmail'
app.get('/user', (req, res) => {
    const email = req.query.email
    const query = `SELECT * FROM user WHERE email='${email}';`
    connection.query(query, (err, rows, fields) => {
        if (err) throw err

        res.status(200)
        res.send(rows)
    })
})

// login user with '/user?email='someEmail'&password='somePassword'
app.get('/login', async (req, res) => {
    const email = req.query.email
    const password = req.query.password
    const query = `SELECT * FROM user WHERE email='${email}' AND password='${password}';`
    connection.query(query, (err, rows, fields) => {
        if (err) throw err

        res.status(200)
        res.send(rows)
    })
})

// update password at '/user?email='someEmail'' with parameter password
app.put('/user', (req, res) => {
    const email = req.query.email
    const password = req.body.password

    const query = `UPDATE user SET password='${password}' WHERE email='${email}'`
    connection.query(query, (err, rows, fields) => {
        if (err) throw err

        console.log(rows)
        res.status(200)
        res.send(true)
    })
})

//Update user information
app.put('/user', (req, res) => {
    const email = req.query.email
    const user_name = req.body.password
    const security_question = req.body.security_question
    const security_question_answer = req.body.security_question

    if (user_name){
        const query = `UPDATE user SET user_name='${user_name}' WHERE email='${email}'`
        connection.query(query, (err, rows, fields) => {
            if (err) throw err

            console.log(rows)
            res.status(200)
        })
    }
    if (security_question){
        const query = `UPDATE user SET security_question='${security_question}' WHERE email='${email}'`
        connection.query(query, (err, rows, fields) => {
            if (err) throw err

            console.log(rows)
            res.status(200)
        })
    }
    if (security_question_answer){
        const query = `UPDATE user SET security_question_answer='${security_question_answer}' WHERE email='${email}'`
        connection.query(query, (err, rows, fields) => {
            if (err) throw err

            console.log(rows)
            res.status(200)
        })
    }
    res.send(true)
})

app.delete('/users/clear', (req, res) => {
    connection.query('DELETE FROM user;', (err, rows, feilds) => {
        if (err) throw err

        res.status(200)
        res.send("Successfully cleared users!")
    })
})

app.listen(port, () => {
    console.log(`Example listening on port ${port}`)
})