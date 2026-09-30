function goToAddress() {
    window.location.href = "address.html";
}

function saveAddress() {
    const name =
        document.getElementById("name").value;
    const phone =
        document.getElementById("deliveryPhone").value;
    const address =
        document.getElementById("address").value;

    if (name === "" || phone === "" || address === "") {
        alert("กรุณากรอกข้อมูลให้ครบ");
        return;
    }
    localStorage.setItem(
         "customerName",
         name
);

    localStorage.setItem(
         "customerPhone",
         phone
);

    localStorage.setItem(
         "customerAddress",
         address
);

    window.location.href = "food.html"
}
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

function addToCart(name, price) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].quantity++;
            displayCart();
            return;
        }
    }

    cart.push({
        name: name,
        price: price,
        quantity: 1
    });

    displayCart();
    alert("เพิ่ม " + name + " ลงตะกร้าแล้ว");
}

function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

function decreaseQuantity(index) {
    cart[index].quantity--;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    displayCart();
}

function increaseQuantity(index) {
    cart[index].quantity++;
    displayCart();
}

function displayCart() {
    sessionStorage.setItem(
    "cart",
    JSON.stringify(cart)
);
    const cartElement =
        document.getElementById("cart");
    if (cartElement === null) {
        return;
    }
    let html = "";
    for (let i = 0; i < cart.length; i++) {
        html +=
            cart[i].name +
            " × " +
            cart[i].quantity +
            " - " +
            (cart[i].price * cart[i].quantity) +
            " บาท " +
            "<button onclick=\"decreaseQuantity(" + i + ")\">−</button> " +
            "<button onclick=\"increaseQuantity(" + i + ")\">+</button><br>";
    }
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
    }
    html += 
    "<br><div class=\"cart-total\">รวมทั้งหมด " + 
    total + 
    " บาท</div>";
    cartElement.innerHTML = html;
}

function goToOrder() {

    if (cart.length === 0) {
        alert("กรุณาเลือกอาหารก่อน");
        return;
    }

    sessionStorage.setItem(
    "cart",
    JSON.stringify(cart)
);
    window.location.href = "order.html";
}

function loadOrder() {
    const customerName =
        localStorage.getItem("customerName");

    const customerPhone =
        localStorage.getItem("customerPhone");

    const customerAddress =
        localStorage.getItem("customerAddress");

document.getElementById("customerName").innerHTML =
        "ชื่อผู้รับ: " + customerName;

document.getElementById("customerPhone").innerHTML =
        "เบอร์โทร: " + customerPhone;

document.getElementById("customerAddress").innerHTML =
        "ที่อยู่: " + customerAddress;
    const orderItems =
        document.getElementById("orderItems");
    if (orderItems === null) {
        return;
    }
    const savedCart =
        sessionStorage.getItem("cart");
    if (savedCart === null) {
        orderItems.innerHTML =
             "ยังไม่มีรายการอาหาร";
        return;
    }
    const cart = JSON.parse(savedCart);
    let html = "";
    for (let i = 0; i < cart.length; i++) {
        html +=
            cart[i].name +
            " × " +
            cart[i].quantity +
            " - " +
            (cart[i].price * cart[i].quantity) +
            " บาท<br>";
    }
    orderItems.innerHTML = html;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
    }
    const orderTotal =
        document.getElementById("orderTotal");
    if (orderTotal !== null) {
        orderTotal.innerHTML =
            total + " บาท";
    }
}

function confirmOrder() {
    const savedCart =
         sessionStorage.getItem("cart");

    localStorage.setItem(
        "confirmedCart",
        savedCart
);
   localStorage.setItem(
       "orderStatus",
       "รับออเดอร์"
);
    window.location.href = "tracking.html"
}

function cancelOrder() {
    localStorage.setItem(
        "orderStatus",
        "ยกเลิกออเดอร์"
    );
    alert("ยกเลิกออเดอร์เรียบร้อยแล้ว");
    loadTracking();
}

