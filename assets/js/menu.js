$(document).ready(()=>{
    let elements = document.cookie.split('login_cookies=');
    let cookie_token= elements[1];
    if(cookie_token === undefined || cookie_token === null || cookie_token.length<10){
        window.location.href="https://aniketmahajan007.github.io/FoodShala/index.html";
    }
    const urlParams = new URLSearchParams(window.location.search);
    let res_id = Number(urlParams.get('res'));
    let array_list = [];
    setTimeout(()=>{
        $("#order_rest_id").val(res_id);
    },2000);
    if(res_id < 1){
        alert('Unknown error occurred');
        window.location.href="https://aniketmahajan007.github.io/FoodShala/dashboard.html";
        return;
    }
    $.ajax({
        url: "https://foodyshala.herokuapp.com/controller/user.php?requesting=2",
        headers: { 'FOODSHALA' : cookie_token},
        crossDomain: true,
        data: {rest_id:res_id},
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
            }else if(data['status'] === "invalid_res"){
                alert('Unknown error occurred');
                window.location.href="https://aniketmahajan007.github.io/FoodShala/dashboard.html";
                return;
            }else if(data['status'] === "error"){
                alert("Unknown error occurred, please try again later");
            }else{
                let innerHTML = '';
                data.forEach((value)=>{
                    innerHTML+=`<div class="margin_top item_outer_box">
          <img class="food_item_img" src="https://foodyshala.herokuapp.com/food_img/${value.food_img}">
          <div class="item_inner_box" id="food_box_id${value.id}">
            <h5 class="food_item_bold_header">${value.name}`;
                if(value.food_pref == 1){
                    innerHTML+=`<span class="green_dot"></span>`;
                }else{
                    innerHTML+=`<span class="red_dot"></span>`;
                }
                innerHTML+=`</h5>
            <p class="item_description">${value.food_desc}</p>
          </div>
          <div class="res_price" id="res_price_id${value.id}">
            <span class="menu_price_fix_style">&nbsp;&nbsp;₹ ${value.price}</span><br class="br_display_none">
            <button data-foodid="${value.id}" class="btn add_item_button">Add</button>
          </div>
        </div>
        <br>`;
                });
                $("#res_menu_full_box").html(innerHTML);
            }
        },
        error:function (){
            $("#loading").hide();
        }
    });
    $(document).on('click','.add_item_button',function (){
        let food_id = $(this).attr('data-foodid');
        let foodname = $("#food_box_id"+food_id).find('.food_item_bold_header:first').text();
        foodname = foodname.substr(0,26);
        let price = Number($("#res_price_id"+food_id).find('.menu_price_fix_style:first').text().replace(/\D/g, ""));
        let tot = Number($("#order_total_value").text().replace(/\D/g, ""));
        tot +=price;
        $("#order_tot_items").val(Number($("#order_tot_items").val())+1);
        array_list.push(food_id);
        $("#order_item_list").val(array_list);
        $("#no_food_selected_yet").hide();
        $("#orders_list").show();
        $("#order_list_nested_items").append(`<div class="row">
<div class="col-md-4">
<span style="font-weight: 600">1x ${foodname}:</span>
</div>
<div class="col-md-4">
<span>${price} Rs.</span>
</div>
</div>`);
        $("#order_total_value").text(tot);
    });

    $("#order_confirm_button").click(()=>{
        let tot = Number($("#order_tot_items").val());
        let rest_id = Number($("#order_rest_id").val());
        if( tot < 1 || rest_id < 1){
            alert('Unknown error Occurred');
            return;
        }
        $("#loading").show();
        $.ajax({
            url: "https://foodyshala.herokuapp.com/controller/user.php?requesting=3",
            headers: { 'FOODSHALA' : cookie_token},
            data: {rest_id:rest_id,tot_items:tot,item_list:array_list},
            crossDomain: true,
            timeout:30000,
            type: "POST",
            success: function(data)
            {
                $("#loading").hide();
                //response handling for login
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
                    alert('Order Successfully Placed');
                    window.location.href='https://aniketmahajan007.github.io/FoodShala/your_order.html';
                }else{
                    alert('Unknown error occurred try again later.');
                }
            },
            error:function (){
                $("#loading").hide();
            }
        });
    })
});
