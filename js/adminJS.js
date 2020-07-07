
var orderContainer;
var transContainer;
var Treasury_money;
// localStorage.removeItem("Treasury_money");
if (localStorage.getItem("Treasury_money") == null) {
    TreasuryMoney = "0";
    localStorage.setItem("Treasury_money", TreasuryMoney);
}
Treasury_money =Number(localStorage.getItem("Treasury_money"));
console.log(Treasury_money);
function displayAllOrder(orders) {
    var temp = `
    <div class=" mt-3 ">
    <table class="table">
        <thead>
            <tr>
                <th>name</th>
                <th>price</th>
                <th>paid</th>
                <th>change paid</th>
                <th>paidBy</th>
                <th>created at</th>
                <th>update at</th>
                <th>save</th> 
                <th>delete</th> 
                <th>display</th> 
            </tr>
        </thead>
        <tbody>`
    for (var i = 0; i < orders.length; i++) {
        var plus = "";
        temp += `<tr>
                <td scope="row" id="name`+ orders[i].id + `">` + orders[i].customer_name + `</td>
                <td id="price`+ orders[i].id + `">` + orders[i].total_price + `</td>
                <td id="paid`+ orders[i].id + `">` + orders[i].paid + `</td>`

        if (orders[i].total_price == orders[i].paid) {
            plus = "Disabled";
        }
        temp += `<td><input id="changePaid` + orders[i].id + `" type="text" ` + plus + `></td>
                <td><input id="paidBY`+ orders[i].id + `" type="text" ` + plus + `></td>
                <td>`+ (orders[i].created_at).substring(0, 10) + `</td>
                <td>`+ (orders[i].updated_at).substring(0, 10) + `</td>
                <td><button class=" btn btn-primary" onclick="saveOrder(`+ orders[i].id + `)">save</button></td>
                <td><button class=" btn btn-danger" onclick="deleteOrder(`+ orders[i].id + `)">delete</button></td>
                <td><button class=" btn btn-success" onclick="getOrder(`+ orders[i].id + `)">Show</button></td>

            </tr>`;

    }
    temp += `</tbody>
            </table>`;
    document.getElementById("content1").innerHTML = temp;

}

function getAllOrder() {
    orderContainer = [];
    const orders = new XMLHttpRequest();
    var url = 'http://127.0.0.1:8000/api/orders';
    orders.open("GET", url);
    orders.send();
    orders.onreadystatechange = (e) => {
        if (orders.readyState == 4 && orders.status == 200) {
            var order = JSON.parse(orders.response)
            for (var i = 0; i < order.length; i++) {
                orderContainer.push(order[i]);
            }

            displayAllOrder(orderContainer);
        }
    }
    const Http = new XMLHttpRequest();
    var url = 'http://127.0.0.1:8000/api/cat';
    Http.open("GET", url);
    Http.send()
    var temp = `<option value=""></option>`;
    Http.onreadystatechange = (e) => {
        if (Http.readyState == 4 && Http.status == 200) {
            var cat = JSON.parse(Http.response)
            for (var i = 0; i < cat.length; i++) {
                temp += `<option value="` + cat[i].id + `">` + cat[i].name + `</option>`;
            }
            var url = 'http://127.0.0.1:8000/api/client/by_type/1';
            Http.open("GET", url);
            Http.send()
            var clientTemp = `<option value=""></option>`;
            Http.onreadystatechange = (e) => {
                if (Http.readyState == 4 && Http.status == 200) {
                    var client = JSON.parse(Http.response)
                    for (var i = 0; i < client.length; i++) {
                        clientTemp += `<option value="` + client[i].name + `">` + client[i].name + `</option>`;
                    }
                    document.getElementById("category").innerHTML = temp;
                    document.getElementById("clients").innerHTML = clientTemp;
                    document.getElementById("getcategory").innerHTML = temp;
                }
            }
        }

    }

}

function saveOrder(id) {
    console.log(id);
    var paid = document.getElementById("changePaid" + id + "").value;
    var paidBy = document.getElementById("paidBY" + id + "").value;
    var name = document.getElementById("name" + id + "").innerText;
    if (paid != "") {
        var newPaid = Number(paid);
        const orders = new XMLHttpRequest();
        var url = 'http://127.0.0.1:8000/api/order_update/' + id + '/' + newPaid + '';
        orders.open("GET", url);
        orders.send(id, newPaid);
        var url = 'http://127.0.0.1:8000/api/client/update/' + name + '/' + newPaid + '/' + 0 + '';
        orders.open("GET", url);
        orders.send();
        orders.onreadystatechange = (e) => {
            if (orders.readyState == 4 && orders.status == 200) {
                console.log("hi")
                var client = JSON.parse(orders.response);
                url = 'http://127.0.0.1:8000/api/transaction/save/' + name + '/' + newPaid + '/' + client.money + '/' + paidBy + '/' + 0 + '';
                orders.open("GET", url);
                orders.send();
                getAllOrder();
            }

        }


    }


}


