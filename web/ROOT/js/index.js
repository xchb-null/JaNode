
$(".menu").click(function(){
	$(".menu").removeClass("checkedli");
	$(this).addClass("checkedli");
})

 $(".label").bind("click touch",function(){
                //根据a标签的href转换为id选择器，获取id元素所处的位置，并高度减50px（这里根据需要自由设置）
                $('html,body').animate({scrollTop: ($($(this).attr('href')).offset().top -50 )},500);
 });
			

$(".floatTips").mouseenter(function(){
	$(".zfdiv").css("display","inline-block");
});

$(".floatTips").mouseleave(function(){
	$(".zfdiv").css("display","none");
});