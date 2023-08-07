document.getElementById("submit").onclick = function() {
  var input = document.getElementById('urlInput');
  var submit = document.getElementById('submit');
  var particl = document.getElementById('tsparticles')
  var ifr = document.getElementById('ifr');
  var cmp = document.getElementById('compatibilityBox');
	
	[].forEach.call(document.querySelectorAll('.needHidden'), function(el) {
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
		[].forEach.call(document.querySelectorAll('.needHidden'), function(el) {
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
	navigator.clipboard.writeText(text).then(function() {
		console.log('Async: Copying to clipboard was successful!');
	}, function(err) {
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

const optionsData = [
['Blank', 'Options'],
['https://defly.io', 'Defly.io'],
['https://diep.io', 'Diep.io'],
['https://drednot.io', 'Deep Space Airships'],
['https://funny-shooter22222.jimrush.repl.co/', 'Funny Shooter 2'],
['https://jklm.fun', 'JKLM.FUN'],
['https://paper-io.com', 'Paper.io'],
['https://shapez.io', 'Shapez'],
['https://smashkarts.io', 'Smash Karts'],
['https://sword-io-game.herokuapp.com/', 'Sword Battle'],
['https://www.lumpty.com/amusements/Games/Tetris/tetris.html', 'Tetris'],
['https://trex-runner.com', 'T-Rex Game'],
['https://venge.io', 'Venge.io'],
['https://zombsroyale.io/', 'Zombs Royal'],
['https://1v1.lol', '1v1.lol'],
['https://play2048.co', '2048'],
['https://8ball-pool.io', '8 Ball Pool'],
];

const select = document.getElementById('MySelectMenu');

for (let i of optionsData) {
    var option = document.createElement('option');
    option.value = i[0];
    option.text = i[1];
    select.appendChild(option);
}