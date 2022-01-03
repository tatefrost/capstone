const addBtn = document.querySelector('#plus-button')
const budgetContainer = document.querySelector('.budgets')
const incr = document.querySelector('#intInput')
const entBtn = document.querySelector('#ent')


const baseURL = `http://localhost:4000/api/budgets`

const budgetsCallback = ({ data: allBudgets }) => displayBudgets(allBudgets)
const errCallback = err => console.log(err)

const getBudgets = () => axios.get(baseURL).then(budgetsCallback).catch(errCallback)
const createBudget = () => axios.post(baseURL).then(budgetsCallback).catch(errCallback)
const deleteBudget = id => axios.delete(`${baseURL}/${id}`).then(budgetsCallback).catch(errCallback)
const addCategory = id => axios.put(`${baseURL}/${id}`).then(budgetsCallback).catch(errCallback)
const editAmount = (id, type, amount) => axios.put(`${baseURL}/amount/${id}`, {type, amount}).then(budgetsCallback).catch(errCallback)
const editCatAmount = (id, type) => axios.put(`${baseURL}/category/amount/${id}`, {type}).then(budgetsCallback).catch(errCallback)
const editIncrement = (num) => axios.put(`${baseURL}/increment`, {num}).then(budgetsCallback).catch(errCallback)




const addBudgetCard = budget => {
  let budgetCont = document.createElement('div')
  budgetCont.classList.add('budget')

  const dec = document.querySelector('.decreaseAmount')

  
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
  <button id="minus" onclick="editAmount(${budget.id}, 'minus')">-</button>
  <input id="decreaseAmount" type="number">
  </form><br><br>
  </div>
  <form>
  <label>Increase</label>
  <button id="catAdd" onclick="editCatAmount(${budget.id}, 'plus')">+</button>
  <input type="number">
  </form>
  <h4 id="category">Category 1: $${budget.categories['Category 1']}</h4>
  <form>
  <label>Decrease</label>
  <button onclick="editCatAmount(${budget.id}, 'minus')">-</button id="catMin">
  <input type="number">
  </form><br><br>
  <button id="cat" onclick="addCategory(${budget.id})">add category+</button><br><br><br>
  
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  
  <div>
  <canvas id="myChart" width="200px" height="400px"></canvas>
  </div>
  <div>
  <script>
  const ctx = document.getElementById('myChart');
  
  const category = document.getElementById('category')
  
  const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Category 1', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: 'Amount:',
        data: ['${budget.categories['Category 1']}', 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  </script>
  </div> 
  `)
  document.querySelector('#incrementerBtn').addEventListener('click', incrementer)

  function incrementer (e) {
    e.preventDefault()
    const inc = document.querySelector('.increaseAmount').value

    editAmount(budget.id, 'plus',+inc)
  }

  budgetContainer.appendChild(budgetCont)
}

// function addCat (event) {
//   const cont = document.querySelector('#budgets')
//   const budgetCont = document.createElement('div')
//   budgetCont.innerHTML = `</form>
//   <button>+</button>
//   <h4 id="category">Category: $${budget.categories['Category 2']}</h4>
//   <button>-</button>
//   <form>
//   <label>Decrease</label>
//   <input type="text">
//   </form><br><br>
//   <button onclick="addCategory(${budget.id})" id="addCat">add category+</button>`
//   cont.append(budgetCont)
// }

// const catAdd = document.querySelector('#addCat')


// catAdd.addEventListener('click', addCat)

function displayBudgets(arr) {
  budgetContainer.innerHTML = ``
  for (let i = 0; i < arr.length; i++) {
    addBudgetCard(arr[i])
  }
}

function newBudget (event) {
  createBudget()
}

function changeIncrement (event) {
  event.preventDefault()
  editIncrement(incr.value)
  incr.value = ''
}

addBtn.addEventListener('click', newBudget)
entBtn.addEventListener('click', changeIncrement)

getBudgets()