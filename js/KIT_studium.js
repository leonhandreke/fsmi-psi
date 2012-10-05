function setFormAction(actionString)
{
   document.forms["aspnetForm"].action = actionString;
}

function submitOnEnter(e,actionString)
{
    var keycode;
    if (window.event) keycode = window.event.keyCode;
    else if (e) keycode = e.which;
    else return true;

    if (keycode == 13)
    {
       setFormAction(actionString);
       document.forms["aspnetForm"].submit();
       return false;
    }
    
    else
       return true;
}

function checkFeatureSelection()
{
   var countChecked = 0;
   var i = 0;
   
   while ((countChecked == 0) && (i < document.forms[0].elements.Features.length))
   {
     if (document.forms[0].elements.Features[i].checked==true)
     {
       countChecked++;
     }
     
     i++;                                       
   }
   //check blank passwd
   if (checkPasswdField())
   {
       if (countChecked == 0)
       {
         alert("Bitte wählen Sie mindestens ein Modul aus.");
         return false;
       }
       
       else
       {
          //Nutzungsbedingungen
          if (agbAccepted())
          {
            return true;
          }
          else
          {
            alert("Bitte bestätigen Sie die Nutzungsbedingungen!");
          }
       }
   }
   else
   {
        alert("Das Passwortfeld für 'Vorlesungsunterlagen (geschützt)' darf nicht leer sein. \nBitte tragen Sie ein Passwort ein.");
        return false;
   }
}

function agbAccepted()
{
    
    var agbField = document.getElementById("Urheberrecht");
  
    if (agbField == null)
    {
        return true;
    }
    if (agbField.checked==true)
    {
        return true;
    }
    else
    {  
        return false;
    }

}

function checkPasswdField()
{
    var passwdField = document.getElementById("passwdField");
    var test = document.forms[0].elements.Features;
    
    if (document.forms[0].elements.Features[2].checked==true)
    {
        if (passwdField.value == "")
        {
            return false;
        }
        
        else
        {
            return true;
	    }
	}
	
	else
	{
	    return true;
	}
}

function prepareCreateWorkspaceSubmit(submitButton)
{
  if (checkFeatureSelection() == true)
  {
    submitButton.disabled = true;
    document.getElementById("BitteWartenHinweis").style.visibility = "visible";
    submitButton.form.submit();
  }
  
  else
  {
    return false;
  }
}

function shorten_anchor()
{
    anchors = new Array();
    var etc = '[...]';

    try 
    {
        anchors = document.getElementById(ctx.listName + '-' + ctx.view).getElementsByTagName('a');

        for (i = 0; i < anchors.length; i++)
        {
            if ((anchors[i].innerHTML.slice(0,6) == 'ftp://') || (anchors[i].innerHTML.slice(0,8) == 'https://') || (anchors[i].innerHTML.slice(0,7) == 'http://'))
            { 
                if (anchors[i].innerHTML.length > 25 && ctx.ListTitle == 'Literaturliste')
                {
                    anchors[i].innerHTML = anchors[i].innerHTML.slice(0,20) + etc;
                    anchors[i].target = '_blank';
                }
                else if (anchors[i].innerHTML.length > 50 && ctx.ListTitle == 'Links')
                {
                    anchors[i].innerHTML = anchors[i].innerHTML.slice(0,45) + etc;
                    anchors[i].target = '_blank';
                }
            }
        }
    }
    catch(ex) { }

    try 
    {
        anchors = document.getElementById('WebPartWPQ1').getElementsByTagName('a');
        
        for (i = 0; i < anchors.length; i++)
        {
            if ((anchors[i].innerHTML.slice(0,6) == 'ftp://') || (anchors[i].innerHTML.slice(0,8) == 'https://') || (anchors[i].innerHTML.slice(0,7) == 'http://'))
            { 
                if (anchors[i].innerHTML.length > 100)
                {
                    anchors[i].innerHTML = anchors[i].innerHTML.slice(0,75) + etc;
                    anchors[i].target = '_blank';
                }
            }
        }
    }
    catch(ex) { }
}

