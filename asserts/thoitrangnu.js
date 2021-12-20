// var enter = document.getElementById("inputPro")

// function searchPro() {
//     var listProName = document.getElementById("list-names")
//     var proName = document.getElementsByClassName("pro-name")

//     input = enter.value.toUpperCase();

//     if (!input) {
//         listProName.style.display = null;
//     } else {
//         for (var i = 0; i < proName.length; i++) {
//             if (proName[i].innerHTML.toUpperCase().includes(input)) {
//                 listProName.style.display = "block";
//                 proName[i].style.display = "block";
//             } else {
//                 proName[i].style.display = "none";
//             }
//         }
//     }
// }
// enter.addEventListener("keyup", searchPro)

var proCard = [];
var proWoman = {
    img: ["https://preview.redd.it/0ooxxun2fr081.jpg?width=640&crop=smart&auto=webp&s=e6379193a53f34a380da394bd153b774448444be", "https://media.vogue.co.uk/photos/60435df8107e7ce55db43fb9/master/w_1080,h_1350,c_limit/jisoo%204.jpeg", "https://cdn.lifestyleasia.com/wp-content/uploads/sites/2/2021/03/11094125/dior-hisbiscus-medium-lady-d-lite-handbag-jisoo.jpg", "https://cdnmedia.thethaovanhoa.vn/Upload/BLtvcXjb72tSqs1jiHr8g/files/2021/08/V-alone1.jpg",
        "https://i.pinimg.com/originals/29/ae/3e/29ae3e96705c479380d3f6b6f8edda90.jpg", "https://media62times.com/wp-content/uploads/2021/08/V-Evolution13-1.jpg"
    ],
    proName: ["Áo khoác da Dior", "Váy & Túi Dior", "Túi xách Dior", "Áo khoác lông ấm áp mùa đông", "Túi xách con snake Gucci", "Áo Blazer màu xanh Bờ Lu"],
    pricePro: [4000, 2000, 3000, 2500, 3500, 4000],
    gender: ["female", "female", "female", "male", "male", "male"]
}
for (let i = 0; i < proWoman.img.length; i++) {
    var products = "<div class= 'card mx-3 my-3' style='width:350px;'>" +
        "<img class= 'card-img' src='" + proWoman.img[i] + "'style='width:100%; height: 400px; object-fit:cover;'>" +
        "<div class='card-body'>" +
        "<h4 class='card-title'>" + proWoman.proName[i] + "</h4>" +
        "<p class='card-price text-danger font-weight-bold'>$" + proWoman.pricePro[i] + "</p>" +
        "<button type='button' class='proButton' id='addCard' onclick='add(" + i + ")'>Đặt mua</button>" +
        "</div>" +
        "</div>"

    if (proWoman.gender[i] == "female") {
        document.getElementById('productWoman').innerHTML += products;

    } else {
        document.getElementById('productMan').innerHTML += products;
    }

}

// div ẩn hiện
function backHomePage() {
    document.getElementById("homePage").style.display = "block";
    document.getElementById("cardPage").style.display = "none";
    document.getElementById("paymentPage").style.display = "none";
    document.getElementById("billPage").style.display = "none";

}

function goCardPage() {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("paymentPage").style.display = "none";
    document.getElementById("cardPage").style.display = "block";
    document.getElementById("billPage").style.display = "none";

    addTong();
}

function goPaymentPage() {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("paymentPage").style.display = "block";
    document.getElementById("cardPage").style.display = "none";
    document.getElementById("billPage").style.display = "none";

    var nameP = "";
    for (let i = 0; i < proCard.length; i++) {
        nameP += `
        ${proCard[i].proName} <br>
        `;
    }

    var giamGia = 3000;
    var tongCong = (parseInt(all) - giamGia);
    if (tongCong < 0) {
        tongCong = 0;
        giamGia = all;
    }
    document.getElementById("pname3").innerHTML = nameP;
    document.getElementById("tamTinh3").innerHTML = "$" + all;
    document.getElementById("giamGia3").innerHTML = "$" + giamGia;
    document.getElementById("tongCong").innerHTML = "$" + tongCong;
}

function goBillPage() {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("paymentPage").style.display = "none";
    document.getElementById("cardPage").style.display = "none";
    document.getElementById("billPage").style.display = "block";
    showLastItem(proCard);
    showLastInfo();
}


