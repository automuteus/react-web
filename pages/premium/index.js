import React, { useState } from "react";
import Head from "next/head";
import { getSession, signIn } from "next-auth/client";
import { useRouter } from "next/router";

import {
  Badge,
  Button,
  Card,
  CardDeck,
  Container,
  Image,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faPaypal } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckCircle,
  faGamepad,
  faLifeRing,
  faMedal,
  faRobot,
  faTimes,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

import * as util from "../../components/utility/client";
import Layout from "../../components/layout";
import GuildDropdown from "../../components/guild-dropdown";

const crewmate_brown = "/assets/img/crewmate_brown.png";
const crewmate_white = "/assets/img/crewmate_white.png";
const crewmate_yellow = "/assets/img/crewmate_yellow.png";
const crewmate_cyan = "/assets/img/crewmate_cyan.png";

const current_perks = [
  {
    perk: "Priority Game Access",
    description:
      "Always be able to make new games, even when the bot is under high load! ",
    icon: <FontAwesomeIcon size="2x" className="mb-3" icon={faGamepad} />,
  },
  {
    perk: "Stats and Leaderboards",
    description:
      "View Among Us stats and leaderboards for the players on your server!",
    icon: <FontAwesomeIcon size="2x" className="mb-3" icon={faMedal} />,
  },
  {
    perk: "Premium Support",
    description:
      "Access to Premium-only channels and chats in our official Discord!",
    icon: <FontAwesomeIcon size="2x" className="mb-3" icon={faLifeRing} />,
  },
  {
    perk: "Priority Muting Bots",
    description:
      "Issues requests alongside the main bot; this drastically improves the speed of mutes/deafens in your games",
    icon: <FontAwesomeIcon size="2x" className="mb-3" icon={faRobot} />,
  },
  {
    perk: "Premium Servers",
    description:
      "Get your premium AutoMuteUs bot status in multiple Discord servers!",
    icon: <FontAwesomeIcon size="2x" className="mb-3" icon={faDiscord} />,
  },
];

export default function Premium({ session }) {
  const router = useRouter();
  const [guild, setGuild] = useState(router.query.guild);
  const [serverName, setServerName] = useState("Select Server");

  const uid = session ? session.user.id : "";
  const { user_guilds, isLoading, isError } = util.listUserGuilds(uid);

  const handleGuildSelect = (key, e) => {
    setGuild(key);
    setServerName(e.target.innerHTML);
  };

  return (
    <Layout
      innerClassName="align-items-center justify-content-start flex-column"
      effect={false}
    >
      <Head>
        <title>AutoMuteUs Premium</title>
        <meta
          name="description"
          content="Avoid the game cap and more with AutoMuteUs Premium"
        />
        <meta name="theme-color" content="#7289DA" />

        <meta itemProp="name" content="AutoMuteUs Premium" />
        <meta
          itemProp="description"
          content="Avoid the game cap and more with AutoMuteUs Premium"
        />
        <meta
          itemProp="image"
          content="http://automute.us/assets/img/logo_premium.png"
        />

        <meta property="og:url" content="http://automute.us/premium" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AutoMuteUs Premium" />
        <meta
          property="og:description"
          content="Avoid the game cap and more with AutoMuteUs Premium"
        />
        <meta
          property="og:image"
          content="http://automute.us/assets/img/logo_premium.png"
        />

        <meta name="twitter:title" content="AutoMuteUs Premium" />
        <meta
          name="twitter:description"
          content="Avoid the game cap and more with AutoMuteUs Premium"
        />
        <meta
          name="twitter:image"
          content="http://automute.us/assets/img/logo_premium.png"
        />
      </Head>
      <Container className="text-center" size="lg">
        <h1>AutoMuteUs Premium</h1>
        <p style={{ fontSize: "1.25em" }}>
          Looking to upgrade your Among Us gameplay even further? Running into
          limitations with the bot while it's under high load? Consider
          AutoMuteUs premium to support the project as well as improve your
          muting experience!
        </p>

        <div className="guild-select">
          {session && (
            <GuildDropdown
              isLoading={isLoading}
              isError={isError}
              serverName={serverName}
              guildList={user_guilds}
              onSelect={handleGuildSelect}
            />
          )}

          {!session && (
            <div className="text-center">
              <span
                className="d-inline-block btn btn-primary m-2"
                onClick={() => signIn("discord")}
              >
                <FontAwesomeIcon icon={faDiscord} size="lg" className="mr-2" />
                Sign In
              </span>
              <strong>to get premium for your bot.</strong>
            </div>
          )}
        </div>

        <CardDeck className="mt-3 justify-content-center">
          <PremiumItem
            cardTitle="Bronze"
            accentColor="#71491e"
            buttonText="Get Bronze"
            paypalId="M8D39PF5ADGJW"
            guild_id={guild}
            image={crewmate_brown}
            price={
              <>
                <strong>US$1.50</strong> <small>/ month</small>
              </>
            }
            perks={{
              "Priority Game Access": <FontAwesomeIcon icon={faCheckCircle} />,
              "Stats and Leaderboards": (
                <FontAwesomeIcon icon={faCheckCircle} />
              ),
              "Premium Support": (
                <FontAwesomeIcon icon={faTimesCircle} className="text-muted" />
              ),
              "Priority Muting Bots": (
                <FontAwesomeIcon icon={faTimesCircle} className="text-muted" />
              ),
              "Premium Servers": (
                <FontAwesomeIcon icon={faTimesCircle} className="text-muted" />
              ),
            }}
          />
          <PremiumItem
            cardTitle="Silver"
            accentColor="#d6e0f0"
            buttonText="Get Silver"
            paypalId="CPZMEL7ZA6PHN"
            guild_id={guild}
            image={crewmate_white}
            price={
              <>
                <strong>US$3.50</strong> <small>/ month</small>
              </>
            }
            perks={{
              "Priority Game Access": <FontAwesomeIcon icon={faCheckCircle} />,
              "Stats and Leaderboards": (
                <FontAwesomeIcon icon={faCheckCircle} />
              ),
              "Premium Support": <FontAwesomeIcon icon={faCheckCircle} />,
              "Priority Muting Bots": (
                <>
                  <FontAwesomeIcon icon={faTimes} />
                  <strong className=""> 1</strong>
                </>
              ),
              "Premium Servers": (
                <FontAwesomeIcon icon={faTimesCircle} className="text-muted" />
              ),
            }}
          />
          <div className="w-100 d-none d-sm-block d-xl-none" />
          <PremiumItem
            cardTitle="Gold"
            accentColor="#ffd700"
            buttonText="Get Gold"
            paypalId="PYFCA7562KHB6"
            guild_id={guild}
            image={crewmate_yellow}
            price={
              <>
                <strong>US$5.50</strong> <small>/ month</small>
              </>
            }
            perks={{
              "Priority Game Access": <FontAwesomeIcon icon={faCheckCircle} />,
              "Stats and Leaderboards": (
                <FontAwesomeIcon icon={faCheckCircle} />
              ),
              "Premium Support": <FontAwesomeIcon icon={faCheckCircle} />,
              "Priority Muting Bots": (
                <>
                  <FontAwesomeIcon icon={faTimes} />
                  <strong className=""> 3</strong>
                </>
              ),
              "Premium Servers": (
                <>
                  <FontAwesomeIcon icon={faTimes} />
                  <strong className=""> 2</strong>
                </>
              ),
            }}
          />
          <PremiumItem
            cardTitle="Donation"
            accentColor="#38fedc"
            buttonText="Make Donation"
            paypalId="YM72RY5TF6WZU"
            guild_id={"donation"}
            image={crewmate_cyan}
            description={
              <div>
                <h6 className="text-blurple">Chip in any amount you wish ❤️</h6>
                <div>
                  You won't get any special bot privileges, but you will get our
                  thanks for making this Open Source project possible!
                </div>
              </div>
            }
          />
        </CardDeck>

        <h2 className="mb-3 mt-5">Premium Perks</h2>
        <div className="d-flex flex-row premium-perks">
          {current_perks.map((perk) => {
            return <PremiumPerk key={perk.perk} perk={perk} />;
          })}
        </div>
      </Container>
    </Layout>
  );
}

