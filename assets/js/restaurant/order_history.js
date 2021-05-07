$(document).ready(()=>{
    let elements = document.cookie.split('login_cookies=');
    let cookie_token= elements[1];
    if(cookie_token === undefined || cookie_token === null || cookie_token.length<10){
        window.location.href="https://aniketmahajan007.github.io/FoodShala/index.html";
    }
    $.ajax({
        url: "https://foodyshala.herokuapp.com/controller/restaurant.php?requesting=2",
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
            }else if(data['status'] === 'restricted_token'){
                alert('You are not allowed to access this page');
                window.location.href="https://aniketmahajan007.github.io/FoodShala/dashboard.html";
                return;
            }else if(data['status'] === "error"){
                alert("Unknown error occurred, please try again later");
            }else{
                let innerHTML = '';
                data.forEach((value)=>{
                    if(value.logo === null || value.logo === ""){
                        value.logo='chef.jpg';
                    }
                    if(value.res_desc === null || value.res_desc === ""){
                        value.res_desc='Serving delicious food at your doorstep.';
                    }
                    innerHTML+=`<div class="margin_top col">
            <div class="order_outer_box">
                <img class="order_img_logo" src="https://foodyshala.herokuapp.com/res_logo/${value.logo}">
                <div class="order_inner_box">
                    <h4 class="order_res_name">${value.res_name}</h4>
                    <p class="order_res_detail">${value.res_desc}</p>
                </div>
                <hr>
                <span class="order_number">Order Number : </span><span class="order_number_detail">${value.order_id}</span>
                <br>
                <span class="order_number">Ordered On : </span><span class="order_number_detail">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value.order_date}</span><br>
                <span class="order_number">Total Amount : </span><span class="order_number_detail">&nbsp;&nbsp;${value.price} ₹.</span><br>
                <span class="order_number_items" style="position: absolute">Items : </span>
                <div class="order_item_shift_left">
                    <span class="bold_it">${value.order_list}</span>
                </div>
            </div>
        </div>`;
                });
                $("#previous_order_box").html(innerHTML);
            }
        },
        error:function (){
            $("#loading").hide();
        }
    });
})

