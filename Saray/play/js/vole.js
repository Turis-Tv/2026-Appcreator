      	var url_string = window.location.href;
var url = new URL(url_string);
var cid = url.searchParams.get("id"); 
document.write(" <iframe  id='frame' name='frame' src='https://just.cloudflare-plus-worker.workers.dev/?ts=https://h1w.04bf112a615942b50.sbs/"+cid+".m3u8' width='100%'  height='100%' frameborder='0' allowfullscreen scrolling='no' sandbox='none-popups allow-scripts allow-same-origin'></iframe>");



