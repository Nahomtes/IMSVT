////////////////////////////////////
function getInputhtml(listHash){

	var cn = '<input class="'+listHash[0]+'" name="'+listHash[0]+'" type="'+listHash[1]+'" placeholder="'+listHash[2]+'" required=""></input>';
	return cn;
}
////////////////////////////
function getSelector(name, optHash){

	var cn = '<select class="serviceSelect" name='+name+' required>';
	cn += '<option value="" >-- selected</option>';
	for(var key in optHash) {
		cn += '<option value='+key+'>'+optHash[key]+'</option>';
	}
	cn += '</select>';
	return cn;

}
///////////////////////////////////////////////////////////
function rndrTable(inObj){
   
	var table='<table width=100% border=1>';
	for(var i in inObj){
		table += '<tr>';           
		for(var j in inObj[i]){
			table += '<td>' + inObj[i][j] + '</td>';
		}
		table += '</tr>';
	}
	table += '</table>';
	return table;
}

///////////////////////////////////////////////////////////
function rndrTableForm(objList){
	
	var table='<table width=100% border=1>';
	for(var i in objList){
		table += '<tr>';
		table += '<td>' + objList[i]["label"] + '</td>';
		var tmpObj = {"name":objList[i]["field"], "type":"text", "value":objList[i]["value"]};
		var txtBox = rndrHtmlElement(tmpObj);
		table += '<td>' + txtBox + '</td>';
		table += '</tr>';
	}
	table += '</table>';
	return table;
}


///////////////////////////////////////////////////////////
function rndrHtmlElement(inObj){

	var elm = '<input ';
	for(var att in inObj){
		elm += att + '=' + inObj[att] + ' ';
	}
	elm += '>';
	return elm;
}
/////////////////////////This function is used in crime.html////////////////////////////
function displayStatus(inObj){
	var pstyle = '"color: blue"';
	var cn = '<p>';
	var fname = inObj["fname"];
	var lname = inObj["lname"];
	if (fname != "" || lname != ''){

		if (inObj["fnamestatus"] || inObj["lnamestatus"]){
			cn += ''+fname+ ' is guilty';
		} else {
			cn += ''+lname+ ' is <span style="color: blue">not</span> guilty';
		}
	} else {
		cn += 'Please put your name on the box to see your results :)'	
	}
		
	cn += '</p>';

	return cn;
  
}
