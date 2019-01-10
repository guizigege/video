function Ptmeform(){
    var system = {
        win: false,
        mac: false,
        xll: false
    };
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
    if (system.win || system.mac) {
        return false;
    } else {
        return true;
    }
}
if(!Ptmeform()){
    location.href = 'error.html';
}