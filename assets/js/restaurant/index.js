$(document).ready(()=>{
    if(screen.width<768){
        document.getElementById("left_side_login").style.display = "none";
        $("#right_side_login").removeClass("col-md-6").addClass("col-md-12")
    }else{
        document.getElementById("left_side_login").style.display = "block";
        $("#right_side_login").removeClass("col-md-12").addClass("col-md-6")
    }
    $("#reg_box").hide();
    $("#red_to_reg_box").click(()=>{
        $("#reg_box").show();
        $("#login_box").hide();
    });
    $("#red_to_login_box").click(()=>{
        $("#reg_box").hide();
        $("#login_box").show();
    })
});
