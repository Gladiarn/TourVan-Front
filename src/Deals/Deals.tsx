import './deals.css';
import Card from './Card/Card';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Deals = () => {
  const [data, setData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleteChecked, setDeleteChecked] = useState(false);
  const [editChecked, setEditChecked] = useState(false); 


  const checkHandler = (type) => {
    if (type === 'edit') {
      setEditChecked(!editChecked);
      if (!editChecked) setDeleteChecked(false); 
    } else if (type === 'delete') {
      setDeleteChecked(!deleteChecked);
      if (!deleteChecked) setEditChecked(false); 
    }
  };


  useEffect(() => {
    const userType = Cookies.get('userType');
    if (userType === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  const url = 'http://localhost:5000/api/tours/available';

  useEffect(() => {
    async function FetchRecord() {
      try {
        const res = await (await fetch(url)).json();
        setData(res);
      } catch (error) {
        console.log('Error: ', error);
      }
    }
    FetchRecord();
  }, []);

  return (
    <>
      <div className='deals-container'>
        <div className='deals-header'>
          <p>We've got some SWEET deals just for YOU</p>
        </div>

        <div className='deals-body'>
          <h3>Unbeatable Deals on Tacloban's Top Spots, Adventure Awaits!</h3>
        </div>
        {isAdmin && (
          <div className='deals-btn-container'>
            <div className='check'>
              <input
                type="checkbox"
                id='delete'
                checked={deleteChecked}
                onChange={() => checkHandler('delete')}
              />
              <label htmlFor="delete">Delete</label>
            </div>
            <Link to="/formtour" className='add-btn'>Add</Link>
            <div className='check'>
              <input
                type="checkbox"
                id='edit'
                checked={editChecked}
                onChange={() => checkHandler('edit')}
              />
              <label htmlFor="edit">Edit</label>
            </div>
          </div>
        )}

        <div className='main-card-container'>
          {data.length > 0 && <Card setData={setData} data={data} checked={editChecked} deleteChecked={deleteChecked}/>}
        </div>
      </div>
    </>
  );
};

export default Deals;
