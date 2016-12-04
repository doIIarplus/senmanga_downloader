// this is the code which will be injected into a given page...

(function() {
	console.log("SHIET");

	var imgUrl = document.getElementById('picture').src;

	var urlArr = imgUrl.split('/');
	var len = urlArr.length;

	var name = urlArr[len - 3] + "-Ch." + urlArr[len - 2] + " Pg." + urlArr[len - 1] + ".png";



	console.log("Complete url Is " + imgUrl);

	var req = new XMLHttpRequest();
	req.open('GET', imgUrl, true);

	req.responseType = 'arraybuffer';

	req.onload = function(e){
		var arr = new Uint8Array(this.response);

		// Convert the int array to a binary string
        // We have to use apply() as we are converting an *array*
        // and String.fromCharCode() takes one or more single values, not
        // an array.
        var raw = handleCodePoints(arr);

        // This works!!!
        var b64=btoa(raw);
        var dataURL="data:application/octet-stream;base64,"+b64;
        var link = document.createElement('a');
        link.download = name;
        link.href = dataURL;
        link.click();
	}

	req.send();

	/*var req = new XMLHttpRequest();
	req.open("GET", imgUrl, false);
	req.send(null);

	var response = req.responseText;

	var b64 = btoa(encodeURIComponent(response));
	console.log("B64 is : " + b64);
	var outputImg = document.createElement('img');
	outputImg.src = 'data:image/jpeg;base64,' + b64;
	document.body.appendChild(outputImg);
	console.log(response);*/
})();


function handleCodePoints(array) {
  var CHUNK_SIZE = 0x8000; // arbitrary number here, not too small, not too big
  var index = 0;
  var length = array.length;
  var result = '';
  var slice;
  while (index < length) {
    slice = array.slice(index, Math.min(index + CHUNK_SIZE, length)); // `Math.min` is not really necessary here I think
    result += String.fromCharCode.apply(null, slice);
    index += CHUNK_SIZE;
  }
  return result;
}