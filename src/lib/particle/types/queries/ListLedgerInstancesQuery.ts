/*
List ledger instances
GET: {{url}}/v1/ledgers/:ledgerName/instances
*/
export interface ListLedgerInstances { 
  page: number; 
  perPage: number; 
}