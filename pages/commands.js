import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";

import Layout from "../components/common/layout";
import {
  Alert,
  Button,
  Container,
  Table,
  Collapse,
  Image,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGem,
  faAngry,
  faDizzy,
  faExternalLinkAlt,
  faFlushed,
  faGift,
  faGrimace,
  faGrinHearts,
  faGrinStars,
  faGrinTongue,
  faLaughSquint,
  faLink,
  faMeh,
  faMehRollingEyes,
  faPlusCircle,
  faSadCry,
  faSmile,
  faSmileBeam,
  faSmileWink,
  faSurprise,
} from "@fortawesome/free-solid-svg-icons";

import {
  commands,
  settings,
  premiumSettings,
} from "../components/data/commands";

export default class ErrorPage extends React.Component {
  render() {
    return (
      <Layout
        innerClassName="align-items-center justify-content-start flex-column"
        effect={false}
      >
        <Head>
          <title>Commands | AutoMuteUs</title>
        </Head>
        <Container size="lg">
          <div>
            <h1 className="d-flex flex-row justify-content-between align-items-center">
              AutoMuteUs Commands
              <Button
                href="https://github.com/denverquane/automuteus#commands"
                target="_blank"
                variant="secondary"
                className="d-none d-lg-block"
              >
                <FontAwesomeIcon
                  icon={faExternalLinkAlt}
                  fixedWidth
                  className="mr-2"
                />
                GitHub Reference
              </Button>
            </h1>
          </div>
          <div style={{ fontSize: "1.1rem" }}>
            <Alert variant="dark">
              The Discord Bot uses the <code>.au</code> prefix for any commands
              by default; if you change your prefix remember to replace{" "}
              <code>.au</code> with your custom prefix. If you forget your
              prefix, you can @mention the bot and it will respond with whatever
              it's prefix currently is.
            </Alert>
            <hr />
            {commands
              .sort((a, b) => (a.command > b.command ? 1 : -1))
              .map((cmd) => (
                <CommandEntry
                  command={cmd.command}
                  alias={cmd.alias}
                  description={cmd.description}
                  arguments={cmd.arguments}
                  example={cmd.example}
                  image={cmd.image}
                  key={`cmd-${cmd.command
                    .replace(".", "")
                    .split(" ")
                    .join("_")}`}
                />
              ))}
          </div>

          <hr />

          <div>
            <h2 id="settings-list">Settings</h2>
            <Alert variant="dark">
              <p>
                Available configurable settings for the bot and how it displays
                your data. Access is controlled by appropriate settings listed.
              </p>
              <p className="mb-0">
                Click on a setting to expand more details about it. Entries
                listed with a{" "}
                <FontAwesomeIcon className="text-premium" icon={faGem} /> are
                for premium AutoMuteUs users only.
              </p>
            </Alert>
            <hr />
            {[...settings, ...premiumSettings]
              .sort((a, b) => (a.command > b.command ? 1 : -1))
              .map((cmd) => (
                <CommandEntry
                  command={cmd.command}
                  alias={cmd.alias}
                  description={cmd.description}
                  arguments={cmd.arguments}
                  example={cmd.example}
                  image={cmd.image}
                  isPremium={cmd?.isPremium ?? false}
                  key={`cmd-${cmd.command
                    .replace(".", "")
                    .split(" ")
                    .join("_")}`}
                />
              ))}
          </div>
        </Container>
      </Layout>
    );
  }
}

