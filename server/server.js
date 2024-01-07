const PORT = process.env.PORT ?? 8000;

const express = require('express');
const app = express();
const pool = require('./db');
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.send('hello');
});


// getting all Todos
app.get('/todos/:userEmail', async (req, res) => {
    console.log(req);
    const { userEmail } = req.params;

   try {
const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
       res.json(todos.rows)
   } catch (error){
       console.error('error');
   }
});


app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`));



