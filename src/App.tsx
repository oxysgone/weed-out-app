import { useState } from "react";

const COLORS = {
  black: "#0a0a0a",
  darkGray: "#111111",
  cardBg: "#161616",
  green: "#22c55e",
  greenDark: "#16a34a",
  greenGlow: "#22c55e33",
  red: "#ef4444",
  redDark: "#dc2626",
  white: "#f5f5f5",
  muted: "#888888",
  border: "#2a2a2a",
};

const services = [
  { id: 1, icon: "🌿", name: "Lawn Mowing", desc: "Clean cuts, clean edges — every visit.", prices: { small: 20, medium: 40, large: 120 } },
  { id: 2, icon: "✂️", name: "Weed Whacking & Trimming", desc: "Borders, fences, tight spots — handled.", prices: { small: 15, medium: 25, large: 50 } },
  { id: 3, icon: "🍂", name: "Leaf Cleanup", desc: "Seasonal blowouts and full haul-away.", prices: { small: 10, medium: 20, large: 40 } },
  { id: 4, icon: "🪓", name: "Full Yard Cleanup", desc: "Overgrowth cleared, yard restored.", prices: { small: 60, medium: 120, large: 200 } },
];

const yardSizes = [
  { key: "small", label: "Small", sub: "Under 3,000 sq ft" },
  { key: "medium", label: "Medium", sub: "3,000–6,000 sq ft" },
  { key: "large", label: "Large", sub: "6,000+ sq ft" },
];

