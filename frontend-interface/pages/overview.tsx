import Head from "next/head";
import React, { useState, useEffect } from 'react';
import { CreateMember } from "../components/createMember";
import Navbar from "../components/navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import faker from 'faker';

import styles from "../styles/Home.module.css";
import DAOlogo from "../temp_assets/THUBA_logo.png";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function Home() {
  // const { isMember, loading, account } = useData();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [image, setImage] = useState<File | null>();
  let daoname = ""
  let daoaccess = ""
  if (typeof window !== "undefined") {
    const queryParameters = new URLSearchParams(window.location.search)
    daoname = queryParameters.get("DAO")
    daoaccess = queryParameters.get("permission")
  }

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [data, setData] = useState({
    labels: labels,
    datasets: [{
      label: 'Expenses by Month',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundiColor: [
        'rgb(153, 102, 255)'
      ],
      borderColor: [
        'rgb(153, 102, 255)'
      ],
      borderWidth: 1
    }]
  });
  // update data
  // setData({
  //   ...data,
  //   datasets: [{
  //     ...data.datasets[0],
  //     data: [1, 2, 4, 8, 16, 32, 64]
  //   }]
  // });
  const areaOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    },
  };
  const lineData = {
    labels,
    datasets: [
      {
        fill: false,
        label: 'USDT',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: '#B98BE8',
        backgroundColor: '#B98BE8',
      },
      {
        fill: false,
        label: 'ETH',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: '#EC1C25',
        backgroundColor: '#EC1C25',
      },
      {
        fill: false,
        label: 'BAYC',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: '#2648A1',
        backgroundColor: '#2648A1',
      },
    ],
  };
  const areaData = {
    labels,
    datasets: [
      {
        fill: false,
        label: 'USDT',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: '#332E82',
        // backgroundColor: 'rgba(53, 162, 235, 0.5)',
        backgroundColor: '#332E82',
      },
      {
        fill: false,
        label: 'BTC',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: '#2648A1',
        // backgroundColor: 'rgba(53, 162, 235, 0.5)',
        backgroundColor: '#2648A1',
      },

      {
        fill: false,
        label: 'ETH',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: '#2873BA',
        // backgroundColor: 'rgba(53, 162, 235, 0.5)',
        backgroundColor: '#2873BA',
      },
    ],
  };
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
      name: "Brian",
      details: "Donation by Jimmy for club recruiting",
      label: "donation",
      network: "Mantle",
      asset: "-300",
      value: "-300",
      type: "USDT",
      time: "2022-12-07",
    },
    {
      name: "Won Eth SF",
      details: "1st prize at Main track",
      label: "hackathon",
      network: "Ethereum",
      asset: "-20",
      value: "-3472",
      type: "ETH",
      time: "2022-11-25",
    },
    {
      name: "Jimmy",
      details: "Donation by Jimmy for Hackathon",
      label: "donation",
      network: "Polygon",
      asset: "-1428",
      value: "-1000",
      type: "MATIC",
      time: "2022-10-04",
    },
    {
      name: "Flight",
      details: "Flight ticket to Eth Denver",
      label: "attend",
      network: "Ethereum",
      asset: "+14",
      value: "+18000",
      type: "ETH",
      time: "2023-02-17",
    },
    {
      name: "Fair",
      details: "club fair fees for recuiting",
      label: "host",
      network: "Mantle",
      asset: "+28712",
      value: "+217",
      type: "ETH",
      time: "2022-03-07",
    },
    {
      name: "hackathon",
      details: "hackathon prize money",
      label: "host",
      network: "Polygon",
      asset: "+3729",
      value: "+60000",
      type: "ETH",
      time: "2021-08-04",
    },
  ]
  return (
    <>
    <div className={styles.container}>
      <Head>
        <title style={{ fontSize: "5rem" }}>DAOmocles</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        daoname={daoname}
        daoaccess={daoaccess}
      />
      <div style={{ marginTop: "2rem", width: "80%" }}>
        <div className={styles.overview}>
          {/* <div className={styles.overviewassets}> */}
          <div className="w-1/3 ">
            <Col >
              <Row style={{ textAlign: "center", marginBottom: "15px" }}>Total Assets</Row>
              <Row style={{ textAlign: "center" }}>
                <span style={{ padding: "5px" }}>167.2K</span>
                <span style={{ color: "#B98BE8", padding: "5px" }}>$ USD</span>
              </Row>
            </Col>
          </div>
          {/* <div className={styles.overviewincoming}> */}
          {/* <div className="w-1/3" style={{paddingLeft:"10%", paddingRight:"10%"}}> */}
          <div className="w-1/3" >
            <Col >
              <Row style={{ textAlign: "center", marginBottom: "15px" }}>Incoming</Row>
              <Row style={{ textAlign: "center" }}>
                <span style={{ padding: "5px" }}>167.2K</span>
                <span style={{ color: "#B98BE8", padding: "5px" }}>$ USD</span>
              </Row>
            </Col>
          </div>
          {/* <div className={styles.overviewoutgoing}> */}
          <div className="w-1/3 ">
            <Col >
              <Row style={{ textAlign: "center", marginBottom: "15px" }}>Outgoing</Row>
              <Row style={{ textAlign: "center" }}>
                <span style={{ padding: "5px" }}>167.2K</span>
                <span style={{ color: "#B98BE8", padding: "5px" }}>$ USD</span>
              </Row>
            </Col>
          </div>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <div className={styles.chartone}>
          <div className={styles.charttitle}>Annual Data</div>
          {/* <Bar data={data} /> */}
          <Line options={areaOptions} data={areaData} />
        </div>
        <div className={styles.charttwo}>
          <div className={styles.charttitle}>Recent Months</div>
          <Line options={areaOptions} data={areaData} />
        </div>

      </div>
      {/* <div style={{ width: "800px" }}> */}
      <div style={{ width: "600px", borderRadius: "15px" }}>
        <Line options={areaOptions} data={lineData} />
      </div>
      <p className="mt-4 flex flex-col justify-center" id="table">
        <table className="table-fixed border-white border" style={{width:"90%", padding:"20px", marginLeft:"5%", marginBottom:"30px"}}>
          <thead className="border-white border max-w-xs">
            <tr>
              <th>Item Name</th>
              <th span={10} style={{width:"20%"}}>Descriptions</th>
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
                  <td>{item.name}</td>
                  <td span={10} style={{width:"20%"}}>{item.details}</td>
                  <td>{item.label}</td>
                  <td>{item.network}</td>
                  <td>{item.type}</td>
                  <td>{item.asset}</td>
                  <td>{item.value}</td>
                  <td>{item.time}</td>
                 
                </tr>)
            })}

          </tbody>
        </table>
      </p>
      {/* {isMember && <ProposalList />} */}
    </div >
    </>
  );
}
