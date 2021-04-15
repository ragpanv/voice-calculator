function getHistory(){
	return document.getElementById("history-value").innerText;
}

function printHistory(num){
	document.getElementById("history-value").innerText=num;
}

function getOutput(){
	return document.getElementById("output-value").innerText;
}
function printOutput(num){
	 document.getElementById("output-value").innerText=getFormattedNumber(num);
}

function PrintOutput(num){
	if(num==""){
	document.getElementById("output-value").innerText=num;
	}
	else{
		document.getElementById("output-value").innerText=getFormattedNumber(num);
	}
}
function getFormattedNumber(num){
	if(num=="-"){
		return "";
	}
	var n=Number(num);
	var value=n.toLocaleString("en");
	return value;
}

function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}

var operator = document.getElementsByClassName("operator");
for(var i=0; i<operator.length; i++){
	operator[i].addEventListener('click',function(){
		if(this.id=="clear"){
			printHistory("");
			PrintOutput("");
		}
		else if(this.id=="backspace"){
			var output=reverseNumberFormat(getOutput()).toString();
			if(output){//if output has a value
				output= output.substr(0,output.length-1);
				PrintOutput(output);
			}
		}
		else{
			var output=getOutput();
			var history=getHistory();
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
				history=history.substr(0,history.length-1);
				}
			}
			if(output!="" || history!=""){
				//condition? true:false
				output=output==""? output:reverseNumberFormat(output);
				history=history+output;
				if(this.id=="="){
					var result=eval(history);
					printOutput(result);
					printHistory("");
				}
				else{
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
	});
}

var number=document.getElementsByClassName("number"); 

for(var i=0; i<number.length; i++){
	number[i].addEventListener('click',function(){
		var output=reverseNumberFormat(getOutput());
		if(output!=NaN){//if output is a number
			output=output+this.id;
			PrintOutput(output);
		}
	});
}

var microphone = document.getElementById('microphone');
microphone.onclick=function(){
	microphone.classList.add("record");
	var recognition = new (window. SpeechRecognition ||
		 window.webkitSpeechRecognition|| window. mozSpeechRecognition 
		 || window.msSpeechRecognition)();
		recognition.lang='en-US';
		recognition.start();
		operations={"plus":"+",
					"minus":"-",
					"multiply":"*",
					"multiplied":"*",
					"divide":"/",
					"divided":"/",
					"reminder":"%"}		
		recognition.onresult = function(event){
			var input = event.results[0][0].transcript;
			for(property in operations){
				input = input.replace(property, operations[property]);
			}
			document.getElementById("output-value").innerText=input;
			setTimeout(function(){
				evaluate(input);
			},2000);//2 sec
			microphone.classList.remove("record");
		}
}
function evaluate(input){
	try{
		var result = eval(input);
		document.getElementById("output-value").innerText = result;
	}
	catch(e){
		console.log(e);
		document.getElementById("output-value").innerText = "";
	}
}/*/*       name password   
function validate_reg(){
    var name=document.getElementById("name");
    var pass=document.getElementById("password");
    var regx=/abc/;

   if(name.value.trim() == "" || pass.value.trim() =="")
   {
        alert("no blank values allowed");
        document.getElementById("1text").style.visibility='visible';
        return false;
   }
   else if(pass.value.trim().length < 5)
   {
        alert("password is to short");
        return false;
   }
   else 
   return true;
}

function validate_reg(){
     var name=document.getElementById("name");
     var userid=document.getElementById("userid");
     var dob=document.getElementById("dob");
    // var g=document.forms.gender;
     //var valid=flase;
     var address=document.getElementById("address");
     var contact=document.getElementById("contact");
     var emial=document.getElementById("email").value;
     var b=document.getElementById("gender");
     var pass=document.getElementById("pass");
     var con_pass=document.getElementById("con_pass");
     var regx=/^[7-9][0-9]{9}$/;
     /*regx=[7-9][0-9]{9}          {9}=times      []=range
          \d - match any digit (   equal to [0-9])
          \w - match any word character (a-z,A-Z, 0-9 & _)
          \s - match whitespace character (eg- spaces & tabs)
          \t - match a tab only
     */
/*   if(name.value.trim() == ""){
         alert("Name is required");
         name.focus();
         name.select();
         return false;
    }

    if((name.value.search(/^[A-Za-z]+$/)!=0)  || name.value.trim().length <=2 || name.value.length >=20)
    {
         alert("please enter a valid name");
         name.focus();
         return false;
    }
    if(userid.value.trim() == ""){
            alert("User ID is required");
          userid.focus();
          return false;
     }
     if(dob.value.trim() == ""){
        alert("Date of Birth is required");
        dob.focus();
        return false;
     }
 /*    if(g.value)
     {
            for(var i=0; i<g.length; i++)
           {
                if(g[i].checked){
               valid=true;
               break;
                }
          }
           if(valid==false)
            {
                 alert("gender field is blank");
                 return false;
            }
     }*/

 /*   if(address.value.trim()=="" || address.value.trim().length<10)
    {
         alert("Address is required");
         address.focus();
         return false;
    }
    if(contact.value.trim()=="")
    {
         alert("Phone number is required");
         contact.focus();
         return false;
    }
   if(contact.value.search(/^[7-9][0-9]{9}$/)!=0)//(isNaN(contact.value))
     {
        alert("Please once check your contact number");
        contact.focus();
         return false;
     }
     if(emial.trim()=="")
     {
          alert("email is required");
          email.focus();
          return false;
     }
     if(email.trim()!="")
     {
       var regx=/^([a-z0-9\.-]+)@([a-z0-9]+).([a-z][a-z])$/;
       if(regx.test(email) ||email.indexOf('@')<=2)
           {
               alert("Please, once check your email");
               emial.focus();
               return false;
          }  
     
            //ragini@gmail.com       ragini@gmail.co
          if(email.charAt(email.length-4)!='.' && email.charAt(email.length-3)!='.')
          {
                 alert("invalid position of '.'");
                emial.focus();
                return false;
          }
     }
     
   /*  if(b.value=="0")
     {
          alert("please select the your blood type");
          return false;
     }
     if(pass.value!="")
     alert("your pass is "+pass);
    if(pass.value="" || pass.value.length<=3 || pass.value.length>10)
    {
         alert("please enter your password with minimum length 4");
         pass.focus();
         return false;
    }
    if(con_pass.value="")
    {
         alert("please repeat your password for confirmation");
         con_pass.focus();
         return false;
    }
     if(pass.value != con_pass.value)
     {
          alert("Please, once check your password, because they are not matching");
          con_pass.focus();
          return false;
     }
   
}*/

