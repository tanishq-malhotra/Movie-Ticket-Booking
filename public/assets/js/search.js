var machine = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
function remove_tag()
{
    var a = sessionStorage.getItem("id");
    if(a)
    {
        $("#l").remove();
        $("#s").remove();
        var app = '<span class="navbar-text actions" id="remove">'+
        '<a class="btn btn-light button" role="button" href="index.html" onclick="check_user()">Logout</a>'+
        '</span>';
        $("#remove").append(app);
    }
}

function search()
{
    var s = document.getElementById("ss").value;
    var form = {"mname":s};
    $.ajax({
        type:"POST",
        data:form,
        url: machine + "/search-movie",
        async:true,
        dataType:"json",
        success: function(data){
                var ap = '<div class="col-sm-6 item" id="bb">'+
                        '<div class="row">'+
                    '<div class="col-md-12 col-lg-5"><a href=booking.html onclick="setMovie('+data[0].mid+')"><img class="img-fluid" src='+ '"'+data[0].mcover+'"'+'></a></div>'+
                    '<div class="col">'+
                        '<h3 class="name">'+data[0].mname+'</h3>'+
                        '<p class="description">'+ data[0].des + '</p>'+
                   ' </div>'+'</div>'+'</div>';
            $("#bb").remove();
           $("#pp").append(ap);
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