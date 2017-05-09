//以下是阿拉伯数字转换成罗马数字的函数
//创建于2017-5-9
/*
function ToRoman(num) {
  var str = num.toString();
  var len = str.length;
  var roman = "";
  
  //i指位数，0为个位，1为十位；
  //index指i位在str中的索引；

  for(var i=0; i<len; i++){
    var index = len-i-1;
    switch(str[index]){
      case "0":
        break;
      case "1":
        if(i === 0){
          roman = "I" + roman;
        }else if(i === 1){
          roman = "X" + roman;
        }else if(i === 2){
          roman = "C" + roman;
        }else if(i === 3){
          roman = "M" + roman;
        }
        break;
      case "2":
        if(i === 0){
          roman = "II" + roman;
        }else if(i === 1){
          roman = "XX" + roman;
        }else if(i === 2){
          roman = "CC" + roman;
        }else if(i === 3){
          roman = "MM" + roman;
        }
        break;
      case "3":
        if(i === 0){
          roman = "III" + roman;
        }else if(i === 1){
          roman = "XXX" + roman;
        }else if(i === 2){
          roman = "CCC" + roman;
        }else if(i === 3){
          roman = "MMM" + roman;
        }
        break;
      case "4":
        if(i === 0){
          roman = "IV" + roman;
        }else if(i === 1){
          roman = "XL" + roman;
        }else if(i === 2){
          roman = "CD" + roman;
        }
        break;
      case "5":
        if(i === 0){
          roman = "V" + roman;
        }else if(i === 1){
          roman = "L" + roman;
        }else if(i === 2){
          roman = "D" + roman;
        }
        break;
      case "6":
        if(i === 0){
          roman = "VI" + roman;
        }else if(i === 1){
          roman = "LX" + roman;
        }else if(i === 2){
          roman = "DC" + roman;
        }
        break;
      case "7":
        if(i === 0){
          roman = "VII" + roman;
        }else if(i === 1){
          roman = "LXX" + roman;
        }else if(i === 2){
          roman = "DCC" + roman;
        }
        break;
      case "8":
        if(i === 0){
          roman = "VIII" + roman;
        }else if(i === 1){
          roman = "LXXX" + roman;
        }else if(i === 2){
          roman = "DCCC" + roman;
        }
        break;
      case "9":
        if(i === 0){
          roman = "IX" + roman;
        }else if(i === 1){
          roman = "XC" + roman;
        }else if(i === 2){
          roman = "CM" + roman;
        }
        break;
    }
  }
  return roman;
}
*/

/*
以上是本人最愚蠢的写法，下面列出参考别人的更优雅的写法：
http://blog.sina.com.cn/s/blog_b2b1463e0102v8xr.html 原地址
*/
/*
function toRoman(num){
    var romanArr = ["I", "V", "X", "L", "C", "D", "M"];
    var roman = "";
    var bit = 0;

    while(num > 0){
        var currBit = num % 10;
        switch(currBit){
            case 3:
                roman = romanArr[bit] + roman;
                currBit--;
            case 2:
                roman = romanArr[bit] + roman;
                currBit--;
            case 1:
                roman = romanArr[bit] + roman;
                break;
            case 4:
                roman = romanArr[bit + 1] + roman;
                roman = romanArr[bit] + roman;
                break;
            case 8:
                roman = romanArr[bit] + roman;
                currBit--;
            case 7:
                roman = romanArr[bit] + roman;
                currBit--;
            case 6:
                roman = romanArr[bit] + roman;
                currBit--;
            case 5:
                roman = romanArr[bit + 1] + roman;
                break;
            case 9:
                roman = romanArr[bit + 2] + roman;
                roman = romanArr[bit] + roman;
                break;
        }
        bit += 2;
        num = Math.floor(num / 10);
    }
    return roman;
}
*/
/*
找到比上面更简洁优雅的写法：
http://lihongyang66.iteye.com/blog/694950 原地址
 */
function toRoman(num){
    var Arr = [
        ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"], 
        ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"], 
        ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"],
        ["", "M", "MM", "MMM"]];
    var roman = "";

    for(var i=0, m=1000; i<4; i++, m/=10){
        var bit = Math.floor(num / m) % 10;
        if(Arr[3-i][bit] !== undefined){
            roman += Arr[3-i][bit];
        }
    }
    return roman;
}
console.log(toRoman(2449));