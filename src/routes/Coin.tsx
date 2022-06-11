import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, Outlet, Routes, useMatch } from 'react-router-dom';
import { Route, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchInfo, fetchPrice } from '../api';
import Chart from './Chart';
import Price from './Price';
// interface RouteParams{
//     coinId: string,
    
// } ******useParams가 지알아서 string 가져오는디?.,. 뭐징
interface State{
    name: string,
}
const Container = styled.div`
    padding: 0 20px;
    max-width: 500px;
    margin: 0 auto;   // 1.width가 정의 돼 있어야함. 2. inline은 중앙정렬 x (ex. span tag)
    a{
        color: ${props => props.theme.textColor}
    }
`
const Header = styled.header`
    height: 20vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`
const BackButton = styled.div`
    position: absolute;
    top: 9vh;
    left: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    border: 2px solid ${props=>props.theme.textColor};
    
`
const Title = styled.h1`
    font-size: 30px;
    color: ${props => props.theme.accentColor};
`
const Loader = styled.div`
    text-align: center;
`
const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
`
const OverviewItem = styled.div`
    //스판 두개 가짐
    display: flex;
    flex-direction: column;
    align-items: center;

    span: first-child{
        font-size: 11px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 7px;
    }
`
const Description = styled.p`
    margin: 20px 0;
`

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0%;
    gap: 10px;
`
const Tab = styled.span<{ isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0,0,0,0.5);
    padding: 7px 0px;
    border-radius: 10px;
    
    a{
        display: block;
        color: ${(props) => props.isActive ? props.theme.accentColor : props.theme.textColor}
    }
`
interface Iinfo{
    id : string;
    name : string;
    symbol : string;
    rank : number;
    is_new : boolean;
    is_active : boolean;
    type : string;
    description : string;
    message : string;
    open_source : boolean;
    started_at : string;
    development_status : string;
    hardware_wallet : boolean;
    proof_type : string;
    org_structure : string;
    hash_algorithm : string;
    first_data_at : string;
    last_data_at : string;
}

interface Iprice{
    id : string;
    name : string;
    symbol : string;
    rank : number;
    circulating_supply : number;
    total_supply : number;
    max_supply : number;
    beta_value : number;
    first_data_at : string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    }
}



type IParams = { coinId: string; };
function Coin() {
    // const [loading,setLoading] = useState(false);
    
    const { coinId } = useParams() as IParams;
    const location = useLocation();
    const state = location.state as State; // router-dom 6버전이 제너릭을 지원하지 않음
    const { isLoading: infoLoading, data: infoData } = useQuery<Iinfo>(["info", coinId&& coinId], () => fetchInfo(coinId&& coinId));
    const { isLoading: priceLoading, data: priceData } = useQuery<Iprice>(["price", coinId && coinId], () => fetchPrice(coinId && coinId), {
        refetchInterval: 5000,
    });
    const matchChart = useMatch("/:coinId/chart");
    const matchPrice = useMatch("/:coinId/price");
    
    // const [info, setInfo] = useState<Iinfo>();
    // const [price, setPrice] = useState<Iprice>();
    // useEffect(() => {
    //     (async () => {
    //         const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
    //         const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();

    //         setInfo(infoData);
    //         setPrice(priceData);

    //         setLoading(false);// 페치(렌더)작업 끝나면 로딩 꺼주기
    //     })();
    // }, [coinId]);
    const loading = infoLoading || priceLoading;

    return (
        <Container>
            <Header>
                <BackButton>
                    <Link to={"/"} >&larr;</Link>
                </BackButton>
                <Title>{state?.name ? state.name : loading ? "Loading.." : infoData?.name }</Title>
            </Header>
            {/* 로딩 가미하여 컨테이너 구상 */}
            {loading ? (<Loader>Loading...</Loader>) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>
                                Rank:
                            </span>
                            <span>
                                {infoData?.rank}
                            </span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>
                                Symbol:
                            </span>
                            <span>
                                {infoData?.symbol}
                            </span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>
                                Price:
                            </span>
                            <span>
                                {"$"+priceData?.quotes.USD.price.toFixed(3)}
                            </span>
                        </OverviewItem>
                    </Overview>

                    <Description>
                        {infoData?.description}
                    </Description>

                    <Overview>
                        <OverviewItem>
                            <span>
                                Total Suply:
                            </span>
                            <span>      
                                {priceData?.total_supply}
                            </span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>
                                Max Suply:
                            </span>
                            <span>
                                {priceData?.max_supply}
                            </span>
                        </OverviewItem>
                    </Overview>
                    <Tabs>
                        <Tab isActive={matchChart !== null}>
                            <Link to="chart">To chart</Link>
                        </Tab>
                        <Tab isActive={matchPrice !== null}>
                            <Link to="price">To Price</Link>
                        </Tab>
                    </Tabs>
                    
                    
                </>
                
            )}
            
            <Outlet context={{coinId}}/>
        </Container>
    )
}
export default Coin;
