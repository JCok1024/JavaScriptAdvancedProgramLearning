//以下是用于浏览器用户代理检测的代码
//更新时间2017.03.22


//检测技术T1
    //T11识别呈现引擎  引擎确定后大多数问题都有解决的方向
    var client=function(){
        var engine={//初始化各种引擎
            ie:0,
            gecko:0,
            webkit:0,
            khtml:0,
            opera:0,
            ver:null
        };//T11

        //T12识别浏览器  即使同一呈现引擎，JavaScript引擎也许不同
        var browser={
            ie:0,
            firefox:0,
            safari:0,
            konq:0,
            opera:0,
            chrome:0,
            ver:null
        };//T12

        //T13识别平台
        var system={
            win:false,
            mac:false,
            x11:false,

            //T15移动设备
            iphone:false,
            ipod:false,
            ipad:false,
            ios:false,
            android:false,
            nokiaN:false,
            winMobile:false,

            //T16游戏设备
            wii:false,
            ps:false,
            xbox:false
        };

        /*此段
        为检测引擎、平台、设备的代码
         */
        var ua=navigator.userAgent;
        //首先检测opera，因为opera会伪装
        if(window.opera){
            engine.ver=browser.ver=window.opera.version();//直接连等检测浏览器
            engine.opera=browser.opera=parseFloat(engine.ver);
        //检测Webkit引擎，利用正则表达式检测含AppleWebKit的字符串
        }else if(/AppleWebKit\/(\S+)/.test(ua)){
            engine.ver=RegExp["$1"];
            engine.webkit=parseFloat(engine.ver);
            //Webkit引擎的两种浏览器Chrome和Safari
            if(/Chrome\/(\S+)/.test(ua)){
                browser.ver=RegExp["$1"];
                browser.chrome=parseFloat(browser.ver);
            }else if(/Version\/(\S+)/.test(ua)){
                browser.ver=RegExp["$1"];
                browser.safari=parseFloat(browser.ver);
            }else{//否则用近似方法取得Safari版本号
                var safariVersion=1;
                if(engine.webkit<100){
                    safariVersion=1;
                }else if(engine.webkit<312){
                    safariVersion=1.2;
                }else if(engine.webkit<412){
                    safariVersion=1.3;
                }else{
                    safariVersion=2;
                }
                browser.safari=browser.ver=safariVersion;
            }
        //检测KHTML引擎，最早版本中只有Konqueror版本号，因为要同时检测Konqueror
        }else if(/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;])+/.test(ua)){
            engine.ver=browser.ver=RegExp["$1"];//直接连等检测浏览器
            engine.khtml=browser.khtml=parseFloat(engine.ver);
        //检测Gecko，正则表达式更复杂 “rv:” ( [除)外均检测] 此处不为空 ) “)”右括号也为检测内容“Gecko/”跟上一个8位的数字
        }else if(/rv:([^\)]+)\)Gecko\/\d{8}/.test(ua)){//检测到的内容为 rv:0除)外的内容0)Gecko/00000000
            engine.ver=RegExp["$1"];
            engine.gecko=parseFloat(engine.ver);
            //检测Firefox浏览器
            if(/Firefox\/(\S+)/.test(ua)){
                browser.ver=RegExp["$1"];
                browser.firefox=parseFloat(browser.ver);
            }
        //最后检测IE
        }else if(/MSIE ([^;])+/.test(ua)){
            engine.ver=browser.ver=RegExp["$1"];//直接连等检测浏览器
            engine.ie=browser.ie=parseFloat(engine.ver);
        }

        //T13识别平台
        var p=navigator.platform;
        system.win= p.indexOf("Win")==0;
        system.mac= p.indexOf("Mac")==0;
        system.x11= p.indexOf("X11")==0 || (p.indexOf("Linux")==0);

        //T14识别windows操作系统
        if(system.win){
            if(/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
                if(RegExp["$1"]=="NT"){
                    switch (RegExp["$2"]){
                        case "5.0":
                            system.win="2000";
                            break;
                        case "5.1":
                            system.win="XP";
                            break;
                        case "6.0":
                            system.win="Vista";
                            break;
                        case "6.1":
                            system.win="7";
                            break;
                        default :
                            system.win="NT";
                            break;
                    }
                }else if(RegExp["$1"]=="9x"){
                    system.win="ME";
                }else{
                    system.win=RegExp["$1"];//$1=="NT"
                }
            }
        }

        //T15识别移动设备
        system.iphone=ua.indexOf("iPhone")>-1;
        system.ipod=ua.indexOf("ipod")>-1;
        system.ipad=ua.indexOf("ipad")>-1;

        //T151获取ios版本号
        if(system.mac && ua.indexOf("Mobile")>-1){
            if(/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)){
                system.ios=parseFloat(RegExp.$1.replace("_","."));//将版本号n_m替换成n.m浮点数
            }else{
                system.ios=2;//无法检测出的情况下只能猜测
            }
        }
        //T152获取Android版本号
        if(/Android (\d+.\d+)/.test(ua)){
            system.android=parseFloat(RegExp.$1);
        }
        //T153获取WindowsMobile版本号
        if(system.win=="CE"){
            system.winMobile=system.win;
        }else if(system.win=="Ph"){
            if(/Windows Phone OS (\d+.\d+)/.test(ua)){
                system.win="Phone";
                system.winMobile=parseFloat(RegExp["$1"]);
            }
        }

        //T16识别游戏设备
        system.wii=ua.indexOf("Wii")>-1;
        system.ps=/playstation/i.test(ua);
        /*此段
         为检测引擎、平台、设备的代码
         */
        return{
            engine:engine,//T11
            browser:browser,//T12
            system:system//T13
        };
    }();

    //有了上面的检测代码，我们就可以根据浏览器来做出不同的适配方法
    if(client.engine.webkit){
        if(client.browser.chrome){
            //执行代码
        }else if(client.browser.safari){
            //执行代码
        }
    }else if(client.browser.gecko){
        if(client.browser.firefox){
            //执行代码
        }else{
            //执行代码
        }
    }