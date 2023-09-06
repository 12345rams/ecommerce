import React, { Fragment, useState } from 'react'
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PinDropIcon from "@material-ui/icons/PinDrop";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import PublicIcon from "@material-ui/icons/Public";
import { saveShippingInfo } from '../../actions/cartActions';
import './Shipping.css'
import { useNavigate } from 'react-router-dom';
import CheckOutStep from './CheckOutStep.jsx'
function Shipping() {
    const alert=useAlert();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const { shippingInfo } = useSelector((state) => state.cart);
    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const shippingSubmit=(e)=>{
    e.preventDefault();
    dispatch(
   saveShippingInfo({address, city ,pinCode, phoneNo,state,country})
   
    )
    navigate("/order/confirm");
  }
    return (
   <Fragment>
    <MetaData title="Shipping Details" />
    <div className="shippingContainer">
   <CheckOutStep activeStep={0}/>
      <div className="ShippingBox">
      <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
       <div>
        <HomeIcon />
        <input type="text" 
            placeholder="Address" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}/>
         </div>
         
         <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
            <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
             
           
            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>
            <div>
            <PublicIcon />
            <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
                {country&&(
                <Fragment >
                    <TransferWithinAStationIcon />
                
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
             
                </Fragment>
                
                  
                )}
            </div>
            <Button
            type='submit'
            variant="outlined"
            // disabled={state ? false : true}
            >Continue</Button>
          </form>
      </div>
    </div>
   </Fragment>
    )
}

export default Shipping
