var machine = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;

function sign_up()
{
    var name = document.getElementsByClassName("form-control")[0].value;
    var id = document.getElementsByClassName("form-control")[1].value;
    var pass = document.getElementsByClassName("form-control")[2].value;
    var email = document.getElementsByClassName("form-control")[3].value;
    var form = {"username":name,"email":email,"password":pass,"user_id":id};

    if(validateName(name) == true && validatePass(pass) == true && validateEmail(email) == true)
    {
        $.ajax({
            type:"POST",
            async:true,
            data: form,
            url: machine + "/signup",
            dataType:"text",
            success: function(data){
            }
        }); 

        alert("User is Registered");
    }

}

function validateName(name)
{
    if(name.length < 1) 
    {
        alert("Enter name");
        return false;
    }
    else return true;
}

function validatePass(pass)
{
    if(pass.length < 7) 
    {
        alert("Password too short");
        return false;
    }
    else return true;
}

function validateEmail(email)
{
    var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(email=="" || pattern.test(email)==false){
        alert("False");
        return false;
    }
    else{
        return true;
    }
}