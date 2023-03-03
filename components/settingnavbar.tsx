import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useData } from "../contexts/dataContext";

function SettingNavbar() {
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
      <nav className="w-full mt-auto max-w-6xl">
        <div className="flex flex-row justify-between items-center h-full">

        </div>
      </nav>
      <nav className="w-full h-16 m-auto max-w-6xl float right">
        <div className="flex flex-row justify-between items-center h-full">
          {true && (
            <div className="flex flex-row items-center justify-center h-full">
              <TabButton
                title="Set Assets Information"
                isActive={router.asPath === "/assetsinfo"}
                url={"/assetsinfo"}
              />
              {true && (
                <TabButton
                  title="Edit Profiles"
                  isActive={router.asPath === "/editprofiles"}
                  url={"/editprofiles"}
                />
              )}
              {true && (
                <TabButton
                  title="Edit Permissions"
                  isActive={router.asPath === "/editpermissions"}
                  url={"/editpermissions"}
                />
              )}

            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default SettingNavbar;

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
