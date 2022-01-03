const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

const ctrl = require('./controller.js')

app.get('/api/budgets', ctrl.budgets)
app.post('/api/budgets', ctrl.createBudget)
app.post('/api/budgets/:id', ctrl.addCategory)
app.put('/api/budgets/amount/:id', ctrl.editAmount)
app.put('/api/budgets/category/amount/:id', ctrl.editCatAmount)
app.put('/api/budgets/increment', ctrl.changeIncrement)
app.delete('/api/budgets/:id', ctrl.deleteBudget)


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.get('/styles', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/styles.css'))
})

app.get('/js', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.js'))
})

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`Running from the law on port ${port}`));