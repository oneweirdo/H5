require(["config"],function() {
   require(["jquery","cookie"],function($) {
    $.cookie.json=true;
    var _products=$.cookie("cart_product")||[];
    var count_1=_products.length;
    $(".count_1").text(count_1);
    var count_2;
    var sum=0;
    for(var i=0;i<count_1;i++){
        count_2=_products[i].count;
        sum+=count_2;
    }
    $(".count_2").text(sum);
    }); 
});