function PremiumPerk(props) {
  const { perk, description, icon } = props.perk;
  return (
    <Card className="text-center premium-perk-card">
      <Card.Body>
        <Card.Title>
          <div className="text-center text-premium">{icon}</div>
          <h5 className="text-blurple">{perk}</h5>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

function PremiumItem(props) {
  const guild_target = props.guild_id ? "&custom=" + props.guild_id : "";
  const valid = util.validGuild(props.guild_id);

  return (
    <Card className="text-center shadow premium-card">
      <Card.Body>
        <Image src={props.image} />
        <Card.Title className="font-weight-bold font-family-title d-flex flex-row justify-content-center align-items-center">
          <span className="text-ellipsis">AutoMuteUs</span>{" "}
          <Badge
            style={{ backgroundColor: props.accentColor, color: "black" }}
            className="ml-2"
          >
            {props.cardTitle}
          </Badge>
        </Card.Title>
        <span
          title={
            !valid && props.guild_id !== "donation"
              ? "Please choose a server first"
              : ""
          }
          className={
            !valid && props.guild_id !== "donation" ? "disabled-wrap" : ""
          }
        >
          <Button
            variant="premium"
            size="sm"
            href={
              "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=" +
              props.paypalId +
              guild_target
            }
            disabled={!valid && props.guild_id !== "donation"}
          >
            <FontAwesomeIcon icon={faPaypal} className="mr-2" />
            {props.buttonText}
          </Button>
        </span>
        {props.description && (
          <Card.Text as="div">{props.description}</Card.Text>
        )}
      </Card.Body>
      <ListGroup className="list-group-flush">
        {props.perks &&
          Object.entries(props.perks).map(([perk, val]) => {
            return (
              <ListGroupItem key={perk}>
                <div className="d-flex justify-content-between align-items-center">
                  <strong
                    className="d-inline mr-2 mb-0 font-family-title text-ellipsis"
                    title={perk}
                  >
                    {perk}
                  </strong>
                  <span className="text-success">{val}</span>
                </div>
              </ListGroupItem>
            );
          })}
      </ListGroup>
    </Card>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: { session },
  };
}
