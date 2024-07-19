
function showSection(sectionId) {
	// Get all sections
	const sections = document.querySelectorAll('.content-section');

	// Loop through each section
	sections.forEach(section => {
		// Hide all sections
		section.style.display = 'none';

		// Show the selected section
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

	// Check if stylesheet already exists
	if (document.styleSheets.length > 1) {
		existingNode = document.styleSheets[1].ownerNode;
	}

	if (existingNode) { // If stylesheet exists, remove it
		console.log(existingNode)
		existingNode.parentNode.removeChild(existingNode);
	} else { // If stylesheet does not exist, add it
		console.log("adding node")
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = href;
		document.getElementsByTagName('head')[0].appendChild(link);
	}
}

