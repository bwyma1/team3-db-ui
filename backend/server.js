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
  
      const selectQuery = `SELECT * FROM user WHERE email = '${email}'`;
  
      connection.query(selectQuery, (err, rows, fields) => {
        if (err) throw err;
  
        const createdUser = rows[0];
  
        res.status(200).json(createdUser);
      });
    })
  })
  

// adds truck listing based on user_id (user_id = owner_id)
app.post('/truck', (req, res) => {
    const {user_id, model, make, year, mileage, max_miles, long_discount_days, long_discount_percent, long_discount_flat, 
        truck_image, truck_capacity, cargo_capacity, price} = req.body
    const query = `INSERT INTO truck (owner_id , model, make, year, mileage, max_miles, long_discount_days, long_discount_percent, 
        long_discount_flat, truck_image, is_available, truck_capacity, cargo_capacity, price) 
        VALUES ('${user_id}', '${model}', '${make}', '${year}', '${mileage}', '${max_miles}', '${long_discount_days}', '${long_discount_percent}', '${long_discount_flat}', '${truck_image}', 1, '${truck_capacity}', '${cargo_capacity}', '${price}')`
        connection.query(query, (err, rows, fields) => {
            if (err) throw err

            console.log(rows)
            res.status(200)
            res.send(true)
        })
})


// get available trucks
app.get('/trucks', (req, res) => {
    connection.query('SELECT * FROM truck WHERE is_available = 1 AND truck_id NOT IN (SELECT truck_id FROM truck_rent_info WHERE renter_id <> -1);', (err, rows, fields) => {
      if (err) throw err;
  
      console.log(rows);
      res.status(200);
      res.send(rows);
    });
  });
  
