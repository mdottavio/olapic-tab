
var require = (function (oHead) {
  var onError = function() {
    throw new URIError('Script could not be loaded');
  };
  return function (url, onLoadCallback) {
    var oScript = document.createElement('script');
    oScript.type = 'text\/javascript';
    oScript.src = url;
    oScript.async = true;
    oScript.onerror = onError;
    if (onLoadCallback) {
        if(oScript.addEventListener) {
            oScript.addEventListener('load', onLoadCallback, false);
        } else if(oScript.readyState) {
            oScript.onreadystatechange = function() {
                if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete'){
                    console.log('a');
                    onLoadCallback();
                }
            };
        } else {
            oScript.attachEvent('load', onLoadCallback);
        }
    }
    oHead.appendChild(oScript);
  };
})(document.head || document.getElementsByTagName('head')[0]);