/* ---- JS added for StudyProgressWebPart on 08-01-08 by Stefan Link ---- */

// Speichert von welcher Prüfung fixiert wurde
var sticky_exam = "";
// Speichert die Nachricht mit der Anmerkung, dass man die Maus über die Prüfungen führen soll, um Details zu sehen
var standard_message = "";


// Blendet die Details der angeklcikten Prüfung und blendet die nicht benötigten Module aus
function showdetails(module_id, exam_id) {
	// Sichern der Standardnachricht mit Anmerkung, dass man die Maus über die Prüfungen führen soll, um Details zu sehen
	if(standard_message == "") {
			standard_message = document.getElementById("details").innerHTML;
	}	
	// wenn nicht fixiert wurde, dann zeige Details der Prüfung, wo die Maus ist
	if(sticky_exam == "") {
		document.getElementById("details").innerHTML = document.getElementById("d"+module_id+exam_id+"Details").innerHTML;
	}
}

// Fixieren des Inhalts des Details-Boxes
function stick_toggle(module_id, exam_id) {
	// nichts ist fixiert
	if(sticky_exam == "") {
		sticky_exam = module_id+exam_id;
		document.getElementById(module_id+exam_id).className = "sticky_exam";
	} 
	// Man möchte die Fixierung aufheben
	else if(sticky_exam == module_id+exam_id) {		
		document.getElementById(sticky_exam).className = "exam";
		sticky_exam = "";
	}
	// Man möchte eine andere Prüfung fixieren, dabei wird Fixierung vorher fixierten Prüfung aufgehoben
	else {
		document.getElementById(sticky_exam).className = "exam";
		document.getElementById(module_id+exam_id).className = "sticky_exam";
		sticky_exam = "";
		showdetails(module_id, exam_id);
		sticky_exam = module_id+exam_id;
	}
}

// wird nicht benutzt, weil es zum Flackern kommt, wenn man die Maus von einer zur anderen Prüfung führt
function showstandardmessage() {
	document.getElementById("details").innerHTML = standard_message;
}

// Script zur Layersteuerung
// Layer zeigen mit Verzoegerung durch:        pruefen(layerid,xposition,yposition,breite,hoehe,verzoegerung);
// Layer verstecken mit Verzoegerung durch:    layeraus(layerid,verzoegerung);
// Layer zeigen ohne Verzoegerung durch:       zeigen(layerid,xposition,yposition,breite,hoehe);
// Layer verstecken ohne Verzoegerung durch:   verstecken(layerid);
// Schrift- und Hintergrundfarbe setzen durch: farbe(layerid,schriftfarbe,hintergrundfarbe);
// xpos und ypos enthaelt die Mausposition
// Funktion pruefen schliesst einen anderen Layer der mit dieser Funktion geoeffnet wurde vorher

var ns4, ie4, ns6, posx, posy, xpos, ypos, px, py, breite, hoehe;
var alter = "";
var zeit, an, aus, aktuellx, aktuelly, kleben, ve;

ie4 = document.all;
ns6 = document.getElementById && !document.all;

