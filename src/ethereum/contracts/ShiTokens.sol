pragma solidity ^0.5.11;

import '../../../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '../../../node_modules/@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol';
import '../../../node_modules/@openzeppelin/contracts/math/SafeMath.sol';

contract ApproveCallFallback {
    function receiveApproval(address from, uint256 tokens, address token, bytes memory data) public;
}

contract ShiTokens is IERC20, ERC20Detailed {
    using SafeMath for uint256;
    
    mapping(address => uint) public balances;
    mapping(address => mapping(address => uint)) public allowed;
    
    uint256 private _totalSupply;
    uint256 private _initialSupply;
    address public owner;
    uint256 private capped; 
    
    event Approval(address indexed tokenOwner, address indexed spender, uint256 tokens );
    event Transfer(address indexed from, address indexed to, uint256 tokens);
    
    constructor(uint256 numTokens, uint cap, uint256 initalSupply) ERC20Detailed("ShiToken", "SHI", 3) public {
        capped = cap;
        _totalSupply = numTokens;
        _initialSupply = initalSupply;
        owner = msg.sender;
        balances[owner] = initalSupply;
    }
    
    function totalSupply() public view returns(uint256) {
        return _totalSupply;
    }
    
    function balanceOf(address tokenOwner) public view returns(uint256) {
        return balances[tokenOwner];
    }
    
    function transfer(address to, uint tokens) public returns(bool) {
        require(to != address(0), "enter valid address");
        balances[msg.sender] = balances[msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);
        emit Transfer(msg.sender, to, tokens);
        return true;
    }
    
    function approve(address delegate, uint tokens) public returns(bool) {
        allowed[msg.sender][delegate] = tokens;
        emit Approval(msg.sender, delegate, tokens);
        return true;
    }
    
    function allowance(address tokenOwner, address delegate) public view returns(uint) {
        return allowed[tokenOwner][delegate];
    }
    
    function transferFrom(address tokenOwner, address to, uint tokens) public returns(bool) {
        require(tokens <= balances[tokenOwner], "Insufficient amount");
        require(tokens <= allowed[tokenOwner][msg.sender], "Insufficient amount");
        
        balances[tokenOwner] = balances[tokenOwner].sub(tokens);
        allowed[tokenOwner][msg.sender] = (allowed[tokenOwner][msg.sender]).sub(tokens);
        balances[to] = balances[to].add(tokens);
        
        emit Transfer(tokenOwner, to, tokens);
        return true;
        
    }
    
    function approveAndCall(address delegate, uint tokens, bytes memory data) public returns(bool) {
        allowed[msg.sender][delegate] = tokens;
        emit Approval(msg.sender, delegate, tokens);
        ApproveCallFallback(delegate).receiveApproval(msg.sender, tokens, address(this), data);
        return true;
    }
    
    function mint(address account, uint256 amount) public returns(bool) {
        require(msg.sender == owner, "Not allowed to perform this action");
        require(account != address(0), "Ivalid account");
        require((_totalSupply + amount) <= capped );
        
        _totalSupply = _totalSupply.add(amount);
        balances[account] = balances[account].add(amount);
        
        return true;
    }
    
    function burn(address account, uint256 amount) public returns(bool) {
        require(msg.sender == owner, "Not allowed to perform this action");
        require(account != address(0), "Invalid account");
        require(amount <= balances[account], "burn amount exceeds balance");
        
        balances[account] = balances[account].sub(amount);
        _totalSupply = _totalSupply.sub(amount);
        
        return true;
        
    }
    
    function () external payable {
        revert();
    }
}

