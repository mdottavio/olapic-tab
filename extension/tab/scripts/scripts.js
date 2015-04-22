
var sessionIds = [],
    theImg = new Image(),
    settings = localStorage.getItem('settings'),
    now = new Date().getTime();

settings = settings || JSON.stringify({
    lastCheck : 0,
    posts : []
});

settings = JSON.parse(settings);
// 1h cache
if((now - settings.lastCheck) > 216000){
    //we should check the posts again...
    require('https://olapic-tab-server.herokuapp.com/', function(){
        console.log(tumblr_api_read);
        settings.lastCheck = now;
        settings.posts = tumblr_api_read.posts;
        insertPost();
    });
} else {
    //let's use the posts we have
    localStorage.setItem('settings', JSON.stringify(settings));
    insertPost();
}

function changeBg(id, callback){
    if(!settings.posts[id].colors){
        settings.posts[id].colors = Colibri.extractImageColors( theImg, 'css' );
    }
    theBgStyles = 'linear-gradient(to bottom left, '+settings.posts[id].colors.background+', rgb(246,242,241) )';
    document.body.style.background = theBgStyles;
    callback();
}
function insertPost(){
    var post, 
        rId;
    if(settings.posts.length > 0){
        rId = Math.floor(Math.random()*settings.posts.length);
        while(sessionIds.indexOf(rId) > -1){
            rId = Math.floor(Math.random()*settings.posts.length);
        }
        sessionIds.push( rId );
        post = settings.posts[rId];
        theImg.onload = function ( ) { 
            document.getElementById('caption').innerHTML = post['photo-caption']||'';
            document.getElementById('imgWrapper').innerHTML = '<a href="'+post['photo-link-url']+'" ><img src="'+post['photo-url-400']+'" id="theImg" /></a>';
            changeBg(rId, function(){
                localStorage.setItem('settings', JSON.stringify(settings));
            });
        };
        theImg.onerror = function(){
            insertPost();
        };
        theImg.crossOrigin = 'Anonymous';
        theImg.src = post['photo-url-400'];
    }
}