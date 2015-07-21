var DDC=window.DDC||{};String.prototype.startsWith=function(prefix){return this.indexOf(prefix)===0;};String.prototype.endsWith=function(suffix){return this.indexOf(suffix,this.length-suffix.length)!==-1;};DDC.isSet=function(a){return typeof a!=='undefined'&&a!==null;};DDC.isEmpty=function(a){return!DDC.isSet(a)||!a||a.length===0;};DDC.isNum=function(a){return typeof a==='number';};DDC.isInt=function(a){return DDC.isNum(a)&&a%1===0;};DDC.encode=function(a){return $('<div/>').text(a).html();};DDC.escape=function(a){return encodeURIComponent(a);};DDC.Error=function()
{var _exception={};var _start=new Date().getTime();var _count=0;window.onerror=handler;function handler(message,file,line)
{if(++_count>5){return true;}
var now=new Date().getTime();var data={guid:_start,message:message||_exception.message||'',file:file||_exception.file||'',line:line||_exception.line||'',column:_exception.column||'',stack:_exception.stack||'',count:_count,url:document.URL||'',agent:navigator.userAgent||'',elapsed:now-_start,timestamp:now};$.ajax({type:'POST',dataType:'json',url:'/js/error.php',data:data,success:display});_exception={};return true;}
function display(json)
{if(json.debug&&json.message&&!json.ignore){alert(json.message+"\n"+json.file+"\nLine: "+json.line+"\tColumn: "+json.column+"\n"+json.stack);}}
(function(){functionWrapper(window,'setTimeout',0);functionWrapper(window,'setInterval',0);functionWrapper(window,'addEventListener',1);if(typeof Document!='undefined'){functionWrapper(Document.prototype,'addEventListener',1);}
if(typeof Element!='undefined'){functionWrapper(Element.prototype,'addEventListener',1);}})();function functionWrapper(object,property,index)
{if(!object[property]||!object[property].apply||!arguments[index]){return;}
var original=object[property];object[property]=function(){arguments[index]=exceptionWrapper(arguments[index]);return original.apply(this,arguments);};return original;}
function exceptionWrapper(fn)
{if(!fn.apply){return fn;}
return function()
{try{return fn.apply(this,arguments);}
catch(ex){_exception={message:ex.message||'',file:ex.fileName||'',line:ex.lineNumber||'',column:ex.columnNumber||'',stack:ex.stack||''};throw(ex);}};}}();;var DDC=window.DDC||{};DDC.Search=function()
{var _timeout=3000;var _delay=100;var _running=false;var _keyTime;var _searchText;var _xhr;$(document).ready(init);function init(container)
{var selector=container&&typeof container==='string'?container+' .livesearch':'.livesearch';$(selector).attr('autocapitalize','off').attr('autocomplete','off').attr('autocorrect','off');$(selector).on('focus',focus).on('keyup',search);$(selector).closest('form').bind('submit',submit);$(selector).on('click','.ls-options a',options);$('.search-close').on('click',reset);}
function reset(e)
{e.preventDefault();e.stopPropagation();$('.search-main-selected').removeClass('search-main-selected');$(e.target).closest('form').find('.livesearch').val('');remove();}
function submit(e)
{abort();var $input=$(e.target).find('.livesearch');if($input.val().length&&$input.val()!=="Search"){if(!$('.searchDropdownBox').val()){$('.searchDropdownBox').prop('disabled',true);}}
else{e.preventDefault();e.stopPropagation();$input.focus();}}
function focus(e)
{var $target=$(e.target);if($(window).scrollTop()>10&&$(window).height()<600&&$target.attr('id')!='livesearch-main-sticky'){var offset=$target.offset();if(offset.top>10){window.scrollTo(0,parseInt(offset.top)-5);}}
$wrap=$target.closest('.header-wrap');if($wrap.length){$wrap.addClass('search-main-selected');}
search(e);}
function search(e)
{var $target=$(e.target);_keyTime=(new Date).getTime();if($target.val().length>0){$target.addClass('searchSelected');}
else{$target.removeClass('searchSelected');}
window.setTimeout(function(){DDC.Search.process(e.target);},_delay);}
function process(target,option,refresh)
{option=option||'';refresh=refresh||false;var $input=$(target).hasClass('livesearch')?$(target):$(target).closest('#ls-wrap').siblings('input[type=text]');if(refresh||((new Date).getTime()-_keyTime>_delay-20&&_searchText!=$input.val()))
{_searchText=$input.val();abort();if(_searchText.length<1){if($('#ls-wrap').length){$('#ls-wrap').slideUp(200);}
return;}
_running=true;var data=$input.closest('form').find('input[name=livesearch-data]').val();var params={type:'GET',url:'/js/search.php',data:({id:$input.attr('id'),s:_searchText,op:option,data:data}),dataType:'html',success:display,error:refresh,timeout:_timeout};_xhr=$.ajax(params);}}
function display(response)
{_running=false;var result=$('<div />').html(response);var targetId='#'+result.find('#ls-inputid').val();var rowCount=result.find('#ls-count').val();var ls=$('#ls-wrap');if(ls.length)
{ls.removeClass('ls-loading');ls.html(response);}
else
{ls=$('<div />').attr('id','ls-wrap').html(response);ls.css('display','none');var $targetWrap=$(targetId).closest('.livesearch-wrap');if($targetWrap.length){ls.css('top',$targetWrap.outerHeight()+'px');$targetWrap.css('position','relative');$targetWrap.append(ls);}
else{ls.css('top',$(targetId).outerHeight()+'px');$(targetId).parent().css('position','relative');$(targetId).after(ls);}
$(document).bind('click',defocus);$(document).bind('keydown',keys);}
if(!ls.is(':visible')&&ls.slideDown){ls.slideDown('fast');}
$('.ls-more').click(more);$('.ls-item').click(select);}
function more(e)
{e.preventDefault();process(e.target,'more',true);}
function select(e)
{var target=$(e.target).closest('a');if(target.attr('rel')=='clear'){$(e.target).closest('form').find('.livesearch').val('');}
else{$(e.target).closest('form').find('.livesearch').val(target.text());}
if(target.attr('href').endsWith('#')){e.preventDefault();remove();}
else if(target.attr('href').endsWith('#submit')){e.preventDefault();remove();$(e.target).closest('form').submit();}}
function keys(e)
{var code=e.keyCode||e.which;var focusLink=$('.ls-focus');if(code==40)
{if(focusLink.length)
{focusLink.removeClass('ls-focus');if(focusLink.nextAll('.ls-item').length){focusLink.nextAll('.ls-item:first').addClass('ls-focus').focus();}
else{$(e.target).closest('form').find('.livesearch').focus();}}
else{$('.ls-item:first').addClass('ls-focus').focus();}
return false;}
if(code==38&&focusLink.length)
{focusLink.removeClass('ls-focus');if(focusLink.prevAll('.ls-item').length){focusLink.prevAll('.ls-item:first').addClass('ls-focus').focus();}
else{$(e.target).closest('form').find('.livesearch').focus();}
return false;}}
function remove()
{abort();$('#ls-wrap').slideUp(200);window.setTimeout(function(){$('#ls-wrap').remove();},210);$(document).unbind('click',defocus);$(document).unbind('keydown',keys);}
function abort()
{if(_running&&typeof(_xhr)!='undefined'){_xhr.abort();}}
function defocus(e)
{var o=$('#ls-wrap').offset();if(typeof(o)=='undefined'||o==null){return;}
_searchText='';if(e.pageX<o.left||e.pageX>o.left+$('#ls-wrap').width()||e.pageY<o.top-40||e.pageY>o.top+$('#ls-wrap').height()){remove();}}
function options(e)
{e.preventDefault();e.stopPropagation();var $button=$(e.target).closest('a');var value=$(e.target).closest('form').find('.livesearch').val();window.location=$button.attr('href')+"?searchterm="+value;}
function refresh()
{$('#ls-wrap').removeClass('ls-loading');$('.ls-title').html('Suggestions...');}
return{init:init,process:process,remove:remove};}();;var DDC=window.DDC||{};DDC.Log=function()
{function dw(a,b,c,d,e,f,h,i,k,l,m)
{$.ajax({type:'POST',data:{a:a,b:b,c:c,d:d,e:e,f:f,g:document.referrer,h:h,i:i,j:window.location.href,k:k,l:l,m:m},url:'/js/dw.php'});}
return{dw:dw};}();DDC.Cookie=function()
{function get(name)
{var nameEQ=name+'=';var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++)
{var c=ca[i].replace(/^\s+/,'');if(c.indexOf(nameEQ)===0){return c.substring(nameEQ.length,c.length);}}
return null;}
function set(name,value,days,path)
{path=path||'/';var expiry='';if(days){expiry=new Date();expiry.setDate(expiry.getDate()+days);expiry=';expires='+expiry.toUTCString();}
document.cookie=name+'='+value+expiry+';path='+path;}
return{get:get,set:set};}();DDC.Resolution=function()
{var _timer=false;function init()
{setViewport();responsiveSearchBar();$(window).on('hashchange',hashCheck);hashCheck();$(window).resize(resize);}
function responsiveSearchBar()
{if(window.location.pathname.match(/search.php/)){expandSearchBar();}
else{$('#livesearch-main').on('focus',function(e){window.setTimeout(function(){expandSearchBar();},5);});}}
function expandSearchBar()
{$('#livesearch-main').closest('.navbar').addClass('navbar-focus');}
function setViewport()
{var viewport=$(window).width()+'x'+$(window).height();DDC.Cookie.set('viewport',viewport);}
function resize(e)
{window.clearTimeout(_timer);_timer=window.setTimeout(function(){setViewport();},2000);}
function hashCheck(e){if(window.location.hash.length){$('body').addClass('hash-url');}}
return{init:init};}();;var DDC=window.DDC||{};function email_to_friend(url){window.open('/email-friend.php?url='+url,'email_to_friend','width=380,height=680,scrollbars=1');}
function clear_text(id){$('#'+id).val('').css('fontStyle',"normal").css('color',"black");}
function openChild(file,name,options){var childWindow=window.open(file,name,options);if(childWindow.opener===null){childWindow.opener=name.self;}}
function hideDiv(id){$('#'+id).css('display','none');if($('div[id^=floatBox]').filter(':visible').length===0){overlayHide();}}
function showDiv(id){$('#'+id).css('display','block');}
function removeElement(id){$('#'+id).remove();}
function overlayHide(){$('#overlay').css('display','none');$('div[id^=floatBox]').css('display','none');}
function overlayShow(){if($('#overlay').length===0){$('<div id="overlay" onclick="overlayHide();" />').appendTo('body');}
$('#overlay').css('height',$(document).height()+'px').show();}
function checkFloatBox(id){if($('#'+id).length===0){$('<div />').attr('id',id).appendTo('body');}}
jQuery.fn.center=function(){var x=Math.round(($(document).width()-this.width())/2);var y=Math.max(20,Math.round(($(window).height()/2)-(this.height()/2)+$(window).scrollTop())-20);this.css({left:x,top:y});return this;};function dgid(id){return document.getElementById(id);}
function changeSortOrder(){var so=$('#sort_order').val();self.location=(location.href.search(/sort=/i)!=-1)?location.href.replace(/sort=[a-zA-Z]*/i,'sort='+so):location.href+'&sort='+so;}
function changeResultsPerPage(){var mr=$('#results_per_page').val();self.location=(location.href.search(/maxrows=/i)!=-1)?location.href.replace(/maxrows=[0-9]*/i,'maxrows='+mr):location.href+'&maxrows='+mr;}
function compareWithOtherDrugsSeeAll(e,ddc_id,brand_name_id){$.ajax({url:'/js/compare-with-other-drugs.php?ddc_id='+ddc_id+'&brand_name_id='+brand_name_id,success:function(data){$('#compareWithOtherDrugs').html(data);}});}
function brandFamilyDrugDocsSeeAll(e,url){$.ajax({url:'/js/brand-family-drug-docs.php?url='+url,success:function(data){$('#brandFamilyDrugDocs').html(data);}});}
function otherBrandNamesSeeAll(e,url,type){$.ajax({url:'/js/other-brand-names.php?url='+url+'&type='+type,success:function(data){$('#other_brand_names_'+type).html(data);}});}
function moreResourcesSeeAll(e,url,type){$.ajax({url:'/js/more-resources.php?url='+url+'&type='+type,success:function(data){$('#more_resources_'+type).html(data);}});}
function getQueryParameter(name){name=name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");var regex=new RegExp("[\\?&]"+name+"=([^&#]*)");var results=regex.exec(window.location.search);return(results!==null)?decodeURIComponent(results[1].replace(/\+/g," ")):"";}
DDC.Scroller=function()
{var _event={move:'DDC::Scroller::move',top:'DDC::Scroller::top',bottom:'DDC::Scroller::bottom',stop:'DDC::Scroller::stop'};var _timer={move:false,stop:false};var _delay=100;function init()
{$(window).scroll(scrolling);}
function scrolling(e)
{if(!_timer.move){_timer.move=window.setTimeout(function(){broadcast(e);},_delay);}}
function broadcast(e)
{var data=getPositionData(e);$(document).trigger(_event.move,data);if(data.scrollY<=0){$(document).trigger(_event.top,data);}
else if(data.scrollY&&data.scrollMaxY&&data.scrollY>=data.scrollMaxY){$(document).trigger(_event.bottom,data);}
window.clearTimeout(_timer.stop);_timer.stop=window.setTimeout(function(){$(document).trigger(_event.stop,data);},_delay*5);_timer.move=false;}
function getPositionData(e)
{var target=e.currentTarget||{};if(target.hasOwnProperty('scrollY')||target.hasOwnProperty('pageYOffset')){return{width:target.innerWidth||0,height:target.innerHeight||0,scrollX:target.scrollX||target.pageXOffset||0,scrollY:target.scrollY||target.pageYOffset||0,scrollMaxX:target.scrollMaxX||0,scrollMaxY:target.scrollMaxY||0};}
else{return{width:parseInt($(window).width()),height:parseInt($(window).height()),scrollX:parseInt($(window).scrollLeft()),scrollY:parseInt($(window).scrollTop())};}}
return{init:init,event:_event};}();DDC.Form=function()
{function init()
{$('form').on('submit',submit);}
function submit(e)
{if(!validate()){return false;}
$(e.target).find('input[type=submit]').each(function(){if($(this).attr('data-submit')){$(this).val($(this).attr('data-submit')).addClass('input-button-disabled');}});}
function validate()
{if($('#terms').length&&!$('#terms').is(':checked')){alert('You must accept the terms to continue.');return false;}
return true;}
function regoCheck(key,val,val2)
{$.get('/register-check.php',{key:key,val:val,val2:val2},function(status){regoResponse(key,status);});}
function regoResponse(key,status)
{if(status===''){$('#user-'+key).removeClass('input-warning');}
else{$('#user-'+key).addClass('input-warning');status=" <span class='msg-warning'>"+status+"</span>";}
var regoId='rego-'+key;if($('#'+regoId).length){$('#'+regoId).remove();}
var wrap=$("<span />").attr({id:regoId}).html(status);$('#user-'+key).after(wrap);}
return{init:init,validate:validate,regoCheck:regoCheck};}();DDC.Pill=function()
{function showShapes()
{var shapes=$('#shape-content');if(!shapes.length){shapes=$('<div />').attr('id','shape-content').css({position:'absolute',top:'0',zIndex:1000});shapes.html("<p style='padding: 12px;'>Loading shapes...</p>").load('/js/pill-shapes.html');$('#shape-select').closest('div').css({position:'relative'});$('#shape-select').after(shapes);}
shapes.show();$('#shape-select').css({visibility:'hidden'}).blur();window.setTimeout(function(){$(document).on('click',hideShapes);},10);}
function selectShape(shapeId)
{$('#shape-select').val(shapeId);hideShapes();}
function hideShapes()
{$('#shape-content').hide();$('#shape-select').css({visibility:'visible'});$(document).off('click');}
return{showShapes:showShapes,selectShape:selectShape};}();DDC.Bookmark=function()
{function init()
{$('.iconBookmark').on('click',displayOptions);$('.iconBookmarkSmall').on('click',displayOptions);}
function displayOptions(e)
{e.preventDefault();e.stopPropagation();$.ajax({type:'GET',complete:getContentSuccess,data:({page_url:$('#page_url').val(),page_title:$('#page_title').val(),mednotes_data:$('#mednotes_data').val()}),url:'/bookmark-popup.php'});}
function getContentSuccess(response)
{DDC.Popup.create(response.responseText,{width:260});}
return{init:init};}();DDC.Popup=function()
{var _config={};var _defaults={event:null,referrer:null,width:500,overlayClose:true};var _active=false;function create(content,config)
{_config=$.extend({},_defaults,config);_config.width=Math.min(_config.width,$(window).width()-60);if(_config.event&&_config.event.stopPropagation){_config.event.preventDefault();_config.event.stopPropagation();}
var $box=$('.popupBox');if(!$box.length)
{var overlay=$('<div />').appendTo('body').addClass('overlay').css({display:'none',width:'100%',height:$(document).height()});$box=$('<div />').appendTo('body').addClass('popupBox').css({display:'none',width:_config.width});handler();}
if(typeof content==='string'){$box.html(content);}
else{$box.html(content.html());}
$box.append("<a class='close' href='#' onclick='DDC.Popup.hide(); return false;'>Close</a>");$box.show();$('.overlay').fadeIn(400,function(){_active=true;});position($box);return $box;}
function position($box)
{var x=Math.round(($(window).width()-$box.outerWidth())/2);var y=Math.max(20,Math.round(($(window).height()/2)-($box.height()/2)+$(window).scrollTop()-20));$box.css({left:x,top:y});}
function handler()
{if(_config.overlayClose){window.setTimeout(function(){$('html').on('click',function(e){if(_active&&!$(e.target).closest('.popupBox').length){hide();}});},100);}}
function hide()
{$('html').off('click',hide);$('.popupBox').hide();$('.overlay').fadeOut(400,function(){_active=false;});}
function shareBlock(e)
{e.preventDefault();$target=$(e.target);var share={url:$target.attr('href'),name:'window_'+$target.attr('data-track-group').toLowerCase(),width:parseInt($target.attr('data-width')),height:parseInt($target.attr('data-height'))};hide();_gaq.push(['_trackSocial',$target.attr('data-track-group'),$target.attr('data-track-action')]);window.open(share.url,share.name,'width='+share.width+',height='+share.height+',scrollbars=1');}
return{create:create,hide:hide,shareBlock:shareBlock};}();DDC.Sidebar=function()
{function showDrugInfoExtra(type,id,title,ddc_id,brand_name_id)
{$('.sideBoxDrugInfoExtra').slideDown();$('.sideBoxDrugInfoExtra .sideBoxTitle').html(title);$('.sideBoxDrugInfoExtra .sideBoxContent').html("<img alt='Loading...' src='/img/misc/ajax-loader-large.gif' width='32' height='32' />");$.ajax({type:'GET',complete:updateDrugInfoExtra,data:({type:type,id:id,ddc_id:ddc_id,brand_name_id:brand_name_id}),url:'/drug-info-extra.php'});}
function showConditionInfoExtra(type,id,title,condition_id)
{$('.sideBoxDrugInfoExtra').slideDown();$('.sideBoxDrugInfoExtra .sideBoxTitle').html(title);$('.sideBoxDrugInfoExtra .sideBoxContent').html("<img alt='Loading...' src='/img/misc/ajax-loader-large.gif' width='32' height='32' />");$.ajax({type:'GET',complete:updateDrugInfoExtra,data:({type:type,id:id,condition_id:condition_id}),url:'/condition-info-extra.php'});}
function showConditionDocInfoExtra(type,title,url,doc_title,doc_filename)
{$('.sideBoxDrugInfoExtra').slideDown();$('.sideBoxDrugInfoExtra .sideBoxTitle').html(title);$('.sideBoxDrugInfoExtra .sideBoxContent').html("<img alt='Loading...' src='/img/misc/ajax-loader-large.gif' width='32' height='32' />");$.ajax({type:'GET',complete:updateDrugInfoExtra,data:({type:type,url:url,doc_title:doc_title,doc_filename:doc_filename}),url:'/condition-doc-info-extra.php'});}
function showUnapproved(ddc_id,brand_name_id)
{$('.sideBoxUnapproved').slideDown();$('.sideBoxUnapproved .sideBoxContent').html("<img alt='Loading...' src='/img/misc/ajax-loader-large.gif' width='32' height='32' />");$.ajax({type:'GET',complete:updateUnapproved,data:({ddc_id:ddc_id,brand_name_id:brand_name_id}),url:'/fda-unapproved-extra.php'});}
function updateDrugInfoExtra(response)
{$('.sideBoxDrugInfoExtra .sideBoxContent').html(response.responseText);}
function updateUnapproved(response)
{$('.sideBoxUnapproved .sideBoxContent').html(response.responseText);}
return{showDrugInfoExtra:showDrugInfoExtra,showConditionInfoExtra:showConditionInfoExtra,showConditionDocInfoExtra:showConditionDocInfoExtra,showUnapproved:showUnapproved};}();DDC.Feedback=function()
{var _cookieSet=false;function init()
{$(document).on(DDC.Scroller.event.move,position);$('.feedbackYes').click(process);$('.feedbackNo').click(process);$('.feedbackClose').click(hide);position();}
function position(e,data)
{var scrollTop=Math.round(data.scrollY);var windowHeight=Math.round(data.height);var contentTop=Math.round($('#contentWrap').offset().top);var contentHeight=Math.round($('#contentWrap').outerHeight());var sidebarLeft=Math.round($('#sidebar').offset().left);var sidebarTop=Math.round($('#sidebar').offset().top);var sidebarHeight=Math.round($('#sidebar').outerHeight());var feedbackHeight=Math.round($('#feedback').outerHeight());if($('#feedback').css('position')!='static')
{if(scrollTop+windowHeight<sidebarTop+sidebarHeight+feedbackHeight){var y=sidebarHeight;$('#feedback').css({position:'absolute',top:y+'px',bottom:'auto',left:'auto',right:'-36px'});}
else if(scrollTop+windowHeight>contentTop+contentHeight){$('#feedback').css({position:'absolute',top:'auto',bottom:0,left:'auto',right:'-36px'});}
else{$('#feedback').css({position:'fixed',top:'auto',bottom:'12px',left:sidebarLeft+'px',right:'auto'});setCookie();}}}
function process(e)
{e.preventDefault();setCookie();var response='Positive';if($(e.target).hasClass('feedbackNo')){response='Negative';}
$(e.target).closest('p').hide();$('.feedback'+response).show();$('.feedbackResponse').show();$.get('/js/feedback-process.php',{response:response,url:encodeURIComponent(document.URL)},processSuccess);}
function processSuccess(response)
{var json=$.parseJSON(response);$('#feedback-id').val(json.id);$('.feedbackResponse form').submit(submit);}
function submit(e)
{e.preventDefault();e.stopPropagation();if($('#feedback-comments').val().length){$.get('/js/feedback-process.php',{id:$('#feedback-id').val(),comments:encodeURIComponent($('#feedback-comments').val()),is_pro:$('#feedback-is_pro:checked').val()});}
$('#feedback').html("<p class='feedbackInquiry'>Thank you.</p>").fadeOut(9000);}
function setCookie()
{if(!_cookieSet)
{DDC.Cookie.set('feedback',1,3);_cookieSet=true;}}
function hide()
{$('#feedback').fadeOut();}
return{init:init};}();DDC.Promo=function()
{var _interval=5000;var _width=794;var _transition=new Array(50,50,50,50,50,50,50,50,50,50,50,50,50,50,35,20,15,10,7,7);var _hasFocusWin=true;var _hasFocusBox=false;var _promoIdOld=0;var _promoIdNew=0;var _index=0;var _position=0;var _carouselTimer;var _animationTimer;function init()
{checkFocus();$('.promoBox').each(function(){$(this).addClass('promoBox-'+$(this).attr('data-index'));});$('.promoBox a').click(track);$('.promoLink a').click(manual);_carouselTimer=setInterval('DDC.Promo.carousel()',(_interval));}
function track(e)
{var title=$(e.target).closest('.promoBox').attr('data-link');_gaq.push(['_trackEvent','Carousel','Click',title]);}
function carousel()
{if(!_hasFocusWin||_hasFocusBox)return;_promoIdOld=parseInt($('.promoLink.selected').attr('id').replace('promoLink-',''),10);_promoIdNew=_promoIdOld+1;if(_promoIdNew>$('.homePromo li').length){_promoIdNew=1;}
change();}
function manual(e)
{e.preventDefault();if(typeof(_carouselTimer)!='undefined'){clearInterval(_carouselTimer);}
_promoIdOld=$('.promoLink.selected').attr('id').replace('promoLink-','');_promoIdNew=$(e.target).closest('li').attr('id').replace('promoLink-','');if(_promoIdOld==_promoIdNew)return;change();}
function change()
{$('.promoLink').removeClass('selected');$('#promoLink-'+_promoIdNew).addClass('selected');_position=0;if(typeof(_animationTimer)!='undefined'){clearInterval(_animationTimer);}
_animationTimer=setInterval('DDC.Promo.animate()',15);}
function animate()
{_position-=_transition[_index];_index++;$('#promoBox-'+_promoIdOld).css('left',_position+'px');$('#promoBox-'+_promoIdNew).addClass('promoBox-active').css('left',(_position+_width)+'px');if(_index>=_transition.length)
{_index=0;clearInterval(_animationTimer);cleanup();}}
function cleanup()
{$('.promoBox').each(function(){if($(this).attr('id').replace('promoBox-','')!=_promoIdNew){$(this).removeClass('promoBox-active').css('left',_width+'px');}});}
function checkFocus()
{if(/*@cc_on!@*/false)
{document.onfocusin=onFocus;document.onfocusout=onBlur;}
else
{window.onfocus=onFocus;window.onblur=onBlur;}
$('.homePromo').mouseenter(onEnter);$('.homePromo').mouseleave(onLeave);}
function onFocus(e)
{_hasFocusWin=true;}
function onBlur(e)
{_hasFocusWin=false;}
function onEnter(e)
{_hasFocusBox=true;}
function onLeave(e)
{_hasFocusBox=false;}
return{init:init,carousel:carousel,animate:animate};}();DDC.Slider=function()
{var _barVisible=false;var _barTrigger=3000;var _barTimer=null;var _boxEnabled=false;var _boxVisible=false;var _boxTrigger=40;var _disable=false;function data(config)
{_config=config;}
function init()
{_boxEnabled=$('#slideBox').length;if(_config.url&&_config.name&&_config.content)
{_barTimer=setInterval('DDC.Slider.showBar()',_barTrigger);var html=[];html.push("<a class='close' href='#close'>Close</a>");html.push("<p><a href='"+_config.url+"' target='_blank' rel='nofollow' onclick=\"_gaq.push(['_trackEvent', 'Sponsor Center', '"+_config.name+"', 'FullBarBottom']);\">"+_config.content+"</a></p>");$("<div id='slider-bar' class='noVisit vmig' />").html(html.join('')).appendTo('body');$('body').on('click','#slider-bar a',cookieBar);$('body').on('click','#slider-bar a.close',hideBar);}
if(_boxEnabled){$(document).on(DDC.Scroller.event.move,scrolling);$('#slideBox a.close').click(hideBox);}}
function showBar(e)
{if($(window).scrollTop()>300)
{$('#slider-bar').animate({'bottom':'0px'},800);clearInterval(_barTimer);_barTimer=setInterval('DDC.Slider.hideBar()',_barTrigger*50);_barVisible=true;}}
function hideBar(e)
{if(typeof(e)!='undefined'){e.preventDefault();_disable=true;}
$('#slider-bar').animate({'bottom':'-100px'},800);clearInterval(_barTimer);_barVisible=false;}
function cookieBar(e)
{DDC.Cookie.set('sldrbar','disable',30);}
function scrolling(e,data)
{var limit=Math.round(data.height*_boxTrigger/100);if(!_disable&&!_boxVisible&&data.scrollY>limit){showBox();}
if(_boxVisible&&data.scrollY<limit-50){hideBox();}}
function showBox()
{$('#slideBox').animate({'right':'0px'},500);_boxVisible=true;}
function hideBox(e)
{if(typeof(e)!='undefined'){e.preventDefault();_disable=true;}
$('#slideBox').animate({'right':'-400px'},500);_boxVisible=false;}
return{init:init,data:data,showBar:showBar,hideBar:hideBar};}();DDC.FixedAd=function()
{var _ad={};var _sidebar;var _loaded=false;var _fixed=false;var _bottom=false;var _cssTop='90';var _cssBottom='20';function init()
{window.setTimeout(function(){$(document).on(DDC.Scroller.event.move,scrolling);_ad.original=getDimensions('#sideBoxFixed');_sidebar=getDimensions('#sidebar');},1000);}
function scrolling(e,data)
{if(!_loaded&&(data.scrollY+data.height>_ad.original.top-100)){_loaded=load();}
if(data.scrollY>_ad.original.top-_cssTop+15){if(!_fixed){$('#sideBoxFixed').find(':first').addClass('sideBoxFixed-scroll');_fixed=true;}
if(!_bottom){_ad.current=getDimensions('.sideBoxFixed-scroll');if(_ad.current.bottom>_sidebar.bottom-_cssBottom-5){$('.sideBoxFixed-scroll').addClass('sideBoxFixed-bottom');_bottom=true;}}
else if(data.scrollY<_ad.current.top-_cssTop){$('.sideBoxFixed-scroll').removeClass('sideBoxFixed-bottom');_bottom=false;}}
else{$('.sideBoxFixed-scroll').removeClass('sideBoxFixed-scroll');_fixed=false;}}
function getDimensions(selector)
{var dimensions={top:Math.round($(selector).offset().top),height:Math.round($(selector).height())};dimensions.bottom=dimensions.top+dimensions.height;return dimensions;}
function load()
{if(!_loaded&&typeof gptStickyAd!=='undefined'){googletag.cmd.push(function(){googletag.pubads().refresh([gptStickyAd]);});}
_ad.original=getDimensions('#sideBoxFixed');_sidebar=getDimensions('#sidebar');return true;}
return{init:init};}();DDC.SliderAd=function()
{var _animate=false;var _visible=false;var _disable=false;var _height;var _buffer=48;var _sidebarBottom;var _footerTop;var _links;var _targeting;var _pro=0;function init()
{if(DDC.Cookie.get('sldrad')=='disable'){return;}
_sidebarBottom=$('#sidebar').length?Math.round($('#sidebar').offset().top+$('#sidebar').outerHeight()):0;_footerTop=$('#footer').length?Math.round($('#footer').offset().top):0;var hasVertSpace=_footerTop-_sidebarBottom>600;var hasHorizSpace=$(window).width()>980;if(hasVertSpace&&hasHorizSpace){build();$(document).on(DDC.Scroller.event.move,scrolling);$('#slider li a').click(track);$('#slider a.close').click(hide);}}
function build()
{var html=[];html.push("<div class='slider-title'>Advertisement</div>");html.push("<a class='close' href='#'>Close</a>");html.push("<div class='slider-content'></div>");if(_links.length)
{html.push("<h3>Recommended</h3>");html.push("<ul>");for(var i=0;i<_links.length;i++){html.push("<li><a rel='nofollow' href='"+_links[i].url+"' style='background-image: url("+_links[i].image+");'>"+_links[i].title+"</a></li>");}
html.push("</ul>");}
$('<div />').attr({id:'slider'}).addClass('vmig').html(html.join('')).appendTo('body');}
function scrolling(e,data)
{if(!_disable&&!_visible&&data.scrollY>_sidebarBottom){show();}
if(_visible)
{if(data.scrollY<_sidebarBottom){hide();}
else if(!_animate&&(data.scrollY+data.height>_footerTop)){$('#slider').css({position:'absolute',top:(_footerTop-_height-_buffer)+'px',bottom:'auto'});}
else{$('#slider').css({position:'fixed',top:'auto',bottom:_buffer+'px'});}}}
function show()
{_visible=true;_animate=true;$('#slider').animate({'right':'0px'},500,function(){_animate=false;});track('open');var ad=$('<iframe />').attr({src:'/adcode/slider-ad-define.html?t='+_targeting+(_pro?'&p=1':''),width:'300px',height:'250px',frameborder:0});$('#slider').find('.slider-content').html('').append(ad);_height=Math.round($('#slider').outerHeight());}
function hide(e)
{if(typeof(e)!='undefined'){_disable=true;e.preventDefault();DDC.Cookie.set('sldrad','disable',3);track('close');}
$('#slider').animate({'right':'-400px'},500,function(){$(this).css({position:'fixed'});});_visible=false;}
function track(e)
{if(typeof(_gaq)=='undefined')return;if(typeof(e)=='object')
{_gaq.push(['_trackEvent','SliderAd','Click',$(e.target).html()]);}
else if(e=='open')
{var parts=window.location.pathname.split('/');var section=parts[1];if(section.indexOf('.')>0){section=section.substr(0,section.indexOf('.'));}
_gaq.push(['_trackEvent','SliderAd','Open',section]);}
else if(e=='close')
{_gaq.push(['_trackEvent','SliderAd','Close']);}}
function setLinks(v)
{_links=v;}
function setTargeting(t)
{_targeting=t;}
function setPro(p)
{_pro=p;}
return{init:init,setLinks:setLinks,setTargeting:setTargeting,setPro:setPro};}();DDC.SliderArticle=function()
{var _animate=false;var _visible=false;var _disable=false;var _height;var _buffer=48;var _sidebarBottom;var _footerTop;var _list;function init()
{if(DDC.Cookie.get('sldrad')=='disable'){return;}
_sidebarBottom=$('.sideBox').last().length?Math.round($('.sideBox').last().offset().top+$('.sideBox').last().height()):0;_footerTop=$('.apps-feature').length?Math.round($('.apps-feature').offset().top):0;var hasVertSpace=_footerTop-_sidebarBottom>600;var hasHorizSpace=$(window).width()>980;if(hasVertSpace&&hasHorizSpace){build();$(document).on(DDC.Scroller.event.move,scrolling);$('#slider').on('click','a.primary',track);$('#slider').on('click','a.close',hide);}}
function build()
{if(!_list.length){return;}
var activeList=[];$.each(_list,function(index,item){if(item.enabled){activeList.push(item);}});if(!activeList.length){return;}
var randIndex=Math.floor(Math.random()*activeList.length);var article=activeList[randIndex];var html=[];html.push("<a class='close' href='#'>Close</a>");html.push("<a class='primary' href='"+article.url+"'>");html.push("<div class='img-crop'><img src='"+article.image+"' /></div>");html.push("<span>Recommended Reading</span>");html.push("<b>"+article.title+"</b>");html.push("</a>");$('<div />').attr({id:'slider'}).addClass('slider-article vmig').html(html.join('')).appendTo('body');}
function scrolling(e,data)
{if(!_disable&&!_visible&&data.scrollY>_sidebarBottom){show();}
if(_visible)
{if(data.scrollY<_sidebarBottom){hide();}
else if(!_animate&&(data.scrollY+data.height>_footerTop)){$('#slider').css({position:'absolute',top:(_footerTop-_height-_buffer)+'px',bottom:'auto'});}
else{$('#slider').css({position:'fixed',top:'auto',bottom:_buffer+'px'});}}}
function show()
{_visible=true;_animate=true;$('#slider').animate({'right':'0px'},1000,function(){_animate=false;});track('open');_height=Math.round($('#slider').outerHeight());}
function hide(e)
{if(typeof(e)!='undefined'){_disable=true;e.preventDefault();DDC.Cookie.set('sldrad','disable',3);track('close');}
$('#slider').animate({'right':'-400px'},500,function(){$(this).css({position:'fixed'});});_visible=false;}
function track(e)
{if(typeof(_gaq)=='undefined')return;if(typeof(e)=='object')
{_gaq.push(['_trackEvent','SliderArticle','Click',$(e.target).closest('a').find('b').text()]);}
else if(e=='open')
{var parts=window.location.pathname.split('/');var section=parts[1];if(section.indexOf('.')>0){section=section.substr(0,section.indexOf('.'));}
_gaq.push(['_trackEvent','SliderArticle','Open',section]);}
else if(e=='close')
{_gaq.push(['_trackEvent','SliderArticle','Close']);}}
function setList(v)
{_list=v;}
return{init:init,setList:setList};}();DDC.SliderGravity=function()
{var _animate=false;var _visible=false;var _disable=false;var _height;var _buffer=48;var _sidebarBottom;var _footerTop;function init()
{if(DDC.Cookie.get('sldrad')=='disable'){return;}
_sidebarBottom=$('#sidebar').length?Math.round($('#sidebar').offset().top+$('#sidebar').outerHeight()):0;_footerTop=$('#footer').length?Math.round($('#footer').offset().top):0;var hasVertSpace=_footerTop-_sidebarBottom>600;var hasHorizSpace=$(window).width()>980;if(hasVertSpace&&hasHorizSpace){$(document).on(DDC.Scroller.event.move,scrolling);$('#slider a.close').click(hide);}}
function scrolling(e,data)
{if(!_disable&&!_visible&&data.scrollY>_sidebarBottom){show();}
if(_visible)
{if(data.scrollY<_sidebarBottom){hide();}
else if(!_animate&&(data.scrollY+data.height>_footerTop)){$('#slider').css({position:'absolute',top:(_footerTop-_height-_buffer)+'px',bottom:'auto'});}
else{$('#slider').css({position:'fixed',top:'auto',bottom:_buffer+'px'});}}}
function show()
{_visible=true;_animate=true;$('#slider').animate({'right':'0px'},1000,function(){_animate=false;});_height=Math.round($('#slider').outerHeight());}
function hide(e)
{if(typeof(e)!='undefined'){_disable=true;e.preventDefault();DDC.Cookie.set('sldrad','disable',3);track('close');}
$('#slider').animate({'right':'-400px'},500,function(){$(this).css({position:'fixed'});});_visible=false;}
return{init:init};}();DDC.Placeholder=function()
{function init()
{if(document.createElement('input').placeholder!==undefined){return;}
$('.placeholder').each(function(){show(this);$(this).on('blur',show);$(this).on('focus',hide);var form=$(this).closest('form');if(!form.attr('data-placeholder')){form.attr('data-placeholder',1).on('submit',submit);}});}
function show(target)
{if(target.target){target=target.target;}
if($(target).val()===''){$(target).val($(target).attr('placeholder')).addClass('placeholding');}}
function hide(target)
{if(target.target){target=target.target;}
if($(target).val()==$(target).attr('placeholder')){$(target).val('').removeClass('placeholding');}}
function submit(e)
{$('.placeholder').each(function(){hide(this);});}
return{init:init};}();DDC.Pro=function()
{function init()
{$('#nav-pro').click(track);}
function track()
{DDC.Cookie.set('proclick',1,90);_gaq.push(['_trackEvent','Pro','MenuClick']);}
return{init:init};}();DDC.GoogleMap=function()
{var _mapId='google-map';function init()
{var zoom=$('#gmap-zoom').length?parseInt($('#gmap-zoom').val()):12;var latlng=new google.maps.LatLng($('#gmap-latitude').val(),$('#gmap-longitude').val());var options={zoom:zoom,center:latlng,scaleControl:false,mapTypeControl:false,disableDefaultUI:false,mapTypeId:google.maps.MapTypeId.ROADMAP};var map=new google.maps.Map(document.getElementById(_mapId),options);var marker=new google.maps.Marker({map:map,position:latlng});}
return{init:init};}();function dosageDisambiguation(e,ddc_id,brand_name_id){e.preventDefault();e.stopPropagation();$.ajax({type:'GET',complete:dosageDisambiguationCB,data:'',url:'/dosage-disambiguation.php?ddc_id='+ddc_id+'&brand_name_id='+brand_name_id});return false;}
function dosageDisambiguationCB(response){DDC.Popup.create(response.responseText,{width:350});}
function checkDisclaimerCookies(){var terms_interactions=DDC.Cookie.get('terms_interactions');if(terms_interactions){document.getElementById('nav').innerHTML=document.getElementById('nav').innerHTML.replace('drug_interactions.html','drug_interactions.php');}
var terms_pillid=DDC.Cookie.get('terms_pillid');if(terms_pillid){document.getElementById('nav').innerHTML=document.getElementById('nav').innerHTML.replace('pill_identification.html','imprints.php');}}
function dwLog(a,b,c,d,e,f,h,i,k,l,m){$.ajax({type:'POST',data:{a:a,b:b,c:c,d:d,e:e,f:f,g:document.referrer,h:h,i:i,j:window.location.href,k:k,l:l,m:m},url:'/js/dw.php'});}
function mayoImageToggle(obj,evt,id){window.location='#Image_'+id;document.getElementById('Image_'+id).innerHTML=obj.innerHTML;var els=document.getElementsByClassName('mayoImageThumb');for(i=0;i<els.length;i++){els[i].className="mayoImageThumb";}
obj.className="mayoImageThumb mayoImageThumbSelected";}
function surveyGet(){$.ajax({type:'POST',data:{a:window.location.href},url:'/survey/get.php',success:function(data){$('#survey').html(data);}});}
function surveyClose(id){$.ajax({type:'POST',data:{a:id},async:false,url:'/survey/close.php',success:function(data){$('#surveyContent').html(data);}});}
function topRelatedOtherConditions(ddc_id,brand_name_id,max_conditions,title){$('#topRelatedOtherConditions').html('<img src="http://images.ddccdn.com/img/loading.gif" />');$('#topRelatedOtherConditions').html($.ajax({type:"GET",url:"/top-related-other-conditions.php?ddc_id="+ddc_id+"&brand_name_id="+brand_name_id+"&max_conditions="+max_conditions+"&title="+title,async:false}).responseText);}
function conditionDrugLog(condition_id,ddc_id,brand_name_id){var url="/js/condition-drug-log.php?condition_id="+condition_id+"&ddc_id="+ddc_id+"&brand_name_id="+brand_name_id;$.ajax({url:url,async:false});}
function drugConditionLog(ddc_id,brand_name_id,condition_id){var url="/js/drug-condition-log.php?ddc_id="+ddc_id+"&brand_name_id="+brand_name_id+"&condition_id="+condition_id;$.ajax({url:url,async:false});};(function($){var items={'noninteraction':[],'click':[]};var _eventsRecorded={};function track(data){var data=data||{},category=data['ga_eventCategory']||false,action=data['ga_eventAction']||false,label=data['ga_eventLabel']||"",value=data['ga_eventValue']||0,nonInteraction=data['ga_eventNoninteraction']||false;if(category&&BROWSER.isMobile){category+='-Mobile';}
var params=['_trackEvent',category,action,label,value,nonInteraction];if(category&&action){if(typeof console=="object"){console.log("ga_event: ",params);}
_gaq.push(params);}};function trackOnce(data){var key=[data.ga_eventCategory,data.ga_eventAction,data.ga_eventLabel].join('-');if(_eventsRecorded[key]){return;}
_eventsRecorded[key]=true;track(data);}
var init=function init(){if(typeof(_gaq)==="undefined"){return;}
$(".ga-event").each(function(index,el){var $self=$(el),data=$self.data()||{'ga_eventNoninteraction':false};if(data['ga_eventNoninteraction']){items['noninteraction'].push(el);track(data);}
else{items['click'].push(el);$self.click(function(e){track(data);});}});};$.ga_events={init:init,items:items,track:track,trackOnce:trackOnce};$(init);})(jQuery);;var DDC=window.DDC||{};DDC.Menu=function()
{var _stickyNav={visible:false,duration:810,browse:{}};var _timer={inside:false,outside:false};var _doSearchTimeoutId;function init()
{initIEOffScreen();initOffCanvas();loadSubNav();setupStickyNav();setupSearchSelect();$('#nav').on('click','a',recordClick);$('#header .user-account').on('click','a',recordClick);$('.sticky-nav-browse').on('click','a',recordStickyNavBrowseClick);$('.sticky-nav .search-main').on("focus","input[name='searchterm']",recordStickySearchEvent);$('.sticky-nav .search-main').on("keyup","input[name='searchterm']",recordStickySearchEvent);$('.sticky-nav').on('click','a',recordStickyNavClick);}
function loadSubNav()
{return $('<div />').load('/js/nav-subnav.html',function(){$(this).children('div').each(function(){var navId='#'+$(this).attr('id').replace('subnav-','nav-');$(navId).append($(this));});});}
function setupStickyNav()
{if(BROWSER.isIE6||BROWSER.isIE7||BROWSER.isIE8||BROWSER.isIE9||BROWSER.isMobile){return;}
$('.top-container').clone().addClass('sticky-nav').appendTo('body');$("<div class='sticky-nav-browse clearAfter'></div>").appendTo('body');$(document).on(DDC.Scroller.event.move,scrolling);$(document).on(DDC.Scroller.event.top,hideStickyNav);$('.sticky-nav').find('#livesearch-main').attr('id','livesearch-main-sticky');DDC.Search.init('.sticky-nav');$('.sticky-nav-browse').load('/js/nav-browsemenu.html');$('.sticky-nav-browse-toggle').on('mouseover',function(e){window.clearTimeout(_timer.inside);window.clearTimeout(_timer.outside);showBrowseMenu();});$('.sticky-nav-browse-toggle').on('mouseleave',function(e){window.clearTimeout(_timer.inside);_timer.inside=window.setTimeout(hideBrowseMenu,2000);});$('.sticky-nav-browse').on('mouseover',function(e){window.clearTimeout(_timer.inside);window.clearTimeout(_timer.outside);});$('.sticky-nav-browse').on('mouseleave',function(e){window.clearTimeout(_timer.outside);_timer.outside=window.setTimeout(hideBrowseMenu,400);});buildStickyLinks();}
function scrolling(e,data)
{var threshhold=190;if(!_stickyNav.visible&&data.scrollY>threshhold){showStickyNav();}
else if(_stickyNav.visible&&data.scrollY<threshhold){hideStickyNav();}}
function showStickyNav()
{if(!BROWSER.isMobile){$('.sticky-nav').removeClass('sticky-nav-up').addClass('sticky-nav-down');window.setTimeout(function(){var wasVisible=_stickyNav.visible;_stickyNav.visible=$('.sticky-nav:visible').length>0;if(!wasVisible&&_stickyNav.visible){trackEvent({ga_eventCategory:'Sticky Nav',ga_eventAction:'Show',ga_eventNoninteraction:true});}},_stickyNav.duration);}}
function hideStickyNav()
{hideBrowseMenu();$('.sticky-nav').removeClass('sticky-nav-down').addClass('sticky-nav-up');window.setTimeout(function(){_stickyNav.visible=false;},_stickyNav.duration);}
function showBrowseMenu()
{$('.sticky-nav-browse').removeClass('sticky-nav-browse-up').addClass('sticky-nav-browse-down');}
function hideBrowseMenu()
{if($('.sticky-nav-browse').hasClass('sticky-nav-browse-down')){$('.sticky-nav-browse').removeClass('sticky-nav-browse-down').addClass('sticky-nav-browse-up');}}
function setupSearchSelect()
{$('.searchDropdownBox').change(function(){var label=$(this).children('option:selected').text();$(this).closest('.search-wrapper').find('.nav-search-in-content').text(label);if(label=='All'){$(this).prop('disabled',true);}});}
function buildStickyLinks()
{var html=[];html.push("<div class='menu-nav-inline'>");html.push('<ul>');$('[data-menu-inline]').each(function(){var name=$(this).attr('data-menu-inline');var href=$(this).find('> a').attr('href');html.push("<li data-menu-link='"+name+"'><a href='"+href+"'>"+name+"</a></li>");});html.push('</ul>');html.push('</div>');$('.header-side-box').prepend(html.join(''));}
function initIEOffScreen()
{if(BROWSER.isIELessThan9||false){if(console)console.log('DDC.Menu.initIEOffScreen');var moveMenuOffScreen=debounce(function _moveMenuOffScreen(){var menuLeftEdgePlace=($(window).width());$('.menu').css('left',menuLeftEdgePlace);},250);moveMenuOffScreen();$(window).resize(moveMenuOffScreen);}}
function debounce(func,wait,immediate)
{var timeout;return function(){var context=this,args=arguments;var later=function(){timeout=null;if(!immediate)func.apply(context,args);};var callNow=immediate&&!timeout;clearTimeout(timeout);timeout=setTimeout(later,wait);if(callNow)func.apply(context,args);};}
function initOffCanvas()
{if(console)console.log('DDC.Menu.initOffCanvas');var isOffCanvasAlwaysEnabled=BROWSER.isIELessThan9||$('html').hasClass('touch');var offCanvasShowsWidth=1023;$(".open-panel").click(function(e){e.preventDefault();$("html").addClass("openNav");if(!$('.nav_link.active').length){$('.menu_account').find('.nav_link').addClass('active');$('.menu_account').find('.nav_folder').addClass('active');}});$(".close-panel, #content").click(function(e){$("html").removeClass("openNav");});$('.nav_menu').on('click','.dropnav a.nav_link',function(e){if(isOffCanvasAlwaysEnabled||$(window).width()<offCanvasShowsWidth){e.preventDefault();var justClosing=$(this).hasClass('active');var $activeMenu=$('.dropnav a.nav_link.active');if($activeMenu.length){var $activeMenuList=$activeMenu.next();$activeMenuList.removeClass('active').slideUp({duration:'fast',complete:function(){$activeMenuList.attr('style','');}});$activeMenu.removeClass('active');}
if(!justClosing){var $menuList=$(this).next();$menuList.slideDown({duration:'fast',complete:function(){$menuList.addClass('active').attr('style','');}});$(this).addClass('active');}}});$(".dropnav > a").click(function(event){event.preventDefault();});}
function recordClick(e)
{var data={ga_eventCategory:'Top Nav'};var $target=$(e.target);data.ga_eventLabel=$target.text();var $dropNav=$target.closest('.dropnav');if($target.closest('a').hasClass('ls-item')){return;}
data.ga_eventAction=$dropNav.find('a.nav_link').text();if(!data.ga_eventAction){data.ga_eventAction=data.ga_eventLabel;}
else if($dropNav.hasClass('logged-in')){if(data.ga_eventLabel===data.ga_eventAction){data.ga_eventLabel="Signed in";}
data.ga_eventAction="Signed in";}
trackEvent(data);}
function recordStickyNavClick(e)
{var data={ga_eventCategory:'Sticky Nav'};var $target=$(e.target);if($target.closest('a').hasClass('header-logo-link')){data.ga_eventAction='Logo';}
else if($target.closest('a').hasClass('ls-item')){return;}
else{data.ga_eventLabel=$target.text();var $dropNav=$target.closest('.dropnav');data.ga_eventAction=$dropNav.find('a.nav_link').text();if(!data.ga_eventAction){data.ga_eventAction=data.ga_eventLabel;}
else if($dropNav.hasClass('logged-in')){data.ga_eventAction="Signed in";if($target.attr('href').match(/\/account$/)){data.ga_eventLabel="";}}}
trackEvent(data);}
function recordStickyNavBrowseClick(e)
{var data={ga_eventCategory:'Sticky Nav',ga_eventAction:'Browse',};var $target=$(e.target);data.ga_eventLabel=$target.text();trackEvent(data);}
function recordStickySearchEvent(event)
{var data={ga_eventCategory:'Sticky Nav',ga_eventAction:'Search',ga_eventNoninteraction:true};if(event.type==='focusin'){data.ga_eventLabel='Focus';data.ga_eventNoninteraction=true;trackEvent(data);}
else{data.ga_eventLabel='Do Search';if(_doSearchTimeoutId){window.clearTimeout(_doSearchTimeoutId);}
_doSearchTimeoutId=window.setTimeout(function(){trackEvent(data);},250);}}
function trackEvent(data){$.ga_events.trackOnce(data);}
return{init:init};}();;var DDC=window.DDC||{};DDC.Header=function()
{var _doSearchTimeoutId;function init()
{if(console)console.log('DDC.Header.init');$('#header [data-tracking="header-logo"]').on("click",recordLogoClick);$('#header .search-main').on("focus","input[name='searchterm']",recordSearchEvent);$('#header .search-main').on("keyup","input[name='searchterm']",recordSearchEvent);$('#header .open-panel.nav-toggle').on("click",recordHamburgerClick);$('#header .alpha-list').on("click","a",recordAlphaSearch);$('#header .search-browse-options').on("click","a",recordAdvancedSearch);}
function recordLogoClick()
{var data={ga_eventCategory:'Top Nav',ga_eventAction:'Logo'};trackEvent(data);}
function recordHamburgerClick()
{var data={ga_eventCategory:'Top Nav',ga_eventAction:'Hamburger'};trackEvent(data);}
function recordSearchEvent(event)
{var data={ga_eventCategory:'Top Nav',ga_eventAction:'Search',ga_eventNoninteraction:true};if(event.type==='focusin'){data.ga_eventLabel='Focus';data.ga_eventNoninteraction=true;trackEvent(data);}
else{data.ga_eventLabel='Do Search';if(_doSearchTimeoutId){window.clearTimeout(_doSearchTimeoutId);}
_doSearchTimeoutId=window.setTimeout(function(){trackEvent(data);},250);}}
function recordAlphaSearch(e)
{var data={ga_eventCategory:'Top Nav',ga_eventAction:'Alpha'};data.ga_eventLabel=$(e.target).text();trackEvent(data);}
function recordAdvancedSearch(e)
{var data={ga_eventCategory:'Top Nav',ga_eventAction:'Advanced Search'};trackEvent(data);}
function trackEvent(data){$.ga_events.trackOnce(data);}
return{init:init};}();