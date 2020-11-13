import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAccounts } from "../../../core/services/accountsServices";
import { getUsers } from "../../../core/services/usersServices";

const PAGE_LIMIT = 20;

export default class GroupBase extends Component {


  handleOptionChange = (e, newValue, type) => {
    ;
    this.setState({
      [type]: newValue,
    });
  };

  handleAccounts = async (value) => {
    try {
      let response = await getAccounts(
        PAGE_LIMIT,
        this.state.currentPage,
        value
      );
      ;
      this.setState({
        accountsData: response.data.items,
      });
    } catch (e) {
      console.error(e);
    }
  };

  handleUsers = async (value) => {
    try {
      let response = await getUsers(PAGE_LIMIT, this.state.currentPage, value);
      ;
      this.setState({
        usersData: response.data.items,
      });
    } catch (e) {
      console.error(e);
    }
  };

  handleChange = (type, value) => {
    this.setState({
      [type]: value,
    });
  };



  renderMainContent() {
    const { usersData, accountsData, name } = this.state;
    return (
      <div>
        <ToastContainer />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper style={{ padding: "20px" }}>
              <form autoComplete="off">
                <Autocomplete
                  id="account"
                  options={accountsData}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) =>
                    this.handleOptionChange(event, newValue, "account")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ margin: 8 }}
                      label="Accounts"
                      onChange={(e) => this.handleAccounts(e.target.value)}
                      variant="outlined"
                    />
                  )}
                  value={this.state.account}
                  disabled={this.state.editGroup}
                />
                <TextField
                  id="name"
                  label="Name"
                  className="textTransform"
                  style={{ margin: 8 }}
                  placeholder="Name"
                  value={name}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => this.handleChange("name", e.target.value)}
                />

                <Autocomplete
                  multiple
                  id="users"
                  options={usersData}
                  getOptionLabel={(option) => option.email}
                  onChange={(event, newValue) =>
                    this.handleOptionChange(event, newValue, "users")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ margin: 8 }}
                      label="User"
                      onChange={(e) => this.handleUsers(e.target.value)}
                      variant="outlined"
                    />
                  )}
                  value={this.state.users}
                />
                <Button
                  variant="contained"
                  style={{ margin: 8 }}
                  color="primary"
                  onClick={() => this.handleSave()}
                >
                  Save
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
