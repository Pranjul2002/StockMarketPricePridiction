import React, { useState, useEffect } from 'react';
import '../Content/ContentStyle.css';
import Search from './Search/Search';
import ChartComponent from './Chart/ChartComponent';


import { helix } from 'ldrs'   //check https://uiball.com/ldrs/
helix.register()

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const Content = () => {
    const [chartData, setChartData] = useState(null); // Centralized state for chart data
    const [isLoading, setIsLoading] = useState(true); // State to handle initial loading

    useEffect(() => {
        const initialize = async () => {
            await sleep(700); // Sleep for 2 seconds
            setIsLoading(false); // End loading after the sleep
        };
        initialize();
    }, []); // Empty dependency array ensures it runs only once

    return (
        <div className='content'>
            {isLoading ? (
                <div className='loading-screen'>
                  <l-helix
                    size="505"
                    speed="2.5" 
                    color="black" >
                  </l-helix>
                </div>
            ) : (
                <>
                    {/* Pass setChartData to Search to update state */}
                    <Search setChartData={setChartData} />
                    
                    {/* Pass chartData to ChartComponent to display graph */}
                    <ChartComponent data={chartData} />
                </>
            )}
        </div>
    );
};

export default Content;
