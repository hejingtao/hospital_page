var win = window; 
var doc = win.document; 
var input = doc.createElement ("input"); 
var ie = (function (){ 
if (win.ActiveXObject === undefined) return null; 
if (!win.XMLHttpRequest) return 6; 
if (!doc.querySelector) return 7; 
if (!doc.addEventListener) return 8; 
if (!win.atob) return 9; 
if (!input.dataset) return 10; return 11; })();
if(ie != null && ie < 10){ alert('您的IE版本过低，无法正常加载网站，请下载chrome、firefox等现代浏览器进行访问！');}
