<?php
include("include/util.php");
session_start();
check_access_legal();

if(!isset($_COOKIE["start_date"])){
	setcookie("start_date","0000-00-00");
	setcookie("end_date","2020-10-19");
	setcookie("search_id",0);
	setcookie("rank_num",10);
}

$releases = get_all_release();
$ranks = get_all_rank();

?>


<html>
	<link href="bootstrap4/css/bootstrap.min.css" rel="stylesheet"  />
 	<link href="css/history.css" type="text/css" rel="stylesheet" />
    <link href="css/form.css" type="text/css" rel="stylesheet" />
	<script src="js/history.js"></script>
<head>
	<title>北洋拼车系统管理端</title>
    <meta charset="utf-8" />
</head>
<body>
	<nav class="navbar navbar-expand-lg navbar-dark bg-info">
		<div class="container">
			<a class="navbar-brand" href="#">
				<h3>拼车记录统计</h3>
			</a>
			<ul class="navbar-nav">

			<form class="navbar-form"   action="logout.php" method="post">
			<li class="nav-item">
				<button type="submit"  class="btn btn-success ">登出</button>
			</form>

			</ul>
		</div>
	</nav>
	
	<div id="bottom">
		<div class="left">
			<form method="post">
				<input id="changelimit" class="button" type="submit" value="修改统计范围"/>
			</form>
			<form method="post" action="save_excel.php">
				<input class="button" type="submit" value="导出为电子表格"/>
			</form>
		</div>
	</div>
	
	<div class="table">
		<table id="tb" class="table4 margin10" cellspacing="1" cellpadding="0">
			<div id="banner">
				<tr>
					<th width="100%" colspan="7" style="text-align: center;">
						<font color='#FF0000' size=5 px>拼车订单一览</font>
					</th>
				</tr>
			</div>	
			<tr>
				<td width=10% height="50" align="center" bgcolor="#C4EEFF" cellspacing="8"><a href="javascript:void(0);">订单编号</a></td>
				<td width=10% height="50" align="center" bgcolor="#C4EEFF" cellspacing="8"><a href="javascript:void(0);">用户名</a></td>
				<td width=25% height="50" align="center" bgcolor="#C4EEFF" cellspacing="8"><a href="javascript:void(0);">出发地址</a></td>
				<td width=25% height="50" align="center" bgcolor="#C4EEFF" cellspacing="8"><a href="javascript:void(0);">目的地址</a></td>
				<td width=12% height="50" align="center" bgcolor="#C4EEFF" cellspacing="8"><a href="javascript:void(0);">出发时间</a></td>
				<td width=12% height="50" align="center" bgcolor="#C4EEFF" cellspacing="8"><a href="javascript:void(0);">到达时间</a></td>
				<td width=5% height="50" align="center" bgcolor="#C4EEFF" cellspacing="8"><a href="javascript:void(0);">评分</a></td>				
			</tr>
			<tbody>
			<tr>
			<?php
			foreach($releases as $release) {
			?>
				<td width=10% height="50" align="center" bgcolor="#C4EEFF" cellspacing="8"><?= $release["id"] ?></td>
				<td width=10% height="50" align="center" bgcolor="#C4EEFF" cellspacing="8"><?= get_name_by_id($release["user_id"]) ?></td>
				<td width=25% height="50" align="center" bgcolor="#C4EEFF" cellspacing="8"><?= $release["start_address"] ?></td>
				<td width=25% height="50" align="center" bgcolor="#C4EEFF" cellspacing="8"><?= $release["end_address"] ?></td>
				<td width=12% height="50" align="center" bgcolor="#C4EEFF" cellspacing="8"><?= $release["go_date"] ?></td>
				<td width=12% height="50" align="center" bgcolor="#C4EEFF" cellspacing="8"><?= $release["release_date"] ?></td>
				<td width=5% height="50" align="center" bgcolor="#C4EEFF" cellspacing="8"><?= $release["mark"] ?></td>
			<?php
			echo "</tr><tr>";}
			?> 
			</tr>
			</tbody>
		</table>
	</div>
	
	<div class="table">
		<table class="table4 margin10" cellspacing="1" cellpadding="0">
			<div id="banner">
				<tr>
					<th width="100%" colspan="5" style="text-align: center;">
						<font color='#FF0000' size=5 px>拼车排行榜</font>
					</th>
				</tr>
			</div>
			<tr>
				<td width=20% height="50" align="center" bgcolor="#C4EEFF" cellspacing="8"><a href="javascript:void(0);">用户ID</a></td>
				<td width=20% height="50" align="center" bgcolor="#C4EEFF" cellspacing="8"><a href="javascript:void(0);">用户名</a></td>
				<td width=20% height="50" align="center" bgcolor="#C4EEFF" cellspacing="8"><a href="javascript:void(0);">性别</a></td>
				<td width=20% height="50" align="center" bgcolor="#C4EEFF" cellspacing="8"><a href="javascript:void(0);">拼车次数</a></td>
				<td width=20% height="50" align="center" bgcolor="#C4EEFF" cellspacing="8"><a href="javascript:void(0);">平均得分</a></td>
			</tr><tr>
			<?php
			foreach($ranks as $rank) {
			?>
				<td width=20% height="50" align="center" bgcolor="#C4EEFF" cellspacing="8"><?= $rank["user_id"] ?></td>
				<td width=20% height="50" align="center" bgcolor="#C4EEFF" cellspacing="8"><?= get_name_by_id($rank["user_id"]) ?></td>
				<td width=20% height="50" align="center" bgcolor="#C4EEFF" cellspacing="8"><?= get_sex_by_id($rank["user_id"]) ?></td>
				<td width=20% height="50" align="center" bgcolor="#C4EEFF" cellspacing="8"><?= $rank["COUNT"] ?></td>
				<td width=20% height="50" align="center" bgcolor="#C4EEFF" cellspacing="8"><?= $rank["mymark"] ?></td>
			<?php
			echo "</tr><tr>";}
			?> 
			</tr>
		</table>
	</div>	

</body>
</html>