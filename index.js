
// web3 provider with fallback for old version
if (window.ethereum) {
  window.web3 = new Web3(window.ethereum)
  try {
    // ask user for permission
    ethereum.enable()
    // user approved permission
  } catch (error) {
    // user rejected permission
    console.log('user rejected permission')
  }
}
else if (window.web3) {
  window.web3 = new Web3(window.web3.currentProvider)
  // no need to ask for permission
}
else {
  window.alert('In order to interact with the contract you must have an ethereum enabled browser!  Try MetaMask!')
}
console.log(window.web3.currentProvider)

const main_ContractAddress = '0xc629ee12d8Cbac8A43D15685E346A9fbDA06F5a1';
const main_ContractABI = JSON.parse('[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"burnActivated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"attack","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newContract","type":"address"},{"name":"contractName","type":"uint256"}],"name":"addContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"horcruxContracts","outputs":[{"name":"diary","type":"address"},{"name":"ring","type":"address"},{"name":"cup","type":"address"},{"name":"locket","type":"address"},{"name":"diadem","type":"address"},{"name":"harry","type":"address"},{"name":"nagini","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"ownerTransfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"test__burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"sacrifice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"contractsCantChange","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"activateBurning","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]');

//contract instance
mainContract = new web3.eth.Contract(main_ContractABI, main_ContractAddress);

// Accounts
let selectedAddress = ethereum.selectedAddress
let account;
const etherscan_tx = "<a target='_blank' href='https://kovan.etherscan.io/tx/"
const etherscan_token = "<a target='_blank' href='https://kovan.etherscan.io/token/"
const success = "'>Success! Click to view Transaction</a>"
const process = "Processing transaction..."
const reverted = "Transaction reverted :("
const supply = 100000

// ///////////////////////////////////////////////////////////////////////
//                  GET ACCOUNT
// ///////////////////////////////////////////////////////////////////////
function getAccount() {
  web3.eth.getAccounts(function (err, accounts) {
    if (err != null) {
      alert("Error retrieving accounts.");
      return;
    }
    if (accounts.length == 0) {
      alert("No account found! Make sure the Ethereum client is configured properly.");
      return;
    }
    account = accounts[0];
    console.log('Account: ' + account);
    web3.eth.defaultAccount = account;
    balanceOf()
    getTokenBalance()
    // balanceOf()


  });
}
// ///////////////////////////////////////////////////////////////////////
//                  GET USERS WALLET ADDRESS
// ///////////////////////////////////////////////////////////////////////
function updateWallet() {
  document.getElementById('my_wallet').innerHTML = '<a target="_blank" href="https://kovan.etherscan.io/address/' + selectedAddress + '">' + selectedAddress + '</a>'
}
document.getElementById('my_wallet').innerHTML = '<a target="_blank" href="https://kovan.etherscan.io/address/' + account + '">' + account + '</a>'

// document.getElementById('balance_of').innerHTML = web3.eth.getBalance(ethereum.selectedAddress)
// console.log(web3.eth.getBalance(ethereum.selectedAddress))


// ///////////////////////////////////////////////////////////////////////
//                  UPDATE ACCOUNT WHEN SWITCH FROM METAMASK
// ///////////////////////////////////////////////////////////////////////
window.ethereum.on('accountsChanged', function (user) {
  let select = window.web3.currentProvider.selectedAddress
  account = user
  document.getElementById('my_wallet').innerHTML = '<a target="_blank" href="https://kovan.etherscan.io/address/' + account + '">' + account + '</a>'
  selectedAddress = ethereum.selectedAddress
  getAccount()
  balanceOf()
  getTokenBalance()
  
  
})


// ///////////////////////////////////////////////////////////////////////
//                  ADD COMMA AND DECIMAL PLACES TO NUMBER
// ///////////////////////////////////////////////////////////////////////
function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // return parts.join(".");
  return parts[0]
}


// ///////////////////////////////////////////////////////////////////////
//                  ETH BALANCE CURRENT USER
// ///////////////////////////////////////////////////////////////////////

