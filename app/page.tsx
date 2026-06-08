"use client";

import { useState } from "react";

export default function Home() {
  const [cart, setCart] = useState<{ id: string; name: string; dosage: string; company: string; price: number; quantity: number }[]>([]);
  const [prescriptionUploaded, setPrescriptionUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [activeInfoMed, setActiveInfoMed] = useState<any | null>(null);
  
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  const myPhoneNumber = "07726124512"; 
  const myInstagram = "isup-w";

  const [selectedDosages, setSelectedDosages] = useState<{ [key: number]: string }>({
    1: "500mg", 2: "20mg", 3: "500mg", 4: "400mg", 5: "20mg"
  });

  const [selectedCompanies, setSelectedCompanies] = useState<{ [key: number]: string }>({
    1: "شركة جي إس كي (بريطاني)", 2: "شركة أسترازينيكا (الأصلي)", 3: "شركة غلوكال (بريطاني)", 
    4: "شركة أبوت (Abbott الأوربي)", 5: "شركة فايزر (الأمريكي الأصلي)"
  });

  const medicines = [
    { 
      id: 1, name: "بندول إكسترا (Panadol Extra)", category: "مسكن آلام وللمفاصل", icon: "💊",
      dosages: [
        { strength: "500mg", companies: [{ name: "شركة جي إس كي (بريطاني)", price: 4000 }, { name: "شركة تجاري (إماراتي)", price: 2500 }] },
        { strength: "1000mg ActiFast", companies: [{ name: "شركة جي إس كي (بريطاني الأصلي)", price: 6000 }] }
      ],
      uses: "صداع حاد، ألم أسنان، ألم العضلات، خافض حرارة.",
      warnings: "مرضى الكبد، ارتفاع ضغط الدم الشديد، الحساسية من الباراسيتامول.",
      frequency: "عند الحاجة (كل 6 إلى 8 ساعات).", foodNote: "يمكن أخذه مع أو بدون طعام.",
      pregnancy: "❌ يفضل تجنبه للحامل (لوجود الكافيين).", children: "❌ غير مناسب للأطفال دون عمر 12 سنة."
    },
    { 
      id: 2, name: "أوميبرازول (Omeprazole)", category: "المعدة والقولون", icon: "🧪",
      dosages: [
        { strength: "20mg", companies: [{ name: "شركة أسترازينيكا (الأصلي)", price: 16000 }, { name: "شركة رانباكسي", price: 5000 }] },
        { strength: "40mg", companies: [{ name: "شركة أسترازينيكا (الأصلي)", price: 24000 }] }
      ],
      uses: "حموضة المعدة، ارتجاع المريء، قرحة الاثني وعشري.",
      warnings: "الحساسية من مكونات الدواء، نقص المغنيسيوم الحاد بالدم.",
      frequency: "مرة واحدة يومياً صباحاً.", foodNote: "⚠️ يؤخذ قبل الأكل بنصف ساعة (على الريق).",
      pregnancy: "✅ آمن بشكل عام، لكن يستعمل للضرورة بعد استشارة الطبيب.", children: "❌ لا يعطى للأطفال إلا بأمر طبي مباشر."
    }
  ];

  const handleDosageChange = (medId: number, newDosage: string) => {
    setSelectedDosages(prev => ({ ...prev, [medId]: newDosage }));
    const med = medicines.find(m => m.id === medId);
    const dosageData = med?.dosages.find(d => d.strength === newDosage);
    if (dosageData && dosageData.companies.length > 0) {
      setSelectedCompanies(prev => ({ ...prev, [medId]: dosageData.companies[0].name }));
    }
  };

  const handleCompanyChange = (medId: number, companyName: string) => {
    setSelectedCompanies(prev => ({ ...prev, [medId]: companyName }));
  };

  const addToCart = (med: typeof medicines[0]) => {
    const currentDosage = selectedDosages[med.id] || med.dosages[0].strength;
    const dosageData = med.dosages.find(d => d.strength === currentDosage) || med.dosages[0];
    const currentCompanyName = selectedCompanies[med.id] || dosageData.companies[0].name;
    const companyData = dosageData.companies.find(c => c.name === currentCompanyName) || dosageData.companies[0];

    const cartItemId = `${med.id}-${currentDosage}-${companyData.name}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === cartItemId);
      if (existing) {
        return prevCart.map((item) => item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { id: cartItemId, name: med.name, dosage: currentDosage, company: companyData.name, price: companyData.price, quantity: 1 }];
    });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: "40px 20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#0f172a", minHeight: "100vh", color: "#f1f5f9" }} dir="rtl">
      
      {/* 🌟 الهيدر الاحترافي مع الإطار الملون بالكامل والشعارات الحقيقية */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#1e293b", padding: "15px 30px", borderRadius: "20px", border: "1px solid #334155", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)", marginBottom: "35px" }}>
        
        {/* أزرار التواصل والسلة */}
        <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
          <div style={{ backgroundColor: "#1e1b4b", color: "#818cf8", padding: "10px 20px", borderRadius: "14px", fontSize: "14px", fontWeight: "bold", border: "1px solid #312e81", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.4), 0 4px 6px rgba(0,0,0,0.2)" }}>
            🛒 السلة ({cart.reduce((a, b) => a + b.quantity, 0)})
          </div>

          {/* انستقرام عالي الدقة ثلاثي الأبعاد */}
          <a href={`https://instagram.com/${myInstagram}`} target="_blank" rel="noopener noreferrer" style={{ width: "42px", height: "42px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 16px rgba(0,0,0,0.4), inset 0 -2px 5px rgba(0,0,0,0.2)", transition: "all 0.2s ease", cursor: "pointer", backgroundColor: "#1e293b" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.15) translateY(-3px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1) translateY(0)"}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "50%" }} />
          </a>

          {/* واتساب عالي الدقة ثلاثي الأبعاد */}
          <a href={`https://wa.me/${"964" + myPhoneNumber.substring(1)}`} target="_blank" rel="noopener noreferrer" style={{ width: "42px", height: "42px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 16px rgba(0,0,0,0.4), inset 0 -2px 5px rgba(0,0,0,0.2)", transition: "all 0.2s ease", cursor: "pointer", backgroundColor: "#1e293b" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.15) translateY(-3px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1) translateY(0)"}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "50%" }} />
          </a>
        </div>
        
        {/* 🔥 الإطار الملون بالكامل لاسم الصيدلية بتنسيق لوني حاد وجذاب */}
        <div style={{ background: "linear-gradient(135deg, #ef4444 0%, #3b82f6 50%, #06b6d4 100%)", padding: "3px", borderRadius: "16px", boxShadow: "0 8px 20px rgba(239, 68, 68, 0.25)" }}>
          <div style={{ backgroundColor: "#111827", padding: "10px 24px", borderRadius: "13px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ color: "#ffffff", fontSize: "15px", fontWeight: "600", letterSpacing: "0.5px" }}>خيارك الموثوق</span>
            <span style={{ color: "#4b5563", fontSize: "18px" }}>|</span>
            <h1 style={{ color: "#850000", margin: 0, fontSize: "24px", fontWeight: "900", fontFamily: "'Arial Black', sans-serif", textShadow: "0px 2px 4px rgba(0,0,0,0.8)" }}>
              Astro Pharmacy
            </h1>
            <span style={{ fontSize: "18px" }}>✨</span>
          </div>
        </div>
      </div>

      {/* بنر ترحيبي جذاب بتأثير نيون عميق */}
      <div style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #311042 100%)", color: "white", padding: "45px 30px", borderRadius: "24px", marginBottom: "40px", textAlign: "center", border: "1px solid #3b82f6", boxShadow: "0 20px 40px -10px rgba(49, 130, 206, 0.3)" }}>
        <h2 style={{ fontSize: "32px", margin: "0 0 12px 0", fontWeight: "800", textShadow: "0 4px 10px rgba(0,0,0,0.3)" }}>موقع صيدلية أسترو الإلكتروني</h2>
        <p style={{ fontSize: "16px", color: "#cbd5e1", margin: 0, fontWeight: "400" }}>تصفح العلاجات الطبية، اختر الجرعة والشركة المصنعة واضغط على زر الـ ℹ️ لمعرفة تفاصيل الدواء قبل الشراء.</p>
      </div>

      {/* قسم رفع الوصرة الطبية الـ 3D */}
      <div style={{ backgroundColor: "#1e293b", padding: "30px", borderRadius: "24px", border: "2px dashed #3b82f6", boxShadow: "0 15px 30px rgba(0,0,0,0.25)", marginBottom: "40px", textAlign: "center" }}>
        <div style={{ fontSize: "40px", marginBottom: "10px" }}>📄</div>
        <h3 style={{ margin: "0 0 8px 0", color: "#60a5fa", fontSize: "21px", fontWeight: "700" }}>عندك وصفة طبيب؟ ارفعها هسة</h3>
        <p style={{ color: "#94a3b8", marginBottom: "20px", fontSize: "14px" }}>ارفع صورة الوصفة الطبية ليقوم الصيدلي الخفير بتجهيزها لك فوراً</p>
        
        <label style={{ display: "inline-block", background: "linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)", color: "white", padding: "14px 30px", borderRadius: "14px", cursor: "pointer", fontWeight: "bold", borderBottom: "4px solid #1e40af", boxShadow: "0 8px 16px rgba(29, 78, 216, 0.3)", transition: "all 0.1s ease" }} onMouseDown={(e) => { e.currentTarget.style.transform = "translateY(3px)"; e.currentTarget.style.borderBottom = "1px solid #1e40af"; }} onMouseUp={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderBottom = "4px solid #1e40af"; }}>
          📁 اختر ملف الوصفة من جهازك
          <input type="file" onChange={(e) => { if(e.target.files?.[0]) { setFileName(e.target.files[0].name); setPrescriptionUploaded(true); } }} style={{ display: "none" }} />
        </label>
        {prescriptionUploaded && <div style={{ marginTop: "20px", display: "block", color: "#4ade80", fontWeight: "bold" }}>✓ تم رفع الملف: {fileName}</div>}
      </div>

      {/* محتوى شبكة عرض كروت الأدوية ثلاثية الأبعاد */}
      <div style={{ display: "grid", gridTemplateColumns: "2.3fr 1fr", gap: "35px" }}>
        <div>
          <h3 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "25px", color: "#f8fafc", borderRight: "5px solid #06b6d4", paddingRight: "12px" }}>
            الأدوية والمستلزمات الطبية
          </h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
            {medicines.map((med) => {
              const currentDosage = selectedDosages[med.id] || med.dosages[0].strength;
              const dosageData = med.dosages.find(d => d.strength === currentDosage) || med.dosages[0];
              const currentCompanyName = selectedCompanies[med.id] || dosageData.companies[0].name;
              let companyData = dosageData.companies.find(c => c.name === currentCompanyName) || dosageData.companies[0];

              return (
                /* كارت الدواء بتأثير مجسم قوي 3D Border & Shadow */
                <div key={med.id} style={{ backgroundColor: "#1e293b", padding: "24px", borderRadius: "20px", border: "1px solid #475569", borderBottom: "5px solid #334155", boxShadow: "0 12px 24px -4px rgba(0, 0, 0, 0.4)", display: "flex", flexDirection: "column", justifyContent: "space-between", transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)", cursor: "pointer" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 20px 32px -4px rgba(0, 0, 0, 0.6)"; e.currentTarget.style.borderColor = "#06b6d4"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 12px 24px -4px rgba(0, 0, 0, 0.4)"; e.currentTarget.style.borderColor = "#475569"; }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                      <span style={{ fontSize: "36px", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}>{med.icon}</span>
                      <button onClick={() => setActiveInfoMed({ ...med, currentDosage, selectedCompany: companyData })} style={{ backgroundColor: "#334155", color: "#38bdf8", border: "none", borderRadius: "50%", width: "36px", height: "36px", cursor: "pointer", fontWeight: "bold", boxShadow: "0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.1)" }}>ℹ️</button>
                    </div>
                    <span style={{ fontSize: "11px", backgroundColor: "#0f172a", color: "#38bdf8", padding: "4px 12px", borderRadius: "30px", fontWeight: "600", border: "1px solid #1e293b" }}>{med.category}</span>
                    <h4 style={{ margin: "14px 0 6px 0", fontSize: "18px", fontWeight: "700", color: "#f8fafc" }}>{med.name}</h4>
                    
                    <div style={{ marginBottom: "12px", marginTop: "12px" }}>
                      <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "6px", fontWeight: "bold" }}>اختر الجرعة / التركيز:</label>
                      <select value={currentDosage} onChange={(e) => handleDosageChange(med.id, e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #475569", backgroundColor: "#0f172a", color: "white", outline: "none", cursor: "pointer" }}>
                        {med.dosages.map((d, i) => <option key={i} value={d.strength}>{d.strength}</option>)}
                      </select>
                    </div>

                    <div style={{ marginBottom: "12px" }}>
                      <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "6px", fontWeight: "bold" }}>اختر الشركة المصنعة:</label>
                      <select value={companyData.name} onChange={(e) => handleCompanyChange(med.id, e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #475569", backgroundColor: "#0f172a", color: "white", outline: "none", cursor: "pointer" }}>
                        {dosageData.companies.map((c, i) => <option key={i} value={c.name}>{c.name} ({c.price.toLocaleString()} د.ع)</option>)}
                      </select>
                    </div>
                  </div>

                  {/* السعر وزر الإضافة المجسم 3D Button */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px", paddingTop: "15px", borderTop: "1px solid #334155" }}>
                    <span style={{ color: "#38bdf8", fontWeight: "800", fontSize: "20px" }}>{companyData.price.toLocaleString()} د.ع</span>
                    <button onClick={() => addToCart(med)} style={{ background: "linear-gradient(180deg, #06b6d4 0%, #0891b2 100%)", color: "white", border: "none", padding: "10px 20px", borderRadius: "12px", cursor: "pointer", fontWeight: "bold", borderBottom: "4px solid #047857", boxShadow: "0 6px 12px rgba(6, 182, 212, 0.2)", transition: "all 0.1s ease" }} onMouseDown={(e) => { e.currentTarget.style.transform = "translateY(2px)"; e.currentTarget.style.borderBottom = "1px solid #047857"; }} onMouseUp={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderBottom = "4px solid #047857"; }}>+ السلة</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* جانب السلة المالي ثلاثي الأبعاد والملون بالكامل */}
        <div style={{ backgroundColor: "#1e293b", padding: "25px", borderRadius: "24px", border: "1px solid #475569", borderBottom: "6px solid #334155", boxShadow: "0 15px 30px rgba(0,0,0,0.3)", height: "fit-content", position: "sticky", top: "20px" }}>
          <h3 style={{ margin: "0 0 20px 0", borderBottom: "2px solid #334155", paddingBottom: "12px", color: "#f1f5f9", fontSize: "19px", fontWeight: "700" }}>🛍️ تفاصيل الفاتورة</h3>
          {cart.length === 0 ? (
            <p style={{ textAlign: "center", color: "#64748b", fontSize: "14px", padding: "20px 0" }}>السلة فارغة حالياً.</p>
          ) : (
            <div>
              {cart.map((item, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", fontSize: "13px", borderBottom: "1px dashed #334155" }}>
                  <div>
                    <strong style={{ color: "#f8fafc" }}>{item.name}</strong>
                    <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>العدد: {item.quantity} | الجرعة: {item.dosage}</div>
                  </div>
                  <span style={{ fontWeight: "700", color: "#38bdf8" }}>{(item.price * item.quantity).toLocaleString()} د.ع</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", marginTop: "20px", fontSize: "17px", color: "#f1f5f9" }}>
                <span>المجموع الكلي:</span>
                <span style={{ color: "#22c55e", fontSize: "20px" }}>{totalPrice.toLocaleString()} د.ع</span>
              </div>
              <button onClick={() => setIsCheckoutOpen(true)} style={{ width: "100%", background: "linear-gradient(180deg, #22c55e 0%, #16a34a 100%)", color: "white", border: "none", padding: "14px", borderRadius: "14px", marginTop: "20px", cursor: "pointer", fontWeight: "bold", fontSize: "15px", borderBottom: "4px solid #14532d", boxShadow: "0 8px 16px rgba(34, 197, 94, 0.2)" }}>تأكيد الطلب الفوري ✓</button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
