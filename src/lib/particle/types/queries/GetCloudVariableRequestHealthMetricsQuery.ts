/*
Get cloud variable request health metrics
GET: {{url}}/v1/products/:productIdOrSlug/metrics/variables
*/
export interface GetCloudVariableRequestHealthMetrics { 
  start_date: string; 
  end_date: string; 
  bucket_size: number; 
  product_fw: number; 
  device_os_version: string; 
  device_group: string; 
}