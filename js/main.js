require(["config"],function() {
    require(["jquery","template","load","cookie","headernum"],function ($,template) {
        $.ajax("/project/mock/product.json").done(function(responseData){			
			var html = template("product_one", {products: responseData.data});
            $(".minhot").html(html);
        }).done(function () {
            $(".product").on("click",function() {
                console.log("aa");
                var id=$(this).children(".id").val();
               $.cookie("product_id",id,{path:"/"});
               location="/project/html/production.html";
            }); 
        });
        
    }); 
 });

                                       