/*
List ledger definitions
GET: {{url}}/v1/ledgers
*/
export interface ListLedgerDefinitions { 
  page: number; 
  perPage: number; 
  archived: boolean; 
}