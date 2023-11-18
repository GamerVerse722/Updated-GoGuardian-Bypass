console.clear();

function checkTitle() {
	let dataSaved = localStorage.getItem("ChangedTitle");

	if (dataSaved == null || dataSaved == Object || dataSaved == 'null') {
		localStorage.setItem("ChangedTitle", 'null');

	}
	
	if (dataSaved != null && dataSaved != "null") {
		document.getElementById("TitleInput").value = dataSaved;
		document.title = dataSaved;
	}
}

checkTitle();

function checkIcon() {
	let dataSaved = localStorage.getItem("ImageURL");

	if (dataSaved == null || dataSaved == Object || dataSaved == 'null') {
		localStorage.setItem("ImageURL", 'null');
	}

	if (dataSaved != null && dataSaved != 'null') {
		document.getElementById("ImageInput").value = dataSaved;
		changeImage(dataSaved);
	}
}

checkIcon();

function startIframe() {
	var input = document.getElementById('urlInput');
	var particl = document.getElementById('tsparticles')
	var ifr = document.getElementById('ifr');

	[].forEach.call(document.querySelectorAll('.needHidden'), function (el) {
		el.remove();
	})
	particl.remove();
	var inputVal;
	inputVal = input.value;
	ifr.visibility = 'visible';
	ifr.style = 'position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;';
	ifr.src = inputVal;
}

function newSrc() {
	var e = document.getElementById("MySelectMenu");
	var newSrc = e.options[e.selectedIndex].getAttribute("href");
	var particl = document.getElementById('tsparticles')
	var ifr = document.getElementById('ifr');

	if (newSrc != "Blank") {
		[].forEach.call(document.querySelectorAll('.needHidden'), function (el) {
			el.remove();
		});
		particl.remove();
		ifr.visibility = 'visible';
		ifr.style = 'position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;';
		ifr.src = newSrc;
	}
}

function fallbackCopyTextToClipboard(text) {
	var textArea = document.createElement("textarea");
	textArea.value = text;

	// Avoid scrolling to bottom
	textArea.style.top = "0";
	textArea.style.left = "0";
	textArea.style.position = "fixed";

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		console.log('Fallback: Copying text command was ' + msg);
	} catch (err) {
		console.error('Fallback: Oops, unable to copy', err);
	}

	document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(text);
		return;
	}
	navigator.clipboard.writeText(text).then(function () {
		console.log('Async: Successful '+ text +' was copied to clipboard!');
	}, function (err) {
		console.error('Async: Could not copy '+ text +' to clipboard: ', err);
	});
}

function getLink() {
	var e = document.getElementById("MySelectMenu");
	var newSrc = e.options[e.selectedIndex].getAttribute("href");

	if (newSrc != "Blank") {
		var myClipboard = newSrc;
		copyTextToClipboard(myClipboard);
	}
}

function changeTitle() {
	var titleChange = document.getElementById("TitleInput").value;
	localStorage.setItem("ChangedTitle", titleChange)
	document.title = titleChange;
}

function isImage(url) {
	return /\.(jpg|jpeg|png|webp|avif|gif|svg|ico)$/.test(url);
}

function changeImage(custom = false) {
	if (custom == false) {
		var imageURL = document.getElementById("ImageInput").value;
	} else {
		var imageURL = custom;
	}

	if (isImage(imageURL)) {
		var existingFavicon = document.querySelector('link[rel="shortcut icon"]');
		var newFavicon = document.createElement('link');
		newFavicon.rel = 'shortcut icon';
		newFavicon.type = 'image/jpeg';
		newFavicon.href = imageURL;
		
		localStorage.setItem("ImageURL", imageURL)

		if (existingFavicon) {
			existingFavicon.href = newFavicon.href;

		} else {
			document.head.appendChild(newFavicon);
		}
	}
}

function resetWebsite() {
	document.getElementById('TitleInput').value = "";
	localStorage.setItem("ChangedTitle", 'null')
	document.title = "Goguardian Bypass"
}

function resetIcon() {
	document.getElementById('ImageInput').value = "";
	var existingFavicon = document.querySelector('link[rel="shortcut icon"]');
	var newFavicon = document.createElement('link');
	newFavicon.rel = 'shortcut icon';
	newFavicon.href = 'assets/image/Logo.JPG';

	localStorage.setItem("ImageURL", null)

	if (existingFavicon) {
		existingFavicon.href = newFavicon.href;
	} else {
		document.head.appendChild(newFavicon);
	}
}

function fetchDataAndDownload() {
	// Fetch data from the URL
	const url = "https://raw.githubusercontent.com/GamerVerse722/Updated-GoGuardian-Bypass/main/github/localVersion.html";
	const fileName = "LocalVersion.html";
	fetch(url)
	  .then(response => response.blob()) // Get the response as Blob
	  .then(blob => {
		// Create a Blob from the response data
		const blobURL = URL.createObjectURL(blob);
  
		// Create a download link
		const downloadLink = document.createElement('a');
		downloadLink.href = blobURL;
		downloadLink.download = fileName; // Set the desired file name
		downloadLink.textContent = 'Click here to download'; // Optional text for the link
  
		// Append the download link to the document body
		document.body.appendChild(downloadLink);
  
		// Programmatically trigger a click event on the download link
		downloadLink.click();
  
		// Remove the download link from the document
		document.body.removeChild(downloadLink);
  
		// Revoke the Blob URL to free up resources
		URL.revokeObjectURL(blobURL);
	  })
	  .catch(error => {
		console.error('Error fetching data:', error);
	  });
  }

document.getElementById('ManualVersion').innerHTML = "V1.24"

req = new XMLHttpRequest();
req.open('GET', 'https://raw.githubusercontent.com/GamerVerse722/GoGuardian-Bypass/main/assets/js/currentVersion.js');
req.onload = function () {
	eval(this.responseText + 'versionGrabber();');
};
req.send();

window.addEventListener('beforeunload', function (e) {
	e.preventDefault();
	e.returnValue = '';
});

window.onload = function() {
	let newest = Number(document.getElementById("newestVersion").innerHTML.slice(1))
	let manual = Number(document.getElementById('ManualVersion').innerHTML.slice(1))
	console.log('Newest Version Avaliable: ' + newest)
	console.log('Current Version: ' + manual)
	if (manual < newest) {
		console.log("updated")
		document.getElementById('download-html-file').style.visibility = 'visible';
	} else {
		document.getElementById('download-html-file').style.visibility = 'hidden';
	}
}