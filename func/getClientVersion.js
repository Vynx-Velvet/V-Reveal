//Unused, but was good practice learning how to do.
export async function getClientVersion(pid) {
	try {
		const proc = Bun.spawnSync(["powershell", `(Get-Process -Id ${pid}).Path | Get-Item | Select-Object -ExpandProperty VersionInfo -ErrorAction SilentlyContinue | Select-Object -ExpandProperty FileVersion`]);
		const fileVersion = proc.stdout.toString();
		return fileVersion;
	} catch (error) {
		console.error('Error:', error);
	}
}
