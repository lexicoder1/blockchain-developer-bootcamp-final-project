import './App.css';
import React, {useState}  from 'react'; 

import Abi from './abistaking.json';
import tokenAbi from './abitoken.json';

const { ethers } = require("ethers");


function App() {

const [token,setToken]=useState()
const [staking,setStaking]=useState()


const [_approve,approve]=useState(false)
const [_approving,approving]=useState(true)
const [_approved,approved]=useState(true)
const [_loading,loading]=useState(false)
const [_loadings,loadings]=useState(false)
const [bal,checkbal]=useState()


const [ticker,setticker]=useState('usdt')


const [_provider,setprovider]=useState()

 
async function connect (){
  


 await window.ethereum.request({method:'eth_requestAccounts'});
 let  provider =  new ethers.providers.Web3Provider(window.ethereum);
//  localStorage.setItem('provider', ' new ethers.providers.Web3Provider(window.ethereum)')
//  let g= localStorage.getItem('provider')
//  var obj = JSON.parse(g)
setprovider(provider);
 console.log(provider);
 let _staking = new ethers.Contract(
  '0x26d5592E71D09B02C91c7Bb4C4952Bf9788Df702', //contract address
  Abi.abi, //abi code of our contract
  provider.getSigner(0) //signer object 
);
setStaking(_staking)
 

}

function set(){
  let address
 if (ticker==='usdt'){
    address='0xaD8b942802017066eD15e4d8a280A9B7b13e56c4'
 }
 if (ticker==='shibatoken'){
  address='0xFD9Cc74A721B528eAefEffd43DCF554805cB3D9f'
}
if (ticker==='dai'){
  address='0xcE5C3529E84a51fab4A3AA07cd10160b42015870'
}
if (ticker==='busd'){
  address='0xDA4C6Fc23137539c19a259D9E00CD04e63FFbfD4'
}

 let _token = new ethers.Contract(
  address, //contract address
  tokenAbi.abi, //abi code of our contract
  _provider.getSigner(0) //signer object 
); 
 
setToken(_token)
}



function   _stake(){
  approve(true)
  set()
  approving(false)
  
  
  
 }
 async function   _approves(){
  approving(true)
  loading(true)
  let tdx= await staking.checkBalance(ticker)

  let tx= await token.approve('0x26d5592E71D09B02C91c7Bb4C4952Bf9788Df702',tdx.toString())
  await tx.wait();
  console.log('gggddd')
  loading(false)
  approved(false)
 }

console.log('fff',ticker)
async function   _supply(){
  
  approved(true)
  loadings(true)

  let tdx= await staking.checkBalance(ticker)
  let tx= await staking.stake(tdx.toString(),ticker)
   await tx.wait();
   loadings(false)
   approve(false)

 
}

async function   _withdraw(){ 
set()
 await staking.withdraw(ticker)

 
}

async function   _checkbal(){ 
  set()
   let tx= await staking.checkBalance(ticker)
 
   console.log('ggg' ,tx.toString())
   let s=Math.pow(10,18)
   checkbal(tx.toString()/s)

  
   
  }
  async function   gettoken(){ 
    
     await staking.gettoken(ticker)   
    }

  return (
    <div className="App">
      <div className='d'>
        <div></div>
     <button onClick= {connect} className='btn btn-success'> CONNECT METAMASK</button>
     </div>
     
     
    <div className='g'>
      <div className='h'> 
     
     
      <br />
      
      <br />
     
      </div>
    
     {!_approve && <button className='btn btn-success h' onClick={ _stake}  > STAKE </button>}
     
      {!_approving && <div>  <button className='btn btn-success' onClick={_approves}> APPROVE </button> </div> }
      {_loading && <div> {'waiting........'} </div> }
      {!_approved && <div>  <button className='btn btn-success' onClick={_supply}> SUPPLYTOKEN </button> </div> }
       {_loadings && <div> {'waiting........'} </div> } 
      <br />
      
      <button className='btn btn-success' onClick={_withdraw}> WITHDRAW </button>
      <br />
      
      </div>
      <select onChange={(e)=>setticker(e.target.value)} name="" id="">
        <option value="usdt">usdt</option>
        <option value="shibatoken">shibatoken</option>
        <option value="dai">dai</option>
        <option value="busd">busd</option>
    </select>
   <br />
   
      <button className='btn btn-success' onClick={gettoken}>GETTOKEN</button>
<br />
<br />
       <h3>{bal} </h3>
      <button className='btn btn-success' onClick={_checkbal}>CHECKBALANCE</button>

      
      
     
    </div>
  );
}

export default App;
