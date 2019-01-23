import React from 'react';

const User = (user) => {
    const reqProperties = ['username', 'name', 'email', 'website'];
    return (
        <div>
            {reqProperties.map((p, i) => {
                return (
                    <div key={i}>
                        <p className="m-0 font-weight-bold text-info">{p.toUpperCase()}</p>
                        <p className="m-0">{user[p]}</p>
                        <hr />
                    </div>
                );
            })}
            <p className="m-0 font-weight-bold text-info">COMPANY</p>
            <p className="m-0">{user.company.name}</p>
            <hr />
        </div>
    );
};

export default User;