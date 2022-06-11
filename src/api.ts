
const BASE_URL = "https://api.coinpaprika.com/v1"
export function fetchCoins(){
    return fetch(`${BASE_URL}/coins`)
        .then((res) => res.json());
}
export function fetchInfo(coinId: string) {
    return fetch(`${BASE_URL}/coins/${coinId}`)
    .then((res) => res.json());
}
export function fetchPrice(coinId: string) {
    return fetch(`${BASE_URL}/tickers/${coinId}`)
    .then((res) => res.json());
}

export function fetchCoinHistory(coinId: string) {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60 * 60 * 23 * 7 * 3; 
    return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`)
    .then((res) => res.json());
}