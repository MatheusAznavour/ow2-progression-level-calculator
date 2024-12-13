const tBody = document.getElementById("tbodyTable");
let avaibleTimeInput = document.getElementById("avaibleTimeInput").value
let currentLevelInput = document.getElementById("currentLevelInput").value
let desirebleLevelInput = document.getElementById("desirebleLevelInput").value

let resultTable = document.getElementById("resultTable")

const clXp = 60000  //Cealing xp level
const clTw = 478000 //Cealing twenth level

let globalOutput = ""


function xpAcquired(level){
	let arithmetic = ((level - 20) * clXp) + clTw
	return arithmetic
}

function minutesNeeded(level){
	let arithmetic = (xpAcquired(level) / 5600)  * 20
	return parseInt(arithmetic)
}

function xpNeeded(){
    console.log(`
        CURRENT LEVEL: ${currentLevelInput}
        DESIREBLE INPUT: ${desirebleLevelInput}
        `)
    let arithmetic = xpAcquired(parseInt(desirebleLevelInput)) - xpAcquired(parseInt(currentLevelInput))
    return arithmetic
}

function hoursNeeded(){
	let arithmetic = (xpNeeded()/280)/60
	return parseInt(arithmetic)
}

function daysNeeded(){
    let arithmetic = hoursNeeded()/avaibleTimeInput
	return parseInt(arithmetic)
}

//  ^
//  | 8==D

function chart(level, i){
    tBody.innerHTML += `
                  <tr>

                <td>${level}</td>
                <td>${parseInt(minutesNeeded(level) / 60)}</td>
                <td>${minutesNeeded(level)}</td>
                <td>${xpAcquired(level)}</td>
              </tr>
              `
}

for(let a = 1; a < 100; a++){
    chart(a + 19, a)
}

function simulator(){
    avaibleTimeInput = document.getElementById("avaibleTimeInput").value
    currentLevelInput = document.getElementById("currentLevelInput").value
    desirebleLevelInput = document.getElementById("desirebleLevelInput").value
    console.log(daysNeeded())

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

}



