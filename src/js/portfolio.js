const web3btn = document.getElementById("web3connect");
const acc = document.getElementById("acc");


let selectedACC;
let chainId;



const Token_Contract_Address = "0x514066a543d8Df91680b140d1d5190396cA37Eeb";

window.Moralis.initialize("BApP9VWLd91SiQd7M9StIowCFEZanTTzNPohj9HR");
window.Moralis.serverURL = "https://eusqzv48jkaq.moralisweb3.com:2053/server";

const init = async () => {
  window.web3 = await Moralis.Web3.enable();
  getNftBalance();

};

init();

const ConnectWallet = async () => {
  try {
    
    let user = await Moralis.Web3.authenticate();

    if (user) {
      const accounts = await web3.eth.getAccounts();
      const chainId = await web3.eth.net.getId();
      selectedACC = accounts[0];
      acc.innerText = selectedACC;
    }

    if ((selectedACC != null) || undefined) {
      console.log(selectedACC);
    } else {
      console.log("yo! connect the damn wallet");
    }
  } catch (e) {
    console.log(e);
  }
};


const getAndRenderItemData = (item, renderFunction) => {

  item.map((res) => {

    if(res.Metadata != null){
    fetch(res.Metadata)
      .then((r) => {
        if (r.status === 404) {
          let l = {
            name: null,
            Info: {
              description: null,
              image: "https://lettertrein.be/images/Error/404.gif",
            },
          }
          l.TokenId = res.TokenId;
          renderFunction(l);
          console.log(l)
        } else {
          let l = r.json();
          l.TokenId = res.TokenId;
          renderFunction(l);
          console.log(l)
        }
      })
  }})
};

const RenderUserItems = (inputData) => {
  
    const gg = document.getElementById("nft-balance");

    const content = `
                    <div id="container">
                        <div id="card">
                            <div id="content">
                              <img src="${inputData.Info.image}" alt="NFT image" id="nftimg" >
                                <h2>${inputData.name}</h2>
                                <h3>${inputData.TokenId}</h3>
                                <p>${inputData.Info.description}</p>
                              </div>
                          </div>
                      </div>
                        `;
    gg.innerHTML += content;
  
}; 


const getNftBalance = async() => {

  const ownerItems = await Moralis.Cloud.run("getUserItems")
  console.log(ownerItems)
  getAndRenderItemData(ownerItems , RenderUserItems);
  
}


web3btn.addEventListener("click", () => {
  ConnectWallet();
});