// Creates a vehicle bundle profile connected to a users email
app.post('/vehicle_bundle_profile', (req, res) => {
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

// Gets vehicle_bundle from email
app.get('/vehicle_bundle_profile', (req, res) => {
    const email = req.query.email
    const query = `SELECT * FROM vehicle_bundle_profile WHERE owner_id IN (SELECT user_id FROM user WHERE email='${email}')`
    connection.query(query, (err, rows, fields) => {
        if (err) throw err

        console.log(rows)
        res.status(200)
        res.send(rows)
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

// Gets vehicles with bundle_id=bundle_id
app.get('/bundle_vehicle', (req, res) => {
    const bundle_id = req.query.bundle_id
    const query = `SELECT truck.* FROM truck JOIN bundle_vehicle AS bv ON truck.truck_id=bv.truck_id WHERE bv.bundle_id=${bundle_id}`
    connection.query(query, (err, rows, fields) => {
        if (err) throw err

        console.log(rows)
        res.status(200)
        res.send(rows)
    })
})

// Adding amenities
app.post('/amenity', (req, res) => {
    const truck_id = req.query.truck_id
    const {amenity_name,amenity_price} = req.body
    const query = `INSERT INTO amenity (truck_id, amenity_name, amenity_price)
        VALUES (${truck_id},'${amenity_name}', '${amenity_price}')`
    connection.query(query, (err, rows, fields) => {
        if (err) throw err

        console.log(rows)
        res.status(200)
        res.send(true)
    })
})

//Gets amenities on truck
app.get('/amenity', (req, res) => {
    const truck_id = req.query.truck_id
    connection.query(`SELECT * FROM amenity WHERE truck_id='${truck_id}';`, (err, rows, fields) => {
        if (err) throw err

        console.log(rows)
        res.status(200)
        res.send(rows)
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
    const user_id = req.query.user_id
    if(email){
        const query = `SELECT * FROM user WHERE email='${email}';`
        connection.query(query, (err, rows, fields) => {
            if (err) throw err

            res.status(200)
            res.send(rows)
        })
    }
    else{
        const query = `SELECT * FROM user WHERE user_id='${user_id}';`
        connection.query(query, (err, rows, fields) => {
            if (err) throw err

            res.status(200)
            res.send(rows)
        })
    }
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

app.delete('/vehicle_to_bundle', (req, res) => {
    const {bundle_id, truck_id} = req.body
    console.log(req.body)
    connection.query(`DELETE FROM bundle_vehicle AS bv WHERE bv.bundle_id=${bundle_id} AND bv.truck_id=${truck_id};`, (err, rows, fields) => {
        if (err) throw err

        res.status(200)
        res.send(true)
    })
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

app.put('/truck/update_availability', (req, res) => {
    const truck_id = req.query.truck_id;
    const is_available = req.query.is_available;
  
    const query = `UPDATE truck SET is_available = ${is_available} WHERE truck_id = '${truck_id}'`;
    connection.query(query, (err, rows, fields) => {
      if (err) throw err;
  
      res.status(200);
      res.send("Successfully updated truck availability!");
    });
  });

  app.post('/reviews', (req, res) => {
    const { user_id, truck_id, userName, review_rating, review_text } = req.body;
    const query = `INSERT INTO truck_review (user_id, truck_id, userName, review_text, review_rating) VALUES (${user_id}, ${truck_id}, '${userName}', '${review_text}', ${review_rating})`;
    connection.query(query, (error, results) => {
      if (error) {
        console.error(`Error adding review: ${error.stack}`);
        res.status(500).send('Error adding review');
        return;
      }
      const review_id = results.insertId;
      connection.query( (error, results) => {
        res.status(201).send({
          user_id,
          truck_id,
          userName,
          review_rating,
          review_text,
        });
      });
    });
  });
  
  // Get all reviews for a specific truck
  app.get('/reviews', (req, res) => {
    const truck_id = req.query.truck_id;
    const query = `SELECT * FROM truck_review WHERE truck_id=${truck_id}`;
    connection.query(query, (error, results) => {
      if (error) {
        console.error(`Error retrieving reviews: ${error.stack}`);
        res.status(500).send('Error retrieving reviews');
        return;
      }
      console.log(`Retrieved ${results.length} reviews`);
      res.status(200).send(results);
    });
  });

  app.get('/truck_cities', (req, res) => {
    const truck_id = req.query.truck_id;
    const query = `SELECT c.name FROM city c
                   JOIN truck_city tc ON c.city_id = tc.city_id
                   WHERE tc.truck_id = '${truck_id}';`;
    connection.query(query, (err, rows, fields) => {
        if (err) throw err;
        res.status(200);
        res.send(rows);
    });
});

app.post('/user_rented_trucks', (req, res) => {
    const { user_id, truck_id, city, start_date, end_date } = req.body;
    if (!user_id || !truck_id || !city || !start_date || !end_date) {
        res.status(400).send('Required fields are missing');
        return;
    }
    const query = `INSERT INTO truck_rent_info (renter_id, truck_id, city, start_date, end_date) VALUES (${user_id}, ${truck_id}, '${city}', '${start_date}', '${end_date}')`;
    connection.query(query, (error, results) => {
        if (error) {
            console.error(`Error saving rented truck: ${error.stack}`);
            res.status(500).send('Error saving rented truck');
            return;
        }
        res.status(201).send(true);
    });
});

// Get user rented trucks by user_id
app.get('/user_rented_trucks', (req, res) => {
    const user_id = req.query.user_id;
    const query = `SELECT t.*, tri.start_date, tri.end_date, tri.city AS selectedCity FROM truck t
    JOIN truck_rent_info tri ON t.truck_id = tri.truck_id
    WHERE tri.renter_id = ${user_id};`;
    connection.query(query, (error, results) => {
        if (error) {
            console.error(`Error retrieving rented trucks: ${error.stack}`);
            res.status(500).send('Error retrieving rented trucks');
            return;
        }
        console.log(`Retrieved ${results.length} rented trucks`);
        res.status(200).send(results);
    });
});