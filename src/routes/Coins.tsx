import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import { isDarkAtom } from './atoms';
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
    display: flex;
    justify-content: center;
    align-items: center;
`
const CoinList = styled.ul`
`
const Coin = styled.li`
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
    margin-bottom: 12px;
    padding: 20px;
    border-radius: 20px;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;

    a{
        display: flex;
        align-items: center;
        transition: color 0.25s ease-in;
    }
    &:hover{
        a{
            color: ${props => props.theme.accentColor };
        }
    }
`
const Title = styled.h1`
    font-size: 30px;
    color: ${props => props.theme.accentColor};
`
const Loader = styled.div`
    text-align: center;
`
const Img = styled.img`
    width : 25px;
    height: 25px;
    margin-right: 10px;
`
interface CoinInterface{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}
//렌더 -----------------------------------------------
//----------------------------------------------------
function Coins() {
    const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins)
    // const [coins, setCoins] = useState<CoinInterface[]>([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     (async () => {
    //         const res = await fetch("https://api.coinpaprika.com/v1/coins")
    //         const json = await res.json(); // it takes 40000 more crypto
            
    //         setCoins(json.slice(0, 100));
    //         setLoading(false);
    //     })();
    // },[])
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom(current => !current);
    return (
        
        <Container>
            <Header>
                <Title>CRYPTO</Title>
                <button onClick={toggleDarkAtom}>TOGGLE</button>
            </Header>
            {/* 로딩 가미하여 컨테이너 구상 */}
            {isLoading ? (<Loader>Loading...</Loader>) : (
                // 코인 리스트 맵으로
                <CoinList>
                    {data?.slice(0, 100).map(coin =>
                        <Coin key={coin.id}>
                            <Link to={`/${coin.id}`} state={{coinId: coin.id, name: coin.name}}>
                                {/* icon */}
                                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    )}
                </CoinList>
            )}
            
        </Container>
    )

}
export default Coins;