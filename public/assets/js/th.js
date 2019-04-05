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

function load_m()
{
    remove_tag();

    /*#.ajax({
        type:"GET";
        url: machine + "/get-images",
        async:true,
        dataType:"json",
        success: function(data){
        for(var i = 0; i < data.length; i++)
        {
        var app = '<div class="col-sm-6 col-lg-4 item">'+
            '<img class="img-fluid" src='+data[i].mcover+ '>'
            '<h3 class="name">'+ {Theater1} + '</h3>'
            <p class="description">{DES1}</p>
            </div>
        }
    }
    });*/
}

function check_user()
{
    sessionStorage.removeItem("id");
    remove_tag();
}