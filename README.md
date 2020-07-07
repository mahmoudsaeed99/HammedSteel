# HammedSteel
small API project with simple design that handle sells and buy to Hammed-Steel for trade
to run this program you should Follow the **instructions** below :
after clone this repository and put it in xampp/htdocs folder
if you don't have xampp or composer go and install them first [xampp](https://www.apachefriends.org/download.html) , [composer](https://getcomposer.org/download/)
* 1- clone this [repository](https://github.com/mohamed7632/warehouse-project) *api project*
* 2- go to the directory of the second repository and open cmd in this directory
* 3- write in this command the following commands in order
  * composer install
  * type nul > .env
  * copy .env.example .env
  * write yes/y
  * php artisan key:generate
  * php artisan serve
 
* 4-go to phpmyadmin and make new DB
* 5-set DB_DATABASE in .env by the DB name that you make before this 
* 6- then write "php artisan migrate" in cmd / open new cmd 
* 7- you will find 7 table in DB without table migrations 
  * 1- admin table that have `id` , `name` and `pass` that we use to open admin page in this project
  * 2- categories table have `id` and `name`
  * 3- client_accounts table that we save all clients and if they didn't pay all price we save the remaining pay and it have `id` , `name` and `type`
  * 4- items table `id` , `category_id `  , `item_name` , `number` and `price`
  * 5- orders table `id` , `customer_name` , `total_price` , `paid` and `paidBy`
  * 6- order_items table `id` , `item_id ` , `order_id ` , `numberOfItems` , `itemName` and `price`
  * 7- transactions table `id` , `name` , `paid` , `	remaining` , `paidBy` and `type`
    
