require(["config"],function() {
   require(["jquery","load","cookie","headernum"],function($,template) {
    $.ajax("/project/mock/product.json").done(function(responseData){			
         $.cookie.json=true;
        var products=responseData.data;
         var id=$.cookie("product_id")||[];
         var product=products[id-1];
         var title=product.title,
             price=product.price,
             id=product.id,
             img=product.img,
             img_2=product.img_2;
        $(".title").text(title);
        $(".price").children("span").text("￥"+price);
        $(".id").text(id);
        var imgsrc=`<img src="${img}" data-zoom-image="${img_2}"/>`;
        $(".img").html(imgsrc);
        $(".img").children("img").elevateZoom({tint:true, tintColour:'#cccccc', tintOpacity:0.5});

        $(".add").on("click",function() {
            var  count=$(".num").val();
             count++;
             $(".num").val(count);
         });
         $(".reduce").on("click",function() {
             var  count=$(".num").val();
              count--;
              if (count<1) {
                  return count=1;
              }
              $(".num").val(count);
          });
          $(".num").on("blur",function() {
             if ($(".num").val()<1) {
                 alert("请输入正确的购买数量")
                 $(".num").val(1);
             } 
          });
        
          $(".add_cart").on("click",function () {
             
            //  var count= $(".num").val();
            var _p = $(this).parent();
            var product = {
              id : $.cookie("product_id"),
              title : _p.children(".title").text(),
              price : _p.children(".price").children("span").text(),
              img : _p.siblings(".imgs").find("img").attr("src"),
              count: parseInt(_p.children(".count").children(".num").val())
          };
          $.cookie.json = true;
          var _products = $.cookie("cart_product") || [];
          // 当前商品是否已被选购过
          var index = exist(product.id, _products);
          if (index !== -1) { // 已选购，数量自增
             _products[index].count+=parseInt(product.count);
          } else { // 未选购，将当前选购商品对象添加到数组中
              _products.push(product);
          }
        //   var _product=push(product);
                $.cookie("cart_product",_products,{path:"/"});
                alert("成功添加购物车");
          });
    });
    function exist(id, products) {
		for (var i = 0; i < products.length; i++) {
			if (products[i].id == id)
				return i;
		}
		return -1;
	}
   });
  
});