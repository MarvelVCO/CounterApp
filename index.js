// Counter App
savedCounts = []
savedTotal = 0
cpsPercentage = 5
cpsUpgradeCost = 50 

clicks = 0
clickPower = 1
powerUpgradeCost = 10

lastClickCount = 0
dcps = 0

// Displays
clicksDisplay = document.getElementById("count-el")
powerCostDisplay = document.getElementById("increment-power-cost")
clickPowerDisplay = document.getElementById("click-power-display")
savedCountsDisplay = document.getElementById("saved-counts")
savedTotalDisplay = document.getElementById("saved-total")
cpsCostDisplay = document.getElementById("cps-upgrade-cost")
cpsPercentageDisplay = document.getElementById("cps-percentage-display")
cpsDisplay = document.getElementById("cps-display")

displays = [ // Array of displays to make updating easier. Second value is set to a function that returns the value of the relevant variable.
    [clicksDisplay, () => Math.floor(clicks)],
    [powerCostDisplay, () => Math.floor(powerUpgradeCost)],
    [clickPowerDisplay, () => Math.floor(clickPower)],
    [savedCountsDisplay, () => savedCounts],
    [savedTotalDisplay, () => Math.floor(savedTotal)],
    [cpsCostDisplay, () => Math.floor(cpsUpgradeCost)],
    [cpsPercentageDisplay, () => Math.floor(cpsPercentage)],
    [cpsDisplay, () => Math.floor(dcps)]
];

function updateDisplays() { // Iterates through all the displays in the array and sets their value to be the result of the function attatched to it
    for (let [displayElement, valueFunc] of displays) {
        displayElement.innerText = valueFunc();
    }
}

function increment() {
    clicks += clickPower
}

function upgradeClickPower() { // Each upgrade makes your clicks 1 stronger and then multiplies it by 1.1 since if all I did was multiply it would be really bad to begin with
    if (clicks >= powerUpgradeCost) {
        clicks -= powerUpgradeCost
        clickPower = (clickPower + 1) * 1.1
        powerUpgradeCost += 10
    }
}

function upgradeCPSPercentage() { // cps represents the clicks you get per second, which is based off of an upgradable percentage of the total clicks you have saved
    if (clicks >= cpsUpgradeCost) {
        clicks -= cpsUpgradeCost
        cpsPercentage++
        cpsUpgradeCost = Math.floor(cpsUpgradeCost * 1.2) 
    }
}

function autoIncrementByCPS() { // Increments clicks by the total saved clicks multiplied by cps percentage
    clicks += (savedTotal * cpsPercentage) / 100
}

function save() { // Adds the saved click value to the array of saved clicks, and the save total
    savedCounts.push(Math.floor(clicks))
    savedTotal += clicks
    clicks = 0
}

function calculateCPS() { // Calculates by checking how much your clicks have changed every second (cant show negative numbers)
    dcps = Math.max(Math.floor(clicks - lastClickCount), 0);
    lastClickCount = clicks;
}


setInterval(autoIncrementByCPS, 1000) // Increments CPS by the value determined by the function every second
setInterval(calculateCPS, 1000); // Sets the calculateCPS function to get the avg amount your clicks changed over a second (1000ms)
setInterval(updateDisplays, 100); // Updates all the different numbers 10 times a second 