function deleteOrder(id) {
    const orders = new XMLHttpRequest();
    const url = 'http://127.0.0.1:8000/api/order_delete/' + id + '';
    orders.open("GET", url);
    orders.send(id);
    getAllOrder();


}
function getOrderByName() {
    var search = document.getElementById("search").value;
    var searchContainer = [];
    for (var i = 0; i < orderContainer.length; i++) {
        if (orderContainer[i].customer_name.toLowerCase().includes(search.toLowerCase())) {
            searchContainer.push(orderContainer[i]);
        }
    }
    displayAllOrder(searchContainer);
}

function getOrder(id) {
    var items = new XMLHttpRequest();
    var url = 'http://127.0.0.1:8000/api/item_order/' + id + '';
    items.open("GET", url);
    items.send(id);
    var temp = `<div class=" mt-3 container">
    <table class="table">
        <thead>
            <tr>
                <th>مسح</th>
                <th>السعر</th>
                <th>العدد</th>
                <th>الاسم</th> 
            </tr>
        </thead>
        <tbody>`;
    items.onreadystatechange = (e) => {
        if (items.readyState == 4 && items.status == 200) {
            var item = JSON.parse(items.response);
            for (var i = 0; i < item.length; i++) {
                temp += `<tr>`;
                temp += `
                <td><button class = "btn btn-danger" onclick="deleteItemOrder(`+ item[i].id + `,` + id + `)">مسح</button></td>
                <td id="price`+ item[i].id + `">` + item[i].price + `</td>
                <td>` + item[i].numberOfItems + `</td>
                <td>`+ item[i].itemName + `</td>
                </tr>`
            }
            temp += `</tbody>
    </table>`;
            document.getElementById("content1").innerHTML = temp;
        }
    }

}


function getItemID(id) {
    const items = new XMLHttpRequest();
    var url = 'http://127.0.0.1:8000/api/get_item/' + id + '';
    items.open("GET", url);
    items.send(id);
    items.onreadystatechange = (e) => {
        if (items.readyState == 4 && items.status == 200) {
            var info = JSON.parse(items.response);
            return info.item_name;

        }

    }


}

function deleteItemOrder(id, orderId) {
    // http://127.0.0.1:8000/api/order_delete/1/1200
    var itemPrice = document.getElementById("price" + id + "").innerText;
    const order = new XMLHttpRequest();
    var url = 'http://127.0.0.1:8000/api/order_delete/' + orderId + '/' + itemPrice + '';
    order.open("GET", url);
    order.send(orderId, itemPrice);
    url = 'http://127.0.0.1:8000/api/delete_item_order/' + id + '';
    order.open("GET", url);
    order.send(id);
    getOrder(orderId);
}
function add_new_category() {
    var name = document.getElementById("newCategory").value;
    const cat = new XMLHttpRequest();
    var url = 'http://127.0.0.1:8000/api/cat/store/' + name + '';
    cat.open("GET", url);
    cat.send(name);
    location.reload();

}

function addNewItem() {
    var cat = document.getElementById("category");
    var category = cat.options[cat.selectedIndex].value;
    var name = document.getElementById("newItemName").value;
    var price = document.getElementById("newItemPrice").value;
    var number = document.getElementById("newItemNumber").value;
    if (name != "" && price != "" && number != "" && category != "") {
        //http://127.0.0.1:8000/api/items/store/1/mahmoud/12/1200
        price = Number(price);
        number = Number(number);
        category = Number(category);
        const item = new XMLHttpRequest();
        var url = 'http://127.0.0.1:8000/api/items/store/' + category + '/' + name + '/' + number + '/' + price + '';
        item.open("GET", url);
        item.send(category, name, number, price);
        location.reload();
    }

}

