<?php
	session_start();
	session_destroy();
	?> 

<html>
	<link href="./css/logout.css" type="text/css" rel="stylesheet" />
<head>
	<title>登出成功</title>
	<meta charset="utf-8" />
</head>
<body>
	<div id="banner">
		<div class="notice">
			登出成功！
		</div>
		<div class="bottom">
			 <form method="post" action="index.php">
				<input class="button" type="submit" value="确认"/>
			</form> 
		</div>
	
	</div>
</body>
</html>