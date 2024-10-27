import React from 'react';

import { LoginProps } from '@/utils/types';
import UserInfo from '@/components/magic/cards/UserInfoCard';
import DevLinks from './DevLinks';


export default function Dashboard({ token, setToken }: LoginProps) {
  return (
    <div className="home-page">
      {/* <Header /> */}
      <div className="cards-container">
        <UserInfo token={token} setToken={setToken} />

      
      </div>
      
    </div>
  );
}
