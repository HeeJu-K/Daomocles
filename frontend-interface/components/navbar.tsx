import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, Fragment } from 'react';
import { useData } from "../contexts/dataContext";
import "@fontsource/poppins";
import styles from "../styles/Home.module.css";
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import THUBA from "../temp_assets/THUBA_logo.png";
import Edu from "../temp_assets/EduDAO_logo.png";
import Bit from "../temp_assets/bitDAO_logo.jpg";

function Navbar(props) {
  const {
    isCreate,
    daoname,
    daoaccess
  } = props
  const router = useRouter();
  // const { account, connect, isMember, isStakeholder } = useData();
  const { account, connect } = useData();
  const [daoName, setDaoName] = useState("")
  const [daoAccess, setDaoAccess] = useState("")

  // const [account, setAccount] = useState("");

  console.log("navbar daoname", daoname)
  useEffect(() => {
    if (daoname == "undefined") {
      setDaoName("")
    }
    else {
      setDaoName(daoname)
    }
    setDaoAccess(daoaccess)
    console.log("see daoname and dao access ", daoname, daoaccess)
  }, []);
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  interface DAOBriefInterface {
    logoURL: string;
    name: string;
    introduction: string;
    treasuryAddress: string;
    access: string;
  }

  interface UserInfoInterface {
    userAddress: string;
    profileList: Array<DAOBriefInterface>;
    // subAdminList: Array<DAOBriefInterface>;
    // memberList: Array<DAOBriefInterface>;
  }

  const daoTestData: UserInfoInterface = {
    userAddress: "0x18928391",
    profileList: [
      {
        logoURL: Bit,
        // logoURL: "htp://.,..,.",
        // logoURL: "https://images.unsplash.com/photo-1598124146163-36819847286d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        name: "BIT DAO",
        introduction: "introduction here",
        treasuryAddress: "0xjasiejif",

        access: "admin"
      },
      {
        logoURL: THUBA,
        // logoURL: "https://bobbyhadz.com/images/blog/react-display-image-from-url/banner.webp",
        name: "THUBA DAO",
        introduction: "introduction here",
        treasuryAddress: "0xjasiejif",
        access: "subadmin"
      },
      {
        logoURL: Edu,
        // logoURL: "https://bobbyhadz.com/images/blog/react-display-image-from-url/banner.webp",
        name: "Edu DAO",
        introduction: "introduction here",
        treasuryAddress: "0xjasiejif",
        access: "member"
      },
    ]
  }

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
      <nav className="w-full mt-auto max-w-6xl" style={{ height: "100px" }} >
        <div className="flex flex-row justify-between items-center h-full">
          <div className="" >
            <Link href={"/overview?DAO=" + daoName + '&permission=' + daoAccess} passHref>
              <div style={{ fontSize: "2rem", marginTop: "20px" }}>DAOmocles</div>
              {/* <span className="font-semibold text-xl cursor-pointer">
                DAOmocles
              </span> */}
            </Link>
            {/* <span style={{ fontSize: "1rem", color: "white", marginLeft: "15px", backgroundColor: "#B98BE8", borderRadius: "5px", paddingLeft: "5px", paddingRight: "5px" }}>Hi </span>
            <span style={{ fontSize: "1rem", color: "#B98BE8" }}>THUBA DAO</span> */}
            {daoName &&
              <span style={{ fontSize: "1.1rem", color: "white", marginTop: "30px", backgroundColor: "#B98BE8", borderRadius: "10px", padding: "2px", paddingLeft: "8px", paddingRight: "8px" }}>{daoName}</span>
            }
          </div>


          <div className={styles.accountdao}>

            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button
                  className="inline-flex w-full justify-center gap-x-1.5 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black-900  hover:bg-gray-50"
                  style={{ boxShadow: "2px 2px #B98BE8", color: "black" }}
                >
                  {daoname && daoname}
                  <ChevronDownIcon className="-mr-1 h-5 w-5 text-black-400" aria-hidden="true" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {!isCreate &&
                      daoTestData.profileList.map((item) => {
                        return (
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href={'/outgoing?DAO=' + item.name + '&permission=' + item.access}
                                className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        )
                      })}
                    <div className="flex-grow border-t border-gray-200 " ></div>
                    <form method="POST" action="#">
                      <Menu.Item
                      >
                        {({ active }) => (
                          <a
                            href={'/create'}
                            className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}
                          >
                            + Create New
                          </a>
                          // <button
                          //   type="submit"
                          //   className={classNames(
                          //     active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          //     'block w-full px-4 py-2 text-left text-sm border-black'
                          //   )}

                          // >
                          //   + Create New
                          // </button>
                        )}
                      </Menu.Item>
                    </form>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {account ? (
              <div style={{ float: "right" }}>

                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button
                      className="inline-flex w-full justify-center gap-x-1.5 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-white-900  hover:bg-gray-50"
                      style={{ backgroundColor: "#B98BE8", boxShadow: "2px 2px white" }}
                    >
                      {account.substr(0, 4)}...{account.substr(38, 42)}
                      <ChevronDownIcon className="-mr-1 h-5 w-5 text-white-400" aria-hidden="true" />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">

                        <form method="POST" action="#">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                type="submit"
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block w-full px-4 py-2 text-left text-sm'
                                )}
                              >
                                Disconnect
                              </button>
                            )}
                          </Menu.Item>
                        </form>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>


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
        </div>

      </nav>
      <nav className="w-full h-23 m-auto max-w-6xl flex justify-center">
        {/* <div className="flex flex-row justify-between items-center h-full" style={{width:"600px"}}> */}
        {!isCreate && (
          // <div className="flex flex-row items-center justify-center h-full" style={{width:"700px"}}>
          <div style={{ display: "flex", width: "80%", marginTop: "50px", marginBottom: "10px" }}>

            {(daoAccess == "admin" || daoAccess == "subadmin") && (
              <TabButton
                title="Overview"
                isActive={router.asPath.substring(0, 9) === "/overview"}
                url={"/overview?DAO=" + daoName + '&permission=' + daoAccess}
              />)}
            {(daoAccess == "admin" || daoAccess == "subadmin") && (
              <TabButton
                title="Incoming"
                isActive={router.asPath.substring(0, 9) === "/incoming"}
                url={"/incoming?DAO=" + daoName + '&permission=' + daoAccess}
              />
            )}
            {true && (
              <TabButton
                title="Outgoing"
                isActive={router.asPath.substring(0, 9) === "/outgoing"}
                url={"/outgoing?DAO=" + daoName + '&permission=' + daoAccess}
              />
            )}
            {daoAccess == "admin" && (
              <TabButton
                title="Settings"
                isActive={router.asPath.substring(0, 11) === "/assetsinfo" || router.asPath.substring(0, 13) === "/editprofiles" || router.asPath.substring(0, 16) === "/editpermissions"}
                url={"/assetsinfo?DAO=" + daoName + '&permission=' + daoAccess}
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
