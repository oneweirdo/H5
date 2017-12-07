require(["config"],function () {
   require(["jquery","template","load","cookie","headernum"],function ($,template) {       
         $.cookie.json=true;
         var _products=$.cookie("cart_product")||[];
         function render() {
            var html = template("cart_template", {products:_products});
            $(".pro").html(html);
            $(".row").each(function(index, element){
                    /* 每行缓存对应显示的商品对象 */
               $(element).data("product", _products[index]);
           });
         }
        render();
        
        $(".row").on("click", ".do_cart", function(){
            // 找出当前“删除”链接所在行
            var _row = $(this).parents(".row");
            // 找出商品id
            var _id = _row.children(".id").val();
            // 获取该id商品在数组中的下标
            var index = exist(_id, _products);
            // 从数组中删除该元素
            _products.splice(index, 1);
            // 保存回 cookie 中(从cookie中移除)
            $.cookie("cart_product", _products, {expires:7 , path:"/"});
            // 从DOM结构中移除
            _row.remove();
            // 更新合计
             calcTotal();
        });

        
        $(".count_cart").on("click",".add, .reduce",function () {
            var _row = $(this).parents(".row");
            // 获取所在行商品对象
            var _prod = _row.data("product");
            if ($(this).is(".add")) { // 数量加
                _prod.count++;
            } else if ($(this).is(".reduce")) { // 数量减
                if (_prod.count <= 1)
                    return;
                _prod.count--;      
            }
            // 保存回cookie
		    $.cookie("cart_product", _products, {expires:7, path:"/"});
            // 显示加/减后的数量
            
            _row.children(".count_cart").find(".num").val(_prod.count);
            _row.children(".scale_cart").text(_prod.count*(_prod.price).slice(1));
            // calcTotal()
            calcTotal();
         });
         $(".count_cart").on("blur",".num",function () {
            var _row = $(this).parents(".row");
            // 获取所在行商品对象
            var _prod = _row.data("product");
            _prod.count=$(".num").val();
            if ($(".num").val()<1) {
                alert("请输入正确的购买数量")
                $(".num").val(1);
            } 
            $.cookie("cart_product", _products, { path:"/"});
            _row.children(".scale_cart").text(_prod.count*(_prod.price).slice(1));
         });
         $(".checkbox_little").change(function () {
            if ($(this).prop("checked")) {
                calcTotal();
            }
            else{
                calcTotal();
            }
         });
         $(".checkbox_top").click(function(){
            // 获取当前“全选”复选框的选中状态
            var status = $(this).prop("checked");
            // 将商品行前所有复选框选中状态设置为“全选”一致的状态
            $(".checkbox_little").prop("checked", status);
    
            // 更新合计
            calcTotal();
        });
         function calcTotal() {
            // 合计金额
            var sum = 0;
            $(".checkbox_little:checked").each(function(index, element){
                // 当前选中行中的获取小计金额
                var _scale_cart = Number($(this).parents(".row").children(".scale_cart").text());
                // 累加到合计金额中
                sum += _scale_cart;
            });
            // 显示合计金额
            $(".money").text(sum.toFixed(2));
         
        }

            //去结算
            $("buy_end").on("click",function () {
                
            });
            //继续购物
            $(".buy_more").on("click",function () {
                location="/project/html/index.html" 
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