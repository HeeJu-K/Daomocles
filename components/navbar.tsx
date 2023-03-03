import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useData } from "../contexts/dataContext";
import "@fontsource/poppins";

function Navbar() {
  const router = useRouter();
  // const { account, connect, isMember, isStakeholder } = useData();
  const { account, connect } = useData();

  // const [account, setAccount] = useState("");


  // useEffect(() => {
  //   connect();
  // }, []);

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
      <nav className="w-full h-16 mt-auto max-w-6xl">
        <div className="flex flex-row justify-between items-center h-full">
          <div className="">
            <Link href="/" passHref>
              <div style={{fontSize:"2rem", fontFamily:"Poppins"}}>DAOmocles</div>
              {/* <span className="font-semibold text-xl cursor-pointer">
                DAOmocles
              </span> */}
            </Link>
            
          </div>

          {account ? (
            <div className="px-6 py-2 cursor-pointer" style={{backgroundColor:"#B98BE8", borderRadius:"15px"}}>
              <span className=" text-white" style={{fontSize:"0.8rem"}}>
                {account.substr(0, 4)}...{account.substr(38, 42)}
              </span>
            </div>
          ) : (
            <div
              className="px-6 py-2 rounded-md cursor-pointer" style={{backgroundColor:"#B98BE8", borderRadius:"15px"}}
              onClick={() => {
                console.log("clicked on connect");
                connect();
                console.log("after connect");
              }}
            >
              <span className="text-white" style={{fontSize:"0.8rem"}}>Connect</span>
            </div>
          )}
        </div>
      </nav>
      <nav className="w-full h-16 m-auto max-w-6xl flex justify-center">
        <div className="flex flex-row justify-between items-center h-full">
          {true && (
            <div className="flex flex-row items-center justify-center h-full">
              <TabButton
                title="Overview"
                isActive={router.asPath === "/"}
                url={"/"}
              />
              {true && (
                <TabButton
                  title="Incoming"
                  isActive={router.asPath === "/incoming"}
                  url={"/incoming"}
                />
              )}
              {true && (
                <TabButton
                  title="Outgoing"
                  isActive={router.asPath === "/outgoing"}
                  url={"/outgoing "}
                />
              )}
              {true && (
                <TabButton
                  title="Settings"
                  isActive={router.asPath === "/assetsinfo" || router.asPath === "/editprofiles" || router.asPath === "/editpermissions"}
                  url={"/assetsinfo"}
                />
              )}
            </div>
          )}
        </div>
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
        className={`h-full px-3 flex items-center font-semibold hover:text-white-700 cursor-pointer ${
          isActive
            ? "text-white-700 text-base font-semibold"
            : "text-gray-500 text-base"
        }`}
      >
        <span>{title}</span>
      </div>
    </Link>
  );
};
