import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "38b1ae37",
    database: "todolist",
});

const salt = 10;
const secretKey = "38b1ae37@S"; //secure key

// Register Route
app.post("/register", (req, res) => {
    const sql = "INSERT INTO users(`username`, `email`, `password`) VALUES(?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json("Error");

        const values = [req.body.username, req.body.email, hash];
        db.query(sql, [values], (err, result) => {
            if (err) console.log(err);
            else return res.json({ Status: "User Registered Successfully" });
        });
    });
});

// Login Route
app.post("/login", (req, res) => {
    const sql = "SELECT * FROM users WHERE `email`= ?";
    db.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ Error: "Error" });
        if (result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, response) => {
                if (err) return res.json({ Error: "Error" });
                if (response) {
                    // Generate JWT token on successful login
                    const token = jwt.sign({ id: result[0].id, email: result[0].email }, secretKey, { expiresIn: '1h' });
                    return res.json({ Status: "Success", token });
                } else {
                    return res.json({ Error: "Wrong Password" });
                }
            });
        } else {
            return res.json({ Error: "Email does not exist" });
        }
    });
});

// Middleware to verify JWT token
const verifyJWT = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(403).json({ Error: "No token provided" });
    }

    jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ Error: "Failed to authenticate token" });
        }
        req.userId = decoded.id; // Store userId for use in the next middleware
        next();
    });
};

// Protected Task Routes
// Get all tasks (protected)
app.get("/tasks", verifyJWT, (req, res) => {
    const sql = "SELECT * FROM tasks";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ Error: "Error fetching tasks" });
        res.json(result);
    });
});

// Create a new task (protected)
app.post("/tasks", verifyJWT, (req, res) => {
    const sql = "INSERT INTO tasks (name, description, dueDate, priority, status, assignee) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [req.body.name, req.body.description, req.body.dueDate, req.body.priority, req.body.status, req.body.assignee];
    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ Error: "Error adding task" });
        const newTask = { id: result.insertId, ...req.body };
        res.status(201).json(newTask);
    });
});

// Update a task (protected)
app.put("/tasks/:id", verifyJWT, (req, res) => {
    const sql = "UPDATE tasks SET name = ?, description = ?, dueDate = ?, priority = ?, status = ?, assignee = ? WHERE id = ?";
    const values = [req.body.name, req.body.description, req.body.dueDate, req.body.priority, req.body.status, req.body.assignee, req.params.id];
    db.query(sql, values, (err) => {
        if (err) return res.status(500).json({ Error: "Error updating task" });
        res.status(200).json({ message: "Task updated successfully" });
    });
});

// Delete a task (protected)
app.delete("/tasks/:id", verifyJWT, (req, res) => {
    const sql = "DELETE FROM tasks WHERE id = ?";
    db.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json({ Error: "Error deleting task" });
        res.status(200).json({ message: "Task deleted successfully" });
    });
});

// Server listening
app.listen(8081, () => {
    console.log("Server is running on port 8081");
});
