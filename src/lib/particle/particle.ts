class Particle {
	protected authKey: string;

	constructor(authKey: string) {
		this.authKey = authKey;
	}

	protected async getRequest(endpoint: string) {
		const response = await fetch(`https://api.particle.io/v1/${endpoint}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${this.authKey}`,
				'Content-Type': 'application/json'
			}
		});
		return response.json();
	}

	protected async postRequest(endpoint: string, data?: Record<string, string>) {
		const response = await fetch(`https://api.particle.io/v1/${endpoint}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${this.authKey}`,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams(data)
		});
		return response.json();
	}
}

export { Particle };
