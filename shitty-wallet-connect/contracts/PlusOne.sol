// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract PlusOne {
    int private counter = 0;

    function increase() public payable {
        counter += 1;
    }

    function decrease() public payable {
        counter -= 1;
    }

    function getTheCurrentCount() public view returns (int){
        return counter;
    }
}