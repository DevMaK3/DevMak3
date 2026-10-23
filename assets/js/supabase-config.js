/**
 * DevMaK3 - Configuración e Integración con Supabase
 * Permite guardar directamente los envíos del formulario de contacto en la tabla contact_messages.
 */

window.DEVMAK3_CONFIG = {
  // 1. URL de tu proyecto Supabase
  supabaseUrl: 'https://sdelreaiharhlcorutvf.supabase.co',
  // 2. Clave pública anónima (publishable / anon key)
  supabaseAnonKey: 'sb_publishable_TQsRBYi0n_FuGsyUMFe85g_NaqQe7Yq'
};

// Inicializador del cliente Supabase
let supabaseClient = null;

function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;
  const { supabaseUrl, supabaseAnonKey } = window.DEVMAK3_CONFIG || {};
  if (supabaseUrl && supabaseAnonKey && window.supabase && typeof window.supabase.createClient === 'function') {
    try {
      supabaseClient = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
    } catch (e) {
      console.warn('[DevMaK3 Supabase] Error al inicializar cliente:', e);
    }
  }
  return supabaseClient;
}

// Handler para el formulario de contacto
async function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

  const nameInput = form.querySelector('[name="name"]') || form.querySelectorAll('input')[0];
  const emailInput = form.querySelector('[name="email"]') || form.querySelectorAll('input')[1];
  const phoneInput = form.querySelector('[name="phone"]');
  const serviceInput = form.querySelector('[name="service"]');
  const serviceLabelEl = document.getElementById('selected-service-label');
  const messageInput = form.querySelector('[name="message"]') || form.querySelector('textarea');

  const name = nameInput ? nameInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const service = serviceInput ? serviceInput.value.trim() : '';
  const serviceDisplayName = serviceLabelEl ? serviceLabelEl.innerText.trim() : (service || 'Desarrollo Web & SEO');
  const message = messageInput ? messageInput.value.trim() : '';

  if (!name || !email || !message) {
    if (typeof showToast === 'function') {
      showToast('Por favor completa todos los campos requeridos (Nombre, Correo y Proyecto).');
    }
    return;
  }

  let finalMessage = message;
  const metaHeader = [];
  if (serviceDisplayName) metaHeader.push(`[SERVICIO: ${serviceDisplayName.toUpperCase()}]`);
  if (phone) metaHeader.push(`[WHATSAPP/TEL: ${phone}]`);
  if (metaHeader.length > 0) {
    finalMessage = `${metaHeader.join(' ')}\n\n${message}`;
  }

  // Estado de carga en el botón
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Enviando al Lab...</span> <i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>`;
    if (window.lucide) window.lucide.createIcons();
  }

  let mailSent = false;
  let supabaseSaved = false;

  try {
    // 1. Notificación Instantánea por Correo a devmavenk3@gmail.com (Canal Garantizado)
    try {
      const mailResponse = await fetch('https://formsubmit.co/ajax/devmavenk3@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          'Nombre o Empresa': name,
          'Correo Electrónico': email,
          'WhatsApp / Celular': phone || 'No proporcionado',
          'Servicio de Interés': serviceDisplayName,
          'Detalles del Proyecto': message,
          '_subject': `🚨 [Nuevo Lead DevMaK3] ${name} - ${serviceDisplayName}`,
          '_template': 'table',
          '_captcha': 'false'
        })
      });

      if (mailResponse.ok) {
        mailSent = true;
      } else {
        console.warn('[DevMaK3 Mail Warning] Respuesta FormSubmit no OK:', mailResponse.status);
      }
    } catch (mailErr) {
      console.warn('[DevMaK3 Mail Warning] Error de red en FormSubmit:', mailErr);
    }

    // 2. Guardar en Supabase (Base de Datos principal de respaldo)
    try {
      const client = getSupabaseClient();
      if (client) {
        const { data, error } = await client
          .from('contact_messages')
          .insert([{ name, email, message: finalMessage }]);

        if (!error) {
          supabaseSaved = true;
        } else {
          console.warn('[DevMaK3 Supabase Warning]', error);
        }
      }
    } catch (supaErr) {
      console.warn('[DevMaK3 Supabase Exception]', supaErr);
    }

    // Confirmación al usuario si al menos un canal tuvo éxito
    if (mailSent || supabaseSaved) {
      form.reset();
      if (typeof showToast === 'function') {
        showToast('¡Proyecto enviado con éxito! Nuestro equipo te responderá en breve.');
      }
      if (window.devmak3Audio && typeof window.devmak3Audio.playLaserChime === 'function') {
        window.devmak3Audio.playLaserChime();
      }
    } else {
      // Si ambos fallaron por alguna desconexión de red
      if (typeof showToast === 'function') {
        showToast('Hubo un problema de conexión. Inténtalo de nuevo o escríbenos a devmavenk3@gmail.com');
      }
    }
  } catch (err) {
    console.error('Error general al enviar formulario:', err);
    if (typeof showToast === 'function') {
      showToast('Ocurrió un error al procesar el mensaje.');
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
      if (window.lucide) window.lucide.createIcons();
    }
  }
}

// Vincular automáticamente el formulario al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
});
