import React from 'react';


const Dashboard = () => {
    return (
        <div className='flex w-screen'>
            <div className='w-[25%] bg-dark h-screen'></div>
            <div className='w-[50%] bg-primary h-screen'></div>
            <div className='w-[25%] bg-secondary h-screen'></div>
        </div>
    );
};

export default Dashboard;