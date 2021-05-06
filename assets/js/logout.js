$(document).ready(()=>{
    $("#log_out").click(()=>{
        document.cookie = 'login_cookies=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;';
        setTimeout(()=>{
            window.location.href = "index.html";
        },500);
    });
})