function update_Item() {
    var item_id = document.getElementById("getitems");
    item_id = item_id.options[item_id.selectedIndex].value
    if (item_id == "") {

    }
    else {

        item_id = Number(item_id);
        var price = document.getElementById("getItemPrice").value;
        var number = document.getElementById("getItemNumber").value;
        const item = new XMLHttpRequest();

        if (price == "") {
            price = document.getElementById("getItemPrice").placeholder;
        }
        if (number == "") {
            number = document.getElementById("getItemNumber").placeholder;
        }
        price = Number(price);
        var url = 'http://127.0.0.1:8000/api/items/update_price/' + item_id + '/' + price + '';
        item.open("GET", url);
        item.send(item_id, price);
        number = Number(number);
        var url = 'http://127.0.0.1:8000/api/items/add_number/' + item_id + '/' + number + '';
        item.open("GET", url);
        item.send(item_id, number);

        location.reload();
    }
}
function getAllItems() {
    var cat = document.getElementById("getcategory");
    var category = cat.options[cat.selectedIndex].value;
    const item = new XMLHttpRequest();
    var url = 'http://127.0.0.1:8000/api/items/' + category + '';
    item.open("GET", url);
    item.send();
    var temp = `<option value=""></option>`;
    item.onreadystatechange = (e) => {
        if (item.readyState == 4 && item.status == 200) {
            var items = JSON.parse(item.response)
            for (var i = 0; i < items.length; i++) {
                temp += `<option value="` + items[i].id + `">` + items[i].item_name + `</option>`;
            }
            document.getElementById("getitems").innerHTML = temp;
        }

    }
}

function get_item_info() {
    var item_id = document.getElementById("getitems");
    item_id = item_id.options[item_id.selectedIndex].value
    item_id = Number(item_id);
    // console.log(item_id)
    const item = new XMLHttpRequest();
    var url = 'http://127.0.0.1:8000/api/get_item/' + item_id + '';
    item.open("GET", url);
    item.send();
    item.onreadystatechange = (e) => {
        if (item.readyState == 4 && item.status == 200) {
            var items = JSON.parse(item.response)
            document.getElementById("getItemPrice").placeholder = items.price;
            document.getElementById("getItemNumber").placeholder = items.number;
        }

    }

}
function printAllTrans(container) {
    var temp = `
    <div class=" mt-3 container ">
    <table class="table">
        <thead>
            <tr>
                <th>التاريخ</th>
                <th>دفع عن طريق</th>
                <th>المبلغ المتبقى</th>
                <th>المبلغ المدفوع</th>
                <th>الاسم</th> 
            </tr>
        </thead>
        <tbody>`;
    for (var i = 0; i < container.length; i++) {
        temp += `<tr>`;
        temp += `
            <td>`+ (container[i].created_at).substring(0, 10) + `</td>
            <td> `+ container[i].paidBy + `</td>
            <td>` + container[i].remaining + `</td>
            <td>` + container[i].paid + `</td>
            <td>`+ container[i].name + `</td>
            </tr>`;
    }
    temp += `</tbody>
    </table>
     </div>`;
    document.getElementById("content1").innerHTML = temp;

}
function getAllTransaction($type) {
    transContainer = []
    const trans = new XMLHttpRequest();
    var url = 'http://127.0.0.1:8000/api/transaction/display/' + $type + '';
    trans.open("GET", url);
    trans.send();
    var temp = `<div class="content2">
    <button onclick="generatePDF()">Download as PDF</button>
    </div> 
    <div class="col-md-6 m-auto ">
        <input type="text" placeholder="Search" id="search" onkeyup="gettransByName()" class="w-100 mt-5 ">
    </div>
    `;
    document.getElementById("content").innerHTML = temp;
    trans.onreadystatechange = (e) => {
        if (trans.readyState == 4 && trans.status == 200) {
            var transaction = JSON.parse(trans.response)
            for (var i = 0; i < transaction.length; i++) {
                transContainer.push(transaction[i]);
            }
            printAllTrans(transContainer)
        }

    }
}

function gettransByName() {
    var search = document.getElementById("search").value;
    var searchContainer = [];
    for (var i = 0; i < transContainer.length; i++) {
        if (transContainer[i].name.toLowerCase().includes(search.toLowerCase())) {
            searchContainer.push(transContainer[i]);
        }
    }
    printAllTrans(searchContainer);

}

function addNewClient() {
    var price = document.getElementById("clientPrice").value;
    var name = document.getElementById("clientName").value;
    if (price != "" && name != "") {
        price = Number(price);
        const client = new XMLHttpRequest();
        var url = 'http://127.0.0.1:8000/api/client/' + name + '/' + price + '/' + 1 + '';
        client.open("GET", url);
        client.send();
        location.reload();
    }
}

