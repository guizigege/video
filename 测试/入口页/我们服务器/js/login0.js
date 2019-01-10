(function login(){
    const fuid = getUrlParam("fuid");
        if(sessionStorage.getItem("isLogin")==null){
            $post("/cookie/login",{},{Appid:videoAppid,Fuid:fuid},function(res){
                if(res.result===1){
                    $.ajax({
                        url: baseUrl+"/get_user_info",
                        type: 'POST',
                        data: JSON.stringify({}),
                        dataType: 'text',
                        contentType: "text/plain",
                        headers: {Appid:videoAppid},
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        success(res) {
                            let obj = jsonlint.parse(res);
                            if(obj.result===1){
                                sessionStorage.setItem("uid",obj.user.uid);
                                sessionStorage.setItem("isLogin", $.cookie("session"));
                                windowBack("分享0","wxShare0.html","wxShare0.html");
                                wxShare0();
                            }
                        },
                        fail(res) {
                            toError();
                        }
                    });


                }else{
                    toError();
                }
            })
        }else{

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

    function toError(){
        alert("服务器错误！")
    }
})();