
function addCount() {
    if (localStorage.getItem("orderData") == null) {
        document.getElementById("counter").innerHTML = 0;
    }
    else {
        orderContainer = [];
        orderContainer = JSON.parse(localStorage.getItem("orderData"));
        document.getElementById("counter").innerHTML = orderContainer.length;

    }

}
function getCategory() {
    addCount();
    const Http = new XMLHttpRequest();
    const url = 'http://127.0.0.1:8000/api/cat';
    Http.open("GET", url);
    Http.send()
    var temp = `<div class="container-fluid mt-3 ">`
    Http.onreadystatechange = (e) => {
        if (Http.readyState == 4 && Http.status == 200) {
            var cat = JSON.parse(Http.response)
            for (var i = 0; i < cat.length; i++) {
                temp += `
                    <button onclick="getItem(`+ cat[i].id + `)" class="btn btn-success mt-3 " style="height: 100px;width:200px" >` + cat[i].name + `</button>
                `;
            }
            temp += `</div>`;

            document.getElementById("content").innerHTML = temp;
        }

    }
}
//localStorage.removeItem("mytime");
function getItem(id) {
    if (localStorage.getItem("orderData") == null) {
        orderContainer = [];
        localStorage.setItem("orderData", JSON.stringify(orderContainer));
    }
    const Http = new XMLHttpRequest();
    const url = 'http://127.0.0.1:8000/api/items/' + id + '';
    Http.open("GET", url);
    Http.send()
    var temp = `<div class=" mt-3 w-100">
    <table class="table">
        <thead>
            <tr>
                <th>name</th>
                <th>price</th>
                <th>total number</th>
                <th>number</th>
                <th>total price</th>
                <th>clickAdd</th>
            </tr>
        </thead>
        <tbody>`;
    Http.onreadystatechange = (e) => {
        if (Http.readyState == 4 && Http.status == 200) {
            var item = JSON.parse(Http.response)
            for (var i = 0; i < item.length; i++) {
                temp += `<tr>
                <td scope="row" id="name`+ item[i].id + `">` + item[i].item_name + `</td>
                <td id="price`+ item[i].id + `">` + item[i].price + ` </td>
                <td id="totalNumber`+ item[i].id + `">` + item[i].number + `</td>
                <td><select onchange="setPrice(`+ item[i].id + `)" name="num1" id="num` + item[i].id + `" aria-placeholder="0">
                    <option value="0" selected>0</option> 
                    `;
                for (var j = 1; j <= item[i].number; j++) {
                    temp += `<option value="` + j + `" >` + j + `</option>`
                }
                temp += `</select></td>
                    <td id="total`+ item[i].id + `"></td>
                    `;
                if (item[0].number == 0) {
                    temp += `
                        <td><button class=" btn btn-primary"  onclick="addItem(`+ item[i].id + `)">add</button></td>
                        </tr>`;
                }
                else {
                    temp += `
                        <td><button class=" btn btn-primary" onclick="addItem(`+ item[i].id + `)">add</button></td>
                        </tr>`;
                }
            }
            temp += `</tbody>
            </table>
            `
            document.getElementById("content").innerHTML = temp;
        }

    }
    addCount();
}
function addItem(id) {
    orderContainer = [];
    orderContainer = JSON.parse(localStorage.getItem("orderData"));
    var num = document.getElementById("num" + id + "");
    var itemNumber = num.options[num.selectedIndex].value;
    if (itemNumber != 0) {
        var itemPrice = document.getElementById("price" + id + "").innerText;
        var itemName = document.getElementById("name" + id + "").innerText;
        var totalNumber = document.getElementById("totalNumber" + id + "").innerText;
        var itemprice = Number(itemPrice);
        var number = Number(itemNumber);
        var itemArray = { code: id, name: itemName, price: itemprice, totalprice: itemprice * number, number: itemNumber, totalNumber: totalNumber };
        orderContainer.push(itemArray);
        localStorage.setItem("orderData", JSON.stringify(orderContainer));
        addCount();
    }

}
function setPrice(id) {
    var num = document.getElementById("num" + id + "");
    var itemNumber = num.options[num.selectedIndex].value;
    var itemPrice = document.getElementById("price" + id + "").innerText;
    number = Number(itemNumber)
    price = Number(itemPrice);
    var totalPrice = price * number;
    document.getElementById("total" + id + "").innerHTML = totalPrice;
}
function getCart() {
    orderContainer = [];
    orderContainer = JSON.parse(localStorage.getItem("orderData"));
    var temp = `<div class=" mt-3 container">
    <table class="table">
        <thead>
            <tr>
                <th>name</th>
                <th>change number</th>
                <th>price</th>
                <th>real price</th>
                <th>delete</th>
            </tr>
        </thead>
        <tbody>`;
    for (var i = 0; i < orderContainer.length; i++) {
        temp += `<tr>
        <td scope="row" id="name`+ i + `">` + orderContainer[i].name + `</td>
        <td><select onchange="update_item_number(`+ i + `)" name="num` + i + `" id="num` + i + `" aria-placeholder="0">`;
        for (var j = 1; j <= orderContainer[i].totalNumber; j++) {
            temp += `<option value="` + j + `"`;
            if (j == orderContainer[i].number) {
                temp += `selected`;
            }
            temp += `>` + j + `</option>`;
        }
        temp += `</select></td>
            <td id="price`+ i + `">` + orderContainer[i].totalprice + `</td>
            <td><input type="text" id="newPrice`+ i + `" onchange="getRealPrice()"></td>
            <td><button class=" btn btn-danger" onclick="deleteItem(`+ i + `)">delete</button></td>
        </tr>
            `;
    }
    temp += `</tbody>
        </table>
        <lable > total price : </lable>
        <lable id="orderPrice" class="mr-5"></lable>
        <lable>paid</lable>
        <input id="paid"  class="mr-5"></input>
        <lable>name</lable>
        <input id="username" class="mr-5"></input>
        <lable>Paid-BY</lable>
        <input id="paidBy" ></input>
        <button class="btn btn-primary w-100 mt-3"  onclick="makeOrder()">شراء</button>
    </div> 
        
    `;
    if (orderContainer.length == 0) {
        getCategory();
    }
    else if (orderContainer.length > 0) {
        document.getElementById("content").innerHTML = temp;
    }
}

