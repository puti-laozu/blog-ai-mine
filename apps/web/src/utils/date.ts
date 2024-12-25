import { format, parseISO } from 'date-fns'

export function formatDate(date: string, formatStr = 'MMM dd, yyyy') {
  return format(parseISO(date), formatStr)
}

export function formatDateTime(date: string) {
  return format(parseISO(date), 'MMM dd, yyyy HH:mm')
}

export function getYear(date: string) {
  return format(parseISO(date), 'yyyy')
} 