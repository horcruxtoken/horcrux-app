pragma solidity ^ 0.5.0;

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

contract X_NSTests is ERC20Detailed, Owned {

    using SafeMath for uint256;

    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowed;

    string constant tokenName = "CRX5.0";
    string constant tokenSymbol = "CRx5";
    uint8  constant tokenDecimals = 5;
    uint256 _totalSupply = 0;
    
    // address of main contract
    address public authorizedContract;
    
    // if true, owner cannot change authorized contract
    bool public contractIsUnchangable;

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

    // add main contract address, only callable once
    function addAuthorizedContract(address main_contract_address) public returns(bool) {
        require(msg.sender == owner);
        require(!contractIsUnchangable);
        authorizedContract = main_contract_address;
        // make this function uncallable
        contractIsUnchangable = true;
        return true;
    }
    
    // if conditions are met burn on transfer, else exicute a normal transfer
    function transfer(address to, uint256 value) public returns(bool) {
        require(value <= _balances[msg.sender]);
        require(to != address(0));
        _balances[msg.sender] = _balances[msg.sender].sub(value);
        _balances[to] = _balances[to].add(value);
        emit Transfer(msg.sender, to, value);
        return true;
    }

    // approve allowance
    function approve(address spender, uint256 value) public returns(bool) {
        require(spender != address(0));
        _allowed[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    // transfer from approved tokens
    function transferFrom(address from, address to, uint256 value) public returns(bool) {
        require(value <= _balances[from]);
        require(value <= _allowed[from][msg.sender]);
        require(to != address(0));
        require(from != address(0));
        _balances[from] = _balances[from].sub(value);
        _allowed[from][msg.sender] = _allowed[from][msg.sender].sub(value);
        _balances[to] = _balances[to].add(value);
        emit Transfer(from, to, value);
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

    // mint new tokens, owner gets zero, supply starts at zero
    // accessable only at contract deployment, only once
    function _mint(address account, uint256 value) internal {
        _balances[account] = _balances[account].add(value);
        emit Transfer(address(0), account, value);
    }

    // owner gets nothing, tokens must be minted from other contracts transactions
    function _mintAmount(address sender, uint256 amount) internal {
        require(amount != 0);
        _totalSupply = _totalSupply.add(amount);
        _balances[sender] = _balances[sender].add(amount);
        // even though from address = main contract owner, emit from = address(0)
        // emit Transfer(address(0), sender, amount);
        emit Transfer(address(0), sender, amount);
    }

    // exicutable only from main contract
    function amountToMint(address sender, uint256 value) external {
        // msg.sender must be equal to the authorized contract
        require(msg.sender == authorizedContract);
        _mintAmount(sender, value);
    }
}