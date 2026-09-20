// ==========================================
// PROGRAMACIÓN DIDÁCTICA - LÓGICA (v2.1 - CORREGIDA)
// ==========================================

let state = {
    secciones: [],
    temas: []
};

// 🔧 CORRECCIÓN: Función de migración robusta
function migrarDatos(datos) {
    if (!datos || !datos.secciones || !datos.temas) return null;
    
    // Asegurar que todos los temas tienen los campos necesarios
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
    
    // Asegurar que todas las secciones tienen los campos necesarios
    datos.secciones = datos.secciones.map(s => ({
        id: s.id || generarId('sec'),
        icono: s.icono || '📄',
        titulo: s.titulo || 'Sin título',
        contenido: s.contenido || '',
        tieneTemas: s.tieneTemas || false
    }));
    
    return datos;
}

// ==========================================
// GESTIÓN DEL ESTADO
// ==========================================

function guardarEstado() {
    try {
        localStorage.setItem('programacioFisiologia', JSON.stringify(state));
        // 🔧 CORRECCIÓN: Feedback visual de guardado exitoso
        console.log('✅ Estado guardado correctamente. Temas:', state.temas.length);
        return true;
    } catch (e) {
        console.error('❌ Error al guardar:', e);
        alert('Error al guardar los datos. Puede que el almacenamiento del navegador esté lleno o desactivado.');
        return false;
    }
}

function cargarEstado() {
    try {
        const datosGuardados = localStorage.getItem('programacioFisiologia');
        if (datosGuardados) {
            const datosParseados = JSON.parse(datosGuardados);
            // 🔧 CORRECCIÓN: Migrar datos antiguos al nuevo formato
            const datosMigrados = migrarDatos(datosParseados);
            if (datosMigrados) {
                state = datosMigrados;
                console.log('✅ Datos cargados y migrados correctamente.');
            } else {
                console.warn('⚠️ Datos corruptos. Usando valores iniciales.');
                state = JSON.parse(JSON.stringify(datosIniciales));
            }
        } else {
            state = JSON.parse(JSON.stringify(datosIniciales));
        }
        guardarEstado();
    } catch (e) {
        console.error('❌ Error al cargar estado:', e);
        state = JSON.parse(JSON.stringify(datosIniciales));
        guardarEstado();
    }
}

function restablecerEstado() {
    if (confirm('¿Estás seguro de que quieres restablecer todos los datos a los valores iniciales? Se perderán todos los cambios.')) {
        state = JSON.parse(JSON.stringify(datosIniciales));
        guardarEstado();
        renderizar();
        alert('Datos restablecidos correctamente.');
    }
}

// ==========================================
// RENDERIZADO
// ==========================================

