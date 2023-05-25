import { IndeterminateCheckBoxRounded } from '@material-ui/icons';
import {createContext, useContext, useEffect, useState} from 'react';

export const CarrinhoContext = createContext();

CarrinhoContext.displayName = 'carrinho';

export const CarrinhoProvider = ({children}) => {
    const [carrinho, setCarrinho] = useState([]);
    const [quantidadeProdutos, setQuantidadeProdutos] = useState(0);
    return (
        <CarrinhoContext.Provider value={{carrinho, setCarrinho, quantidadeProdutos, setQuantidadeProdutos}}>
            {children}
        </CarrinhoContext.Provider>
    )
}

export const useCarrinhoContext = () => {
    const { carrinho, setCarrinho, quantidadeProdutos, setQuantidadeProdutos} = useContext(CarrinhoContext);

    function mudaQuantidade(id, quantidade) {
        return carrinho.map(itemDoCarrinho => {
            if(itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
            return itemDoCarrinho
        })
    }


        function addCar(novoProduto){
            const temOProd = carrinho.some(item => item.id === novoProduto.id)
            if(!temOProd){
            novoProduto.quantidade = 1;
            return setCarrinho(carrinhoAnt=> [...carrinhoAnt, novoProduto])
            }
        setCarrinho(mudaQuantidade(novoProduto.id, +1))
        }

        function removerProd(id) {
            const produto = carrinho.find(item => item.id === id);
            const ehOUltimo = produto.quantidade === 1;
            if(ehOUltimo){
                return setCarrinho(carrinhoAnt => carrinhoAnt.filter(itemDoCarrinho => itemDoCarrinho.id !== id));
            }
            setCarrinho(mudaQuantidade(id, -1))
        }

        useEffect(()=> {
            const novaQuantidade = carrinho.reduce((contador, produto) => contador + produto.quantidade, 0);
            setQuantidadeProdutos(novaQuantidade);
        }, [carrinho, setQuantidadeProdutos]);

    return {
        carrinho, 
        setCarrinho,
        addCar,
        removerProd,
        quantidadeProdutos,
        setQuantidadeProdutos
    }


}