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

// Creates a truck and attaches it to a user by their email
app.post('/truck', (req, res) => {
    const {email, model, make, year, mileage, max_miles, long_discount_days, long_discount_percent, long_discount_flat, 
        truck_image} = req.body
    const query = `INSERT INTO truck (owner_id , model, make, year, mileage, max_miles, long_discount_days, long_discount_percent, 
        long_discount_flat, truck_image) VALUES ( (SELECT user_id AS this_user FROM user WHERE '${email}' = email), '${model}', '${make}', '${year}', '${mileage}', '${max_miles}', '${long_discount_days}', '${long_discount_percent}', '${long_discount_flat}', '${truck_image}')`
        connection.query(query, (err, rows, fields) => {
            if (err) throw err

            console.log(rows)
            res.status(200)
            res.send(true)
        })
})

//Gets all trucks that are currently available for rent
app.get('/trucks', (req, res) => {
    connection.query('SELECT * FROM truck WHERE truck_id NOT IN (SELECT truck_id FROM truck_rent_info WHERE renter_id <> -1);', (err, rows, fields) => {
        if (err) throw err

        console.log(rows)
        res.status(200)
        res.send(rows)
    })
})

// Creates a vehicle bundle profile connected to a users email
app.post('/vehicle_bundle', (req, res) => {
    const {email, discount_percent, discount_flat} = req.body
    const query = `INSERT INTO vehicle_bundle_profile (owner_id, discount_percent, discount_flat)
        VALUES ( (SELECT user_id AS this_user FROM user WHERE '${email}' = email), '${discount_percent}', '${discount_flat}')`
    connection.query(query, (err, rows, fields) => {
        if (err) throw err

        console.log(rows)
        res.status(200)
        res.send(true)
    })
})

// Adds a vehicle to a bundle given the vehicle and bundle id
app.post('/vehicle_to_bundle', (req, res) => {
    const {bundle_id, truck_id} = req.body
    const query = `INSERT INTO bundle_vehicle (bundle_id, truck_id)
        VALUES ('${bundle_id}', '${truck_id}')`
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

// get the owned trucks of a user with '/user_trucks?email='someEmail'
app.get('/user_trucks', (req, res) => {
    const email = req.query.email
    const query = `SELECT * FROM truck a WHERE a.owner_id = (SELECT b.user_id FROM user b WHERE b.email = '${email}');`
    connection.query(query, (err, rows, fields) => {
        if (err) throw err

        res.status(200)
        res.send(rows)
    })
})

// get the bundles of a specific user with '/user_bundles?email='someEmail'
app.get('/user_bundles', (req, res) => {
    const email = req.query.email
    const query = `SELECT * FROM vehicle_bundle_profile a WHERE a.owner_id = (SELECT b.user_id FROM user b WHERE b.email = '${email}');`
    connection.query(query, (err, rows, fields) => {
        if (err) throw err

        res.status(200)
        res.send(rows)
    })
})

// gets all the trucks in the given bundle id
app.get('/bundle_trucks', (req, res) => {
    const bundle_id = req.query.bundle_id
    const query = `SELECT * FROM bundle_vehicle a RIGHT JOIN truck b ON a.truck_id = b.truck_id WHERE a.bundle_id = '${bundle_id}'  `
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
    const bio = req.body.bio
    const prof_pic_choice = req.body.prof_pic_choice
    const location = req.body.location
    const phone = req.body.phone
    
    if(password) {
        const query = `UPDATE user SET password='${password}' WHERE email='${email}'`
        connection.query(query, (err, rows, fields) => {
            if (err) throw err
    
            console.log(rows)
            res.status(200)
            res.send(true)
        })
    } else {
        const query = `UPDATE user SET bio='${bio}', prof_pic_choice='${prof_pic_choice}', location='${location}', phone='${phone}'  WHERE email='${email}'`
        connection.query(query, (err, rows, fields) => {
            if (err) throw err
    
            console.log(rows)
            res.status(200)
            res.send(true)
        })
    }

})

app.get('/amenities', (req, res) => {
    const truck_id = req.query.truck_id;
    const query = `SELECT * FROM amenity WHERE truck_id='${truck_id}';`;
    connection.query(query, (err, rows, fields) => {
      if (err) throw err;

      res.status(200);
      res.send(rows);
    });
  });

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