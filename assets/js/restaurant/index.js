$(document).ready(()=>{
    $("#loading").hide();
    if(screen.width<768){
        document.getElementById("left_side_login").style.display = "none";
        $("#right_side_login").removeClass("col-md-6").addClass("col-md-12")
    }else{
        document.getElementById("left_side_login").style.display = "block";
        $("#right_side_login").removeClass("col-md-12").addClass("col-md-6")
    }
    $("#reg_box").hide();
    $("#red_to_reg_box").click(()=>{
        $("#reg_box").show();
        $("#login_box").hide();
    });
    $("#red_to_login_box").click(()=>{
        $("#reg_box").hide();
        $("#login_box").show();
    });
    let elements = document.cookie.split('login_cookies=');
    let cookie_token= elements[1];
    if(cookie_token === undefined || cookie_token === null || cookie_token.length<10){}
    else{window.location.href="restaurant/dashboard.html";}

    //login validation
    $("#login_buttton_style").click(()=>{
        $("#loading").show();
        let email = $("#login_email").val().trim();
        let pass = $("#login_pass").val().trim();
        if(!isEmail(email)){
            $("#loading").hide();
            $("#login_error").html('<span style="color:red">Email or Password not valid<br><br></span>');
            return;
        }
        if(pass.length < 5){
            $("#loading").hide();
            $("#login_error").html('<span style="color:red">Email or Password not valid<br><br></span>');
            return;
        }
        $.ajax({
            url: "http://localhost/foodshala_php/controller/register.php?requesting=4",
            headers: { 'FOODSHALA' : 'null'},
            data: {email:email,password:pass},
            crossDomain: true,
            timeout:30000,
            type: "POST",
            success: function(data)
            {
                $("#loading").hide();
                console.log(data);
                //response handling for login
                if(data['status']==="wmail_fail" || data['status'] === "pass_fail" || data['status']=== "invalid"){
                    $("#login_error").html('<span style="color:red">Email or Password not valid<br><br></span>');
                }else if(data[0].status==="success"){
                    document.cookie = 'login_cookies='+data[0].token;
                    setTimeout(()=>{
                        window.location.href = "restaurant/dashboard.html";
                    },500)
                }else{
                    alert('Unknown error occurred try again later.');
                }
            },
            error:function (){
                $("#loading").hide();
            }
        });
    });

    $("#reg_buttton_style").click(()=>{
        $("#loading").show();
        let email = $("#reg_email").val().trim();
        let pass = $("#reg_pass").val().trim();
        let cpass = $("#reg_cpass").val().trim();
        let res_name = $("#res_name").val().trim();
        let address = $("#reg_address").val().trim();
        let state = $("#state").val().trim();
        let city = $("#city").val().trim();
        if(!isEmail(email)){
            $("#res_reg_error").html('<span style="color:red">Email not valid<br><br></span>');
            $("#loading").hide();
            return;
        }
        if(pass.length < 5 || cpass.length < 5){
            $("#loading").hide();
            $("#res_reg_error").html('<span style="color:red">Password is short<br><br></span>');
            return;
        }
        if(pass!==cpass){
            $("#loading").hide();
            $("#res_reg_error").html('<span style="color:red">Password and confirm password not correct<br><br></span>');
            return;
        }
        if(res_name.length < 5 || address.length < 5 || state.length< 3 || city.length < 3){
            $("#loading").hide();
            $("#res_reg_error").html('<span style="color:red">Please fill all the detauls properly<br><br></span>');
            return;
        }
        let form_data = new FormData($('#res_reg_form')[0]);
        $.ajax({
            url: "http://localhost/foodshala_php/controller/register.php?requesting=2",
            headers: { 'FOODSHALA' : 'null'},
            data: form_data,
            crossDomain: true,
            timeout:30000,
            processData: false,
            contentType: false,
            type: "POST",
            success: function(data)
            {
                $("#loading").hide();
                console.log(data)
                if(data['status'] === "success"){
                    alert('Account Successfully created try login now');
                    $("#red_to_login_box").click();
                }else if(data['status'] === "email_fail"){
                    $("#res_reg_error").html('<span style="color:red">Email not valid<br><br></span>');
                }else if(data['status'] === "pass_weak"){
                    $("#res_reg_error").html('<span style="color:red">Password is weak<br><br></span>');
                }else if(data['status'] === "cpass_not_match"){
                    $("#res_reg_error").html('<span style="color:red">Password and confirm password not correct<br><br></span>');
                }else if(data['status'] === "already"){
                    $("#res_reg_error").html('<span style="color:red">You have already created account with this email, Try login<br><br></span>');
                }else{
                    alert('Unknown error occurred try again later.');
                }
            },
            error:function (){
                $("#loading").hide();
            }
        });
    });
});
