$(document).ready(()=>{
    $("#log_out").click(()=>{
        document.cookie = 'login_cookies=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;';
        document.cookie = 'login_cookies=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/FoodShala;';
        document.cookie = 'login_cookies=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/FoodShala/restaurant;';
        setTimeout(()=>{
            window.location.href = "https://aniketmahajan007.github.io/FoodShala/index.html";
        },500);
    });
})
