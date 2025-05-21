/*
List SIM cards
GET: {{url}}/v1/sims
*/
export interface ListSIMCards { 
  iccid: string; 
  deviceId: string; 
  deviceName: string; 
  page: number; 
  perPage: number; 
}