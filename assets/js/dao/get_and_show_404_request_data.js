//var serverUrl = "controllers/important_file_access_data.jag";


function show404reqestData(){

console.log(" what the fuck");
    $.getJSON("controllers/404request_data.jag" , function (response){
        console.log(" get more date aaa working");

var info="";
        $.each(response, function (key, val) {
    
        console.log(" get more date aaa working");
            info += val.clientIpAddress+" "+ val.date_time +" "+ val.requestedFile + " "+ val.resultCode +" "+ val.size +" "+ val.url +" "+ val.browserInfo;
            info+="<br>";
            info+="<br>";

        });

        bootbox.dialog({
            message: info,
            title: "Access Log full info within last hour",
            buttons: {
                close: {
                    label: "Close",
                    className: "btn-primary",
                    callback: function() {
                       
                    }
                }
            }
        });
    });

}

