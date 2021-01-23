import React from 'react';

const User = ({userData}) => {
    return (
        <div>
            <img width="40"
                 className="rounded-circle"
                 src={`https://secure.gravatar.com/avatar/${userData.avatar.gravatar.hash}.jpg?s=64"`}
                 alt='avatar'
            />
            user
        </div>
    );
};

export default User;