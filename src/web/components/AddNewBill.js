import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateField from './DateField';
import * as moment from 'moment';

import {
  Label,
} from 'reactstrap';



export default class AddNewBill extends React.Component {
  state = {
    open: false,
    dateFieldValue: moment(new Date()).format("YYYY-MM-DD") ,
    priceFieldValue: 0,
    expanseField : ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handlePriceFieldChange(e)
  {
    this.setState({
      priceFieldValue: e.target.value

  })
}
  handleExpanseFieldChange(e)
  {
    this.setState({
      expanseField: e.target.value
  })
}

  handleDateFieldChange(e)
  {
    this.setState({
      dateFieldValue: e.target.value
  })
}

  handleSave = () => {


let price = this.state.priceFieldValue;
let date = this.state.dateFieldValue;
let expanseTitle = this.state.expanseField;

this.setState({ open: false,
  dateFieldValue: moment(new Date()).format("YYYY-MM-DD") ,
  priceFieldValue: 0,
  expanseField: ''  });
   this.props.handleSave(expanseTitle, date, price)
  };

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New bill</DialogTitle>
          <DialogContent>
            <DialogContentText>

            </DialogContentText>
           <TextField  
            label="EDate"
            id="date"
            type="date"
            fullWidth
            defaultValue={moment(new Date()).format("YYYY-MM-DD")}
            onChange={this.handleDateFieldChange.bind(this)}/>
                <TextField
              autoFocus
              margin="dense"
              id="expanse"
              label="Expanse title"
              type="text"
              fullWidth
              onChange={this.handleExpanseFieldChange.bind(this)} />
             <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Price"
              type="number"
              fullWidth
              onChange={this.handlePriceFieldChange.bind(this)}
            />


      
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
