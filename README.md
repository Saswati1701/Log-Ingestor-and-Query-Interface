<!-- ABOUT THE PROJECT -->
## About The Project
<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With
* [React][NodeJs][MongoDB]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/dyte-submissions/november-2023-hiring-Saswati1701
   ```
3. Install NPM packages
   ```sh
   cd SERVER
   npm install
   npm run serve
   ```
   Open a new Terminal
   ```sh
   cd frontend
   npm install
   npm start
   ```

   The SERVER should run on http://localhost:3000 and the frontend should run on port: 3001

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## The system design
https://github.com/dyte-submissions/november-2023-hiring-Saswati1701/assets/92461669/b0034ae3-9dcb-45ef-bf71-1432c2ca4cf7

- A database is set up using MongoDB and a server is set up using node.js.
- Feature 1: Log Ingestion
  An input area where the user can provide a log. The log has to be in JSON format.
  ```
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
  }
  ```
  Then on clicking the "Insert Log" a POST request is fired to the database. And, a response with the updated database is received.
- Feature 2: Filtration of logs
  An object of all possible variables updates its state when the "Apply Filters" button is clicked.
  ```
  {
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
  }




  ```
  The above object is sent to the server with a GET request. It first filters the data using the filters in "filterparams" objects with the help of regular expressions, then, it is again filtered through the time constraint and the response is returned with all the required data.
  - Feature 3: MongoDB is used for fast database read and write for speed. It also handles the ingestion of large volumes of data.
<p align="right">(<a href="#readme-top">back to top</a>)</p>


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Saswati Somya Mahanta - saswatisomya.mahanta.cd.met20@iitbhu.ac.in

Project Link: https://github.com/dyte-submissions/november-2023-hiring-Saswati1701

<p align="right">(<a href="#readme-top">back to top</a>)</p>

