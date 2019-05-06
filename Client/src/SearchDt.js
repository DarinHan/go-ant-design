import React from 'react';
import './TreeItem.css';
import { Input, Divider } from 'antd';
import DirTree from './DirTree.js'



class SearchDt extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            root: undefined,
            dirinfo:[]
        }
    }

    loadtreenodes = function (root) {
        console.log('root'+root)
        this.setState({ root: root });
        var url='http://localhost:9898/dir?root='+root;
        fetch(url, { mode: 'cors' }).then(res => {
            console.log('res' + res);
            var t = this;
            res.json().then(function (data) {
                console.log(data);
                t.setState({
                    dirinfo: data
                })
            });
        })
    }


    render() {
        const Search = Input.Search;
        return (
            <div><Search
                placeholder="input search text"
                style={{ width: 500 }}
                enterButton
                onSearch={value => {
                    console.log(value);
                    this.loadtreenodes(value);
                }}
            />
                <Divider dashed />
                <DirTree dirinfo={this.state.dirinfo}></DirTree>
            </div>
        )
    }
}

export default SearchDt;