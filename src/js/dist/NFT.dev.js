"use strict";

var web3btn = document.getElementById("web3connect");
var acc = document.getElementById("acc");
var test = document.getElementById("test");
var meme = document.getElementById("meme-image");
var selectedACC;
var metadata_hash = null;
var nonce_needed = null;
var contract = null;
var NFTName = null;
var NFTDescription = null;
var Token_Contract_Address = "0x514066a543d8Df91680b140d1d5190396cA37Eeb";
window.Moralis.initialize("BApP9VWLd91SiQd7M9StIowCFEZanTTzNPohj9HR");
window.Moralis.serverURL = "https://eusqzv48jkaq.moralisweb3.com:2053/server";

var init = function init() {
  return regeneratorRuntime.async(function init$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Moralis.Web3.enable());

        case 2:
          window.web3 = _context.sent;
          window.tokenContract = new web3.eth.Contract(MemeABI, Token_Contract_Address);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

init();

var ConnectWallet = function ConnectWallet() {
  var user, accounts, chainId;
  return regeneratorRuntime.async(function ConnectWallet$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          window.tokenContract = new web3.eth.Contract(MemeABI, Token_Contract_Address);
          _context2.next = 4;
          return regeneratorRuntime.awrap(Moralis.Web3.authenticate());

        case 4:
          user = _context2.sent;

          if (!user) {
            _context2.next = 14;
            break;
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap(web3.eth.getAccounts());

        case 8:
          accounts = _context2.sent;
          _context2.next = 11;
          return regeneratorRuntime.awrap(web3.eth.net.getId());

        case 11:
          chainId = _context2.sent;
          selectedACC = accounts[0];
          acc.innerText = selectedACC;

        case 14:
          if (selectedACC != null | undefined) {
            console.log(selectedACC);
          } else {
            console.log("yo! connect the damn wallet");
          }

          _context2.next = 20;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

web3btn.addEventListener("click", function () {
  ConnectWallet();
});
document.getElementById("nft-file-input").addEventListener("change", function _callee(res) {
  var pinataApiKey, pinataSecretApiKey, url, jsonUrl, data;
  return regeneratorRuntime.async(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          pinataApiKey = "a770d310d147135d5ec4";
          pinataSecretApiKey = "076b05a1c38c2910d32a8079e1007d52b8c02264990e0af61fa0e544cd760c78";
          url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
          jsonUrl = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
          data = new FormData();
          data.append("file", res.target.files[0]);
          axios.post(url, data, {
            maxBodyLength: "Infinity",
            //this is needed to prevent axios from erroring out with large files
            headers: {
              "Content-Type": "multipart/form-data; boundary=".concat(data._boundary),
              pinata_api_key: pinataApiKey,
              pinata_secret_api_key: pinataSecretApiKey
            }
          }).then(function (response) {
            //handle response here
            console.log(response.data);
            console.log("image url = https://ipfs.io/ipfs/" + response.data.IpfsHash);
            var metadata = JSON.stringify({
              name: NFTName,
              Info: {
                description: NFTDescription,
                image: "https://ipfs.io/ipfs/" + response.data.IpfsHash
              }
            });
            axios.post(jsonUrl, metadata, {
              maxBodyLength: "Infinity",
              //this is needed to prevent axios from erroring out with large files
              headers: {
                "Content-Type": "application/json",
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey
              }
            }).then(function (res) {
              console.log("metadata url = https://ipfs.io/ipfs/".concat(res.data.IpfsHash));
              var gg = "https://ipfs.io/ipfs/".concat(res.data.IpfsHash);
              metadata_hash = gg;
              swal("Good job!", "Image and Metadata Uploaded!", "success");
            });
          })["catch"](function (error) {
            console.log(error);
          });

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
});
document.querySelector(".nes-input").addEventListener("change", function (r) {
  console.log(r.target.value);
  NFTDescription = r.target.value;
});
document.querySelector(".nes-textarea").addEventListener("change", function (res) {
  console.log(res.target.value);
  NFTName = res.target.value;
});
document.getElementById("Submit").addEventListener("click", function _callee2() {
  var nonce, mintNFT;
  return regeneratorRuntime.async(function _callee2$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          console.log(NFTDescription, NFTName, tokenContract, metadata_hash, Token_Contract_Address, ethereum.selectedAddress);
          _context5.next = 3;
          return regeneratorRuntime.awrap(web3.eth.getTransactionCount(ethereum.selectedAddress, "latest"));

        case 3:
          nonce = _context5.sent;
          nonce_needed = nonce.toString();

          mintNFT = function mintNFT(tokenURI) {
            return regeneratorRuntime.async(function mintNFT$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    //tokenContract.methods.createItem("tokenURI").send({from : ethereum.selectedAddress}).on('transactionHash' , (hash) => console.log(hash))
                    ethereum.request({
                      method: "eth_sendTransaction",
                      params: [{
                        from: ethereum.selectedAddress,
                        to: Token_Contract_Address,
                        nonce: nonce_needed,
                        data: tokenContract.methods.createItem(tokenURI).encodeABI()
                      }]
                    }).then(function (result) {
                      console.log(result);
                    })["catch"](function (error) {
                      console.log(error);
                    });

                  case 1:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          };

          mintNFT(metadata_hash);
          document.querySelector(".nes-textarea").value = "";
          document.querySelector(".nes-input").value = "";

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  });
});