// ==========================================
// PROGRAMACIÓN DIDÁCTICA - LÓGICA COMPLETA (v4.0)
// Con Historial, Editor JSON y Menú Desplegable
// ==========================================

const STORAGE_KEY = 'programacioFisiologia';
const HISTORY_KEY = 'programacioHistorial';
const MAX_HISTORY = 20;

let state = { secciones: [], temas: [] };

// ==========================================
// DATOS INICIALES
// ==========================================

const datosIniciales = {
    secciones: [
        { id: 'sec-1', icono: '📋', titulo: '1. Datos Identificativos',
          contenido: '<ul><li><strong>Asignatura:</strong> Fisiología del Sistema Musculoesquelético</li><li><strong>Nivel:</strong> Formación en Danza</li><li><strong>Curso académico:</strong> 2026-2027</li><li><strong>Profesora:</strong> Dra. Cèlia Painous, MD, PhD</li><li><strong>Carácter:</strong> Obligatoria</li></ul>',
          tieneTemas: false },
        { id: 'sec-2', icono: '🎯', titulo: '2. Descripción y Justificación',
          contenido: '<p>Esta asignatura proporciona al alumnado de danza los fundamentos fisiológicos y anatómicos necesarios para comprender cómo funciona el cuerpo humano en movimiento. Se aleja del enfoque médico tradicional para adoptar una <strong>perspectiva aplicada y somática</strong>, utilizando la danza (plié, relevé, grand jeté, turnout) como eje vertebrador.</p><p>El objetivo es que el bailarín comprenda su propio "instrumento" para optimizar su técnica, mejorar el rendimiento y prevenir lesiones.</p>',
          tieneTemas: false },
        { id: 'sec-3', icono: '🏆', titulo: '3. Competencias y Objetivos',
          contenido: '<p><strong>Competencias Generales:</strong></p><ul><li>Comprender el cuerpo humano como un sistema integrado y dinámico.</li><li>Aplicar conocimientos científicos a la práctica artística y técnica de la danza.</li></ul><p><strong>Objetivos Específicos:</strong></p><ol><li>Identificar los niveles de organización del cuerpo y los mecanismos de homeostasis durante el esfuerzo físico.</li><li>Explicar el mecanismo molecular de la contracción muscular (papel del calcio, ATP, actina y miosina).</li><li>Clasificar los componentes de la cadena biomecánica y describir su respuesta a la carga mecánica.</li><li>Analizar gestos técnicos de danza identificando planos de movimiento, roles musculares y propiocepción.</li></ol>',
          tieneTemas: false },
        { id: 'sec-4', icono: '📅', titulo: '4. Cronograma y Temporalización',
          contenido: '<p>La asignatura se estructura en sesiones semanales. A continuación se detallan los temas, fechas y recursos asociados.</p>',
          tieneTemas: true },
        { id: 'sec-5', icono: '📚', titulo: '5. Metodología Docente',
          contenido: '<p>Se utilizará una metodología <strong>activo-participativa</strong>:</p><ul><li><strong>Clases magistrales interactivas:</strong> Uso de presentaciones con apoyos visuales y esquemas animados.</li><li><strong>Aprendizaje basado en recursos digitales:</strong> Uso guiado de los archivos HTML interactivos.</li><li><strong>Resolución de Casos Prácticos:</strong> Trabajo individual o en parejas con los 70 casos prácticos diseñados.</li><li><strong>Práctica Somática en el aula:</strong> Ejercicios de movimiento donde el alumnado analiza la biomecánica de su propio cuerpo.</li></ul>',
          tieneTemas: false },
        { id: 'sec-6', icono: '📝', titulo: '6. Sistema de Evaluación',
          contenido: '<table style="width:100%;border-collapse:collapse;margin-top:10px;"><thead><tr style="background:#667eea;color:white;"><th style="padding:10px;text-align:left;">Instrumento</th><th style="padding:10px;text-align:left;">Descripción</th><th style="padding:10px;text-align:center;">Ponderación</th></tr></thead><tbody><tr style="background:#f8f9fa;"><td style="padding:10px;">Tests y Casos Prácticos</td><td style="padding:10px;">Resolución de los módulos de casos prácticos</td><td style="padding:10px;text-align:center;">30%</td></tr><tr><td style="padding:10px;">Trabajo Oral</td><td style="padding:10px;">Análisis fisiológico de una secuencia de danza</td><td style="padding:10px;text-align:center;">40%</td></tr><tr style="background:#f8f9fa;"><td style="padding:10px;">Examen Final</td><td style="padding:10px;">Prueba integradora global</td><td style="padding:10px;text-align:center;">30%</td></tr></tbody></table>',
          tieneTemas: false }
    ],
    temas: [
        { id: 'tema-1', seccionId: 'sec-4', fecha: '2026-10-09', titulo: 'Presentación. Homeostasis y Fisiología celular', descripcion: 'Niveles de organización, líquidos corporales, homeostasis, sistemas de regulación y retroalimentación.', recursos: ['https://jpainous.github.io/dansa_tema03/homeostasis_movimiento.html','https://jpainous.github.io/dansa_tema03/esqueleto_00_A.html'], observaciones: '', estado: 'completo' },
        { id: 'tema-2', seccionId: 'sec-4', fecha: '2026-10-16', titulo: 'Sistema musculoesquelético I', descripcion: 'Estructura muscular, sarcómero, unidad motora, mecanismo de contracción (Ca²⁺/ATP), rigor mortis, rampas y tipos de contracción.', recursos: ['https://jpainous.github.io/dansa_tema03/actividades_sarcomero.html','https://jpainous.github.io/dansa_tema03/miosina_actina.html','https://jpainous.github.io/dansa_tema03/calcio_atp.html','https://jpainous.github.io/dansa_tema03/contraccion_muscular.html','https://jpainous.github.io/dansa_tema03/unidad_motora.html'], observaciones: '', estado: 'completo' },
        { id: 'tema-3', seccionId: 'sec-4', fecha: '2026-10-23', titulo: 'Sistema musculoesquelético II', descripcion: 'Cadena biomecánica, clasificación ósea, partes del hueso, remodelación, articulaciones, planos de movimiento y propiocepción.', recursos: ['https://jpainous.github.io/dansa_tema03/esqueleto_01_A.html','https://jpainous.github.io/dansa_tema03/esqueleto_02_A.html','https://jpainous.github.io/dansa_tema03/esqueleto_03_D.html','https://jpainous.github.io/dansa_tema03/esqueleto_04_tendones.html','https://jpainous.github.io/dansa_tema03/esqueleto_05_articulaciones_A.html','https://jpainous.github.io/dansa_tema03/planos_movimiento.html'], observaciones: '', estado: 'completo' },
        { id: 'tema-4', seccionId: 'sec-4', fecha: '2026-10-30', titulo: 'Festivo (Libre disposición CSD)', descripcion: 'Día festivo. Repaso autónomo con los casos prácticos.', recursos: ['https://jpainous.github.io/dansa_tema03/casos_practicos02_A.html'], observaciones: '', estado: 'pendiente' },
        { id: 'tema-5', seccionId: 'sec-4', fecha: '2026-11-06', titulo: 'Sistema nervioso I', descripcion: 'Tema en desarrollo. Se vinculará con la unidad motora ya estudiada.', recursos: [], observaciones: '', estado: 'pendiente' },
        { id: 'tema-6', seccionId: 'sec-4', fecha: '2026-11-13', titulo: 'Preparación y envío de trabajos orales', descripcion: 'Tutorización del trabajo grupal: "Análisis fisiológico de una secuencia de danza".', recursos: ['https://jpainous.github.io/dansa_tema03/musculos_tr_equipo.html','https://jpainous.github.io/dansa_tema03/trabajo_musculos.html'], observaciones: '', estado: 'pendiente' },
        { id: 'tema-7', seccionId: 'sec-4', fecha: '2026-11-20', titulo: 'Sistema nervioso II / Sueño', descripcion: 'Tema en desarrollo. Vinculable a la recuperación homeostática y sistema nervioso autónomo.', recursos: [], observaciones: '', estado: 'pendiente' },
        { id: 'tema-8', seccionId: 'sec-4', fecha: '2026-11-27', titulo: 'Presentaciones Trabajos Orales / La sangre', descripcion: 'Evaluación formativa: exposición grupal de la "Práctica somática de integración biomecánica".', recursos: ['https://jpainous.github.io/dansa_tema03/casos_practicos02_B.html'], observaciones: '', estado: 'pendiente' },
        { id: 'tema-9', seccionId: 'sec-4', fecha: '2026-12-04', titulo: 'Sistema Hormonal', descripcion: 'Tema en desarrollo. Vinculable a la retroalimentación y adaptación ósea/muscular.', recursos: [], observaciones: '', estado: 'pendiente' },
        { id: 'tema-10', seccionId: 'sec-4', fecha: '2026-12-11', titulo: 'Nutrición (nutricionista + práctica)', descripcion: 'Sesión con nutricionista. Vinculable a la homeostasis, glucosa y recuperación muscular.', recursos: [], observaciones: '', estado: 'pendiente' },
        { id: 'tema-11', seccionId: 'sec-4', fecha: '2026-12-18', titulo: 'EVALUACIÓN PARCIAL', descripcion: 'Prueba objetiva sobre Homeostasis, Sistema Muscular y Sistema Óseo/Articular.', recursos: ['https://jpainous.github.io/dansa_tema03/casos_practicos02_A.html','https://jpainous.github.io/dansa_tema03/casos_practicos02_B.html'], observaciones: '', estado: 'pendiente' },
        { id: 'tema-12', seccionId: 'sec-4', fecha: '2027-01-08', titulo: 'Aparato Cardiovascular', descripcion: 'Tema en desarrollo. Vinculable al transporte de O₂/CO₂ y homeostasis en el esfuerzo.', recursos: [], observaciones: '', estado: 'pendiente' },
        { id: 'tema-13', seccionId: 'sec-4', fecha: '2027-01-15', titulo: 'Aparato Respiratorio', descripcion: 'Tema en desarrollo. Vinculable al intercambio gaseoso y pH sanguíneo.', recursos: [], observaciones: '', estado: 'pendiente' },
        { id: 'tema-14', seccionId: 'sec-4', fecha: '2027-01-22', titulo: 'EXAMEN FINAL', descripcion: 'Prueba integradora global de toda la asignatura.', recursos: ['https://jpainous.github.io/dansa_tema03/esqueleto_test_final.html'], observaciones: '', estado: 'pendiente' }
    ]
};

