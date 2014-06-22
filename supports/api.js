//var SITE = '../engine/Zhuyinwen';
var SITE = 'http://ntuaha.0fees.net/Zhuyinwen/api/query.php';

$(function(){
 $("#submitButton").click(function(){
    query();
});
 $("#zhuyinwen-query").keypress(function(event){
    if(event.which==13){
        $("#zhuyinwen-query").val()!="";
        query();
    }
});
 $('#zhuyinwen_query').submit(function() {
  return false;
});
});

function query(){
    $.ajax({
        url:SITE,
        dataType:"json",
        method:"get",
        //data:{'zq':$("#zhuyinwen-query").val()},
        data:{'q':$("#zhuyinwen-query").val()},
        success:function(r){
            $("#zhuyinwen-query-result").html("");
            for (var i = 0; i <r.length; i++) {
                data = r[i][0];
                //type = r[i][0];
                
                $("<div>"+data+"</div>").appendTo("#zhuyinwen-query-result");
            }
            if(r.length==0){
                $("<div>No search result</div>").appendTo("#zhuyinwen-query-result");
            }
            
        }
    });

}
