/*
Query location for devices within a product
GET: {{url}}/v1/products/:productIdOrSlug/locations
*/
export interface QueryLocationForDevicesWithinAProduct { 
  date_range: string; 
  rect_bl: string; 
  rect_tr: string; 
  device_id: string; 
  device_name: string; 
  groups: string[]; 
  page: number; 
  per_page: number; 
}