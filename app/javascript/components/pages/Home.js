import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Hello {logged_in && current_user.username}</h1>
                <div>
                    {/* {this.props.coins && this.props.coins.name} */}
                </div>
            </div>
        );
    }
}

export default Home;