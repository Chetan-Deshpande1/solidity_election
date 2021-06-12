import React, { useEffect, useState } from 'react'
import Web3 from 'web3';


import ElectionABI from './contracts/Election.json'
import Navbar from './navbar'
import Body from './Body'


function App() {

  const [currentaccounts, setCurrentAccount] = useState('')
  const [loader, setLoader] = useState(true)
  const [electionsm, setElectionsm] = useState()
  const [candidate1, setCandidate1] = useState()
  const [candidate2, setCandidate2] = useState()

  useEffect(() => {

    loadWeb3();
    loadBlockchainData()
  }, [])


  const loadWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
    } else if (window.web3) {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      )

    }
    else {
      console.log("Non-Ethereum browser detected. You should consider trying MetaMask!")
    }
  };

  const loadBlockchainData = async () => {
    setLoader(true)
    const web3 = new Web3(window.web3.currentProvider)

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    setCurrentAccount(account)

    const networkId = await web3.eth.net.getId();
    const networkData = ElectionABI.networks[networkId];

    if (networkData) {
      const election = new web3.eth.Contract(ElectionABI.abi, networkData.address)
      setElectionsm(election)
      console.log(election);
      const candidate1 = await election.methods.candidates(1).call();
      const candidate1id = candidate1.id;
      const candidate1Name = candidate1.name;
      const candidate1VoteCount = candidate1.voteCount;
      const candidate2 = await election.methods.candidates(2).call();
      const candidate2id = candidate2.id;
      const candidate2Name = candidate2.name;
      const candidate2VoteCount = candidate2.voteCount;
      setCandidate1(candidate1)
      setCandidate2(candidate2)



      setLoader(false)
    } else {
      window.alert('smart contract is not deploed to current network')
    }
  }
  const voteCandidate = async (candidateid) => {
    setLoader(true)
    await electionsm.methods.vote(candidateid).send({ from: currentaccounts }).on('transactionhash', () => {
      console.log('sucessful log')
    })
    setLoader(false)

  }

  if (loader) {
    return <div>Loading..</div>
  }


  return (
    <div >
      <Navbar accounts={currentaccounts} />
      <Body candidate1={candidate1} candidate2={candidate2} voteCandidate={voteCandidate} />
    </div>
  );
}

export default App;
