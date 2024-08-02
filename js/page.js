// This is my own code: Henry Hutchinson
function showSection(sectionId) {
	const sections = document.querySelectorAll('.content-section');

	sections.forEach(section => {
		section.style.display = 'none';

		if (section.id === sectionId) {
			section.style.display = 'block';
		}
	});
}

document.getElementById("themeChange").addEventListener("click", function() {

	toggleStylesheet("./css/theme.css");
})

function toggleStylesheet(href) {
	var existingNode = null;

	if (document.styleSheets.length > 1) {
		existingNode = document.styleSheets[1].ownerNode;
	}

	if (existingNode) {
		console.log(existingNode)
		existingNode.parentNode.removeChild(existingNode);
	} else {
		console.log("adding node")
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = href;
		document.getElementsByTagName('head')[0].appendChild(link);
	}
}
