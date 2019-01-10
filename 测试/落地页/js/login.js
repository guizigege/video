(function login(){
    const fuid = getUrlParam("fuid");//获取前一个用户分享的uid
    //判断登入状态
        if(sessionStorage.getItem("isLogin")==null){
            $post("/cookie/login",{},{Appid:videoAppid,Fuid:fuid},function(res){
                if(res.result===1){
                    sessionStorage.setItem("isLogin",$.cookie("session"));
                    sessionStorage.setItem("loginType","wx");
                    $.ajax({
                        url: baseUrl + '/get_user_info',
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
                            }
                        },
                        fail(res) {
                            toError();
                        }
                    });
                    //隐藏菜单分享功能
                    hideMenu();
                }else{
                    toError();
                }
            })
        }else{
            hideMenu();
        }
    //获取url指定参数的值
    function getUrlParam(type){
        let regexp = new RegExp('(^|&)'+type+'=([^&]*)(&|$)');
        let result = window.location.search.substr(1).match(regexp);
        if(result!=null){
            return encodeURIComponent(result[2]);
        }else{
            return null;
        }
    }

    //无绑定微信公众号，隐藏微信分享菜单
    function hideMenu(){
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        } else {
            onBridgeReady();
        }
        function onBridgeReady() {
            WeixinJSBridge.call('hideOptionMenu');
        }
    }
    //错误返回的页面
    function toError(){
        sessionStorage.clear();
        location.href = "error.html";
    }
})();