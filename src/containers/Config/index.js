import React, { Component } from 'react';
import TextInput from 'components/TextInput';

class Config extends Component {
    render() {
        return (
            <div className="config">
                <div>
                    Bridge IP <br />
                    <TextInput />
                </div>
                <div>
                    Username <br />
                    <TextInput />
                </div>
            </div>
        );
    }
}

export default Config;
