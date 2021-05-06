$(document).ready(()=>{
    let elements = document.cookie.split('login_cookies=');
    let cookie_token= elements[1];
    if(cookie_token === undefined || cookie_token === null || cookie_token.length<10){
        window.location.href="https://aniketmahajan007.github.io/FoodShala/restaurant/index.html";
    }
    $.ajax({
        url: "http://localhost/foodshala_php/controller/restaurant.php?requesting=1",
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
            }else if(data['status']==="res"){
                $("#your_food_menu_box").html('<span style="color:red">No items added yet....</span>');
                $("#restaurant_name").html(data['res_name']+' !')
            }else{
                let innerHTML = '';
                $("#restaurant_name").html(data[0]['res_name'])
                data.forEach((value)=>{
                    innerHTML+=`<div class="margin_top item_outer_box">
          <img class="food_item_img" src="http://localhost/foodshala_php/food_img/${value.food_img}">
          <div class="item_inner_box">
            <h5 class="food_item_bold_header">${value.food_name}`;
                    if(value.food_type == 1){
                        innerHTML+='<span class="green_dot"></span>';
                    }else{
                        innerHTML+='<span class="red_dot"></span>';
                    }
                    innerHTML+=`</h5>
            <p class="item_description">${value.food_desc}</p>
          </div>
          <div class="res_price">
            <span>&nbsp;&nbsp;₹ ${value.price}</span>
          </div>
        </div>`;
                });
                $("#your_food_menu_box").html(innerHTML);
            }
        },
        error:function (){
            $("#loading").hide();
        }
    });
    $("#add_food_button").click(()=>{
        let food_name = $("#add_food_name").val().trim();
        let food_desc = $("#add_food_desc").val().trim();
        let price = $("#add_food_price").val().trim();
        if(food_name.length < 4 || food_desc.length < 6){
            $("#add_food_error").html('<span style="color:red">Please fill all the details properly.</span>');
            return;
        }
        if(price < 10 || price > 3000){
            $("#add_food_error").html('<span style="color:red">Price should be between 11 to 3000.</span>');
            return;
        }
        $("#loading").show();
        $.ajax({
            url: "http://localhost/foodshala_php/controller/restaurant.php?requesting=3",
            headers: { 'FOODSHALA' : cookie_token},
            data: new FormData($("#add_new_food_form")[0]),
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
                }if(data['status'] === "invalid_img"){
                    $("#add_food_error").html('<span style="color:red">Please select valid image<br></span>');
                }else if(data['status'] === "img_size"){
                    $("#add_food_error").html('<span style="color:red">Image size should be less than 4 M.B.<br></span>');
                }else if(data['status'] === "format"){
                    $("#add_food_error").html('<span style="color:red">Only JPG, PNG, JPEG format allowed<br></span>');
                }else if(data['status'] === "success"){
                    alert('Successfully added');
                    $("#add_new_food_form")[0].reset();
                    if($("#your_food_menu_box").html()==='<span style="color:red">No items added yet....</span>'){
                        $("#your_food_menu_box").html(`
                        <div class="margin_top item_outer_box">
          <img class="food_item_img" src="http://localhost/foodshala_php/food_img/${data['img']}">
          <div class="item_inner_box">
            <h5 class="food_item_bold_header">${food_name}</h5>
            <p class="item_description">${food_desc}</p>
          </div>
          <div class="res_price">
            <span>&nbsp;&nbsp;₹ ${price}</span>
          </div>
        </div>`);
                    }else{
                        $("#your_food_menu_box").prepend(`
                        <div class="margin_top item_outer_box">
          <img class="food_item_img" src="http://localhost/foodshala_php/food_img/${data['img']}">
          <div class="item_inner_box">
            <h5 class="food_item_bold_header">${food_name}</h5>
            <p class="item_description">${food_desc}</p>
          </div>
          <div class="res_price">
            <span>&nbsp;&nbsp;₹ ${price}</span>
          </div>
        </div>`)
                    }
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
