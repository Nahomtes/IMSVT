var inJson = {};
var pageId = "home";
var timeStamp = "";
var action = "getfirstpage";

$(document).ready(function (){

	var cn = '<table width=100% border=1>';
	cn += '<tr><td id=header class=header></td></tr>';
	cn += '<tr><td id=nav class=nav></td></tr>';
	cn += '<tr><td id=main class=main></td></tr>';
	cn += '<tr><td id=btn class=btn></td></tr>';
	cn += '<tr><td id=footer class=footer></td></tr>';
	cn += '</table>';

	$('body').html(cn);
	hd = 'church web';
	hd = '<img src="image/church-logo.png" alt="Church Logo" style="width: 400px; height: 100px;"/>'
	   
	$('#header').html(hd);

	nv = '<div style="cursor:pointer;" align="center">'
	nv += '<a id=home class=mainmenu> Home </a> | '
	nv += '<a id=stat class=mainmenu> Statitics </a> '
	nv += '</div>'
	$('#nav').html(nv);

	   
	inJson = {"svc":"ims.py", "pageid":pageId, "action":action}
	setMainRow(inJson);

   
});


////////////////////Event Handler when you click mainmenu class////////////////////////
$(document).on('click', '.mainmenu', function (event) {
	event.preventDefault();
   
	pageId = $(this).attr("id");
	if(pageId == "home"){
		inJson = {"svc":"getJson.py", "pageid":pageId, "action":action}
	}
	else if(pageId == "stat"){
		inJson = {"svc":"getJson.py", "pageid":pageId}
	}

	setMainRow(inJson);
   
});


//////////////////////////
$(document).on('click', '.submitbtn', function (event) {
	event.preventDefault();

	var btnId = $(this).attr("id");       
	if (btnId == "2nd Page"){
		//alert("Hello! I am an alert box!!");
		inJson["action"] = "getsecondpage";
		inJson["serviceTypeObj"] = $( "select[name='serviceTypeObj']").val();
		inJson["timeStamp"] = gettimeStamp();
		console.log(inJson);   
	}
	else if (btnId == "3rd Page"){
		inJson["action"] = "getthirdpage";
		inJson["serviceDayObj"] = $( "select[name='serviceDayObj']").val();
		inJson["serviceDurationObj"] = $( "select[name='serviceDurationObj']").val();
		inJson["textarea1"] = $( "textarea[name='textarea1']").val();
		inJson["availableSitObj"] = $( "select[name='availableSitObj']").val();
		inJson["whichServiceObj"] = $( "select[name='whichServiceObj']").val();
		inJson["studentAgeGroupObj"] = $( "select[name='studentAgeGroupObj']").val();
		inJson["serviceDayObj"] = $( "select[name='serviceDayObj']").val();
		console.log(inJson);
	}
	else if (btnId == "4th Page"){
		inJson["action"] = "getfourthpage";
		inJson["fname"] = $( "input[name='fname']").val();
		inJson["lname"] = $( "input[name='lname']").val();
		inJson["telephone"] = $( "input[name='telephone']").val();
		inJson["email"] = $("input[name='email']").val();
		inJson["pcontact"] = $( "select[name='pcontact']").val();
		inJson["zipcode"] = $("input[name='zipcode']").val();
		console.log(inJson);
	}
	setMainRow(inJson);
   
});


