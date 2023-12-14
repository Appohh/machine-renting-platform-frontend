import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import UserService from "../services/UserService";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const { userId } = useParams();

  useEffect(() => {
      let user;
      if (location.state && location.state.user) {
        user = location.state.user;
      } else {
        user = UserService.getUserById(userId);
      }
      setUser(user);
  }, [userId, location.state]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-user">
    </div>
  );
}

export default ProfilePage;