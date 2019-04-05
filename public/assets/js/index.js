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
function load()
{
    remove_tag();
       $.ajax({
            type:"GET",
            url: machine + "/get-images",
            async:true,
            dataType:"json",
            success: function (data){
                for(var i=0;i<data.length;i++)
                {
                    var app = '<div class="col-sm-6 item">'+
                '<div class="row">'+
                    '<div class="col-md-12 col-lg-5"><a href=booking.html onclick="setMovie('+data[i].mid+')"> <img class="img-fluid" src='+ data[i].mcover + '></a></div>'+
                   ' <div class="col">'+
                        '<h3 class="name">'+data[i].mname+'</h3>' +
                        '<p class="description">'+data[i].des+'</p>' +
                    '</div>'+
                    '</div>' +
                '</div>' + '<br>';

                $('#ap').append(app);
                }
                 
            }
        });
}

function check_user()
{
    sessionStorage.removeItem("id");
    remove_tag();
}

function setMovie(id)
{
    sessionStorage.setItem("mid",id);
}