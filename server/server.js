const PORT = process.env.PORT ?? 8000;

const express = require('express');
const {v4: uuidv4} = require('uuid');
const app = express();
const pool = require('./db');
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.send('hello');
});

app.use(express.json());


// getting Todos by email
app.get('/todos/:userEmail', async (req, res) => {
    console.log(req);
    const {userEmail} = req.params;

    try {
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
        res.json(todos.rows)
    } catch (error) {
        console.error('error');
    }
});

// getting all Todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await pool.query('SELECT * FROM todos');
        res.json(todos.rows)
    } catch (error) {
        console.error('error');
    }
});


//post a new ToDo
app.post('/todos', async (req, res) => {
    const {user_email, title, progress, date} = req.body;
    const id = uuidv4();
    console.log(user_email, title, progress, date);
    try {
        const newTodo = await pool.query(`INSERT INTO todos (id, user_email, title, progress, date) VALUES ($1, $2, $3, $4, $5)`,
            [id, user_email, title, progress, date]);
        res.json(newTodo);
    } catch (error) {
        console.error('error');
    }
})

//editing a todo
app.put('/todos/:id', async (req, res) => {
    const {id} = req.params;
    const {user_email, title, progress, date} = req.body;
    try {
        const editTodo = await pool.query(`UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;`,
            [user_email, title, progress, date, id]);
        res.json(editTodo);
    } catch (error) {
        console.error('error');
    }
})

//delete a todo item
app.delete('/todos/:id', async (req, res) => {
    const {id} = req.params;
    const {user_email, title, progress, date} = req.body;
    try {
        const deleteTodo = await pool.query(`DELETE FROM todos WHERE id = $1`, [id]);
        res.json(deleteTodo);
    } catch (error) {
        console.error('error');
    }
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));



