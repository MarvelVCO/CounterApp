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

displays = [
    [clicksDisplay, () => Math.floor(clicks)],
    [powerCostDisplay, () => Math.floor(powerUpgradeCost)],
    [clickPowerDisplay, () => Math.floor(clickPower)],
    [savedCountsDisplay, () => savedCounts],
    [savedTotalDisplay, () => Math.floor(savedTotal)],
    [cpsCostDisplay, () => Math.floor(cpsUpgradeCost)],
    [cpsPercentageDisplay, () => Math.floor(cpsPercentage)],
    [cpsDisplay, () => Math.floor(dcps)]
];

function updateDisplays() {
    for (let [displayElement, valueFunc] of displays) {
        displayElement.innerText = valueFunc();
    }
}

function increment() {
    clicks += clickPower
}

function upgradeClickPower() {
    if (clicks >= powerUpgradeCost) {
        clicks -= powerUpgradeCost
        clickPower = (clickPower + 1) * 1.1
        powerUpgradeCost += 10
    }
}

function upgradeCPSPercentage() {
    if (clicks >= cpsUpgradeCost) {
        clicks -= cpsUpgradeCost
        cpsPercentage++
        cpsUpgradeCost = Math.floor(cpsUpgradeCost * 1.2) 
    }
}

function autoIncrementByCPS() {
    clicks += (savedTotal * cpsPercentage) / 100
}

function save() {
    savedCounts.push(Math.floor(clicks))
    savedTotal += clicks
    clicks = 0
}

function calculateCPS() {
    dcps = Math.max(Math.floor(clicks - lastClickCount), 0);
    lastClickCount = clicks;
}


setInterval(autoIncrementByCPS, 1000)
setInterval(calculateCPS, 1000);
setInterval(updateDisplays, 100);