export default function WeedOutApp() {
  const [screen, setScreen] = useState("home");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [yardSize, setYardSize] = useState("medium");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [form, setForm] = useState({ name: "", address: "", phone: "", email: "", notes: "" });
  const [payMethod, setPayMethod] = useState("cash");
  const [menuOpen, setMenuOpen] = useState(false);

  const price = selectedService ? selectedService.prices[yardSize] : 0;
  const taxAmount = +(price * 0.1025).toFixed(2);
  const total = +(price + taxAmount).toFixed(2);

  const nav = (s: string) => { setScreen(s); setMenuOpen(false); };

  const sendBooking = async () => {
    try {
      await fetch("https://weedout-backend.onrender.com/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name || "Unknown",
          service: selectedService?.name || "Not selected",
          date: bookingDate || "TBD",
          time: bookingTime || "TBD",
          total: `$${total}`,
        }),
      });
    } catch (err) {
      console.error("Booking notification failed:", err);
    }
  };

  const inputStyle: any = {
    background: "#1e1e1e", border: `1px solid ${COLORS.border}`, borderRadius: 10,
    color: COLORS.white, padding: "12px 14px", fontSize: 14, width: "100%",
    outline: "none", boxSizing: "border-box", fontFamily: "inherit",
  };

  const btnPrimary: any = {
    background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.greenDark})`,
    color: "#000", fontWeight: 800, fontSize: 15, border: "none",
    borderRadius: 12, padding: "14px 0", width: "100%", cursor: "pointer", letterSpacing: 0.5,
  };

  const btnOutline: any = {
    background: "transparent", color: COLORS.green, fontWeight: 700, fontSize: 14,
    border: `1.5px solid ${COLORS.green}`, borderRadius: 12, padding: "12px 0",
    width: "100%", cursor: "pointer",
  };

  const card: any = {
    background: COLORS.cardBg, border: `1px solid ${COLORS.border}`,
    borderRadius: 16, padding: 16, marginBottom: 12,
  };

  return (
    <div style={{ background: COLORS.black, minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "20px 0", fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
      <div style={{ width: 390, minHeight: 780, background: COLORS.darkGray, borderRadius: 44, overflow: "hidden", boxShadow: "0 0 80px #22c55e22, 0 30px 80px #00000099", border: `2px solid ${COLORS.border}`, display: "flex", flexDirection: "column", position: "relative" }}>

        {/* Status bar */}
        <div style={{ background: "#0d0d0d", padding: "10px 24px 6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: COLORS.white, fontSize: 13, fontWeight: 700 }}>9:41</span>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ color: COLORS.white, fontSize: 11 }}>●●●</span>
            <span style={{ color: COLORS.white, fontSize: 11 }}>WiFi</span>
            <span style={{ color: COLORS.green, fontSize: 11 }}>⬛</span>
          </div>
        </div>

        {/* Header */}
        <div style={{ background: "#0d0d0d", padding: "10px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${COLORS.border}` }}>
          <div onClick={() => nav("home")} style={{ cursor: "pointer" }}>
            <span style={{ color: COLORS.green, fontWeight: 900, fontSize: 22, letterSpacing: -1 }}>Weed</span>
            <span style={{ color: COLORS.red, fontWeight: 900, fontSize: 22, letterSpacing: -1 }}>Out</span>
          </div>
          <div onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: 4, padding: 4 }}>
            {[0,1,2].map(i => <div key={i} style={{ width: 22, height: 2, background: menuOpen ? COLORS.green : COLORS.white, borderRadius: 2 }} />)}
          </div>
        </div>

        {menuOpen && (
          <div style={{ position: "absolute", top: 90, right: 20, background: "#1a1a1a", border: `1px solid ${COLORS.border}`, borderRadius: 14, zIndex: 100, minWidth: 180, boxShadow: "0 8px 32px #000a" }}>
            {[{ label: "Home", s: "home" }, { label: "Our Services", s: "services" }, { label: "Get a Quote", s: "quote" }, { label: "Book Now", s: "book" }, { label: "Contact Us", s: "contact" }].map(item => (
              <div key={item.s} onClick={() => nav(item.s)} style={{ padding: "13px 18px", color: COLORS.white, fontSize: 14, fontWeight: 600, cursor: "pointer", borderBottom: `1px solid ${COLORS.border}` }}>{item.label}</div>
            ))}
          </div>
        )}

        <div style={{ flex: 1, overflowY: "auto", padding: "0 0 80px" }}>

          {/* HOME */}
          {screen === "home" && (
            <div>
              <div style={{ background: "linear-gradient(160deg, #0d1f0d, #0a0a0a)", padding: "36px 24px 28px", textAlign: "center", borderBottom: `1px solid ${COLORS.border}` }}>
                <div style={{ fontSize: 52, marginBottom: 8 }}>🌿</div>
                <h1 style={{ color: COLORS.white, fontSize: 30, fontWeight: 900, margin: "0 0 6px", letterSpacing: -1 }}>Your yard,<br /><span style={{ color: COLORS.green }}>handled.</span></h1>
                <p style={{ color: COLORS.muted, fontSize: 14, margin: "0 0 24px", lineHeight: 1.6 }}>Chicago lawn care — mowing, trimming,<br />cleanup, and more. Fast. Reliable. Local.</p>
                <button onClick={() => nav("book")} style={{ ...btnPrimary, width: "auto", padding: "14px 32px", borderRadius: 50, fontSize: 15 }}>Book a Service</button>
              </div>
              <div style={{ display: "flex", padding: "16px 20px", gap: 10 }}>
                {[["4 Services", "Available"], ["Chicago", "Local Only"], ["Same Week", "Booking"]].map(([val, sub]) => (
                  <div key={val} style={{ flex: 1, background: COLORS.cardBg, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "12px 8px", textAlign: "center" }}>
                    <div style={{ color: COLORS.green, fontWeight: 800, fontSize: 14 }}>{val}</div>
                    <div style={{ color: COLORS.muted, fontSize: 11, marginTop: 2 }}>{sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "4px 20px" }}>
                <p style={{ color: COLORS.muted, fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>What We Do</p>
                {services.map(s => (
                  <div key={s.id} onClick={() => { setSelectedService(s); nav("services"); }} style={{ ...card, display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
                    <span style={{ fontSize: 28 }}>{s.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: COLORS.white, fontWeight: 700, fontSize: 14 }}>{s.name}</div>
                      <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 2 }}>{s.desc}</div>
                    </div>
                    <span style={{ color: COLORS.green, fontSize: 18 }}>›</span>
                  </div>
                ))}
              </div>
              <div style={{ margin: "12px 20px", background: `linear-gradient(135deg, ${COLORS.red}22, ${COLORS.red}11)`, border: `1px solid ${COLORS.red}44`, borderRadius: 16, padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: COLORS.white, fontWeight: 800, fontSize: 15 }}>Not sure what you need?</div>
                  <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 3 }}>Get a free quote in 60 seconds.</div>
                </div>
                <button onClick={() => nav("quote")} style={{ background: COLORS.red, color: "#fff", border: "none", borderRadius: 10, padding: "10px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Quote</button>
              </div>
            </div>
          )}

          {/* SERVICES */}
          {screen === "services" && (
            <div style={{ padding: "20px 20px" }}>
              <h2 style={{ color: COLORS.white, fontWeight: 900, fontSize: 22, margin: "0 0 4px" }}>Our Services</h2>
              <p style={{ color: COLORS.muted, fontSize: 13, margin: "0 0 20px" }}>Tap any service to book it directly.</p>
              {services.map(s => (
                <div key={s.id} style={{ ...card, cursor: "pointer" }} onClick={() => { setSelectedService(s); nav("book"); }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    <span style={{ fontSize: 32 }}>{s.icon}</span>
                    <div>
                      <div style={{ color: COLORS.white, fontWeight: 800, fontSize: 16 }}>{s.name}</div>
                      <div style={{ color: COLORS.muted, fontSize: 12 }}>{s.desc}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {yardSizes.map(y => (
                      <div key={y.key} style={{ flex: 1, background: "#1e1e1e", borderRadius: 10, padding: "8px 6px", textAlign: "center" }}>
                        <div style={{ color: COLORS.green, fontWeight: 800, fontSize: 15 }}>${s.prices[y.key as keyof typeof s.prices]}</div>
                        <div style={{ color: COLORS.muted, fontSize: 10, marginTop: 2 }}>{y.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 12 }}><button style={{ ...btnPrimary, fontSize: 13, padding: "11px 0" }}>Book This →</button></div>
                </div>
              ))}
            </div>
          )}

          {/* BOOK */}
          {screen === "book" && (
            <div style={{ padding: "20px 20px" }}>
              <h2 style={{ color: COLORS.white, fontWeight: 900, fontSize: 22, margin: "0 0 4px" }}>Book a Service</h2>
              <p style={{ color: COLORS.muted, fontSize: 13, margin: "0 0 20px" }}>Fill in the details and we'll confirm ASAP.</p>
              <p style={{ color: COLORS.muted, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Select Service</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                {services.map(s => (
                  <div key={s.id} onClick={() => setSelectedService(s)} style={{ ...card, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", border: selectedService?.id === s.id ? `1.5px solid ${COLORS.green}` : `1px solid ${COLORS.border}`, marginBottom: 0, padding: "12px 14px" }}>
                    <span style={{ fontSize: 22 }}>{s.icon}</span>
                    <div style={{ flex: 1, color: COLORS.white, fontWeight: 700, fontSize: 13 }}>{s.name}</div>
                    {selectedService?.id === s.id && <span style={{ color: COLORS.green, fontSize: 18 }}>✓</span>}
                  </div>
                ))}
              </div>
              <p style={{ color: COLORS.muted, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Yard Size</p>
              <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
                {yardSizes.map(y => (
                  <div key={y.key} onClick={() => setYardSize(y.key)} style={{ flex: 1, background: yardSize === y.key ? COLORS.greenGlow : "#1e1e1e", border: `1.5px solid ${yardSize === y.key ? COLORS.green : COLORS.border}`, borderRadius: 12, padding: "10px 6px", textAlign: "center", cursor: "pointer" }}>
                    <div style={{ color: yardSize === y.key ? COLORS.green : COLORS.white, fontWeight: 700, fontSize: 13 }}>{y.label}</div>
                    <div style={{ color: COLORS.muted, fontSize: 10, marginTop: 2 }}>{y.sub}</div>
                  </div>
                ))}
              </div>
              <p style={{ color: COLORS.muted, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Schedule</p>
              <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
                <input type="date" value={bookingDate} onChange={e => setBookingDate(e.target.value)} style={{ ...inputStyle, flex: 1 }} />
                <select value={bookingTime} onChange={e => setBookingTime(e.target.value)} style={{ ...inputStyle, flex: 1 }}>
                  <option value="">Time</option>
                  {["8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <p style={{ color: COLORS.muted, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Your Info</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
                {([["name","Full Name","text"],["address","Chicago Address","text"],["phone","Phone Number","tel"],["email","Email","email"]] as [string,string,string][]).map(([key, placeholder, type]) => (
                  <input key={key} type={type} placeholder={placeholder} value={form[key as keyof typeof form]} onChange={e => setForm({ ...form, [key]: e.target.value })} style={inputStyle} />
                ))}
                <textarea placeholder="Any notes for us?" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ ...inputStyle, minHeight: 70, resize: "none" }} />
              </div>
              <p style={{ color: COLORS.muted, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Payment Method</p>
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {([["cash","💵 Cash"],["venmo","💜 Venmo"],["zelle","💛 Zelle"],["card","💳 Card"]] as [string,string][]).map(([key, label]) => (
                  <div key={key} onClick={() => setPayMethod(key)} style={{ flex: 1, background: payMethod === key ? COLORS.greenGlow : "#1e1e1e", border: `1.5px solid ${payMethod === key ? COLORS.green : COLORS.border}`, borderRadius: 10, padding: "9px 4px", textAlign: "center", cursor: "pointer", fontSize: 11, fontWeight: 700, color: payMethod === key ? COLORS.green : COLORS.muted }}>{label}</div>
                ))}
              </div>
              {selectedService && (
                <div style={{ background: "#1a1a1a", border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "14px 16px", marginBottom: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", color: COLORS.muted, fontSize: 13, marginBottom: 6 }}>
                    <span>{selectedService.name} ({yardSizes.find(y=>y.key===yardSize)?.label})</span><span>${price}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: COLORS.muted, fontSize: 13, marginBottom: 8 }}>
                    <span>Chicago Tax (10.25%)</span><span>${taxAmount}</span>
                  </div>
                  <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 10, display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: COLORS.white, fontWeight: 800, fontSize: 15 }}>Total</span>
                    <span style={{ color: COLORS.green, fontWeight: 900, fontSize: 18 }}>${total}</span>
                  </div>
                </div>
              )}
              <button onClick={async () => { await sendBooking(); nav("confirm"); }} style={btnPrimary}>Confirm Booking →</button>
            </div>
          )}

          {/* QUOTE */}
          {screen === "quote" && (
            <div style={{ padding: "20px 20px" }}>
              <h2 style={{ color: COLORS.white, fontWeight: 900, fontSize: 22, margin: "0 0 4px" }}>Get a Quote</h2>
              <p style={{ color: COLORS.muted, fontSize: 13, margin: "0 0 20px" }}>Pick your service and yard size to see your price instantly.</p>
              <p style={{ color: COLORS.muted, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Service</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                {services.map(s => (
                  <div key={s.id} onClick={() => setSelectedService(s)} style={{ ...card, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", border: selectedService?.id === s.id ? `1.5px solid ${COLORS.green}` : `1px solid ${COLORS.border}`, marginBottom: 0, padding: "12px 14px" }}>
                    <span style={{ fontSize: 22 }}>{s.icon}</span>
                    <div style={{ flex: 1, color: COLORS.white, fontWeight: 700, fontSize: 13 }}>{s.name}</div>
                    {selectedService?.id === s.id && <span style={{ color: COLORS.green }}>✓</span>}
                  </div>
                ))}
              </div>
              <p style={{ color: COLORS.muted, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Yard Size</p>
              <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
                {yardSizes.map(y => (
                  <div key={y.key} onClick={() => setYardSize(y.key)} style={{ flex: 1, background: yardSize === y.key ? COLORS.greenGlow : "#1e1e1e", border: `1.5px solid ${yardSize === y.key ? COLORS.green : COLORS.border}`, borderRadius: 12, padding: "10px 6px", textAlign: "center", cursor: "pointer" }}>
                    <div style={{ color: yardSize === y.key ? COLORS.green : COLORS.white, fontWeight: 700, fontSize: 13 }}>{y.label}</div>
                    <div style={{ color: COLORS.muted, fontSize: 10, marginTop: 2 }}>{y.sub}</div>
                  </div>
                ))}
              </div>
              {selectedService ? (
                <div style={{ background: "linear-gradient(135deg, #0d1f0d, #161616)", border: `1.5px solid ${COLORS.green}`, borderRadius: 18, padding: "24px 20px", textAlign: "center", marginBottom: 20 }}>
                  <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 4 }}>{selectedService.name} · {yardSizes.find(y=>y.key===yardSize)?.label} yard</div>
                  <div style={{ color: COLORS.green, fontSize: 48, fontWeight: 900, letterSpacing: -2 }}>${price}</div>
                  <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 4 }}>+ ${taxAmount} Chicago tax = <span style={{ color: COLORS.white, fontWeight: 700 }}>${total} total</span></div>
                </div>
              ) : (
                <div style={{ background: "#1a1a1a", border: `1px dashed ${COLORS.border}`, borderRadius: 18, padding: "32px 20px", textAlign: "center", marginBottom: 20 }}>
                  <div style={{ color: COLORS.muted, fontSize: 14 }}>Select a service and yard size above to see your price.</div>
                </div>
              )}
              <button onClick={() => nav("book")} style={btnPrimary}>Book This Service →</button>
              <div style={{ height: 10 }} />
              <button onClick={() => nav("contact")} style={btnOutline}>Ask a Question Instead</button>
            </div>
          )}

          {/* CONTACT */}
          {screen === "contact" && (
            <div style={{ padding: "20px 20px" }}>
              <h2 style={{ color: COLORS.white, fontWeight: 900, fontSize: 22, margin: "0 0 4px" }}>Contact Us</h2>
              <p style={{ color: COLORS.muted, fontSize: 13, margin: "0 0 20px" }}>Got questions? We'll get back to you fast.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                {([["name","Your Name","text"],["email","Email Address","email"],["phone","Phone (optional)","tel"]] as [string,string,string][]).map(([key, placeholder, type]) => (
                  <input key={key} type={type} placeholder={placeholder} value={form[key as keyof typeof form]} onChange={e => setForm({ ...form, [key]: e.target.value })} style={inputStyle} />
                ))}
                <textarea placeholder="What's on your mind?" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ ...inputStyle, minHeight: 100, resize: "none" }} />
              </div>
              <button style={btnPrimary}>Send Message →</button>
              <div style={{ marginTop: 28 }}>
                <p style={{ color: COLORS.muted, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Reach Us Directly</p>
                {[{ icon: "📱", label: "Phone / Text", val: "(872) 370 6371" }, { icon: "📧", label: "Email", val: "bookings.weedout@gmail.com" }, { icon: "📍", label: "Area", val: "Chicago, IL & surrounding areas" }].map(item => (
                  <div key={item.label} style={{ ...card, display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
                    <span style={{ fontSize: 22 }}>{item.icon}</span>
                    <div>
                      <div style={{ color: COLORS.muted, fontSize: 11 }}>{item.label}</div>
                      <div style={{ color: COLORS.white, fontWeight: 600, fontSize: 13 }}>{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONFIRM */}
          {screen === "confirm" && (
            <div style={{ padding: "40px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
              <h2 style={{ color: COLORS.green, fontWeight: 900, fontSize: 26, margin: "0 0 10px" }}>Booking Received!</h2>
              <p style={{ color: COLORS.muted, fontSize: 14, lineHeight: 1.7, margin: "0 0 30px" }}>
                Thanks for booking with weedout! Your booking request has been submitted. We'll confirm your appointment shortly via text or email.
              </p>
              {selectedService && (
                <div style={{ background: COLORS.cardBg, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: "18px 20px", marginBottom: 24, textAlign: "left" }}>
                  <p style={{ color: COLORS.muted, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Booking Summary</p>
                  {([["Service", selectedService.name], ["Yard Size", yardSizes.find(y=>y.key===yardSize)?.label], ["Date", bookingDate || "TBD"], ["Time", bookingTime || "TBD"], ["Payment", payMethod.charAt(0).toUpperCase() + payMethod.slice(1)], ["Total", `$${total}`]] as [string,string][]).map(([label, val]) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ color: COLORS.muted, fontSize: 13 }}>{label}</span>
                      <span style={{ color: label === "Total" ? COLORS.green : COLORS.white, fontWeight: label === "Total" ? 800 : 600, fontSize: 13 }}>{val}</span>
                    </div>
                  ))}
                </div>
              )}
              <button onClick={() => nav("home")} style={btnPrimary}>Back to Home</button>
            </div>
          )}

        </div>

        {/* Bottom nav */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#0d0d0d", borderTop: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-around", padding: "10px 0 16px" }}>
          {[{ icon: "🏠", label: "Home", s: "home" }, { icon: "🌿", label: "Services", s: "services" }, { icon: "📋", label: "Quote", s: "quote" }, { icon: "📅", label: "Book", s: "book" }, { icon: "💬", label: "Contact", s: "contact" }].map(item => (
            <div key={item.s} onClick={() => nav(item.s)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer" }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: screen === item.s ? COLORS.green : COLORS.muted }}>{item.label}</span>
              {screen === item.s && <div style={{ width: 4, height: 4, borderRadius: "50%", background: COLORS.green }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}