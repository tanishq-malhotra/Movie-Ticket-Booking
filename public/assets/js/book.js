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
        '<div class="dropdown" style="">'+
        '<select class="form-control" id="select" style="margin-left:2px;width:150px;margin-top:40px; background-color:rgb(0,123,255); color:white;">'+
        '</select>'+
	'</div>'+
    ' <button class="btn btn-primary" onclick="seatmap()" style="width:95px;height:38px;margin:3px;padding:6px;font-size:18px;margin-left:178px;margin-top:-40px; margin-bottom:10px;background-color:rgb(0,123,255);">Seat Map</button>'+
        
    '</div>'+
    '<div class="col-md-4" style="margin-left:190px;">'+
        '<h4>Description</h4>'+
        '<p style="margin-top:50px;">'+data[0].des+'</p>'+
    '</div>';

    $("#app").append(ap);
    }
    });

    load_theaters();
}

function seatmap()
{
    var e = document.getElementById("select");
    var dropdown_option = e.options[e.selectedIndex].value;
    sessionStorage.setItem('th',dropdown_option);
    window.location.href = machine + '/seatmap.html';
}
function load_theaters()
{
    $.ajax({
        type: "GET",
        async:true,
        url: machine + '/load-th',
        dataType:"json",
        success: function(data){
            for(var i = 0; i < data.length; i++)
            {
                var app = '<option value="'+data[i].tname+'">'+data[i].tname+'</option>'
                $('#select').append(app);
            }
        }
    });
    
}