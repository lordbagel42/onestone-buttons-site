/*
Get all historical device vitals
GET: {{url}}/v1/diagnostics/:deviceId
*/
export interface GetAllHistoricalDeviceVitals { 
  start_date: string; 
  end_date: string; 
}