var youCore={
	hasJquery: ('jQuery' in window),
	domain: 'http://you.jd.com',
	isIE: (!+[1,]),
	paths: {
		topicCss: 'style.css',
		jqueryScript: '/misc/script/lib/jquery.js'
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
	    if(that.isIE){
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
	},
	loadJquery: function(callback,relative){
	  this.createScript(this.paths.jqueryScript,callback,relative);
	}
};

var youComponents={
	topicList: {
		init: function(options){
			var that=this;

			//组件依赖资源加载
			that.ready(function(){

				options = $.extend(true,{
					id:"youTopicList",
					target: '_blank',
					style: {
						bodyBg: 'transparent',
						titleBarBg: '#FCFCFC',
						titleColor: 'blue',
						itemBg: '#FFF',
						itemColor: 'gray'
					}
				}, options);

				that.build(options);
			});

		},
		ready: function(callback){
			var that=this;

			youCore.createCss(youCore.paths.topicCss,true); //加载话题列表样式

			if(youCore.hasJquery){
				callback();
				return true;
			}
			youCore.loadJquery(callback); //加载jquery

			return;
		},
		build: function(options){
			var that=this;
			that.getData(options);
		},
		getData: function(options){
			var that=this;

			//自定义数据
			var data=[];

			for(var i=0; i<10; i++){
				data.push({
					title: '这个话题很cool—pace_zhong-'+i, 
					id: i,
					href: youCore.domain+'/topic/'+i+'.html'
				});
			}

			that.createView(data,options);
		},
		createView: function(data,options){
			var html='',
					style=options.style,
					target=options.target,
					$container=$('#'+options.id);

					html+='<div id="youTopicList" style="background-color: '+style.bodyBg+'" class="you-topic-module">';
						html+='<div class="you-topic-titlebar" style="background-color: '+style.titleBarBg+'; color: '+style.titleColor+'; ">Topic List</div>';
						html+='<ul class="you-topic-list">';
						for(var i=0; i<data.length; i++){
							var topic=data[i],
									topicTitle=topic.title,
									topicId=topic.id,
									topicHref=topic.href;

							html+='<li style="background-color: '+style.itemBg+'">';
								html+='<a target="'+target+'" style="color: '+style.itemColor+'" href="'+topicHref+'">'+topicTitle+'</a>';
							html+='</li>';
						}
						html+='</ul>';	
					html+='</div>';

			$container.append(html);
		}
	}
};
