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












function book()
{
    var u_id = sessionStorage.getItem('id');
    var e = document.getElementById("select");
    var dropdown_option = e.options[e.selectedIndex].value;
    var d = {"tname":dropdown_option};
    if(u_id)
    {
        $.ajax({
            type:"GET",
            async:true,
            data: d,
            url: machine + '/get-th-id',
            dataType: "json",
            success: function(data){
             pre_book(data[0].tid,dropdown_option); 
            }
        });
    }
    else alert("User is not logged on");
}

function pre_book(tid,tname)
{
    var seat_no = document.getElementById('seat').value;
    var d = {'tid':tid};
    $.ajax({
        type:"GET",
        async:true,
        data: d,
        url: machine + '/get-seat',
        dataType:"json",
        success:function(data){
            var seats = data[0].seats;
            if(seats[seat_no-1]!=1)
            {
                if(seat_no>1)
                {
                var s = seats[0];
                for(var i = 1; i < seat_no - 1; i++) s += seats[i];
                s += '1';
                for(var i = seat_no; i < 100; i++) s+=seats[i];
                }
                else 
                {
                    var s = '1';
                    for(var i = seat_no; i < 100; i++) s+=seats[i];
                }
                final_book(s,tid,seat_no,tname);
            }
            else alert("Seat is Booked by another user");   
        }
    });
}

function final_book(s,tid,seat_no,tname)
{
    var d = {'seats':s,'tid':tid};
    $.ajax({
        type:"POST",
        async:true,
        data: d,
        url: machine + '/book-seat',
        dataType:"text",
        success:function(data){
            after_book(tid,seat_no,tname);
        }
    });
}

function after_book(tid,seat_no,tname)
{
    mid = sessionStorage.getItem('mid');
    uid = sessionStorage.getItem('id');
    var d = {'tid':tid,'sid':seat_no,'uid':uid,'mid':mid};

    $.ajax({
        type:"POST",
        async:true,
        data:d,
        url: machine + '/commit-book',
        dataType:"text",
        success: function(data){
            sendEmail(tid,tname,mid,seat_no);
        }
    });
}

function sendEmail(tid,tname,mid,seat_no)
{
var m = {"mid":mid};
$.ajax({
    type:"POST",
    async:true,
    data:m,
    url: machine + '/get-mname',
    dataType:"json",
    success: function(data){
        
        getEmail(data[0].mname,tid,tname,seat_no);
    }
});
}

function getEmail(mname,tid,tname,seat_no)
{
    var uid = sessionStorage.getItem('id');
    var d = {'user_id':uid};
    $.ajax({
        type:"POST",
        async:true,
        data:d,
        url: machine + '/get-umail',
        dataType:"json",
        success: function(data){
            
            send(data[0].email,tname,mname,seat_no);
        }
    });
}

function send(email,tname,mname,seat_no)
{
    var d = {'email':email,'tname':tname,'mname':mname,'sid':seat_no};
    $.ajax({
        type:"POST",
        async:true,
        data:d,
        url: machine + '/book-mail',
        dataType:"text",
        success: function(data){
            alert(data);
        }
    });
}