<html>

<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="css/bootstrap.min.css">

    <link rel="stylesheet" href="css/all.min.css">
    <link rel="stylesheet" href="css/index.css">
</head>
<title>
    Admin-Home
</title>

<body onload=<?php
                session_start();
                $is_admin = false;
                if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
                    $is_admin = true;
                    echo " getAllOrder()";
                } else {
                    echo "getCategory()";
                }
                ?>>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
        <a class="navbar-brand" href="homePage.php">Hammed-Steel</a>
        <?php

        if ($is_admin) {
        ?>
            <a name="" id="" class="btn btn-danger " href="logoutValid.php" role="button">log out</a>
        <?php
        } else {
        ?>
            <form class="collapse navbar-collapse float-right form" method="post" action="LoginHandle.php" id="navbarSupportedContent">
                <input type="text" name="username" id="" placeholder="username">
                <input type="password" name="pass" id="" placeholder="pass">
                <button type="submit" name="" id="" class="btn btn-primary ml-3" role="button">log in</button>
            </form>



            <div>
                <button class="btn btn-danger" onclick="getCart()" id="cart">
                    <i class="fa fa-cart-plus" aria-hidden="true"></i>
                </button>
                <div class="count" id="counter"></div>
            </div>
        <?php
        }

        ?>
    </nav>
    <?php
    if ($is_admin) {
    ?>
        <div class=" m-auto w-50 mb-5">
            <button class="btn btn-primary w-100 mt-4" id="button1">اضافه صنف</button>
            <div class="div1 mt-2" style="display: none;">
                <button class="btn btn-success ml-5" onclick="add_new_category()">اضافه</button>
                <input id="newCategory" class="ml-5 mr-3"></input>
                <lable>اسم الصنف</lable>
            </div>
            <button class="btn btn-primary w-100 mt-4" id="button2">اضافه منتج</button>

            <div class="div2" style="display: none;">
                <select class="btn btn-primary w-100 mt-4 " id="category" onchange="">

                </select>
                <div class="w-100 mt-2">
                    <lable>اسم المنتح</lable>
                    <input id="newItemName"></input>
                </div>
                <div class="w-100 mt-2">
                    <lable>السعر</lable>
                    <input id="newItemPrice"></input>
                </div>
                <div class="w-100 mt-2">
                    <lable>الكميه</lable>
                    <input id="newItemNumber"></input>
                </div>
                <button class="btn btn-success" onclick="addNewItem()">اضافه</button>
            </div>
            <button class="btn btn-primary w-100 mt-4 mb-3" id="button3"> عرض منتج</button>
            <div class="div3" style="display: none;">
                <select class="btn btn-primary w-100 mt-4 " id="getcategory" onchange="getAllItems()">

                </select>
                <select class="btn btn-primary w-100 mt-4 " id="getitems" onchange="get_item_info()">

                </select>
                <div class="w-100 mt-2">
                    <lable>السعر</lable>
                    <input id="getItemPrice"></input>
                </div>
                <div class="w-100 mt-2">
                    <lable>الكميه</lable>
                    <input id="getItemNumber"></input>
                </div>
                <button class="btn btn-success mt-2" onclick="update_Item()">اضافه</button>
            </div>
            <button class="btn btn-primary w-100 mt-4" id="button4">اضافه مديونيه</button>
            <div class="div4" style="display: none;">

                <div class="w-100 mt-2">
                    <lable>اسم العميل</lable>
                    <input id="clientName"></input>
                </div>
                <div class="w-100 mt-2">
                    <lable>السعر</lable>
                    <input id="clientPrice"></input>
                </div>
                <button class="btn btn-success mt-2 ml-3" onclick="addNewClient()">اضافه</button>
            </div>
            <button class="btn btn-primary w-100 mt-4" id="button5">تعديل مديونيه</button>
            <div class="div5" style="display: none;">
                <select class="btn btn-primary w-100 mt-4 " id="clients">

                </select>
                <div class="w-100 mt-2">
                    <lable>السعر</lable>
                    <input id="client_price"></input>
                </div>
                <div class="w-100 mt-2">
                    <lable>عن طريق</lable>
                    <input id="paid_by"></input>
                </div>
                <button class="btn btn-success mt-2 ml-3" onclick="updateClient()">اضافه</button>
            </div>
            <button class="btn btn-primary w-100 mt-4" id="button6">الخزينه والمديونات</button>
            <div class="div6" style="display: none;">
                <select class="btn btn-primary w-100 mt-4 " id="treasury" onchange="getTreasury()"> 
                    <option value="">اختار</option>
                    <option value="my_money">الخزينه</option>
                    <option value="indebtedness">المديونات الخارجيه </option>
                    <option value="debt">المديونات الداخلي</option>
                </select>
                <div id="getMoney" class="mt-3">

                </div>
            </div>
            <button class="btn btn-success mt-4" onclick="getAllTransaction(0)">سجل الدفع</button>
            <button class="btn btn-success mt-4" onclick="getAllTransaction(1)">سجل دفع المديونيات </button>
            <button class="btn btn-success mt-4" onclick="getClientTrans()">طباعه فاتوره  </button>
        </div>
        <section id="content" class="col-lg-12 col-md-12 col-sm-12">
        <?php
    } else {
        ?>
            <section id="content" class="container">

            <?php
        }
            ?>
            <?php
            if ($is_admin) {
            ?>
                <div class="col-md-6 m-auto ">
                    <input type="text" placeholder="Search" id="search" onkeyup="getOrderByName()" class="w-100 mt-5 ">
                </div>

            <?php
            }
            ?>
            </section>
            <div id="content1" class="mt-5">

            </div>
            <?php
            if ($is_admin) {
            ?>
            <?php
            }
            ?>
            <script src="js/home_Style.js"></script>
            <script src="https://cdn.bootcdn.net/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
            <script src="js/adminJS.js"></script>
            <script src="js/jquery-3.4.1.min.js"></script>
            <script src="js/popper.min.js"></script>
            <script src="js/bootstrap.min.js"></script>
            <script>
                $("#button1").click(function() {
                    $(".div1").slideToggle(500);
                    $(".div2").hide(1000);
                    $(".div3").hide(1000);
                    $(".div4").hide(1000);
                    $(".div5").hide(1000);
                    $(".div6").hide(1000);

                })
                $("#button2").click(function() {
                    $(".div2").slideToggle(1000);
                    $(".div1").hide(1000);
                    $(".div3").hide(1000);
                    $(".div4").hide(1000);
                    $(".div5").hide(1000);
                    $(".div6").hide(1000);

                })
                $("#button3").click(function() {
                    $(".div3").slideToggle(1000);
                    $(".div1").hide(1000);
                    $(".div2").hide(1000);
                    $(".div4").hide(1000);
                    $(".div5").hide(1000);
                    $(".div6").hide(1000);

                })
                $("#button4").click(function() {
                    $(".div4").slideToggle(1000);
                    $(".div1").hide(1000);
                    $(".div2").hide(1000);
                    $(".div3").hide(1000);
                    $(".div5").hide(1000);
                    $(".div6").hide(1000);

                })
                $("#button5").click(function() {
                    $(".div5").slideToggle(1000);
                    $(".div1").hide(1000);
                    $(".div2").hide(1000);
                    $(".div3").hide(1000);
                    $(".div4").hide(1000);
                    $(".div6").hide(1000);

                })
                $("#button6").click(function() {
                    $(".div6").slideToggle(500);
                    $(".div1").hide(1000);
                    $(".div2").hide(1000);
                    $(".div3").hide(1000);
                    $(".div4").hide(1000);
                    $(".div5").hide(1000);

                })

                
            </script>
</body>

</html>