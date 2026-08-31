function getNextTheme(themes, theme) {
	const index = themes.indexOf(theme);
	let targetTheme;

	if (index === themes.length - 1) {
		targetTheme = themes[0];
	} else {
		targetTheme = themes[index + 1];
	}

	return targetTheme;
}

export default getNextTheme;