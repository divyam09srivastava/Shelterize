import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Container from "./Loading";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import firebase from "../firebase/base";
import { withRouter } from "react-router-dom";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function App() {
  const [customers, setCustomers] = React.useState([]);
  //   const onUpdate = () => {
  //     alert("Are you sure you want to help this person?");
  //     const db = firebase.db;
  //     db.collection("customers")
  //       .doc(selectedcustomer.uid.toString())
  //       .set({ ...selectedcustomer.uid, complete: true });
  //     setOpen(false);
  //   };
  //   const handleClickOpen = () => {
  //     setOpen(true);
  //     setSelected(!selected);
  //   };
  // const isItemSelected = () => {
  //   setSelected(!selected);
  // };
  //   const handleClose = () => {
  //     setOpen(false);
  //     setSelected(!selected);
  //   };

  //  const [newSpellName, setNewSpellName] = React.useState();
  var data;
  React.useEffect(() => {
    const fetchdata = async () => {
      await firebase.db
        .collection("customers")
        .where("helped", "==", firebase.getCurrentUsername())
        .get()
        .then((querySnapshot) => {
          data = querySnapshot.docs.map((doc) => doc.data());
          // console.log("data: " + data[0].name);
          setCustomers(data);

          // console.log(userdetail[0].name);
        });
    };
    fetchdata();
  });

  //   const onCreate = () => {
  //     const db = firebase.firestore();
  //     db.collection("spells").add({ name: newSpellName });
  //   };
  const classes = useStyles();
  return (
    <>
      <Header />
      <section className="banner-area relative" id="home">
        <div className="overlay overlay-bg"></div>
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="about-content col-lg-12">
              <h1 className="text-white">List of Disaster Victims Helped</h1>
              <p className="text-white link-nav">
                <a href="/volunteer">Profile</a>{" "}
                <span className="lnr lnr-arrow-right"></span>{" "}
                <a href="/volunteer">List of Disaster Victims Helped</a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="Volunteer-form-area section-gap">
        <div
          className="container"
          style={{ backgroundColor: "black", opacity: "0.7", color: "white" }}
        >
          <div className="row justify-content-center">
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell> </StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="right">Age</StyledTableCell>
                    <StyledTableCell align="right">City</StyledTableCell>
                    <StyledTableCell align="right">State</StyledTableCell>
                    <StyledTableCell align="right">Phone no.</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.map((row) => (
                    <StyledTableRow key={row.name}>
                      {console.log("data: " + row.name)}
                      <StyledTableCell padding="checkbox">
                        {/* <Checkbox
                          //checked={selected}
                          // inputProps={{ 'aria-labelledby': labelId }}
                          onChange={() => {
                            handleClickOpen();
                            setSelectedcustomer(row);
                          }}
                        /> */}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.age}</StyledTableCell>
                      <TableCell align="right">{row.city}</TableCell>
                      <TableCell align="right">{row.state}</TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <br />
        </div>
        {/* <div className="row col-2 offset-5">
          <button
            style={{ marginTop: "20px" }}
            onClick={() => {
              history.push("/helpedlist");
            }}
            className="primary-btn float-right"
          >
            {" "}
            Helped People List{" "}
          </button>
        </div> */}
      </section>

      <Footer />
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You want to help this person ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Disagree
          </Button>
          <Button
            onClick={onUpdate}
            variant="outlined"
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
}

export default App;
