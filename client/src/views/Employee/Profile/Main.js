import React from "react";
import { useSelector } from "react-redux";
import { Container, Grid } from "@material-ui/core";
import _ from "lodash";
import Basic from "./Basic";
import Experience from "./Experience";
import Preference from "./Preference";
import Skill from "./Skill";
import Portfolio from "./Portfolio";

const Profile = () => {
  const { profile } = useSelector((state) => state.employees);
  console.log(profile, "profile");
  return (
    !_.isEmpty(profile) && (
      <div>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Basic data={profile.basic} />
            </Grid>
            <Grid item xs={12}>
              {profile.preference && <Preference data={profile.preference} />}
            </Grid>
            <Grid item xs={12}>
              {profile.experience && <Experience data={profile.experience} />}
            </Grid>
            <Grid item xs={12}>
              {profile.skill && <Skill data={profile.skill} />}
            </Grid>
            <Grid item xs={12}>
              {profile.portfolio && <Portfolio data={profile.portfolio} />}
            </Grid>
          </Grid>
        </Container>
      </div>
    )
  );
};

export default Profile;
