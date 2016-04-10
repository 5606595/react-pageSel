/**
 * Created by jorten on 16/4/7.
 */

import React from 'react'
import '../../styles/pageSel.less'

let PageSel = React.createClass({
    getInitialState() {
        return {
            curPage: this.props.curpage || 1,
            pageNum: this.props.pagenum || 5,
            pages: [],
            pageCount: this.props.pageCount
        }
    },
    componentWillMount() {
        let curPage = this.state.curPage;
        this.handlePage(curPage);
    },
    handlePage(curPage) {
        let pages = [];
        let pageCount = this.state.pageCount;
        if(curPage > 2 && curPage < pageCount - 1) {
            for(let i = 0; i < 5; i++) {
                pages.push(curPage - 2 + i);
            }
        } else if(curPage <= 2) {
            for(let i = 0; i < 5; i++) {
                pages.push(i + 1);
            }
        } else {
            for(let i = 0; i < 5; i++) {
                pages.unshift(pageCount - i);
            }
        }
        this.setState({
            pages: pages
        });
        this.props.callback(curPage);
    },
    overHandle() {
        let node = this.refs.first.getDOMNode();
        node.className = "first";
    },
    leaveHandle() {
        let node = this.refs.first.getDOMNode();
        node.className = "";
    },
    clickHandle(index, event) {
        event.preventDefault();
        this.setState({
            curPage: index
        });
        this.handlePage(index)
    },
    prevHandle(event) {
        event.preventDefault();
        let curPage = this.state.curPage;
        curPage--;
        this.setState({
            curPage: curPage
        });
        this.handlePage(curPage);
    },
    nextHandle(event) {
        event.preventDefault();
        let curPage = this.state.curPage;
        curPage++;
        this.setState({
            curPage: curPage
        });
        this.handlePage(curPage);
    },
    disableHandle(event) {
        event.preventDefault();
    },
    confirmHandle() {
        let input = this.refs.input.getDOMNode();
        let value = input.value;
        let pageCount = this.state.pageCount;
        if(value != parseInt(value)) {
            return;
        }
        if(value < 0 || value > pageCount) {
            return;
        }
        this.setState({
            curPage: parseInt(value)
        });
        this.handlePage(value);
    },
    keyHandle(event) {
        if(event.keyCode === 13) {
            this.confirmHandle();
        }
    },
    render() {
        let prev = <li className="last-page" onClick={this.prevHandle.bind(this)}><a href=""><i className="iconfont icon-last"></i>上一页</a></li>
        let next = <li className="next-page"><a href="" onClick={this.nextHandle.bind(this)}><i className="iconfont icon-next"></i>下一页</a></li>
        let disabled = <li className="last-page disabled" onClick={this.disableHandle}><a href=""><i className="iconfont icon-last"></i>上一页</a></li>
        let pageCount = this.state.pageCount;
        return(
            <div className="pageSel">
                <ul>
                    {this.state.curPage === 1 ? disabled : prev}
                    {this.state.curPage === 1 ? <li className="active"><span>1</span></li> : <li ref="first" onMouseOver={this.overHandle} onMouseLeave={this.leaveHandle} onClick={this.clickHandle.bind(this, 1)}><a href="">1</a></li>}
                    {this.state.pages[0] > 2 && this.state.pageCount > this.state.pageNum ? <li className="not"><span>...</span></li> : ''}
                    {
                        this.state.pages.map((data) => {
                            if(data === 1) {
                                return;
                            }
                            if(data === this.state.curPage) {
                                return <li className="active"><span>{data}</span></li>
                            } else {
                                return <li onClick={this.clickHandle.bind(this, data)}><a href="">{data}</a></li>
                            }
                        })
                    }
                    {this.state.pageCount > this.state.pages[this.state.pages.length - 1] ? <li className="not"><span>...</span></li> : ''}
                    {this.state.pageCount > this.state.curPage ? next : ''}
                    <span className="explain">共<span className="num">{pageCount}</span>页, 到第</span><input ref="input" onKeyDown={this.keyHandle.bind(this)} type="text"/><span className="explain">页</span><button className="confirm" onClick={this.confirmHandle.bind(this)}>确定</button>
                </ul>
            </div>
        )
    }
});

export default PageSel;