!function(t,e,i,n){"use strict";var s=s||!1;Foundation.libs.joyride={name:"joyride",version:"4.3.2",defaults:{expose:!1,modal:!1,tipLocation:"bottom",nubPosition:"auto",scrollSpeed:300,timer:0,startTimerOnClick:!0,startOffset:0,nextButton:!0,tipAnimation:"fade",pauseAfter:[],exposed:[],tipAnimationFadeSpeed:300,cookieMonster:!1,cookieName:"joyride",cookieDomain:!1,cookieExpires:365,tipContainer:"body",postRideCallback:function(){},postStepCallback:function(){},preStepCallback:function(){},preRideCallback:function(){},postExposeCallback:function(){},template:{link:'<a href="#close" class="joyride-close-tip">&times;</a>',timer:'<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',tip:'<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',wrapper:'<div class="joyride-content-wrapper"></div>',button:'<a href="#" class="small button joyride-next-tip"></a>',modal:'<div class="joyride-modal-bg"></div>',expose:'<div class="joyride-expose-wrapper"></div>',exposeCover:'<div class="joyride-expose-cover"></div>'},exposeAddClass:""},settings:{},init:function(e,i,n){return this.scope=e||this.scope,Foundation.inherit(this,"throttle data_options scrollTo scrollLeft delay"),"object"==typeof i?t.extend(!0,this.settings,this.defaults,i):t.extend(!0,this.settings,this.defaults,n),"string"!=typeof i?(this.settings.init||this.events(),this.settings.init):this[i].call(this,n)},events:function(){var i=this;t(this.scope).on("click.joyride",".joyride-next-tip, .joyride-modal-bg",function(t){t.preventDefault(),this.settings.$li.next().length<1?this.end():this.settings.timer>0?(clearTimeout(this.settings.automate),this.hide(),this.show(),this.startTimer()):(this.hide(),this.show())}.bind(this)).on("click.joyride",".joyride-close-tip",function(t){t.preventDefault(),this.end()}.bind(this)),t(e).on("resize.fndtn.joyride",i.throttle(function(){if(t("[data-joyride]").length>0&&i.settings.$next_tip){if(i.settings.exposed.length>0){var e=t(i.settings.exposed);e.each(function(){var e=t(this);i.un_expose(e),i.expose(e)})}i.is_phone()?i.pos_phone():i.pos_default(!1,!0)}},100)),this.settings.init=!0},start:function(){var e=this,i=t(this.scope).find("[data-joyride]"),n=["timer","scrollSpeed","startOffset","tipAnimationFadeSpeed","cookieExpires"],s=n.length;this.settings.init||this.events(),this.settings.$content_el=i,this.settings.$body=t(this.settings.tipContainer),this.settings.body_offset=t(this.settings.tipContainer).position(),this.settings.$tip_content=this.settings.$content_el.find("> li"),this.settings.paused=!1,this.settings.attempts=0,this.settings.tipLocationPatterns={top:["bottom"],bottom:[],left:["right","top","bottom"],right:["left","top","bottom"]},"function"!=typeof t.cookie&&(this.settings.cookieMonster=!1),(!this.settings.cookieMonster||this.settings.cookieMonster&&null===t.cookie(this.settings.cookieName))&&(this.settings.$tip_content.each(function(i){var o=t(this);t.extend(!0,e.settings,e.data_options(o));for(var r=s-1;r>=0;r--)e.settings[n[r]]=parseInt(e.settings[n[r]],10);e.create({$li:o,index:i})}),!this.settings.startTimerOnClick&&this.settings.timer>0?(this.show("init"),this.startTimer()):this.show("init"))},resume:function(){this.set_li(),this.show()},tip_template:function(e){var i,n;return e.tip_class=e.tip_class||"",i=t(this.settings.template.tip).addClass(e.tip_class),n=t.trim(t(e.li).html())+this.button_text(e.button_text)+this.settings.template.link+this.timer_instance(e.index),i.append(t(this.settings.template.wrapper)),i.first().attr("data-index",e.index),t(".joyride-content-wrapper",i).append(n),i[0]},timer_instance:function(e){var i;return i=0===e&&this.settings.startTimerOnClick&&this.settings.timer>0||0===this.settings.timer?"":this.outerHTML(t(this.settings.template.timer)[0])},button_text:function(e){return this.settings.nextButton?(e=t.trim(e)||"Next",e=this.outerHTML(t(this.settings.template.button).append(e)[0])):e="",e},create:function(e){var i=e.$li.attr("data-button")||e.$li.attr("data-text"),n=e.$li.attr("class"),s=t(this.tip_template({tip_class:n,index:e.index,button_text:i,li:e.$li}));t(this.settings.tipContainer).append(s)},show:function(e){var i=null;this.settings.$li===n||-1===t.inArray(this.settings.$li.index(),this.settings.pauseAfter)?(this.settings.paused?this.settings.paused=!1:this.set_li(e),this.settings.attempts=0,this.settings.$li.length&&this.settings.$target.length>0?(e&&(this.settings.preRideCallback(this.settings.$li.index(),this.settings.$next_tip),this.settings.modal&&this.show_modal()),this.settings.preStepCallback(this.settings.$li.index(),this.settings.$next_tip),this.settings.modal&&this.settings.expose&&this.expose(),this.settings.tipSettings=t.extend(this.settings,this.data_options(this.settings.$li)),this.settings.timer=parseInt(this.settings.timer,10),this.settings.tipSettings.tipLocationPattern=this.settings.tipLocationPatterns[this.settings.tipSettings.tipLocation],/body/i.test(this.settings.$target.selector)||this.scroll_to(),this.is_phone()?this.pos_phone(!0):this.pos_default(!0),i=this.settings.$next_tip.find(".joyride-timer-indicator"),/pop/i.test(this.settings.tipAnimation)?(i.width(0),this.settings.timer>0?(this.settings.$next_tip.show(),this.delay(function(){i.animate({width:i.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tipAnimationFadeSpeed)):this.settings.$next_tip.show()):/fade/i.test(this.settings.tipAnimation)&&(i.width(0),this.settings.timer>0?(this.settings.$next_tip.fadeIn(this.settings.tipAnimationFadeSpeed).show(),this.delay(function(){i.animate({width:i.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tipAnimationFadeSpeed)):this.settings.$next_tip.fadeIn(this.settings.tipAnimationFadeSpeed)),this.settings.$current_tip=this.settings.$next_tip):this.settings.$li&&this.settings.$target.length<1?this.show():this.end()):this.settings.paused=!0},is_phone:function(){return s?s.mq("only screen and (max-width: 767px)")||t(".lt-ie9").length>0:t(e).width()<767},hide:function(){this.settings.modal&&this.settings.expose&&this.un_expose(),this.settings.modal||t(".joyride-modal-bg").hide(),this.settings.$current_tip.css("visibility","hidden"),setTimeout(t.proxy(function(){this.hide(),this.css("visibility","visible")},this.settings.$current_tip),0),this.settings.postStepCallback(this.settings.$li.index(),this.settings.$current_tip)},set_li:function(t){t?(this.settings.$li=this.settings.$tip_content.eq(this.settings.startOffset),this.set_next_tip(),this.settings.$current_tip=this.settings.$next_tip):(this.settings.$li=this.settings.$li.next(),this.set_next_tip()),this.set_target()},set_next_tip:function(){this.settings.$next_tip=t(".joyride-tip-guide[data-index='"+this.settings.$li.index()+"']"),this.settings.$next_tip.data("closed","")},set_target:function(){var e=this.settings.$li.attr("data-class"),n=this.settings.$li.attr("data-id"),s=function(){return n?t(i.getElementById(n)):e?t("."+e).first():t("body")};this.settings.$target=s()},scroll_to:function(){var i,n;i=t(e).height()/2,n=Math.ceil(this.settings.$target.offset().top-i+this.outerHeight(this.settings.$next_tip)),n>0&&this.scrollTo(t("html, body"),n,this.settings.scrollSpeed)},paused:function(){return-1===t.inArray(this.settings.$li.index()+1,this.settings.pauseAfter)},restart:function(){this.hide(),this.settings.$li=n,this.show("init")},pos_default:function(i,n){var s=(Math.ceil(t(e).height()/2),this.settings.$next_tip.offset(),this.settings.$next_tip.find(".joyride-nub")),o=Math.ceil(this.outerWidth(s)/2),r=Math.ceil(this.outerHeight(s)/2),a=i||!1;if(a&&(this.settings.$next_tip.css("visibility","hidden"),this.settings.$next_tip.show()),"undefined"==typeof n&&(n=!1),/body/i.test(this.settings.$target.selector))this.settings.$li.length&&this.pos_modal(s);else{if(this.bottom()){var c=this.settings.$target.offset().left;Foundation.rtl&&(c=this.settings.$target.offset().width-this.settings.$next_tip.width()+c),this.settings.$next_tip.css({top:this.settings.$target.offset().top+r+this.outerHeight(this.settings.$target),left:c}),this.nub_position(s,this.settings.tipSettings.nubPosition,"top")}else if(this.top()){var c=this.settings.$target.offset().left;Foundation.rtl&&(c=this.settings.$target.offset().width-this.settings.$next_tip.width()+c),this.settings.$next_tip.css({top:this.settings.$target.offset().top-this.outerHeight(this.settings.$next_tip)-r,left:c}),this.nub_position(s,this.settings.tipSettings.nubPosition,"bottom")}else this.right()?(this.settings.$next_tip.css({top:this.settings.$target.offset().top,left:this.outerWidth(this.settings.$target)+this.settings.$target.offset().left+o}),this.nub_position(s,this.settings.tipSettings.nubPosition,"left")):this.left()&&(this.settings.$next_tip.css({top:this.settings.$target.offset().top,left:this.settings.$target.offset().left-this.outerWidth(this.settings.$next_tip)-o}),this.nub_position(s,this.settings.tipSettings.nubPosition,"right"));!this.visible(this.corners(this.settings.$next_tip))&&this.settings.attempts<this.settings.tipSettings.tipLocationPattern.length&&(s.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),this.settings.tipSettings.tipLocation=this.settings.tipSettings.tipLocationPattern[this.settings.attempts],this.settings.attempts++,this.pos_default())}a&&(this.settings.$next_tip.hide(),this.settings.$next_tip.css("visibility","visible"))},pos_phone:function(e){var i=this.outerHeight(this.settings.$next_tip),n=(this.settings.$next_tip.offset(),this.outerHeight(this.settings.$target)),s=t(".joyride-nub",this.settings.$next_tip),o=Math.ceil(this.outerHeight(s)/2),r=e||!1;s.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),r&&(this.settings.$next_tip.css("visibility","hidden"),this.settings.$next_tip.show()),/body/i.test(this.settings.$target.selector)?this.settings.$li.length&&this.pos_modal(s):this.top()?(this.settings.$next_tip.offset({top:this.settings.$target.offset().top-i-o}),s.addClass("bottom")):(this.settings.$next_tip.offset({top:this.settings.$target.offset().top+n+o}),s.addClass("top")),r&&(this.settings.$next_tip.hide(),this.settings.$next_tip.css("visibility","visible"))},pos_modal:function(t){this.center(),t.hide(),this.show_modal()},show_modal:function(){if(!this.settings.$next_tip.data("closed")){var e=t(".joyride-modal-bg");e.length<1&&t("body").append(this.settings.template.modal).show(),/pop/i.test(this.settings.tipAnimation)?e.show():e.fadeIn(this.settings.tipAnimationFadeSpeed)}},expose:function(){var i,n,s,o,r,a="expose-"+Math.floor(1e4*Math.random());if(arguments.length>0&&arguments[0]instanceof t)s=arguments[0];else{if(!this.settings.$target||/body/i.test(this.settings.$target.selector))return!1;s=this.settings.$target}return s.length<1?(e.console&&console.error("element not valid",s),!1):(i=t(this.settings.template.expose),this.settings.$body.append(i),i.css({top:s.offset().top,left:s.offset().left,width:this.outerWidth(s,!0),height:this.outerHeight(s,!0)}),n=t(this.settings.template.exposeCover),o={zIndex:s.css("z-index"),position:s.css("position")},r=null==s.attr("class")?"":s.attr("class"),s.css("z-index",parseInt(i.css("z-index"))+1),"static"==o.position&&s.css("position","relative"),s.data("expose-css",o),s.data("orig-class",r),s.attr("class",r+" "+this.settings.exposeAddClass),n.css({top:s.offset().top,left:s.offset().left,width:this.outerWidth(s,!0),height:this.outerHeight(s,!0)}),this.settings.$body.append(n),i.addClass(a),n.addClass(a),s.data("expose",a),this.settings.postExposeCallback(this.settings.$li.index(),this.settings.$next_tip,s),this.add_exposed(s),void 0)},un_expose:function(){var i,n,s,o,r,a=!1;if(arguments.length>0&&arguments[0]instanceof t)n=arguments[0];else{if(!this.settings.$target||/body/i.test(this.settings.$target.selector))return!1;n=this.settings.$target}return n.length<1?(e.console&&console.error("element not valid",n),!1):(i=n.data("expose"),s=t("."+i),arguments.length>1&&(a=arguments[1]),a===!0?t(".joyride-expose-wrapper,.joyride-expose-cover").remove():s.remove(),o=n.data("expose-css"),"auto"==o.zIndex?n.css("z-index",""):n.css("z-index",o.zIndex),o.position!=n.css("position")&&("static"==o.position?n.css("position",""):n.css("position",o.position)),r=n.data("orig-class"),n.attr("class",r),n.removeData("orig-classes"),n.removeData("expose"),n.removeData("expose-z-index"),this.remove_exposed(n),void 0)},add_exposed:function(e){this.settings.exposed=this.settings.exposed||[],e instanceof t||"object"==typeof e?this.settings.exposed.push(e[0]):"string"==typeof e&&this.settings.exposed.push(e)},remove_exposed:function(e){var i,n;e instanceof t?i=e[0]:"string"==typeof e&&(i=e),this.settings.exposed=this.settings.exposed||[],n=this.settings.exposed.length;for(var s=0;n>s;s++)if(this.settings.exposed[s]==i)return this.settings.exposed.splice(s,1),void 0},center:function(){var i=t(e);return this.settings.$next_tip.css({top:(i.height()-this.outerHeight(this.settings.$next_tip))/2+i.scrollTop(),left:(i.width()-this.outerWidth(this.settings.$next_tip))/2+this.scrollLeft(i)}),!0},bottom:function(){return/bottom/i.test(this.settings.tipSettings.tipLocation)},top:function(){return/top/i.test(this.settings.tipSettings.tipLocation)},right:function(){return/right/i.test(this.settings.tipSettings.tipLocation)},left:function(){return/left/i.test(this.settings.tipSettings.tipLocation)},corners:function(i){var n=t(e),s=n.height()/2,o=Math.ceil(this.settings.$target.offset().top-s+this.settings.$next_tip.outerHeight()),r=n.width()+this.scrollLeft(n),a=n.height()+o,c=n.height()+n.scrollTop(),l=n.scrollTop();return l>o&&(l=0>o?0:o),a>c&&(c=a),[i.offset().top<l,r<i.offset().left+i.outerWidth(),c<i.offset().top+i.outerHeight(),this.scrollLeft(n)>i.offset().left]},visible:function(t){for(var e=t.length;e--;)if(t[e])return!1;return!0},nub_position:function(t,e,i){"auto"===e?t.addClass(i):t.addClass(e)},startTimer:function(){this.settings.$li.length?this.settings.automate=setTimeout(function(){this.hide(),this.show(),this.startTimer()}.bind(this),this.settings.timer):clearTimeout(this.settings.automate)},end:function(){this.settings.cookieMonster&&t.cookie(this.settings.cookieName,"ridden",{expires:this.settings.cookieExpires,domain:this.settings.cookieDomain}),this.settings.timer>0&&clearTimeout(this.settings.automate),this.settings.modal&&this.settings.expose&&this.un_expose(),this.settings.$next_tip.data("closed",!0),t(".joyride-modal-bg").hide(),this.settings.$current_tip.hide(),this.settings.postStepCallback(this.settings.$li.index(),this.settings.$current_tip),this.settings.postRideCallback(this.settings.$li.index(),this.settings.$current_tip),t(".joyride-tip-guide").remove()},outerHTML:function(t){return t.outerHTML||(new XMLSerializer).serializeToString(t)},off:function(){t(this.scope).off(".joyride"),t(e).off(".joyride"),t(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride"),t(".joyride-tip-guide, .joyride-modal-bg").remove(),clearTimeout(this.settings.automate),this.settings={}},reflow:function(){}}}(Foundation.zj,this,this.document);