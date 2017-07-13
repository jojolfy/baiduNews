/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-07-04 15:57:32
 * @version $Id$
 */

;(function (win,doc){
	function changeSize(){
		doc.documentElement.style.fontSize=doc.documentElement.clientWidth/320*50+'px';
	}
	changeSize();
	win.addEventListener('resize',changeSize,false);
})(window,document);


$(document).ready(function (){
function getNews(s){
	$.ajax({
		url:'/news',
		type:'post',
		data:{
			tag:s
		},
		success:function (arr){
			$('#newsList').html('');
			for(let i=0; i<arr.length; i++){
				$(`<li>
	    			<a href="#">
	    				<div class="news-img">
	    					<img src=${arr[i].img}>
	    				</div>
	    				<div class="news-text">
	    					<p class="news-title">${arr[i].title}</p>
	    					<p class="news-time">
	    						<span>2秒钟前</span>
	    						<b>热点</b>
	    					</p>
	    				</div>
	    			</a>
	    		</li>`).appendTo('#newsList');
			}
		},
		error:function (err){
			console.log(err);
		}
	})
}
getNews('推荐');
// ---------------------------------------------------------------
	var mySwiper = new Swiper('.swiper-container',{
	loop : true,
	autoplay:3000,
	pagination : '.swiper-pagination',
	paginationHide :true
	});
	//导航条拖拽
	var box=document.querySelector('#nav-munu');
	var x=0, is=false;
	var w=-$('#nav-munu').width();
	box.addEventListener('touchstart',function (ev){
		ev.preventDefault();
		var l=ev.targetTouches[0].clientX-x;
		function fnMove(ev){
			x=ev.targetTouches[0].clientX-l;
			if(x>0){
				x=0;
			}else if(x<w){
				x=w;
			}
			if(x<0){
				$('.lgrad').css('display','block');
			}else{
				$('.lgrad').css('display','none');
			}
			box.style.left=x+'px';
			is=true;
		}
		document.addEventListener('touchmove',fnMove,false);
		document.addEventListener('touchend',function (ev){
			if(is){
				ev.cancelBubble=true;
			}
			is=false;
			document.removeEventListener('touchmove', fnMove, false);
		},true);
	},false);
	//展开导航栏
	$('.scrollMenu .more').click(function (){
		$('.allMenu').css('display','block');
		$('.scrollMenu').css('display','none');
		$('#allmunus li').each(function (i,e){
			if(e.children[0].innerHTML.length>2){
				e.style.width=(1/3)*100+'%';
			}else{
				e.style.width=(1/6)*100+'%';
			}
		});
	});
	$('.allMenu .more').click(function (){
		$('.allMenu').css('display','none');
		$('.scrollMenu').css('display','block');
	});

//点击导航栏上的栏目
	var aW=[];
	for(let i=0; i<$('#nav-munu li').length; i++){
		aW.push($('#nav-munu li').eq(i).offset().left+$('#nav-munu li').eq(i).outerWidth(true)/2);
	}
	$('#nav-munu li').on({					//改成click事件就不会有冒泡
		touchend:function (){
			$(this).siblings().removeClass('selected');
			$(this).addClass('selected');

			$('#allmunus li').siblings().removeClass('selected');
			$('#allmunus li').eq($(this).index()).addClass('selected');

			var win=$(window).width()/2;
			if(aW[$(this).index()]>win){
				$('#nav-munu').css('left',-(aW[$(this).index()]-win-16));
			}
			getNews($(this).children('a').text());
		}
	})
	$('#allmunus li').click(function (){
		$(this).siblings().removeClass('selected');
		$(this).addClass('selected');

		$('#nav-munu li').siblings().removeClass('selected');
		$('#nav-munu li').eq($(this).index()).addClass('selected');

		$('.allMenu').css('display','none');
		$('.scrollMenu').css('display','block');

		var win=$(window).width()/2;
		if(aW[$(this).index()]>win){
			box.style.left=-(aW[$(this).index()]-win-16)+'px';
		}

		getNews($(this).children('a').text());
	});
	/*var nav=document.querySelectorAll('#nav-munu li');
	for(let i=0; i<nav.length; i++){
		nav[i].addEventListener('touchend',function (){
			for(var j=0; j<nav.length; j++){
				nav[j].className='';
			}
			this.className='selected';
			$('#allmunus li').siblings().removeClass('selected');
			$('#allmunus li').eq(i).addClass('selected');

			var win=$(window).width()/2;
			if(aW[i]>win){
				box.style.left=-(aW[i]-win-16)+'px';
			}
			getNews(this.children[0].innerHTML);
		},false);
	}*/

	//刷新页面的新闻
	var y=0, news=document.querySelector('#newsList'),
		load=document.querySelector('.news-load'),
		bOk=false;
	/*$('#newsList').on({
		touchstart:function (ev){
			var oldY=ev.targetTouches[0].pageY-y;
		}

	})*/
	news.addEventListener('touchstart',function (ev){
		ev.preventDefault();
		var t=ev.targetTouches[0].clientY-y;
		function fMove(ev){
			y=ev.targetTouches[0].clientY-t;
			if(y>30){
				y=30;
			}
			news.style.top=y+'px';
			load.style.height=y+'px';
			if(y>20){
				getNews($('#nav-munu .selected').children('a').text());
			}
			bOk=true;
			setTimeout(function (){
				news.style.top=0;
				load.style.height=0;
			},2000);
		}
		document.addEventListener('touchmove',fMove,false);
		document.addEventListener('touchend',function (ev){
			if(bOk){
				ev.cancelBubble=true;
			}
			bOk=false;
			document.removeEventListener('touchmove', fMove, false);
		},true);
	},false);
});