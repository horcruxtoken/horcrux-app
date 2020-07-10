const express = require('express');
const router = express.Router();
const Web3 = require("web3")


const infuraWeb3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/v3/1209a87da88d49e4b201ed55bc6761f6"))

const main_ContractAddress = '0xc629ee12d8Cbac8A43D15685E346A9fbDA06F5a1';

const diary_ContractAddress = '0x319E8967680CA652D46596A9203e9AA0789c6154';
const ring_ContractAddress = '0x72C1b5c5870957001B16561AB06Ee8b020D567d1';
const cup_ContractAddress = '0x8b1593a8f50E6608c7a9ffd81B30bCbA404BcD9c';
const locket_ContractAddress = '0x42A1180db5F344739ef1c9386Cf30b7B508b7C12';
const diadem_ContractAddress = '0x0017B144af9637663d233459590e81DfD0c62d7e';
const harry_ContractAddress = '0xa463f68C2Bb600CBcc055869D2ba26646d7C2907';
const nagini_ContractAddress = '0x4690C06dBAEDdde2F18773Ab7e0D0659162FF1D0';

const main_ContractABI = JSON.parse('[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"burnActivated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"attack","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newContract","type":"address"},{"name":"contractName","type":"uint256"}],"name":"addContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"horcruxContracts","outputs":[{"name":"diary","type":"address"},{"name":"ring","type":"address"},{"name":"cup","type":"address"},{"name":"locket","type":"address"},{"name":"diadem","type":"address"},{"name":"harry","type":"address"},{"name":"nagini","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"ownerTransfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"test__burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"sacrifice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"contractsCantChange","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"activateBurning","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]');
// all horcrux should contracts have the same abi
const token_ContractABI = JSON.parse('[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"value","type":"uint256"}],"name":"amountToMint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addAuthorizedContract","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"authorizedContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]');

//contract instance
mainContract = new infuraWeb3.eth.Contract(main_ContractABI, main_ContractAddress);

diary_Contract = new infuraWeb3.eth.Contract(token_ContractABI, diary_ContractAddress);
ring_Contract = new infuraWeb3.eth.Contract(token_ContractABI, ring_ContractAddress);
cup_Contract = new infuraWeb3.eth.Contract(token_ContractABI, cup_ContractAddress);
locket_Contract = new infuraWeb3.eth.Contract(token_ContractABI, locket_ContractAddress);
diadem_Contract = new infuraWeb3.eth.Contract(token_ContractABI, diadem_ContractAddress);
harry_Contract = new infuraWeb3.eth.Contract(token_ContractABI, harry_ContractAddress);
nagini_Contract = new infuraWeb3.eth.Contract(token_ContractABI, nagini_ContractAddress);

module.exports = router;

router.get('/api', (__, res) => {
    mainContract.methods.name().call((__, name) => {
        mainContract.methods.totalSupply().call((__, totalSupply) => {
            mainContract.methods.symbol().call((__, symbol) => {
                mainContract.methods.decimals().call((__, decimals) => {
                    res.send({
                        name,
                        totalSupply,
                        symbol,
                        decimals,
                        contractAddress: main_ContractAddress
                    })
                })
            })
        })
    })
})

router.get('/all_contracts', (__, res) => {
    mainContract.methods.horcruxContracts().call((__, contracts) => {
        res.send({
            contracts
        })
    })
})


