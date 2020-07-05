pragma solidity ^ 0.5.0;

contract HorcruxInterface {
    
    function amountToMint(address sender, uint256 value) external;
    function totalSupply() external view returns(uint256);
}

interface IERC20 {
    
    function totalSupply() external view returns(uint256);
    function balanceOf(address who) external view returns(uint256);
    function allowance(address owner, address spender) external view returns(uint256);
    function transfer(address to, uint256 value) external returns(bool);
    function approve(address spender, uint256 value) external returns(bool);
    function transferFrom(address from, address to, uint256 value) external returns(bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

library SafeMath {
    
    function mul(uint256 a, uint256 b) internal pure returns(uint256) {
        if (a == 0) {
            return 0;
        }
        uint256 c = a * b;
        assert(c / a == b);
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns(uint256) {
        uint256 c = a / b;
        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns(uint256) {
        assert(b <= a);
        return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns(uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }

    function ceil(uint256 a, uint256 m) internal pure returns(uint256) {
        uint256 c = add(a, m);
        uint256 d = sub(c, 1);
        return mul(div(d, m), m);
    }
}

contract ERC20Detailed is IERC20 {

    string private _name;
    string private _symbol;
    uint8 private _decimals;

    constructor(string memory name, string memory symbol, uint8 decimals) public {
        _name = name;
        _symbol = symbol;
        _decimals = decimals;
    }

    mapping(address => uint) balances;

    function name() public view returns(string memory) {
        return _name;
    }

    function symbol() public view returns(string memory) {
        return _symbol;
    }

    function decimals() public view returns(uint8) {
        return _decimals;
    }
}

contract Owned {
    
    address public owner;
    address public newOwner;

    event OwnershipTransferred(address indexed _from, address indexed _to);

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        newOwner = _newOwner;
    }
    
    function acceptOwnership() public {
        require(msg.sender == newOwner);
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
        newOwner = address(0);
    }
}

contract Main_Con is ERC20Detailed, Owned {

    using SafeMath for uint256;
    
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowed;

    string constant tokenName = "Main_Con5.0";
    string constant tokenSymbol = "CONx5";
    uint8  constant tokenDecimals = 5;
    uint256 _totalSupply = 8e10;
    
    uint256 internal basePercent = 100;
    bool public burnActivated;
    
    // if true contracts cannot be added
    bool public contractsCantChange;
    
    address internal diaryContract;
    address internal ringContract;
    address internal cupContract;
    address internal locketContract;
    address internal diademContract;
    address internal harryContract;
    address internal naginiContract;

    // used when switching to new contract
    uint256 internal tempSupplyValue;
    
    constructor() public payable ERC20Detailed(tokenName, tokenSymbol, tokenDecimals) {
        _mint(msg.sender, _totalSupply);
    }

    // return total supply of tokens
    function totalSupply() public view returns(uint256) {
        return _totalSupply;
    }

    // query account balance for a address
    function balanceOf(address owner) public view returns(uint256) {
        return _balances[owner];
    }

    // query allowed tokens for a address
    function allowance(address owner, address spender) public view returns(uint256) {
        return _allowed[owner][spender];
    }
    
        // add new horcrux contract address
    function addContract(address newContract, uint contractName) public {
        require(msg.sender == owner);
        //require contractsCantChange = false
        require(!contractsCantChange);
        
        address n = newContract;
        uint c = contractName;
        
        if (c == 1) {
            diaryContract = n;
        }
        if (c == 2) {
            ringContract = n;
        }
        if (c == 3) {
            cupContract = n;
        }
        if (c == 4) {
            locketContract = n;
        }
        if (c == 5) {
            diademContract = n;
        }
        if (c == 6) {
            harryContract = n;
        }
        if (c == 7) {
            naginiContract = n;
        }
    }
    
        // activate burn of tokens 
    function activateBurning() public returns(bool) {
        require(msg.sender == owner);
        require(!burnActivated);
        // activate burn on transfer and sacrifice functionality
        burnActivated = true;
        // contracts can now not be changed
        contractsCantChange = true;
        return true;
    }

    // functiion for calculating burn percent 
    function burnPercent(uint256 value, uint256 rate) internal view returns(uint256) {
        uint256 burnRate = value.mul(basePercent.mul(rate)).div(10000);
        return burnRate;
    }

    // select params passed to burn percent calculator
    function calculateBurnPercent(uint256 value) internal view returns(uint256) {
        uint256 t = _totalSupply;
        if (t > 7e10) {
            return burnPercent(value, 20);
        }
        if (t <= 7e10 && t > 6e10) {
            return burnPercent(value, 12);
        }
        if (t <= 6e10 && t > 5e10) {
            return burnPercent(value, 10);
        }
        if (t <= 5e10 && t > 4e10) {
            return burnPercent(value, 8);
        }
        if (t <= 4e10 && t > 3e10) {
            return burnPercent(value, 6);
        }
        if (t <= 3e10 && t > 2e10) {
            return burnPercent(value, 4);
        }
        if (t <= 2e10 && t > 1e10) {
            return burnPercent(value, 2);
        }
    }
    
    /*
    
    if mint contract total supply is less than 100,000 
    and the value to be sent is greater than 100,000 minus current supply
    send an amount to the current contract and send the rest of the amount to the next one 
    
    value - (value - remaining) = fistContractAmount     100 - (100 - 25) = 25
    value - remaining = secondContractAccount            100 - 25 = 75
    
    */
    
    // get total supply of selected contract
    function getSupply(address contractName) private view returns(uint256) { 
        return HorcruxInterface(contractName).totalSupply();
    }
    
    // return remaining supply on selected contract
    function remaining(address contractAddress) internal returns(uint256) { 
        return tempSupplyValue = 1e10 - getSupply(contractAddress);
    }
    
    // exicute mint function on selected contract
    function mintToContract(address contractAddress, address sender, uint256 value) internal { 
        HorcruxInterface(contractAddress).amountToMint(sender, value);
    }
    
    // mint remaining supply's amount to the current contract
    function currentMint(address contractAddress, address sender, uint256 value) internal {      
        mintToContract(contractAddress, sender, (value.sub((value.sub(tempSupplyValue)))));
    }
    
    // mint remaining transaction amount to the next contract
    function nextMint(address contractAddress, address sender, uint256 value) internal {           
        mintToContract(contractAddress, sender, (value.sub(tempSupplyValue)));
    }
    
    
    // either mint or burn tokens on final burn transaction
    function finalMint(address sender, uint256 value, address upcomingContract) internal returns(bool) {

        // if sacrifice, sender can only sacrifice the remaining supply of the main contract
        if (upcomingContract == address(0)) {
            // mint to naginin only the remaining supply 
            mintToContract(naginiContract, sender, tempSupplyValue);
            // mint back to sender (value - remaining)
            _mint(sender, value.sub(tempSupplyValue));
            // add the total supply back in
            _totalSupply = _totalSupply.add(value.sub(tempSupplyValue));
            // activate normal transfer
            burnActivated = false;
            
            return true;
        } 
        // if transfer
        if (upcomingContract != address(0)) {
            // mint the burn percent to nagini
            currentMint(naginiContract, sender, value);
            // mint the remaining after the mint back from the value to the sender
            _mint(sender, value.sub(tempSupplyValue));
            // add total supply back in becuase it was removed during transfer
            _totalSupply = _totalSupply.add(tempSupplyValue);
            // activate normal transfer
            burnActivated = false;
    
            return true;
        }
    }
    
    function mintHelper(address activeContract, address upcomingContract, address sender, uint256 value) internal returns(bool) {
        // if switching contracts and on final contract 
        if (getSupply(activeContract) < 1e10 && value > 1e10 - getSupply(activeContract) && activeContract == naginiContract) {
            // temporarily set remaining supply to use in next two functions                       
            remaining(activeContract);                 
            // decide if the transaction was a sacrifice or a normal transaction
            finalMint(sender, value, upcomingContract);                                            
            // set temporary supply value back to 0
            tempSupplyValue = 0;
            
            return true;
        } 
        // if switching contracts and not on final contract
        else if (getSupply(activeContract) < 1e10 && value > 1e10 - getSupply(activeContract)) { 
            // temporarily set remaining supply to use in next two functions
            remaining(activeContract);                                                      
            // send portion to current contract 
            currentMint(activeContract, sender, value);                                    
            // send portion to next contract
            nextMint(upcomingContract, sender, value);
            // set temporary supply value back to 0
            tempSupplyValue = 0;
            
            return true;
        }
        else {
            // mint whole value to the current contract
            mintToContract(activeContract, sender, value);
            return true;
        }
    }
    
    // choose which horcrux contract for transfers depending on supply of this contract
    function chooseContract(address sender, uint256 value, address recipient) internal {
        uint256 t = _totalSupply;
        
        if (t > 7e10) {
            mintHelper(diaryContract, ringContract, sender, value);
        }
        if (t <= 7e10 && t > 6e10) {
            mintHelper(ringContract, cupContract, sender, value);
        }
        if (t <= 6e10 && t > 5e10) {
            mintHelper(cupContract, locketContract, sender, value);
        }
        if (t <= 5e10 && t > 4e10) {
            mintHelper(locketContract, diademContract, sender, value);
        }
        if (t <= 4e10 && t > 3e10) {
            mintHelper(diademContract, harryContract, sender, value);
        }
        if (t <= 3e10 && t > 2e10) {
            mintHelper(harryContract, naginiContract, sender, value);
        }
        if (t <= 2e10 && t > 1e10) {
            mintHelper(naginiContract, recipient, sender, value);
        }
    }

    // if conditions are met burn on transfer, else exicute a normal transfer
    function transfer(address recipient, uint256 value) public returns(bool) {
        require(value <= _balances[msg.sender]);
        require(recipient != address(0));

        // burn transfer
        if (burnActivated ) {
            // calculate percent to burn
            uint256 tokensToBurn = calculateBurnPercent(value);
            // transfer remaining tokens after calculation to recipient
            uint256 tokensToTransfer = value.sub(tokensToBurn);
            
            // handle next contract mint
            chooseContract(msg.sender, tokensToBurn, recipient);

            // normal transfer within main contract
            _balances[msg.sender] = _balances[msg.sender].sub(value);
            _balances[recipient] = _balances[recipient].add(tokensToTransfer);
            _totalSupply = _totalSupply.sub(tokensToBurn);
            
            emit Transfer(msg.sender, recipient, tokensToTransfer);
            emit Transfer(msg.sender, address(0), tokensToBurn);
            return true;
        }
        
        // normal transfer
        _balances[msg.sender] = _balances[msg.sender].sub(value);
        _balances[recipient] = _balances[recipient].add(value);
        emit Transfer(msg.sender, recipient, value);
        return true;
    }
    
    // approve allowance
    function approve(address spender, uint256 value) public returns(bool) {
        require(spender != address(0));
        _allowed[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
    
    // if condiditions are met, burn from approved tokens, else exicute alternate transfer
    function transferFrom(address sender, address recipient, uint256 value) public returns(bool) {
        require(value <= _balances[sender]);
        require(value <= _allowed[sender][msg.sender]);
        require(recipient != address(0));
        require(sender != address(0));

        // burn transfer
        if (burnActivated) {
            uint256 tokensToBurn = calculateBurnPercent(value);
            uint256 tokensToTransfer = value.sub(tokensToBurn);
            
            chooseContract(msg.sender, tokensToBurn, recipient);

            _balances[sender] = _balances[sender].sub(value);
            _allowed[sender][msg.sender] = _allowed[sender][msg.sender].sub(value);
            _balances[recipient] = _balances[recipient].add(tokensToTransfer);
            _totalSupply = _totalSupply.sub(tokensToBurn);

            emit Transfer(sender, recipient, tokensToTransfer);
            emit Transfer(sender, address(0), tokensToBurn);
            return true;
        }
        
        // normal transfer
        _balances[sender] = _balances[sender].sub(value);
        _allowed[sender][msg.sender] = _allowed[sender][msg.sender].sub(value);
        _balances[recipient] = _balances[recipient].add(value);
        
        emit Transfer(sender, recipient, value);
        return true;
    }

    // increase msg.senders allowance
    function increaseAllowance(address spender, uint256 addedValue) public returns(bool) {
        require(spender != address(0));
        _allowed[msg.sender][spender] = (_allowed[msg.sender][spender].add(addedValue));
        emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
        return true;
    }

    // decrease msg.senders allowance
    function decreaseAllowance(address spender, uint256 subtractedValue) public returns(bool) {
        require(spender != address(0));
        _allowed[msg.sender][spender] = (_allowed[msg.sender][spender].sub(subtractedValue));
        emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
        return true;
    }

    // mint new tokens, only accessable at contract creation and end of final contract change
    function _mint(address recipient, uint256 amount) internal {
        require(amount != 0);
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(address(0), recipient, amount);
    }

    // internal burn function
    function _burn(address sender, uint256 amount) internal {
        require(amount != 0);
        require(amount <= _balances[sender]);
        _totalSupply = _totalSupply.sub(amount);
        _balances[sender] = _balances[sender].sub(amount);
        emit Transfer(sender, address(0), amount);
    }

    // claim fixed amount as long as conditions are met
    // function claimAirdrop(address recipient) external returns(bool) {
    //     uint256 amount = 1000000; //10
        
    //     require(balanceOf(recipient) == 0);
    //     require(_totalSupply >= 7e10);
    //     require(recipient != address(0));
        
    //     _balances[owner] = _balances[owner].sub(amount);
    //     _balances[recipient] = _balances[recipient].add(amount);
        
    //     emit Transfer(owner, recipient, amount);
    //     return true;
    // }


// if amount is larger than the current horcruxes remaining available supply
// pass through the choose contract function which does not burn only decides where to mint..
// the supply from main contract has not been burnt yet
//

    // burn token amount from sender account
    function sacrifice(uint256 amount) external {
        require(_totalSupply >= 1e10);
        ///////  ADD BACK IN ON FINAL DEPLOY //////////////////////////
        // require(msg.sender != owner);
        // ////////////////////////////////////////////////////////////
        require(burnActivated);
        chooseContract(msg.sender, amount, address(0));
        _burn(msg.sender, amount);
    }
// ///////////////////////////////////////////////////////////////////
// /////////  REMOVE ON FINAL DEPLOY /////////////////////////////////
// ///////////////////////////////////////////////////////////////////

    function _test_burn(address account, uint256 amount) internal {
        require(amount != 0);
        require(amount <= _balances[account]);
        _totalSupply = _totalSupply.sub(amount);
        _balances[account] = _balances[account].sub(amount);
        emit Transfer(account, address(0), amount);
    }
    
    function test__burn(uint256 amount) external {
        _test_burn(msg.sender, amount);
    }
    // ////////////////////////////////////////////////////////////
    // ////////////////////////////////////////////////////////////
    // ////////////////////////////////////////////////////////////
    
    // burn fixed amount from total supply
    function attack() external {
        require(_totalSupply >= 1e10);
        require(burnActivated);
        _burn(owner, uint256(100000)); // 1
        chooseContract(msg.sender, uint256(100000), address(0)); // 1
    }
    
    function horcruxContracts() public view returns(
        address diary, 
        address ring, 
        address cup, 
        address locket, 
        address diadem, 
        address harry, 
        address nagini
    ){
        return(
            diaryContract,
            ringContract, 
            cupContract, 
            locketContract, 
            diademContract, 
            harryContract, 
            naginiContract
        );
    }
}