function deleteItem(index) {
    orderContainer = [];
    orderContainer = JSON.parse(localStorage.getItem("orderData"));
    orderContainer.splice(index, 1);
    localStorage.setItem("orderData", JSON.stringify(orderContainer));
    getCart();
}
function setOrderPrice() {
    var total = 0;
    orderContainer = [];
    orderContainer = JSON.parse(localStorage.getItem("orderData"));
    for (var i = 0; i < orderContainer.length; i++) {
        var realPrice = Number(document.getElementById("newPrice" + i + "").value)
        total += realPrice;
    }
    return total;
}
function getRealPrice() {
    var total = setOrderPrice();
    document.getElementById("orderPrice").innerHTML = total;
}
function update_item_number(index) {
    orderContainer = [];
    orderContainer = JSON.parse(localStorage.getItem("orderData"));
    var num = document.getElementById("num" + index + "");
    var itemNumber = num.options[num.selectedIndex].value;
    var newnum = Number(itemNumber);
    var price = Number(orderContainer[index].price);
    var newprice = newnum * price;
    orderContainer[index].totalprice = newprice;
    orderContainer[index].number = itemNumber;
    localStorage.setItem("orderData", JSON.stringify(orderContainer));
    document.getElementById("price" + index + "").innerHTML = newprice;
}
function make_order_item(username, paid, totalPrice, paidBy, orderContainer) {
    const order2 = new XMLHttpRequest();
    url = 'http://127.0.0.1:8000/api/order/' + username + '/' + totalPrice + '/' + paid + '/' + paidBy + '';
    order2.open("GET", url);
    order2.send(username, totalPrice, paid, paidBy);
    order2.onreadystatechange = (e) => {
        if (order2.readyState == 4 && order2.status == 200) {
            var orderID = JSON.parse(order2.response)
            for (var i = 0; i < orderContainer.length; i++) {
                var newprice = document.getElementById("newPrice" + i + "").value;
                if (newprice == "") {
                    return;
                }
                else {
                    var realPrice = Number(newprice);
                    const item = new XMLHttpRequest();
                    var url = 'http://127.0.0.1:8000/api/save/' + orderContainer[i].code + '/'
                        + orderContainer[i].name + '/' + orderID.id + '/'
                        + realPrice + '/' + orderContainer[i].number + '';
                    item.open("GET", url);
                    item.send(orderContainer[i].code, orderID.id, realPrice, orderContainer[i].number);
                    var number = new XMLHttpRequest();
                    var url = 'http://127.0.0.1:8000/api/items/substract_number/' + orderContainer[i].code + '/' + orderContainer[i].number + '';
                    number.open("GET", url);
                    number.send(orderContainer[i].code, orderContainer[i].number);
                }

            }
            localStorage.removeItem("orderData");
            getCategory();

        }
    }
}
function makeOrder() {
    orderContainer = [];
    orderContainer = JSON.parse(localStorage.getItem("orderData"));
    var totalPrice = setOrderPrice();
    var paid = document.getElementById("paid").value;
    var username = document.getElementById("username").value;
    var paidBy = document.getElementById("paidBy").value;
    if (username != "" && paid != "") {
        paid = Number(paid);
        const order = new XMLHttpRequest();
        var reminder = totalPrice - paid;
        var bool = false;
        if (reminder != 0) {
            var url = 'http://127.0.0.1:8000/api/client/' + username + '/' + reminder + '/' + 0 + '';
            order.open("GET", url);
            order.send(username, reminder);
            bool = true;
        }
        if(bool){
            order.onreadystatechange = (e) => {
                if (order.readyState == 4 && order.status == 200) {
                    console.log("hi")
                    var client = JSON.parse(order.response);
                    if (paid != 0) {
                    url = 'http://127.0.0.1:8000/api/transaction/save/' + username + '/' + paid + '/' + client.money + '/' + paidBy + '/' + 0 + '';
                    order.open("GET", url);
                    order.send();
                    }
                    make_order_item(username, paid, totalPrice, paidBy, orderContainer)

                }
                
    
            }

        }
        else{
            make_order_item(username, paid, totalPrice, paidBy, orderContainer)
        }
        
       
    }

}
