var machine = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;

// set tid in session storage
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

// set the mname in session storage
var mi = sessionStorage.getItem('mid')
var m = {"mid":mi};
$.ajax({
    type:"POST",
    async:true,
    data:m,
    url: machine + '/get-mname',
    dataType:"json",
    success: function(data){   
        sessionStorage.setItem('mname',data[0].mname);
    }
});


var unbooked = [];
var booked = [];
var seats = [];

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

function book()
{
    // email, mid, uid, tid, tname(th), mname
    if(sessionStorage.getItem("id"))
    {
        if(unbooked.length)
        {
        var d = {'tid':sessionStorage.getItem('tid')};
        $.ajax({
            type:"GET",
            async:true,
            data: d,
            url: machine + '/get-seat',
            dataType:"json",
            success:function(data){
                var str = data[0].seats;
                for(var i = 0; i < 100; i++)
                    seats.push(str[i]);
                
                for(var i = 0; i < unbooked.length; i++)
                    seats[unbooked[i]] = '1';
                
                partial_commit();
            }
        });
        }
        else alert("You Haven't Selected any Seats");
    }
    else
    {
        alert('user is not logged in');
        window.location.href = machine + '/login.html';
    }
}


function partial_commit()
{
    var seat = seats[0];
    for(var i = 1; i < seats.length; i++)
        seat += seats[i];
    
    var d = {'seats':seat,'tid':sessionStorage.getItem('tid')};
    $.ajax({
        type:"POST",
        async:true,
        data: d,
        url: machine + '/book-seat',
        dataType:"text",
        success:function(data){
           final_commit()
        }
    });

}

function final_commit()
{
    var tid = sessionStorage.getItem('tid');
    var uid = sessionStorage.getItem('id');
    var mid = sessionStorage.getItem('mid');

    for(var i = 0; i < unbooked.length; i++)
    {
        var d = {'tid':tid,'sid':unbooked[i],'uid':uid,'mid':mid};
        $.ajax({
            type:"POST",
            async:true,
            data:d,
            url: machine + '/commit-booking',
            dataType:"text",
            success: function(data){
            }
        });
    }

    sendMail();
}

function sendMail()
{
    var s = unbooked[0];
    s += ','
    for(var i = 1; i < unbooked.length-1; i++)
        s += unbooked[i] + ',';
    
    s += unbooked[unbooked.length-1];

    var email = sessionStorage.getItem('email');
    var tname = sessionStorage.getItem('th');
    var mname = sessionStorage.getItem('mname');

    var d = {'email':email,'tname':tname,'mname':mname,'sid':s};

    $.ajax({
        type:"POST",
        async:true,
        data:d,
        url: machine + '/book-mail',
        dataType:"text",
        success: function(data){
            alert(data);
            window.location.href = machine + '/index.html';
        }
    });
}