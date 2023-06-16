// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import "./IERC20Permit.sol";

contract Vault {
    // IERC20Permit public immutable token;
    address owner;

    constructor(address _vault) {
        owner = _vault;
    }

    function deposit(uint amount, address token) external {
       IERC20Permit  _token = IERC20Permit(token);
        _token.transferFrom(msg.sender, address(this), amount);
    }

    /*
    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    )
    */
    function depositWithPermit(uint amount, uint deadline, address token, uint8 v, bytes32 r, bytes32 s) external {
        IERC20Permit _token = IERC20Permit(token);
        _token.permit(msg.sender, address(this), amount, deadline, v, r, s);

        _token.transferFrom(msg.sender, address(this), amount);
    }
}