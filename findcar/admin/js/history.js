window.onload = function() {
	function getCookie(name) {
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	}
	
	document.getElementById("changelimit").onclick = function() {
		var start_date1, end_date1, search_id1, rank_num1;
		start_date1 = getCookie("start_date");
		end_date1 = getCookie("end_date");
		search_id1 = getCookie("search_id");
		rank_num1 = getCookie("rank_num");
		
		var start_date, end_date, search_id, rank_num;
		start_date = prompt("请输入统计开始日期（格式如2020-07-19），按取消则保持不动：", start_date1);
		end_date = prompt("请输入统计结束日期（格式如2020-10-19），按取消则保持不动：", end_date1);
		search_id = prompt("请输入要查找的特定用户ID（0代表不查找），按取消则保持不动：", search_id1);
		rank_num = prompt("请输入要显示的拼车排行榜用户数量，按取消则保持不动", rank_num1);
		
		if(start_date != null && start_date != start_date1)
			document.cookie="start_date="+start_date;
		if(end_date != null && end_date != end_date1)
			document.cookie="end_date="+end_date;
		if(search_id != null && search_id != search_id1)
			document.cookie="search_id="+search_id;
		if(rank_num != null && rank_num != rank_num1)
			document.cookie="rank_num="+rank_num;
		
	};
};