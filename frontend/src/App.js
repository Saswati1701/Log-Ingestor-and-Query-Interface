import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'

function App() {

  const url = 'http://localhost:3000/product'
  const [allData, setAllData] = useState();//for data received: all or filtered
  const [inputObject, setInputObject] = useState({});//for new log insertion in database
  const [filters, setFilters] = useState({
    filterparams: { 
      level: '',
      message: '',
      resourceId: '',
      timestamp: '',
      traceId: '',
      spanId: '',
      commit: '',
      metadata: {
        parentResourceId:''
      }
    },
    timeRange:{
      startTime: '',
      endTime: ''
    }
  });

  //alldata array populated with all the logs present in the database
  //when the application loads all logs should be visible
  useEffect(()=>{
    const fetchData = async ()=>{
      const result = await fetch(url)
      const jsonResult = await result.json();

      setAllData(jsonResult);
    }
    fetchData()
  }, [])

  
  const handleTimeChange = (field, value) =>{
    function isValidDate(dateString) {
      const dateObject = new Date(dateString);
      return !isNaN(dateObject.getTime());
    }
    if (isValidDate(value)) {
      setFilters({...filters, 
        timeRange:{...filters.timeRange, [field]:value}  
      })
    }
  }

  const handleFilterChange = (field, value) => {
    //prepares the object to be sent for POST request for filtering
    if(field === "metadata"){
      setFilters({ ...filters,
        filterparams: {...filters.filterparams, [field]:{parentResourceId: value}},
        })
    }
    else {
      setFilters({ ...filters,
        filterparams: {...filters.filterparams, [field]:value},
      });
    }
  };

  const handleApplyFilters = async (e)=>{
    e.preventDefault();
    try{
      const response = await axios.post(`${url}/time/query`, filters);
      // console.log('POST request successful:', response.data);
      setAllData(response.data)
    }catch (error) {
      if (error.response && error.response.status === 400) {
        console.error('Error:', error.response.data.message);
        alert(`Error: ${error.response.data.message}`)
      } else {
        console.error('Unexpected error:', error.message);
        alert(`Error: ${error.response.data.message}`)
      }
    }
  }

  const handleInsertLog = async (event) =>{
    try {
      //inputObject is simple text which needs to be converted to JSON to send with POST request
      const inputObjectParsed = JSON.parse(inputObject);
  
      //url and parsed input sent via POST request to the database
      const response = await axios.post(url, inputObjectParsed);
      console.log('POST request successful:', response.data);
  
      // Fetched data is updated and all data is set
      const result = await fetch(url);
      const jsonResult = await result.json();
      setAllData(jsonResult);
      } catch (error) {
        console.error('Error sending POST request or fetching data:', error);
      }
    }

  const tableHeaders = ["level", "message", "resourceId", "timestamp", "traceId", "spanId", "commit", "parentResourceId"]

  return (
    <div className="App">
      <div className='header'> 
        <div className='header-left'>
          <div className='date-time-container'>
            <div className='date-time'>
              <label>Start Time</label>
              <input 
                onChange={(event)=>handleTimeChange("startTime", event.target.value)}
                ></input>
            </div> 
            <div className='date-time'>
              <label>End Time</label>
              <input 
                onChange={(event)=>handleTimeChange("endTime", event.target.value)}
                ></input>
            </div> 
          </div>      
          <div className='filter-container'>
            {Object.keys(filters.filterparams).map((key) => (
              <div className='filter' key={key}>
                <label>{key}:</label>
                {typeof filters.filterparams[key] === 'object' ? (
                  <input
                    type="text"
                    value={filters.filterparams[key].parentResourceId}
                    onChange={(event) => handleFilterChange(key, { parentResourceId: event.target.value })}
                  />
                ) : (
                  <input
                    type="text"
                    value={filters.filterparams[key]}
                    onChange={(event) => handleFilterChange(key, event.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
          <button className='button' onClick={handleApplyFilters}>Apply Filters</button>
        </div>

        <div className='header-right'>
          <textarea className='textarea'
            onChange={(event)=>{
              if(event.target.value!=null) setInputObject(event.target.value)
            }}
            placeholder='
            insert new logs, for example
            {
              "level": "error",
              "message": "Failed to connect to DB",
              "resourceId": "server-1234",
              "timestamp": "2023-09-15T08:00:00Z",
              "traceId": "abc-xyz-123",
              "spanId": "span-456",
              "commit": "5e5342f",
              "metadata": {
                "parentResourceId": "server-0987"
              }
            }'
          ></textarea>
          <button className="button" onClick={handleInsertLog} >Insert Log</button>
        </div>
      </div>
      <div className='table-container'>
        {(allData!=null)?(
          <table className="table-striped">
            <thead>
              <tr>
                {tableHeaders.map((header)=> <th className='table-head' key={header}>{header}</th>)}
              </tr>
            </thead>
            <tbody>
              {allData.map((log)=>{
                return(
                  <tr >
                    {
                      tableHeaders.map((key)=>{
                        return(
                          <td className='table-cell'> 
                            {key==="parentResourceId" ? log.metadata[key]: log[key]}
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })}
            </tbody>
          </table>
        ):(
          <>No logs received</>
        )}
      </div>

    </div>
  );
}

export default App;
