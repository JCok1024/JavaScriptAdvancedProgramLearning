//保存一些跨浏览器处理方案 格式为TnB~TnF
//创建于2017.04.04
//更新于2017.04.04
/*
目录：
T1B 处理XML：将xml字符串转换为xmlDOM文档 11
T2B 处理XML：将xml文档转换为xml字符串 44
T3B 获取选择的文本 63
T4B 选择部分文本 76
T5B 事件处理程序 94
T6B 遍历用到的contains函数 203
 */


//T1B 处理XML：将xml字符串转换为xmlDOM文档
    function parserXML(xml){
        var xmldom = null;
        if (typeof DOMparser != "undefined"){                                       //一般浏览器的方法DOMParser
            xmldom = (new DOMParser()).parserFromString(xml, "text/xml");
            var errors = xmldom.getElementsByTagName("parsererror");
            if(errors.length > 0){
                throw new Error("XML Parsering error: " + errors[0].textContent);
            }
        } else if (typeof ActiveXObject != "undefined"){                            //IE8-的方法ActiveXObject
            xmldom = createDocument();
            xmldom.loadXML(xml);
            if(xmldom.parseError != 0 ){
                throw new Error("XML Parsering error: " + xmldom.parserError.reason);
            }
        } else {                                                                    //无法解析
            throw new Error("No XML Parser available. ");
        }
        return xmldom;
    }
    /*
    在使用时应将其放在try-catch中：
        var xmldom = null;
        try{
            xmldom = parserXML("<root><child/></root>")
        } catch(ex) {
            console.log(ex.message);
        }
    */
//T1F 处理XML：将xml字符串转换为xmlDOM文档



//T2B 处理XML：将xml文档转换为xml字符串
    function serializeXML(xmldom){
        if (typeof XMLSerializer != "undefined"){                       //一般浏览器的方法XMLSerializer
            return (new XMLSerializer()).serializeToString(xmldom);
        } else if (typeof xmldom.xml != "undefined"){                   //IE8-的方法.xml
            return xmldom.xml;
        } else {                                                        //无法解析
            throw new Error("Could not serialize XML DOM. ");
        }
    }
    /*
    使用方法：
    var xml = serializeXML(xmldom);
     */
//T2F 处理XML：将xml文档转换为xml字符串；



//T3B 获取选择的文本
    function getSelectedText(textBox){
        if(typeof textBox.selectionStart === "number"){  //一般浏览器
            return textBox.value.substring(textBox.selectionStart, textBox.selectionEnd);
        }else if(document.selection){                    //IE8-
            return document.selection.createRange().text;
        }
    }
//T3F 获取选择的文本



//T4B 选择部分文本
    function selectText(textBox, startIndex, endIndex){
        if(textBox.setSelectionRange){                  //大部分浏览器支持
            textBox.setSelectionRange(startIndex, endIndex);
        }else if(textBox.createTextRange){              //IE8-支持
            var range = textBox.createTextRange();
            range.collapse(true);                       //范围属性初始化（折叠）；

            range.moveStart("character", startIndex);
            range.moveEnd("character",endIndex);
            range.select();                             //设定好范围的起始和终止点后全选范围；
        }
    }
//T4F 选择部分文本



//T5B 事件处理程序
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
//T5F 事件处理程序



//T6B 遍历用到的contains函数
    function contains(outNode,inNode){
        if(typeof outNode.contains=="function" &&                       //浏览器为webkit522+或其他浏览器使用contains方法
                (!client.engine.webkit || client.engine.webkit>=522)){
            return outNode.contains(inNode);                          
        }else if(typeof outNode.compareDocumentPosition=="function"){   //IE9+ / Opera9.5+及其他浏览器可用
            return !!(outNode.compareDocumentPosition(inNode) & 16);    //返回掩码的boolean值
        }else{
            var node=inNode.parentNode;     //针对Safari2-的方法  逐步向上级遍历parentNode
            do{
                if(node===outNode){         //在遍历中查找与outNode全等的节点
                    return true;            //若找到返回true结束
                }else{
                    node=node.parentNode;   //若找不到，继续向上遍历
                }
            }while(node!==null);            //直到最顶层node为null
            return false;                   //若最终仍找不到，返回false
        }
    }