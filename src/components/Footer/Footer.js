/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";
import { Link } from 'react-router-dom'

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Link to="/admin/riders">Riders</Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link to="/admin/shops">Shops</Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link to="/admin/promocode">Promo Codes</Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link to="/admin/earnings">Earnings</Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link to="/admin/listeditems">Listed Items</Link>
            </ListItem>
          </List>
        </div>
      </div>
    </footer>
  );
}