function init() {
	document.ondblclick = startbewegen;
	document.onmousemove = koordinaten;
}
function pruefen(idname,xpo,ypo,breite,hoehe,verzoegerung)
{
	ve = verzoegerung;
	px = xpo;
	py = ypo;
	xb = breite;
	yb = hoehe;
	an = idname;
	clearTimeout(zeit);
	if (alter && alter != an)
        {
        	verstecken(alter);
        	zeit = setTimeout("zeigen(an,px,py,xb,yb)",ve);
         } else
        	zeit = setTimeout("zeigen(an,px,py,xb,yb)",ve);
	alter = idname;        
}
function layeraus(idname,verzoegerung)
{
	ve = verzoegerung;
	aus = idname;
	zeit = setTimeout("verstecken(aus)",ve);
	alter = idname;
}
function zeigen(idname,xpo,ypo,breite,hoehe) {
	if (ns6){ 
		if(document.getElementById(idname)) {
			document.getElementById(idname).style.left = xpo;
			document.getElementById(idname).style.top = ypo;
			if (breite > 0) document.getElementById(idname).style.width = breite;
			if (hoehe > 0) document.getElementById(idname).style.height = hoehe;
			document.getElementById(idname).style.visibility = "visible";
		}
	}
	if (ie4){
		if(document.all[idname]) {
			document.all[idname].style.left = xpo;
			document.all[idname].style.top = ypo;
			if (breite > 0) document.all[idname].style.width = breite;
			if (hoehe > 0) document.all[idname].style.height = hoehe;
			document.all[idname].style.visibility = "visible"; 
		}
	}
}
function verstecken(idname) {
	if (ie4) document.all[idname].style.visibility = "hidden"; 
	if (ns6) document.getElementById(idname).style.visibility = "hidden";
	alter = "";
}
function farbe(idname,farb,bgcol)
{
	if(ie4)
		if(document.all[idname]) {
			document.all[idname].style.color = farb;
			document.all[idname].style.background = bgcol;
		}		            
	if(ns6)
		if(document.getElementById(idname)) {
			document.getElementById(idname).style.color = farb;
			document.getElementById(idname).style.background = bgcol;
		}
}
function koordinaten(e) {
	xpos = (document.getElementById && !document.all) ? e.pageX : document.body.scrollLeft + event.clientX;
	ypos = (document.getElementById && !document.all) ? e.pageY : document.body.scrollTop + event.clientY;
}
function startbewegen(e){
	idname = ie4? event.srcElement.id : e.target.id;
	if (idname != "") {
		posx = ie4? event.clientX : e.clientX;
		posy = ie4? event.clientY : e.clientY;
		aktuellx = ns6? parseInt(document.getElementById(idname).style.left) : parseInt(document.all[idname].style.left);
		aktuelly = ns6? parseInt(document.getElementById(idname).style.top) : parseInt(document.all[idname].style.top);
		kleben = true;
		document.onmousemove = bewegen;
		document.ondblclick = new Function("kleben=false");
	}
}
function bewegen(e){
	koordinaten(e);
	if (kleben) {
		if (ie4){
			document.all[idname].style.left = aktuellx + event.clientX - posx;
			document.all[idname].style.top = aktuelly + event.clientY - posy;
		}
		if (ns6){ 
			document.getElementById(idname).style.left = Number(aktuellx + e.clientX - posx);
			document.getElementById(idname).style.top = Number(aktuelly + e.clientY - posy);
		}
	}
	else init();
	return true;
}

/***********************************************/
/* Hilfsteilfunktionen für Passwortüberprüfung */
/***********************************************/

function checkMinLength (password, minLength)
{
	if ( password.length < minLength ) {
		return false;
	} else {
		return true;
	}
}

function checkMaxLength (password, maxLength)
{
	if ( password.length > maxLength) {
		return false;
	} else {
		return true;
	}
}

