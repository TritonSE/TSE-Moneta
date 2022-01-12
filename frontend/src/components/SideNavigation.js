import React from 'react';

const SideNavigation = (props) => {
    return (
        <div className="SideNavigation">
            <button style={{top: 50}}>
                Moneta<image src=""></image>
            </button>
            <button style={{top: 187}}>
                Database<image src=""></image>
            </button>
            <button style={{top: 316}}>
                Admin<image src=""></image>
            </button>
            <button style={{top: 444}}>
                Settings<image src=""></image>
            </button>
            <button style={{top: 833}}>
                Log Out<image src=""></image>
            </button>
        </div>
);
};
export default SideNavigation;
