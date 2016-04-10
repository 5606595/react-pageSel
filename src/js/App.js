/**
 * Created by jorten on 16/3/17.
 */
import React from 'react'
import PageSel from './components/PageSel'

export default React.createClass({
    callback(index) {
        console.log(index);
    },
    render() {
        return(
            <div className="app">
                <PageSel curPage={7} pageCount={100} callback={this.callback} />
            </div>
        );
    }
});

