import React from "react";
import { IoMdSettings } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { GoDotFill } from "react-icons/go";

const UserInformation = ({ user }) => {
  return (
    <>
      <td>{user.id}</td>
      <td><img src={user.img_url} alt={user.name +'profile'} className="rounded-circle"/>{user.name}</td>
      <td>{user.date_created}</td>
      <td>{user.role}</td>
      <td>
        <GoDotFill
          className="me-3"
          color={`${user.status === "Active" ? "#bfbd25" : user.status === "Suspended"?"red":'#f3f186'}`}
        />
        {user.status}
      </td>
      <td>
        <IoMdSettings className="me-3 text-primary" size={28} />
        <MdCancel className="text-danger" size={28} />
      </td>
    </>
  );
};

export default UserInformation;
