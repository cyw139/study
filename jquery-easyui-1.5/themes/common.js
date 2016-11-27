(function(w){
  var sam ={};
  sam.show = function(){
    var title = arguments[0] ? arguments[0] : '';
    var msg = arguments[1] ? arguments[1] : '';
    var msg = arguments[1] ? arguments[1] : '';
    $.messager.show({title:title});
  };
  w.sam = sam;
})(window);