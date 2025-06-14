import React, { useEffect } from 'react';
import { fetchMembers } from '../../context/members/action';
import { useMembersDispatch } from "../../context/members/context";
import MemberListItems from './MemberListItems';

const MemberList: React.FC = () => {

  const dispatchMembers = useMembersDispatch();
  
  useEffect(() => {
    fetchMembers(dispatchMembers)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="grid gap-4 grid-cols-4 mt-5">
      {}
      <MemberListItems />
    </div>
  );
};

export default MemberList;