function CommandEntry(props) {
  const command = props;
  const [open, setOpen] = useState(false);
  const [imgOpen, setImgOpen] = useState(!command.image);

  const req_args = command.arguments.filter((c) => c.level == "required");
  const opt_args = command.arguments.filter((c) => c.level == "optional");

  const emoticon = [
    faSmileWink,
    faSmile,
    faGrinHearts,
    faMehRollingEyes,
    faSadCry,
    faSurprise,
    faSmileBeam,
    faLaughSquint,
    faGrinTongue,
    faGrimace,
    faFlushed,
    faDizzy,
    faAngry,
    faMeh,
    faGrinStars,
  ];
  const randomEmote = emoticon[Math.floor(Math.random() * emoticon.length)];

  return (
    <div className="command-entry" id={command.command}>
      <Link href={`#${command.command}`}>
        <span>
          <FontAwesomeIcon icon={faLink} className="text-muted anchor-left" />
        </span>
      </Link>
      <h2
        className="command-name"
        onClick={() => setOpen(!open)}
        aria-controls={`${command.command}-content`}
        aria-expanded={open}
      >
        <code>{command.command}</code>
        <FontAwesomeIcon
          icon={faGem}
          className={`mx-2 text-premium ${command.isPremium ? "d-inline-block" : "d-none"}`}
          style={{ fontSize: "1.1rem" }}
        />
        <span
          className={`command-description-inline ${
            open ? "d-none" : "d-inline-block"
          }`}
        >
          {command.description.map((e, i) => (
            <span key={i}>{e}</span>
          ))}
        </span>
      </h2>

      <Collapse in={open}>
        <div
          id={`${command.command}-content`}
          key={`${command.command}-content`}
          className="command-content"
        >
          <h5>Description</h5>
          <div style={{ fontSize: "1.1rem" }} className="mb-4">
            {command.description.map((e, i) => (
              <span key={i}>{e}</span>
            ))}
          </div>

          <h5>Aliases</h5>
          <div className="mb-4">
            {command.alias.length ? (
              command.alias.map((a) => (
                <code
                  className="mr-2"
                  key={`${command.command}-alias-${a}`}
                  title={`.au ${a}`}
                  style={{ cursor: "default" }}
                >
                  {a}
                </code>
              ))
            ) : (
              <div className="text-muted">
                <em>None</em>
              </div>
            )}
          </div>

          <h5>Arguments</h5>
          <div className="mb-4">
            {(req_args.length || opt_args.length) > 0 && <h6>Required</h6>}
            <div>
              <ArgTable cmd={command.command} args={req_args} />
            </div>
            {opt_args.length > 0 && (
              <>
                <br />
                <h6>Optional</h6>
                <div>
                  <ArgTable cmd={command.command} args={opt_args} />
                </div>
              </>
            )}
          </div>

          <h5>Example</h5>
          <div className="">
            <div className="mock-chatbar">
              <div>
                <FontAwesomeIcon
                  size="lg"
                  fontVariant="light"
                  icon={faPlusCircle}
                  className="icon-muted"
                />
              </div>
              <div className="cmd-text">{command.example}</div>
              <div className="ml-auto d-none d-md-block">
                <FontAwesomeIcon
                  size="lg"
                  fontVariant="light"
                  icon={faGift}
                  className="icon-muted"
                  style={{ marginRight: "0" }}
                />
                <FontAwesomeIcon
                  size="lg"
                  fontVariant="light"
                  icon={randomEmote}
                  className="icon-muted"
                />
              </div>
            </div>
            {command.image && (
              <div className="text-center">
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-2"
                  onClick={() => setImgOpen(!imgOpen)}
                  aria-controls={`${command.command}-result`}
                  aria-expanded={imgOpen}
                >
                  Show output
                </Button>
                <Collapse in={imgOpen}>
                  <div
                    className="text-center pt-2"
                    id={`${command.command}-result`}
                  >
                    <Image
                      src={`/assets/img/commands/${command.command}_result.png`}
                      rounded
                      className="shadow"
                      fluid
                    />
                  </div>
                </Collapse>
              </div>
            )}
          </div>
          <br />
        </div>
      </Collapse>
    </div>
  );
}

function ArgTable(props) {
  const { cmd, args } = props;

  if (!args.length)
    return (
      <div className="text-muted">
        <em>None</em>
      </div>
    );

  return (
    <Table striped borderless variant="dark" responsive>
      <thead>
        <tr>
          <th style={{ width: "10%" }}>Name</th>
          <th style={{ width: "10%" }}>Type</th>
          <th style={{ width: "50%" }}>Description</th>
          <th>Values</th>
        </tr>
      </thead>
      <tbody>
        {args.map((a) => (
          <tr key={`${cmd}-arg-${a.name}`}>
            <td className="text-monospace">{a.name}</td>
            <td className="text-monospace">{a.type}</td>
            <td>
              {a.description.map((e, i) => (
                <span key={i}>{e}</span>
              ))}
            </td>
            <td>
              {a.values ? (
                a.values.map((v) => (
                  <code key={`${cmd}-arg-${a.name}-${v}`} className="mr-2">
                    {v}
                  </code>
                ))
              ) : (
                <span className="text-muted">-</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
