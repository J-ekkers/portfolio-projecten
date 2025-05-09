const ctx1 = document.querySelector('#myChart1');
const ctx2 = document.querySelector('#myChart2');
const ctx3 = document.querySelector('#myChart3');
const ctx4 = document.querySelector('#myChart4');
// wind degrees
  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        label: '# Rain Amount (ml)',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 4,
        borderRadius: 10
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Tempartuur
  new Chart(ctx2, {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        label: '# Africa',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 4,
        borderRadius: 10
      },
      {
        label: '# America',
        data: [10, 9, 23, 15, 2, 1],
        borderWidth: 4,
        borderRadius: 10
      }
    ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Disasters
  new Chart(ctx3, {
    type: 'radar',
    data: {
      labels: ['Asia', 'Africa', 'Europe', 'South America'],
      datasets: [{
        label: '# Worst disasters recorded',
        data: [12, 19, 3, 5],
        borderWidth: 4,
        borderRadius: 10
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Natural ramps
  new Chart(ctx4, {
    type: 'doughnut',
    data: {
      labels: ['Asia', 'Africa', 'Europe', 'South America', 'North America', 'Antaratica'],
      datasets: [{
        label: '# Wind Direction',
        data: [12, 19, 3, 5, 2,1],
        borderWidth: 4,
        borderRadius: 10
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  async function weatherAPI (){
    const apiUrl= "https://dummy.restapiexample.com/api/v1/employees"

    const response = await fetch(apiUrl)
    const barChartData = await response.json()

    console.log(barChartData)

const salary = barChartData.data.map ( (x) => x.employee_salary)
const age = barChartData.data.map ( (x) => x.employee_age)
const name = barChartData.data.map ( (x) => x.employee_name)

console.log(salary, age, name)
  }