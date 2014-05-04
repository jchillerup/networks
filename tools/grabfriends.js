var i = setInterval(function(){
	window.scrollBy(0, 100000);

	if (document.getElementById('pagelet_timeline_medley_map') != null) {
		clearInterval(i);

		var target = $x("//*[@class=\"cover\"]/div/h2/a")[0];
		var tname = target.innerHTML;
		var tfb = target.href;

		var friends = $x("//ul/li/div/div/div/div/div/div/a");
		var result = "";

		for (i in friends) {
			var name = friends[i].innerHTML;
			var fb = friends[i].href;
	
			if (name.charAt(0) != "<") {
				var curName = tname + ";" + tfb + ";" + name + ";" + fb + "\n";
				result += curName;
			}
		}

		var textarea = document.createElement("textarea");
		textarea.style.position = "fixed";
		textarea.style.left = "10%";
		textarea.style.top = "100px";
		textarea.style.zIndex = "100000";
		textarea.style.height = "500px";
		textarea.style.width = "80%";
		textarea.innerHTML = result;
		document.body.appendChild(textarea);
		textarea.select();
	}
}, 100);



// $x('//*[@class="fsl fwb fcb"]/a')