function checkSpecialCharacters (password)
{
	var specialChars = new Array ('!', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~', ' ' );
	var counter = 0;

	for (var i = 0; i < specialChars.length; i++)
	{
		if (password.indexOf(specialChars[i]) != -1)
			counter++;
	}
	
	if (counter < 2)
	{
		return false;
	} 
	else 
	{
		return true;
	}
}

function checkWrongCharacters (password)
{
	var notAllowedChars = new Array ( '@', '#', '%', '"', '$' );
	var counter = 0;
	
	for (var i = 0; i < notAllowedChars.length; i++)
	{
		if (password.indexOf(notAllowedChars[i]) != -1)
			counter++;
	}
	
	if (counter > 0)
	{
		return false;
	}
	else 
	{
		return true;
	}
}

function checkBraces (password)
{
 if ((password.charAt(0)=='(' && password.charAt(password.length-1)==')') ||
 (password.charAt(0)=='[' && password.charAt(password.length-1)==']') ||
 (password.charAt(0)=='{' && password.charAt(password.length-1)=='}') ||
 (password.charAt(0)=='<' && password.charAt(password.length-1)=='>'))
            {
                            return false
            } else 
            {
                            return true
            }
}

function checkWhitespaces (password)
{
	if (password.match (/^\s|\s$/))
	{
		return false;
	}
	else
	{
		return true;
	}
}

function checkASCII (password)
{
	if (password.match ("^[\x20-\x7E]*$" ))
	{
		return true;
	}
	else
	{
		return false;
	}
}

function checkCharAndNumber (password)
{
	if ((password.toLowerCase().match("[a-z]")) && (password.match("[0-9]")))
	{
		return true;
	}
	else
	{
		return false;
	}
}

var TRUE  = new Boolean(true);
   var FALSE;
   var _ImgLst; 
   var vImgObj;
   var _Name;
   var _Vorname;
   var _Nachname;
var _auth_user;
   
function setUpn(upn) {

var FALSE = false; //new Boolean();
   _ImgLst = new Array(); 
   vImgObj = document.createElement("img");
   vImgObj.src = "/_layouts/studium/img/ok.jpg";
   vImgObj.border = "0";
   vImgObj.alt = "korrekt";
   _ImgLst[0] = vImgObj;   
   vImgObj = document.createElement("img");
  vImgObj.src = "/_layouts/studium/img/notok.jpg";
   vImgObj.border = "0";
   vImgObj.alt = "nicht korrekt";
   _ImgLst[1] = vImgObj;
   vImgObj = null;
   _Name = "???";
   _Vorname = "???";
   _Nachname= "???";
    _auth_user="???";

_auth_user=upn;
var vArray = _auth_user.split("@");
   if (vArray.length > 1) {
    _Name = vArray[0];
    if ( !isNaN( _Name.charAt(_Name.length-1) ) ) {
     var vIdx = _Name.length;
     for (var i = 0; i < _Name.length; i++) {
      if ( !isNaN( _Name.charAt(i) ) ) {
       vIdx = i;
       break;
      }
     }
     _Name = _Name.substring(0,vIdx);
    }
   }
   
   vArray = _Name.split("\.");
   if (vArray.length > 1) {
    _Vorname = vArray[0];
    _Nachname = vArray[1];
   }
   else if (vArray.length > 0) {
    _Nachname = vArray[0];
   }
   _Vorname  = _Vorname.toLowerCase();
   _Nachname = _Nachname.toLowerCase();
   }

   function actnChangeIcon(pObj, pOK) {
    if (pOK) 
        pObj.src="/_layouts/studium/img/ok.jpg";
<!--    pObj.replaceChild( _ImgLst[0].cloneNode(false), pObj.firstChild ); -->
    else
        pObj.src="/_layouts/studium/img/notok.jpg";
<!--    pObj.replaceChild( _ImgLst[1].cloneNode(false), pObj.firstChild ); -->
   }

   function checkPassword() {
    var newPW1 = document.getElementById('newpassword').value;
    var newPW2 = document.getElementById('newpassword2').value;
    document.getElementById('SubmitButton').disabled = !checkKITPassword(newPW1,newPW2);
   }

   function checkKITPassword(password, wiederholung) {
    var _result = TRUE;

    if (password != wiederholung) {
     _result = _result && FALSE;
     actnChangeIcon(document.getElementById('b09'), FALSE);
    }
    else 
     actnChangeIcon(document.getElementById('b09'), TRUE);
    
    if ( !checkMinLength(password, 6) || !checkMaxLength(password, 8)  ) {
     _result = _result && FALSE;
     actnChangeIcon(document.getElementById('b00'), FALSE);
    }
    else 
     actnChangeIcon(document.getElementById('b00'), TRUE);

    if ( !checkCharAndNumber(password)  ) {
     _result = _result && FALSE;
     actnChangeIcon(document.getElementById('b01'), FALSE);
    }

    else
     actnChangeIcon(document.getElementById('b01'), TRUE);

    if ( !checkSpecialCharacters(password)  ) {
     _result = _result && FALSE;
     actnChangeIcon(document.getElementById('b02'), FALSE);
    }
    else
     actnChangeIcon(document.getElementById('b02'), TRUE);

    if ( !checkWrongCharacters(password) ) {
     _result = _result && FALSE;
     actnChangeIcon(document.getElementById('b03'), FALSE);
    }
    else
     actnChangeIcon(document.getElementById('b03'), TRUE);

    if ( !checkBraces(password) ) {
     _result = _result && FALSE;
     actnChangeIcon(document.getElementById('b04'), FALSE);
    }
    else
     actnChangeIcon(document.getElementById('b04'), TRUE);

    if ( !checkWhitespaces(password) ) {
     _result = _result && FALSE;
     actnChangeIcon(document.getElementById('b05'), FALSE);
    }
    else
     actnChangeIcon(document.getElementById('b05'), TRUE);

    if ( !checkASCII (password) ) {
     _result = _result && FALSE;     actnChangeIcon(document.getElementById('b06'), FALSE);
    }
    else
     actnChangeIcon(document.getElementById('b06'), TRUE);

    if ( !checkVorNachname(password) ) {
     _result = _result && FALSE;
     actnChangeIcon(document.getElementById('b08'), FALSE);
    }
    else
     actnChangeIcon(document.getElementById('b08'), TRUE);

    return _result;   
   }

   function checkLengthEqual(pPswd1, pPswd2) {
    return (pPswd1.length != pPswd2.length);
   }

   function checkVorNachname(pPswd) {
    return ((pPswd.toLowerCase().indexOf(_Vorname) < 0)&&(pPswd.toLowerCase().indexOf(_Nachname) < 0));
   }





//"anmalen" aller Veranstaltungen im Veranstaltungskalender
function paintCalendarItems(){

	item_array2=getElementsByClass('ms-cal-dayitem');

	for(i=0; i<item_array2.length; i++){
		var textValue=item_array2[i].getElementsByTagName('b')[0].firstChild.nodeValue;
		if (textValue.substring(0,11)=="[Vorlesung]" || textValue.substring(0,11)=="[Vorl./Üb.]"){
			item_array2[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className="CalendarEventVorlesung";	    

		}
		else if (textValue.substring(0,11)=="[Praktikum]"){
			item_array2[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className="CalendarEventPraktikum";	    
		}
		else if (textValue.substring(0,7)=="[Übung]"){
			item_array2[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className="CalendarEventUebung";	    
		}		
		else if (textValue.substring(0,9)=="[Seminar]"){
			item_array2[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className="CalendarEventSeminar";	    
		}
		else{
			item_array2[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className="CalendarEvent";	    
		}
    	}
	

    	
    	
  }
  
  //Hilfsfunktion für paintCalendarItems()
  
  function getElementsByClass(klasse){
  var class_arr = new Array();
  var all_tags = document.getElementsByTagName("*");

  for(i=0; i<all_tags.length; i++){
    if(all_tags[i].className == klasse){
      class_arr.push(all_tags[i]);
    }
  }

  return class_arr;
}



//Drucken von WebParts (Kalender)

function PrintWebPart(WebPartElementID)
{
 var bolWebPartFound = false;
 if (document.getElementById != null)
 {
  //Create html to print in new window
  var PrintingHTML = '<HTML>\n<HEAD>\n';
  //Take data from Head Tag
  if (document.getElementsByTagName != null)
   {
   var HeadData= document.getElementsByTagName("HEAD");
   if (HeadData.length > 0)
    PrintingHTML += HeadData[0].innerHTML;
   }
  PrintingHTML += '\n</HEAD>\n<BODY style="background-color:#FFFFFF;background-image:none">\n';

  var WebPartData = document.getElementById(WebPartElementID);
  if (WebPartData != null)
  {
   PrintingHTML += WebPartData.innerHTML;
   bolWebPartFound = true;
  }
  else
  {
   bolWebPartFound = false;
   alert ('Cannot Find Web Part');
  }
 }
 PrintingHTML += '\n</BODY>\n</HTML>';
 //Open new window to print
 if (bolWebPartFound)
 {
  var PrintingWindow = window.open("","PrintWebPart", "toolbar,width=800,height=600,scrollbars,resizable,menubar");
  PrintingWindow.document.open();
  PrintingWindow.document.write(PrintingHTML);
  // Open Print Window
  PrintingWindow.print();
 }
}
