$(document).ready(()=>{
    let elements = document.cookie.split('login_cookies=');
    let cookie_token= elements[1];
    if(cookie_token === undefined || cookie_token === null || cookie_token.length<10){
        window.location.href="index.html";
    }
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    console.log(urlParams.get('res'));
});
