<?php
    include("include/util.php");

    $login = $_POST["login"];
    $password = $_POST["password"];

    echo check_admin($login, $password);
?>