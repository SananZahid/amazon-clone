import React, { useEffect } from "react";
import './App.css';
import Header from './Header';
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";


function App() {

  //Load Stripe into Promise
  const promise = loadStripe("pk_test_51HPvU9DFg5koCdLGJJbNo60QAU99BejacsvnKvT8xnCu1wFLCuQP3WBArscK3RvSQmSIB3N0Pbsc7TtbQiJ1vaOi00X9sIbazL");

  //importing reducer state values
  const [{}, dispatch] = useStateValue(); 

  useEffect(() => {
    //will only run once during app component loads

    //listener
    auth.onAuthStateChanged(authUser => {
      console.log("THE USER IS >>>> ", authUser);

      if (authUser) {
        //the user just logged in / the was logged in
        
        //shoot the user in the data layer
        dispatch({
          type: "SET_USER",
          user: authUser
        })

      } else {
        // the user is logged out

        //set user to null in data layer
          dispatch({
            type: "SET_USER",
            user: authUser
          })
      }
    })
  }, []);

  return (
    <Router>
      <div className="app">
        
        <Switch>

          <Route path="/login">

            <Login/>

          </Route>

          <Route path="/checkout">

            <Header />
            <Checkout />

          </Route>

          <Route path="/payment">

            <Header />

            <Elements stripe={promise}>
              <Payment />
            </Elements>
            
          </Route>

          <Route path="/orders">

            <Header />
            <Orders/>

          </Route>

          <Route path="/">
            <Header />
            <Home />
          </Route>

        </Switch>
      
      </div>
    </Router>
  );
}

export default App;