// ==========================================
// NOTIFICACIONES TOAST
// ==========================================

function mostrarToast(mensaje, tipo = 'info', duracion = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.textContent = mensaje;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.transition = 'opacity 0.3s';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, duracion);
}

// ==========================================
// GESTIÓN DEL ESTADO
// ==========================================

function migrarDatos(datos) {
    if (!datos || !datos.secciones || !datos.temas) return null;
    datos.temas = datos.temas.map(t => ({
        id: t.id || generarId('tema'),
        seccionId: t.seccionId || '',
        fecha: t.fecha || '',
        titulo: t.titulo || 'Sin título',
        descripcion: t.descripcion || '',
        recursos: Array.isArray(t.recursos) ? t.recursos : [],
        observaciones: t.observaciones || '',
        estado: t.estado || 'pendiente'
    }));
    datos.secciones = datos.secciones.map(s => ({
        id: s.id || generarId('sec'),
        icono: s.icono || '📄',
        titulo: s.titulo || 'Sin título',
        contenido: s.contenido || '',
        tieneTemas: s.tieneTemas || false
    }));
    return datos;
}

function guardarEstado(crearBackup = true) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        if (crearBackup) crearVersionHistorial();
        return true;
    } catch (e) {
        console.error('Error al guardar:', e);
        mostrarToast('❌ Error al guardar los datos', 'error');
        return false;
    }
}

