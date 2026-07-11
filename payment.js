document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    
    if (cartItemsContainer) {
        let cart = JSON.parse(localStorage.getItem('qdiner_cart')) || [];
        let currentOrderAmount = 0;

        const headerItemCount = document.getElementById('headerItemCount');
        const billOrderAmount = document.getElementById('billOrderAmount');
        const billTotal = document.getElementById('billTotal');
        const payBtn = document.getElementById('payBtn');
        const backBtn = document.getElementById('backBtn');

        function renderCart() {
            cartItemsContainer.innerHTML = '';
            let totalItems = 0;
            let orderAmount = 0;
            
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p style="text-align:center; color:#888; padding: 20px;">Your cart is empty.</p>';
                if (headerItemCount) headerItemCount.textContent = '0 Items';
                if (billOrderAmount) billOrderAmount.textContent = '₹ 0';
                if (billTotal) billTotal.textContent = '₹ 0';
                currentOrderAmount = 0;
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                        <span class="count">${item.qty}</span>
                        <button class="btn-plus" data-index="${index}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                    </div>
                    <span class="item-total-price">₹ ${itemTotal}</span>
                </div>
                `;
                cartItemsContainer.appendChild(card);
            });

            currentOrderAmount = orderAmount; 
            if (headerItemCount) headerItemCount.textContent = `${totalItems} Item${totalItems !== 1 ? 's' : ''}`;
            if (billOrderAmount) billOrderAmount.textContent = `₹ ${orderAmount}`;
            if (billTotal) billTotal.textContent = `₹ ${orderAmount}`;

            attachCartListeners();
        }

        function attachCartListeners() {
            document.querySelectorAll('.btn-plus').forEach(btn => {
                btn.onclick = (e) => {
                    const index = parseInt(e.currentTarget.getAttribute('data-index'), 10);
                    if (cart[index]) {
                        cart[index].qty++;
                        saveAndRender();
                    }
                };
            });

            document.querySelectorAll('.btn-trash').forEach(btn => {
                btn.onclick = (e) => {
                    const index = parseInt(e.currentTarget.getAttribute('data-index'), 10);
                    if (cart[index]) {
                        cart[index].qty--;
                        if (cart[index].qty <= 0) {
                            cart.splice(index, 1); 
                        }
                        saveAndRender();
                    }
                };
            });
        }

        function saveAndRender() {
            localStorage.setItem('qdiner_cart', JSON.stringify(cart));
            renderCart();
        }

        if (backBtn) {
            backBtn.onclick = () => { window.history.back(); };
        }

        if (payBtn) {
            payBtn.onclick = () => {
                if (cart.length > 0) {
                    const amountDisplay = document.querySelector('.amount');
                    if (amountDisplay) 
                        amountDisplay.innerHTML = `₹ ${currentOrderAmount}`;
                    localStorage.setItem('qdiner_payment_total', currentOrderAmount);
                    localStorage.removeItem('qdiner_last_order'); 
                    localStorage.removeItem('qdiner_cart');
                    
                    cart = [];
                    renderCart();

                    window.location.href = "payment2.html";
                } else {
                    alert("Your cart is empty!");
                }
            };
        }

        renderCart();
    }

    // ==========================================
    // 2. PAYMENT INTERMEDIARY SUCCESS LOGIC
    // ==========================================
    const finalAmount = document.getElementById("finalAmount");
    const orderIdEl = document.getElementById("orderId");
    const orderDateEl = document.getElementById("orderDate");

    if (finalAmount || orderIdEl || orderDateEl) {
        const savedAmount = localStorage.getItem('qdiner_payment_total');
        
        if (finalAmount) {
            finalAmount.textContent = savedAmount ? `₹ ${savedAmount}` : "₹ 0";
        }

        if (orderDateEl) {
            const today = new Date();
            orderDateEl.textContent = today.toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        }

        if (orderIdEl) {
            orderIdEl.textContent = Math.floor(10000 + Math.random() * 90000);
        }
    }

    const tokenNumberEl = document.getElementById('tokenNumber');
    
    if (tokenNumberEl) {
        const totalPaidEl = document.getElementById('totalPaid');
        const billOrderAmountEl = document.getElementById('billOrderAmount');
        const billTotalEl = document.getElementById('billTotal');

        const lastPaymentAmount = localStorage.getItem('qdiner_payment_total') || '0';
        
        let lastOrderNumber = localStorage.getItem('qdiner_last_order');
        if (!lastOrderNumber) {
            lastOrderNumber = Math.floor(100 + Math.random() * 900); 
            localStorage.setItem('qdiner_last_order', lastOrderNumber);
        }

        tokenNumberEl.textContent = `#${lastOrderNumber}`;
        if (totalPaidEl) totalPaidEl.textContent = `₹ ${lastPaymentAmount}`;
        if (billOrderAmountEl) billOrderAmountEl.textContent = `₹ ${lastPaymentAmount}`;
        if (billTotalEl) billTotalEl.textContent = `₹ ${lastPaymentAmount}`;

        const qrBtn = document.getElementById('qrBtn');
        if (qrBtn) {
            qrBtn.onclick = () => {
                alert(`Displaying QR Code for Token #${lastOrderNumber} at the collection counter!`);
            };
        }
    }

    const homeSlide = document.querySelector("#homeSlide");
    if (homeSlide) homeSlide.onclick = () => { window.location.href = "Home Page.html"; };

    const profileSlide = document.querySelector("#profileSlide");
    if (profileSlide) profileSlide.onclick = () => { window.location.href = "Profile.html"; };

    const orderSlide = document.querySelector("#orderSlide");
    if (orderSlide) orderSlide.onclick = () => { window.location.href = "Orders.html"; };

    const viewOrderBtn = document.querySelector("#viewOrderBtn");
    if (viewOrderBtn) viewOrderBtn.onclick = () => { window.location.href = "Food_dash.html"; };

    const cardSlide = document.querySelector("#cardSlide");
    if (cardSlide) cardSlide.onclick = () => { window.location.href = "Mess Card.html"; };

    const backBtn90 = document.querySelector("#backBtn90");
    if (backBtn90) {
        backBtn90.addEventListener("click", () => {
            window.location.href = "Orders.html";
        });
    }

    const boxes = document.querySelectorAll("#qrBtn1");
    const qr = document.querySelector(".qrcode");

    if (boxes.length > 0 && qr) {
        boxes.forEach(box => {
            box.addEventListener("click", () => {
                qr.style.display = "flex";
            });
        });

        qr.addEventListener("click", function() {
            qr.style.display = "none"; 
        });
    }
});