router.get('/current_horcrux', (__, res) => {
    mainContract.methods.totalSupply().call((__, totalSupply) => {
        if (totalSupply > 7e10) {
            // getContractValues(diary_Contract, diary_ContractAddress, 20)
            diary_Contract.methods.name().call((__, name) => {
                diary_Contract.methods.totalSupply().call((__, totalSupply) => {
                    diary_Contract.methods.symbol().call((__, symbol) => {
                        diary_Contract.methods.decimals().call((__, decimals) => {
                            res.send({
                                name,
                                totalSupply,
                                symbol,
                                decimals,
                                burnRate: "20",
                                contractAddress: diary_ContractAddress
                            })
                        })
                    })
                })
            })
        }
        if (totalSupply <= 7e10 && totalSupply > 6e10) {
            // getContractValues(ring_Contract, ring_ContractAddress, 12)
            ring_Contract.methods.name().call((__, name) => {
                ring_Contract.methods.totalSupply().call((__, totalSupply) => {
                    ring_Contract.methods.symbol().call((__, symbol) => {
                        ring_Contract.methods.decimals().call((__, decimals) => {
                            res.send({
                                name,
                                totalSupply,
                                symbol,
                                decimals,
                                burnRate: "12",
                                contractAddress: ring_ContractAddress
                            })
                        })
                    })
                })
            })
        }
        if (totalSupply <= 6e10 && totalSupply > 5e10) {
            // getContractValues(cup_Contract, cup_ContractAddress, 10)
            cup_Contract.methods.name().call((__, name) => {
                cup_Contract.methods.totalSupply().call((__, totalSupply) => {
                    cup_Contract.methods.symbol().call((__, symbol) => {
                        cup_Contract.methods.decimals().call((__, decimals) => {
                            res.send({
                                name,
                                totalSupply,
                                symbol,
                                decimals,
                                burnRate: "10",
                                contractAddress: cup_ContractAddress
                            })
                        })
                    })
                })
            })
        }
        if (totalSupply <= 5e10 && totalSupply > 4e10) {
            // getContractValues(locket_Contract, locket_ContractAddress, 8)
            locket_Contract.methods.name().call((__, name) => {
                locket_Contract.methods.totalSupply().call((__, totalSupply) => {
                    locket_Contract.methods.symbol().call((__, symbol) => {
                        locket_Contract.methods.decimals().call((__, decimals) => {
                            res.send({
                                name,
                                totalSupply,
                                symbol,
                                decimals,
                                burnRate: "8",
                                contractAddress: locket_ContractAddress
                            })
                        })
                    })
                })
            })
        }
        if (totalSupply <= 4e10 && totalSupply > 3e10) {
            // getContractValues(diadem_Contract, diadem_ContractAddress, 6)
            diadem_Contract.methods.name().call((__, name) => {
                diadem_Contract.methods.totalSupply().call((__, totalSupply) => {
                    diadem_Contract.methods.symbol().call((__, symbol) => {
                        diadem_Contract.methods.decimals().call((__, decimals) => {
                            res.send({
                                name,
                                totalSupply,
                                symbol,
                                decimals,
                                burnRate: "6",
                                contractAddress: diadem_ContractAddress
                            })
                        })
                    })
                })
            })
        }
        if (totalSupply <= 3e10 && totalSupply > 2e10) {
            // getContractValues(harry_Contract, harry_ContractAddress, 4)
            harry_Contract.methods.name().call((__, name) => {
                harry_Contract.methods.totalSupply().call((__, totalSupply) => {
                    harry_Contract.methods.symbol().call((__, symbol) => {
                        harry_Contract.methods.decimals().call((__, decimals) => {
                            res.send({
                                name,
                                totalSupply,
                                symbol,
                                decimals,
                                burnRate: "4",
                                contractAddress: harry_ContractAddress
                            })
                        })
                    })
                })
            })
        }
        if (totalSupply <= 2e10 && totalSupply > 1e10) {
            // getContractValues(nagini_Contract, nagini_ContractAddress, 2)
            nagini_Contract.methods.name().call((__, name) => {
                nagini_Contract.methods.totalSupply().call((__, totalSupply) => {
                    nagini_Contract.methods.symbol().call((__, symbol) => {
                        nagini_Contract.methods.decimals().call((__, decimals) => {
                            res.send({
                                name,
                                totalSupply,
                                symbol,
                                decimals,
                                burnRate: "2",
                                contractAddress: nagini_ContractAddress
                            })
                        })
                    })
                })
            })
        }
    })
})
