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

function checkFavorites() {
	let dataSaved = localStorage.getItem("FavoritesList");

	if (dataSaved == null || dataSaved == Object || dataSaved == 'null') {
		localStorage.setItem("FavoritesList", JSON.stringify([]));
        updateFavorites();
	}

	if (dataSaved != null && dataSaved != "null") {
		updateFavorites();
	}
}

function dynamicIframe(url) {
	var particl = document.getElementById('tsparticles')
	var ifr = document.getElementById('ifr');

	[].forEach.call(document.querySelectorAll('.needHidden'), function (el) {
		el.remove();
	})
	particl.remove();
	ifr.visibility = 'visible';
	ifr.style = 'position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;';
	ifr.src = url;
}

function url_input(){
	var input = document.getElementById('urlInput').value;
	dynamicIframe(input);
}

function options_input(){
	var e = document.getElementById("MySelectMenu");
	var newSrc = e.options[e.selectedIndex].getAttribute("href");
	if (newSrc != "Blank") {
		dynamicIframe(newSrc);
	}
}

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
		console.log('Async: Successful ' + text + ' was copied to clipboard!');
	}, function (err) {
		console.error('Async: Could not copy ' + text + ' to clipboard: ', err);
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

function toggleVisablility(changeId) {
	var change = document.getElementById(changeId);
	if (change.style.display == 'block') {
		change.style.display = 'none'
	} else {
		change.style.display = 'block'
	}
}


function testDynamic(markId, localDataId, hideSection, bootmode = false, runFunction = false) {
	console.log(markId, localDataId, hideSection, bootmode, runFunction)
	let checkMark = document.getElementById(markId);
	if (bootmode == false) {
		if (checkMark.checked == true) {
			localStorage.setItem(localDataId, 'checked');

		} else if (checkMark.checked == false) {
			localStorage.setItem(localDataId, 'unchecked');
		}
	}

	let dataSaved = localStorage.getItem(localDataId);

	if (dataSaved == null || dataSaved == Object || dataSaved == 'null') {
		localStorage.setItem(localDataId, 'checked');
		checkMark.checked = true;
		if (runFunction != false) {
			if (runFunction == 'loadBackground') {
				loadBackground();
			}
			if (runFunction == 'checkFavorites') {
				checkFavorites();
			}
		}
	}

	if (dataSaved != null && dataSaved != "null") {
		var social = document.getElementById(hideSection);

		if (dataSaved == 'checked') {
			if (runFunction != false) {
				if (runFunction == 'loadBackground') {
					loadBackground();
				}
				if (runFunction == 'checkFavorites') {
					checkFavorites();
				}
			}
			checkMark.checked = true;
			localStorage.setItem(localDataId, 'checked');
			social.style.display = 'block';
		}
		else if (dataSaved == 'unchecked') {
			checkMark.checked = false;
			localStorage.setItem(localDataId, 'unchecked');
			social.style.display = 'none';
		}
	}
}

function updateFavorites() {
    const favorites = document.getElementById('container');
    let table = document.createElement('table');
    let testList = JSON.parse(localStorage.getItem('FavoritesList'));
    favorites.innerHTML = '';
    currentIndex = 0;
    for (let website of testList) {
        let a_element = document.createElement('a');
        let up_element = document.createElement('i');
        let down_element = document.createElement('i');
        let remove_element = document.createElement('i');
        let elements = document.createElement('tr');
        let a_td = document.createElement('td');
        let up_td = document.createElement('td');
        let down_td = document.createElement('td');
        let remove_td = document.createElement('td');

        a_element.innerHTML = website[0];
        a_element.setAttribute('onclick', `current('${website[1]}');`);
        
        if (currentIndex != 0) {
            up_element.setAttribute('class', 'fa-solid fa-up-long');
            up_element.setAttribute('onclick', `up(${currentIndex});`);
        }
        
        if (currentIndex != testList.length - 1) {
            down_element.setAttribute('class', 'fa-solid fa-down-long');
            down_element.setAttribute('onclick', `down(${currentIndex});`);
        }

        remove_element.setAttribute('class', 'fa-solid fa-xmark');
        remove_element.setAttribute('onclick', `remove(${currentIndex});`);
        
        remove_td.appendChild(remove_element);
        a_td.appendChild(a_element);
        up_td.appendChild(up_element);
        down_td.appendChild(down_element);

        elements.appendChild(remove_td);
        elements.appendChild(a_td);
        elements.appendChild(up_td);
        elements.appendChild(down_td);

        table.appendChild(elements);

        favorites.appendChild(table);

        currentIndex++
    }
}

function current(x){
    dynamicIframe(x);
}

function up(x){
    let testList = JSON.parse(localStorage.getItem('FavoritesList'));
    if (x <= testList.length - 1 && x >= 0) {
        let element = testList.splice(x, 1)[0];
        testList.splice(x - 1, 0, element);
    }
    localStorage.setItem("FavoritesList", JSON.stringify(testList));
    updateFavorites();
}

function down(x){
    let testList = JSON.parse(localStorage.getItem('FavoritesList'));
    if (x >= 0 && x <= testList.length - 1) {
        let element = testList.splice(x, 1)[0];
        testList.splice(x + 1, 0, element);
    }
    localStorage.setItem("FavoritesList", JSON.stringify(testList));
    updateFavorites();
}

function remove(x){
    let testList = JSON.parse(localStorage.getItem('FavoritesList'));
    testList.splice(x, 1);
    localStorage.setItem("FavoritesList", JSON.stringify(testList));
    updateFavorites();
}

function addFavorites() {
	var e = document.getElementById("MySelectMenu");
	var newSrc = e.options[e.selectedIndex];
	let testList = JSON.parse(localStorage.getItem('FavoritesList'));
	let addNewItem = [newSrc.innerHTML, newSrc.getAttribute("href")];

	if (testList.some(arr => JSON.stringify(arr) === JSON.stringify(addNewItem)) == false) {
		testList.push(addNewItem);
		localStorage.setItem("FavoritesList", JSON.stringify(testList));
	}
	updateFavorites();
}

function resetFavorites() {
    localStorage.setItem("FavoritesList", JSON.stringify([]));
    updateFavorites();
}

checkTitle();
checkIcon();
testDynamic('toggleBg', 'BackgroundAnimation', 'tsparticles', bootmode = true, runFunction = 'loadBackground');
testDynamic('toggleSc', 'SocialMedia', 'socialMedia', bootmode = true);
testDynamic('toggleEm', 'EmailMenu', 'contactSection', bootmode = true);
testDynamic('toggleAb', 'AboutSection', 'aboutSection', bootmode = true);
testDynamic('toggleFa', 'FavoritesMenu', 'favoritesMenu', bootmode = true, runFunction = 'checkFavorites');

document.getElementById('ManualVersion').innerHTML = "V1.26"

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

window.onload = function () {
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