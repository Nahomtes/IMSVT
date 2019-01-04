var inJson = {};
var pageId = "home";
var timeStamp = "";

$(document).ready(function (){

	var cn = '<table width=100% border=1>';
	cn += '<tr><td id=header class=header></td></tr>';
	cn += '<tr><td id=nav class=nav></td></tr>';
	cn += '<tr><td id=main class=main></td></tr>';
	cn += '<tr><td id=btn class=btn></td></tr>';
	cn += '<tr><td id=footer class=footer></td></tr>';
	cn += '</table>';

	$('body').html(cn);
	//hd = ' <div style="width:90%; margin:auto; text-align:right; background:transparent;"><div style="float:left;"><a href="#" class="lang">login</a></div><a href="#" class="lang">English</a></div>'
	//hd += ' <div stSyle="background:transparent; padding:10px 0px;"><div style="width:90%; margin:auto;"><a href="/project-3/index.html"><img src="/test/image/low.png" class="logo"></a><div class="logoName">Hamere Noah St. Mary Eritrean Tewahedo Orthodox Church</div></div></div>'

	hd = '<h2>church ims</h2>'
	
	$('#header').html(hd);

	nv = '<div class="dropdown" align="center" >'
	nv += '<a id=home class=mainmenu> Home </a> | '
	nv += '<a id=stat class=mainmenu> Statitics </a> '
	nv += '</div>'
	$('#nav').html(nv);

	
	inJson = {"svc":"getJson.py", "pageid":pageId, "action":"getfirstpage"}
	setMainRow(inJson);

	

});


//////////////////////////
$(document).on('click', '.mainmenu', function (event) {
        event.preventDefault();
	
	pageId = $(this).attr("id");
		
	inJson = {"svc":"getJson.py", "pageid":pageId, "action":"getfirstpage"}
	setMainRow(inJson);
	
});


