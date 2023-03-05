import Head from "next/head";
import { FormEvent, useState } from "react";
import Navbar from "../components/navbar";
import SettingNavbar from "../components/settingnavbar";

// import { ProposalList } from "../components/proposalList";
// import { useData } from "../contexts/dataContext";
import styles from "../styles/Home.module.css";
import DAOlogo from "../temp_assets/THUBA_logo.png";

export default function Home() {
    let daoname = ""
    let daoaccess = ""
    if (typeof window !== "undefined") {
        const queryParameters = new URLSearchParams(window.location.search)
        daoname = queryParameters.get("DAO")
        daoaccess = queryParameters.get("permission")
    }
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
            <SettingNavbar
                daoname={daoname}
                daoaccess={daoaccess}
            />
            <div className={styles.settings} style={{ height: "450px", marginBottom: "3rem" }}>
                <div className={styles.settingsgrid} style={{ gridTemplateColumns: "50% 50%" }}>
                    <div>Upload DAO Logo</div>
                    <div>
                        {/* <FileUpload></FileUpload> */}
                    </div>

                    <div style={{ marginTop: "8px" }}>DAO Name</div>
                    <input type="text" id="small-input" style={{ marginLeft: "3px" }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"></input>
                    <div style={{ marginTop: "8px" }}>Introduction</div>
                    <textarea id="message" rows="4" style={{ marginLeft: "3px" }} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></textarea>
                    <div style={{ marginTop: "8px" }}>Treasury Address</div>
                    <input type="text" id="small-input" style={{ marginLeft: "3px" }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"></input>
                </div>
                <div>
                    <button className={styles.confirmbutton}>Confirm</button>
                </div>
            </div>
        </div>
    );
}