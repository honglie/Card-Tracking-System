function press() {

    var staffname = $("#staff").val();
    var hrs=new Date().getHours();
    var mode;
    if(hrs<20){
        mode=$("#iss1").attr("value");
    }else{
        mode=$("#rtn1").attr("value");
    }
    
    var qrcode = $("#result").html();
    var afname = $("#afname").val();
    var request;
    if (staffname != "" && afname != "" && mode != "" && qrcode != "" && qrcode != "scanning.....") {
        //disable button
        $("#submitbtn").attr("disabled", "disabled");
        $("#clearbtn").attr("disabled", "disabled");

        request = $.ajax({
            url: "https://script.google.com/macros/s/AKfycbx--htt3FnPijWucM5l1qkGsOic4k-RDmbNhdO7EVNjVdoxBeKb/exec",
            type: "post",
            data: {
                "Name": staffname,
                "AF": afname,
                "Mode": mode,
                "QR Code": qrcode
            }
        });

        document.getElementById("successbox").style.display = "block";
        document.getElementById("errbox").style.display = "none";
        setTimeout(function () {
            location.reload();
        }, 1000);

    } else {
        document.getElementById("errbox").style.display = "block";
    }
}

function clearField() {
    $("#staff").val("");
    $("#mode").val("");
    $("#result").html("");
	$("#afname").val('').selectpicker('refresh');
    document.getElementById("errbox").style.display = "none";
}

//detect inactivity
var idle = 0;
$(document).ready(function () {
    var idleInterval = setInterval(timeIncrement, 60000);
    $(this).mouseover(function (e) {
        idle = 0;
    });
});

function timeIncrement() {
    idle += 1;
    //if idle for more than 5 minutes, reload browser
    if (idle > 4) {
        window.location.reload();
    }
}

$(document).ready(function () {
    var hr = new Date().getHours();
    if (hr <= 20) {
        // $('input:radio[name=optradio]')[0].checked = true;
        $("#rtn").hide();
		$("#iss1").attr("disabled","disabled")
    } else {
        //$('input:radio[name=optradio]')[1].checked = true;
        $("#iss").hide();
		$("#rtn1").attr("disabled","disabled");
    }

});

