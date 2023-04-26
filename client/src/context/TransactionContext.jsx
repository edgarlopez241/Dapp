import React, {useEffect,useState} from 'react';
import { ethers } from 'ethers';
import { contractAbi,contractAddres } from '../utils/constants';


export const TransactionContext = React.createContext();
const {ethereum} = window; 

const getEthereumContract = () =>{
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddres,contractAbi,signer);
    return transactionContract;
}

export const TransactionProvider = ({children}) =>{
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData,setFormData] = useState({addresTo:'', amount:'',keyword:'',message:''})
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount,setTransactionCount]=useState(localStorage.getItem('transactionCount'));
    const [transaction, setTransaction] = useState([]);

    const handleChange = (e,name)=>{
        setFormData((prevState)=>({...prevState, [name]: e.target.value}));
    };

    const getAllTransactions = async () =>{
        try {
            if(!ethereum) return alert("Por favor instale metamask");
            const transactionContract = getEthereumContract();
            const availableTransaction = await transactionContract.getAllTransactions();
            const structuredTransactions = availableTransaction.map((transaction)=>({
                addressTo:transaction.receiver,
                addresFrom:transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword:transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10**18)
            }))
            console.log(structuredTransactions)
            setTransaction(structuredTransactions);
        } catch (error) {
            console.log(error);
        }
    }

    const checkIfWalletisConnected = async ()=>{
       try {
            if(!ethereum)
                return alert("HEYY Instala Metamask");
        
            const accounts = await ethereum.request({method:'eth_accounts'});
        
            if(accounts.length){
                setCurrentAccount(accounts[0])
                getAllTransactions();
            } else{
                console.log("No Existe cuenta")
            }

       } catch (error) {
            console.log(error);
            throw new Error("No Hay Ethereums")
       }
    }


    const checkIftransactionExist = async () => {
        try {
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();
            
            window.localStorage.setItem("transactionCount",transactionCount)

        } catch (error) {
            console.log(error);
            throw new Error("No hay ethers")
        }
    }
    const connectWallet = async () =>{
        try {
            if(!ethereum)
        return alert("HEYY Instala Metamask");
        const accounts = await ethereum.request({method:'eth_requestAccounts'});
        setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No Hay Ethereums")
        }
    }

    const sendTransaction = async () =>{
        try {
            console.log("si se envio")
            if(!ethereum)
            return alert("Heyy instala Metamask");
            const {addressTo, amount, keyword,message}=formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEthers(amount);

            await ethereum.request({
                method:'eth_sendTransaction',
                params:[{
                    from: currentAccount,
                    to:addressTo,
                    gas:'0x5208',
                    value: parsedAmount._hex
                }]
            })
            
           const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());

        } catch (error) {
            console.log(error);
            throw new Error("No Hay Ethereums")
        }
    }
    useEffect(()=>{
        checkIfWalletisConnected();
        checkIftransactionExist();
    },[])
    
    return(
        <TransactionContext.Provider
         value={{connectWallet, currentAccount,
          formData, setFormData,handleChange,sendTransaction, transaction,isLoading}}>

            {children}
        </TransactionContext.Provider>
    )
}