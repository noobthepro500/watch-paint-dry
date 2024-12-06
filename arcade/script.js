let money = 100;
let itemsOwned = 0;
let incomePerSecond = 0;

// Predefined items (You can easily add more items here)
const items = [
    { name: "Widget", price: 10, income: 1 },
    { name: "Gadget", price: 50, income: 5 },
    { name: "Thingamajig", price: 100, income: 10 }
];

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

// Function to render items in the shop
function renderItems() {
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = ''; // Clear existing items
    items.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <span>${item.name} - $${item.price} (Income: $${item.income}/s)</span>
            <button onclick="buyItem(${index})">Buy</button>
        `;
        itemList.appendChild(itemDiv);
    });
}

// Function to buy an item
function buyItem(index) {
    const item = items[index];
    if (money >= item.price) {
        money -= item.price;
        itemsOwned++;
        incomePerSecond += item.income;
        showMessage(`You bought a ${item.name}!`);
        updateDisplay();
        saveGame(); // Save the game after buying an item
    } else {
        showMessage("Not enough money!");
    }
}

// Function to handle income generation
setInterval(() => {
    money += incomePerSecond;
    updateDisplay();
    saveGame(); // Save the game every second
}, 1000);

// Cheat panel functionality
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.shiftKey && event.key === 'C') {
        const cheatPanel = document.getElementById('cheat-panel');
        cheatPanel.style.display = cheatPanel.style.display === 'none' ? 'block' : 'none';
    }
});

// Add coins from cheat panel
document.getElementById('add-coins-button').addEventListener('click', () => {
    const cheatCoins = parseFloat(document.getElementById('cheat-coins').value);
    if (!isNaN(cheatCoins)) {
        money += cheatCoins;
        showMessage(`Added $${cheatCoins} to your balance!`);
        updateDisplay();
        saveGame(); // Save the game after adding coins
    }
});

// Set income from cheat panel
document.getElementById('set-income-button').addEventListener('click', () => {
    const cheatIncome = parseFloat(document.getElementById('cheat-income').value);
    if (!isNaN(cheatIncome)) {
        incomePerSecond = cheatIncome;
        showMessage(`Income per second set to $${cheatIncome}!`);
        updateDisplay();
        saveGame(); // Save the game after setting income
    }
});

// Function to save game state to cookies
function saveGame() {
    const gameState = {
        money: money,
        itemsOwned: itemsOwned,
        incomePerSecond: incomePerSecond
    };
    document.cookie = `gameState=${JSON.stringify(gameState)}; path=/; max-age=31536000`; // 1 year
}

// Function to load game state from cookies
function loadGame() {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        if (cookie.startsWith('gameState=')) {
            const gameState = JSON.parse(cookie.split('=')[1]);
            money = gameState.money;
            itemsOwned = gameState.itemsOwned;
            incomePerSecond = gameState.incomePerSecond;
            break;
        }
    }
}

// Load game state on page load
window.onload = () => {
    loadGame();
    renderItems();
    updateDisplay();
};
