//var SITE = '../engine/Zhuyinwen';
//var SITE = 'http://ntuaha.0fees.net/Zhuyinwen/api/query.php';
var SITE = 'https://funny.aha.taipei/zhuyinwen/api/';

$(function(){
/*
 $("#submitButton").click(function(){
    query();
});
*/
$("#zhuyinwen-query").focus();

 $("#zhuyinwen-query").keypress(function(event){
    var btn = $(".btn-success");
    btn.button('reset');
    if(event.which==13){

        if($("#zhuyinwen-query").val()!=""){
            btn.button('loading');
            query(btn);
        }
    }
});

 $(".btn-success").click(function(event){
     var btn = $(this);
     btn.button('reset');
     if( $("#zhuyinwen-query").val()!=""){
        btn.button('loading');
        query(btn);
    }

});
 $('#zhuyinwen_query').submit(function() {
  return false;
});
});

function query(obj){
    $.ajax({
        url:SITE+$("#zhuyinwen-query").val(),
        dataType:"json",
        method:"get",
//        data:{'zq':$("#zhuyinwen-query").val()},
        /*智障至極的錯誤*/
        //data:{'q':$("#zhuyinwen-query").val()},
        success:function(r){
            if(r.length==0){
                $("<div>No search result</div>").appendTo("#zhuyinwen-query-result");
            }else{

                $("#zhuyinwen-query-result").html("");
                var html = "<div class=\"table-responsive\"><table class=\"table\">";
                var column = 4;
                var i =0;
                var rows = 0;
                for (; i <r.length; i++) {
                    if(i%column ==0){
                        if (rows%2 == 0)
                            html = html+"<tr>";
                        else
                            html = html+"<tr class=\"active\">";
                    }

                    //data = r[i][0];
                    data = r[i]['cq'];
                    //type = r[i][0];
                    html = html+"<td>"+data+"</td>";
                    //$("<div>"+data+"</div>").appendTo("#zhuyinwen-query-result");
                    if(i%column ==(column-1)){
                        html = html+"</tr>";
                        rows ++;
                    }
                }
                //最後一點點列的空缺補完
                for (; i %column != (column-1); i++) {                     
                    html = html+"<td></td>";
                    if(i%column ==(column-1))
                        html = html+"</tr>";
                }
                

                html = html + "</table></div>";
                $("#zhuyinwen-query-result").html(html);

                $(".panel-heading").html("<span style=\"color:#d9534f\">"+$("#zhuyinwen-query").val()+"</span> 的查詢結果: 共 <span style=\"color:#d9534f\">"+r.length+"</span>  筆");


            }
            obj.button('reset');
        }
    });

}
