import React, { useState, useEffect, useRef } from 'react';
import contactoImg from '../../assets/Contacto.svg';
import figuraFondo from '../../assets/FiguraFondo.svg';

export default function Contacto() {
  const [formState, setFormState] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { nombre, email, mensaje } = formState;

      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': import.meta.env.PUBLIC_BREVO_API_KEY,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: import.meta.env.PUBLIC_BREVO_SENDER_NAME || 'Jook ERP', email: import.meta.env.PUBLIC_BREVO_SENDER_EMAIL || 'jookcucuta@gmail.com' },
          to: [{ email: 'jookcucuta@gmail.com', name: 'Jook ERP' }],
          replyTo: { email, name: nombre },
          subject: `🟣 Nuevo mensaje de contacto - ${nombre}`,
          htmlContent: `
            <div style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;max-width:600px;margin:0 auto;background-color:#f8f9fa;">
              <div style="background:linear-gradient(135deg,#0D071D 0%,#1C0F3C 50%,#2D1B69 100%);padding:40px 30px;text-align:center;border-radius:8px 8px 0 0;">
                <h1 style="color:#fff;margin:0;font-size:24px;font-weight:700;">✉️ Nuevo Mensaje de Contacto</h1>
                <p style="color:rgba(255,255,255,0.7);margin:10px 0 0;font-size:14px;">Recibido desde el formulario de JookERP Landing</p>
              </div>
              <div style="background-color:#fff;padding:30px;border-left:1px solid #e9ecef;border-right:1px solid #e9ecef;">
                <div style="margin-bottom:24px;">
                  <label style="display:block;font-size:12px;font-weight:600;text-transform:uppercase;color:#6c757d;letter-spacing:0.5px;margin-bottom:6px;">👤 Nombre</label>
                  <p style="margin:0;font-size:16px;color:#212529;padding:12px 16px;background-color:#f8f9fa;border-radius:6px;border-left:3px solid #2D1B69;">${nombre}</p>
                </div>
                <div style="margin-bottom:24px;">
                  <label style="display:block;font-size:12px;font-weight:600;text-transform:uppercase;color:#6c757d;letter-spacing:0.5px;margin-bottom:6px;">📧 Correo Electrónico</label>
                  <p style="margin:0;font-size:16px;color:#212529;padding:12px 16px;background-color:#f8f9fa;border-radius:6px;border-left:3px solid #2D1B69;">
                    <a href="mailto:${email}" style="color:#2D1B69;text-decoration:none;">${email}</a>
                  </p>
                </div>
                <div style="margin-bottom:24px;">
                  <label style="display:block;font-size:12px;font-weight:600;text-transform:uppercase;color:#6c757d;letter-spacing:0.5px;margin-bottom:6px;">💬 Mensaje</label>
                  <div style="margin:0;font-size:16px;color:#212529;padding:16px;background-color:#f8f9fa;border-radius:6px;border-left:3px solid #2D1B69;line-height:1.6;white-space:pre-wrap;">${mensaje}</div>
                </div>
                <div style="text-align:center;margin-top:30px;">
                  <a href="mailto:${email}?subject=Re: Mensaje de contacto JookERP" style="display:inline-block;background:linear-gradient(135deg,#2D1B69,#1C0F3C);color:#fff;padding:14px 32px;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Responder a ${nombre}</a>
                </div>
              </div>
              <div style="background-color:#f1f3f5;padding:20px 30px;text-align:center;border-radius:0 0 8px 8px;border:1px solid #e9ecef;border-top:none;">
                <p style="margin:0;font-size:12px;color:#adb5bd;">Este correo fue enviado automáticamente desde el formulario de contacto de <strong style="color:#6c757d;">JookERP</strong></p>
              </div>
            </div>
          `,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el correo');
      }

      setStatus('success');
      setFormState({ nombre: '', email: '', mensaje: '' });
      
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("Error enviando el email:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section 
      id="contacto" 
      ref={sectionRef}
      className="py-32 bg-gradient-to-br from-[#0D071D] via-[#1C0F3C] to-[#0D071D] text-white relative overflow-hidden min-h-screen flex items-center font-sans mt-[-1px]"
    >
       {/* Background FiguraFondo - Optimized layering and visibility */}
       <div className="absolute inset-0 z-0 opacity-40 pointer-events-none flex items-center justify-center">
          <img 
            src={figuraFondo.src} 
            className="w-[2000px] max-w-none brightness-150 mix-blend-screen opacity-100" 
            alt="" 
          />
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Header */}
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-bold">Contacta con nosotros</h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
             
             {/* Left side: Illustration */}
             <div className={`lg:col-span-4 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="bg-white rounded-[2rem] rounded-tr-[10rem] rounded-bl-[10rem] p-8 md:p-12 aspect-[4/5] flex items-center justify-center shadow-2xl relative overflow-hidden">
                   <img 
                    src={contactoImg.src} 
                    alt="Ilustración Contacto" 
                    className="w-full h-auto object-contain scale-100"
                   />
                </div>
             </div>

             {/* Middle: Form */}
             <div className={`lg:col-span-5 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <form onSubmit={handleSubmit} className="space-y-8">
                   <div className="relative">
                      <input 
                        type="text" 
                        required
                        disabled={status === 'loading'}
                        placeholder="Nombre Completo"
                        className="w-full bg-transparent border-b border-white/20 py-4 px-0 focus:border-white outline-none transition-all text-xl placeholder:text-white/40 font-medium disabled:opacity-50"
                        value={formState.nombre}
                        onChange={(e) => setFormState({...formState, nombre: e.target.value})}
                      />
                   </div>
                   <div className="relative">
                      <input 
                        type="email" 
                        required
                        disabled={status === 'loading'}
                        placeholder="Correo Electronico"
                        className="w-full bg-transparent border-b border-white/20 py-4 px-0 focus:border-white outline-none transition-all text-xl placeholder:text-white/40 font-medium disabled:opacity-50"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                      />
                   </div>
                   <div className="relative">
                      <textarea 
                        rows={1}
                        disabled={status === 'loading'}
                        placeholder="Mensaje"
                        className="w-full bg-transparent border-b border-white/20 py-4 px-0 focus:border-white outline-none transition-all text-xl placeholder:text-white/40 font-medium resize-none overflow-hidden disabled:opacity-50"
                        value={formState.mensaje}
                        onChange={(e) => {
                          setFormState({...formState, mensaje: e.target.value});
                          e.target.style.height = 'auto';
                          e.target.style.height = e.target.scrollHeight + 'px';
                        }}
                      ></textarea>
                   </div>
                   <div className="pt-8">
                      <button 
                        type="submit" 
                        disabled={status === 'loading'}
                        className={`py-5 px-16 rounded-2xl text-xl font-bold transition-all shadow-2xl active:scale-95 w-full md:w-auto flex items-center justify-center gap-3 ${
                          status === 'success' ? 'bg-green-500 text-white' : 
                          status === 'error' ? 'bg-red-500 text-white' : 
                          'bg-white text-[#0D071D] hover:bg-gray-100'
                        }`}
                      >
                        {status === 'loading' ? (
                          <>
                            <span className="w-5 h-5 border-2 border-[#1C0F3C] border-t-transparent rounded-full animate-spin"></span>
                            Enviando...
                          </>
                        ) : status === 'success' ? '¡Enviado!' : status === 'error' ? 'Error al enviar' : 'Contactanos'}
                      </button>
                   </div>
                </form>
             </div>

             {/* Right side: Info */}
             <div className={`lg:col-span-3 space-y-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <div>
                  <h4 className="text-2xl font-bold mb-4">Contacto</h4>
                  <a href="mailto:jookcucuta@gmail.com" className="text-xl text-white/70 hover:text-white transition-colors">
                    jookcucuta@gmail.com
                  </a>
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-4">Ubicacion</h4>
                  <p className="text-xl text-white/70 leading-relaxed">
                    Cucuta, Norte de Santander
                  </p>
                </div>
             </div>

          </div>
       </div>
    </section>
  );
}
