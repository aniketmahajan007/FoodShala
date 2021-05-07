$(document).ready(()=>{
    let elements = document.cookie.split('login_cookies=');
    let cookie_token= elements[1];
    if(cookie_token === undefined || cookie_token === null || cookie_token.length<10){
        window.location.href="https://aniketmahajan007.github.io/FoodShala/index.html";
    }
    $.ajax({
        url: "https://foodyshala.herokuapp.com/controller/user.php?requesting=1",
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
                setTimeout(()=>{
                    window.location.href="https://aniketmahajan007.github.io/FoodShala/dashboard.html";
                },500);
                return;
            }else if(data['status'] === "error"){
                alert("Unknown error occurred, please try again later");
            }else{
                let innerHTML = '';
                let i=2
                data.forEach((value)=>{
                    if(i%2 === 0){
                        innerHTML+=`<div class="row">`;
                    }
                    if(value.logo === null || value.logo === ""){
                        value.logo='chef.jpg';
                    }
                    if(value.res_desc === null || value.res_desc === ""){
                        value.res_desc='Serving delicious food at your doorstep.';
                    }
                    innerHTML+=`<div class="margin_top col-md-6">
          <div class="res_item_outer_box">
            <a class="text_black" href="menu.html?res=${value.res_id}">
              <img class="food_item_img" src="https://foodyshala.herokuapp.com/res_logo/${value.logo}">
              <div class="item_inner_box">`;
                    if(value.food_pref == 0){
                        innerHTML+=`<span class="green_dot float_right"></span><span class="red_dot float_right"></span>`;
                    }else if(value.food_pref == 1){
                        innerHTML+=`<span class="green_dot float_right"></span>`;
                    }else{
                        innerHTML+=`<span class="red_dot float_right"></span>`;
                    }
              innerHTML+=`<h5 class="food_item_bold_header pacifo">${value.res_name}</h5>
                <p class="item_description">${value.res_desc}</p>
              </div>
            </a>
          </div>
        </div>`;
                    if(i%2 === 0){
                        innerHTML+=`<div/>`;
                    }
                    i++;
                });
                $("#res_taur_rant_list").html(innerHTML);
            }
        },
        error:function (){
            $("#loading").hide();
        }
    });
});
