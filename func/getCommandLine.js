export async function getCommandLine() {
	const leagueClient = { riot: {}, lol: {} }
	try {
		const proc = Bun.spawnSync(["powershell", `wmic process where "name='LeagueClientUx.exe'" get CommandLine`]);
		const commandLine = proc.stdout.toString().split('\n')[1].split('\t')[0];
		leagueClient.pId = commandLine.match(/--app-pid=\d+/gi)[0].split("=")[1]; //Unused, using always latest version seems to cause "Header 84" errors *shrug*
		leagueClient.region = commandLine.match(/--region=\w+/gi)[0].split("=")[1].toLowerCase();
		leagueClient.riot.port = commandLine.match(/riotclient-app-port=\d+/gi)[0].split("=")[1];
		leagueClient.riot.token = btoa(`riot:${commandLine.match(/riotclient-auth-token=.{22}/gi)[0].split("=")[1]}`);
		leagueClient.lol.port = commandLine.match(/\-\-app-port=\w+/gi)[0].split("=")[1];
		leagueClient.lol.token = btoa(`riot:${commandLine.match(/remoting-auth-token=.{22}/gi)[0].split("=")[1]}`);
		return leagueClient;
	} catch (error) {
		console.error('Error:', error);
	}
}