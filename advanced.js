/**
 * FOOD WISE: ADVANCED TECH MODULE
 * Features: AI Recipe Suggestion, IoT Sensor Simulation, 
 * Real-time Expiry Alerts, and Predictive Insights.
 */

// 1. SIMULATED IOT SENSOR INTEGRATION
// Addresses: "Integration with IoT devices" 
function simulateIoTSync() {
    const iotMockData = [
        { name: "Organic Milk", cat: "Dairy", qty: 1, expiry: "2026-02-18" },
        { name: "Fresh Berries", cat: "Fruits", qty: 2, expiry: "2026-02-16" },
        { name: "Greek Yogurt", cat: "Dairy", qty: 1, expiry: "2026-02-20" }
    ];

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let inventory = JSON.parse(localStorage.getItem(`inventory_${currentUser.email}`)) || [];

    // Simulate smart sensing and auto-adding to database
    iotMockData.forEach(item => {
        inventory.push({ ...item, id: Date.now() + Math.random() });
    });

    localStorage.setItem(`inventory_${currentUser.email}`, JSON.stringify(inventory));
    
    // Refresh the UI if the function exists on the current page
    if (typeof renderAll === "function") renderAll();
    
    alert("IoT Sync Complete: 3 items detected by Smart Fridge sensors!");
}

// 2. AI RECIPE KNOWLEDGE BASE
// Addresses: "AI-driven recommendations" 
const recipeDatabase = [
    { name: "Vegetable Stir-Fry", ingredients: ["Vegetables", "Grains"], instructions: "Quickly sauté your expiring veggies and serve over a bed of grains." },
    { name: "Smoothie Power Bowl", ingredients: ["Fruits", "Dairy"], instructions: "Blend wilting fruits with milk or yogurt for a zero-waste breakfast." },
    { name: "Cheesy Pasta Bake", ingredients: ["Dairy", "Grains"], instructions: "Combine pasta with any expiring cheese or milk for a hearty meal." }
];

// 3. PREDICTIVE LOGIC FOR RECIPE SUGGESTIONS
function getSmartRecipe() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const inventory = JSON.parse(localStorage.getItem(`inventory_${currentUser.email}`)) || [];
    
    const today = new Date();
    const expiringSoon = inventory.filter(item => {
        const diff = Math.ceil((new Date(item.expiry) - today) / (1000 * 60 * 60 * 24));
        return diff >= 0 && diff <= 3;
    });

    if (expiringSoon.length === 0) return null;

    const expiringCats = expiringSoon.map(i => i.cat);
    return recipeDatabase.find(r => r.ingredients.some(ing => expiringCats.includes(ing)));
}

// 4. REAL-TIME BROWSER ALERTS
// Addresses: "Timely alerts for items nearing expiration" [cite: 18]
function initializeSmartAlerts() {
    if (Notification.permission === "default") {
        Notification.requestPermission();
    }
}

function checkAndNotify() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const inventory = JSON.parse(localStorage.getItem(`inventory_${currentUser.email}`)) || [];
    
    inventory.forEach(item => {
        const daysLeft = Math.ceil((new Date(item.expiry) - new Date()) / (1000 * 60 * 60 * 24));
        if (daysLeft === 1) {
            new Notification("FoodVault: Action Required", {
                body: `${item.name} expires tomorrow! Use it or donate it to reduce waste.`,
                icon: "https://cdn-icons-png.flaticon.com/512/2927/2927347.png"
            });
        }
    });
}