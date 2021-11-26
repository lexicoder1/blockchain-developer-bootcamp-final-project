pragma solidity 0.8.0;

interface IERC20 {
   
    function totalSupply() external view returns (uint256);

   
    function balanceOf(address account) external view returns (uint256);


    function transfer(address recipient, uint256 amount) external returns (bool);

  
    function allowance(address owner, address spender) external view returns (uint256);

   
    function approve(address spender, uint256 amount) external returns (bool);

   
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    
    event Transfer(address indexed from, address indexed to, uint256 value);

  
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

 
    constructor() {
        _transferOwnership(_msgSender());
    }

  
    function owner() public view virtual returns (address) {
        return _owner;
    }

   
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

   
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

   
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

  
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}
contract staking is  Ownable{
    uint interestRatePerday=8;
    mapping (address=>uint) timestart;
    mapping (address=>bool) whiteListaddress; 
    mapping (string=>address) tokenaddress;
    mapping (string=>mapping(address=>uint)) balances;
    mapping (address=>bool) withdrawonce;
   
    
    function setIntrestrate(uint rate)public onlyOwner{
        interestRatePerday=rate;
    }
     function setTickerToTokenAddress(string memory ticker, address add)public onlyOwner{
        tokenaddress[ticker]=add;
         whiteListaddress[add]=true;
    }
   
     function RemoveWhiteListAddress(address add)public onlyOwner{
        whiteListaddress[add]=false;
    }
    function gettoken(string memory ticker)public {
        uint amount =1000*10**18;
        IERC20(tokenaddress[ticker]).transfer(msg.sender,amount);
        
    }
    function checkBalance(string memory ticker)public view returns(uint){
        return IERC20(tokenaddress[ticker]).balanceOf(msg.sender);
    }
    
    function stake(uint amount , string memory ticker) public {
        timestart[msg.sender]=block.timestamp;
        require( whiteListaddress[tokenaddress[ticker]]==true);
         withdrawonce[msg.sender]=true;
        balances[ticker][msg.sender]+=amount;
        IERC20(tokenaddress[ticker]).transferFrom(msg.sender,address(this),amount);
        
    }
    
    function withdraw(string memory ticker)public {
         require(block.timestamp-timestart[msg.sender]>=1 minutes);
         require(withdrawonce[msg.sender]==true);
         uint timetowithdraw=(block.timestamp-timestart[msg.sender]);
         uint reward=((((timetowithdraw*interestRatePerday)*10000000000000)/(100*86400))*balances[ticker][msg.sender])/10000000000000;
         uint bal=balances[ticker][msg.sender]+reward;
          balances[ticker][msg.sender]-=balances[ticker][msg.sender];
         IERC20(tokenaddress[ticker]).transfer(msg.sender,bal);
         withdrawonce[msg.sender]=false;
        
        
    }
 
}