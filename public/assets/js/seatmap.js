var machine = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;

var t = sessionStorage.getItem('th');
var da = {'tname':t};
$.ajax({
    type:"GET",
    async:true,
    data: da,
    url: machine + '/get-th-id',
    dataType: "json",
    success: function(data){
    sessionStorage.setItem('tid',data[0].tid);
    }
});

var unbooked = [];
var booked = [];

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

function load_map()
{
    remove_tag();
    var tname = sessionStorage.getItem('th');
    var tid = sessionStorage.getItem('tid');
    var d = {'tid':tid};
    $.ajax({
        type: "GET",
        async: true,
        data: d,
        url: machine + '/get-seat',
        dataType: "json",
        success: function(data){
            var a = data[0].seats;
            var c = 0;
            for(var i = 0; i < 10; i++)
            {
                $("#tapp").append('<tr>');
                for(var j = 0; j < 10; j++)
                {   
                    if(a[c] == '0')
                    var tag = '<td><center><img onclick="update_arr('+c+')"'+'style="height: 50px; width: 50px;" src="assets/img/unbooked.png" id="'+c+'"></center></td>';
                    else
                    {
                    var tag = '<td><center><img onclick="update_arr('+c+')"'+'style="height: 50px; width: 50px;" src="assets/img/booked.png" id="'+c+'"></center></td>';
                    booked.push(c.toString());
                    }
                    c += 1;
                    $("#tapp").append(tag);
                }
                 $("#tapp").append('</tr>');
            }
        }
    });   
}

function check_user()
{
    sessionStorage.removeItem("id");
    remove_tag();
}

function update_arr(n)
{
    n = n.toString();
    
    if(unbooked.indexOf(n) == -1 && booked.indexOf(n) == -1)
    {
    $("#"+n).attr("src","assets/img/booked.png");
    unbooked.push(n);
    }
    else
    {
        if(booked.indexOf(n) == -1)
        {
        unbooked.splice(unbooked.indexOf(n),1);
        $("#"+n).attr("src","assets/img/unbooked.png");
        }
        else alert("Seat already booked. Please Choose Another Seat");
    }
}

