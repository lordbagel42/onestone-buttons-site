/*
List ledger instance versions
GET: {{url}}/v1/ledgers/:ledgerName/instances/:scopeValue/versions
*/
export interface ListLedgerInstanceVersions { 
  replaced_before: string; 
  replaced_after: string; 
}