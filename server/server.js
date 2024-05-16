import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import randomstring from 'randomstring'
import bcrypt from 'bcrypt'
import { use } from 'chai'

const app = express();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
})

app.get('/', (req, res) =>{
    const token = req.headers['authorization'];
    var username;
    jwt.verify(token, '5nB0$CZ4*!8x@1WQzPmY&rS#6QD!oF$D', (jwtErr, decoded) => {
        if(jwtErr) {
            return res.status(404).json("Invalid token!");
        }
        else {
            console.log("Valid token");
            username = decoded.username;
        }
    });
    const sql = "SELECT * FROM tea WHERE username = ? ORDER BY level";
    db.query(sql,[username], (err, result)=>{
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.get('/view/:id', (req, res) =>{
    const token = req.headers['authorization'];
    var username;
    jwt.verify(token, '5nB0$CZ4*!8x@1WQzPmY&rS#6QD!oF$D', (jwtErr, decoded) => {
        if(jwtErr) {
            return res.status(404).json("Invalid token!");
        }
        else {
            console.log("Valid token");
            username = decoded.username;
        }
    });
    const sql = "SELECT * FROM tea WHERE id = ? AND username = ?";
    const id = req.params.id;
    db.query(sql, [id, username], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });

})


app.post('/tea', (req, res)=>{
    const token = req.headers['authorization'];
    jwt.verify(token, '5nB0$CZ4*!8x@1WQzPmY&rS#6QD!oF$D', (jwtErr, decoded) => {
        if(jwtErr) {
            return res.status(404).json("Invalid token!");
        }
        else {
            console.log("Valid token");
            const username = decoded.username;
            const sql = "INSERT INTO tea (`name`, `level`, `username`) VALUES (?, ?, ?)";
            const values = [
                req.body.name,
                req.body.level,
                username
            ];
            db.query(sql, values, (err, result) =>{
                if(err) return res.json(err);
                return res.json(result);
            })
        }
    });
})

app.put('/edit/:id', (req, res) => {
    const token = req.headers['authorization'];
    jwt.verify(token, '5nB0$CZ4*!8x@1WQzPmY&rS#6QD!oF$D', (jwtErr, decoded) => {
        if (jwtErr) {
            return res.status(404).json("Invalid token!");
        } else {
            console.log("Valid token");
            const username = decoded.username;

            const id = req.params.id;
            const sql = "UPDATE tea SET `name`=?, `level`=? WHERE id = ? AND username = ?";
            const values = [req.body.name, req.body.level, id, username];
            db.query(sql, values, (err, result) => {
                if (err) return res.json({ Message: "Error inside server" });
                return res.json(result);
            });
        }
    });
});

app.delete('/delete/:id', (req, res) => {
    const token = req.headers['authorization'];
    jwt.verify(token, '5nB0$CZ4*!8x@1WQzPmY&rS#6QD!oF$D', (jwtErr, decoded) => {
        if (jwtErr) {
            return res.status(404).json("Invalid token!");
        } else {
            console.log("Valid token");
            const username = decoded.username;

            const id = req.params.id;
            const sql = "DELETE FROM tea WHERE id = ? AND username = ?";
            db.query(sql, [id, username], (err, result) => {
                console.log(err)
                if (err) return res.json({ Message: "Error on server side" });
                return res.json(result);
            });
        }
    });
});

//reviews

app.delete('/reviews/delete/:id', (req, res) =>{
    const token = req.headers['authorization'];
    jwt.verify(token, '5nB0$CZ4*!8x@1WQzPmY&rS#6QD!oF$D', (jwtErr, decoded) => {
        if(jwtErr) {
            return res.status(404).json("Invalid token!");
        }
        else {
            console.log("Valid token");
            const username = decoded.username;
        }
    });
    const sql = "DELETE FROM review WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result)=>{
        if(err) return res.json({Message:"Error on server side"});
        return res.json(result);
    })
})

app.get('/reviews', (req, res) => {
    const token = req.headers['authorization'];
    jwt.verify(token, '5nB0$CZ4*!8x@1WQzPmY&rS#6QD!oF$D', (jwtErr, decoded) => {
        if(jwtErr) {
            return res.status(404).json("Invalid token!");
        }
        else {
            console.log("Valid token");
            const username = decoded.username;
        }
    });
    const sql = "SELECT * FROM review";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});
app.get('/reviews/:tea_id', (req, res) => {
    const token = req.headers['authorization'];
    jwt.verify(token, '5nB0$CZ4*!8x@1WQzPmY&rS#6QD!oF$D', (jwtErr, decoded) => {
        if(jwtErr) {
            return res.status(404).json("Invalid token!");
        }
        else {
            console.log("Valid token");
            const username = decoded.username;
        }
    });
    const sql = "SELECT * FROM review WHERE tea_id = ?";
    const tea_id = req.params.tea_id;
    db.query(sql, [tea_id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

app.post('/reviews/review', (req, res) => {
    const token = req.headers['authorization'];
    jwt.verify(token, '5nB0$CZ4*!8x@1WQzPmY&rS#6QD!oF$D', (jwtErr, decoded) => {
        if(jwtErr) {
            return res.status(404).json("Invalid token!");
        }
        else {
            console.log("Valid token");
            const username = decoded.username;
        }
    });
    const sql = "INSERT INTO review (`person`, `description`, `tea_id`) VALUES (?)";
    const values = [
        req.body.person,
        req.body.description,
        req.body.tea_id];
    db.query(sql, [values], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});
app.post('/tea', (req, res)=>{
    const token = req.headers['authorization'];
    jwt.verify(token, '5nB0$CZ4*!8x@1WQzPmY&rS#6QD!oF$D', (jwtErr, decoded) => {
        if(jwtErr) {
            return res.status(404).json("Invalid token!");
        }
        else {
            console.log("Valid token");
            const username = decoded.username;
        }
    });
    const sql = "INSERT INTO tea (`name`, `level`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.level
    ]
    db.query(sql, [values], (err, result) =>{
        if(err) return res.json(err);
        return res.json(result);
    })
})

app.put('/reviews/:id', (req, res) => {
    const token = req.headers['authorization'];
    jwt.verify(token, '5nB0$CZ4*!8x@1WQzPmY&rS#6QD!oF$D', (jwtErr, decoded) => {
        if(jwtErr) {
            return res.status(404).json("Invalid token!");
        }
        else {
            console.log("Valid token");
            const username = decoded.username;
        }
    });
    const sql = "UPDATE review SET person = ?, description = ? WHERE id = ?";
    const values = [req.body.person, req.body.description, req.params.id];
    db.query(sql, values, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

app.delete('/reviews/:id', (req, res) => {
    const token = req.headers['authorization'];
    jwt.verify(token, '5nB0$CZ4*!8x@1WQzPmY&rS#6QD!oF$D', (jwtErr, decoded) => {
        if(jwtErr) {
            return res.status(404).json("Invalid token!");
        }
        else {
            console.log("Valid token");
            const username = decoded.username;
        }
    });
    const sql = "DELETE FROM review WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error on server side" });
        return res.json(result);
    });
});

const validationCodes = {};

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'leona.popa16@gmail.com',
        pass: 'gsoi ifmp ngws spso'
    }
});

const sendValidationEmail = (email, token) => {
    const validationLink = `http://localhost:5173/validation?token=${token}`;
    
    const mailOptions = {
        from: 'leona.popa16@gmail.com',
        to: email,
        subject: 'Account Validation',
        html: `Please click the following link to validate your account: <a href="${validationLink}">${validationLink}</a>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

const send2StepsEmail = (email,code) => {
    const mailOptions = {
        from: 'leona.popa16@gmail.com',
        to: email,
        subject: 'Account Verify',
        html: `Please use the following code to verify your account: <b>${code}</b>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

app.post('/login',(req,res) => {
    console.log("Login...");
            const { username, password } = req.body;
            db.query('SELECT * FROM authentication WHERE username = ?', [username], (error, results) => {
                if (error) {
                    console.error("Error executing query:", error);
                    res.status(500).send("Internal Server Error");
                } else {
                    if (results.length > 0) {
                        const user = results[0];
                        bcrypt.compare(password, user.password, (err, passwordMatch) => {
                            if (err) {
                                console.error("Error comparing passwords:", err);
                                res.status(500).send("Internal Server Error");
                            } else {
                                if (passwordMatch) {
                                    if (user.isValid) {
                                        const code = randomstring.generate({ length: 6, charset: 'numeric' });
                                        validationCodes[username] = code;
                                        send2StepsEmail(user.email, code);
                                        res.status(200).json({ message: "Validation code sent successfully" });
                                    } else {
                                        console.log("Account not verified");
                                        res.status(403).send("Account needs to be verified first");
                                        sendValidationEmail(user.email, jwt.sign({ email: user.email }, '5nB0$CZ4*!8x@1WQzPmY&rS#6QD!oF$D', { expiresIn: '5m' }));
                                    }
                                } else {
                                    console.log("Invalid credentials");
                                    res.status(401).send("Invalid credentials");
                                }
                            }
                        });
                    } else {
                        console.log("Invalid credentials");
                        res.status(401).send("Invalid credentials");
                    }
                }
            });
})

app.post('/validate',(req,res)=> {
    const { token } = req.body;
            console.log(token);
            if (!token) {
                console.log("Token is missing");
                return res.status(400).send('Token is missing');
            }
            jwt.verify(token, '5nB0$CZ4*!8x@1WQzPmY&rS#6QD!oF$D', (err, decoded) => {
                if (err) {
                    console.error('Invalid token:', err);
                    return res.status(400).send('Invalid token');
                }
                const { email } = decoded;
                db.query('UPDATE authentication SET isValid = ? WHERE email = ?', [true, email], (updateError, updateResults) => {
                    if (updateError) {
                        console.error('Error updating user:', updateError);
                        return res.status(500).send('Internal Server Error');
                    }
                    console.log('User validated successfully');
                    return res.status(200).send('User validated successfully');
                });
            });
})

app.post('/verify',(req,res)=>{
    const { username, code } = req.body;
            console.log("Verify user...")
            if (!username || !code) {
                console.log('Username and code are required')
                return res.status(400).send('Username and code are required');
            }
            const storedCode = validationCodes[username];
            if (!storedCode) {
                console.log('Validation code not found')
                return res.status(404).send('Validation code not found');
            }
            if (code !== storedCode) {
                console.log('Invalid validation code');
                return res.status(401).send('Invalid validation code');
            }
            const token = jwt.sign({ username }, '5nB0$CZ4*!8x@1WQzPmY&rS#6QD!oF$D', { expiresIn: '5h' });
            res.status(200).json(token);
})

app.post('/register',(req,res)=> {
    console.log("Register...");
            const { email, username, password } = req.body;
            bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
                if (hashErr) {
                    console.error("Error hashing password:", hashErr);
                    res.status(500).send("Internal Server Error");
                } else {
                    db.query('SELECT * FROM authentication WHERE email = ? OR username = ?', [email, username], (error, results) => {
                        if (error) {
                            console.error("Error executing query:", error);
                            res.status(500).send("Internal Server Error");
                        } else {
                            if (results.length > 0) {
                                const existingEmail = results.find(result => result.email === email);
                                const existingUsername = results.find(result => result.username === username);
                                if (existingEmail && existingUsername) {
                                    console.log("Email and username already exist");
                                    res.status(409).send("Email and username already exist");
                                } else if (existingEmail) {
                                    console.log("Email already exists");
                                    res.status(409).send("Email already exists");
                                } else if (existingUsername) {
                                    console.log("Username already exists");
                                    res.status(409).send("Username already exists");
                                }
                            } else {
                                db.query('INSERT INTO authentication (email, username, password) VALUES (?, ?, ?)', [email, username, hashedPassword], (insertError, insertResults) => {
                                    if (insertError) {
                                        console.error("Error inserting user:", insertError);
                                        res.status(500).send("Internal Server Error");
                                    } else {
                                        console.log("User registered successfully");
                                        res.status(201).send("User registered successfully");
                                    }
                                });
                            }
                        }
                    });
                }
            });
})
app.listen(8081, ()=>{
    console.log("listening");
})

export default app;
