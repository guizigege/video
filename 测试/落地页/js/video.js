!function (global,factory) {
    global.NewTxplayer = factory();
}(window,function () {
    return function (obj) {
        var _this = this;
        var start = 0;
        var video = new tvp.VideoInfo();
        video.setVid(obj.vid);
        var pic = video.getVideoSnap();
        var player =new tvp.Player();
        player.create({
            width:'100%',
            height:200,
            video:video,
            modId:obj.modId,
            pic:pic[2],
            isHtml5UseFakeFullScreen:false,
            onplaying:function () {
                video.setHistoryStart(0.1);
                if(start == 0){
                    start = 1;
                    _this.Playtime();
                }

            },
            onplay:function () {
                video.setHistoryStart(0.1);
                if(obj.story == 'no'){
                    video.setHistoryStart(0.1);
                }else {
                    video.setHistoryStart(obj.playAgain);
                }
            },
        });
        _this.Playtime=function(){
            var currtime = setInterval(function () {
                var pt = parseInt(player.getPlaytime());
                if(pt >= obj.currtime && obj.story == 'no'){
                    start = 0;
                    clearInterval(currtime);
                    _this.PlayStart();
                }
            },1000);
        };
        _this.PlayStart = function () {};
    }
});