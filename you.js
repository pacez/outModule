var youCore={
	hasJquery: ('jQuery' in window),
	domain: 'http://you.jd.com',
	isIE: !(!window.VBArray),
	isIE5678: (!+[1,]),
	paths: {
		topicCss: 'style.css',
		jqueryScript: '/misc/dist/script/lib/jquery.js'
	},
	log: function(str){
		if(console && console.log){
			console.log(str);
		}
	},
	createScript: function(path,callback,relative){
		  var that=this,
		  		scriptTag=document.createElement('script');  

	    scriptTag.type='text/javascript';  
	    scriptTag.src=(relative ? '' : that.domain)+path;  
	    document.getElementsByTagName("head")[0].appendChild(scriptTag); 

	    if(that.isIE5678){
		    scriptTag.onreadystatechange=function(){  
			   	if((!this.readyState && this.readyState!='loading') ||this.readyState=='loaded'||this.readyState=='complete'){  
			   		callback();
				 	}
				}  
	    }else {
		    scriptTag.onload=function(){  
			   	if((!this.readyState && this.readyState!='loading') ||this.readyState=='loaded'||this.readyState=='complete'){  
			   		callback();
				 	}
				}  
	    }
			return;
	},
	createCss: function(path,relative){
		  var that=this,
		  		cssTag=document.createElement('link');

	    cssTag.rel='stylesheet';  
	    cssTag.href=(relative ? '' : that.domain)+path;  
	    document.getElementsByTagName("head")[0].appendChild(cssTag); 
	   	return;
	},
	loadJquery: function(callback,relative){
	  this.createScript(this.paths.jqueryScript,callback,relative);
	}
};

var youComponents={
	topicList: {
		init: function(options){
			var that=this,
					defaultOptions={
						id:"youTopicList",
						target: '_blank',
						loadText: 'Loading...',
						style: {
							containerBg: 'transparent', 
							titleBarBg: '#FCFCFC',
							titleColor: 'gray',
							itemBg: '#FFF',
							itemColor: 'gray',
							numColor: '#999',
							numBorderColor: '#BABABA',
							numBgColor: '#FFF'
						}
					};

			//加载状态提示
			that.showLoadText(options,defaultOptions);
			//组件依赖资源加载
			that.ready(function(){
				options = $.extend(true,defaultOptions,options);

				options._dataurl='demo.html';

				//构建组件
				that.build(options);
			});
		},
		ready: function(callback){
			var that=this;

			youCore.createCss(youCore.paths.topicCss,true); //加载话题列表样式

			if(youCore.hasJquery){
				callback();
				return;
			}
			youCore.loadJquery(callback); //加载jquery

			return;
		},
		build: function(options){
			var that=this;
			//获取数据
			that.getData(options._dataurl,function(data){
				//创建视图
				that.createView(data,options);
			});
		},
		getData: function(url,callBack){
			var that=this;

			//自定义数据
			var topicList=[];

			for(var i=1; i<11; i++){
				topicList.push({
					title: '这个话题很cool—pace_zhong-'+i, 
					id: i,
					href: youCore.domain+'/topic/'+i+'.html'
				});
			}

			var data={
				title:'热门话题',
				topicList:topicList
			}

			callBack(data);
		},
		createView: function(data,options){
			var html='',
					topicList=data.topicList,
					style=options.style,
					target=options.target,
					$container=$('#'+options.id);

					html+='<div id="youTopicList" style="background-color: '+style.containerBg+'" class="you-topic-module">';
						html+='<div class="you-topic-titlebar" style="background-color: '+style.titleBarBg+'; color: '+style.titleColor+'; ">'+data.title+'</div>';
						html+='<ul class="you-topic-list">';
						for(var i=0; i<topicList.length; i++){
							var topic=topicList[i],
									topicTitle=topic.title,
									topicId=topic.id,
									topicHref=topic.href;

							html+='<li  class="you-topic-item" style="background-color: '+style.itemBg+'">';
								html+='<span class="you-topic-item-num" style="color: '+style.numColor+'; background-color: '+style.numBgColor+'; border-color: '+style.numBorderColor+'">'+(i+1)+'</span>';
								html+='<a target="'+target+'" style="color: '+style.itemColor+'" href="'+topicHref+'">'+topicTitle+'</a>';
							html+='</li>';
						}
						html+='</ul>';
					html+='</div>';

			$container.html(html);
		},
		showLoadText: function(options,defaultOptions){
			var container=document.getElementById((options.id ? options.id : defaultOptions.id));
			container.innerHTML='<span class="you-topic-loading">'+(options.loadText ? options.loadText : defaultOptions.loadText)+'</span>';
		}
	}
};
