// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DegreeNFT is ERC721, Ownable {
    uint256 public tokenCounter;

    struct Degree {
        string certificateHash;
        string course;
        string yearOfPassing;
        string universityName;
    }

    mapping(uint256 => Degree) public degrees;

    constructor() ERC721("DegreeVault Certificate", "DVC") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function mintDegree(
        address studentWallet,
        string memory certificateHash,
        string memory course,
        string memory yearOfPassing,
        string memory universityName
    ) public onlyOwner {
        uint256 tokenId = tokenCounter;
        _safeMint(studentWallet, tokenId);

        degrees[tokenId] = Degree(
            certificateHash,
            course,
            yearOfPassing,
            universityName
        );

        tokenCounter++;
    }
}