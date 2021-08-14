const web3btn = document.getElementById("web3connect");
const acc = document.getElementById("acc");
const test = document.getElementById("test");
const meme = document.getElementById("meme-image");

let selectedACC;
let metadata_hash = null;
let nonce_needed = null;
let contract = null;
let NFTName = null;
let NFTDescription = null;

const Token_Contract_Address = "0x514066a543d8Df91680b140d1d5190396cA37Eeb";

window.Moralis.initialize("BApP9VWLd91SiQd7M9StIowCFEZanTTzNPohj9HR");
window.Moralis.serverURL = "https://eusqzv48jkaq.moralisweb3.com:2053/server";

const init = async () => {
  window.web3 = await Moralis.Web3.enable();
  window.tokenContract = new web3.eth.Contract(MemeABI, Token_Contract_Address);
};

init();

const ConnectWallet = async () => {
  try {
    window.tokenContract = new web3.eth.Contract(
      MemeABI,
      Token_Contract_Address
    );
    let user = await Moralis.Web3.authenticate();

    if (user) {
      const accounts = await web3.eth.getAccounts();
      const chainId = await web3.eth.net.getId();
      selectedACC = accounts[0];
      acc.innerText = selectedACC;
    }

    if ((selectedACC != null) | undefined) {
      console.log(selectedACC);
    } else {
      console.log("yo! connect the damn wallet");
    }
  } catch (e) {
    console.log(e);
  }
};

web3btn.addEventListener("click", () => {
  ConnectWallet();
});

document
  .getElementById("nft-file-input")
  .addEventListener("change", async (res) => {
    const pinataApiKey = "a770d310d147135d5ec4";
    const pinataSecretApiKey =
      "076b05a1c38c2910d32a8079e1007d52b8c02264990e0af61fa0e544cd760c78";
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
    const jsonUrl = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

    let data = new FormData();
    data.append("file", res.target.files[0]);

    axios
      .post(url, data, {
        maxBodyLength: "Infinity", //this is needed to prevent axios from erroring out with large files
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      })
      .then((response) => {
        //handle response here
        console.log(response.data);
        console.log(
          `image url = https://ipfs.io/ipfs/` + response.data.IpfsHash
        );

        const metadata = JSON.stringify({
          name: NFTName,
          Info: {
            description: NFTDescription,
            image: `https://ipfs.io/ipfs/` + response.data.IpfsHash,
          },
        });

        axios
          .post(jsonUrl, metadata, {
            maxBodyLength: "Infinity", //this is needed to prevent axios from erroring out with large files
            headers: {
              "Content-Type": "application/json",
              pinata_api_key: pinataApiKey,
              pinata_secret_api_key: pinataSecretApiKey,
            },
          })
          .then((res) => {
            console.log(
              `metadata url = https://ipfs.io/ipfs/${res.data.IpfsHash}`
            );
            let gg = `https://ipfs.io/ipfs/${res.data.IpfsHash}`;
            metadata_hash = gg;

            swal("Good job!", "Image and Metadata Uploaded!", "success");
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  });

document.querySelector(".nes-input").addEventListener("change", (r) => {
  console.log(r.target.value);
  NFTDescription = r.target.value;
});

document.querySelector(".nes-textarea").addEventListener("change", (res) => {
  console.log(res.target.value);
  NFTName = res.target.value;
});

document.getElementById("Submit").addEventListener("click", async () => {
  console.log(
    NFTDescription,
    NFTName,
    tokenContract,
    metadata_hash,
    Token_Contract_Address,
    ethereum.selectedAddress
  );

  const nonce = await web3.eth.getTransactionCount(
    ethereum.selectedAddress,
    "latest"
  );
  nonce_needed = nonce.toString();

  const mintNFT = async (tokenURI) => {
    //tokenContract.methods.createItem("tokenURI").send({from : ethereum.selectedAddress}).on('transactionHash' , (hash) => console.log(hash))

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            from: ethereum.selectedAddress,
            to: Token_Contract_Address,
            nonce: nonce_needed,
            data: tokenContract.methods.createItem(tokenURI).encodeABI(),
          },
        ],
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  mintNFT(metadata_hash);

  document.querySelector(".nes-textarea").value = "";
  document.querySelector(".nes-input").value = "";
});
