$(document).ready(()=>{
    // checking token
    let elements = document.cookie.split('login_cookies=');
    let cookie_token= elements[1];
    if(cookie_token === undefined || cookie_token === null || cookie_token.length<10){
        window.location.href="https://aniketmahajan007.github.io/FoodShala/index.html";
    }
    // Fetching User Data
    $.ajax({
        url: "https://foodyshala.herokuapp.com/controller/user.php?requesting=6",
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
                window.location.href="https://aniketmahajan007.github.io/FoodShala/restaurant/dashboard.html";
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
                $("#user_name").val(data[0].user_name);
                $("#address").val(data[0].address);
                $("#food_pref").val(data[0].food_pref);
                $("#mob_number").val(data[0].mob_number);
            }
        },
        error:function (){
            $("#loading").hide();
        }
    });
    //Updating User Data
    $("#update_profile_button").click(()=>{
        let user_name = $("#user_name").val().trim();
        let address = $("#address").val().trim();
        let mob_number = $("#mob_number").val().trim();
        if(user_name.length < 3 || address.length< 10){
            $("#update_profile_error").html(`<span style="color:red">Please fill all the details properly.</span>`)
            return;
        }
        if(/^\d{10}$/.test(mob_number)){}else{
            $("#update_profile_error").html(`<span style="color:red">Mobile number not valid.</span>`);
            return;
        }
        $("#loading").show();
        // Sending update request
        $.ajax({
            url: "https://foodyshala.herokuapp.com/controller/user.php?requesting=5",
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
                // handling response
                if(data['status'] === 'restricted_token'){
                    alert('You are not allowed to access this page');
                    window.location.href="https://aniketmahajan007.github.io/FoodShala/restaurant/dashboard.html";
                    return;
                }else if(data['status'] === "db"){
                    alert('Database Connection failed');
                    return;
                }else if(data['status'] ==="token_exist" || data['status']==="invalid_token"){
                    alert('Token Expire');
                    window.location.href="https://aniketmahajan007.github.io/FoodShala/index.html";
                    return;
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
