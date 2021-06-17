import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table1 from "components/Table/RiderTable1.js";
import Table2 from "components/Table/RiderTable2.js";
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

const columns1 = ["Name", "NIC", "Mobile", "Action", "Remove"];
const columns2 = ["Name", "NIC", "Mobile", "Action", "Remove"];

const useStyles = makeStyles(styles);

export default function Riders() {
  const classes = useStyles();
  const [newriderDetails, setNewRiderDetails] = useState([]);
  const [otherriderDetails, setOtherRiderDetails] = useState([]);

  useEffect(() => {
    getDataFromDb();
  }, []);

  const getDataFromDb = () => {


    db.collection('Riders').get().then((Snapshot) => {
      if (Snapshot.empty) {
        console.log('No matching documents.');
      }
      else {
        console.log('Records available');
        const tempDoc = Snapshot.docs.map((doc) => {
          return { id: doc.id }
        })
        console.log(tempDoc);

        var tempArray1 = [];
        var tempArray2 = [];
        for (let i = 0; i < tempDoc.length; i++) {
          db.collection('Riders').doc(tempDoc[i].id).collection('Rider Details').where("admin_permission", "==", false).get().then((response1) => {
            if (response1.empty) {
              console.log('No matching documents.');
            }
            else {
              const riderData = response1.docs.map((riderdoc) => {
                return { id: riderdoc.id, ...riderdoc.data() }
              })
              tempArray1.push(riderData);
              setNewRiderDetails(newriderDetails => [...newriderDetails, riderData])
            }
          }).catch(err => {
            console.log("Items action error " + err);
          })
            db.collection('Riders').doc(tempDoc[i].id).collection('Rider Details').where("admin_permission", "==", true).get().then((response2) => {
              if (response2.empty) {
                console.log('No matching documents.');
              }
              else {
                const riderData = response2.docs.map((riderdoc) => {
                  return { id: riderdoc.id, ...riderdoc.data() }
                })
                tempArray2.push(riderData);
                setOtherRiderDetails(otherriderDetails => [...otherriderDetails, riderData])
              }
            }).catch(err => {
              console.log("Items action error " + err);
            })
        }
        //setNewRiderDetails(tempArray1);
        //setOtherRiderDetails(tempArray2);
      }
    }).catch(err => {
      console.log("Items action error " + err);
    })
  }

  const removebuttonAction = (id) => {
    console.log(id);
    db.collection("Riders").document(id)
      .delete().then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Rider Deleted!',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((error) => {
        console.error("Error deleting rider: ", error);
      });
  }

  const blockbuttonclickaction = (riderData) => {
    console.log(riderData);
    var riderid = riderData.id;
    db.collection('bannedRiders').doc(riderid).set(riderData)
      .then(function () {
        console.log("record added to banned riders");
      }).catch(err => {
        console.log("Server error " + err);
      });

    db.collection("Riders").doc(riderid)
      .delete().then(() => {

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Rider Blocked!',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((error) => {
        console.error("Error deleting collection: ", error);
      });

  }

  const buttonclickaction = (id) => {
    console.log(id);
    db.collection('Riders')
      .doc(id)
      .collection('Rider Details')
      .doc(id)
      .update({
        admin_permission: true,
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
      })
      .catch((error) => {
        console.error("Error updating permission: ", error);
      });
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="rose">
            <h4 className={classes.cardTitleWhite}>New</h4>
            <p className={classes.cardCategoryWhite}>
              Rider list
            </p>
          </CardHeader>
          <CardBody>
            <Table1
              tableHeaderColor="primary"
              tableHead={columns1}
              tableData={newriderDetails}
              buttonAction={buttonclickaction}
              removebuttonAction={removebuttonAction}
            />
          </CardBody>
        </Card>
      </GridItem>

      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Other</h4>
            <p className={classes.cardCategoryWhite}>
              Rider list
            </p>
          </CardHeader>
          <CardBody>
            <Table2
              tableHeaderColor="primary"
              tableHead={columns2}
              tableData={otherriderDetails}
              buttonAction={blockbuttonclickaction}
              removebuttonAction={removebuttonAction}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
