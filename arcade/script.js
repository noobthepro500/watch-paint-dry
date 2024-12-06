let money = 100;
let itemsOwned = 0;
const itemPrice = 10;
let incomePerSecond = 0;

document.getElementById('money').innerText = money;
document.getElementById('items-owned').innerText = itemsOwned;
document.getElementById('item-price').innerText = itemPrice;
document.getElementById('income').innerText = incomePerSecond;

// Function to update the display
function updateDisplay() {
    document.getElementById('money').innerText = money.toFixed(2);
    document.getElementById('items-owned').innerText = itemsOwned;
    document.getElementById('income').innerText = incomePerSecond.toFixed(2);
}

// Function to show messages
function showMessage(msg) {
    const messageDiv = document.getElementById('message');
    messageDiv.innerText = msg;
    setTimeout(() => {
        messageDiv.innerText = '';
    }, 2000);
}

// Buy button event listener
document.getElementById('buy-button').addEventListener('click', () => {
    if (money >= itemPrice) {
        money -= itemPrice;
        itemsOwned++;
        incomePerSecond += 1; // Increase income per second for each item owned
        updateDisplay();
        showMessage("You bought a paint bucket!");
    } else {
        showMessage("Not enough money to buy!");
    }
});

// Sell button event listener
document.getElementById('sell-button').addEventListener('click', () => {
    if (itemsOwned > 0) {
        money += itemPrice;
        itemsOwned--;
        incomePerSecond -= 1; // Decrease income per second for each item sold
        updateDisplay();
        showMessage("You sold a Widget !");
    } else {
        showMessage("You have no items to sell!");
    }
});

// Income generation every second
setInterval(() => {
    money += incomePerSecond;
    updateDisplay();
}, 1000);

// Initial display update
updateDisplay();
