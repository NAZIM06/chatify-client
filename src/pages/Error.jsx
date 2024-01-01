import { Link, useRouteError } from 'react-router-dom'
const Error = () => {
    const { error } = useRouteError()
    return (
      
        <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
        <img className='w-[400px]' src="https://img.freepik.com/free-photo/error-text-broken-glass-font_53876-104949.jpg?w=740&t=st=1686132080~exp=1686132680~hmac=afac99abd678448196ea5986bff056b16199c8d111488bcbb0641879067aae42" alt="" />
          <div className='max-w-md text-center'>
           
            <p className='text-2xl font-semibold md:text-3xl mb-8'>
              {error?.message}
            </p>
            <Link
              to='/'
              className='px-8 py-3 font-semibold rounded bg-cyan-200 text-gray-900'
            >
              Back to homepage
            </Link>
          </div>
        </div>
    
    )
  }

export default Error;