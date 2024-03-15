import React, { Component } from "react";
import "./App.css";
import { Button } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactLoading from "react-loading";
import axios from "axios";
import { address, abi } from "./storehash";
import Web3 from "web3";

class App extends Component {
  state = {
    ipfsHash: null,
    buffer: "",
    ethAddress: "",
    file: null,
    transactionHash: "",
    txReceipt: "",
    web3: null,
    accounts: null,
    contract: null,
    done: true,
  };

  captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    this.setState({ file });
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  };

  //Convert the file to buffer to store on IPFS
  convertToBuffer = async (reader) => {
    //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer-using es6 syntax
    this.setState({ buffer });
    console.log(this.state.buffer);
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ done: undefined });

    // Setting up web3 to talk to MetaMask
    window.ethereum.enable();
    const web3 = new Web3(Web3.givenProvider);
    const accounts = await web3.eth.getAccounts();
    this.setState({ accounts: accounts[0] });
    const storehash = new web3.eth.Contract(abi, address);
    console.log(storehash);
    // Using Axios to make a POST request to Pinata API
    const pinataApiKey = "xyz";
    const pinataSecretApiKey =
      "abc";

    // Prepare form data
    const data = new FormData();
    data.append("file", this.state.file);

    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data,
        {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
          },
        }
      );

      console.log(response.data.IpfsHash);
      this.setState({ ipfsHash: response.data.IpfsHash });
      this.setState({ done: true });
      console.log(storehash.methods);
      storehash.methods
        .setHash(this.state.ipfsHash)
        .send({ from: accounts[0] }, (error, transactionHash) => {
          console.log(transactionHash);
          this.setState({ transactionHash });
        });
    } catch (error) {
      console.error("Error making request to Pinata API:", error);
    }
  };

  onClick = async () => {
    try {
      this.setState({ blockNumber: "waiting.." });
      this.setState({ gasUsed: "waiting..." });
      await Web3.eth.getTransactionReceipt(
        this.state.transactionHash,
        (err, txReceipt) => {
          console.log(err, txReceipt);
          this.setState({ txReceipt });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            {" "}
            <Col>
              <h3> Please keep your license in the network </h3>
              <form onSubmit={this.onSubmit}>
                <input type="file" onChange={this.captureFile} />
                <Button bsstyle="primary" type="submit">
                  {" "}
                  Send it{" "}
                </Button>
              </form>
            </Col>
          </Row>
        </Container>

        <div>
          <hr />
          <div>
            {!this.state.done ? (
              <ReactLoading type={"bars"} color={"red"} />
            ) : (
              <p></p>
            )}
          </div>
          <hr />

          <table bordered responsive>
            <tbody>
              <tr>
                <td>IPFS Hash stored on Ethereum</td>
                <td> : </td>
                <td>{this.state.ipfsHash}</td>
              </tr>{" "}
            </tbody>{" "}
          </table>
        </div>
      </div>
    );
  }
}

export default App;
