import { useState, type FormEvent } from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup, Image } from "react-bootstrap";
import { Camera, Cpu, Stars, Check2Circle } from "react-bootstrap-icons";
import banner from "./assets/fridgie_new_blue_banner.png";
import pro_image from "./assets/fridgie_pro_first_image.png";
import items_image from "./assets/fridgie_item_list.png";
import api from "./services/api";
import "./Welcome.css";

/** -------------------- Primary email signup (Winter 2026) -------------------- */
const PrimarySignup = () => {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!email.includes("@") || !email.includes(".")) {
      setErr("Please enter a valid email address.");
      return;
    }
    try {
      setBusy(true);
      await api.subscribeToNewsletter(email);
      setOk(true);
    } catch {
      setErr("Something went wrong. Are you already subscribed?");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="hero-card p-3 p-md-4 fadeUp">
      <span className="badge-beta">Winter 2026 Beta • Newsletter</span>
      <h1 className="hero-title mt-2 mb-2">Control Your Fridge</h1>
      <p className="hero-sub mb-3">
        Track what you have, waste less, and save more. Enter your email to join the beta and get updates.
      </p>

      {ok ? (
        <div className="d-flex align-items-center gap-2">
          <Check2Circle size={20} color="#1e6bd7" />
          <span className="text-success fw-semibold">Thanks! You’re on the list for the Winter 2026 beta and our newsletter.</span>
        </div>
      ) : (
        <Form onSubmit={submit} className="primary-cta">
          <Row className="g-2">
            <Col xs={12} md={8}>
              <InputGroup>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={busy}
                  required
                />
              </InputGroup>
            </Col>
            <Col xs={12} md={4}>
              <Button type="submit" className="w-100" variant="primary" disabled={busy}>
                {busy ? "Submitting…" : "Join & Subscribe"}
              </Button>
            </Col>
          </Row>
          {err ? <div className="mt-2 text-danger">{err}</div> : null}
          {/* <div className="mt-2"><small className="text-muted">No spam. Unsubscribe anytime.</small></div> */}
        </Form>
      )}
    </Card>
  );
};

/** -------------------- Page -------------------- */
function Welcome() {
  return (
    <div className="landing">
      <Container fluid>
        {/* top nav */}
        <Row className="navbar-clean align-items-center">
          <Col xs={6} md={3} className="d-flex align-items-center gap-2">
            <Image src={banner} height={28} alt="Fridgie" />
          </Col>
          <Col xs={0} md={6} />
          <Col xs={6} md={3} className="text-end">
            <a href="#pro" className="btn btn-link">Fridgie Pro</a>
            <a href="#join" className="btn btn-primary ms-2">Join Beta</a>
          </Col>
        </Row>

        <Row id="join" className="hero-wrap">
          <Col xxl={0} />
          <Col xxl={12} lg={10} className="mx-auto">
            <PrimarySignup />
            <div className="mt-3 d-flex flex-wrap gap-2">
              <span className="feature-chip"><Stars /> Reduce Waste</span>
              <span className="feature-chip"><Camera /> Receipt Scan</span>
              <span className="feature-chip">Weekly Reminders</span>
            </div>
          </Col>
          <Col xxl={0} />
        </Row>

        {/* COLLABORATIVE STORAGE */}
        <Row id="collab" className="py-4 py-md-5">
          <Col lg={12}>
            <section className="collab-split fadeUp">
              <div className="collab-media" aria-hidden="true">
                <Image
                      src={items_image}
                      alt="Fridgie Pro — receipt scanning preview"
                      fluid
                      style={{ maxHeight: 500, width: "100%", height: "auto", objectFit: "contain" }}
                    />
                {/* <div className="collab-media-ph">Shared Locations</div> */}
              </div>

              {/* Right: content */}
              <div className="collab-content">
                <span className="collab-pill">Shared Spaces</span>
                <h2 className="mt-2 mb-2">Collaborative storage that stays in sync</h2>
                <p className="mb-3">
                  Create shared <strong>Fridge</strong>, <strong>Pantry</strong>, or <strong>Freezer</strong> locations and invite your
                  family, roommates, or team.
                </p>

                <ul className="collab-checklist mb-3">
                  <li>Create multiple locations</li>
                  <li>Invite multiple people to join</li>
                  <li>Real-time updates</li>
                </ul>

                <div className="collab-avatars mb-3" aria-label="Example members">
                  <span className="av">JB</span>
                  <span className="av">WS</span>
                  <span className="av">DM</span>
                  <span className="av">NR</span>
                  <span className="av more">+3</span>
                </div>

                <a href="#join" className="btn btn-primary"><strong>Start a shared fridge</strong></a>
              </div>
            </section>
          </Col>
        </Row>

        {/* Fridgie Pro Card */}
        <Row id="pro" className="py-4 py-md-5">
          <Col lg={12}>
            <div className="band-pro p-4 p-md-5">
              <span className="pro-pill mb-2">Fridgie Pro</span>
              <h2 className="mt-3 mb-3">AI receipt scanning that actually works...</h2>
              <Row className="align-items-center">
                <Col md={6} className="mb-3">
                  <ul className="mb-0" style={{ lineHeight: 1.7 }}>
                    <li>High-accuracy extraction of items and quantities</li>
                    <li>Auto-categorization and pantry matching</li>
                    <li>Instant review with one-tap corrections</li>
                  </ul>
                  <div className="mt-3 d-flex flex-wrap gap-2">
                    <span className="feature-chip"><Cpu />Fast processing</span>
                    <span className="feature-chip"><Camera /> Fast capture</span>
                  </div>
                  <div className="mt-4">
                    <a href="#join" className="btn btn-light">Get early access</a>
                  </div>
                </Col>
                <Col md={6}>
                   <Image
                      src={pro_image}
                      alt="Fridgie Pro — receipt scanning preview"
                      fluid
                      style={{ maxHeight: 540, width: "100%", height: "auto", objectFit: "contain" }}
                    />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        {/* footer */}
        <Row className="footer">
          <Col xs={12} className="text-center">
            <small>(c) Fridgie 2025</small>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Welcome;