function balanceOf() {

  web3.eth.getBalance(account, function (error, result) {
    if (error) {
      console.log(error)
    }
    else {
      // console.log(result)
      document.getElementById('balance_of').innerHTML = web3.utils.fromWei(result, 'ether')
    }
  })
}

// ///////////////////////////////////////////////////////////////////////
//                  GET MAIN TOKEN BALANCE FROM USER
// ///////////////////////////////////////////////////////////////////////
function getTokenBalance() {
  mainContract.methods.balanceOf(selectedAddress).call((error, balance) => {
    const formatted = balance / supply
    console.log("balance of ", balance);
    document.getElementById('tokens_balance').innerHTML = numberWithCommas(formatted);
  });
}

// ///////////////////////////////////////////////////////////////////////
//                  ATTACK CONTRACT INTERACTION
// ///////////////////////////////////////////////////////////////////////
function attack() {
  mainContract.methods.attack().send({ from: account })
    .on('transactionHash', tx => {
      console.log("Transaction: ", tx);
      document.getElementById('attack_transaction').innerHTML = process;
    })
    .then(receipt => {
      console.log('Mined', receipt)
      if (receipt.status == '0x1' || receipt.status == 1) {
        console.log("Transaction Successful")
        document.getElementById('attack_transaction').innerHTML = etherscan_tx + receipt.transactionHash + success
      }
      else {
        console.log('Transaction Failed')
        document.getElementById('attack_transaction').innerHTML = reverted
      }
    })
    .catch(err => {
      console.log('Error', err)
      document.getElementById('attack_transaction').innerHTML = "Transaction Canceled"
      setTimeout(function () {
        document.getElementById('attack_transaction').innerHTML = "&nbsp;"
      }, 5000);
    })
    .finally(() => {
      getTokenBalance()
      balanceOf()
    })
}

// ///////////////////////////////////////////////////////////////////////
//                  SACRIFICE TOKEN FUNCTION
// ///////////////////////////////////////////////////////////////////////
function sacrifice() {
  info = $("#tokens_to_burn").val() * 1e5;
  mainContract.methods.sacrifice(info).send({ from: account })
    .on('transactionHash', tx => {
      console.log("Transaction: ", tx);
      document.getElementById('sacrifice_transaction').innerHTML = process;
    })
    .then(receipt => {
      console.log('Mined', receipt)
      if (receipt.status == '0x1' || receipt.status == 1) {
        console.log("Transaction Successful")
        document.getElementById('sacrifice_transaction').innerHTML = etherscan_tx + receipt.transactionHash + success
      }
      else {
        console.log('Transaction Failed')
        document.getElementById('sacrifice_transaction').innerHTML = reverted
      }
    })
    .catch(err => {
      console.log('Error', err)
      document.getElementById('sacrifice_transaction').innerHTML = "Transaction Canceled"
      setTimeout(function () {
        document.getElementById('sacrifice_transaction').innerHTML = "&nbsp;"
      }, 5000);
    })
    .finally(() => {
      getTokenBalance()
      balanceOf()
    })
}

// ///////////////////////////////////////////////////////////////////////
//                 TRANSFER TOKENS
// ///////////////////////////////////////////////////////////////////////

function transfer() {
  address = $("#address_to").val();
  value = $("#transaction_value").val() * 1e5;

  mainContract.methods.transfer(address, value).send({ from: account })
    .on('transactionHash', tx => {
      console.log("Transaction: ", tx);
      document.getElementById('send_transaction').innerHTML = process;
    })
    .then(receipt => {
      console.log('Mined', receipt)
      if (receipt.status == '0x1' || receipt.status == 1) {
        console.log("Transaction Successful")
        document.getElementById('send_transaction').innerHTML = etherscan_tx + receipt.transactionHash + success
      }
      else {
        console.log('Transaction Failed')
        document.getElementById('send_transaction').innerHTML = reverted
      }
    })
    .catch(err => {
      console.log('Error', err)
      document.getElementById('send_transaction').innerHTML = "Transaction Canceled"
      setTimeout(function () {
        document.getElementById('send_transaction').innerHTML = "&nbsp;"
      }, 5000);
    })
    .finally(() => {
      getTokenBalance()
      balanceOf()
    })
}

getTokenBalance()
getAccount()







