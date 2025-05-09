console.log('Main loaded');

const backgroundColours = ['red', 'blue', 'yellow', 'green', 'purple', 'orange'];

const bitcoin1w = document.querySelector('.bitcoin1w')
const bitcoin1m = document.querySelector('.bitcoin1m')
const bitcoin1y = document.querySelector('.bitcoin1y')
const bitcoin3y = document.querySelector('.bitcoin3y')

const chartbitcoin1wUrl = '/bitcoin1w';
const chartbitcoin1mUrl = '/bitcoin1m';
const chartbitcoin1yUrl = '/bitcoin1y';
const chartbitcoin3yUrl = '/bitcoin3y';

const canvases = document.querySelectorAll('canvas');
const buttons = document.querySelectorAll('button');


//grafiek 1
fetch(chartbitcoin1wUrl)
    .then(data => data.json())
    .then(jsonData => chartbitcoin1w(jsonData));

function chartbitcoin1w(jsonData) {
    console.log(jsonData['market-price']);
    const marketPrices = jsonData['market-price']
    const labels = []
    const data = []
    for (let index = 0; index < marketPrices.length; index++) {
        const marketPrice = marketPrices[index];
        labels.push(marketPrice.x)
        data.push(marketPrice.y)
    }
    console.log(labels);
    console.log(data);
    createchartbitcoin1w(bitcoin1w, labels, data);
}

function createchartbitcoin1w(canvasElement, labels, data) {
    new Chart(canvasElement, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                backgroundColor: backgroundColours,
                label: 'bitcoin 1w',
                data: data,
                borderWidth: 1
            }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

//grafiek 2
fetch(chartbitcoin1mUrl)
    .then(data => data.json())
    .then(jsonData => chartbitcoin1m(jsonData));

function chartbitcoin1m(jsonData) {
    console.log(jsonData['market-price']);
    const marketPrices = jsonData['market-price']
    const labels = []
    const data = []
    for (let index = 0; index < marketPrices.length; index++) {
        const marketPrice = marketPrices[index];
        labels.push(marketPrice.x)
        data.push(marketPrice.y)
    }
    console.log(labels);
    console.log(data);
    createchartbitcoin1m
        (bitcoin1m, labels, data);
}

function createchartbitcoin1m(canvasElement, labels, data) {
    new Chart(canvasElement, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                backgroundColor: backgroundColours,
                label: 'bitcoin 1m',
                data: data,
                borderWidth: 1
            }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

//grafiek 3
fetch(chartbitcoin1yUrl)
    .then(data => data.json())
    .then(jsonData => chartbitcoin1y(jsonData));

function chartbitcoin1y(jsonData) {
    console.log(jsonData['market-price']);
    const marketPrices = jsonData['market-price']
    const labels = []
    const data = []
    for (let index = 0; index < marketPrices.length; index++) {
        const marketPrice = marketPrices[index];
        labels.push(marketPrice.x)
        data.push(marketPrice.y)
    }
    console.log(labels);
    console.log(data);
    createchartbitcoin1y(bitcoin1y, labels, data);
}

function createchartbitcoin1y(canvasElement, labels, data) {
    new Chart(canvasElement, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                backgroundColor: backgroundColours,
                label: 'bitcoin 1y',
                data: data,
                borderWidth: 1
            }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


//grafiek 4
fetch(chartbitcoin3yUrl)
    .then(data => data.json())
    .then(jsonData => chartbitcoin3y(jsonData));

function chartbitcoin3y(jsonData) {
    console.log(jsonData['market-price']);
    const marketPrices = jsonData['market-price']
    const labels = []
    const data = []
    for (let index = 0; index < marketPrices.length; index++) {
        const marketPrice = marketPrices[index];
        labels.push(marketPrice.x)
        data.push(marketPrice.y)
    }
    console.log(labels);
    console.log(data);
    createchartbitcoin3y(bitcoin3y, labels, data);
}

function createchartbitcoin3y(canvasElement, labels, data) {
    new Chart(canvasElement, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                backgroundColor: backgroundColours,
                label: 'bitcoin 3y',
                data: data,
                borderWidth: 1
            }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}




// ...

// Hide all canvases except the first one
canvases.forEach((canvas, index) => {
    if (index > 0) {
      canvas.style.display = 'none';
    }
  });
  
  // Add event listeners to buttons to show corresponding canvas
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      canvases.forEach((canvas, canvasIndex) => {
        if (canvasIndex === index - 1) { // Adjusted index here
          canvas.style.display = 'block';
        } else {
          canvas.style.display = 'none';
        }
      });
    });
  });