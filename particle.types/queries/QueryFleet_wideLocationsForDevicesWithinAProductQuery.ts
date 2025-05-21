/*
Query fleet-wide locations for devices within a product
GET: {{url}}/v1/products/:productIdOrSlug/fleet_locations
*/
export interface QueryFleet_wideLocationsForDevicesWithinAProduct { 
  device_id: string; 
  device_name: string; 
  groups: string[]; 
}