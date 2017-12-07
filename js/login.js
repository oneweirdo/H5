require(["config"],function() {
    require(["jquery","load","cookie","headernum"],function($) {
        $("#aaa").on("click",function() {
            $.post(
				"/project/php/login.php", 
				{phone:$("#phone_1").val(),password:$("#password_1").val()},
				function(respData){
					if (respData.status === 1) {
						// 登录成功，将登录成功用户数据保存到 cookie 中
						var user = respData.data;
						$.cookie("login_phone", JSON.stringify(user), {path:"/"});
                        // 跳转到个人信息页面
                        location = "/project/html/index.html";
					} else {
                        // $("#error").text("用户名或密码错误");
                        alert("登录失败")
					}
				},
				"json"); 
        });
        $(".but_two").on("click",function () {
            $(".form_1").css("display","none");
            $(".but_one").css("background","#cccccc");
            $(".form_2").css("display","block"); 
            $(".but_two").css("background","#0c82d9");
                 $(".but_one").on("click",function () {
                     $(".but_one").css("background","#0c82d9");
                     $(".but_two").css("background","#cccccc");
                     $(".form_1").css("display","block"); 
                     $(".form_2").css("display","none");
                 });
         });

         function generateCode() {
         $.ajax({
             type : "get",
             url : "http://route.showapi.com/932-2",
             data : {
                 showapi_appid : "29550",
                 showapi_sign : "08402fce064a484baad949d9a18f75e7"
             },
             dataType : "json",
             success : function(data){
                 var val = data.showapi_res_body;
                 $("#gen_code").attr("src",val.image);
                 $("#gen_code").attr("sid",val.sid) ;// 添加自定义属性，保存关联标识
             }
         });
     }
     generateCode();
     $("#gen_code").on("click",generateCode);
     $("#sure").on("blur",function(){
         $.ajax({
             type : "get",
             url : "http://route.showapi.com/932-1",
             data : {					
                 showapi_appid : "29550",
                 showapi_sign : "08402fce064a484baad949d9a18f75e7",
                 checkcode : $("#sure").val(),
                 sid : $("#gen_code").attr("sid")
             },
             dataType : "json",
             success : function(data){
                 if(data.showapi_res_body.valid)
                     {
                         $("#info").text("输入正确");
                      }
                 else
                     {
                         $("#info").text("验证码输入有误");
                     }
             }
         });
     });
     
    });
});