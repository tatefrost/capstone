let globalId = 2

const allBudgets = [
  {
    "id": 1,
    "name": "Budget 1",
    "amount": 0,
    "categories": {
      "Category 1": 0
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
      allBudgets[index].amount -= amount
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
    allBudgets[index].categories[`Category ${allBudgets[index].cats}`] = 0
    allBudgets[index].cats++
    
    console.log(allBudgets[index])

    res.status(200).send(allBudgets)
  },
  editCatAmount: (req, res) => {
    let {id} = req.params
    let {type, amount, name} = req.body

    let index = allBudgets.findIndex(elem => +elem.id === +id)
    if (allBudgets[index].categories[name] <= 0 && type === 'minus') {
      res.status(400).send('cannot be below 0')
    } else if (type === 'plus') {
      allBudgets[index].categories[name] += amount
      res.status(200).send(allBudgets)
    } else if (type === 'minus') {
      allBudgets[index].categories[name] -= amount
      res.status(200).send(allBudgets)
    }
  },
  getCategories: (req, res) => {
    let {id} = req.params
    
    
    let index = allBudgets.findIndex(elem => +elem.id === +id)
    
    console.log(allBudgets[index].categories)

    res.status(200).send(allBudgets)
  }
}
