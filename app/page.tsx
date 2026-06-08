"use client";

import { useState } from "react";

export default function Home() {
  const [cart, setCart] = useState<{ id: string; name: string; dosage: string; company: string; price: number; quantity: number }[]>([]);
  const [prescriptionUploaded, setPrescriptionUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [activeInfoMed, setActiveInfoMed] = useState<any | null>(null);
  
  // حالات الدفع والطلب
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  // بيانات الاتصال الرسمية الخاصة بك
  const myPhoneNumber = "07726124512"; 
  const myInstagram = "isup-w";

  const [selectedDosages, setSelectedDosages] = useState<{ [key: number]: string }>({
    1: "500mg", 2: "20mg", 3: "500mg", 4: "400mg", 5: "20mg", 
    6: "5mg", 7: "850mg", 8: "50000 IU", 9: "75mg", 10: "100mcg"
  });

  const [selectedCompanies, setSelectedCompanies] = useState<{ [key: number]: string }>({
    1: "شركة جي إس كي (بريطاني)", 2: "شركة أسترازينيكا (الأصلي)", 3: "شركة غلوكال (بريطاني)", 
    4: "شركة أبوت (Abbott الأوربي)", 5: "شركة فايزر (الأمريكي الأصلي)", 6: "شركة ميرك (الألماني الأصلي)", 
    7: "شركة ميرك (الأصلي)", 8: "شركة يوروفيت (أوربي)", 9: "شركة سانوفي (الأصلي)", 10: "شركة جي إس كي (بريطاني)"
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
        { strength: "20mg", companies: [{ name: "شركة أسترازينيكا (الأصلي)", price: 16000 }, { name: "شركة رانباكسي", price: 5000 }, { name: "شركة سامراء (إنتاج محلي)", price: 2000 }] },
        { strength: "40mg", companies: [{ name: "شركة أسترازينيكا (الأصلي)", price: 24000 }, { name: "شركة رانباكسي", price: 7500 }] }
      ],
      uses: "حموضة المعدة، ارتجاع المريء، قرحة الاثني عشري.",
      warnings: "الحساسية من مكونات الدواء، نقص المغنيسيوم الحاد بالدم.",
      frequency: "مرة واحدة يومياً صباحاً.", foodNote: "⚠️ يؤخذ قبل الأكل بنصف ساعة (على الريق).",
      pregnancy: "✅ آمن بشكل عام، لكن يستعمل للضرورة بعد استشارة الطبيب.", children: "❌ لا يعطى للأطفال إلا بأمر طبي مباشر."
    },
    { 
      id: 3, name: "أموكسيسيلين (Amoxicillin)", category: "مضاد حيوي", icon: "🧬",
      dosages: [
        { strength: "500mg", companies: [{ name: "شركة غلوكال (بريطاني)", price: 6500 }, { name: "شركة جلفار (خليجي)", price: 4000 }] },
        { strength: "250mg", companies: [{ name: "شركة جلفار (خليجي)", price: 2500 }, { name: "شركة سامراء SDI", price: 1250 }] }
      ],
      uses: "التهاب البلعوم واللوزتين، التهابات الأذن الوسطى والجيوب الأنفية.",
      warnings: "❌ ممنوع تماماً لمرضى حساسية البنسلين.",
      frequency: "3 مرات باليوم (كل 8 ساعات).", foodNote: "يفضل أخذه بعد الأكل لتجنب إزعاج المعدة.",
      pregnancy: "✅ آمن للحامل (صنف B) تحت إشراف طبي.", children: "✅ يرهم للأطفال (لكن بجرعة شراب تحسب حسب الوزن)."
    },
    { 
      id: 4, name: "بروفين (Brufen / Ibuprofen)", category: "مسكن ومضاد للالتهاب", icon: "🟠",
      dosages: [
        { strength: "400mg", companies: [{ name: "شركة أبوت (Abbott الأوربي)", price: 5000 }, { name: "شركة تجاري أردني", price: 2500 }] },
        { strength: "600mg", companies: [{ name: "شركة أبوت (Abbott الأوربي)", price: 7500 }, { name: "شركة سامراء عبوة اقتصادية", price: 2000 }] }
      ],
      uses: "مسكن لألم الأسنان، ألم المفاصل، آلام الدورة الشهرية.",
      warnings: "❌ مرضى قرحة المعدة النشطة، مرضى الكلى، ومرضى الربو.",
      frequency: "2 إلى 3 مرات باليوم عند الحاجة.", foodNote: "⚠️ يجب أخذه بعد الأكل مباشرة لحماية جدار المعدة.",
      pregnancy: "❌ ممنوع تماماً في الأشهر الأخيرة من الحمل.", children: "❌ هذه الجرعة للبالغين فقط."
    },
    { 
      id: 5, name: "ليبيتور (Lipitor)", category: "أدوية الدهون والكوليسترول", icon: "💎",
      dosages: [
        { strength: "20mg", companies: [{ name: "شركة فايزر (الأمريكي الأصلي)", price: 24000 }, { name: "شركة تجاري هندي", price: 8000 }] },
        { strength: "40mg", companies: [{ name: "شركة فايزر (الأمريكي الأصلي)", price: 35000 }, { name: "شركة العوالي", price: 11000 }] }
      ],
      uses: "خافض للكوليسترول الضار والدهون الثلاثية وحماية من الجلطات.",
      warnings: "مرضى الكبد النشط، الحوامل، والنساء اللواتي يخططن للحمل.",
      frequency: "مرة واحدة يومياً (يفضل ليلاً قبل النوم).", foodNote: "يمكن أخذه مع أو بدون طعام.",
      pregnancy: "❌ ممنوع منعاً باتاً للحامل ويسبب تشوهات للجنين.", children: "❌ لا يستخدم للأطفال إلا في حالات جينية خاصة."
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

  const clearCart = () => {
    setCart([]);
    setPaymentSuccess(false);
  };
  
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const sendWhatsAppNotification = () => {
    const formattedNumber = "964" + myPhoneNumber.substring(1); 
    let message = `مرحباً صيدلية أسترو، أود تأكيد طلبي الجديد بقيمة (${totalPrice.toLocaleString()} د.ع):\n\n`;
    
    cart.forEach((item, index) => {
      message += `${index + 1}. 💊 ${item.name}\n   - الجرعة: ${item.dosage}\n   - الشركة: ${item.company}\n   - العدد: ${item.quantity}\n\n`;
    });
    
    message += `طريقة الدفع المختارة: ${paymentMethod === "zaincash" ? "زين كاش 📱" : paymentMethod === "visa_master" ? "بطاقة إلكترونية (فيزا/ماستر) 💳" : "عند الاستلام 📍"}`;
    
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCheckoutSubmit = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      sendWhatsAppNotification();
      setIsCheckoutOpen(false);
      setCart([]);
    }, 2000);
  };

  return (
    <div style={{ padding: "40px 20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f4f7fa", minHeight: "100vh", color: "#2d3748" }} dir="rtl">
      
      {/* الهيدر العلوي - يحتوي على أزرار وشعارات الانستا والواتس الحقيقية */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white", padding: "15px 30px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", marginBottom: "35px" }}>
        
        {/* أزرار السوشيال ميديا الحقيقية بجانب عدد عناصر السلة */}
        <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
          <div style={{ backgroundColor: "#ebf8ff", color: "#2b6cb0", padding: "8px 18px", borderRadius: "30px", fontSize: "14px", fontWeight: "bold", border: "1px solid #bee3f8" }}>
            🛒 السلة ({cart.reduce((a, b) => a + b.quantity, 0)})
          </div>

          {/* زر إنستغرام يحمل الشعار الملون الرسمي مباشرة */}
          <a 
            href={`https://instagram.com/${myInstagram}`} 
            target="_blank" 
            rel="noopener noreferrer"
            title="تابعنا على إنستغرام"
            style={{ 
              width: "42px", 
              height: "42px", 
              borderRadius: "50%", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "pointer",
              backgroundColor: "#fff"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.15)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
            }}
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" 
              alt="Instagram" 
              style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "50%" }}
            />
          </a>

          {/* زر واتساب يحمل الشعار الأخضر الدائري الرسمي مباشرة */}
          <a 
            href={`https://wa.me/${"964" + myPhoneNumber.substring(1)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            title="راسلنا عبر واتساب"
            style={{ 
              width: "42px", 
              height: "42px", 
              borderRadius: "50%", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "pointer",
              backgroundColor: "#fff"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.15)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
            }}
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
              alt="WhatsApp" 
              style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "50%" }}
            />
          </a>
        </div>
        
        <h1 style={{ color: "#3182ce", margin: 0, fontSize: "24px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "#4a5568", fontSize: "16px", fontWeight: "normal" }}>خيارك الموثوق</span>
          <span style={{ color: "#cbd5e0", fontSize: "18px", fontWeight: "normal" }}>|</span>
          <span style={{ color: "#3182ce", fontWeight: "800", fontFamily: "sans-serif" }}>Astro Pharmacy</span>
          <span>✨</span>
        </h1>
      </div>

      {/* البنر الترحيبي */}
      <div style={{ background: "linear-gradient(135deg, #3182ce 0%, #2b3748 100%)", color: "white", padding: "45px 30px", borderRadius: "24px", marginBottom: "40px", textAlign: "center", boxShadow: "0 10px 15px -3px rgba(49,130,206,0.2)" }}>
        <h2 style={{ fontSize: "34px", margin: "0 0 12px 0", fontWeight: "800" }}>موقع صيدلية أسترو الإلكتروني</h2>
        <p style={{ fontSize: "17px", opacity: 0.9, margin: 0, fontWeight: "300" }}>تصفح العلاجات الطبية، اختر الجرعة والشركة المصنعة واضغط على زر الـ ℹ️ لمعرفة تفاصيل الدواء قبل الشراء.</p>
      </div>

      {/* قسم رفع الوصفة الطبية */}
      <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "20px", border: "2px dashed #3182ce", marginBottom: "40px", textAlign: "center" }}>
        <div style={{ fontSize: "40px", marginBottom: "10px" }}>📄</div>
        <h3 style={{ margin: "0 0 8px 0", color: "#2b6cb0", fontSize: "21px", fontWeight: "700" }}>عندك وصفة طبيب؟ ارفعها هسة</h3>
        <p style={{ color: "#718096", marginBottom: "20px", fontSize: "14px" }}>ارفع صورة الوصفة الطبية ليقوم الصيدلي الخفير بتجهيزها لك فوراً</p>
        
        <label style={{ display: "inline-block", backgroundColor: "#3182ce", color: "white", padding: "12px 25px", borderRadius: "12px", cursor: "pointer", fontWeight: "bold" }}>
          📁 اختر ملف الوصفة من جهازك
          <input type="file" onChange={(e) => {
            if(e.target.files?.[0]) {
              setFileName(e.target.files[0].name);
              setPrescriptionUploaded(true);
            }
          }} style={{ display: "none" }} />
        </label>

        {prescriptionUploaded && (
          <div style={{ marginTop: "20px", padding: "12px 20px", backgroundColor: "#c6f6d5", color: "#22543d", borderRadius: "10px", fontWeight: "600", display: "inline-block", border: "1px solid #98e6b1", fontSize: "14px" }}>
            ✓ تم رفع وصفة الطبيب بنجاح: {fileName}
          </div>
        )}
      </div>

      {/* شبكة العرض الرئيسية */}
      <div style={{ display: "grid", gridTemplateColumns: "2.3fr 1fr", gap: "35px" }}>
        
        {/* قسم كروت الأدوية */}
        <div>
          <h3 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "20px", color: "#2d3748", borderRight: "5px solid #319795", paddingRight: "12px" }}>
            الأدوية والمستلزمات الطبية
          </h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {medicines.map((med) => {
              const currentDosage = selectedDosages[med.id] || med.dosages[0].strength;
              const dosageData = med.dosages.find(d => d.strength === currentDosage) || med.dosages[0];
              const currentCompanyName = selectedCompanies[med.id] || dosageData.companies[0].name;
              let companyData = dosageData.companies.find(c => c.name === currentCompanyName) || dosageData.companies[0];

              return (
                <div key={med.id} style={{ backgroundColor: "white", padding: "20px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <span style={{ fontSize: "32px" }}>{med.icon}</span>
                      <button 
                        onClick={() => setActiveInfoMed({ ...med, currentDosage, selectedCompany: companyData })}
                        style={{ backgroundColor: "#ebf8ff", color: "#2b6cb0", border: "1px solid #bee3f8", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontWeight: "bold", fontSize: "16px" }}
                      >
                        ℹ️
                      </button>
                    </div>
                    
                    <span style={{ fontSize: "11px", backgroundColor: "#f7fafc", color: "#4a5568", padding: "3px 10px", borderRadius: "30px", fontWeight: "600", border: "1px solid #e2e8f0" }}>
                      {med.category}
                    </span>
                    
                    <h4 style={{ margin: "10px 0 4px 0", fontSize: "17px", fontWeight: "700", color: "#1a202c" }}>{med.name}</h4>
                    
                    <div style={{ marginBottom: "10px", marginTop: "10px" }}>
                      <label style={{ display: "block", fontSize: "12px", color: "#4a5568", marginBottom: "4px", fontWeight: "bold" }}>اختر الجرعة / التركيز:</label>
                      <select 
                        value={currentDosage}
                        onChange={(e) => handleDosageChange(med.id, e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #cbd5e0", fontSize: "13px", backgroundColor: "#fff", cursor: "pointer", color: "#2d3748", outline: "none" }}
                      >
                        {med.dosages.map((d, index) => (
                          <option key={index} value={d.strength}>{d.strength}</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <label style={{ display: "block", fontSize: "12px", color: "#4a5568", marginBottom: "4px", fontWeight: "bold" }}>اختر الشركة المصنعة:</label>
                      <select 
                        value={companyData.name} 
                        onChange={(e) => handleCompanyChange(med.id, e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #cbd5e0", fontSize: "13px", backgroundColor: "#fff", cursor: "pointer", color: "#2d3748", outline: "none" }}
                      >
                        {dosageData.companies.map((company, index) => (
                          <option key={index} value={company.name}>
                            {company.name} ({company.price.toLocaleString()} د.ع)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px", paddingTop: "12px", borderTop: "1px solid #edf2f7" }}>
                    <span style={{ color: "#2b6cb0", fontWeight: "800", fontSize: "19px" }}>
                      {companyData.price.toLocaleString()} <span style={{ fontSize: "13px", fontWeight: "normal" }}>د.ع</span>
                    </span>
                    <button onClick={() => addToCart(med)} style={{ backgroundColor: "#319795", color: "white", border: "none", padding: "8px 15px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold", fontSize: "13px" }}>
                      + السلة
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* سلة المشتريات وتفاصيل الفاتورة */}
        <div style={{ backgroundColor: "white", padding: "25px", borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.04)", height: "fit-content", position: "sticky", top: "20px" }}>
          <h3 style={{ margin: "0 0 20px 0", borderBottom: "2px solid #edf2f7", paddingBottom: "12px", color: "#2d3748", fontSize: "19px", fontWeight: "700" }}>
            🛍️ تفاصيل الفاتورة
          </h3>
          
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "30px 0", color: "#a0aec0" }}>
              <p style={{ fontSize: "40px", margin: "0 0 10px 0" }}>📥</p>
              <p style={{ fontSize: "14px", margin: 0 }}>السلة فارغة حالياً.</p>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: "20px" }}>
                {cart.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", fontSize: "13px", borderBottom: "1px dashed #e2e8f0" }}>
                    <div>
                      <div style={{ fontWeight: "600", color: "#2d3748" }}>{item.name}</div>
                      <div style={{ fontSize: "11px", color: "#e53e3e", fontWeight: "bold" }}>الجرعة: {item.dosage}</div>
                      <div style={{ fontSize: "11px", color: "#319795", fontWeight: "600" }}>الشركة: {item.company}</div>
                      <div style={{ fontSize: "11px", color: "#718096" }}>العدد: {item.quantity}</div>
                    </div>
                    <span style={{ fontWeight: "700", color: "#2b6cb0" }}>{(item.price * item.quantity).toLocaleString()} د.ع</span>
                  </div>
                ))}
              </div>
              
              {/* قسم خيارات الدفع */}
              <div style={{ marginTop: "15px", padding: "12px", backgroundColor: "#f7fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "bold", color: "#4a5568", marginBottom: "8px" }}>💳 طريقة الدفع:</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                    <input type="radio" name="payment" value="cash" checked={paymentMethod === "cash"} onChange={(e) => setPaymentMethod(e.target.value)} />
                    النقد الفوري (عند الاستلام)
                  </label>
                  <label style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                    <input type="radio" name="payment" value="zaincash" checked={paymentMethod === "zaincash"} onChange={(e) => setPaymentMethod(e.target.value)} />
                    زين كاش (Zain Cash)
                  </label>
                  <label style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                    <input type="radio" name="payment" value="visa_master" checked={paymentMethod === "visa_master"} onChange={(e) => setPaymentMethod(e.target.value)} />
                    بطاقة إلكترونية (فيزا / ماستر كارد)
                  </label>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", fontSize: "17px", marginTop: "20px", paddingTop: "15px", borderTop: "2px solid #edf2f7", color: "#1a202c" }}>
                <span>المجموع الكلي:</span>
                <span style={{ color: "#319795", fontSize: "20px" }}>{totalPrice.toLocaleString()} د.ع</span>
              </div>
              
              <div style={{ display: "flex", gap: "10px", marginTop: "25px" }}>
                <button onClick={clearCart} style={{ flex: 1, backgroundColor: "#fff5f5", color: "#e53e3e", border: "1px solid #fed7d7", padding: "10px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold", fontSize: "13px" }}>
                  تفريغ
                </button>
                <button onClick={() => setIsCheckoutOpen(true)} style={{ flex: 2, backgroundColor: "#38a169", color: "white", border: "none", padding: "10px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold", fontSize: "14px" }}>
                  تأكيد الطلب ✓
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* 💳 نافذة الدفع المربوطة بالكامل بالواتساب والرقم الخاص بك */}
      {isCheckoutOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1100, padding: "20px" }}>
          <div style={{ backgroundColor: "white", borderRadius: "24px", maxWidth: "480px", width: "100%", padding: "30px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", position: "relative" }}>
            
            <button onClick={() => setIsCheckoutOpen(false)} style={{ position: "absolute", top: "20px", left: "20px", border: "none", backgroundColor: "#edf2f7", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", fontWeight: "bold" }}>✕</button>

            <h3 style={{ margin: "0 0 15px 0", color: "#2b6cb0", fontSize: "20px", fontWeight: "bold" }}>🔐 إكمال عملية الدفع الآمنة</h3>
            <p style={{ fontSize: "14px", color: "#4a5568", marginBottom: "20px" }}>المبلغ المطلوب دفعه: <strong style={{ color: "#319795", fontSize: "16px" }}>{totalPrice.toLocaleString()} د.ع</strong></p>

            {paymentSuccess ? (
              <div style={{ backgroundColor: "#f0fff4", border: "1px solid #c6f6d5", padding: "20px", borderRadius: "16px", textAlign: "center" }}>
                <span style={{ fontSize: "40px" }}>🎉</span>
                <h4 style={{ color: "#22543d", margin: "10px 0 5px 0" }}>تم تسجيل طلبك بنجاح!</h4>
                <p style={{ color: "#2f855a", fontSize: "13px", marginBottom: "15px" }}>جاري فتح تطبيق الواتساب لإرسال تفاصيل الفاتورة لتجهيزها فوراً...</p>
              </div>
            ) : (
              <div>
                {/* واجهة تحويل زين كاش */}
                {paymentMethod === "zaincash" && (
                  <div style={{ border: "1px solid #ecc94b", backgroundColor: "#fffff0", padding: "15px", borderRadius: "14px", marginBottom: "20px" }}>
                    <div style={{ fontWeight: "bold", color: "#b7791f", marginBottom: "8px", fontSize: "14px" }}>📱 بوابة تحويل Zain Cash:</div>
                    <p style={{ margin: "0 0 10px 0", fontSize: "13px", color: "#744210" }}>يرجى تحويل مبلغ الفاتورة إلى محفظة الصيدلية المعتمدة:</p>
                    <div style={{ backgroundColor: "white", padding: "10px", borderRadius: "8px", textAlign: "center", border: "1px solid #e2e8f0", fontSize: "18px", fontWeight: "bold", color: "#2d3748", letterSpacing: "1px" }}>
                      {myPhoneNumber} 📞
                    </div>
                    <p style={{ margin: "10px 0 0 0", fontSize: "11px", color: "#a0aec0" }}>* عند ضغط الزر بالأسفل، سيفتح الواتساب تلقائياً لإرسال تأكيد التحويل المباشر للصيدلية.</p>
                  </div>
                )}

                {/* واجهة الفيزا والماستر كارد */}
                {paymentMethod === "visa_master" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>رقم البطاقة (Card Number):</label>
                      <input type="text" placeholder="xxxx xxxx xxxx xxxx" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e0", fontSize: "14px" }} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>تاريخ الانتهاء:</label>
                        <input type="text" placeholder="MM/YY" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e0", fontSize: "14px", textAlign: "center" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>الرمز السري (CVC):</label>
                        <input type="password" placeholder="***" maxLength={3} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e0", fontSize: "14px", textAlign: "center" }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* واجهة النقد */}
                {paymentMethod === "cash" && (
                  <p style={{ fontSize: "14px", color: "#718096", backgroundColor: "#f7fafc", padding: "15px", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "20px" }}>
                    📍 دفع الفاتورة كاش عند الاستلام، وعند الضغط بالأسفل ستقوم بإرسال نسخة من طلبك للصيدلية عبر الواتساب لتجهيزه وتوصيله.
                  </p>
                )}

                <button onClick={handleCheckoutSubmit} style={{ width: "100%", backgroundColor: "#38a169", color: "white", border: "none", padding: "12px", borderRadius: "12px", cursor: "pointer", fontWeight: "bold", fontSize: "15px" }}>
                  {paymentMethod === "cash" ? "تأكيد وإرسال عبر الواتساب" : "إتمام الدفع والإرسال"}
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* نافذة تفاصيل الدواء المنبثقة ℹ️ */}
      {activeInfoMed && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" }}>
          <div style={{ backgroundColor: "white", borderRadius: "24px", maxWidth: "600px", width: "100%", padding: "30px", border: "1px solid #e2e8f0", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", position: "relative", maxHeight: "90vh", overflowY: "auto" }}>
            <button onClick={() => setActiveInfoMed(null)} style={{ position: "absolute", top: "20px", left: "20px", border: "none", backgroundColor: "#edf2f7", width: "35px", height: "35px", borderRadius: "50%", cursor: "pointer", fontSize: "16px", fontWeight: "bold", color: "#4a5568" }}>✕</button>

            <div style={{ display: "flex", gap: "15px", alignItems: "center", borderBottom: "2px solid #edf2f7", paddingBottom: "15px", marginBottom: "20px" }}>
              <span style={{ fontSize: "40px" }}>{activeInfoMed.icon}</span>
              <div>
                <h3 style={{ margin: "0 0 5px 0", fontSize: "21px", fontWeight: "800", color: "#2b6cb0" }}>{activeInfoMed.name}</h3>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "12px", backgroundColor: "#ebf8ff", color: "#2b6cb0", padding: "3px 10px", borderRadius: "30px", fontWeight: "bold" }}>الجرعة: {activeInfoMed.currentDosage}</span>
                  <span style={{ fontSize: "12px", backgroundColor: "#e6fffa", color: "#234e52", padding: "3px 10px", borderRadius: "30px", fontWeight: "bold" }}>الشركة: {activeInfoMed.selectedCompany?.name}</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "15px", color: "#2d3748" }}>
              <div>
                <strong style={{ color: "#319795" }}>🔹 دواعي الاستخدام:</strong>
                <p style={{ margin: "4px 0 0 0", color: "#4a5568" }}>{activeInfoMed.uses}</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", backgroundColor: "#f7fafc", padding: "15px", borderRadius: "14px" }}>
                <div>
                  <strong style={{ color: "#2b6cb0" }}>⏱️ التكرار:</strong>
                  <p style={{ margin: "4px 0 0 0", color: "#4a5568", fontSize: "14px" }}>{activeInfoMed.frequency}</p>
                </div>
                <div>
                  <strong style={{ color: "#2b6cb0" }}>🍽️ الطعام:</strong>
                  <p style={{ margin: "4px 0 0 0", color: "#4a5568", fontSize: "14px" }}>{activeInfoMed.foodNote}</p>
                </div>
              </div>
              <div style={{ backgroundColor: "#fff5f5", padding: "15px", borderRadius: "14px" }}>
                <strong style={{ color: "#c53030" }}>⚠️ الموانع:</strong>
                <p style={{ margin: "4px 0 0 0", color: "#742a2a", fontSize: "14px" }}>{activeInfoMed.warnings}</p>
              </div>
            </div>
            
            <div style={{ marginTop: "25px", display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setActiveInfoMed(null)} style={{ backgroundColor: "#3182ce", color: "white", border: "none", padding: "10px 25px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold" }}>عودة</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
