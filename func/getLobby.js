export async function getLobby(leagueClient) {
	try {
		const currentLobby = await (await fetch(`https://127.0.0.1:${leagueClient.riot.port}/chat/v5/participants`, leagueClient.riot.options)).json()
		return currentLobby;
	} catch (error) { console.log("Something broke fuck-face...Fix it: " + error + "\n" + error.stack + "\n" + error.message); return {} }
}