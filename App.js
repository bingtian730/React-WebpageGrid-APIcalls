import React, { useState, useEffect } from "react";
import {
  withAuthenticator,
  Image,
  Flex,
  Grid,
  Card,
  View,
  ScrollView,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import axios from "axios";
import Button from "react-bootstrap/Button";
import DropDown from "./component/DropDown";
import Onelines from "./component/Onelines";
import Reload from "./component/reload";
import StyledTreeExample from "./component/tree";
import ThreeButton from "./component/ThreeButton";
import "@aws-amplify/ui-react/styles.css";
import "./component/App.css";

import { put, takeLatest, all, call } from "redux-saga/effects";
import * as AmazonCognitoIdentity from "amazon-cognito-auth-js";

// import { useNavigate } from "react-router-dom";

Amplify.configure(awsExports);

function App({ signOut }) {
  // const navigate = useNavigate();

  const [NumDisplay, setNumDisplay] = useState("");
  const [siteName, setSiteName] = useState("Demo Site");
  const [stateName, setStateName] = useState("");
  const [sitesDisplay, setSitesDisplay] = useState("");

  // this will call the api base on the button site name you click , and will return data from the api
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://*****/getValues?site=${siteName}`
        );
        setNumDisplay(response.data);
      } catch (err) {
        console.log("error", err);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [siteName]);

  //// this will fetch all the sites under the state that was selected


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://*****/siteinfo?state=${stateName.name}`
        );
        // setSitesDisplay(response.data);
        setSitesDisplay([
          { site_name: "asite" },
          { site_name: "bsite" },
          { site_name: "csite" },
        ]);
      } catch (err) {
        console.log("error", err);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [stateName]);

  // const SignOut = (e) => {
  //   navigate("/")
  // };

  return (
    <>
      <div className="topnav">
        <Grid
          templateColumns="1fr 1fr 1fr "
          templateRows="2rem 6rem 4rem 70rem 3rem"
        >
          <Card
            columnStart="1"
            columnEnd="-1"
            backgroundColor="border.pressed"
          ></Card>

          <Card
            columnStart="1"
            columnEnd="2"
            backgroundColor="background.primary"
          >
            <Flex
              direction="row"
              justifyContent="flex-start"
              alignItems="stretch"
              alignContent="flex-start"
              wrap="nowrap"
              shrink="flex-shrink"
            >
              <View>
                <Image
                  objectFit="initial"
                  alt="logo"
                  objectPosition="15% 15%"
                  align="left"
                  height="35%"
                  width="35%"
                  opacity="100%"
                  src=""
                />
                <p className="c">my website</p>
              </View>
            </Flex>
          </Card>
          <Card
            columnStart="2"
            columnEnd="3"
            backgroundColor="background.primary"
          >
            <h1 align="center">{`${siteName} site`}</h1>
          </Card>
          <Card
            columnStart="3"
            columnEnd="-1"
            backgroundColor="background.primary"
          >
            <Flex
              direction="row"
              justifyContent="end"
              alignItems="stretch"
              alignContent="end"
              wrap="nowrap"
            >
              {/* this is the threebutton structure  */}
              <ThreeButton
                setNumDisplay={setNumDisplay}
                setSiteName={setSiteName}
                siteName={siteName}
                stateName={stateName}
                setStateName={setStateName}
                setSitesDisplay={setSitesDisplay}
                sitesDisplay={sitesDisplay}
              />
              <div style={{ width: 120, marginBottom: 20 }}>
                <Button variant="light" onClick={signOut}>
                  sign out
                </Button>
              </div>
            </Flex>
          </Card>

          <Card
            columnStart="1"
            columnEnd="2"
            backgroundColor="background.tertiary"
          >
            <Onelines></Onelines>
          </Card>
          <Card
            columnStart="2"
            columnEnd="3"
            backgroundColor="background.tertiary"
          ></Card>
          <Card
            columnStart="3"
            columnEnd="-1"
            backgroundColor="background.tertiary"
          >
            <Flex
              direction="row"
              justifyContent="flex-end"
              alignItems="stretch"
              alignContent="flex-end"
              wrap="nowrap"
            >
              {" "}
              <Reload />
              <DropDown />
            </Flex>
          </Card>
          <Card
            variation="elevated"
            columnStart="1"
            columnEnd="-1"
            backgroundColor="background.primary"
          >
            <Flex
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              alignContent="center"
              wrap="nowrap"
            >
              <ScrollView width="2000px" className="horizontal-example">
                <Flex>
                  <StyledTreeExample treedata={NumDisplay} />
                </Flex>
              </ScrollView>
            </Flex>
          </Card>
          <Card columnStart="1" columnEnd="2" backgroundColor="border.pressed">
            <Flex
              direction="row"
              justifyContent="flex-start"
              alignItems="stretch"
              alignContent="flex-start"
              wrap="nowrap"
            >
              
            </Flex>
          </Card>
          <Card columnStart="2" columnEnd="-1" backgroundColor="border.pressed">
            <Flex
              direction="row"
              justifyContent="flex-end"
              alignItems="stretch"
              alignContent="flex-end"
              wrap="nowrap"
            >
            </Flex>
          </Card>
        </Grid>
      </div>
    </>
  );
}

export default withAuthenticator(App);
