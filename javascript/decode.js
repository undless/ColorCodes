var colorNames={"black":"#000000","navy":"#000080","darkblue":"#00008B","mediumblue":"#0000CD","blue":"#0000FF","darkgreen":"#006400","green":"#008000","teal":"#008080","darkcyan":"#008B8B","deepskyblue":"#00BFFF","darkturquoise":"#00CED1","mediumspringgreen":"#00FA9A","lime":"#00FF00","springgreen":"#00FF7F","aqua":"#00FFFF","cyan":"#00FFFF","midnightblue":"#191970","dodgerblue":"#1E90FF","lightseagreen":"#20B2AA","forestgreen":"#228B22","seagreen":"#2E8B57","darkslategray":"#2F4F4F","limegreen":"#32CD32","mediumseagreen":"#3CB371","turquoise":"#40E0D0","royalblue":"#4169E1","steelblue":"#4682B4","darkslateblue":"#483D8B","mediumturquoise":"#48D1CC","indigo ":"#4B0082","darkolivegreen":"#556B2F","cadetblue":"#5F9EA0","cornflowerblue":"#6495ED","mediumaquamarine":"#66CDAA","dimgray":"#696969","slateblue":"#6A5ACD","olivedrab":"#6B8E23","slategray":"#708090","lightslategray":"#778899","mediumslateblue":"#7B68EE","lawngreen":"#7CFC00","chartreuse":"#7FFF00","aquamarine":"#7FFFD4","maroon":"#800000","purple":"#800080","olive":"#808000","gray":"#808080","skyblue":"#87CEEB","lightskyblue":"#87CEFA","blueviolet":"#8A2BE2","darkred":"#8B0000","darkmagenta":"#8B008B","saddlebrown":"#8B4513","darkseagreen":"#8FBC8F","lightgreen":"#90EE90","mediumpurple":"#9370DB","darkviolet":"#9400D3","palegreen":"#98FB98","darkorchid":"#9932CC","yellowgreen":"#9ACD32","sienna":"#A0522D","brown":"#A52A2A","darkgray":"#A9A9A9","lightblue":"#ADD8E6","greenyellow":"#ADFF2F","paleturquoise":"#AFEEEE","lightsteelblue":"#B0C4DE","powderblue":"#B0E0E6","firebrick":"#B22222","darkgoldenrod":"#B8860B","mediumorchid":"#BA55D3","rosybrown":"#BC8F8F","darkkhaki":"#BDB76B","silver":"#C0C0C0","mediumvioletred":"#C71585","indianred ":"#CD5C5C","peru":"#CD853F","chocolate":"#D2691E","tan":"#D2B48C","lightgray":"#D3D3D3","thistle":"#D8BFD8","orchid":"#DA70D6","goldenrod":"#DAA520","palevioletred":"#DB7093","crimson":"#DC143C","gainsboro":"#DCDCDC","plum":"#DDA0DD","burlywood":"#DEB887","lightcyan":"#E0FFFF","lavender":"#E6E6FA","darksalmon":"#E9967A","violet":"#EE82EE","palegoldenrod":"#EEE8AA","lightcoral":"#F08080","khaki":"#F0E68C","aliceblue":"#F0F8FF","honeydew":"#F0FFF0","azure":"#F0FFFF","sandybrown":"#F4A460","wheat":"#F5DEB3","beige":"#F5F5DC","whitesmoke":"#F5F5F5","mintcream":"#F5FFFA","ghostwhite":"#F8F8FF","salmon":"#FA8072","antiquewhite":"#FAEBD7","linen":"#FAF0E6","lightgoldenrodyellow":"#FAFAD2","oldlace":"#FDF5E6","red":"#FF0000","fuchsia":"#FF00FF","magenta":"#FF00FF","deeppink":"#FF1493","orangered":"#FF4500","tomato":"#FF6347","hotpink":"#FF69B4","coral":"#FF7F50","darkorange":"#FF8C00","lightsalmon":"#FFA07A","orange":"#FFA500","lightpink":"#FFB6C1","pink":"#FFC0CB","gold":"#FFD700","peachpuff":"#FFDAB9","navajowhite":"#FFDEAD","moccasin":"#FFE4B5","bisque":"#FFE4C4","mistyrose":"#FFE4E1","blanchedalmond":"#FFEBCD","papayawhip":"#FFEFD5","lavenderblush":"#FFF0F5","seashell":"#FFF5EE","cornsilk":"#FFF8DC","lemonchiffon":"#FFFACD","floralwhite":"#FFFAF0","snow":"#FFFAFA","yellow":"#FFFF00","lightyellow":"#FFFFE0","ivory":"#FFFFF0","white":"#FFFFFF"};


