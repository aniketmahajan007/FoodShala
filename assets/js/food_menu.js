$(document).ready(()=>{
    let elements = document.cookie.split('login_cookies=');
    let cookie_token= elements[1];
    if(cookie_token === undefined || cookie_token === null || cookie_token.length<10){}
    else{window.location.href="https://aniketmahajan007.github.io/FoodShala/dashboard.html";}
    $.ajax({
        url: "http://localhost/foodshala_php/controller/register.php?requesting=5",
        headers: { 'FOODSHALA' : 'null'},
        crossDomain: true,
        timeout:30000,
        type: "POST",
        success: function(data)
        {
            $("#loading").hide();
            //response handling
            if(data['status'] === "db"){
                alert('Database Connection failed');
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
                    innerHTML+=`<div class="margin_top col-md-4">
                <div class="food_menu_outer_box">
                    <img class="food_menu_img_food" src="http://localhost/foodshala_php/food_img/${value.food_img}">
                    <div class="food_menu_inner_box">
                        <h3 class="food_menu_item_name">${value.food_name}</h3>
                        <p class="food_menu_item_desc">${value.food_desc}</p>
                        <div>
                            <h3 class="food_menu_price">₹ ${value.price}</h3>
                            <button class="btn food_menu_order_button">Order</button>
                        </div>
                    </div>
                    <div class="food_menu_company_box">
                        <img class="food_menu_logo_food" alt="Restaurant logo" src="http://localhost/foodshala_php/res_logo/${value.logo}">
                        <div class="food_menu_res_detail">
                            <h5 class="food_menu_restaurant_name">${value.res_name}</h5>
                            <p class="food_menu_restaurant_detail">${value.res_desc}</p>
                        </div>
                    </div>
                </div>
            </div>`;
                });
                $("#food_menu_box").html(innerHTML);
            }
        },
        error:function (){
            $("#loading").hide();
        }
    });
    $("#show_more_food").click(()=>{
       window.location.href="https://aniketmahajan007.github.io/FoodShala/index.html";
    });
})
$(document).on('click','.food_menu_order_button',()=>{
    alert("Sign Up/ Login to order delicious food.");
});
