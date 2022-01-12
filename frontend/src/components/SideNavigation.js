import React from 'react';

const SideNavigation = (props) => {
    return (
        <div className="SideNavigation">
            <button style={{top: '6vh'}}>
                Moneta<image src=""></image>
            </button>

            <button style={{top: '20vh'}}>
                <image src=""></image>
            </button>
            <button style={{top: '26vh'}}>
                Database
            </button>

            <button style={{top: '35vh'}}>
                <image src=""></image>
            </button>
            <button style={{top: '41vh'}}>
                Admin
            </button>

            <button style={{top: '50vh'}}>
                <image src=""></image>
            </button>
            <button style={{top: '56vh'}}>
                Settings
            </button>
            <button style={{top: '93vh'}}>
                Log Out<image src=""></image>
            </button>
        </div>
);
};
export default SideNavigation;
