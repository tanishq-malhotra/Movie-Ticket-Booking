var machine = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
function sign_up()
{
    var name = document.getElementsByClassName("form-control")[0].value;
    var id = document.getElementsByClassName("form-control")[1].value;
    var pass = document.getElementsByClassName("form-control")[2].value;
    var email = document.getElementsByClassName("form-control")[3].value;
    var form = {"username":name,"email":email,"password":pass,"user_id":id};
    $.ajax({
        type:"POST",
        async:true,
        data: form,
        url: machine + "/signup",
        dataType:"text",
        success: function(data){
            if(data == "submitted")
            alert("Submitted");
        document.getElementsByClassName("form-control")[0].value = '';
        document.getElementsByClassName("form-control")[1].value = '';
        document.getElementsByClassName("form-control")[2].value = '';
        document.getElementsByClassName("form-control")[3].value = '';
        }
    });
}