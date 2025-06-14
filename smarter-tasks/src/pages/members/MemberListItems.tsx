/* eslint-disable @typescript-eslint/no-explicit-any */
//import React from "react";
import { useMembersState, useMembersDispatch } from "../../context/members/context";
import { deleteMember } from "../../context/members/action";

export default function MemberListItems() {

  // eslint-disable-next-line prefer-const
  let state: any = useMembersState();
  const dispatchMembers = useMembersDispatch();

  const { members, isLoading, isError, errorMessage } = state
  console.log(members);

  if (members.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }
  
  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      {members.map((member: any) => (
        <div key={member.id} className="member block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">{member.name}</h5>
          <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">{member.email}</h5>
          <button className="cursor-pointer h-4 w-4 rounded-full my-5 mr-5"
          onClick={(event) => {
            event.preventDefault();
            deleteMember(dispatchMembers, member.id)
          }}>Delete
          </button>
        </div>
      ))}        
    </>
  );
}
        