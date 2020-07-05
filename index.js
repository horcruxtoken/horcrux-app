
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
  window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
}
console.log (window.web3.currentProvider)

const main_ContractAddress = '0x9AFea5c12a206D0e5708B9737E422A6e9BEAfAeA';

const diary_ContractAddress = '0x15C99DEAA62E09b0837ec4Edb21aBD05C58a83a0';
const ring_ContractAddress = '0xA652A275D0000E0bF6F0c8B5DA1badd3a4801598';
const cup_ContractAddress = '0xcf36b9b16a273f5c3adeac71b8436108d2beb4ab';
const locket_ContractAddress = '0xcf36b9b16a273f5c3adeac71b8436108d2beb4ab';
const diadem_ContractAddress = '0xcf36b9b16a273f5c3adeac71b8436108d2beb4ab';
const harry_ContractAddress = '0xcf36b9b16a273f5c3adeac71b8436108d2beb4ab';
const nagini_ContractAddress = '0xcf36b9b16a273f5c3adeac71b8436108d2beb4ab';

const main_ContractABI = JSON.parse('[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"burnActivated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"attack","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newContract","type":"address"},{"name":"contractName","type":"uint256"}],"name":"addContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"horcruxContracts","outputs":[{"name":"diary","type":"address"},{"name":"ring","type":"address"},{"name":"cup","type":"address"},{"name":"locket","type":"address"},{"name":"diadem","type":"address"},{"name":"harry","type":"address"},{"name":"nagini","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"test__burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"sacrifice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"contractsCantChange","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"activateBurning","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]' );
// all horcrux should contracts have the same abi
const token_ContractABI = JSON.parse('[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"value","type":"uint256"}],"name":"amountToMint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addAuthorizedContract","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"authorizedContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]' );

//contract instance
mainContract = new web3.eth.Contract(main_ContractABI, main_ContractAddress);

diary_Contract = new web3.eth.Contract(token_ContractABI, diary_ContractAddress);
ring_Contract = new web3.eth.Contract(token_ContractABI, ring_ContractAddress);
cup_Contract = new web3.eth.Contract(token_ContractABI, cup_ContractAddress);
locket_Contract = new web3.eth.Contract(token_ContractABI, locket_ContractAddress);
diadem_Contract = new web3.eth.Contract(token_ContractABI, diadem_ContractAddress);
harry_Contract = new web3.eth.Contract(token_ContractABI, harry_ContractAddress);
nagini_Contract = new web3.eth.Contract(token_ContractABI, nagini_ContractAddress);

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
  web3.eth.getAccounts(function(err, accounts) {
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
    
    
  });
}
// ///////////////////////////////////////////////////////////////////////
//                  GET USERS WALLET ADDRESS
// ///////////////////////////////////////////////////////////////////////
function updateWallet() {
  document.getElementById('my_wallet').innerHTML = selectedAddress
}
document.getElementById('my_wallet').innerHTML = selectedAddress

// document.getElementById('balance_of').innerHTML = web3.eth.getBalance(ethereum.selectedAddress)
// console.log(web3.eth.getBalance(ethereum.selectedAddress))


// ///////////////////////////////////////////////////////////////////////
//                  UPDATE ACCOUNT WHEN SWITCH FROM METAMASK
// ///////////////////////////////////////////////////////////////////////
window.ethereum.on('accountsChanged', function(user) {
  account = user
  document.getElementById('my_wallet').innerHTML = window.web3.currentProvider.selectedAddress
  selectedAddress = ethereum.selectedAddress 
  balanceOf()
  getTokenBalance()
})

// ///////////////////////////////////////////////////////////////////////
//                  DISPLAY CURRENT HORCRUX INFORMATION
// ///////////////////////////////////////////////////////////////////////

