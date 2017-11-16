var nameList,
	nameListReverse,
	userName,
	emailName,
	emailAddress,
	conf = {},
	blueButton = {},  
	greenButton = {}, 
	sliderButton = {},
	player,
	testString='',
	sliderNumber = 0,
	id_site = 'http://module/';

initInterval = setInterval(init, 2000);

function init(){
	//if(window.top.API){
		//nameList = window.top.API.LMSGetValue('cmi.core.student_name').replace(/\s/g,'').split(',');
		nameList = "Hernandez, Wolmar".replace(/\s/g,'').split(',');
		nameListReverse = nameList.reverse();
		userName = nameListReverse[0]+' ' + nameListReverse[1];
		emailName = userName[0].substr(0,1)+nameListReverse[1].replace(/\s/g,'');
		emailAddress = (emailName+'@gadventures.com').toLowerCase();
		player = GetPlayer();
		player.SetVar('matsCall','meow');
		matscall = player.GetVar('matsCall');
		conf = {
	    	"endpoint" : "http://saas.learninglocker.net/data/xAPI/",
	    	"auth" : "Basic " + toBase64('bfea751f323b3413a43f0131245416d160b8f9ce:354773d656af770bc935a77feb62aaa53b7e6c93')
	  	};	
	  	// blue button  		
  		blueButton = {
		    "actor": {  
		        "mbox": "mailto:"+emailAddress,  
		        "name": userName,  
		        "objectType": "Agent"  
		    },  
		    "verb": {  
		        "id": id_site,  
		        "display": {"en-US": "answered"}  
		    },  
		    "object": {  
		        "id": id_site,  
		        "definition": {  
		            "name": {"en-US": "Course 1"},  
		            "description": {"en-US": "Blue button"}  
		        },  
		        "objectType": "Activity"  
		    }  
      	};
	    // green button
  		greenButton = {
		    "actor": {  
		        "mbox": "mailto:"+emailAddress,  
		        "name": userName,  
		        "objectType": "Agent"  
		    },  
		    "verb": {  
		        "id": id_site+'green-button-clicked',  
		        "display": {"en-US": "answered"}  
		    },  
		    "object": {  
		        "id": id_site,  
		        "definition": {  
		            "name": {"en-US": "Course 1"},  
		            "description": {"en-US": "Green button clicked"}  
		        },  
		        "objectType": "Activity"  
		    },
			"result": {
			    "response":matscall
			}  
      	};
	    // slider
  		sliderButton = {
			  "actor": {
		        "mbox": "mailto:"+emailAddress,  
		        "name": userName,  
		        "objectType": "Agent" 
			  },
			  "verb": {
			    "id": id_site+'', 
			    "display": {"en-US": "interacted"}
			  },
			  "object": {
			    "id": id_site, 
			    "definition": {
			      "name": { "en-US": "Moving slider" }
			    }
			  },
			  "result": {
			    "completion": true,
			    "success": true,
			    "score": {
			      "scaled": 0
			    },
			    "response":testString,
			    "duration": 0.4
			  }
      	};
		clearInterval(initInterval);
	//}else{
		console.log('LMS has not been not initialized');
		//clearInterval(initInterval);
	//}
}

function toBase64(text){
  if(CryptoJS && CryptoJS.enc.Base64)
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Latin1.parse(text));
  else
    return Base64.encode(text);
}

function ExecuteScript(strId){
	switch (strId){
      case "6eFc1vXhs1K":
      	console.log('pressed blue');
	  	ADL.XAPIWrapper.changeConfig(conf);
		ADL.XAPIWrapper.sendStatement(blueButton);
        break;

      case "63s1zu15fdx":
      	console.log('pressed green');
      	console.log(player.GetVar('matsCall'));
      	//greenButton.result.response = String(sliderNumber);
        ADL.XAPIWrapper.changeConfig(conf);
		ADL.XAPIWrapper.sendStatement(greenButton);
        break;
      case "6l6qpCeCZsO":

      	sliderNumber = Number(player.GetVar('Slider1')/10);
      	console.log(sliderNumber);
      	sliderButton.result.score.scaled = sliderNumber; 
      	sliderButton.result.response = String(sliderNumber);
        ADL.XAPIWrapper.changeConfig(conf);
		ADL.XAPIWrapper.sendStatement(sliderButton);
        break;
    }
}
