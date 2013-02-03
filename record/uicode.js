  var audio_context;
  var recorder;
  var durationTimer=null;
  var keyLog=[];
  var durationTime=0;//unit:ms
  
	function startUserMedia(stream) {
		var input = audio_context.createMediaStreamSource(stream);
		console.log('Media stream created.');
    
		input.connect(audio_context.destination);
		console.log('Input connected to audio context destination.');
    
		recorder = new Recorder(input);
		console.log('Recorder initialised.');
  	}
	function durationCounter(){
		durationTime+=10;
		if(durationTime%1000==0)
			$("#status").html("Recording...("+(durationTime/1000)+" s)");
	}
	
	function startRecording(button) {
 	 	recorder && recorder.record();
 	 	$("#status").html("Recording...");
    	//duration time counter start
		durationTime=-10;
		durationCounter();
		durationTimer=setInterval(durationCounter,10);
    
		button.disabled = true;
		button.nextElementSibling.disabled = false;
		
	}


	function stopRecording(button) {
		recorder && recorder.stop();
    
		window.clearInterval(durationTimer);//remover durationTimer
		durationTimer=null;
    
		button.disabled = true;
		button.previousElementSibling.disabled = false;
		$("#status").html("Stopped recording.("+(durationTime/1000)+" s)");
    
		// create WAV download link using audio data blob
		createDownloadLink();
		recorder.clear();
	}

	function createDownloadLink() {
		recorder && recorder.exportWAV(function(blob) {
			var url = URL.createObjectURL(blob);
			var li = document.createElement('li');
			var au = document.createElement('audio');
			var hf = document.createElement('a');
	      
			au.controls = true;
			au.src = url;
			hf.href = url;
			hf.download = new Date().toISOString() + '.wav';
			hf.innerHTML = hf.download;
			li.appendChild(au);
			li.appendChild(hf);
			recordingslist.appendChild(li);
		});
	}

	$(function(){
		var voiceSubJSON='[{"time":2690,"msg":"afdvfjklas\\njaflkasf"},{"time":6100,"msg":"kasl;dfk\\nmklasf\\naaa\\nbbb"}]';
		voiceSubJSON=voiceSubJSON.replace(/\\n/g,"<br/>");
		var datas=$.parseJSON(voiceSubJSON);
		
		for(var i=0;i<datas.length;i++){
			var li =  document.createElement('li');			
			
			li.innerHTML=Math.floor(datas[i].time/1000)+"s:<br/>"+datas[i].msg;
				
			li.seektime=datas[i].time/1000;
			$("#commitList")[0].appendChild(li);
			li.addEventListener("click",function(){
				$("#player")[0].currentTime=this.seektime;
			},false);
		}
		
		$("#content").keydown(function(event){  	
	  		if(durationTimer!=null){
		  		if(event.which==13 && event.ctrlKey==true){ //Ctrl+Enter		  			
		  			keyLog.push({"time":durationTime,"msg":$("#content").val()});
		  			$("#output").html(JSON.stringify(keyLog));
		  			$("#content").val("");
		  		}
	  		}else{
	  			$("#output").html("Not starting record");
	  		}
	  	});
	  	$("#record").click(function(){startRecording(this)});
	  	$("#stop").click(function(){stopRecording(this)});
	  
		try {
			// webkit shim
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
			window.URL = window.URL || window.webkitURL;
	      
			audio_context = new AudioContext;
			console.log('Audio context set up.');
			console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
		} catch (e) {
			alert('No web audio support in this browser!');
		}
	    
		navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
			$("#output").html('No live audio input: ' + e);
	    });    
	});