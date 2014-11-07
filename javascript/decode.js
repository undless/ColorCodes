
function cleanHexa(dirtyHexaCode){
	return dirtyHexaCode.replace(/[^a-fA-F0-9]+/g, "").toUpperCase();
}

function hexa2rgb(hexaCode){
	var hexaR = hexaCode.substring(0, 2);
	var hexaV = hexaCode.substring(2, 4);
	var hexaB = hexaCode.substring(4, 6);
	var R = parseInt(hexaR,16);
	var V = parseInt(hexaV,16);
	var B = parseInt(hexaB,16);
	return R + ',' + V + ',' + B;
}
function hexa2rgba(hexaCode){
	return hexa2rgb(hexaCode) + ',1';
}

function eachAreBetween(array,min,max){
	var integer = 0;
	for (var i = array.length - 1; i >= 0; i--) {
		integer = parseInt(array[i]);
		if (integer > max || integer < min) {
			return false;
		};
	};
	return true;
}



function getCodeType(code){
	
	var check = true;

	if (code.length === 0){
		return 'empty';
	}else if (code.substring(0, 1) === '#'){
		if (code.match(/^(#([0-9a-fA-F]{3}){1,2})$/g)){
			return 'HEX';
		}else{
			return 'invalid HEX';
		}
	}else if(code.substring(0, 4) === 'rgba'){
		if(code.match(/rgba\([0-9]+,[0-9]+,[0-9]+,[0-9]*(\.[0-9]+)?\)/g)){
			var rgbaCode = code.split("(");
			rgbaCode = rgbaCode[1].split(")");
			rgbaCode = rgbaCode[0].split(",");
			check = eachAreBetween(rgbaCode,0,255);
		}else{
			check = false;
		}

		if (check){
			return 'RGBA';
		}else{
			return 'invalid RGBA';
		};
	}else if(code.substring(0, 3) === 'rgb'){

		if(code.match(/rgb\([0-9]+,[0-9]+,[0-9]+\)/g)){
			var rgbCode = code.split("(");
			rgbCode = rgbCode[1].split(")");
			rgbCode = rgbCode[0].split(",");
			check = eachAreBetween(rgbCode,0,255);
		}else{
			check = false;
		}

		if (check){
			return 'RGB';
		}else{
			return 'invalid RGB';
		};
	}else{
		return '?';
	}
}







$(function () {
    $('#input').on("keyup",function(){

    	var code = this.value.replace(/\s+/g, '');
    	var codeType = getCodeType(code);
    	if(codeType){
    		$('#iguess')[0].innerHTML = 'detected as ' + codeType;
    	}else{
    		$('#iguess')[0].innerHTML = 'wut da hell did u wrote ?!';
    	}


    	var base = cleanHexa(this.value);

    	if (base.length === 6){
	    	if (base != this.value) {
	    		$('#didyoumean')[0].innerHTML = 'Did you mean "<b>' + base + '</b>" ?';
	    	};
    		//console.log('ok');
    		$('#rgb')[0].innerHTML = 'rgb(' + hexa2rgb(base) + ')';
    		$('#rgba')[0].innerHTML = 'rgba(' + hexa2rgba(base) + ')';
    	}else if (base.length === 3){
	    	if (base != this.value) {
	    		$('#didyoumean')[0].innerHTML = 'Did you mean "<b>' + base + '</b>" ?';
	    	};
    		//console.log('ok');
    		base = base.substring(0, 1) + base.substring(0, 1) + base.substring(1, 2) + base.substring(1, 2) + base.substring(2, 3) + base.substring(2, 3);
    		$('#rgb')[0].innerHTML = 'rgb(' + hexa2rgb(base) + ')';
    		$('#rgba')[0].innerHTML = 'rgba(' + hexa2rgba(base) + ')';
    	}else if (base.length < 6){
    		//console.log('pas assez');
    		$('#rgb')[0].innerHTML = 'rgb(,,)' ;
    		$('#rgba')[0].innerHTML = 'rgba(,,)' ;
    	}else if (base.length > 6){
    		//console.log('trop');
    		$('#rgb')[0].innerHTML = 'rgb(,,,)' ;	
    		$('#rgba')[0].innerHTML = 'rgba(,,,)' ;	
    	};
    });
});


