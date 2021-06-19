import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table1 from "components/Table/ShopTable1.js";
import Table2 from "components/Table/ShopTable2.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
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

const columns1 = ["Shop Name", "Adress", "Category", "Action", "Delete"];
const columns2 = ["Shop Name", "Adress", "Category", "Block", "Delete"];

const useStyles = makeStyles(styles);

export default function Shops() {
  const classes = useStyles();
  const [newshopDetails, setNewShopDetails] = useState([]);
  const [othershopDetails, setOtherShopDetails] = useState([]);

  useEffect(() => {
    getDataFromDb();
  }, []);

  const getDataFromDb = () => {
    db.collection('shops').where("admin permission", "==", false).get().then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('No new shops');
      }
      else {
        console.log('new shops available');
        const tempDoc = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() }
        })
        setNewShopDetails(tempDoc)
      }

    }).catch(err => {
      console.log("Items action error " + err);
    })

    db.collection('shops').where("admin permission", "==", true).get().then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('No other shops');
      }
      else {
        console.log('other shops available');
        const tempDoc = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() }
        })
        setOtherShopDetails(tempDoc)
      }

    }).catch(err => {
      console.log("Items action error " + err);
    })
  }

  const deletebuttonAction = (id) => {
    console.log(id);
    db.collection('shops').doc(id).delete().then(() => {
      console.log("deleted");
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Deleted',
        showConfirmButton: false,
        timer: 1500
      });
    })
      .catch((error) => {
        console.error("Error deleting shop: ", error);
        Swal.fire({
          icon: 'info',
          title: 'Error deleting shop'
        });
      });
  }

  const blockbuttonaction = (shopData) => {
    console.log(shopData);
    var shopid = shopData.id;
    db.collection('bannedShops').doc(shopid).set(shopData)
      .then(function () {
        console.log("record added to banned shops");
      }).catch(err => {
        console.log("Server error " + err);
      });

    db.collection("shops").doc(shopid)
      .delete().then(() => {

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Shop Blocked!',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((error) => {
        console.error("Error deleting collection: ", error);
        Swal.fire({
          icon: 'info',
          title: 'Error blocking shop'
        });
      });

  }

  const buttonclickaction = (id) => {
    console.log(id);
    db.collection('shops')
      .doc(id)
      .update({
        "admin permission": true,
      })
      .then(() => {
        console.log("Permission updated!");
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Permission updated!',
          showConfirmButton: false,
          timer: 1500
        });
        getDataFromDb();
      })
      .catch((error) => {
        console.error("Error updating permission: ", error);
        Swal.fire({
          icon: 'info',
          title: 'Error updating permission'
        });
      });
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>New</h4>
            <p className={classes.cardCategoryWhite}>
              Shop list
            </p>
          </CardHeader>
          <CardBody>
            <Table1
              tableHeaderColor="primary"
              tableHead={columns1}
              tableData={newshopDetails}
              buttonAction={buttonclickaction}
              deletebuttonAction={deletebuttonAction}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>Other</h4>
            <p className={classes.cardCategoryWhite}>
              Shop list
            </p>
          </CardHeader>
          <CardBody>
            <Table2
              tableHeaderColor="primary"
              tableHead={columns2}
              tableData={othershopDetails}
              buttonAction={blockbuttonaction}
              deletebuttonAction={deletebuttonAction}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
