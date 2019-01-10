function wxShare0(){
    const uid = sessionStorage.getItem("uid");
    let city = localAddress.city ? localAddress.city : (localAddress.province ? localAddress.province : "深圳市");
    // 分享入口页
    $post("/proxy/get_proxy",{type:1},{Appid:videoAppid},function(res){
        if(res.result===1){
            let myAddress = res.data.address;
            let myLink = myAddress+getAddress(myAddress)+"/entry.html?fuid="+uid;//分享的入口页链接
            let imgLink = myAddress+getAddress(myAddress)+"/images/share.jpg";//分享的图片链接
            alert($.cookie("session"));
            $post("/wechat/get_jsticket",{req_url:location.href.split('#')[0]},{Appid:videoAppid},function(res){
                if(res.result===1){
                    wxConfig(res,myLink,imgLink);
                }else{
                    toError();
                }
            });
        }else{
            toError();
        }
    });
    //微信接口配置
    function wxConfig(res,myLink,imgLink){
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
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function(){
            quan(city,myLink,imgLink);
            qun(city,myLink,imgLink);
        });
    }

    //分享朋友圈
    function quan(city,myLink,imgLink){
        wx.onMenuShareTimeline({
            title: city+shareTitle, // 分享标题
            desc: shareDesc, // 分享描述
            link:myLink,
            imgUrl:imgLink,
            success: function () {
                // 用户确认分享后执行的回调函数

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
            success: function () {
                // 用户确认分享后执行的回调函数

            },
            cancel: function (res) {
                // 用户取消分享后执行的回调函数
            }
        });
    }
    function toError(){
        alert("服务器错误！")
    }
}