function updateClient() {
    var price = document.getElementById("client_price").value;
    var paidBy = document.getElementById("paid_by").value;
    var name = document.getElementById("clients");
    var clientName = name.options[name.selectedIndex].value;
    if (price != "" && clientName != "") {
        price = Number(price);
        const client = new XMLHttpRequest();
        var url = 'http://127.0.0.1:8000/api/client/update/' + clientName + '/' + price + '/' + 1 + '';
        client.open("GET", url);
        client.send();
        client.onreadystatechange = (e) => {
            if (client.readyState == 4 && client.status == 200) {
                var data = JSON.parse(client.response);
                url = 'http://127.0.0.1:8000/api/transaction/save/' + clientName + '/' + price + '/' + data.money + '/' + paidBy + '/' + 1 + '';
                client.open("GET", url);
                client.send();
                location.reload();
            }
        }
    }
}

function getTreasury() {
    var data = document.getElementById("treasury");
    var getData = data.options[data.selectedIndex].value;
    const Http = new XMLHttpRequest();
    var type = -1;
    if (getData == "my_money") {
        //Treasury_money
        var temp = ``;
        url = 'http://127.0.0.1:8000/api/order_paid';
        Http.open("GET", url);
        Http.send();
        Http.onreadystatechange = (e) => {
            if (Http.readyState == 4 && Http.status == 200) {
                var total = JSON.parse(Http.response);
                // console.log(Treasury_money);
                // console.log(total);
                var total_money = total - Treasury_money;
                temp+=`<lable  id= "my_price" style="display: none;">`+total+`</lable>
                <lable  id= "my_money">`+total_money+`</lable> <span>جنيه </span>
                       <button class="btn btn-danger ml-4" onclick="deleteMoney()">سحب</button> 
                `;
                document.getElementById("getMoney").innerHTML = temp;

            }
        }

    }
    else if (getData == "indebtedness") {
        type = 1;
    }
    else if (getData == "debt") {
        type = 0;
    }
    if(type != -1){
        var temp = ``;
        url = 'http://127.0.0.1:8000/api/client_paid/'+type+'';
        Http.open("GET", url);
        Http.send();
        Http.onreadystatechange = (e) => {
            if (Http.readyState == 4 && Http.status == 200) {
                var total = Http.response;
                temp+=`<lable  id= "my_money">`+total+`</lable>
                `;
                document.getElementById("getMoney").innerHTML = temp;

            }
        }
    }
}   
function deleteMoney(){
    var price = document.getElementById("my_price").textContent;
    console.log(price)
    localStorage.setItem("Treasury_money", price);
    location.reload();
}

function getClientTrans(){
    temp=`<div class="mt-5 container mb-5" >
    <label for="" class="float-right  " > :الاسم</label>
    <input type="text" class="mr-3 w-25 float-right" id="transName"> 
    <button class="btn btn-success float-right mr-5" onclick="printTransaction()">get</button>    
    
</div>
<div class="tte" id="tte"></div>`
;

document.getElementById("content").innerHTML = temp;

}

function printTransaction(){
    var name = document.getElementById("transName").value;
    console.log(name)
    var Http = new XMLHttpRequest();
    var url = 'http://127.0.0.1:8000/api/transaction/name/'+name+'';
    Http.open("GET",url);
    Http.send();
    var temp=`<div style="clear: both;"></div>
    <button onclick="generatePDF()">Download as PDF</button>
    <div class="container mt-5" id="printTrans">
        <div class="row">
            <div class="float-left col-md-4 companyName" >اولاد حامد اسماعيل للتجاره</div>
            <div class=" col-md-1 " > </div>
            <div class="float-left col-md-3 companyTrans m-auto" >كشف حساب </div>
            <div class="client_name float-right col-md-4 companyClient float-right" ><span> السيد/  </span><h8>`+name+`</h8> </div>
            
        </div>
        <table class="table mt-3">
            <thead>
                <tr>
                    <th>المبلغ المتبقى </th>
                    <th>المبلغ المدفوع</th>
                    <th>دفع عن طريق</th>
                    <th>التاريخ </th>
                </tr>
            </thead>
            <tbody>
        `;
    Http.onreadystatechange = (e) => {
        if (Http.readyState == 4 && Http.status == 200) {
            var trans = JSON.parse(Http.response);
             for(var i = 0 ; i<trans.length ; i++){
                temp+=`<tr>
                <td>`+trans[i].remaining+`</td>
                <td>`+trans[i].paid+`</td>
                <td>`+trans[i].paidBy+`</td>
                <td>`+(trans[i].created_at).substring(0, 10)+`</td>
            </tr>`
             }
             temp+=`</tbody>
             </table>
         </div>`  ; 
            document.getElementById("content1").innerHTML = temp;

        }
    }
}
function generatePDF() {
    // Choose the element that our invoice is rendered in.
    const element = document.getElementById("printTrans");
    // Choose the element and save the PDF for our user.
    html2pdf()
        .set({
            html2canvas: {
                scale: 4
            }
        })
        .from(element)
        .save();
}