///////////////////////////////////
function setMainRow(inJson){

	var url = '/cgi-bin/project-3/' + inJson["svc"];
	var reqObj = new XMLHttpRequest();
	reqObj.open("POST", url, true);
	reqObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	reqObj.svc = inJson["svc"];   
	reqObj.onreadystatechange = function() {
		//alert(reqObj.readyState)
		//alert(reqObj.status)
		if (reqObj.readyState == 4 && reqObj.status == 200) {
			var resJson = JSON.parse(reqObj.responseText);
			if(resJson["taskStatus"] == 1){
				if (inJson["pageid"] == "home"){
					if (inJson["action"] == "getfirstpage"){
						var cn = renderFirstPage(resJson)
						$("#main").html(cn);
					}
					else if (inJson["action"] == "getsecondpage"){
						//alert("secondpage");
						if (inJson["serviceTypeObj"] == "lecture"){
							var cn = renderSecondPagelec(resJson)
							$("#main").html(cn);
						}
						if (inJson["serviceTypeObj"] == "teach"){
							var cn = renderSecondPagetea(resJson)
							$("#main").html(cn);
						}
						if (inJson["serviceTypeObj"] == "help"){
							var cn = renderSecondPagehel(resJson)
							$("#main").html(cn);
						}
						else if (inJson["serviceTypeObj"] == "drive"){
							var cn = renderSecondPagedri(resJson)
							$("#main").html(cn);
						}
		               
					}
					else if (inJson["action"] == "getthirdpage"){
						//alert("third");
						var cn = renderThirdPage(resJson)
						$("#main").html(cn);
					}
					else if (inJson["action"] == "getfourthpage"){
						alert("Fourth Page");
						var cn = renderFourthPage(resJson)
						$("#main").html(cn);
					}
				
				}
				else if (pageId == "stat"){
					//alert("stat");
					var cn = renderStatPage(resJson)
					$("#main").html(cn);
				}
		       
			}
			else{
				alert("service " + this.svc + " said " + resJson["errorMsg"]);
			}
		}
		       
	};
	var sendData = 'injson='+JSON.stringify(inJson)
		reqObj.send(sendData);
		console.log('request='+sendData);

}



//////////////////////////////////////////////
function renderFirstPage(resJson){


	//return JSON.stringify(resJson);
	//timeStamp = gettimeStamp();
	var btnStyle = 'cursor:pointer;background:#ffff00;';
	var cn = '<table border=1>';
	cn += '<tr><td>What kind of volunteering service would you like to provide?</td></tr>';
	cn += '<tr><td>Please select</td></tr>';
	cn += '<tr><td>' + getSelector("serviceTypeObj", resJson["serviceTypeObj"]) +'</td></tr>';
	cn += '<tr><td id="2nd Page" class=submitbtn style="'+btnStyle+'">Step 1 of 3 >> Next</td></tr>';
	cn += '</table>';
               

	return cn;
}



