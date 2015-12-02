var c ={ 
  widget_name: {
    access_data404_group_by_ip: "lib/components/attack_404/controllers/access_data_404_group_by_ip.jag",
    access_data404: "lib/components/attack_404/controllers/access_data_404.jag",
    access_data404_group_by_request: "lib/components/attack_404/controllers/access_data_404_group_by_request.jag", 
}
  

}

function get_404_request_data_group_by_ip(chart){

console.log("404_accessed_data_grp_by_ip");

    $.getJSON(c.widget_name.access_data404_group_by_ip , function (response){
        console.log(" 404 file grup by ip  working");

        var dataset = [];

        $.each(response, function (key, val) {

            //console.log(key + ':' + val.clientIpAddress+ ':' + val.totalcount+ ':' + val.request_size);

            dataset.push({name : val.clientIpAddress,value : val.totalcount, req_size : val.request_size, req_type : val.requestedFile});
                 
    
        });

            if(chart==1){
                draw404RequestIpBasedBarChart(dataset);
            }
            else if (chart==2){
                draw404RequestIpBasedPieChart(dataset);
            }

    });
}


// function get_data_group_by_browser(){

// console.log("inside get_important_file_accessed_data_grp_by_ip");

//     $.getJSON(controllers.important_access_data_group_by_browser , function (response){
//         console.log(" impornt file grup by browser  working");

//         var dataset = [];

//         $.each(response, function (key, val) {

//             //console.log(key + ':' + val.clientIpAddress+ ':' + val.totalcount+ ':' + val.request_size+ ':' + val.browserInfo);

//             dataset.push({name : val.browserinfo,value : val.totalcount, req_size : val.request_size});
                 
    
//         });

           
            
//                 drawImportantFileAccessByBrowserPieChart(dataset);
            

//     });
// }

function get_404_request_data_group_by_request(){

console.log("404_accessed_data_grp_by_request");

    $.getJSON(c.widget_name.access_data404_group_by_request , function (response){
        console.log(" 404 file grup by request  working");

        var dataset = [];

        $.each(response, function (key, val) {

            //console.log(key + ':' + val.clientIpAddress+ ':' + val.totalcount+ ':' + val.request_size);

            dataset.push({name : val.requesttype, value : val.totalcount, req_size : val.request_size});
                 
    
        });

            
                draw404RequestRequestBasedPieChart(dataset);
            
            

    });
}


//var serverUrl = "controllers/important_file_access_data.jag";


function show404reqestData(){

console.log(" inside show404requestData");
    $.getJSON(c.widget_name.access_data404 , function (response){
        console.log(" Data  Recieved");

var info="";
        $.each(response, function (key, val) {
    
        console.log(" get more date aaa working");
            info += val.clientIpAddress+" "+ val.requestedFile + " "+ val.resultCode +" "+ val.size +" "+ val.url +" "+ val.browserInfo;
            info+="<br>";
            info+="<br>";
        });
        $("#access_404_full_log_modal").modal();
        $("#access_404_full_log_modal_content").html("<td><h4><strong></strong></h4></td><td><h4></h4></td><td><h4>"+info+"</h4></td>");
         
       
    });

}

function show404reqestTable(){

     //when new data comes remove existing svg bar chart
    var chart = d3.select("#access_404_chart").remove();

console.log(" inside show404request table");
    $.getJSON(c.widget_name.access_data404 , function (response){
        console.log(" Data  Recieved");

        var passtableheader = '<tr>'+
                                  '<th style="padding-right: 20px;">Client Ip Address</th>'+
                                  '<th style="padding-right: 20px;">Date</th>'+
                                  '<th style="padding-right: 20px;">Time</th>'+
                                  '<th style="padding-right: 20px;">Requested File</th>'+ 
                                  '<th style="padding-right: 20px;">Result Code</th>'+
                                  '<th style="padding-right: 20px;">Size</th>'+
                                  '<th style="padding-right: 20px;">Url</th>'+
                               '</tr>';
                                
                            
                       

        $("#access_404_table_head").html(passtableheader);

var tablebody="";
        $.each(response, function (key, val) {
    
        

            var info1 = val.requestedFile.split('/');//split the string
            var req_type=info1[0];

            var info2 = val.date_time.split(':',1);
            var date = info2[0];
            var time = info2[1];

        tablebody += '<tr>'+
                      '<td class="clientIp">'+val.clientIpAddress+'</td>'+
                      '<td class="date">'+date+'</td>'+
                      '<td class="time">'+time+'</td>'+
                      '<td class="requestFile">'+req_type+'</td>'+ 
                      '<td class="resultCode">'+val.resultCode+'</td>'+
                      '<td class="size">'+val.size+'</td>'+
                      '<td class="url">'+val.url+'</td>'+
                    '</tr>';

       

        });
        
       
         $("#access_404_table_body").html(tablebody);
       
    });

}