$(document).ready(()=>{
    let elements = document.cookie.split('login_cookies=');
    let cookie_token= elements[1];
    if(cookie_token === undefined || cookie_token === null || cookie_token.length<10){
        window.location.href="https://aniketmahajan007.github.io/FoodShala/restaurant/index.html";
    }
    $.ajax({
        url: "https://foodyshala.herokuapp.com/controller/restaurant.php?requesting=5",
        headers: { 'FOODSHALA' : cookie_token},
        crossDomain: true,
        timeout:30000,
        type: "POST",
        success: function(data)
        {
            $("#loading").hide();
            //response handling
            if(data['status'] === 'restricted_token'){
                alert('You are not allowed to access this page');
                window.location.href="https://aniketmahajan007.github.io/FoodShala/dashboard.html";
                return;
            }else if(data['status'] === "db"){
                alert('Database Connection failed');
                return;
            }else if(data['status'] ==="token_exist" || data['status']==="invalid_token"){
                alert('Token Expire');
                window.location.href="https://aniketmahajan007.github.io/FoodShala/index.html";
                return;
            }else if(data['status'] === "error"){
                alert("Unknown error occurred, please try again later");
            }else{
                $("#res_name").val(data[0].res_name);
                $("#res_desc").val(data[0].res_desc);
                $("#res_address").val(data[0].address);
                $("#mob_number").val(data[0].mob_number);
            }
        },
        error:function (){
            $("#loading").hide();
        }
    });
    $("#update_profile_button").click(()=>{
        let res_name = $("#res_name").val().trim();
        let res_desc = $("#res_desc").val().trim();
        let res_address = $("#res_address").val().trim();
        let mob_number = $("#mob_number").val().trim();
        if(res_name.length < 3 || res_desc.length < 6 || res_address.length< 10){
            $("#update_profile_error").html(`<span style="color:red">Please fill all the details properly.</span>`)
            return;
        }
        if(/^\d{10}$/.test(mob_number)){}else{
            $("#update_profile_error").html(`<span style="color:red">Mobile number not valid.</span>`);
            return;
        }
        $("#loading").show();
        $.ajax({
            url: "https://foodyshala.herokuapp.com/controller/restaurant.php?requesting=4",
            headers: { 'FOODSHALA' : cookie_token},
            data: new FormData($("#update_profile_form")[0]),
            crossDomain: true,
            timeout:30000,
            processData: false,
            contentType: false,
            type: "POST",
            success: function(data)
            {
                $("#loading").hide();
                //response handling for login
                if(data['status'] === 'restricted_token'){
                    alert('You are not allowed to access this page');
                    window.location.href="https://aniketmahajan007.github.io/FoodShala/dashboard.html";
                    return;
                }else if(data['status'] === "db"){
                    alert('Database Connection failed');
                    return;
                }else if(data['status'] ==="token_exist" || data['status']==="invalid_token"){
                    alert('Token Expire');
                    window.location.href="https://aniketmahajan007.github.io/FoodShala/index.html";
                    return;
                }else if(data['status'] === "invalid_img"){
                    $("#update_profile_error").html('<span style="color:red">Please select valid image<br></span>');
                }else if(data['status'] === "img_size"){
                    $("#update_profile_error").html('<span style="color:red">Image size should be less than @ M.B.<br></span>');
                }else if(data['status'] === "format"){
                    $("#update_profile_error").html('<span style="color:red">Only JPG, PNG, JPEG format allowed<br></span>');
                }else if(data['status'] === "success"){
                    $("#update_profile_error").html(`<span style="color:green">Successfully Updated.</span>`);
                    alert('Successfully Updated.');
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
