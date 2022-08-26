import { Route, Switch } from 'react-router-dom';
import './App.css';
import FindFalconPage from './pages/FindFalconPage';
import ResultPage from './pages/ResultPage';


export const config = {
  endpoint: "https://findfalcone.herokuapp.com"
}
function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <FindFalconPage/>
      </Route>
      <Route path="/result" >
        <ResultPage/>
      </Route>
    </Switch>
  );
}

export default App;
