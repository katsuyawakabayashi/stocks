'use client'
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { CChart } from '@coreui/react-chartjs';
import StockChart from '../Components/StockChart';

export default function Home() {
  const [dataOne, setDataOne] = useState(null);
  const [tickerOne, setTickerOne] = useState("GOOGL");
  const [dataTwo, setDataTwo] = useState(null);
  const [tickerTwo, setTickerTwo] = useState("AAPL");
  const [loading, setLoading] = useState(false);

  const fetchData = async (ticker, setData) => {
    setLoading(true);
    if (!ticker) {
      setData(null);
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`https://t7vzybdsi7.execute-api.us-east-2.amazonaws.com/dev/stock?ticker=${ticker.toUpperCase()}`, {
        method: 'GET',
        mode: 'cors',
      });
      if (response.ok) {
        const data = await response.json();

        const isEmptyData = Object.values(data).every(obj => Object.keys(obj).length === 0);
        if (isEmptyData) {
          setData(null);
        } else {
          setData(JSON.stringify(data));
        }
      } else {
        console.error("HTTP error:", response.status);
        setData(null);
      }
    } catch (error) {
      console.error("Failed to fetch", error);
      setData(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(tickerOne, setDataOne);
    fetchData(tickerTwo, setDataTwo);
  }, []);

  return (
    <main className="h-screen">
      <div className="flex flex-col h-full items-center justify-center gap-16 xs:gap-10 py-10">
        <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
        <input
          type="text"
          value={tickerOne}
          onChange={(e) => {
            setTickerOne(e.target.value.toUpperCase());
            fetchData(e.target.value, setDataOne);
          }}
          placeholder="Enter ticker symbol (e.g., GOOGL)"
          className="w-full p-2 bg-black text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-300"
          style={{ textTransform: 'uppercase' }}
        />
        <input
          type="text"
          value={tickerTwo}
          onChange={(e) => {
            setTickerTwo(e.target.value.toUpperCase());
            fetchData(e.target.value, setDataTwo);
          }}
          placeholder="Enter ticker symbol (e.g., GOOGL)"
          className="w-full p-2 bg-black text-white placeholder-gray-400 border border-gray-700 focus:border-red-500 focus:outline-none focus:ring focus:ring-red-300 "
          style={{ textTransform: 'uppercase' }}
        />
        </div>
        <div className="flex justify-center w-full h-auto">
          {loading ? (
            <div>Loading...</div> // Placeholder for loading indicator
          ) : dataOne && dataTwo ? (
            <StockChart 
              stockDataOne={dataOne} 
              stockDataTwo={dataTwo} 
              tickerNameOne={tickerOne}
              tickerNameTwo={tickerTwo}
            />
          ) : (
            <div>No data available</div> // Show when no data is available
          )}
        </div>
      </div>
    </main>
  );
}