/**
 * Created by admin on 2018/9/26.
 */
var pixelRatio=1;
document.write('<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" >');
var html=document.getElementsByTagName("html")[0];
var pageWidth=html.getBoundingClientRect().width;
var rem = pageWidth/15;
html.style.fontSize=rem+"px";