// ==========================================
// 1. NAVIGATION ROUTING (DRY Principle)
// ==========================================
const routes = [
    { selector: "#startBtn", url: "OTP Page.html" },
    { selector: ".back-btn", url: "OTP Page.html" },
    { selector: "#cardSlide", url: "Mess Card.html" },
    { selector: "#homeSlide", url: "Home Page.html" },
    { selector: "#orderSlide", url: "Orders.html" },
    { selector: "#profileSlide", url: "Profile.html" },
    { selector: "#myOrder", url: "Orders.html" },
    { selector: "#logoutBtn", url: "index.html" },
    { selector: ".fab-button", url: "Crave Bot.html" },
    { selector: ".fill", url: "Home Page.html" },
    { selector: ".back-btn4", url: "Home Page.html" },
    { selector: ".back-btn5", url: "Home Page.html" },
    { selector: ".backky", url: "Home Page.html" },
    { selector: ".back-btn12", url: "Home Page.html" },
    { selector: "#G_cafe", url: "Gcafe.html" },
    { selector: "#Unicafe", url: "Uni Cafe.html" },
    { selector: ".spacer", url: "Food_dash.html" },
    { selector: "#talentCafe", url: "Talent Cafe.html" }
];

routes.forEach(route => {
    const element = document.querySelector(route.selector);
    if (element) {
        element.addEventListener("click", () => window.location.href = route.url);
    }
});

const sendOtpBtn = document.querySelector("#sendOtpBtn");
if (sendOtpBtn) {
    sendOtpBtn.addEventListener("click", () => {
        alert("OTP sent to your university email.");
        window.location.href = "Verify OTP.html";
    });
}

const verifyBtn = document.querySelector("#verifyBtn");
if (verifyBtn) {
    verifyBtn.addEventListener("click", () => {
        alert("Welcome Back to G-Dinner");
        window.location.href = "Home Page.html";
    });
}

const buyBtn = document.querySelector('.btn-buy');
if (buyBtn) {
    buyBtn.addEventListener('click', () => {
        alert('Navigating to Mess Package options...');
    });
}

// ==========================================
// 2. UI INTERACTIONS & MODALS
// ==========================================
const boxes = document.querySelectorAll(".meal-card");
const qr = document.querySelector(".qrcode");
if (boxes.length > 0 && qr) {
    boxes.forEach(box => {
        box.addEventListener("click", () => qr.style.display = "flex");
    });
    qr.addEventListener("click", () => qr.style.display = "none");
}

const box1 = document.querySelector("#Custosup");
const qr1 = document.querySelector(".qrcode1");
if (box1 && qr1) {
    box1.addEventListener("click", () => qr1.style.display = "flex");
    qr1.addEventListener("click", () => qr1.style.display = "none");
}

const mainContent = document.querySelector('.main-content');
const appContainer = document.querySelector('.app-container');
if (mainContent && appContainer) {
    mainContent.addEventListener('scroll', () => {
        if (mainContent.scrollTop > 40) {
            appContainer.classList.add('scrolled');
        } else {
            appContainer.classList.remove('scrolled');
        }
    });
}

// ==========================================
// 3. GLOBAL PAGE LOAD EVENTS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes("index.html")) {
        setTimeout(() => window.location.href = "Welcome Page.html", 2000);
    }

    const navItems = document.querySelectorAll('.nav-item');
    if (navItems.length > 0) {
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }

    const chatContainer = document.querySelector(".chat-container");
    if (chatContainer) {
        setTimeout(() => chatContainer.style.marginTop = "", 500);
    }
});

