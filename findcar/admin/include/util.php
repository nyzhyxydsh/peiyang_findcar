<?php

//$ADMIN_TABLE = 'tb_admin';
$USER_TABLE = 'tb_user';
$RELEASE_TABLE = 'tb_release';
$PDO = getPDO();

// returns a PDO object
function getPDO() {
    $host = 'localhost:3306';
    $db   = 'findcar'; 
    $user = 'root';
    $pass = 'root';
    $charset = 'utf8';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    try {
        return new PDO($dsn, $user, $pass, $options);
    } catch (\PDOException $e) {
        throw new \PDOException($e->getMessage(), (int)$e->getCode());
    }
}

function check_admin($login, $password) {
	//global $ADMIN_TABLE, $PDO;
	//$query = $PDO->query("SELECT * FROM $ADMIN_TABLE WHERE login = '$login'")->fetch();
	//if ($query) {
	//	if(password_verify($password, $query['password']))
	//		return 0;
	//	return 2;
    //}
	//return 1;
	if($login == "admin") {
		if($password == "admin")
			return 0;
		return 2;
	}
	return 1;	
}

function check_login() {
	return isset($_SESSION["login"]);
}

function check_access_legal() {
	if ( ! ( session_id() && check_login() ) )
		header('Location: index.php');
}

function get_all_release() {
	global $RELEASE_TABLE, $PDO;
	$start_date = $_COOKIE['start_date']." 00:00:00";
	$end_date = $_COOKIE['end_date']." 23:59:59";
	$search_id = $_COOKIE['search_id'];
	if($search_id == "0")
		$query = $PDO->query("SELECT * FROM $RELEASE_TABLE WHERE go_date BETWEEN '$start_date' AND '$end_date'")->fetchAll();
	else
		$query = $PDO->query("SELECT * FROM $RELEASE_TABLE WHERE go_date BETWEEN '$start_date' AND '$end_date' AND user_id = $search_id")->fetchAll();		
	return $query;
}

function get_all_rank() {
	global $RELEASE_TABLE, $PDO;
	$start_date = $_COOKIE['start_date']." 00:00:00";
	$end_date = $_COOKIE['end_date']." 23:59:59";
	$search_id = $_COOKIE['search_id'];
	$rank_num = $_COOKIE['rank_num'];
	if($search_id == "0")
		$query = $PDO->query("SELECT user_id, count( * ) AS COUNT, convert(sum(mark)/count( * ),decimal(5,2)) AS mymark FROM $RELEASE_TABLE WHERE go_date BETWEEN '$start_date' AND '$end_date' GROUP BY user_id ORDER BY COUNT DESC, mymark DESC limit 0,$rank_num")->fetchAll();
	else
		$query = $PDO->query("SELECT user_id, count( * ) AS COUNT, convert(sum(mark)/count( * ),decimal(5,2)) AS mymark FROM $RELEASE_TABLE WHERE go_date BETWEEN '$start_date' AND '$end_date' AND user_id = $search_id GROUP BY user_id ORDER BY COUNT DESC, mymark DESC limit 0,$rank_num")->fetchAll();		
	return $query;
}

function get_name_by_id($user_id) {
	global $USER_TABLE, $PDO;
	$query = $PDO->query("SELECT user_name FROM $USER_TABLE WHERE id = $user_id")->fetch();
	return $query["user_name"];
}

function get_sex_by_id($user_id) {
	global $USER_TABLE, $PDO;
	$query = $PDO->query("SELECT sex FROM $USER_TABLE WHERE id = $user_id")->fetch();
	return $query["sex"];
}
