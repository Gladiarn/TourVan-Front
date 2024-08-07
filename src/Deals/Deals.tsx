import './deals.css'
import Card from './Card/Card'
import { useEffect, useState } from 'react'




const Deals = () => {

  const [data, setData] = useState([]);


  const url = 'http://localhost:9000/records';

  useEffect(()=>{

    async function FetchRecord(){
      try{
        const res = await( await fetch(url)).json();
        setData(res);
        console.log(data);
      }
      catch(error){
        console.log('Error: ', error);
      }

    }
    FetchRecord()

  },[])


  return (
    <>
      <div className='deals-container'>
          <div className='deals-header'>
            <p>We've got some SWEET deals just for YOU</p>
          </div>
          
          <div className='deals-body'>
            <h3>Unbeatable Deals on Tacloban's Top Spots, Adventure Awaits!</h3>
          </div>

          <div className='main-card-container'>

              {data.length > 0 && <Card data={data} />}
              
          </div>


      </div>
    
    </>
  )
}

export default Deals