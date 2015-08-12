let body = document.body;

$(() => {
	ProperTable.Settings.set({
		language: 'en'
	});

	React.render(<ProperTable.Table />, body);
});