function hex2rgb(hexCode){
	var hexR = hexCode.substring(0, 2);
	var hexG = hexCode.substring(2, 4);
	var hexB = hexCode.substring(4, 6);
	var R = parseInt(hexR,16);
	var G = parseInt(hexG,16);
	var B = parseInt(hexB,16);
	return R + ',' + G + ',' + B;
}
function hex2rgba(hexCode){
	return hex2rgb(hexCode) + ',1';
}

function rgb2hex(rgbArray){
	var hexR = rgbArray[0].toString(16);
	if (hexR.length<2) { hexR = '0' + hexR; };
	var hexG = rgbArray[1].toString(16);
	if (hexG.length<2) { hexG = '0' + hexG; };
	var hexB = rgbArray[2].toString(16);
	if (hexB.length<2) { hexB = '0' + hexB; };
	var hexGenerated = hexR + hexG + hexB;
	if (rgbArray[3]) {
		if (rgbArray[3] > 1) { rgbArray[3] = 1;};
		hexGenerated += ' + opacity:' + rgbArray[3] + ';';
	};
	return hexGenerated;
}

function splitRgb(codeToSplit){
	var splitted = codeToSplit.split("(");
	splitted = splitted[1].split(")");
	splitted = splitted[0].split(",");
	for (var i = splitted.length - 1; i >= 0; i--) {
		splitted[i] = parseInt(splitted[i]);
	};
	return splitted;
}

function eachAreBetween(array,min,max){
	for (var i = array.length - 1; i >= 0; i--) {
		if (array[i] > max || array[i] < min) {
			return false;
		};
	};
	return true;
}

