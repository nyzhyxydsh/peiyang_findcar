<?php
	header("Content-Type: text/html;charset=utf-8");
	include("include/util.php");
	session_start();
	check_access_legal();

	$releases = get_all_release();
	$ranks = get_all_rank();

	$path = "saveorders_" . time() . ".csv";
	$text = "订单编号,用户名,出发地址,目的地址,出发时间,到达时间,评分" . "\n";
	foreach($releases as $release)
		$text = $text . $release["id"] .",". get_name_by_id($release["user_id"]) .",". $release["start_address"] .",". $release["end_address"] .",". $release["go_date"] .",". $release["release_date"] .",".$release["mark"] . "\n";
	file_put_contents($path, $text);
	
	$path = "saveranks_" . time() . ".csv";	
	$text = "用户ID,用户名,性别,拼车次数,平均得分" . "\n";
	foreach($ranks as $rank)
		$text = $text . $rank["user_id"] .",". get_name_by_id($rank["user_id"]) ."," .",". get_sex_by_id($rank["user_id"]) .",". $rank["COUNT"] .",". $rank["mymark"] . "\n";
	file_put_contents($path, $text);
	
	echo "<script> {window.alert('数据已导出到后台系统根目录下');location.href='history.php'} </script>";
?>