function cargarEstado() {
    try {
        const datosGuardados = localStorage.getItem(STORAGE_KEY);
        if (datosGuardados) {
            const datosMigrados = migrarDatos(JSON.parse(datosGuardados));
            if (datosMigrados) state = datosMigrados;
            else state = JSON.parse(JSON.stringify(datosIniciales));
        } else {
            state = JSON.parse(JSON.stringify(datosIniciales));
        }
        guardarEstado(false);
    } catch (e) {
        console.error('Error al cargar estado:', e);
        state = JSON.parse(JSON.stringify(datosIniciales));
        guardarEstado(false);
    }
}

function restablecerEstado() {
    if (confirm('¿Estás seguro de que quieres restablecer todos los datos a los valores iniciales? Se perderán todos los cambios.')) {
        state = JSON.parse(JSON.stringify(datosIniciales));
        guardarEstado();
        renderizar();
        mostrarToast('✅ Datos restablecidos correctamente', 'success');
        closeDropdown();
    }
}

// ==========================================
// HISTORIAL DE VERSIONES
// ==========================================

function crearVersionHistorial() {
    try {
        let historial = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
        const nuevaVersion = {
            id: 'v-' + Date.now(),
            fecha: new Date().toISOString(),
            datos: JSON.parse(JSON.stringify(state))
        };
        historial.unshift(nuevaVersion);
        if (historial.length > MAX_HISTORY) historial = historial.slice(0, MAX_HISTORY);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(historial));
    } catch (e) {
        console.error('Error al crear versión del historial:', e);
    }
}

