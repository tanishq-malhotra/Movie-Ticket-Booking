var machine = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
function remove_tag()
{
    var a = sessionStorage.getItem("id");
    if(a)
    {
        $("#l").remove();
        $("#s").remove();
        var app = '<span class="navbar-text actions" id="remove">'+
        '<a class="btn btn-light action-button" role="button" href="index.html" onclick="check_user()">Logout</a>'+
        '</span>';
        $("#remove").append(app);
    }
}

function check_user()
{
    sessionStorage.removeItem("id");
    remove_tag();
}


function load_data()
{
    remove_tag();
    var a = sessionStorage.getItem("mid");
    var form = {"mid":a};
    $.ajax({
   type:"POST",
    async:true,
     data: form,
     url: machine + '/book-data',
    dataType:"json",
    success: function(data){
        var ap = '<div class="col-md-4" style="margin-left:16px;">'+
        '<img src='+data[0].mcover+ ' data-bs-hover-animate="pulse" style="width:296px;height:359px;margin-left:-11px;">'+
        '<div class="dropdown" style="margin-top:-1px;">'+
        '<select class="form-control" style="margin-left:2px;width:150px;margin-top:13px; background-color:rgb(0,123,255); color:white;">'+
                '<option value="th1">First Item</option>'+
                '<option value="th1">Second Item</option>'+
                '<option value="th1">Second Item</option>'+ 
            '</select>'+
	'</div>'+
        '<button class="btn btn-primary btn-block" style="background-color:rgb(0,123,255);width:95px;margin-top:-40px;margin-left:178px;padding:6px;">Seat Map</button>'+
        '<input placeholder="Enter Seat Number" style="font-size:18px;margin:2px;margin-bottom:0px;margin-top:42px;">'+
       ' <button class="btn btn-primary" style="width:114px;height:33px;margin:3px;padding:2px;font-size:22px;margin-left:244px;margin-top:-55px;background-color:rgb(0,123,255);">Book</button>'+
    '</div>'+
    '<div class="col-md-4" style="margin-left:190px;">'+
        '<h4>Description</h4>'+
        '<p style="margin-top:50px;">'+data[0].des+'</p>'+
    '</div>';

    $("#app").append(ap);
    }
    });
}