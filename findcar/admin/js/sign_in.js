function check() {
    var login = document.getElementsByName("login")[0].value;
    var psw = document.getElementsByName("password")[0].value;
    var notice_login = document.getElementById("notice_login");
    var notice_psw = document.getElementById("notice_psw");
    
    notice_login.style.display = "none";
    notice_psw.style.display = "none";
    
    var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var signal = xmlhttp.responseText;
            if (signal == 0) {
                document.getElementById("form").submit();
            } else if (signal == 1) {
                notice_login.innerHTML = "提示：管理员账户不存在！"
                notice_login.style.display = "block";
            } else if (signal == 2) {
                notice_psw.innerHTML = "提示：密码不正确！";
                notice_psw.style.display = "block";
            }
        }
    }
    xmlhttp.open("POST", "sign_in_check.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("login="+login+"&"+"password="+psw);
}