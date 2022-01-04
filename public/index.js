const addBtn = document.querySelector('#plus-button')
const budgetContainer = document.querySelector('.budgets')

const baseURL = `http://localhost:4000/api/budgets`

const budgetsCallback = ({ data: allBudgets }) => displayBudgets(allBudgets)
const catsCallback = ({ data: allBudgets}) => displayCategories(allBudgets)
const errCallback = err => console.log(err)

const getBudgets = () => axios.get(baseURL).then(budgetsCallback).catch(errCallback)
const getCats = id => axios.get(`${baseURL}/cats/${id}`).then(catsCallback).catch(errCallback)
const createBudget = () => axios.post(baseURL).then(budgetsCallback).catch(errCallback)
const deleteBudget = id => axios.delete(`${baseURL}/${id}`).then(budgetsCallback).catch(errCallback)
const addCategory = id => axios.put(`${baseURL}/${id}`).then(budgetsCallback).catch(errCallback)
const editAmount = (id, type, amount) => axios.put(`${baseURL}/amount/${id}`, {type, amount}).then(budgetsCallback).catch(errCallback)
const editCatAmount = (id, type, amount, name) => axios.put(`${baseURL}/category/amount/${id}`, {type, amount, name}).then(budgetsCallback).catch(errCallback)


const addBudgetCard = budget => {
  let budgetCont = document.createElement('div')
  budgetCont.classList.add('budget')
  
  budgetCont.innerHTML = (`<h2>${budget.name}</h2>
  <div><br>
  <button onclick="deleteBudget(${budget.id})" id='deleteBudget'>delete</button><br><br>
  </div>
  <div>
  <form>
  <label>Increase</label>
  <button id="incrementerBtn">+</button>
  <input class="increaseAmount" type="number">
  </form>
  <h4 id="total">Total: $${budget.amount}</h4>
  <form>
  <label>Decrease</label>
  <button id="minus">-</button>
  <input id="decreaseAmount" type="number">
  </form><br><br>
  </div>
  <button id="addCat">add category+</button><br><br>

  <section id="categoryContainer">
  </form>
  <label>Increase</label>
  <button id="catAdd">+</button>
  <input id="catAddInput" type="number">
  <h4 id="category">Category ${budget.cats - 1}: ${budget.categories['Category 1']}$</h4>
  <form>
  <label>Decrease</label>
  <button id="catMinus">-</button>
  <input id="catMinusInput" type="number">
  </form><br><br>
  </section>
  `)
  budgetContainer.appendChild(budgetCont)
  
  
  
  document.querySelector('#incrementerBtn').addEventListener('click', incrementer)
  
  function incrementer (e) {
    e.preventDefault()
    const inc = document.querySelector('.increaseAmount').value
    
    editAmount(budget.id, 'plus',+inc)
  }
  
  document.querySelector('#minus').addEventListener('click', minus)
  
  function minus (e) {
    e.preventDefault()
    const dec = document.querySelector('#decreaseAmount').value
    
    editAmount(budget.id, 'minus', +dec)
  }
  

  document.querySelector('#addCat').addEventListener('click', addCat)
  
  function addCat (event) {
    addCategory(budget.id)
    getBudgets()
    getCats(budget.id)
  }
  
  document.querySelector('#catAdd').addEventListener('click', catPlus)
  
  function catPlus (e) {
    e.preventDefault()
    const inc = document.querySelector('#catAddInput').value
    let cat = document.querySelector('#category')
    let catCont = cat.textContent
    console.log(catCont)
    let cont = catCont.split('')
    console.log(cont)
    let catName = ''
    function findName (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== ':') {
          catName += arr[i]
        } else if (arr[i] === ':') {
          break
        }
      }
    }
    findName(cont)
    console.log(catName)
    editCatAmount(budget.id, 'plus', +inc, catName)
    console.log('sent')
  }
  
  document.querySelector('#catMinus').addEventListener('click', catMinus)
  
  function catMinus (e) {
    e.preventDefault()
    const dec = document.querySelector('#catMinusInput').value

    let cat = document.querySelector('#category')
    let catCont = cat.textContent
    console.log(catCont)
    let cont = catCont.split('')
    console.log(cont)
    let catName = ''
    function findName (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== ':') {
          catName += arr[i]
        } else if (arr[i] === ':') {
          break
        }
      }
    }
    findName(cont)
    console.log(catName)
    editCatAmount(budget.id, 'minus', +dec, catName)
    console.log('sent')
    
  }
  
  
}

function displayCats (budget) {
  console.log(budget)
  let catCont = document.querySelector('#categoryContainer')
  catCont.innerHTML = ''
  for (let key in budget.categories) {
    const cont = document.createElement('div')
    console.log(key)
    cont.innerHTML = `</form>
    <label>Increase</label>
    <button id="catAdd">+</button>
    <input id="catAddInput" type="number">
    <h4 id="category">${key}: ${budget.categories[key]}$</h4>
    <form>
    <label>Decrease</label>
    <button id="catMinus">-</button>
    <input id="catMinusInput" type="number">
    </form><br><br>`
    catCont.append(cont)
  }
}

function displayCategories (arr) {
  let budgetCont = document.querySelector('.budget')
  console.log(arr)
  for (let i = 0; i < arr.length ; i++) {
    displayCats(arr[i])
  }
}

function displayBudgets(arr) {
  budgetContainer.innerHTML = ``
  for (let i = 0; i < arr.length; i++) {
    addBudgetCard(arr[i])
    displayCategories(arr[i])
  }
}



function newBudget (event) {
  createBudget()
}

addBtn.addEventListener('click', newBudget)

getBudgets()