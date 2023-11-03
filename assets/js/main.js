document.getElementById("submit").onclick = function () {
	var input = document.getElementById('urlInput');
	var submit = document.getElementById('submit');
	var particl = document.getElementById('tsparticles')
	var ifr = document.getElementById('ifr');
	var cmp = document.getElementById('compatibilityBox');

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
	var newSrc = e.options[e.selectedIndex].value;
	var input = document.getElementById('urlInput');
	var submit = document.getElementById('submit');
	var particl = document.getElementById('tsparticles')
	var ifr = document.getElementById('ifr');
	var cmp = document.getElementById('compatibilityBox');

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
		console.log('Async: Copying to clipboard was successful!');
	}, function (err) {
		console.error('Async: Could not copy text: ', err);
	});
}

function getLink() {
	var e = document.getElementById("MySelectMenu");
	var newSrc = e.options[e.selectedIndex].value;

	if (newSrc != "Blank") {
		var myClipboard = newSrc;
		copyTextToClipboard(myClipboard);
	}
}

function changeTitle() {
	var titleChange = document.getElementById("TitleInput");
	document.title = titleChange.value;
}

function isImage(url) {
	return /\.(jpg|jpeg|png|webp|avif|gif|svg|ico)$/.test(url);
}

function changeImage() {
	var imageChange = document.getElementById("ImageInput");
	if (isImage(imageChange.value)) {
		var existingFavicon = document.querySelector('link[rel="shortcut icon"]');
		var newFavicon = document.createElement('link');
		newFavicon.rel = 'shortcut icon';
		newFavicon.type = 'image/jpeg';
		newFavicon.href = imageChange.value;
	
		if (existingFavicon) {
			existingFavicon.href = newFavicon.href;
		} else {
			document.head.appendChild(newFavicon);
		}
	}
}

function resetWebsite() {
	document.getElementById('TitleInput').value = "";
	document.title = "Goguardian Bypass"
}

function resetIcon() {
	document.getElementById('ImageInput').value = "";
	var existingFavicon = document.querySelector('link[rel="shortcut icon"]');
	var newFavicon = document.createElement('link');
	newFavicon.rel = 'shortcut icon';
	newFavicon.href = 'assets/image/Logo.JPG';

	if (existingFavicon) {
		existingFavicon.href = newFavicon.href;
	} else {
		document.head.appendChild(newFavicon);
	}
}


window.addEventListener('beforeunload', function (e) {
	e.preventDefault();
	e.returnValue = '';
});

req = new XMLHttpRequest();
req.open('GET', 'https://raw.githubusercontent.com/GamerVerse722/GoGuardian-Bypass/main/assets/js/currentVersion.js');
req.onload = function () {
	eval(this.responseText + 'versionGrabber();');
};
req.send();