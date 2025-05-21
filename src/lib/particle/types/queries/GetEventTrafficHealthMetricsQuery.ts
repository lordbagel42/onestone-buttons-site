/*
Get event traffic health metrics
GET: {{url}}/v1/products/:productIdOrSlug/metrics/events
*/
export interface GetEventTrafficHealthMetrics { 
  start_date: string; 
  end_date: string; 
  bucket_size: number; 
  product_fw: number; 
  device_os_version: string; 
  device_group: string; 
}