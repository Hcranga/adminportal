import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import Swal from 'sweetalert2'

import TablePromotion from "components/Table/PromotionTable.js";

var voucher_codes = require('voucher-code-generator');

import Select from 'react-select';

import avatar from "assets/img/faces/marc.jpg";
import db from '../../firebaseconfig';

import firebase from 'firebase'

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const promotionTableHeadings = ["Customer ID", "Minimum Bill", "Promo Code", "Active"];

const useStyles = makeStyles(styles);

export default function Customers() {
  const classes = useStyles();
  const [customerIds, setCustomerIds] = useState([]);
  const [shopIds, setShopIds] = useState([]);
  const [sentPromoCodeDetails, setSentPromoCodeList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [item, setItem] = useState({
    promoCode: "",
    minimumBill: ""
  });
  const [selectedShops, setSelectedShops] = useState([]);

  useEffect(() => {
    getDataFromDb();
  }, []);

  const getDataFromDb = () => {
    db.collection('Customer').get().then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('No customers available');
      }
      else {
        console.log('customers available');
        const tempDoc = querySnapshot.docs.map((doc) => {
          return { value: doc.id,label:doc.id }
        })
        setCustomerIds(tempDoc);
        console.log(tempDoc);
      }

    }).catch(err => {
      console.log("Items action error " + err);
    })

    db.collection('promoCodes').get().then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('No sent promo codes available');
      }
      else {
        console.log('sent promo codes available');
        const tempDoc = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() }
        })
        setSentPromoCodeList(tempDoc);
        console.log(tempDoc);
      }

    }).catch(err => {
      console.log("Items action error " + err);
    })

    db.collection('shops').where("admin permission","==",true).get().then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('No active shops available');
      }
      else {
        console.log('active shops available');
        const tempDoc = querySnapshot.docs.map((doc) => {
          return { value: doc.id,label:doc.id }
        })
        setShopIds(tempDoc);
        console.log(tempDoc);
      }

    }).catch(err => {
      console.log("Items action error " + err);
    })
  }

  const submitButtonAction = (e) => {
    e.preventDefault();
    console.log(selectedCustomer);
    console.log(selectedShops);
    console.log(item);

    db.collection('Customer').doc(selectedCustomer).collection('Customer Details').get().then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('No customer records available');
      }
      else {
        var shopIdList = [];
        for(let i=0;i<selectedShops.length;i++){
          shopIdList.push(selectedShops[i].value);
        }
        console.log('customer records available');
        const tempDoc = querySnapshot.docs.map((doc) => {
          return { docId: doc.id, ...doc.data() }
        })
        const multilineString = `Congratulations! You have a Coupon from Delivo. ${item.promoCode}, You can use this coupon for shops Ids ${shopIdList}.Also your minimum bill must be ${item.minimumBill}. Happy Shopping !`;

        fetch(`http://www.textit.biz/sendmsg?id=94767113128&pw=1275&to=${tempDoc[0]["Custumer's Mobile Number"]}&text=${multilineString}`, { mode: 'no-cors' }).then(function (response) {
          console.log(response);
          console.log("Message sent");
          Swal.fire({
            icon: 'success',
            text: 'Message Sent'
          })
          var itemData = {
            "customerId":selectedCustomer,
            "shopIds":shopIdList,
            "promoCode":item.promoCode,
            "minimumBill":item.minimumBill,
            "active":false
          }
      
          db.collection('promoCodes').add(itemData)
            .then(ref => {
              console.log('Added Promo Code with ID: ', ref.id);
            })
            .catch(err => {
              console.log("Sign up error " + err);
            })
        })
          .catch(function (error) {
            console.log(error);
          });

        
      }

    }).catch(err => {
      console.log("Items action error " + err);
    })
  }

  const handleCustomerChange = (e)=> {
    setSelectedCustomer(e.value);
  }

  const handleShopChange = (e) =>{
    setSelectedShops(e);
  }

  const handleItem = (evt) => {
    const value = evt.target.value;
    setItem({
      ...item,
      [evt.target.name]: value
    });
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add Promotion</h4>
              <p className={classes.cardCategoryWhite}>Fill Details</p>
            </CardHeader>
            <CardBody>
            <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                <label>
                    Select Customer
                            </label>
                  <Select
                    options={customerIds}
                    onChange={handleCustomerChange}
                    name="customers"
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={8}>
                <label>
                    Select Shops
                            </label>
                  <Select
                  options={shopIds}
                  onChange={handleShopChange}
                    isMulti
                    name="shops"
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Enter Promo Code"
                    val={item.promoCode}
                    handleChange={handleItem}
                    name="promoCode"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Enter Minimum Bill"
                    handleChange={handleItem}
                    val={item.minimumBill}
                    name="minimumBill"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button onClick={submitButtonAction} color="warning">Send Promo</Button>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Sent Promotions</h4>
            <p className={classes.cardCategoryWhite}>
              List
            </p>
          </CardHeader>
          <CardBody>
            <TablePromotion
              tableHeaderColor="primary"
              tableHead={promotionTableHeadings}
              tableData={sentPromoCodeDetails}
            />
          </CardBody>
        </Card>
      </GridItem>
      </GridContainer>
    </div>
  );
}
