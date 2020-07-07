<?php




class DB
{
    public $con;
    public $result;

    function conn()
    {
        $this->con = new mysqli("localhost", "root", "", "crud");
        return $this->con;
    }
    function doQuery($query)
    {
        $result = mysqli_query($this->con, $query);
        return $result;
    }
    function close()
    {
        mysqli_close($this->con);
    }
}
$errors = array();
$name = $_POST['username'];
$pass = $_POST['pass'];
if ($name == "") {
    $errors['name'] = "not Valid Name";
}
if ($pass == "") {
    $errors['password'] = "not Valid password";
}
$_SESSION['errors'] = $errors;
if (sizeof($_SESSION['errors']) > 0) {
    echo "1";
    header('location:homePage.php');
} else {
    $_SESSION['loggedin'] = false;
    $db = new DB();
    $con = $db->conn();
    if ($con->connect_error) {
        echo "2";
        header('location:homePage.php');
    } 
    else {
        $result = $db->doQuery( "SELECT `name`, `pass` FROM `admins` WHERE 1");
        while ($row = mysqli_fetch_assoc($result)) {
            if ($row['name'] == $name && $row['pass'] == $pass) {
                session_start();
                $_SESSION['loggedin'] = true;
                $db->close();
                
    
            }
        }
        header('location:homePage.php');
    }
    
}
