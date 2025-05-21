/*
List devices in a product
GET: {{url}}/v1/products/:productIdOrSlug/devices
*/
export interface ListDevicesInAProduct { 
  deviceId: string; 
  groups: string; 
  deviceName: string; 
  serialNumber: string; 
  sortAttr: string; 
  sortDir: string; 
  quarantined: boolean; 
  page: number; 
  perPage: number; 
}