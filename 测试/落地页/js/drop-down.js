(function(){
    document.body.ontouchmove = function (e) {
        e.preventDefault();
    };

    // 然后取得触摸点的坐标
    var startY = 0;
    //touchstart事件
    function touchSatrtFunc(evt) {
        try
        {
            //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
            var touch = evt.touches[0]; //获取第一个触点
            var y = Number(touch.pageY); //页面触点Y坐标
            //记录触点初始位置
            startY = y;

        } catch (e) {
            alert('touchSatrtFunc：' + e.message);
        }
    }
    document.addEventListener('touchstart', touchSatrtFunc, false);

    // 然后对允许滚动的条件进行判断，这里讲滚动的元素指向body
    var _ss = document.getElementById("first");
    _ss.ontouchmove = function (ev) {
        var _point = ev.touches[0],
            _top = _ss.scrollTop;
        // 什么时候到底部
        var _bottomFaVal = _ss.scrollHeight - _ss.offsetHeight;
        // 到达顶端
        if (_top === 0) {
            // 阻止向下滑动
            if (_point.clientY > startY) {
                ev.preventDefault();
            } else {
                // 阻止冒泡
                // 正常执行
                ev.stopPropagation();
            }
        } else if (_top === _bottomFaVal) {
            // 到达底部 如果想禁止页面滚动和上拉加载，讲这段注释放开，也就是在滚动到页面底部的制售阻止默认事件
            // 阻止向上滑动
            // if (_point.clientY < startY) {
            //     ev.preventDefault();
            // } else {
            //     // 阻止冒泡
            //     // 正常执行
            //     ev.stopPropagation();
            // }
        } else if (_top > 0 && _top < _bottomFaVal) {
            ev.stopPropagation();
        } else {
            ev.preventDefault();
        }
    };
    //页面下拉处理

    dragDown();
    function dragDown(){
        let  first = document.getElementById("first");
        let startY = 0 ,dY = -100;

        first.addEventListener("touchstart",function(e){

            startY = e.changedTouches[0].pageY;
            first.addEventListener("touchmove",function(e){
                let moveEndY = e.changedTouches[0].pageY;
                dY = moveEndY - startY;
                let rem = Math.floor(parseFloat(dY/100));
                if(dY>0){
                    first.style.top = rem+"rem";
                }
                first.addEventListener("touchend",function(e){
                    first.style.transition = "all 0.4s";
                    first.style.top = "0"

                });
            });

        });
    }



}());