// ==========================================
// 4. MENU & CART SYSTEM (WITH REFRESH FIX)
// ==========================================
const menuData = [
    { id: 1, name: 'Coffee', price: 40, category: 'Beverages', qty: 0 },
    { id: 2, name: 'Tea', price: 20, category: 'Beverages', qty: 0 },
    { id: 3, name: 'Americano', price: 60, category: 'Beverages', qty: 0 },
    { id: 4, name: 'Espresso', price: 60, category: 'Beverages', qty: 0 },
    { id: 5, name: 'Bread and Jam', price: 40, category: 'Breakfast', qty: 0 },
    { id: 6, name: 'Pancake', price: 80, category: 'Breakfast', qty: 0 },
    { id: 7, name: 'Omelette', price: 60, category: 'Breakfast', qty: 0 },
    { id: 8, name: 'Dosa', price: 60, category: 'Breakfast', qty: 0 },
    { id: 9, name: 'Meals', price: 40, category: 'Lunch', qty: 0 },
    { id: 10, name: 'Biryani', price: 70, category: 'Lunch', qty: 0 },
    { id: 11, name: 'Fried Rice', price: 60, category: 'Lunch', qty: 0 },
    { id: 12, name: 'Noodles', price: 60, category: 'Lunch', qty: 0 },
    { id: 13, name: 'Tiramisu', price: 90, category: 'Deserts', qty: 0 },
    { id: 14, name: 'Pineapple Pastry', price: 90, category: 'Deserts', qty: 0 },
    { id: 15, name: 'Black Forest Pastry', price: 100, category: 'Deserts', qty: 0 },
    { id: 16, name: 'Blueberry Pastry', price: 100, category: 'Deserts', qty: 0 },
    { id: 17, name: 'Green Tea', price: 30, category: 'Beverages', qty: 0 }
];

const menuGrid = document.getElementById('menuGrid');
const tabs = document.querySelectorAll('.tab');

function loadCartFromLocal() {
    const currentCafeName = document.body.getAttribute('data-cafe-name') || "G Cafe";
    const savedCart = JSON.parse(localStorage.getItem('qdiner_cart')) || [];
    
    savedCart.forEach(cartItem => {
        if (cartItem.category === currentCafeName) {
            const menuItem = menuData.find(m => m.name === cartItem.name);
            if (menuItem) {
                menuItem.qty = cartItem.qty;
            }
        }
    });
}

function saveCartToLocal() {
    const currentCafeName = document.body.getAttribute('data-cafe-name') || "G Cafe"; 
    let globalCart = JSON.parse(localStorage.getItem('qdiner_cart')) || [];
    
    globalCart = globalCart.filter(item => item.category !== currentCafeName);

    menuData.forEach(item => {
        if (item.qty > 0) {
            globalCart.push({
                name: item.name,
                price: item.price,
                qty: item.qty,
                category: currentCafeName 
            });
        }
    });
    
    localStorage.setItem('qdiner_cart', JSON.stringify(globalCart));
}

function renderMenu(categoryFilter) {
    if (!menuGrid) return;
    menuGrid.innerHTML = ''; 
    const filteredItems = categoryFilter === 'All Items' 
        ? menuData 
        : menuData.filter(item => item.category === categoryFilter);

    filteredItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.setAttribute('data-price', item.price); 
        card.innerHTML = `
        <div class="card-image-placeholder">
            <svg width="35" height="35" viewBox="0 0 24 24" fill="white"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
        </div>
        <div class="card-details">
            <h3 class="item-name">${item.name}</h3>
            <div class="price-row">
            <span class="item-price">₹ ${item.price}</span>
            <div class="counter-pill">
                <button class="btn-minus" data-id="${item.id}">&minus;</button>
                <span class="count">${item.qty}</span>
                <button class="btn-plus" data-id="${item.id}">&plus;</button>
            </div>
            </div>
        </div>
        `;
        menuGrid.appendChild(card);
    });
    attachButtonListeners(); 
}

function updateCartUI() {
    let totalItems = 0;
    let totalPrice = 0;
    menuData.forEach(item => {
        totalItems += item.qty;
        totalPrice += (item.price * item.qty);
    });
    const totalItemsEl = document.getElementById('totalItems');
    const totalPriceEl = document.getElementById('totalPrice');

    if (totalItemsEl) totalItemsEl.innerText = `${totalItems} Items`;
    if (totalPriceEl) totalPriceEl.innerText = `₹ ${totalPrice}`;
    
    saveCartToLocal(); 
}

function attachButtonListeners() {
    document.querySelectorAll('.btn-plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const item = menuData.find(i => i.id === id);
            item.qty++;
            e.target.previousElementSibling.innerText = item.qty; 
            updateCartUI();
        });
    });

    document.querySelectorAll('.btn-minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const item = menuData.find(i => i.id === id);
            if (item.qty > 0) {
                item.qty--;
                e.target.nextElementSibling.innerText = item.qty; 
                updateCartUI();
            }
        });
    });
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelector('.tab.active').classList.remove('active');
        tab.classList.add('active');
        renderMenu(tab.getAttribute('data-category'));
    });
});

const cartSummaryEl = document.getElementById('cartSummary');
if (cartSummaryEl) {
    cartSummaryEl.addEventListener('click', () => {
        window.location.href = 'payment.html'; 
    });
}

