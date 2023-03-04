import Head from "next/head";
import { FormEvent, useState } from "react";
// import { ProposalList } from "../components/proposalList";
// import { useData } from "../contexts/dataContext";
import styles from "../styles/Home.module.css";

function AddToken() {

    console.log("in add token function")
       

    return (
        <div className={styles.settingsgrid}>
            <div > Network</div>
            <div > &nbsp;
                <select className="px-3 py-1 bg-gray-50 border border-black rounded-xl text-black" name="Networks" id="networks">
                    <option value="Mantle">Mantle</option>
                    <option value="Ethereum">Ethereum</option>
                    <option value="Polygon">Polygon</option>
                </select>
                &emsp;
            </div>
            <div >Contract Address</div>
            <div >
                <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"></input>
            </div>
            <div >Token Name</div>
            <div >Type in address</div>
            <div >
                <div className="divider"></div>
            </div>
        </div>
    );
}
export default AddToken;