import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import { isDarkAtom } from './atoms';
import { useRecoilValue } from 'recoil';
interface I{
    coinId: string;
}
interface IHistorical {
    time_open: string,
    time_close: string,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number,
    market_cap: number,
}
function Chart() {
    const {coinId} = useOutletContext<I>();
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
    const isDark = useRecoilValue(isDarkAtom);
    return <div>
        {isLoading ? "Loading chart"
            :
            <ApexChart
                type='line'
                series={[
                    {
                        name: 'Price',
                        data: [1,7,3,4,8,6,9]
                    },
                ]}
                options={{
                    theme: {
                        mode: isDark ? "dark" : "light",
                    },
                    chart: {
                        toolbar: {
                            show: false,
                        },
                        height: 300,
                        width: 500,
                        background: "transparent",
                    },
                    stroke: {
                        curve: "smooth",
                        width: 4,
                    },
                    grid: {
                        show: false,
                    },
                    xaxis: {
                        type:"datetime",
                        labels: { show: false, },
                        axisBorder: { show: false, },
                        axisTicks: { show: false, },
                        categories: [1,2,3,4,5,6,7]
                    },
                    yaxis: {
                        show:false,
                    },
                    colors: ["green"],
                    // 각각 apex에서 직접 찾아서 꾸미기 힘들면, 
                    // 데모 찾기
                }}
            />
        }
    </div>
}
export default Chart;