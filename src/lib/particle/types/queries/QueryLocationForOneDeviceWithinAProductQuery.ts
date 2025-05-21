/*
Query location for one device within a product
GET: {{url}}/v1/products/:productIdOrSlug/locations/:deviceId
*/
export interface QueryLocationForOneDeviceWithinAProduct { 
  date_range: string; 
  rect_bl: string; 
  rect_tr: string; 
}