function renderizar() {
    const container = document.getElementById('seccionesContainer');
    if (!container) {
        console.error('❌ No se encuentra el contenedor de secciones');
        return;
    }
    container.innerHTML = '';

    if (state.secciones.length === 0) {
        container.innerHTML = '<div class="empty-state">No hay secciones. Haz clic en "Añadir Sección" para comenzar.</div>';
        return;
    }

    state.secciones.forEach(seccion => {
        try {
            container.appendChild(crearElementoSeccion(seccion));
        } catch (e) {
            console.error('❌ Error al renderizar sección', seccion, e);
        }
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
    // 🔧 CORRECCIÓN: Verificación robusta del array de recursos
    if (Array.isArray(tema.recursos) && tema.recursos.length > 0) {
        const items = tema.recursos
            .filter(u => u && u.trim().length > 0)
            .map(u => `<li><a href="${u}" target="_blank" rel="noopener">${extraerNombre(u)}</a></li>`)
            .join('');
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
            // 🔧 CORRECCIÓN: Unir recursos con saltos de línea
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
    }
}

// 🔧 CORRECCIÓN: Función de guardado de tema con validación y logs
document.getElementById('temaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    try {
        const id = document.getElementById('temaId').value;
        const seccionId = document.getElementById('temaSeccionId').value;
        const titulo = document.getElementById('temaTitulo').value.trim();
        
        if (!titulo) {
            alert('El título es obligatorio.');
            return;
        }
        
        if (!seccionId) {
            alert('Error: No se ha seleccionado una sección.');
            return;
        }
        
        // 🔧 CORRECCIÓN: Procesamiento robusto de recursos
        const recursosTexto = document.getElementById('temaRecursos').value;
        const recursos = recursosTexto
            .split('\n')
            .map(r => r.trim())
            .filter(r => r.length > 0);
        
        const datos = {
            seccionId: seccionId,
            fecha: document.getElementById('temaFecha').value,
            titulo: titulo,
            descripcion: document.getElementById('temaDescripcion').value,
            recursos: recursos,
            observaciones: document.getElementById('temaObservaciones').value,
            estado: document.getElementById('temaEstado').value
        };
        
        console.log('💾 Guardando tema con datos:', datos);
        
        if (id) {
            const i = state.temas.findIndex(x => x.id === id);
            if (i !== -1) {
                state.temas[i] = { ...state.temas[i], ...datos };
                console.log('✅ Tema actualizado:', state.temas[i]);
            }
        } else {
            const nuevoTema = { id: generarId('tema'), ...datos };
            state.temas.push(nuevoTema);
            console.log('✅ Tema nuevo creado:', nuevoTema);
        }
        
        const guardado = guardarEstado();
        if (guardado) {
            renderizar();
            cerrarModal('modalTema');
            console.log('✅ Modal cerrado y vista actualizada.');
        }
    } catch (error) {
        console.error('❌ Error al guardar el tema:', error);
        alert('Ha ocurrido un error al guardar: ' + error.message);
    }
});

// ==========================================
// IMPRIMIR / PDF
// ==========================================

function imprimirPDF() {
    window.print();
}

// ==========================================
// EXPORTAR / IMPORTAR
// ==========================================

function exportarDatos() {
    try {
        const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `programacion_fisiologia_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a); 
        a.click(); 
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (e) {
        console.error('Error al exportar:', e);
        alert('Error al exportar los datos.');
    }
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
                if (confirm('¿Importar estos datos? Se reemplazarán los datos actuales.')) {
                    state = datosMigrados;
                    guardarEstado(); renderizar();
                    alert('Datos importados correctamente.');
                }
            } else { 
                alert('El archivo no tiene el formato correcto.'); 
            }
        } catch (err) { 
            alert('Error al leer el archivo: ' + err.message); 
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

// ==========================================
// EVENT LISTENERS
// ==========================================

document.getElementById('btnAddSeccion').addEventListener('click', () => abrirModalSeccion());
document.getElementById('btnAddTema').addEventListener('click', () => {
    const secs = state.secciones.filter(s => s.tieneTemas);
    if (secs.length === 0) { 
        alert('Primero debes crear una sección que contenga temas (ej: Cronograma).'); 
        return; 
    }
    abrirModalTema(null, secs[0].id);
});
document.getElementById('btnPrint').addEventListener('click', imprimirPDF);
document.getElementById('btnExport').addEventListener('click', exportarDatos);
document.getElementById('btnImport').addEventListener('click', () => document.getElementById('fileInput').click());
document.getElementById('fileInput').addEventListener('change', importarDatos);
document.getElementById('btnReset').addEventListener('click', restablecerEstado);

document.querySelectorAll('.close, [data-modal]').forEach(el => {
    el.addEventListener('click', function() {
        const modalId = this.dataset.modal || (this.closest('.modal') ? this.closest('.modal').id : null);
        if (modalId) cerrarModal(modalId);
    });
});

window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) e.target.classList.remove('active');
});

// ==========================================
// INICIALIZACIÓN
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando Programación Didáctica...');
    cargarEstado();
    renderizar();
    console.log('✅ Aplicación lista. Temas cargados:', state.temas.length);
});