function obtenerHistorial() {
    try {
        return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    } catch (e) {
        return [];
    }
}

function restaurarVersion(versionId) {
    const historial = obtenerHistorial();
    const version = historial.find(v => v.id === versionId);
    if (!version) return;
    
    if (confirm('¿Restaurar esta versión? Se creará una copia de seguridad del estado actual antes de restaurar.')) {
        const datosMigrados = migrarDatos(JSON.parse(JSON.stringify(version.datos)));
        if (datosMigrados) {
            state = datosMigrados;
            guardarEstado();
            renderizar();
            mostrarToast('✅ Versión restaurada correctamente', 'success');
            cerrarModal('modalHistorial');
        } else {
            mostrarToast('❌ Error al restaurar la versión', 'error');
        }
    }
}

function eliminarVersion(versionId) {
    if (!confirm('¿Eliminar esta versión del historial?')) return;
    let historial = obtenerHistorial();
    historial = historial.filter(v => v.id !== versionId);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(historial));
    renderizarHistorial();
    mostrarToast('🗑️ Versión eliminada', 'info');
}

function formatearFechaISO(isoString) {
    const d = new Date(isoString);
    const opciones = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return d.toLocaleDateString('es-ES', opciones);
}

function renderizarHistorial() {
    const lista = document.getElementById('historialLista');
    const historial = obtenerHistorial();
    
    if (historial.length === 0) {
        lista.innerHTML = '<div class="historial-vacio">No hay versiones en el historial.</div>';
        return;
    }
    
    lista.innerHTML = historial.map((v, idx) => {
        const numTemas = v.datos.temas ? v.datos.temas.length : 0;
        const numSecciones = v.datos.secciones ? v.datos.secciones.length : 0;
        const esActual = idx === 0;
        
        return `
            <div class="historial-item ${esActual ? 'current' : ''}">
                <div class="historial-info">
                    <div class="historial-fecha">
                        📅 ${formatearFechaISO(v.fecha)}
                        ${esActual ? '<span class="historial-badge">ACTUAL</span>' : ''}
                    </div>
                    <div class="historial-detalle">
                        ${numSecciones} secciones · ${numTemas} temas
                    </div>
                </div>
                <div class="historial-actions">
                    ${!esActual ? `<button class="btn btn-restore" onclick="restaurarVersion('${v.id}')">♻️ Restaurar</button>` : ''}
                    <button class="btn btn-delete-version" onclick="eliminarVersion('${v.id}')">🗑️</button>
                </div>
            </div>
        `;
    }).join('');
}

function abrirHistorial() {
    renderizarHistorial();
    abrirModal('modalHistorial');
    closeDropdown();
}

// ==========================================
// EDITOR JSON
// ==========================================

