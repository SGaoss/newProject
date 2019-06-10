var utils = {
  convertToObj:function(str){
    var arr = str.split('&')

    var obj = {}
    arr.forEach(function(item,index){
      var temp = item.split('=')
      console.log(temp);
      obj[temp[0]] = temp[1]
      
    })
    return obj;
  }
}