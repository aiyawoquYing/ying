import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Table, Divider, Tag } from 'antd';
import 'antd/dist/antd.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      data:[],
    }
  }
  componentDidMount(){
    this.getData(res=>{
      this.setState({
        data:res,
      })
    })
  }
  getData = (callback) =>{
    axios.get('http://www.mocky.io/v2/5b766d7b3000005700848af9').then(res=>{
      console.log(res)
      if( res.status === 200 ){
        callback(res.data.apis)
      }
    })
  }
  render() {
    console.log(this.state.data)
    const columns = [{
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
    }, {
      title: 'image',
      dataIndex: 'image',
      key: 'image',
    }, {
      title: 'tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
        </span>
      ),
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">Invite {record.name}</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
        </span>
      ),
    }];
    
    const data = this.state.data;
    
    return (
      <div className="App">
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default App;
