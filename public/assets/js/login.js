var machine = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
function login()
{
    var e = document.getElementById("e").value;
    var pass = document.getElementById("p").value;
   var form = {"email":e,"password":pass};
    
   $.ajax({
        type:"POST",
        async:true,
        data: form,
        url: machine + '/login',
        dataType:"text",
        success: function(data){
       if(data=="error")
       {
           alert("Wrong Email or Password");
       }
       else
       {
        sessionStorage.setItem("id",data);
        sessionStorage.setItem("email",e);
        window.location.href = machine + "/index.html";
       }
    }
    });
}