if (menuGrid) {
    loadCartFromLocal(); 
    renderMenu('All Items');
    updateCartUI(); 
}

// ==========================================
// 5. CHECKOUT & PAYMENT PAGE
// ==========================================
let cart = JSON.parse(localStorage.getItem('qdiner_cart')) || [];
const cartItemsContainer = document.getElementById('cartItemsContainer');
const headerItemCount = document.getElementById('headerItemCount');
const billOrderAmount = document.getElementById('billOrderAmount');
const billTotal = document.getElementById('billTotal');
const payBtn = document.getElementById('payBtn');
const backBtnCheckout = document.getElementById('backBtn');

function renderCart() {
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = '';

    let totalItems = 0;
    let orderAmount = 0;
    const convenienceFee = 0; 

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; color:#888; padding: 20px;">Your cart is empty.</p>';
        if (headerItemCount) headerItemCount.innerText = '0 Items';
        if (billOrderAmount) billOrderAmount.innerText = '₹ 0';
        if (billTotal) billTotal.innerText = '₹ 0';
        return;
    }

    cart.forEach((item, index) => {
        totalItems += item.qty;
        const itemTotal = item.price * item.qty;
        orderAmount += itemTotal;

        const card = document.createElement('div');
        card.className = 'cart-item-card';
        card.innerHTML = `
        <div class="item-info-row">
            <div class="item-image">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#888"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
            </div>
            <div class="item-details">
                <h3 class="item-name">${item.name}</h3>
                <p class="item-meta">${item.category}</p>
            </div>
        </div>
        <div class="item-action-row">
            <div class="counter-pill">
                <button class="btn-trash" data-index="${index}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
                <span class="count">${item.qty}</span>
                <button class="btn-plus-cart" data-index="${index}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
            </div>
            <span class="item-total-price">₹ ${itemTotal}</span>
        </div>
        `;
        cartItemsContainer.appendChild(card);
    });

    if (headerItemCount) headerItemCount.innerText = `${totalItems} Item${totalItems !== 1 ? 's' : ''}`;
    if (billOrderAmount) billOrderAmount.innerText = `₹ ${orderAmount}`;
    if (billTotal) billTotal.innerText = `₹ ${orderAmount + convenienceFee}`;

    attachCartListeners(); 
}

function attachCartListeners() {
    document.querySelectorAll('.btn-plus-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.currentTarget.getAttribute('data-index');
            cart[index].qty++;
            saveAndRender();
        });
    });

    document.querySelectorAll('.btn-trash').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.currentTarget.getAttribute('data-index');
            cart[index].qty--;
            if(cart[index].qty === 0) cart.splice(index, 1); 
            saveAndRender();
        });
    });
}

function saveAndRender() {
    localStorage.setItem('qdiner_cart', JSON.stringify(cart));
    renderCart();
}

if (backBtnCheckout) {
    backBtnCheckout.addEventListener('click', () => window.history.back());
}

if (payBtn) {
    payBtn.addEventListener('click', async () => {
        const originalText = payBtn.innerText;
        payBtn.innerText = 'Processing...';
        payBtn.disabled = true;
        payBtn.style.opacity = '0.7';

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert(`Payment of ${billTotal.innerText} successful! Your order has been placed.`);
            localStorage.removeItem('qdiner_cart');
            cart = [];
            renderCart();
        } catch (error) {
            alert("Payment failed. Please try again.");
        } finally {
            payBtn.innerText = originalText;
            payBtn.disabled = false;
            payBtn.style.opacity = '1';
        }
    });
}

if (cartItemsContainer) renderCart();

// ==========================================
// 6. OTP INPUT LOGIC
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll(".otp-input");
    inputs.forEach((input, index) => {
        input.addEventListener("keydown", (e) => {
            if (e.key >= "0" && e.key <= "9") {
                input.value = e.key; 
                if (index < inputs.length - 1) inputs[index + 1].focus();
                e.preventDefault();
            } else if (e.key === "Backspace") {
                if (input.value === "" && index > 0) {
                    inputs[index - 1].value = "";
                    inputs[index - 1].focus();
                } else {
                    input.value = "";
                }
                e.preventDefault();
            } else if (e.key !== "Tab" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
                e.preventDefault();
            }
        });
        input.addEventListener("click", () => input.select());
    });
});

const photo3=document.querySelector("#photo3");
if(photo3){
    photo3.addEventListener("click",()=>{
        window.location.href="Profile.html"
    })
}