function displayTokenInfo(name, supply, contract, symbol, burnRate) {
  return $("#horcrux_name").html(
    '<div style="font-size: 2rem;">' +
      '<h3>' +
        '<div class="">' +
          'Horcrux Name: <span id="get_name">' + name + '</span>' + 
        '</div>' + 
        '<div class="mt-3">' +
          'Token Symbol: <span id="get_name">' + symbol + '</span>' + 
        '</div>' + 
        '<div class="mt-3">' +
          'Total Possible Supply: 100,000' +
        '</div>' +
        '<div class="mt-3">' +
        'Total Supply Minted: <span id="total_supply">' + numberWithCommas(supply/1e5) + '</span>' +
        '</div>' +
        '<div class="mt-3">' +
    'Percent Destroyed: <span id="burned_tokens">' + numberWithCommas(supply / 1e8) + '%</span>' +
    // 'Percent Destroyed: <span id="burned_tokens">' + supply + '%</span>' +
        '</div>' +
        '<div class="mt-3">' +
          'Contract Address: <br>' +
          '<h6> <a target="_blank" href="https://kovan.etherscan.io/token/' + contract + '">' + contract + '</a></h6>' +
        '</div>' +
      '</h3>' +
    '</div>'
    )
}


// ///////////////////////////////////////////////////////////////////////
//                  GET VALUES FOR CURRENT HORCRUX CONTRACT
// ///////////////////////////////////////////////////////////////////////
function getContractValues(contract, contractAddress, burnRate) {
  contract.methods.name().call().then(function (name) {
    contract.methods.totalSupply().call().then(function (supply) {
      contract.methods.symbol().call().then(function (symbol) {
        displayTokenInfo(name, supply, contractAddress, symbol, burnRate)
      })
    })
  })
}

// ///////////////////////////////////////////////////////////////////////
//                  SELECT WHICH HORCRUX CONTRACT IS ACTIVE
// ///////////////////////////////////////////////////////////////////////
function tokenContractSelect() {
  mainContract.methods.totalSupply().call().then(function (info) {
    const abi = token_ContractABI;
    if (info > 7e10) {
      getContractValues(diary_Contract, diary_ContractAddress, 20)
    }
    if (info <= 7e10 && info > 6e10) {
      getContractValues(ring_Contract, ring_ContractAddress, 12)
    }
    if (info <= 6e10 && info > 5e10) {
      getContractValues(cup_Contract, cup_ContractAddress, 10)
    }
    if (info <= 5e10 && info > 4e10) {
      getContractValues(locket_Contract, locket_ContractAddress, 8)
    }
    if (info <= 4e10 && info > 3e10) {
      getContractValues(diadem_Contract, diadem_ContractAddress, 6)
    }
    if (info <= 3e10 && info > 2e10) {
      getContractValues(harry_Contract, harry_ContractAddress, 4)
    }
    if (info <= 2e10 && info > 1e10) {
      getContractValues(nagini_Contract, nagini_ContractAddress, 2)
    }
  })
}

function getCurrentBurnRate() {
  mainContract.methods.totalSupply().call().then(function (info) {
    const abi = token_ContractABI;
    if (info > 7e10) {
      document.getElementById('burn_rate').innerHTML = "20"
    }
    if (info <= 7e10 && info > 6e10) {
      document.getElementById('burn_rate').innerHTML = "12"
    }
    if (info <= 6e10 && info > 5e10) {
      document.getElementById('burn_rate').innerHTML = "10"
    }
    if (info <= 5e10 && info > 4e10) {
      document.getElementById('burn_rate').innerHTML = "8"
    }
    if (info <= 4e10 && info > 3e10) {
      document.getElementById('burn_rate').innerHTML = "6"
    }
    if (info <= 3e10 && info > 2e10) {
      document.getElementById('burn_rate').innerHTML = "4"
    }
    if (info <= 2e10 && info > 1e10) {
      document.getElementById('burn_rate').innerHTML = "2"
    }
  })
}

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
//                  CLAIM AIRDROP FUNCTION
// ///////////////////////////////////////////////////////////////////////
function claimAirdrop() {
  mainContract.methods.claimAirdrop(account).send({ from: account })
    .on('transactionHash', tx => {
      console.log("Transaction: ", tx);
      document.getElementById('airdrop_tx').innerHTML = process;
    })
    .then(receipt => {
      console.log('Mined', receipt)
      if (receipt.status == '0x1' || receipt.status == 1) {
        console.log("Transaction Successful")
        document.getElementById('airdrop_tx').innerHTML = etherscan_tx + receipt.transactionHash + success
      }
      else {
        console.log('Transaction Failed')
        document.getElementById('airdrop_tx').innerHTML = reverted
      }
    })
    .catch(err => {
      console.log('Error Message', err)
    })
    .finally(() => {
      freeClaimsCount()
    })
  // $("#airdrop").val('');
}

