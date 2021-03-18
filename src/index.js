import React, { Component } from "react";
import ReactDOM from "react-dom";
import factory from "./ethereum/factory";
import factoryShi from "./ethereum/factoryShi";
import web3 from "./ethereum/web3";
import "./App.css";

if (module.hot) {
  module.hot.accept();
}

class App extends Component {
  state = {
    toAddress: "",
    amountWei: 0,
    message: "",
    loading: false,
    wei: 0,
    shi: 0,
    view: false,
    remaining: 0
  };

  async componentDidMount() {
    const remaining = await factoryShi.methods
      .balanceOf('0x4B3Bf4Cb7D2e13E74Ecaa2Fce72abCce3b6F0765').call()

      this.setState({remaining: remaining})
  };

  buyTokens = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({
      message: "Transaction is being processed........",
      loading: true,
    });
    try {
      await factory.methods.buyTokens(this.state.toAddress).send({
        from: accounts[0],
        value: this.state.amountWei,
      });
      this.setState({ message: "Transaction successfull!!", loading: false });
    } catch (err) {
      this.setState({ message: err.message, loading: false });
    }
  };

  getNumberOfTokens = (event) => {
    event.preventDefault();
    this.setState({ shi: this.state.wei * 0.001 });
    this.setState({ view: true });
  };

  render() {
    console.log(this.state.wei);
    console.log(this.state.shi);
    return (
      <div>
        <h2
          className="ui header"
          style={{ paddingTop: "50px", paddingLeft: "25px", color: "white" }}
        >
          <i aria-hidden="true" className="dna icon"></i>
          <div className="content">
            SHI Tokens
            <div className="sub header" style={{ color: "white" }}>
              Initial Coin Offering
            </div>
          </div>
        </h2>
        <div
          className="ui container"
          style={{ paddingTop: "70px" }}
          onSubmit={this.buyTokens}
        >
          <form className="ui form">
            <div className="field">
              <label>
                <h3 style={{ color: "white" }}>Enter Transfer Address</h3>
              </label>
              <input
                placeholder="to address"
                value={this.state.toAddress}
                onChange={(event) => {
                  this.setState({ toAddress: event.target.value, message: "" });
                }}
              />
            </div>
            <div className="field">
              <label>
                <h3 style={{ color: "white" }}>Enter amount in wei</h3>
              </label>
              <input
                placeholder="Amount in wei"
                value={this.state.amountWei}
                onChange={(event) => {
                  this.setState({ amountWei: event.target.value, message: "" });
                }}
              />
            </div>
            <button className="ui primary icon right labeled button">
              Buy SHI<i aria-hidden="true" className="shop icon"></i>
            </button>
          </form>
          <h2 style={{ color: "white" }}>{this.state.message}</h2>
          <div
            className="ui active centered inline loader"
            style={{ display: this.state.loading ? "block" : "none" }}
          ></div>
          <div className="ui inverted divider"></div>
        </div>

        <div className="ui container" onSubmit={this.getNumberOfTokens}>
          <form className="ui form">
            <div className="field">
              <label>
                <h3 style={{ color: "white" }}>Wei to SHI</h3>
              </label>
              <input
                type="number"
                placeholder="Wei "
                value={this.state.wei}
                onChange={(event) => {
                  this.setState({ wei: event.target.value, view: false });
                }}
              />
            </div>

            <button className="ui primary icon right labeled button">
              Convert<i aria-hidden="true" className="refresh icon"></i>
            </button>
          </form>
          <div style={{ display: this.state.view ? "block" : "none" }}>
            <h3 style={{ color: "white" }}>{this.state.shi} SHI</h3>
          </div>
        </div>
        <div className="ui container" style={{ paddingTop: "70px" }}>
          <div className="ui inverted horizontal divider">Statistics</div>
          <div>
            <div class="ui three statistics" >
              <div class="ui statistic" >
                <div class="value" style={{ color: "white" }}>100,000,000</div>
                <div class="label" style={{ color: "white" }}>Total Supply</div>
              </div>
              <div class="ui statistic">
                <div class="value" style={{ color: "white" }}>500,000</div>
                <div class="label" style={{ color: "white" }}>Initial Supply</div>
              </div>
              <div class="ui statistic">
                <div class="value" style={{ color: "white" }}>{this.state.remaining}</div>
                <div class="label" style={{ color: "white" }}>Tokens left</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
