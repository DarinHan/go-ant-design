import React from 'react';
import './App.css';
import { Layout } from 'antd';
import SearchDt from './SearchDt.js'

const {
  Header, Sider, Content,
} = Layout;
function App() {

  return (
    <div className="App">
      <Layout>
        <Header className="layout-header"></Header>
        <Layout>
          <Sider className="layout-left">   
          </Sider>
          <Content className="content">
            <SearchDt></SearchDt>
          </Content>
        </Layout>
      </Layout>

    </div>
  );
}


export default App;