// ///////////////////////////////////////////////////////////////////////
//                  GET TOKEN NAME MAIN CONTRACT
// ///////////////////////////////////////////////////////////////////////
function getName() {
  mainContract.methods.name().call().then( function( info ) { 
    // console.log("Name: ", info);
    document.getElementById('get_name').innerHTML = info;
  });    
}

// ///////////////////////////////////////////////////////////////////////
//                  GET TOTAL SUPPLY MAIN CONTRACT
// ///////////////////////////////////////////////////////////////////////
function totalSupply() {
  mainContract.methods.totalSupply().call().then( function( info ) { 
    const formatted = info / supply
    // console.log("Total Supply: ", numberWithCommas(formatted));
    document.getElementById('total_supply').innerHTML = numberWithCommas(formatted);
  });    
}

// ///////////////////////////////////////////////////////////////////////
//                  GET DECIMALS MAIN CONTRACT
// ///////////////////////////////////////////////////////////////////////
function decimals() {
  mainContract.methods.decimals().call().then( function( info ) { 
    const formatted = info
    // console.log("Decimals: ", numberWithCommas(formatted));
    document.getElementById('decimals').innerHTML = info;
  });    
}

// ///////////////////////////////////////////////////////////////////////
//                  GET BALANCE OF CURRENT USER                             !!!NOT WORKING!!!
// ///////////////////////////////////////////////////////////////////////
function balanceOf() {

  web3.eth.getBalance(selectedAddress, function (error, result) {

    if (error) {
      console.log(error)
    }
    else {
      console.log(result)
      document.getElementById('balance_of').innerHTML = web3.utils.fromWei(result, 'ether')
    }
  })
}

function burnedTokens() {
  mainContract.methods.totalSupply().call().then(function (info) {
    const formatted = 800000 - info / supply
    // console.log("Burned Tokens: ", numberWithCommas(formatted));
    document.getElementById('burned_tokens').innerHTML = numberWithCommas(formatted);
  });    
}

// ///////////////////////////////////////////////////////////////////////
//                  GET MAIN TOKEN BALANCE FROM USER
// ///////////////////////////////////////////////////////////////////////
// let contract = web3.eth.contract(ABI, tokenAddress);
function getTokenBalance() {
  mainContract.methods.balanceOf(selectedAddress).call((error, balance) => {
    mainContract.methods.decimals().call((error, decimals) => {
      // balance = balance.div(10 ** decimals);
      console.log(balance);
      const formatted = balance / supply
      // console.log("Total Supply: ", numberWithCommas(formatted));
      document.getElementById('tokens_balance').innerHTML = numberWithCommas(formatted);
    });
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
      }, 3000);
    })
    .finally(() => {
      // attackCount()
      burnedTokens()
      totalSupply()
    })
  // $("#airdrop").val('');
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
      }, 3000);
    })
    .finally(() => {
      totalSupply()
      burnedTokens()
    })
  // $("#airdrop").val('');
}
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
      }, 3000);
    })
    .finally(() => {
      totalSupply()
      burnedTokens()
      tokenContractSelect()
      getAccount()
    })
  // $("#airdrop").val('');
}

async function sendTxWithMetamask() {
  const addressTo = $("#address_to").val();
  const value = $("#transaction_value").val();

  let selectedAddress = ethereum.selectedAddress
  let balance = await web3.eth.getBalance(selectedAddress)
  console.log('Balance', balance)
  await web3.eth.sendTransaction({
    to: addressTo, value: web3.utils.toWei(value, 'ether'), from: selectedAddress
  })
};



// ///////////////////////////////////////////////////////////////////////
//                  REFRESH STATE FUNCTION
// ///////////////////////////////////////////////////////////////////////
function refresh() {
  // getAccount()
  getName()
  totalSupply()
  tokenContractSelect()
  decimals()
  burnedTokens()
  setTimeout(function () {
    console.log('update from contract')
    refresh()
  }, 15000);
}
refresh()
getAccount()
getCurrentBurnRate()
// balanceOf()




