/* eslint-disable react-hooks/exhaustive-deps */
import Page from '../../shared/Page/Page';
import './Dashboard.css';
//import {useEffect, useRef} from 'react';
import {privateaxios} from '../../../store/axios';
import { useSession } from '../../../hooks/Session';
import { useEffect } from 'react';
import { DASHBOARD_LOAD_SNIPPETS, DASHBOARD_LOAD_TOP_KEYWORDS, DASHBOARD_LOAD_TOTAL_SALES } from '../../../store/reducers/dashboard';
//import {Redirect} from 'react-router-dom';

const Dashboard = ()=>{

  const [{ dashboard, sec }, dispatch] = useSession();
  let user = sec.user;
  //console.log(user.user.email);

  useEffect(
    async () => {
      if (sec.user && true) 
      {
        const snippets = await privateaxios.get(`/api/snippets/getsnippetsbyuser/${user.user.email}`);
        dispatch({type:DASHBOARD_LOAD_SNIPPETS, payload:snippets.data});
        const keywords = await privateaxios.get(`/api/snippets/gettopkeywords/${user.user.email}`);
        dispatch({type:DASHBOARD_LOAD_TOP_KEYWORDS, payload:keywords.data});
        const sales = await privateaxios.get(`/api/snippets/gettotalsalesbyuser/${user.user.email}`);
        dispatch({type:DASHBOARD_LOAD_TOTAL_SALES, payload: sales.data});
      }
    },
    []
  );

  const indicador1 = dashboard.indicador1;
  const listOfKeywords = dashboard.indicador2.map((o,i)=>{
    return (
      <li className="Indicador2" key={i+1}>
        <span className="keyword">{o._id}</span>
      </li>
    );
  });
  const indicador3 = dashboard.indicador3;

  return(
    <Page showHeader title="Dashboard">

      <section>
        <div className="grid-container">
          <div className="card">
              <h3>Snippets: </h3>
              <p>{indicador1}</p>
          </div>
          
          <div className="card2">
            <h3>Top 5 Keywords:</h3>
            {listOfKeywords}
          </div>

          <div className="card">
              <h3>Snippet Sales: </h3>
              <p>{indicador3}</p>
          </div>
        </div>
      </section>
    </Page>
  )
}

export default Dashboard;