function getCodeType(code){
	
	var check = true;
	var niceCode = [];

	if (code.length === 0){
		return 'empty';
	}else if (code.match(/^[a-zA-Z]+$/g) && !code.match(/^([0-9a-fA-F]{3}){1,2}$/g)){
		if (colorNames[code.toLowerCase()]){
			return 'color valid';
		}else if(code.toLowerCase() === 'unicorn'){
			return 'wtf';
		}else{
			return 'color invalid';
		}
	}else if (code.substring(0, 1) === '#' || code.match(/^([0-9a-fA-F]{3}){1,2}$/g)){
		if (code.match(/^(#([0-9a-fA-F]{3}){1,2})$/g) || code.match(/^([0-9a-fA-F]{3}){1,2}$/g)){
			return 'hex valid';
		}else{
			return 'hex invalid';
		}
	}else if(code.substring(0, 4) === 'rgba'){
		if(code.match(/rgba\([0-9]+,[0-9]+,[0-9]+,[0-9]*(\.[0-9]+)?\)/g)){
			var rgbaCode = splitRgb(code);
			check = eachAreBetween(rgbaCode,0,255);
		}else{
			check = false;
		}

		if (check){
			return 'rgba valid';
		}else{
			return 'rgba invalid';
		};
	}else if(code.substring(0, 3) === 'rgb'){
		if(code.match(/rgb\([0-9]+,[0-9]+,[0-9]+\)/g)){
			var rgbCode = splitRgb(code);
			check = eachAreBetween(rgbCode,0,255);
		}else{
			check = false;
		}

		if (check){
			return 'rgb valid';
		}else{
			return 'rgb invalid';
		};
	}else{
		return false;
	}
	return false;
}




function cleanTags(){
	$('.tag').each(function (e) {
		e.classList.remove('valid');
		e.classList.remove('invalid');
	});
}



$(function () {
    $('#input').on("keyup",function(){

    	var code = this.value.replace(/\s+/g, '');
    	var codeType = getCodeType(code);
    	if(codeType){
    		if (codeType === 'empty') {
	    		cleanTags();
	    		$('#hex')[0].innerHTML = '#';
	    		$('#rgb')[0].innerHTML = 'rgb(,,)';
	    		$('#rgba')[0].innerHTML = 'rgba(,,,)';
    		}else if (codeType === 'wtf'){
		    	cleanTags();
	    		$('#hex')[0].innerHTML = '#wtfUnicorn' ;	
	    		$('#rgb')[0].innerHTML = 'rgb(W,T,F)' ;	
	    		$('#rgba')[0].innerHTML = 'rgba(W,T,F,?)' ;	
    		}else{

	    		//$('#iguess')[0].innerHTML = 'detected as ' + codeType;
	    		var codeTypeArray = codeType.split(' ');
	    		var id = '#tag-' + codeTypeArray[0].toLowerCase();
	    		cleanTags();
	    		$(id)[0].classList.add(codeTypeArray[1]);

    			if (codeTypeArray[0] === 'hex' && codeTypeArray[1] === 'valid') {
	    			code = code.replace('#','');
		    		$('#hex')[0].innerHTML = '#' + code.toUpperCase();
	    			if(code.length === 3) code = code.substring(0, 1) + code.substring(0, 1) + code.substring(1, 2) + code.substring(1, 2) + code.substring(2, 3) + code.substring(2, 3);
		    		$('#rgb')[0].innerHTML = 'rgb(' + hex2rgb(code) + ')';
		    		$('#rgba')[0].innerHTML = 'rgba(' + hex2rgba(code) + ')';
	    		}else if ( (codeTypeArray[0] === 'rgb' || codeTypeArray[0] === 'rgba' )  && codeTypeArray[1] === 'valid') {
						var rgbSplittedCode = splitRgb(code);
						var R = rgbSplittedCode[0];
						var G = rgbSplittedCode[1];
						var B = rgbSplittedCode[2];
			    		$('#hex')[0].innerHTML = '#'+ rgb2hex(rgbSplittedCode);
			    		$('#rgb')[0].innerHTML = 'rgb(' + R + ',' + G + ',' + B + ')';
			    		$('#rgba')[0].innerHTML = 'rgba(' + R + ',' + G + ',' + B + ',?)';
	    		}else if ( codeTypeArray[0] === 'color' && codeTypeArray[1] === 'valid'){
		    		$('#hex')[0].innerHTML = colorNames[code.toLowerCase()];
		    		$('#rgb')[0].innerHTML = 'rgb(,,)';
		    		$('#rgba')[0].innerHTML = 'rgba(,,,)';
	    		}else{
		    		$('#hex')[0].innerHTML = '#undefined';
		    		$('#rgb')[0].innerHTML = 'rgb(,,)';
		    		$('#rgba')[0].innerHTML = 'rgba(,,,)';
	    		}
	    	}
    	}else{
	    	cleanTags();
    		$('#hex')[0].innerHTML = '#undefined' ;	
    		$('#rgb')[0].innerHTML = 'rgb(,,)' ;	
    		$('#rgba')[0].innerHTML = 'rgba(,,,)' ;	
    	}


    	//base = base.substring(0, 1) + base.substring(0, 1) + base.substring(1, 2) + base.substring(1, 2) + base.substring(2, 3) + base.substring(2, 3);
    		
    });
});