function abrirEditor() {
    const editor = document.getElementById('editorJSON');
    editor.value = JSON.stringify(state, null, 2);
    abrirModal('modalEditor');
    closeDropdown();
}

function aplicarCambiosJSON() {
    const editor = document.getElementById('editorJSON');
    try {
        const nuevosDatos = JSON.parse(editor.value);
        const datosMigrados = migrarDatos(nuevosDatos);
        
        if (!datosMigrados) {
            mostrarToast('❌ El JSON no tiene el formato correcto', 'error');
            return;
        }
        
        if (confirm('¿Aplicar estos cambios? Se creará una copia de seguridad del estado actual.')) {
            state = datosMigrados;
            guardarEstado();
            renderizar();
            mostrarToast('✅ Cambios aplicados correctamente', 'success');
            cerrarModal('modalEditor');
        }
    } catch (e) {
        mostrarToast('❌ JSON inválido: ' + e.message, 'error', 5000);
    }
}

function formatearJSON() {
    const editor = document.getElementById('editorJSON');
    try {
        const datos = JSON.parse(editor.value);
        editor.value = JSON.stringify(datos, null, 2);
        mostrarToast('🎨 JSON formateado', 'info');
    } catch (e) {
        mostrarToast('❌ No se puede formatear: JSON inválido', 'error');
    }
}

function copiarJSON() {
    const editor = document.getElementById('editorJSON');
    editor.select();
    document.execCommand('copy');
    mostrarToast('📋 JSON copiado al portapapeles', 'success');
}

// ==========================================
// DROPDOWN - MENÚ DESPLEGABLE
// ==========================================

function toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');
    const btnDropdown = document.getElementById('btnDropdown');
    dropdown.classList.toggle('open');
    btnDropdown.classList.toggle('active');
}

function closeDropdown() {
    const dropdown = document.querySelector('.dropdown');
    const btnDropdown = document.getElementById('btnDropdown');
    if (dropdown) dropdown.classList.remove('open');
    if (btnDropdown) btnDropdown.classList.remove('active');
}

// ==========================================
// RENDERIZADO
// ==========================================

function renderizar() {
    const container = document.getElementById('seccionesContainer');
    if (!container) return;
    container.innerHTML = '';

    if (state.secciones.length === 0) {
        container.innerHTML = '<div class="empty-state">No hay secciones. Haz clic en "Añadir Sección" para comenzar.</div>';
        return;
    }

    state.secciones.forEach(seccion => {
        try { container.appendChild(crearElementoSeccion(seccion)); }
        catch (e) { console.error('Error al renderizar sección', seccion, e); }
    });
}

function crearElementoSeccion(seccion) {
    const div = document.createElement('div');
    div.className = 'seccion';
    div.dataset.id = seccion.id;

    const temasSeccion = seccion.tieneTemas
        ? state.temas.filter(t => t.seccionId === seccion.id).sort((a, b) => (a.fecha || '').localeCompare(b.fecha || ''))
        : [];

    let html = `
        <div class="seccion-header">
            <h2 class="seccion-titulo">
                <span class="seccion-icono">${seccion.icono || '📄'}</span>
                ${seccion.titulo}
            </h2>
            <div class="seccion-actions">
                <button class="btn btn-edit btn-small" onclick="editarSeccion('${seccion.id}')">✏️ Editar</button>
                <button class="btn btn-delete btn-small" onclick="eliminarSeccion('${seccion.id}')">🗑️ Eliminar</button>
            </div>
        </div>
        <div class="seccion-contenido">${seccion.contenido || '<em>Sin contenido</em>'}</div>
    `;

    if (seccion.tieneTemas) {
        html += '<div class="temas-lista">';
        if (temasSeccion.length === 0) {
            html += '<div class="empty-state">No hay temas en esta sección.</div>';
        } else {
            temasSeccion.forEach(tema => { html += crearHTMLTema(tema); });
        }
        html += `<button class="btn btn-add-tema-seccion" onclick="abrirModalTema(null, '${seccion.id}')">➕ Añadir Tema a esta sección</button></div>`;
    }

    div.innerHTML = html;
    return div;
}

