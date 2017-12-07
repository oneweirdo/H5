// 定义模块，加载头部尾部
define(["jquery", "cookie"], function($){
	$.ajax("/project/html/include/header.html").done(function(data){
		// 将加载的头部静态资源添加到 .header 盒子中
		// $(data).appendTo(".header");
		$(".header").html(data);
	}).done(function(){
        // 判断是否有登录用户
         $.cookie.JSON=true;
        var phone = $.cookie("login_phone");
		if (phone){
            $(".login_reg").html(`欢迎您：<a href="#">${phone.phone}</a>`);
            $("#login_none").css("display","none");
        }
			
    });
    $(".main").load("/project/html/include/main.html");
    $(".footer").load("/project/html/include/footer.html");
    
});