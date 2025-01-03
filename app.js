const ctx = document.getElementById('myChart');

const tBody = document.getElementById("tbodyTable");
let avaibleTimeInput = document.getElementById("avaibleTimeInput").value
let currentLevelInput = document.getElementById("currentLevelInput").value
let desirebleLevelInput = document.getElementById("desirebleLevelInput").value

let resultTable = document.getElementById("resultTable")

const clXp = 60000  //Cealing xp level
const clTw = 478000 //Cealing twenth level

let globalOutput = ""

function hoursNeededLv(level){
  let arithmetic = (5 * ( (30 * level) - 361))/42
  return arithmetic
}

function xpAcquired(level) {
  let arithmetic = ((level - 20) * clXp) + clTw
  return arithmetic
}

function minutesNeeded(level) {
  let arithmetic = (xpAcquired(level) / 5600) * 20
  return parseInt(arithmetic)
}

function xpNeeded() {
  let arithmetic = xpAcquired(parseInt(desirebleLevelInput)) - xpAcquired(parseInt(currentLevelInput))
  return arithmetic
}

function hoursNeeded() {
  let arithmetic = (xpNeeded() / 280) / 60
  return parseInt(arithmetic)
}

function daysNeeded() {
  let arithmetic = hoursNeeded() / avaibleTimeInput
  return parseInt(arithmetic)
}

//  ^
//  | 8==D

function chart(level, i) {
  tBody.innerHTML += `
                  <tr>

                <td>${level}</td>
                <td>${parseInt(minutesNeeded(level) / 60)}</td>
                <td>${minutesNeeded(level)}</td>
                <td>${xpAcquired(level)}</td>
              </tr>
              `
}

for (let a = 1; a < 100; a++) { //Initiates charts
  chart(a + 19, a)
}

function simulator() {
  avaibleTimeInput = parseInt(document.getElementById("avaibleTimeInput").value)
  currentLevelInput = parseInt(document.getElementById("currentLevelInput").value)
  desirebleLevelInput = parseInt(document.getElementById("desirebleLevelInput").value)

  resultTable.innerHTML = `
                    <table class="table table-striped" id="resultTabled">
                    <thead>
                      <tr>
                        <th scope="col" style="font-size: 18pt;" >Results</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Days needed to complete</td>
                      </tr>
                      <tr>
                        <td>${daysNeeded()}</td>
                      </tr>
                      <tr>
                        <td>Xp needed to complete</td>
                      </tr>
                      <tr>
                        <td>${xpNeeded()}</td>
                      </tr>
                      <tr>
                        <td>Hours needed to complete</td>
                      </tr>
                      <tr>
                        <td>${hoursNeeded()}</td>
                      </tr>
                    </tbody>
                  </table>
    `

  let newLabels = []
  let newData = []
  for(let j = currentLevelInput; j <= desirebleLevelInput; j++){
    newLabels.push(j)
    newData.push(parseInt(hoursNeededLv(j)))
    console.log(hoursNeededLv(j))
  }


graphicChart(mychart, newLabels, newData)
}

function graphicChart(chart, newLabels, newData) { //Just updates  the chart
  chart.data.labels = newLabels;
  chart.data.datasets[0].data = newData; 
  chart.update();
}

const mychart =  new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["20", '21', '22', '23', '24', '25'],
    datasets: [{
      label: 'level per hours',
      data: [28, 32, 35, 39, 42, 46],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      x: {
        title: {
            display: true, // Ativa o título
            text: 'Level', // Texto do eixo X
            font: {
                size: 16 // Tamanho da fonte
            }
        }
      },
      y: {
        title: {
          display: true, // Ativa o título
          text: 'Hour', // Texto do eixo Y
          font: {
              size: 16 // Tamanho da fonte
          }
        }
      }
    }
  }
});