//////////////////////////////////////////////
function renderSecondPagelec(resJson){

	//return JSON.stringify(resJson);
	var btnStyle = 'cursor:pointer;background:#ffff00;';
	var cn = '<table>';
	cn += '<tr><td>How long will the lecture be?</td></tr>';
	cn += '<tr><td>Choose how long you\'ll be giving a lecture for</td></tr>';
	cn += '<tr><td>' + getSelector("serviceDurationObj", resJson["serviceDurationObj"]) +'</td></tr>';
	cn += '<tr><td>On which sunday?</td></tr>';
	cn += '<tr><td>' + getSelector("serviceDayObj", resJson["serviceDayObj"]) +'</td></tr>';
	cn += '<tr><td>Give a brief description of what you will be teaching:</td></tr>';
	cn += '<tr><td><textarea name="textarea1"></textarea></td></tr>';
	cn += '<tr><td id="3rd Page" class=submitbtn style="'+btnStyle+'">Step 2 of 3 >> Next</td></tr>';
	cn += '</table>';


	return cn;
}
//////////////////////////////////////////////
function renderSecondPagetea(resJson){

	//return JSON.stringify(resJson);
	var btnStyle = 'cursor:pointer;background:#ffff00;';
	var cn = '<table>';
	cn += '<tr><td>select the class you would like to teach</td></tr>';
	cn += '<tr><td>'+getSelector("studentAgeGroupObj", resJson["studentAgeGroupObj"])+'</td></tr>';
	cn += '<tr><td>select the date you would like to teach the class</td></tr>';
	cn += '<tr><td>'+getSelector("serviceDayObj", resJson["serviceDayObj"])+'</td></tr>';
	cn += '<tr><td id="3rd Page" class=submitbtn style="'+btnStyle+'">Step 2 of 3 >> Next</td></tr>';
	cn += '</table>';


	return cn;
}
//////////////////////////////////////////////
function renderSecondPagehel(resJson){

	//return JSON.stringify(resJson);
	var btnStyle = 'cursor:pointer;background:#ffff00;';
	var cn = '<table>';
	cn += '<tr><td>Which Holiday would you like to volunteer on?</td></tr>';
	cn += '<tr><td>'+getSelector("serviceDayObj", resJson["serviceDayObj"])+'</td></tr>';
	cn += '<tr><td>which service would you like to provide?</tr></td>';
	cn += '<tr><td>'+getSelector("whichServiceObj", resJson["whichServiceObj"])+'</td></tr>';
	cn += '<tr><td id="3rd Page" class=submitbtn style="'+btnStyle+'">Step 2 of 3 >> Next</td></tr>';
	cn += '</table>';


	return cn;
}
//////////////////////////////////////////////
function renderSecondPagedri(resJson){

	//return JSON.stringify(resJson);
	var btnStyle = 'cursor:pointer;background:#ffff00;';
	var cn = '<table>';
	cn += '<tr><td>Which Sunday are you available to drive?</td></tr>';
	cn += '<tr><td>'+getSelector("serviceDayObj", resJson["serviceDayObj"])+'</td></tr>';
	cn += '<tr><td>How many people are you able to drive?</td></tr>';
	cn += '<tr><td>'+getSelector("availableSitObj", resJson["availableSitObj"])+'</td></tr>';
	cn += '<tr><td id="3rd Page" class=submitbtn style="'+btnStyle+'">Step 2 of 3 >> Next</td></tr>';
	cn += '</table>';


	return cn;
}
//////////////////////////////////////////////
function renderThirdPage(resJson){

	//return JSON.stringify(inJson);
	var btnStyle = 'cursor:pointer;background:#ffff00;';
	var cn = '<table width=100%>';
	cn += '<tr><td style="font-size:20px; font-weight:bold;" colspan="2">Please provide your contact information</td></tr>';
	cn += '<tr height="40">';
	cn += '<td style="font-weight:bold;" valign="bottom">First Name </td>';
	cn += '<td style="font-weight:bold;" valign="bottom">Last Name</td></tr>';
	cn += '<tr>';
	cn += '<td style="padding-right: 40px;">';
	cn += getInputhtml(resJson["fname"])+'</td>';
	cn += '<td style="padding-right: 40px;">';
	cn += getInputhtml(resJson["lname"])+'</td></tr>';
	cn += '<tr height="40">';
	cn += '<td style="font-weight:bold;" valign="bottom">Telephone</td>';
	cn += '<td style="font-weight:bold;" valign="bottom">Email</td></tr>';
	cn += '<tr>';
	cn += '<td style="padding-right: 40px;">';
	cn += getInputhtml(resJson["telephone"])+'</td>';
	cn += '<td style="padding-right: 40px;">';
	cn += getInputhtml(resJson["email"])+'</td></tr>';
	cn += '<tr height="40">';
	cn += '<td style="font-weight:bold;" valign="bottom">Contact Preference</td>';
	cn += '<td style="font-weight:bold;" valign="bottom">Zip Code</td></tr>';
	cn += '<tr>';
	cn += '<td style="padding-right: 40px;">';
	cn += getSelector("pcontact", resJson["pcontact"])+'</td>';
	cn += '<td style="padding-right: 40px;">';
	cn += getInputhtml(resJson["zipcode"])+'</td></tr>';
	cn += '<tr><td id="4th Page" class=submitbtn style="'+btnStyle+'">Step 3 of 3 >> Next</td></tr>';
	cn += '</table>';

	return cn;
}
////////////////////////////////////////////
function renderFourthPage(resJson){
	//return JSON.stringify(resJson);
	var cn = '<tr><td>Thank you for volunteering to serve the Congregration</td></tr>';
 	cn += '<tr><td>We\'ve received your information, we\'ll contact you through your '+inJson["pcontact"]+' for further information.</td></tr>';
   
	return cn;
}

////////////////////////////////////////////
function renderStatPage(resJson){
	//return JSON.stringify(resJson);
	/*var cn = '<table border=1>';
	var prev_d = "";
	for (var d in resJson){
		for (var t in resJson){
			//if (d == prev_d){var dd = "";}  else {d;}
			cn += '<tr><td style="text-align:center;">'+d+'</td><td style="text-align:center;">'+t+'</td><td style="text-align:center;"><button id="submitfn" class=submitbtn>'+1+'</button></td></tr>';
            prev_d = d;
		}
	}
	cn += '</table>';*/
	var cn = '<table width=100% border=1px>'
	cn += '<tr><th>Service Date</th><th>Service Type</th><th>Number of Volunteers</th></tr>'
   
	return cn;
}
///////////////////////////////////////////
function addZero(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}
//////////////////////////////////////////
function gettimeStamp(){
	var d = new Date();
	var h = addZero(d.getHours());
	var m = addZero(d.getMinutes());
	var s = addZero(d.getSeconds());
	var time = h + ":" + m + ":" + s;

	return time;
}
