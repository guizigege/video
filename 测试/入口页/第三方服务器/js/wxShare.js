function wxShare(page,shareType){
    let blurTime = null,shareTime = null,focusTime = null,myLink = null,imgLink = null,u = navigator.userAgent;
    let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    const uid = sessionStorage.getItem("uid");
    let city = localAddress.city ? localAddress.city : (localAddress.province ? localAddress.province : "深圳市");
    if(isAndroid){
        window.focus();
        window.addEventListener("blur",function(){
            blurTime = new Date().getTime();
        });
        window.addEventListener("focus",function(){
            focusTime = new Date().getTime();
            if(blurTime!=null&&focusTime!=null){
                shareTime = focusTime - blurTime;
            }
        });
    }
    // 分享入口页
    let link = location.href;
    myLink = link.slice(0,link.indexOf("wxShare"))+"entry.html?fuid="+uid;//分享的入口页链接
    imgLink = link.slice(0,link.indexOf("wxShare"))+"images/share.jpg"; //分享的图片链接
    //第一个参数填写完整的url
    $post2("/wechat/get_jsticket",{req_url:location.href.split('#')[0]},{Appid:videoAppid,'Dncookie':'session='+sessionStorage.getItem("isLogin")},function(res){
        if(res.result===1){
            wxConfig(res);
        }else{
            alert("get_jsticket错误！错误码："+res.result);
            // location.href = "error.html";
        }
    });
    //微信接口配置
    function wxConfig(res){
        let appId = res.appid;
        let timestamp = res.timeStamp;
        let nonceStr = res.nonceStr;
        let signature = res.jsSign;
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: appId, // 必填，公众号的唯一标识
            timestamp: timestamp, // 必填，生成签名的时间戳
            nonceStr: nonceStr, // 必填，生成签名的随机串
            signature: signature,// 必填，签名，见附录1
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage","hideMenuItems"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function(){
            if(shareType === "quan"){
                wxHideShare("menuItem:share:appMessage");
                quan(city,myLink,imgLink);
            }else if(shareType === "qun"){
                wxHideShare("menuItem:share:timeline");
                qun(city,myLink,imgLink);
            }else{
                console.log("其他")
            }
        });
    }
    //隐藏指定菜单
    function wxHideShare(hideItem){
        wx.hideMenuItems({
            menuList:[
                "menuItem:share:qq", //分享到qq
                "menuItem:share:weiboApp", //分享到微博
                "menuItem:favorite", //收藏
                "menuItem:share:QZone", //分享到qq空间
                "menuItem:share:facebook", //分享到FB
                "menuItem:copyUrl", //复制链接
                "menuItem:editTag", //编辑标签
                "menuItem:delete", //删除
                "menuItem:share:brand", //公众号
                "menuItem:openWithQQBrowser", //用qq浏览器打开
                "menuItem:openWithSafari", //用safari浏览器打开
                "menuItem:share:email",// 邮件
                "menuItem:readMode", //阅读模式
                "menuItem:originPage", //源网页
                hideItem
            ],
            //隐藏菜单项成功的回调函数
            success:function(res){

            },
            //隐藏菜单项失败的回调函数
            fail:function(res){

            }
        });
    }
    //分享朋友圈
    function quan(city,myLink,imgLink){
        wx.onMenuShareTimeline({
            title: city+shareTitle, // 分享标题
            desc: shareDesc, // 分享描述
            link:myLink,
            imgUrl:imgLink,
            trigger:function(){
                if(isiOS){
                    blurTime = new Date().getTime();
                }
            },
            success: function () {
                // 用户确认分享后执行的回调函数
                if(isiOS){
                    focusTime = new Date().getTime();
                    if(blurTime!=null&&focusTime!=null){
                        shareTime = focusTime - blurTime;
                    }
                }
                if(shareTime>=1200){
                    location.href = page;
                }else{
                    blurTime = null;
                    shareTime = null;
                    focusTime = null;
                }
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    }
    //分享好友或者群
    function qun(city,myLink,imgLink){
        wx.onMenuShareAppMessage({
            title: city+shareTitle, // 分享标题
            desc: shareDesc, // 分享描述
            link: myLink, // 分享链接
            imgUrl: imgLink, // 分享图标
            type: "", // 分享类型,music、video或link，不填默认为link
            dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
            trigger:function(){
                if(isiOS){
                    blurTime = new Date().getTime();
                }
            },
            success: function () {
                // 用户确认分享后执行的回调函数
                //ios获取分享时间差
                if(isiOS){
                    focusTime = new Date().getTime();
                    if(blurTime!=null&&focusTime!=null){
                        shareTime = focusTime - blurTime;
                    }
                }
                //判断分享时间差
                if(shareTime>=1200){
                    location.href = page;
                }else{
                    blurTime = null;
                    shareTime = null;
                    focusTime = null;
                }
            },
            cancel: function (res) {
                // 用户取消分享后执行的回调函数
            }
        });
    }
}