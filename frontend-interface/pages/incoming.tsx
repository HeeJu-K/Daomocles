import Head from "next/head";
import { FormEvent, useState } from "react";
import Navbar from "../components/navbar";
// import { ProposalList } from "../components/proposalList";
// import { useData } from "../contexts/dataContext";
import styles from "../styles/Home.module.css";
import ReactModal from 'react-modal';

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [label, setLabel] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState("Edit");
  const [recipient, setRecipient] = useState("");
  let fixedData = []
  const [fixed, setFixed] = useState({})
  const [image, setImage] = useState<File | null>();
  let daoname = ""
  let daoaccess = ""
  if (typeof window !== "undefined") {
    const queryParameters = new URLSearchParams(window.location.search)
    daoname = queryParameters.get("DAO")
    daoaccess = queryParameters.get("permission")
  }
  interface TableEntryInterface {
    name: string;
    details: string;
    label: string;
    network: string;
    asset: string;
    value: string;
    type: string;
    time: string;
  }
  const tmpData: Array<TableEntryInterface> = [
    {
      name: "",
      details: "",
      label: "",
      network: "Metis",
      asset: "+43",
      value: "+140",
      type: "Metis",
      time: "2023-01-16",
    },
    {
      name: "Brian",
      details: "Donation by Jimmy for club recruiting",
      label: "donation",
      network: "Mantle",
      asset: "+300",
      value: "+300",
      type: "USDT",
      time: "2022-12-07",
    },
    {
      name: "Won Eth SF",
      details: "1st prize at Main track",
      label: "hackathon",
      network: "Ethereum",
      asset: "+20",
      value: "+3472",
      type: "ETH",
      time: "2022-11-25",
    },
    {
      name: "Jimmy",
      details: "Donation by Jimmy for Hackathon",
      label: "donation",
      network: "Polygon",
      asset: "+1428",
      value: "+1000",
      type: "MATIC",
      time: "2022-10-04",
    },
  ]

  const [editState, setEditState] = useState(Array.from({ length: tmpData.length }, () => false));


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var id;
    if (image) {
      let formData = new FormData();
      formData.append("image", image);
      var res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });
      var data = await res.json();
      id = data.id;
    }
    // await createProposal({
    //   title,
    //   description,
    //   amount,
    //   recipient,
    //   imageId: id ?? "",
    // });
    setTitle("");
    setDescription("");
    setAmount("");
    setRecipient("");
    setImage(null);
  };

  // const handleNameChange = (e) => {
  //   // setName(e.target.value);
  //   fixedData = ["name", e.target.value, e.currentTarget.id]
  //   setFixed({
  //     fixed,
  //     fixedData,
  //   })
  //   console.log("fixed data", fixed)
  // }
  // const handleDescriptionChange = (e) => {
  //   // setDescription(e.target.value);
  //   fixedData.push(["detail", e.target.value, e.currentTarget.id])
  //   setFixed({
  //     fixed,
  //     fixedData,
  //   })
  // }
  // const handleLabelChange = (e) => {
  //   setLabel(e.target.value)
  //   fixedData.push(["label", e.target.value, e.currentTarget.id])
  //   setFixed({
  //     fixed,
  //     fixedData,
  //   })
  // }
  const handleDummy = (e) => {
    console.log("new table test", document.getElementById('name0') as HTMLInputElement)
    // console.log("new table data", fixed)
    let i = 0
    let tmp = [[]]
    // for (i=0; i<tmpData.length; i++) {
    //   tmp.push([
    //     ['name', (document.getElementById('name'+i.toString()) as HTMLInputElement).value, i],
    //     ['detail', (document.getElementById('detail'+i.toString()) as HTMLInputElement).value, i],
    //     ['label', (document.getElementById('label'+i.toString()) as HTMLInputElement).value, i],
    //   ])
    // }
    console.log("new table data", tmp)
    const input = document.getElementById('input-field') as HTMLInputElement;


    if (isEdit) {
      // save pressed
      console.log("new table data", fixed)
    }
  }
  function closeModal() {
    setIsEdit(false);
  }

  console.log("new table edit", isEdit)

  // const { isMember, isStakeholder, loading } = useData();
  // if (loading) return <div>Loading...</div>;
  return (
    <div className={styles.container}>
      <Head>
        <title>DAOmocles</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        daoname={daoname}
        daoaccess={daoaccess}
      />
<<<<<<< HEAD
      <main className="w-full flex flex-col py-4 flex-grow max-w-8xl items-center">
        {/* <div className="flex flex-col justify-center"> */}
        <div className={styles.incomingoutgoing}>
          <ReactModal
            className={styles.editmodal}
            isOpen={isEdit}
            onRequestClose={closeModal}
          >
            <table className="table-fixed w-full border-white border">
              <thead className="border-white border max-w-xs">
                <tr>
                  <th>Item Name</th>
                  <th>Descriptions</th>
                  <th>Label</th>
                  <th>Network</th>
                  <th>Asset</th>
                  <th>Value</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody className="mt-4 max-w-xs">
                {tmpData.map((item, key) => {
                  return (
                    <tr>
                      <td>
                        {!item.name && isEdit ?
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                            // onChange={handleNameChange}
                            type="text" id={"name" + key.toString()}>
                          </input>
                          : <span>{item.name}</span>
                        }</td>
                      <td>
                        {!item.details && isEdit ?
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                            // onChange={handleDescriptionChange}
                            type="text" id={"detail" + key.toString()}>
                          </input>
                          : <span>{item.details}</span>
                        }
                      </td>
                      <td>
                        {!item.label && isEdit ?
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                            // onChange={handleLabelChange}
                            type="text" id={"label" + key.toString()}>
                          </input>
                          : <span>{item.label}</span>
                        }
                      </td>

                      <td>{item.network}</td>
                      <td>{item.asset}</td>
                      <td>{item.value}</td>
                      <td>{item.time}</td>
                    </tr>)
                })}

              </tbody>
            </table>
            <button className={styles.confirmbutton} style={{ marginLeft: "40%" }}>Confirm</button>
          </ReactModal>

          {/* <span className="text-xl text-center">Create a new Proposal</span> */}
          <p className="mt-4 w-full flex flex-grow items-center justify-between">
            <div>
              Month &nbsp;
              <select className="px-3 py-1 border border-black rounded-xl text-black" name="Months" id="months">
                <option value="Jan">Jan</option>
                <option value="Feb">Feb</option>
                <option value="Mar">Mar</option>
                <option value="Apr">Apr</option>
                <option value="May">May</option>
                <option value="Jun">Jun</option>
                <option value="Jul">Jul</option>
                <option value="Aug">Aug</option>
                <option value="Sep">Sep</option>
                <option value="Oct">Oct</option>
                <option value="Nov">Nov</option>
                <option value="Dec">Dec</option>
              </select>

              &emsp; Tags &nbsp;
              <select className="px-3 py-1 border border-black rounded-xl text-black" name="Labels" id="labels">
                <option value="donation">donation</option>
                <option value="hackathon">hackathon</option>
              </select>
              &emsp;

              <button
                className={styles.tablebutton}
                style={{ width: "85px" }}
                type="submit"
                name="search-button"
                id="search-button"
              >
                Search
              </button>
            </div>

            <div>
              <button
                className={styles.tablebutton}
                style={{ width: "60px" }}
                type="submit"
                name="search-button"
                id="search-button"
                onClick={() => {
                  // handleDummy()
                  if (isEdit) {
                    setIsEdit(false)
                  } else {
                    setIsEdit(true)
                  }

                }}
              >
                {isEdit ? <span>Save</span> : <span>Edit</span>}
              </button>
            </div>

          </p>

          <p className="mt-4 flex flex-col justify-center" id="table">
            <table className="table-fixed border-white border">
              <thead className="border-white border max-w-xs">
                <tr>
                  <th>Item Name</th>
                  <th>Descriptions</th>
                  <th>Label</th>
                  <th>Network</th>
                  <th>Token</th>
                  <th>Asset</th>
                  <th>Value</th>
                  <th>Time</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="mt-4 max-w-xs">
                {tmpData.map((item, key) => {
                  return (
                    <tr>
                      <td>
                        {/* {key == } */}
                        {!item.name && editState[key] ?
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                            // onChange={handleNameChange}
                            type="text" id={"name" + key.toString()}>
                          </input>
                          : <span>{item.name}</span>
                        }</td>
                      <td>
                        {!item.details && editState[key] ?
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                            // onChange={handleDescriptionChange}
                            type="text" id={"detail" + key.toString()}>
                          </input>
                          : <span>{item.details}</span>
                        }
                      </td>
                      <td>
                        {!item.label && editState[key] ?
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                            // onChange={handleLabelChange}
                            type="text" id={"label" + key.toString()}>
                          </input>
                          : <span>{item.label}</span>
                        }
                      </td>
                      <td>{item.name}</td>
                      <td>{item.network}</td>
                      <td>{item.asset}</td>
                      <td>{item.value}</td>
                      <td>{item.time}</td>

                    </tr>)
                })}

              </tbody>
            </table>
          </p>

        </div>
      </main>

=======
      {/* {isMember && ( */}
      {true && (
        <main className="w-full flex flex-col py-4 flex-grow max-w-8xl items-center">
          {/* <div className="flex flex-col justify-center"> */}
          <div className={styles.incomingoutgoing}>
            {/* <span className="text-xl text-center">Create a new Proposal</span> */}
            <p className="mt-4 w-full flex flex-wrap items-center justify-between">

              <div>
                Month &nbsp;

                <select className="px-3 py-1 border border-black rounded-xl text-black" name="Months" id="months">
                  <option value="Jan">Jan</option>
                  <option value="Feb">Feb</option>
                  <option value="Mar">Mar</option>
                  <option value="Apr">Apr</option>
                  <option value="May">May</option>
                  <option value="Jun">Jun</option>
                  <option value="Jul">Jul</option>
                  <option value="Aug">Aug</option>
                  <option value="Sep">Sep</option>
                  <option value="Oct">Oct</option>
                  <option value="Nov">Nov</option>
                  <option value="Dec">Dec</option>
                </select>

                &emsp; Tags &nbsp;
                <select className="px-3 py-1 border border-black rounded-xl text-black" name="Labels" id="labels">
                  <option value="Marketing">Marketing</option>
                  <option value="Contribution">Contribution</option>
                  <option value="Grant">Grant</option>
                </select>
                &emsp;

                <button
                  className={styles.tablebutton}
                  style={{width:"85px"}}
                  type="submit"
                  name="search-button"
                  id="search-button"
                >
                  Search
                </button>
              </div>

              <div>
                <button
                  className={styles.tablebutton}
                  style={{width:"60px"}}
                  type="submit"
                  name="search-button"
                  id="search-button"
                >
                  Edit
                </button>
              </div>

            </p>

            <p className="mt-4 flex flex-col justify-center" id="table">
              <table className="table-fixed border-white border">
                <thead className="border-white border max-w-xs">
                  <tr>
                    <th>Item Name</th>
                    <th>Descriptions</th>
                    <th>Label</th>
                    <th>Network</th>
                    <th>Asset</th>
                    <th>Value</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>name 1</td>
                    <td>here is the description</td>
                    <td>Marketing</td>
                    <td>Eth</td>
                    <td>eth</td>
                    <td>13</td>
                    <td>2023-03-02</td>
                  </tr>
                  <tr>
                    <td>name 1</td>
                    <td>here is the description</td>
                    <td>Marketing</td>
                    <td>Eth</td>
                    <td>eth</td>
                    <td>13</td>
                    <td>2023-03-02</td>
                  </tr>
                  <tr>
                    <td>name 1</td>
                    <td>here is the description</td>
                    <td>Marketing</td>
                    <td>Eth</td>
                    <td>eth</td>
                    <td>13</td>
                    <td>2023-03-02</td>
                  </tr>
                </tbody>
              </table>
            </p>
          </div>
        </main>
      )}
>>>>>>> backend
    </div>
  );
}