// add to card
var id = 0;

function add(i) {
    id++;
    alert("Thêm vào giỏ hàng \"" + proWoman.proName[i] + "\"");

    proCard.push({
        img: proWoman.img[i],
        proName: proWoman.proName[i],
        pricePro: proWoman.pricePro[i],
        amount: 1,
        totalItemPrice: proWoman.pricePro[i],
    });

    var informNamePro = `
    <div>"${proWoman.proName[i]}" đã được thêm vào giỏ hàng</div>
    `;
    document.getElementById("headerCardPage").innerHTML = informNamePro

    for (var x = proCard.length - 1; x >= 0; x--) {
        var card = `
        <tr>
        <td>${id}</td> 
        <td> <img src="${proCard[x].img}" style="width:65px; height:75px; object-fit:cover;"></td>
        <td> ${proCard[x].proName}</td>
        <td>$${proCard[x].pricePro}</td>
        <td> <input type="number" min="1" max="10" value="0" id="qty${x}"  oninput="total(${x}); changeAmount(${x})"></td>
        <td id="total${x}"> </td>
        </tr>        
        `;

        document.getElementById('card').innerHTML += card;
        break;
    }
    goCardPage()

}


var all = 0; // Tổng tiền tất cả các sản phẩm
var total_a = 0;
function finalTotal() { //Tính tổng tiền tất cả các sản phẩm
    all = 0;
    for (let i = 0; i < proCard.length; i++) {
        var qty = document.getElementById("qty" + i).value;
        var total = qty * proCard[i].pricePro;
        all += total;
        total_a = total;
    }
}

function total(x) { //Tính tổng tiền của mỗi sản phẩm khi thay đổi số lượng
    var qty = document.getElementById("qty" + x).value;
    var total = qty * proCard[x].pricePro;
    document.getElementById("total" + x).innerHTML = "$" + total;

    finalTotal();

    document.getElementById("allTotal").innerHTML = "$" + all;
    addTong();
}

function addTong() {
    document.getElementById("tamTinh").innerHTML = "$" + all;
    document.getElementById("tong").innerHTML = "$" + all;

}


//Trang thanh toán 
var bill3 = [];
var confirmVal = 0;


function pconfirm3() {
    var cname = document.getElementById('name3').value;
    var phone = document.getElementById('phone3').value;
    var email = document.getElementById('email3').value;
    var address = document.getElementById('address3').value;
    var note = document.getElementById('note3').value;
    var inform = `
        <div class="row bg-success p-3">
        <div class="col-md-6">
        Tên khách hàng: <br> Điện thoại: <br> Email: <br> Địa chỉ: <br> Ghi chú: 
        </div>
        <div class="col-md-6 text-right">
        ${cname} <br> ${phone} <br> ${email} <br> ${address} <br> ${note}
        </div>
        </div>
        `;

    document.getElementById('confirm').innerHTML = inform;

    bill3.push({
        cname: cname,
        phone: phone,
        email: email,
        address: address,
        note: note
    });

}

function changeAmount(x) {
    proCard[x].amount = document.getElementById("qty"+x).value;
}


function changeTotalPrice(x, total) {
    proCard[x].totalItemPrice = total;
}


function showLastItem(proCard) {
    for (let i = 0; i < proCard.length; i++) {
        var element =
            `<div class="item-last">
            <div class="item-describe">
                <img src="${proCard[i].img}" alt="">
                <div class="detailed">
                    <div class="name-item">${proCard[i].proName}</div>
                    <div class="amount">${proCard[i].amount}</div>
                </div>
            </div>
            <div class="item-total-price">${proCard[i].totalItemPrice}</div>
        </div>`
        var farther = document.getElementById("product-details");
        farther.innerHTML += element
        document.getElementById('total-value').innerHTML = total_a;
    }
}

function showLastInfo() {
    var info = `
    <div class="info-deli">
        <div class="userName">${bill3[0].cname}</div>
        <div class="phoneNum">${bill3[0].phone}</div>
        <div class="address">${bill3[0].address}</div>
    </div>`
    var information = document.getElementById('delivery-address').innerHTML += info
    document.getElementById('total-value').innerHTML = total_a;
    console.log(info)
}

