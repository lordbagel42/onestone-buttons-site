export interface ParticleDevice {
	id: string;
	name?: string;
	last_ip_address?: string;
	last_heard?: string;
	last_handshake_at?: string;
	product_id: number;
	online: boolean;
	platform_id: number;
	cellular: boolean;
	functions?: string[];
	variables?: Record<string, string>;
	status: string;
	serial_number: string;
	iccid: string;
	imei: string;
	mac_wifi: string;
	mobile_secret: string;
	system_firmware_version: string;
	firmware_product_id: number;
	groups?: string[];
	firmware_version?: number;
	desired_firmware_version?: number | null;
	targeted_firmware_release_version?: number;
	development: boolean;
	quarantined: boolean;
	denied: boolean;
	owner?: string;
}

export interface ParticleCustomer {
	id: string;
	username: string;
}

export interface ProductListResponse {
	devices: Array<ParticleDevice>;
	customers?: Array<ParticleCustomer>;
	meta?: {
		total_pages: number;
	};
}
