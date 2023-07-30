import api from '@/lib/api'

export const fetchUSDCotation = async () => {
  const url = `https://economia.awesomeapi.com.br/last/USD-BRL`

  const { data } = await api.get(url)

  const formmatedData = {
    value: data.USDBRL.ask
  }

  return formmatedData.value
}

export const fetchBTCCotation = async () => {
  const url = `https://economia.awesomeapi.com.br/last/BTC-BRL`

  const { data } = await api.get(url)

  const formmatedData = {
    value: data.BTCBRL.ask
  }

  return formmatedData.value
}
