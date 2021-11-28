pragma solidity 0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

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
contract token is ERC20 ,Ownable{
    constructor (string memory name,string memory ticker,uint256 amount) ERC20(name,ticker){
        _mint(msg.sender,  amount);
    }
    function minttoken(uint amount)public onlyOwner {
              _mint(msg.sender,  amount); 
    }
}