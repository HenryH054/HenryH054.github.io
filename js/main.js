
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
