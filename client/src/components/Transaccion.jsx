import React,{useContext} from "react";
import  {TransaccionContext }  from "../context/TransactionContext.jsx";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddres";
import useFetch from "../hooks/useFetch";


const TransactionCard = ({addressTo, addressFrom, timestamp, message, keyword, amount, url})=>{
   const gifUrl = useFetch({keyword});
   
    return (
        <div className="bg-[#181918] m-4 flex flex-1
            2xl:min-w-[450px]
            2xl:max-w-[500px]
            sm:min-w-[270px]
            sm:max-w-[300px]
            flex-col p-3 rounded-md hover:shadow-2xl
        ">
            <div className="flex flex-col items-center w-full mt-3">
                <div className=" w-full mb-6 p-2">
                    <a href={`https://sepolia.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">Desde: {shortenAddress(addressFrom)}</p>
                    </a>
                    <a href={`https://sepolia.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">Para: {shortenAddress(addressTo)}</p>
                    </a>
                    <p className="text-white text-base">Monto: {amount} ETH</p>
                    {message &&(
                        <>
                            <br/>
                            <p className="text-white text-base">Mensaje: {message}</p>
                        </>
                    )}

                </div>
                    <img 
                    src={gifUrl || url}
                    alt="gif"
                    className="w-full h-64 2x:h-96 rounded-medium shadow-lg object-cover"
                    />    
                    <div className="bg-black p-3 px-5 w-max rounded-3x-l -mt-5 shadow-2xl">
                        <p className="text-[#37c7da] font-bold ">
                            {timestamp}
                        </p>
                    
                </div>
            </div>
        </div>
    );
}

const Transaccion = () =>{
    const {currentAccount, transactions} = useContext(TransaccionContext);
    return(
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {currentAccount ? (
                    <h3 className="text-white text-3xl text-center my-2 ">Ultimas Transacciones</h3>
                ) : (
                    <h3 className="text-white text-3xl text-center my-2 ">Conecte Su Cuenta para ver las ultimas transacciones</h3>    
                )}
                <div className="flex flex-wrap justify-center items-center mt-10">
                    {transaction.reverse().map((transaction,i)=>(
                        <TransactionCard key={i} {...transaction }/>
                    ))}
                </div>
                
            </div>
        </div>
    );
}

export default Transaccion;