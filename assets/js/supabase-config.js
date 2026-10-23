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
  const messageInput = form.querySelector('[name="message"]') || form.querySelector('textarea');

  const name = nameInput ? nameInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const service = serviceInput ? serviceInput.value.trim() : '';
  const message = messageInput ? messageInput.value.trim() : '';

  if (!name || !email || !message) {
    if (typeof showToast === 'function') {
      showToast('Por favor completa todos los campos requeridos (Nombre, Correo y Proyecto).');
    }
    return;
  }

  let finalMessage = message;
  if (service || phone) {
    const metaHeader = [];
    if (service) metaHeader.push(`[SERVICIO: ${service.toUpperCase()}]`);
    if (phone) metaHeader.push(`[WHATSAPP/TEL: ${phone}]`);
    finalMessage = `${metaHeader.join(' ')}\n\n${message}`;
  }

  // Estado de carga
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Enviando al Lab...</span> <i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>`;
    if (window.lucide) window.lucide.createIcons();
  }

  try {
    const client = getSupabaseClient();

    if (client) {
      const { data, error } = await client
        .from('contact_messages')
        .insert([{ name, email, message: finalMessage }]);

      if (error) {
        console.error('[DevMaK3 Supabase Error]', error);
        throw error;
      }
      
      form.reset();
      if (typeof showToast === 'function') {
        showToast('¡Mensaje guardado con éxito en Supabase!');
      }
      if (window.devmak3Audio && typeof window.devmak3Audio.playLaserChime === 'function') {
        window.devmak3Audio.playLaserChime();
      }
    } else {
      // Modo demostración o aún no se han configurado las llaves
      console.info('[DevMaK3] Supabase aún no tiene credenciales configuradas en assets/js/supabase-config.js. Mensaje simulado:', { name, email, message });
      form.reset();
      if (typeof showToast === 'function') {
        showToast('¡Mensaje enviado al Lab! (Modo Demo: configura supabase-config.js)');
      }
      if (window.devmak3Audio && typeof window.devmak3Audio.playClick === 'function') {
        window.devmak3Audio.playClick();
      }
    }
  } catch (err) {
    console.error('Error al enviar formulario:', err);
    if (typeof showToast === 'function') {
      if (err.message && (err.message.includes('permission denied') || err.code === '42501')) {
        showToast('Error de permisos en Supabase: Falta ejecutar GRANT INSERT ON contact_messages en el SQL Editor.');
      } else {
        showToast('Error al conectar con la base de datos: ' + (err.message || 'Verifica la consola'));
      }
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
