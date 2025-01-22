const UserDetails = ({ user }) => {
  if (!user) return null;

  const fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();

  return (
    <>
      {fullName && <div className="text-gray-600">{fullName}</div>}
      {user.email && (
        <div className="text-gray-600">
          {user.email}
        </div>
      )}
      {user.phone_number && (
        <div className="text-gray-600">
          {user.phone_number}
        </div>
      )}
    </>
  );
};

export default UserDetails;
