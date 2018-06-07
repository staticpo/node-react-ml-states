import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Tree } from 'antd';
import ReactDOM from 'react-dom';


const TreeNode = Tree.TreeNode;


class App extends Component {
  state = {
    response: []
  };
  
  componentDidMount() {
    this.getStates()

      .then(res => {
          //console.log(res.express);
          this.setState({ response: res.express });
        }
      )
      .catch(err => console.log(err));
  }
  
  getStates = async () => {
    const response = await fetch('/BR');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  getCities = async (id) => {
    const response = await fetch('/cities/' + id);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  getNeighborhoods = async (id) => {
    const response = await fetch('/neighborhoods/' + id);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };



  onLoadData = (treeNode) => {
    return new Promise((resolve) => {
      if (treeNode.props.children) {
        resolve();
        return;
      }

      console.log(treeNode.props.dataRef.type);

      switch(treeNode.props.dataRef.type) {
          case "State":
              
              //Get cities
              this.getCities(treeNode.props.dataRef.id)
                .then(res => {
                    console.log(res.express);
                    treeNode.props.dataRef.children = [];
                    res.express.forEach(function(singleitem) {
                        treeNode.props.dataRef.children.push(singleitem);
                    });

                    this.setState({
                      response: [...this.state.response],
                    });
                    
                    resolve();
                  }
                )
                .catch(err => console.log(err));

          break;
          case "City":
              //Get neighborhood

              this.getNeighborhoods(treeNode.props.dataRef.id)
                .then(res => {
                    console.log(res.express);
                    treeNode.props.dataRef.children = [];
                    res.express.forEach(function(singleitem) {
                        treeNode.props.dataRef.children.push(singleitem);
                    });

                    this.setState({
                      response: [...this.state.response],
                    });
                    
                    resolve();
                  }
                )
                .catch(err => console.log(err));
          break;
          default:
              //?? Error ??
              resolve();
      }
    });
  };

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
          <TreeNode title={item.name} key={item.id} dataRef={item}></TreeNode>
      );
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        
        <Tree showLine loadData={this.onLoadData}>
          {this.renderTreeNodes(this.state.response)}
        </Tree>

        
      </div>
    );
  }
}

export default App;
