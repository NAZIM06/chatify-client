import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';


const Dashboard = () => {
  const { signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => { })
      .catch(error => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

    return (
        <div className='flex w-screen'>
            <div className='w-[25%] bg-dark h-screen'>
            <button
            onClick={handleSignOut}
            className=" m-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Log Out
          </button>
            </div>
            <div className='w-[50%] bg-primary h-screen'>
            </div>
            <div className='w-[25%] bg-secondary h-screen'></div>
        </div>
    );
};

export default Dashboard;