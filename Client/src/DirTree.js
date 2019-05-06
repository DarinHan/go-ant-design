import { Tree } from 'antd';
import React from 'react';
import TreeItem from './TreeItem'

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;

class DirTree extends React.Component {
    constructor(props) {
        super(props);
    }

    onSelect = (keys, event) => {
        console.log('Trigger Select', keys, event);
    };

    onExpand = () => {
        console.log('Trigger Expand');
    };

    

    rendersubfiles = function (subfile) {
        if (subfile.SubFiles == null) {
        return (<TreeNode title={<TreeItem Name={subfile.Name} TotalSize={subfile.TotalSize}></TreeItem>} key={subfile.Name} isLeaf />);
        } else {
            let subfilecontent = subfile.SubFiles.map((item, index) => {
               return(this.rendersubfiles(item));
            });
            return (<TreeNode title={<TreeItem Name={subfile.Name} TotalSize={subfile.TotalSize}></TreeItem>} key={subfile.Name} >
                {subfilecontent}
            </TreeNode>)
        }
    }



    render() {
        console.log(this.props);
        if (this.props==null||this.props.dirinfo == null || this.props.dirinfo.length==0) {
            return (<div></div>);
        }
        
        let content = this.rendersubfiles(this.props.dirinfo)
        return (
            <DirectoryTree
                multiple
                onSelect={this.onSelect}
                onExpand={this.onExpand}
                loadData = {this.onLoadData}
            >
                {content}
            </DirectoryTree>
        );
    }
}

export default DirTree;