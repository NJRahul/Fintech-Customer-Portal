import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Account, Transaction, Payee, Loan, Card, Dispute, FraudAlert } from '../app/components/data'

function useTable<T>(table: string, mapRow: (r: any) => T, order = 'created_at') {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from(table)
      .select('*')
      .order(order, { ascending: false })
      .then(({ data: rows }) => {
        setData((rows ?? []).map(mapRow))
        setLoading(false)
      })
  }, [table])

  return { data, loading }
}

export function useAccounts() {
  return useTable<Account>('accounts', (r) => ({
    id: r.id,
    nickname: r.nickname,
    type: r.type,
    masked: r.masked,
    ifsc: r.ifsc,
    balance: Number(r.balance),
    status: r.status,
  }), 'created_at')
}

export function useTransactions() {
  return useTable<Transaction>('transactions', (r) => ({
    id: r.id,
    date: r.date,
    time: r.time,
    description: r.description,
    counterparty: r.counterparty ?? '',
    channel: r.channel,
    reference: r.reference ?? '',
    amount: Number(r.amount),
    status: r.status,
    accountId: r.account_id,
  }), 'created_at')
}

export function usePayees() {
  return useTable<Payee>('payees', (r) => ({
    id: r.id,
    name: r.name,
    handle: r.handle,
    bank: r.bank ?? '',
    rail: r.rail,
    status: r.status,
    addedOn: r.added_on,
  }), 'created_at')
}

export function useLoans() {
  return useTable<Loan>('loans', (r) => ({
    id: r.id,
    product: r.product,
    principal: Number(r.principal),
    outstanding: Number(r.outstanding),
    emi: Number(r.emi),
    rate: Number(r.rate),
    nextEmi: r.next_emi ?? '—',
    status: r.status,
  }), 'created_at')
}

export function useCards() {
  return useTable<Card>('cards', (r) => ({
    id: r.id,
    network: r.network,
    type: r.type,
    masked: r.masked,
    holder: r.holder,
    limit: Number(r.card_limit),
    used: Number(r.used),
    expiry: r.expiry,
    status: r.status,
  }), 'created_at')
}

export function useDisputes() {
  return useTable<Dispute>('disputes', (r) => ({
    id: r.id,
    ref: r.ref,
    txnRef: r.txn_ref ?? '',
    merchant: r.merchant,
    amount: Number(r.amount),
    raisedOn: r.raised_on,
    status: r.status,
  }), 'created_at')
}

export function useFraudAlerts() {
  return useTable<FraudAlert>('fraud_alerts', (r) => ({
    id: r.id,
    severity: r.severity,
    rule: r.rule,
    txn: r.txn ?? '',
    amount: Number(r.amount ?? 0),
    when: r.occurred_at,
    status: r.status,
  }), 'created_at')
}
