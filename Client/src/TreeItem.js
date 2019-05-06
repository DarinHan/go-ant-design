import React from 'react';
import './TreeItem.css';
import { Row, Col } from 'antd';

class TreeItem extends React.Component {
    getsizedesc = function (totalsize) {
        if (totalsize < 1024) {
            return "" + totalsize + "B"
        }

        if (totalsize < 1024 * 1024) {
            return "" + (totalsize / 1024).toFixed(2) + "KB"
        }

        if (totalsize < 1024 * 1024 * 1024) {
            return "" + (totalsize / 1024 / 1024).toFixed(2) + "MB"
        }

        if (totalsize < 1024 * 1024 * 1024 * 1024) {
            return "" + (totalsize / 1024 / 1024 / 1024).toFixed(2) + "GB"
        }
        return "" + totalsize
    }
    render() {
        let content = undefined;
        var totalsize = this.props.TotalSize;
        if (totalsize < 1024) {
            content = <Row className="treeitem" >
                <Col span="22" className="itemname">{this.props.Name}</Col>
                <Col span="2" className="itemsize">{"" + totalsize + "B"}</Col>
            </Row >
        }else if (totalsize < 1024 * 1024) {
            content = <Row className="treeitem size-kb" >
                <Col span="22" className="itemname">{this.props.Name}</Col>
                <Col span="2" className="itemsize">{"" + (totalsize / 1024).toFixed(2) + "KB"}</Col>
            </Row >
        }else if (totalsize < 1024 * 1024 * 1024) {
            content = <Row className="treeitem size-mb" >
                <Col span="22" className="itemname">{this.props.Name}</Col>
                <Col span="2" className="itemsize">{"" + (totalsize / 1024 / 1024).toFixed(2) + "MB"}</Col>
            </Row >
        }else if (totalsize < 1024 * 1024 * 1024 * 1024) {
            content = <Row className="treeitem size-gb" >
                <Col span="22" className="itemname">{this.props.Name}</Col>
                <Col span="2" className="itemsize">{"" + (totalsize / 1024 / 1024 / 1024).toFixed(2) + "GB"}</Col>
            </Row >
        }

        return (
            <div className="treeitem">{content}
            </div>
        )
    }
}

export default TreeItem;