import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Table, Divider, Tag, Avatar, Modal, Button } from 'antd';
import 'antd/dist/antd.css';

class App extends Component {
  state = {
    modal1Visible: false,
  }

  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }

  constructor() {
    super();
    this.state = {
      data: [],
    }
  }
  componentDidMount() {
    this.getData(res => {
      this.setState({
        data: res,
      })
    })
  }
  getData = (callback) => {
    axios.get('http://www.mocky.io/v2/5b766d7b3000005700848af9').then(res => {
      console.log(res)
      if (res.status === 200) {
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
    }, {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      render: text => <Divider title={text} type="vertical" style={{ width: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', height: 20, cursor: 'pointer' }}>{text}</Divider>,
    }, {
      title: 'image',
      dataIndex: 'image',
      key: 'image',
      render: image => <img alt="example" src={image} style={{ margin: '10px' }} />
    }, {
      title: 'humanURL',
      dataIndex: 'humanURL',
      key: 'humanURL',
      render: humanURL => <a href={humanURL}>{humanURL}</a>,
    }, {
      title: 'baseURL',
      dataIndex: 'baseURL',
      key: 'baseURL',
      render: baseURL => <a href={baseURL}>{baseURL}</a>,
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
      title: 'properties',
      key: 'properties',
      dataIndex: 'properties',
      render: properties => (
        <div>
          <Button key={properties} onClick={() => this.setModal1Visible(true)}>properties</Button>
          <Modal
            title='properties'
            visible={this.state.modal1Visible}
            onOk={() => this.setModal1Visible(false)}
            onCancel={() => this.setModal1Visible(false)}
          >
            {properties.map(properties =>
              <div>
                <p>{properties.type}</p>
                <a href={properties.url}>{properties.url}</a>
              </div>)}
          </Modal>
        </div>
      ),
    }];

    const data = this.state.data;

    const fileList = this.state.data.image;

    return (
      <div className="App">
        <Table rowKey={record => record.id} columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default App;
