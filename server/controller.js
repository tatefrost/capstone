let globalId = 2
let increment = 100

const allBudgets = [
  {
    "id": 1,
    "name": "Budget 1",
    "amount": 100,
    "categories": {
      "Category 1": 100
    },
    "cats": 2,
  }
]

module.exports = {
  budgets: (req, res) => {
    res.status(200).send(allBudgets)
  },
  createBudget: (req, res) => {
    let newBudget = {
      name: `Budget ${globalId}`,
      amount: 100,
      categories: {
        "Category 1": 100
      },
      id: globalId,
      cats: 2,
    }
    allBudgets.push(newBudget)
    res.status(200).send(allBudgets)
    globalId++
  },
  editAmount: (req, res) => {
    let {id} = req.params
    let {type, amount} = req.body

    let index = allBudgets.findIndex(elem => +elem.id === +id)

    if (allBudgets[index].amount <= 0 && type === 'minus') {
      res.status(400).send('cannot be below 0')
    } else if (type === 'plus') {
      allBudgets[index].amount += amount

      console.log(req.body)
      console.log(allBudgets[index].amount)


      res.status(200).send(allBudgets)
    } else if (type === 'minus') {
      allBudgets[index].amount -= 100
      res.status(200).send(allBudgets)
    }
  },
  deleteBudget: (req, res) => {
    let {id} = req.params

    let index = allBudgets.findIndex(elem => +elem.id === +id);
    allBudgets.splice(index, 1);
    res.status(200).send(allBudgets)
    globalId--
  },
  addCategory: (req, res) => {
    let {id} = req.params
    
    let index = allBudgets.findIndex(elem => +elem.id === +id);
    allBudgets[index].categories[`Category ${allBudgets[index].cats}`] = 100
    allBudgets[index].cats++
    
    console.log(allBudgets[index])

    res.status(200).send(allBudgets)
  },
  editCatAmount: (req, res) => {
    let {id} = req.params
    let {type} = req.body

    let index = allBudgets.findIndex(elem => +elem.id === +id)

    if (allBudgets[index].categories['Category 1'] <= 0 && type === 'minus') {
      res.status(400).send('cannot be below 0')
    } else if (type === 'plus') {
      allBudgets[index].categories['Category 1'] += 100
      res.status(200).send(allBudgets)
    } else if (type === 'minus') {
      allBudgets[index].categories['Category 1'] -= 100
      res.status(200).send(allBudgets)
    }
  },
  changeIncrement: (req, res) => {
    let {amount} = req.body
    increment = amount
    console.log(amount)
    res.status(200)
  }
}