//////////////////////////
$(document).on('click', '.submitbtn', function (event) {
        event.preventDefault();

	var btnId = $(this).attr("id");		
	inJson = {"svc":"getJson.py", "pageid":pageId}
	if (btnId == "submitsvc"){
		//alert("Hello! I am an alert box!!");
		inJson["action"] = "getsecondpage";
		inJson["servicetype"] = $( "select[name='servicetype']").val();		
	}
	else if (btnId == "submitxx"){
		inJson["action"] = "getthirdpage";
		//inJson["servicetype"] = $( "select[name='servicetype']").val();
		inJson["whichSunday"] = $( "select[name='whichSunday']").val();
		inJson["time"] = $( "select[name='time']").val();
		inJson["textarea1"] = $("#textarea1").val();
		inJson["numberOfPeople"] = $( "select[name='numberOfPeople']").val();
		inJson["whichService"] = $( "select[name='whichService']").val();
		inJson["ageGroup"] = $( "select[name='ageGroup']").val();
		inJson["serviceDate"] = $( "select[name='serviceDate']").val();
		
	}
	else if (btnId == "submitfn"){
		inJson["action"] = "getfourthpage";
		//inJson["servicetype"] = $( "select[name='servicetype']").val();
		//inJson["whichSunday"] = $( "select[name='whichSunday']").val();
		//inJson["time"] = $( "select[name='time']").val();
		//inJson["textarea1"] = $("#textarea1").val();
		//inJson["numberOfPeople"] = $( "select[name='numberOfPeople']").val();
		//inJson["whichService"] = $( "select[name='whichService']").val();
		//inJson["ageGroup"] = $( "select[name='ageGroup']").val();
		//inJson["serviceDate"] = $( "select[name='serviceDate']").val();
		inJson["fname"] = $(".fname").val();
		inJson["lname"] = $(".lname").val();
		inJson["telephone"] = $(".telephone").val();
		inJson["email"] = $(".email").val();
		inJson["pcontact"] = $( "select[name='pcontact']").val();
		inJson["zipcode"] = $(".zipcode").val();
		
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
                if (reqObj.readyState == 4 && reqObj.status == 200) {
                        //console.log('response='+reqObj.responseText);
			var resJson = JSON.parse(reqObj.responseText);
                        if(resJson["taskStatus"] == 1){
				if (inJson["pageid"] == "home"){
					if (inJson["action"] == "getfirstpage"){
						var cn = renderFirstPage(resJson)
						$("#main").html(cn);
						
					}
					else if (inJson["action"] == "getsecondpage"){
						//alert("secondpage");
						if (inJson["servicetype"] == "lecture"){
							var cn = renderSecondPagelec(resJson,timeStamp)
							$("#main").html(cn);
						}
						if (inJson["servicetype"] == "teach"){
							var cn = renderSecondPagetea(resJson,timeStamp)
							$("#main").html(cn);
						}
						if (inJson["servicetype"] == "help"){
							var cn = renderSecondPagehel(resJson,timeStamp)
							$("#main").html(cn);
						}
						else if (inJson["servicetype"] == "drive"){
							var cn = renderSecondPagedri(resJson,timeStamp)
							$("#main").html(cn);
						}
						
					}
					else if (inJson["action"] == "getthirdpage"){
						//alert("third");
						var cn = renderThirdPage(resJson,timeStamp)
						$("#main").html(cn);
					}
					else if (inJson["action"] == "getfourthpage"){
						var cn = renderFourthPage(resJson,timeStamp)
						$("#main").html(cn);
					}
					
				}
				//else if (pageId == "stat"){
					//alert("stat page currently under constraction");
				//}
				
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
	timeStamp = gettimeStamp();
	var btnStyle = 'cursor:pointer;background:#ffff00;';
	var cn = '<table border=1>';
	cn += '<tr><td>What kind of volunteering service would you like to provide?</td></tr>';
	cn += '<tr><td>Please select</td></tr>';
	cn += '<tr><td>' + getSelector("servicetype", resJson["servicetype"]) +'</td></tr>';
	cn += '<tr><td><input id="time" type=hidden name=timeStamp value="'+timeStamp+'"></td></tr>';
	cn += '<tr><td id="submitsvc" class=submitbtn style="'+btnStyle+'">Step 1 of 3 >> Next</td></tr>';
	cn += '</table>';
				

	return cn;
}



//////////////////////////////////////////////
function renderSecondPagelec(resJson,timeStamp){

	//return JSON.stringify(resJson);
	var btnStyle = 'cursor:pointer;background:#ffff00;';
	var cn = '<table>';
	cn += '<tr><td>How long will the lecture be?</td></tr>';
	cn += '<tr><td>Choose how long you\'ll be giving a lecture for</td></tr>';
	cn += '<tr><td>' + getSelector("time", resJson["time"]) +'</td></tr>';
	cn += '<tr><td>On which sunday?</td></tr>';
	cn += '<tr><td>' + getSelector("whichSunday", resJson["whichSunday"]) +'</td></tr>';
	cn += '<tr><td>Give a brief description of what you will be teaching:</td></tr>';
	cn += '<tr><td><textarea id="textarea1"></textarea></td></tr>';
	cn += '<tr><td><input id="time" type=text name=timeStamp value="'+timeStamp+'"></td></tr>';
	
	cn += '<tr><td id="submitxx" class=submitbtn style="'+btnStyle+'">Step 2 of 3 >> Next</td></tr>';
	cn += '</table>';


	return cn;
}
//////////////////////////////////////////////
function renderSecondPagetea(resJson,timeStamp){

	//return JSON.stringify(resJson);
	var btnStyle = 'cursor:pointer;background:#ffff00;';
	var cn = '<table>';
	cn += '<tr><td>select the class you would like to teach</td></tr>';
	cn += '<tr><td>'+getSelector("ageGroup", resJson["ageGroup"])+'</td></tr>';
	cn += '<tr><td>select the date you would like to teach the class</td></tr>';
	cn += '<tr><td>'+getSelector("whichSunday", resJson["whichSunday"])+'</td></tr>';
	cn += '<tr><td><input id="time" type=text name=timeStamp value="'+timeStamp+'"></td></tr>';
	cn += '<tr><td id="submitxx" class=submitbtn style="'+btnStyle+'">Step 2 of 3 >> Next</td></tr>';
	cn += '</table>';


	return cn;
}
//////////////////////////////////////////////
function renderSecondPagehel(resJson,timeStamp){

	//return JSON.stringify(resJson);
	var btnStyle = 'cursor:pointer;background:#ffff00;';
	var cn = '<table>';
	cn += '<tr><td>Which Holiday would you like to volunteer on?</td></tr>';
	cn += '<tr><td>'+getSelector("serviceDate", resJson["serviceDate"])+'</td></tr>';
	cn += '<tr><td>which service would you like to provide?</tr></td>';
	cn += '<tr><td>'+getSelector("whichService", resJson["whichService"])+'</td></tr>';
	cn += '<tr><td><input id="time" type=text name=timeStamp value="'+timeStamp+'"></td></tr>';
	cn += '<tr><td id="submitxx" class=submitbtn style="'+btnStyle+'">Step 2 of 3 >> Next</td></tr>';
	cn += '</table>';


	return cn;
}
//////////////////////////////////////////////
function renderSecondPagedri(resJson,timeStamp){

	//return JSON.stringify(resJson);
	var btnStyle = 'cursor:pointer;background:#ffff00;';
	var cn = '<table>';
	cn += '<tr><td>Which Sunday are you available to drive?</td></tr>';
	cn += '<tr><td>'+getSelector("whichSunday", resJson["whichSunday"])+'</td></tr>';
	cn += '<tr><td>How many people are you able to drive?</td></tr>';
	cn += '<tr><td>'+getSelector("numberOfPeople", resJson["numberOfPeople"])+'</td></tr>';
	cn += '<tr><td><input id="time" type=text name=timeStamp value="'+timeStamp+'"></td></tr>';
	cn += '<tr><td id="submitxx" class=submitbtn style="'+btnStyle+'">Step 2 of 3 >> Next</td></tr>';
	cn += '</table>';


	return cn;
}
//////////////////////////////////////////////
function renderThirdPage(resJson,timeStamp){

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
	cn += '<tr><td><input id="time" type=text name=timeStamp value="'+timeStamp+'"></td></tr>';	
	cn += '<tr><td id="submitfn" class=submitbtn style="'+btnStyle+'">Step 3 of 3 >> Next</td></tr>';
	cn += '</table>';

	return cn;
}
////////////////////////////////////////////
function renderFourthPage(resJson,timeStamp){
	//var cn = '<tr><td><input id="time" type=text name=timeStamp value="'+timeStamp+'"></td></tr>';
	//cn += '';
	cn += "table"
	
	return JSON.stringify(resJson);
}
///////////////////////////////////////////
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function gettimeStamp(){
	var d = new Date();
	var h = addZero(d.getHours());
	var m = addZero(d.getMinutes());
	var s = addZero(d.getSeconds());
	var time = h + ":" + m + ":" + s;

	return time;
}
