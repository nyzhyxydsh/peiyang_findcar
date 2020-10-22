<?php
	include("include/util.php");
?>

<link href="./css/sign_in.css" type="text/css" rel="stylesheet">

<html>
<head>
	<title>请不要重复登录</title>
	<meta charset="utf-8" />
</head>
<body>
	<div id="banner">
		<div class="check">
			<?php
		session_start();
		if (check_login()) {
		?>	
		请不要重复登录！
		<?php } else {
			$login = $_POST["login"];
			$password = $_POST["password"];
			$_SESSION["login"] = $login;
			header("location: history.php");
			}
		?>  
		</div>
		<div class="confirm">
			<form method='POST' action="history.php">
				<input class="button" type='submit' value='确定'/>
			</form>
		</div>
	</div>
</body>

