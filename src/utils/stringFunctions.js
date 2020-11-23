export function getUserAccountName(displayName) {
	if (displayName !== undefined) {
		if (!displayName.includes('@') || !displayName.includes('.com')) {
			return displayName.replace(/ .*/, '');
		} else {
			return displayName.substr(0, displayName.indexOf('@'));
		}
	} else return null;
}
