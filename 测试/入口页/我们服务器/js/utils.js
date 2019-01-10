
function modalHandle(){
    let modal = document.getElementById("modal");
    let ok =document.getElementById("ok");
    ok.addEventListener("click",function() {
        modal.style.display = "none";
        window.focus();
    });
}

function windowBack(title,url,toUrl){
    window.history.pushState({title:title,url:url}, title, url);

    window.addEventListener("popstate", function(e) {
        //点击返回,触发回调函数
        location.href = toUrl;
    }, false);
}

function btnBack(url){
    let toBack = document.getElementById("toBack");
    toBack.addEventListener("click",function(){
        location.href = url;
    })
}

function banMove(){
    document.addEventListener('touchmove', function(e){e.preventDefault()}, false);
}

function getUrlParam(type){
    let regexp = new RegExp('(^|&)'+type+'=([^&]*)(&|$)');
    let result = window.location.search.substr(1).match(regexp);
    if(result!=null){
        return encodeURIComponent(result[2]);
    }else{
        return null;
    }
}