function crearHTMLTema(tema) {
    const fechaFormateada = formatearFecha(tema.fecha);
    const estadoMap = {
        'completo': '<span class="tema-estat estat-complet">✅ Completo</span>',
        'parcial': '<span class="tema-estat estat-parcial">⚠️ Parcial</span>',
        'pendiente': '<span class="tema-estat estat-pendent">⏳ Pendiente</span>'
    };

    let obsHTML = '';
    if (tema.observaciones && tema.observaciones.trim().length > 0) {
        obsHTML = `<div class="tema-observaciones"><strong>📝 Observaciones:</strong> ${tema.observaciones}</div>`;
    }

    let recHTML = '';
    if (Array.isArray(tema.recursos) && tema.recursos.length > 0) {
        const items = tema.recursos.filter(u => u && u.trim().length > 0)
            .map(u => `<li><a href="${u}" target="_blank" rel="noopener">${extraerNombre(u)}</a></li>`).join('');
        if (items.length > 0) {
            recHTML = `<div class="tema-recursos"><h4>🔗 Recursos HTML:</h4><ul class="recursos-lista">${items}</ul></div>`;
        }
    }

    return `
        <div class="tema-card ${tema.estado || 'pendiente'}" data-id="${tema.id}">
            <div class="tema-header">
                <div class="tema-info">
                    <span class="tema-data">📅 ${fechaFormateada}</span>
                    <h3 class="tema-titulo">${tema.titulo} ${estadoMap[tema.estado] || ''}</h3>
                </div>
            </div>
            ${tema.descripcion ? `<p class="tema-descripcio">${tema.descripcion}</p>` : ''}
            ${obsHTML}
            ${recHTML}
            <div class="tema-actions">
                <button class="btn btn-edit btn-small" onclick="editarTema('${tema.id}')">✏️ Editar</button>
                <button class="btn btn-delete btn-small" onclick="eliminarTema('${tema.id}')">🗑️ Eliminar</button>
            </div>
        </div>
    `;
}

// ==========================================
// UTILIDADES
// ==========================================

function generarId(prefijo) {
    return prefijo + '-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

function formatearFecha(f) {
    if (!f) return 'Sin fecha';
    const partes = f.split('-');
    if (partes.length !== 3) return f;
    const [y, m, d] = partes;
    const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
    const mesIdx = parseInt(m) - 1;
    if (mesIdx < 0 || mesIdx > 11) return f;
    return `${parseInt(d)}-${meses[mesIdx]}-${y}`;
}

function extraerNombre(url) {
    if (!url) return 'Recurso';
    const p = url.split('/');
    return p[p.length - 1] || url;
}

function generarNombreArchivo() {
    const fecha = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    return `programacion_fisiologia_${fecha}.json`;
}

// ==========================================
// MODALES
// ==========================================

function abrirModal(id) { 
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('active');
}
function cerrarModal(id) { 
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('active');
}

// ==========================================
// SECCIONES
// ==========================================

function abrirModalSeccion(id) {
    const form = document.getElementById('seccionForm');
    form.reset();
    document.getElementById('seccionId').value = '';
    if (id) {
        const s = state.secciones.find(x => x.id === id);
        if (s) {
            document.getElementById('modalSeccionTitle').textContent = 'Editar Sección';
            document.getElementById('seccionId').value = s.id;
            document.getElementById('seccionTitulo').value = s.titulo;
            document.getElementById('seccionIcono').value = s.icono || '';
            document.getElementById('seccionContenido').value = s.contenido || '';
            document.getElementById('seccionTieneTemas').checked = s.tieneTemas || false;
        }
    } else {
        document.getElementById('modalSeccionTitle').textContent = 'Añadir Sección';
    }
    abrirModal('modalSeccion');
}

function editarSeccion(id) { abrirModalSeccion(id); }

function eliminarSeccion(id) {
    const s = state.secciones.find(x => x.id === id);
    if (!s) return;
    const n = state.temas.filter(t => t.seccionId === id).length;
    let msg = `¿Eliminar la sección "${s.titulo}"?`;
    if (n > 0) msg += `\n\nSe eliminarán también ${n} tema(s) asociado(s).`;
    if (confirm(msg)) {
        state.secciones = state.secciones.filter(x => x.id !== id);
        state.temas = state.temas.filter(t => t.seccionId !== id);
        guardarEstado(); renderizar();
        mostrarToast('🗑️ Sección eliminada', 'info');
    }
}

document.getElementById('seccionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('seccionId').value;
    const datos = {
        titulo: document.getElementById('seccionTitulo').value.trim(),
        icono: document.getElementById('seccionIcono').value.trim() || '📄',
        contenido: document.getElementById('seccionContenido').value,
        tieneTemas: document.getElementById('seccionTieneTemas').checked
    };
    if (id) {
        const i = state.secciones.findIndex(x => x.id === id);
        if (i !== -1) state.secciones[i] = { ...state.secciones[i], ...datos };
    } else {
        state.secciones.push({ id: generarId('sec'), ...datos });
    }
    guardarEstado(); renderizar(); cerrarModal('modalSeccion');
    mostrarToast('💾 Sección guardada', 'success');
});

