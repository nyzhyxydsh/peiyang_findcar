<html>
  <head>
    <title>北洋拼车系统管理端</title>
    <meta charset="utf-8" />
	<link href="bootstrap4/css/bootstrap.min.css" rel="stylesheet"  />
	<script src="js/sign_in.js"></script>
  </head>

<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-info">
	<div class="container">
		<a class="navbar-brand" href="#">
			<h3>欢迎进入北洋拼车系统管理端</h3>
		</a>
	</div>
</nav>

<div class="row justify-content-center ">   
    <div class="col-center-block col-sm-4 col-xs-4 jumbotron myformdiv ">  
        <h2 class="text-center">登录到后台</h2>
        <div>
            <form class="bs-example bs-example-form" id="form" role="form" method="post" action="sign_in.php">
                <div class="input-group-lg">
                    <input name="login" type="text" class="form-control" prequired="required" placeholder="管理员账号">
					<p class="notice" id="notice_login"></p>
				</div>
                <br>
                <div class="input-group-lg">
                    <input type="password" name="password" required="required" class="form-control" placeholder="管理密码">
					<p class="notice" id="notice_psw"></p>
				</div>
                <br>
                <div style="text-align: center;">
                    <input type="button" value="登录" onclick="check()" class="btn text-center btn-danger btn-lg" />
                </div>
            </form>
        </div>
    </div>



</body>
</html>