function loadTracking() {
    const trackingItems =
        document.getElementById("trackingItems");

    const confirmedCart =
        localStorage.getItem("confirmedCart");

    if (trackingItems !== null && confirmedCart !== null) {

       const cart =
           JSON.parse(confirmedCart);

       let html = "";

       for (let i = 0; i < cart.length; i++) {

           html +=
               cart[i].name +
               " × " +
               cart[i].quantity +
               " - " +
               (cart[i].price * cart[i].quantity) +
               " บาท<br>";
    }

    trackingItems.innerHTML = html;
    const trackingTotal =
    document.getElementById("trackingTotal");

    if (trackingTotal !== null) {

       let total = 0;

       for (let i = 0; i < cart.length; i++) {
           total +=
                cart[i].price *
                cart[i].quantity;
    }

    trackingTotal.innerHTML =
        total + " บาท";
}
}

    const statusElement =
        document.getElementById("orderStatus");

    const messageElement =
        document.getElementById("orderMessage");
    const trackingCustomerName =
    document.getElementById("trackingCustomerName");

const trackingCustomerPhone =
    document.getElementById("trackingCustomerPhone");

const trackingCustomerAddress =
    document.getElementById("trackingCustomerAddress");

if (trackingCustomerName !== null) {
    trackingCustomerName.innerHTML =
        "ชื่อผู้รับ: " +
        localStorage.getItem("customerName");
}

if (trackingCustomerPhone !== null) {
    trackingCustomerPhone.innerHTML =
        "เบอร์โทร: " +
        localStorage.getItem("customerPhone");
}

if (trackingCustomerAddress !== null) {
    trackingCustomerAddress.innerHTML =
        "ที่อยู่: " +
        localStorage.getItem("customerAddress");
}

    if (statusElement === null || messageElement === null) {
        return;
    }

    const status =
        localStorage.getItem("orderStatus");

    if (status === "ยกเลิกออเดอร์") {

        statusElement.innerHTML =
            "ยกเลิกออเดอร์";

        messageElement.innerHTML =
            "ออเดอร์นี้ถูกยกเลิกแล้ว";

        updateTrackingButtons();

        return;
    }

    if (status === "รับออเดอร์") {

       statusElement.innerHTML =
            "🟢 รับออเดอร์";

       messageElement.innerHTML =
            "ร้านได้รับออเดอร์ของคุณแล้ว";

    updateTrackingButtons();

    return;
}
    if (status === "กำลังจัดส่ง") {

       statusElement.innerHTML =
            "🚚 กำลังจัดส่ง";

       messageElement.innerHTML =
            "ออเดอร์กำลังเดินทางไปหาคุณ";

       updateTrackingButtons();

    return;
}
    if (status === "ส่งสำเร็จ") {

       statusElement.innerHTML =
            "✅ ส่งสำเร็จ";

       messageElement.innerHTML =
            "จัดส่งอาหารถึงคุณเรียบร้อยแล้ว";

        updateTrackingButtons();

    return;
}

    statusElement.innerHTML =
       "🟡 กำลังเตรียมอาหาร";

    messageElement.innerHTML =
       "ร้านกำลังเตรียมอาหารของคุณ";

    updateTrackingButtons();
}

function prepareOrder() {
    localStorage.setItem(
        "orderStatus",
        "กำลังเตรียมอาหาร"
    );

    loadTracking();
}

function startDelivery() {
    localStorage.setItem(
        "orderStatus",
        "กำลังจัดส่ง"
    );

    loadTracking();
}

function completeOrder() {
    localStorage.setItem(
        "orderStatus",
        "ส่งสำเร็จ"
    );

    loadTracking();
}

function updateTrackingButtons() {
    const prepareButton =
        document.getElementById("prepareButton");

    const deliveryButton =
        document.getElementById("deliveryButton");

    const completeButton =
        document.getElementById("completeButton");

    const cancelButton =
        document.querySelector(".cancel-button");

    const status =
        localStorage.getItem("orderStatus");

    prepareButton.style.display = "none";
    deliveryButton.style.display = "none";
    completeButton.style.display = "none";
    cancelButton.style.display = "block";

    if (status === "รับออเดอร์") {
        prepareButton.style.display = "block";
    }

    if (status === "กำลังเตรียมอาหาร") {
        deliveryButton.style.display = "block";
    }

    if (status === "กำลังจัดส่ง") {
        completeButton.style.display = "block";
    }

    if (
        status === "ส่งสำเร็จ" ||
        status === "ยกเลิกออเดอร์"
    ) {
        cancelButton.style.display = "none";
    }
}

    if (document.getElementById("cart") !== null) {
    displayCart();
}