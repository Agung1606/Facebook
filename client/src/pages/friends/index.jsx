import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOtherUsers } from 'state';
import { Container, Grid } from '@mui/material';
import AddFriendWidget from 'pages/widgets/AddFriendWidget';

const ListAddFriends = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const otherUsers = useSelector((state) => state.otherUsers);
  const token = useSelector((state) => state.token);

  const getUsersButYou = async () => {
    const response = await fetch(
      `http://localhost:7001/api/v1/users/notyou/${user._id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}`},
    });
    const data = await response.json();
    dispatch(setOtherUsers( {otherUsers: data} ));
  };

  useEffect(() => {
    getUsersButYou();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return(
    <Container sx={{ marginTop: "5.5rem" }}>
      <Grid container spacing={1.5}>
        {otherUsers.map(
            ({
                _id,
                firstName,
                lastName,
                profilePicturePath,
            }) => (
              <AddFriendWidget 
                  key={_id}
                  userId={_id}
                  firstName={firstName}
                  lastName={lastName}
                  profilePicturePath={profilePicturePath}
              />
            )
        )}
      </Grid>
    </Container>
  );

}

export default ListAddFriends;