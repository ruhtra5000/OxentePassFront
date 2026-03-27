import { format } from 'date-fns';

export function getS3URL(dado) {
  const s3BaseUrl = process.env.NEXT_PUBLIC_S3_URL || "";
  
  if (!s3BaseUrl) {
    return "/placeholder.png"; 
  }

  return s3BaseUrl.endsWith('/') ? `${s3BaseUrl}${dado}` : `${s3BaseUrl}/${dado}`;
}

export function converterDataHora (dataAlvo) {
    return format(new Date(dataAlvo), "dd/MM/yyyy - HH:mm")
}

export function converterData (dataAlvo) {
    return format(new Date(dataAlvo), "dd/MM/yyyy")
}