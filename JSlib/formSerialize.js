//用于表格序列化的代码
//创建于2017.04.08
    
    function serialize(form){
        var parts = [],     // 保存表单报文的一串字符串数组；
            field = null,   // 单个字段，也是该函数的工作单元；
            i,
            len,
            j,
            option,
            optLen,
            optValue;
        
        for(i=0, len=form.elements.length; i<len; i++){
            field = form.elements[i];
            switch(field.type){
                case "select-one":
                case "select-multiple":
                    if(field.name.length){
                        for(j=0, optLen=field.options.length; j<optLen; j++){
                            option = field.options[j];
                            if(option.selected){
                                optValue = "";
                                if(option.hasAttribute){                        // DOM
                                    optValue = (option.hasAttribute("value") ? 
                                                option.value : option.text);
                                }else{                                          // 兼容IE
                                    optValue = (option.attributes["value"].specified ? 
                                                option.value : option.text);
                                }
                                parts.push(encodeURIComponent(field.name) + "=" + 
                                            encodeURIComponent(optValue));   
                            }
                        }
                    }
                    break;
                
                case undefined: //fieldset元素的type是undefined；
                case "file":
                case "submit":
                case "reset":
                case "button":
                    break;

                case "radio":
                case "checkbox":
                    if(!field.checked){
                        break;
                    }
                    /* 执行默认操作 */
                
                default:
                    //不包含没有名字的表单字段；
                    if(field.name.length){
                        parts.push(encodeURIComponent(field.name) + "=" + 
                                    encodeURIComponent(field.value));
                    }
            }
        }
        return parts.join("&");
    }