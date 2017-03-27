//以下是为事件处理而创建的相关函数库,TnB~TnF为一个函数段； 
//更新时间2017.03.26；


    //T1B 事件处理函数 全浏览器兼容
    var eventUtil={
        addHandler:function(element,type,handler){              //添加事件监听器
            if(element.addEventListener){
                element.addEventListener(type,handler,false);
            }else if(element.attachEvent){
                element.attachEvent("on"+type,handler);
            }else{
                element["on"+type]=handler;
            }
        },
        removeHandler:function(element,type,handler){           //移出事件监听器
            if(element.removeEventListener){
                element.removeEventListener(type,handler,false);
            }else if(element.detachEvent){
                element.detachEvent("on"+type,handler)
            }else{
                element["on"+type]=null;
            }
        },

        getEvent:function(event){                               //获取事件对象
            return event ? event : window.event;
        },
        getTarget:function(event){                              //获取事件的target
            return event.target || event.srcElement;
        },
        preventDefault:function(event){                         //停止事件返回值
            return event.preventDefault ? event.preventDefault() : event.returnValue=false;
        },
        stopPropagation:function(event){                        //停止事件流
            return event.stopPropagation ? event.stopPropagation() : event.cancelBubble=true;
        },

        getRelatedTarget:function(event){                       //获取相关元素
            if(event.relatedTarget){
                return event.relatedTarget;
            }else if(event.toELement){
                return event.toElement;
            }else if(event.fromElement){
                return event.fromElement;
            }else{
                return null;
            }
        },
        getButton:function(event){                              //获取鼠标按键
            if(document.implementation.hasFeature("MouseEvents", "2.0")){
                return event.button;
            }else{
                switch(event.button){
                    case 0:
                    case 1:
                    case 3:
                    case 5:
                    case 7:
                        return 0;                               //含有左键的信息
                    case 2:
                    case 6:
                        return 2;                               //含有右键的信息
                    case 4:
                        return 1;                               //含有中键的信息
                }
            }
        },
        getWheelDelta:function(event){                          //全浏览器兼容的滚轮事件属性
            if(event.wheelDelta){
                return (client.engine.opera && client.engine.opera < 9.5 ?
                        -event.wheelDelta : event.wheelDelta);
            }else{
                return -event.wheelDelta*40;                    //均输出up/down : +120*n/-120*n
            }
        },
        getCharCode:function(event){
            if(typeof event.charCode == "number"){
                return event.charCode;
            }else{
                return event.keyCode;
            }
        },

        selectText:function(textBox, startIndex, endIndex){              //选取部分文本
            if(textBox.setSelectionRange){                      //大部分浏览器支持
                textBox.setSelectionRange(startIndex, endIndex);
            }else if(textBox.createTextRange){                  //IE8-支持
                var range = textBox.createTextRange();
                range.collapse(true);                           //范围属性初始化（折叠）；

                range.moveStart("character", startIndex);
                range.moveEnd("character",endIndex);
                range.select();                                 //设定好范围的起始和终止点后全选范围；
            }
        },
        getClipboardText:function(event){                       //获取剪贴板文本
            var clipboardData = (event.clipboardData || window.clipboardData);
            return clipboardData.getData("text");
        },
        setClipboardText:function(event){                       //设置剪贴板文本
            if(event.clipboardData){
                return event.clipboardData.setData("text/plain", value);
            }else if(window.clipboardData){
                return window.clipboardData.setData("text", value);//IE与其他浏览器的text类型不同
            }
        },
    };
    //T1F 事件处理函数 全浏览器兼容


    //T2B throttle节流 简单封装
    var throttle = function(func, delay, debounce){
        var lastExec = null,
            timer = null,
            context,
            args;
        return function(){
            var curr = +new Date();                 //初始化变量
            args = arguments;
            context = this;
            clearTimeout(timer);

            if(debounce){                           //debounce部分
                timer = setTimeout(function(){
                    func.apply(context, args);
                }, delay || 100);
            }else{                                  //throttle部分
                if(!lastExec){
                    lastExec = curr;
                }
                if(curr - lastExec >= dalay){
                    func.apply(context, args);
                }
            }

        }
    };
    var debounce = function(func, delay){           //调用throttle中的debounce部分
        return throttle(func, delay, true);
    };
    /*已嵌入到throttle()中
    //debounce去抖
    var debounce = function(func, threshold, execAsap) {
        var timeout
        return function debounced () {
            var obj = this, 
                args = arguments;
            function delayed () {
                if (!execAsap){
                    func.apply(obj, args);}
                timeout = null; 
            };
            if (timeout){
                clearTimeout(timeout);}
            else if (execAsap){
                func.apply(obj, args);}
            timeout = setTimeout(delayed, threshold || 100); 
        };
    };
    */
    //T2F throttle节流 简单封装