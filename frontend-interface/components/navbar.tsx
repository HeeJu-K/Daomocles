import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react';
import { useData } from "../contexts/dataContext";
import "@fontsource/poppins";

function Navbar(props) {
  const {
    isCreate,
    daoname,
  } = props
  const router = useRouter();
  // const { account, connect, isMember, isStakeholder } = useData();
  const { account, connect } = useData();
  const [daoName, setDaoName] = useState("")
  const [disconnectVisible, setDisconnectVisible] = useState(false)
  // const [account, setAccount] = useState("");

  console.log("navbar daoname", daoname)
  useEffect(() => {
    if (daoname == "undefined") {
      setDaoName("")
    }
    else {
      setDaoName(daoname)
    }
    console.log("router ", router.asPath.substring(0, 6))
  }, []);

  // const connect = async () => {
  //   console.log("here")
  //   if (window.ethereum) {
  //     window.ethereum.request({ method: "eth_requestAccounts" });
  //     window.web3 = new Web3(window.ethereum);
  //     await window.ethereum.enable();
  //   } else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider);
  //   } else {
  //     window.alert("Non-Eth browser detected. Please consider using MetaMask.");
  //     return;
  //   }
  //   var allAccounts = await window.web3.eth.getAccounts();
  //   setAccount(allAccounts[0]);
  //   // await loadBlockchainData();
  // };

  return (
    <>
      <nav className="w-full h-30 mt-auto max-w-6xl" >
        <div className="flex flex-row justify-between items-center h-full">
          <div className="" >
            <Link href="/" passHref>
              <div style={{ fontSize: "2rem", marginTop: "20px" }}>DAOmocles</div>
              {/* <span className="font-semibold text-xl cursor-pointer">
                DAOmocles
              </span> */}
            </Link>
            {/* <span style={{ fontSize: "1rem", color: "white", marginLeft: "15px", backgroundColor: "#B98BE8", borderRadius: "5px", paddingLeft: "5px", paddingRight: "5px" }}>Hi </span>
            <span style={{ fontSize: "1rem", color: "#B98BE8" }}>THUBA DAO</span> */}
            {/* <span style={{ fontSize: "1rem", color: "white" }}>Hi there!</span> */}
            {daoName &&
              <span style={{ fontSize: "1.1rem", color: "white", marginTop: "30px", backgroundColor: "#B98BE8", borderRadius: "10px", padding: "2px", paddingLeft: "8px", paddingRight: "8px" }}>{daoName}</span>
            }
          </div>

          {account ? (
            // <div className="px-6 py-2 cursor-pointer" style={{ backgroundColor: "#B98BE8", borderRadius: "15px" }}
            //   onClick={() => {
            //     console.log("clicked for disconnect", account)
            //   }}
            // >
            // <>
            //   <select
            //     className="px-6 py-2 cursor-pointer border border-black rounded-xl text-black"
            //     name="connectbutton"
            //     id="connect"
            //     style={{ backgroundColor: "#B98BE8" }}
            //   >

            //     <option value="Dec">disconnect</option>
            //   </select>
            <div style={{ float: "right"}}>

              <div className="px-6 py-2 cursor-pointer" style={{ marginTop: "30px", backgroundColor: "#1F2129", border: "2px solid #B98BE8", borderRadius: "15px", marginBottom: "5px" }}
                onClick={() => {
                  if (disconnectVisible == true) {
                    setDisconnectVisible(false)
                  }
                  else {
                    setDisconnectVisible(true)
                  }
                  console.log("clicked account", account)
                }}
              >

                <span className=" text-white" style={{ fontSize: "0.8rem", textAlign: "center" }}>
                  {account.substr(0, 4)}...{account.substr(38, 42)}  v
                </span>
              </div>
              {disconnectVisible &&
                <div>
                  <div className="px-6 py-2 cursor-pointer" style={{ backgroundColor: "#B98BE8", borderRadius: "15px", height: "41px" }}
                    onClick={() => {
                      setDisconnectVisible(false)
                      console.log("clicked disconnect button", account)
                    }}
                  >
                    <span className=" text-white" style={{ fontSize: "0.8rem", textAlign: "center" }}>
                      disconnect
                    </span>
                  </div>
                </div>
              }
            </div>
          ) : (
            <div
              className="px-6 py-2 rounded-md cursor-pointer" style={{ backgroundColor: "#B98BE8", borderRadius: "15px" }}
              onClick={() => {
                console.log("clicked on connect");
                connect();
                console.log("after connect");
              }}
            >
              <span className="text-white" style={{ fontSize: "0.8rem" }}>Connect</span>
            </div>
          )}
        </div>
      </nav>
      <nav className="w-full h-23 m-auto max-w-6xl flex justify-center">
        {/* <div className="flex flex-row justify-between items-center h-full" style={{width:"600px"}}> */}
        {!isCreate && (
          // <div className="flex flex-row items-center justify-center h-full" style={{width:"700px"}}>
          <div style={{ display: "flex", width: "80%", marginTop: "50px", marginBottom: "10px" }}>

            <TabButton
              title="Overview"
              isActive={router.asPath.substring(0, 9) === "/overview"}
              url={"/overview?DAO=" + daoName}
            />
            {true && (
              <TabButton
                title="Incoming"
                isActive={router.asPath.substring(0, 9) === "/incoming"}
                url={"/incoming?DAO=" + daoName}
              />
            )}
            {true && (
              <TabButton
                title="Outgoing"
                isActive={router.asPath.substring(0, 9) === "/outgoing"}
                url={"/outgoing?DAO=" + daoName}
              />
            )}
            {true && (
              <TabButton
                title="Settings"
                isActive={router.asPath.substring(0, 11) === "/assetsinfo" || router.asPath.substring(0, 13) === "/editprofiles" || router.asPath.substring(0, 16) === "/editpermissions"}
                url={"/assetsinfo?DAO=" + daoName}
              />
            )}
          </div>
        )}
        {/* </div> */}
      </nav>
    </>
  );
}

export default Navbar;

const TabButton = ({
  title,
  isActive,
  url,
}: {
  title: string;
  isActive: boolean;
  url: string;
}) => {
  return (
    <Link href={url} passHref>
      <div
        style={{ fontSize: "1.3rem" }}
        className={`h-full w-2/6 px-3 flex items-center font-semibold hover:text-white-700 cursor-pointer ${isActive
          ? "text-white-700 text-base font-semibold"
          : "text-gray-500 text-base"
          }`}
      >
        <span>{title}</span>
      </div>
    </Link>
  );
};
