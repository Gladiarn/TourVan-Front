import { useState, useEffect } from 'react'
import './popular.css'

const Popular = () => {

    const [data, setData] = useState([]);

    const url = 'http://localhost:9000/records';

    useEffect(()=>{
  
      async function FetchRecord(){
        try{
          const res = await( await fetch(url)).json();
          const sortedData = res.sort((a,b) => b.BookingCount - a.BookingCount);
          const topThree = sortedData.slice(0,3)
          setData(topThree);
        }
        catch(error){
          console.log('Error: ', error);
        }
  
      }
      FetchRecord()
  
    },[])



  return (
    <>
        <div className='popular-container'>
            <div className='popular-header'>
                <h3>
                    Top Three Visited Places
                </h3>
            </div>
            
            <div className='visit-card-container'>
            {data.map((record)=>(
                <div className='visit-container'>
                    <div className='visit-img-container'>
                        <img src={record.Url} alt="" />
                    </div>

                    <div className='visit-body'>
                        <p className='visit-name-container'>{record.Name}</p>
                        <p className='visit-visit-container'>{record.BookingCount} Activities</p>
                    </div>
                    


                </div>
                
            ))}
        </div>
        <div className='last-message'>
            <p><i>Discover the magic of these top destinations and make your next adventure unforgettable!</i></p>
        </div>



        </div>
    
    
    </>
  )
}

export default Popular