// ==========================================
// TEMAS
// ==========================================

function abrirModalTema(id, seccionId) {
    const form = document.getElementById('temaForm');
    form.reset();
    document.getElementById('temaId').value = '';
    document.getElementById('temaSeccionId').value = seccionId || '';
    if (id) {
        const t = state.temas.find(x => x.id === id);
        if (t) {
            document.getElementById('modalTemaTitle').textContent = 'Editar Tema';
            document.getElementById('temaId').value = t.id;
            document.getElementById('temaSeccionId').value = t.seccionId;
            document.getElementById('temaFecha').value = t.fecha || '';
            document.getElementById('temaTitulo').value = t.titulo || '';
            document.getElementById('temaDescripcion').value = t.descripcion || '';
            document.getElementById('temaRecursos').value = Array.isArray(t.recursos) ? t.recursos.join('\n') : '';
            document.getElementById('temaObservaciones').value = t.observaciones || '';
            document.getElementById('temaEstado').value = t.estado || 'pendiente';
        }
    } else {
        document.getElementById('modalTemaTitle').textContent = 'Añadir Tema';
    }
    abrirModal('modalTema');
}

function editarTema(id) { abrirModalTema(id); }

function eliminarTema(id) {
    const t = state.temas.find(x => x.id === id);
    if (!t) return;
    if (confirm(`¿Eliminar el tema "${t.titulo}"?`)) {
        state.temas = state.temas.filter(x => x.id !== id);
        guardarEstado(); renderizar();
        mostrarToast('🗑️ Tema eliminado', 'info');
    }
}

document.getElementById('temaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    try {
        const id = document.getElementById('temaId').value;
        const seccionId = document.getElementById('temaSeccionId').value;
        const titulo = document.getElementById('temaTitulo').value.trim();
        
        if (!titulo) { mostrarToast('⚠️ El título es obligatorio', 'error'); return; }
        if (!seccionId) { mostrarToast('⚠️ Error: No se ha seleccionado una sección', 'error'); return; }
        
        const recursosTexto = document.getElementById('temaRecursos').value;
        const recursos = recursosTexto.split('\n').map(r => r.trim()).filter(r => r.length > 0);
        
        const datos = {
            seccionId: seccionId,
            fecha: document.getElementById('temaFecha').value,
            titulo: titulo,
            descripcion: document.getElementById('temaDescripcion').value,
            recursos: recursos,
            observaciones: document.getElementById('temaObservaciones').value,
            estado: document.getElementById('temaEstado').value
        };
        
        if (id) {
            const i = state.temas.findIndex(x => x.id === id);
            if (i !== -1) state.temas[i] = { ...state.temas[i], ...datos };
        } else {
            state.temas.push({ id: generarId('tema'), ...datos });
        }
        
        guardarEstado(); renderizar(); cerrarModal('modalTema');
        mostrarToast('💾 Tema guardado', 'success');
    } catch (error) {
        console.error('Error al guardar el tema:', error);
        mostrarToast('❌ Error al guardar: ' + error.message, 'error');
    }
});

