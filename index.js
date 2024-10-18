// Counter App
saved_counts = []

clicks = 0
clickPower = 1
powerUpgradeCost = 10

powerCostDisplay = document.getElementById("increment-power-cost").innerHTML
powerCostDisplay.innerHTML = powerUpgradeCost



function increment() {
    clicks++
    document.getElementById("count-el").innerText = clicks
}

function upgradeClickPower() {
    if (clicks >= powerUpgradeCost) {
        clicks -= powerUpgradeCost
        clickPower++
        powerUpgradeCost = Math.floor(powerUpgradeCost * 1.1)
    }
}

function save() {
    saved_counts.push(clicks)
    clicks = 0
    document.getElementById("count-el").innerText = clicks
    document.getElementById("saved-counts").innerText = saved_counts
}