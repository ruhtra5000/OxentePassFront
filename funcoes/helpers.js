import { format } from 'date-fns';

export function getS3URL(dado) {
  return `${process.env.NEXT_PUBLIC_AWS_BASE_LINK}${dado}`
}

export function converterData (dataAlvo) {
    return format(new Date(dataAlvo), "dd/MM/yyyy - HH:mm")
}