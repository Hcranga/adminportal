import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import TableEarning from "components/Table/EarningTable1.js";
import CardBody from "components/Card/CardBody.js";

import Swal from 'sweetalert2'


import db from '../../firebaseconfig';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const riderdailycolumns = ["Rider ID", "Rider Earnings", "Blackgen Earnings"];
const ridermonthlycolumns = ["Rider ID", "Rider Earnings", "Blackgen Earnings"];

const useStyles = makeStyles(styles);

export default function Earnings() {
  const classes = useStyles();

  const [riderDailyEarningList, setRiderDailyEarningList] = useState([]);
  const [riderMonthlyEarningList, setRiderMonthlyEarningList] = useState([]);

  useEffect(() => {
    getDataFromDb();
  }, []);

  const getDataFromDb = () => {
    db.collection('rider_daily_earnings').get().then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('No daily earnings available');
      }
      else {
        console.log('daily earnings available');
        const tempDoc = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() }
        })
        setRiderDailyEarningList(tempDoc);
      }

    }).catch(err => {
      console.log("Items action error " + err);
    })

    db.collection('rider_monthly_earnings').get().then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('No monthly earnings available');
      }
      else {
        console.log('monthly earnings available');
        const tempDoc = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() }
        })
        setRiderMonthlyEarningList(tempDoc);
      }

    }).catch(err => {
      console.log("Items action error " + err);
    })
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>Rider</h4>
            <p className={classes.cardCategoryWhite}>
              Daily Earnings
            </p>
          </CardHeader>
          <CardBody>
            <TableEarning
              tableHeaderColor="primary"
              tableHead={riderdailycolumns}
              tableData={riderDailyEarningList}

            />
          </CardBody>
        </Card>
      </GridItem>

      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Rider</h4>
            <p className={classes.cardCategoryWhite}>
              Monthly Earnings
            </p>
          </CardHeader>
          <CardBody>
            <TableEarning
              tableHeaderColor="primary"
              tableHead={ridermonthlycolumns}
              tableData={riderMonthlyEarningList}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