// ==========================================
// IMPRIMIR / EXPORTAR / IMPORTAR / BACKUP
// ==========================================

function imprimirPDF() { 
    closeDropdown();
    setTimeout(() => window.print(), 100);
}

function exportarDatos() {
    try {
        const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = generarNombreArchivo();
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        URL.revokeObjectURL(url);
        mostrarToast('📥 Datos exportados', 'success');
    } catch (e) {
        mostrarToast('❌ Error al exportar', 'error');
    }
    closeDropdown();
}

function copiaAutomatica() {
    try {
        const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = generarNombreArchivo();
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        URL.revokeObjectURL(url);
        mostrarToast('💾 Copia de seguridad descargada', 'success');
    } catch (e) {
        mostrarToast('❌ Error al crear copia', 'error');
    }
    closeDropdown();
}

function importarDatos(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const datos = JSON.parse(e.target.result);
            const datosMigrados = migrarDatos(datos);
            if (datosMigrados) {
                if (confirm('¿Importar estos datos? Se creará una copia de seguridad del estado actual.')) {
                    state = datosMigrados;
                    guardarEstado(); renderizar();
                    mostrarToast('📤 Datos importados correctamente', 'success');
                }
            } else {
                mostrarToast('❌ El archivo no tiene el formato correcto', 'error');
            }
        } catch (err) {
            mostrarToast('❌ Error al leer el archivo: ' + err.message, 'error');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

// ==========================================
// EVENT LISTENERS
// ==========================================

// Botones principales (visibles siempre)
document.getElementById('btnAddSeccion').addEventListener('click', () => abrirModalSeccion());
document.getElementById('btnAddTema').addEventListener('click', () => {
    const secs = state.secciones.filter(s => s.tieneTemas);
    if (secs.length === 0) {
        mostrarToast('⚠️ Primero crea una sección con temas', 'error');
        return;
    }
    abrirModalTema(null, secs[0].id);
});
document.getElementById('btnPrint').addEventListener('click', imprimirPDF);

// Botones del dropdown
document.getElementById('btnHistory').addEventListener('click', abrirHistorial);
document.getElementById('btnEditor').addEventListener('click', abrirEditor);
document.getElementById('btnAutoBackup').addEventListener('click', copiaAutomatica);
document.getElementById('btnExport').addEventListener('click', exportarDatos);
document.getElementById('btnImport').addEventListener('click', () => {
    closeDropdown();
    setTimeout(() => document.getElementById('fileInput').click(), 100);
});
document.getElementById('fileInput').addEventListener('change', importarDatos);
document.getElementById('btnReset').addEventListener('click', restablecerEstado);

// Editor JSON
document.getElementById('btnAplicarJSON').addEventListener('click', aplicarCambiosJSON);
document.getElementById('btnFormatearJSON').addEventListener('click', formatearJSON);
document.getElementById('btnCopiarJSON').addEventListener('click', copiarJSON);

// Dropdown - Toggle al hacer clic en el botón
document.getElementById('btnDropdown').addEventListener('click', function(e) {
    e.stopPropagation();
    toggleDropdown();
});

// Dropdown - Cerrar al hacer clic fuera
document.addEventListener('click', function(e) {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown && !dropdown.contains(e.target)) {
        closeDropdown();
    }
});

// Dropdown - Cerrar al hacer clic en cualquier opción
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        setTimeout(closeDropdown, 100);
    });
});

// Dropdown - Cerrar con tecla Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeDropdown();
        // También cerrar modales abiertos
        document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
    }
});

// Cerrar modales al hacer clic en X o botones de cancelar
document.querySelectorAll('.close, [data-modal]').forEach(el => {
    el.addEventListener('click', function() {
        const modalId = this.dataset.modal || (this.closest('.modal') ? this.closest('.modal').id : null);
        if (modalId) cerrarModal(modalId);
    });
});

// Cerrar modal al hacer clic fuera
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) e.target.classList.remove('active');
});

// ==========================================
// INICIALIZACIÓN
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    cargarEstado();
    renderizar();
    console.log('✅ Programación Didáctica v4.0 cargada. Temas:', state.temas.length);
});
