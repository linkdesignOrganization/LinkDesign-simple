/**
 * VISTA DE REVISIÓN DE COPY — sólo para el branch `preview/copy-familias-seo`.
 *
 * Resalta en amarillo cada texto que cambió respecto de producción y muestra el
 * original al pasar el mouse. El botón de abajo a la izquierda apaga el resaltado
 * para ver el sitio tal como quedaría publicado.
 *
 * Vive fuera del bundle de Angular a propósito: no participa del build ni del SSR,
 * así que no puede romper la app. Para volver a producción se borra este archivo y
 * la línea que lo carga en `src/index.html`. Nada más.
 */
(function () {
  'use strict';

  /** Cada entrada: `de` (producción) → `a` (este branch). `meta` = no es texto visible. */
  var CAMBIOS = [
    { pag: "home", de: "Dos brazos. Un mismo criterio para construir software y webs a medida.", a: "Dos brazos. Un mismo criterio para construir software y páginas web a medida." },
    { pag: "home", de: "Website a la medida", a: "Páginas web a la medida" },
    { pag: "home", de: "Diseñamos webs a medida con identidad propia, performance, SEO y una experiencia visual clara desde el primer scroll.", a: "Diseñamos páginas web a medida con identidad propia, performance, SEO y una experiencia visual clara desde el primer scroll." },
    { pag: "/software", de: "Software construido alrededor de tu operación.", a: "Desarrollo de software alrededor de tu operación." },
    { pag: "/software", de: "No adaptas tu empresa al software. Construimos el software alrededor de cómo ya funciona tu operación.", a: "No adaptas tu empresa al software. Somos una empresa de desarrollo de software en Costa Rica y lo construimos alrededor de cómo ya funciona tu operación." },
    { pag: "/software", de: "Así trabajamos un proyecto.", a: "Así trabajamos un proyecto de desarrollo de software." },
    { pag: "/software", de: "Trabajamos principalmente con Angular para frontend, Node para backend y Azure para infraestructura, base de datos y servicios. También usamos Python, React y otras tecnologías según conveniencia técnica del proyecto. La pila final se define en el discovery, eligiendo lo que mejor encaja con la operación del cliente y la integración con sistemas existentes.", a: "Como empresa de tecnología en Costa Rica, trabajamos principalmente con Angular para frontend, Node para backend y Azure para infraestructura, base de datos y servicios. También usamos Python, React y otras tecnologías según conveniencia técnica del proyecto. La pila final se define en el discovery, eligiendo lo que mejor encaja con la operación del cliente y la integración con sistemas existentes." },
    { pag: "/en/software", de: "Software built around your operation.", a: "Custom software development around your operation." },
    { pag: "/en/software", de: "You don't adapt your company to the software. We build the software around how your operation already works.", a: "You don't adapt your company to the software. We're a custom software development company in Costa Rica, and we build it around how your operation already works." },
    { pag: "/en/software", de: "How we run a project.", a: "How we run a software development project." },
    { pag: "/en/software", de: "We work mainly with Angular for the frontend, Node for the backend and Azure for infrastructure, database and services. We also use Python, React and other technologies depending on the technical fit of the project. The final stack is defined during discovery, choosing what best fits the client's operation and the integration with existing systems.", a: "As a technology company in Costa Rica, we work mainly with Angular for the frontend, Node for the backend and Azure for infrastructure, database and services. We also use Python, React and other technologies depending on the technical fit of the project. The final stack is defined during discovery, choosing what best fits the client's operation and the integration with existing systems." },
    { pag: "/web", de: "Sitios web hechos en serio.", a: "Páginas web hechas en serio." },
    { pag: "/web", de: "Sin plantillas, sin atajos, sin constructores genéricos. Cada sitio se construye a medida de verdad.", a: "Sin plantillas, sin atajos, sin constructores genéricos. Desarrollo web a medida de verdad, en Costa Rica." },
    { pag: "/web", de: "Lo que hay detrás de cada sitio.", a: "Lo que hay detrás de cada página web." },
    { pag: "/web", de: "Desarrollamos con el mismo stack que usamos en sistemas empresariales en producción: Angular para frontend, Node para backend, Azure para infraestructura. La pila final se ajusta a la integración que tu empresa necesita.", a: "Hacemos desarrollo web con el mismo stack que usamos en sistemas empresariales en producción para empresas de Costa Rica: Angular para frontend, Node para backend, Azure para infraestructura. La pila final se ajusta a la integración que tu empresa necesita." },
    { pag: "/web", de: "Cada sitio se diseña primero para móvil y se construye con métricas de carga verificables. No solo se ve bien en distintos dispositivos, anda igual de rápido en cada uno.", a: "Cada página web se diseña primero para móvil y se construye con métricas de carga verificables. No solo se ve bien en distintos dispositivos, anda igual de rápido en cada uno." },
    { pag: "/web", de: "Cada diseño, desde cero.", a: "Cada diseño web, desde cero." },
    { pag: "/web", de: "Cada sitio parte de tu operación, no de una plantilla reciclada. Marca, jerarquía, ritmo y estructura se diseñan para tu empresa, no se eligen de un catálogo de temas. Si la marca o el negocio cambian con el tiempo, el sitio acompaña sin necesidad de rehacerlo entero.", a: "Cada diseño web parte de tu operación, no de una plantilla reciclada. Marca, jerarquía, ritmo y estructura se diseñan para tu empresa, no se eligen de un catálogo de temas. Si la marca o el negocio cambian con el tiempo, el sitio web acompaña sin necesidad de rehacerlo entero." },
    { pag: "/web", de: "Empresas que necesitan capturar leads de una campaña antes de tener un sitio completo", a: "Empresas que necesitan capturar leads de una campaña antes de tener una página web completa" },
    { pag: "/web", de: "Profesionales independientes que quieren un punto de contacto digital sin mantener un sitio extenso", a: "Profesionales independientes que quieren un punto de contacto digital sin mantener un sitio web extenso" },
    { pag: "/web", de: "Sitio corporativo", a: "Sitio web corporativo" },
    { pag: "/web", de: "Sitio con varias secciones pensado para empresas consolidadas que necesitan mostrar la operación completa: servicios, casos, equipo, novedades y canales de contacto. Estructura clara para representar la empresa con seriedad y darle al lead toda la información que necesita antes de tomar contacto.", a: "Sitio web con varias secciones pensado para empresas consolidadas que necesitan mostrar la operación completa: servicios, casos, equipo, novedades y canales de contacto. Estructura clara para representar la empresa con seriedad y darle al lead toda la información que necesita antes de tomar contacto." },
    { pag: "/web", de: "Empresas industriales o de servicios que necesitan mostrar capacidad operativa, cartera y casos", a: "Empresas costarricenses, industriales o de servicios, que necesitan mostrar capacidad operativa, cartera y casos" },
    { pag: "/web", de: "Empresas en expansión que necesitan un sitio profesional para apuntar a nuevos mercados", a: "Empresas en expansión que necesitan una página web profesional para apuntar a nuevos mercados" },
    { pag: "/web", de: "Tienda en línea desarrollada a medida, con catálogo, carrito, pagos integrados y panel propio para gestionar productos, stock y ventas. Construida para escalar con el negocio y adaptarse a las reglas comerciales reales, sin las limitaciones de una plataforma enlatada.", a: "Tienda en línea con desarrollo web a medida: catálogo, carrito, pagos integrados y panel propio para gestionar productos, stock y ventas. Construida para escalar con el negocio y adaptarse a las reglas comerciales reales, sin las limitaciones de una plataforma enlatada." },
    { pag: "/web", de: "Así trabajamos un proyecto.", a: "Así trabajamos un proyecto de desarrollo web." },
    { pag: "/web", de: "De la primera conversación al sitio publicado. Cuatro etapas con tiempos reales, sin promesas vacías.", a: "De la primera conversación a la página web publicada. Cuatro etapas de diseño web y programación, con tiempos reales y sin promesas vacías." },
    { pag: "/web", de: "Entendemos qué necesita comunicar tu empresa, a quién apunta y qué tipo de sitio le sirve. Salimos con un primer alcance estimado y plazos tentativos.", a: "Entendemos qué necesita comunicar tu empresa, a quién apunta y qué tipo de página web le sirve. Salimos con un primer alcance estimado y plazos tentativos." },
    { pag: "/web", de: "Mapeamos la audiencia, definimos arquitectura del sitio, dirección de diseño y estructura del contenido. Cerramos el alcance final y los criterios técnicos antes de tocar código.", a: "Mapeamos la audiencia, definimos la arquitectura del sitio web, la dirección del diseño web y la estructura del contenido. Cerramos el alcance final y los criterios técnicos antes de tocar código." },
    { pag: "/web", de: "Desarrollo", a: "Desarrollo web" },
    { pag: "/web", de: "Diseñamos, programamos y revisamos el sitio por etapas. Validas cada avance antes de seguir, sin sorpresas al final ni entregas de último momento.", a: "Diseñamos, programamos y revisamos el sitio web por etapas. Validas cada avance antes de seguir, sin sorpresas al final ni entregas de último momento." },
    { pag: "/web", de: "Configuramos dominio, hosting y métricas, publicamos el sitio y dejamos todo listo para empezar a captar tráfico y aparecer en buscadores.", a: "Configuramos dominio, hosting y métricas, publicamos el sitio y dejamos todo listo para empezar a captar tráfico y aparecer en las búsquedas de Costa Rica." },
    { pag: "/web", de: "¿Cuánto tiempo tarda un sitio web?", a: "¿Cuánto tiempo tarda una página web?" },
    { pag: "/web", de: "El plazo depende del alcance. Una landing puede estar lista en 3 a 4 semanas. Un sitio corporativo entre 6 y 10 semanas. Un e-commerce o sistema con integraciones entre 3 y 5 meses. El plazo exacto se define en la primera conversación y se respeta durante el proyecto. Avisamos antes si algo lo afecta, no después.", a: "El plazo depende del alcance. Una landing puede estar lista en 3 a 4 semanas. Un sitio web corporativo entre 6 y 10 semanas. Un e-commerce o sistema con integraciones entre 3 y 5 meses. El plazo exacto se define en la primera conversación y se respeta durante el proyecto. Avisamos antes si algo lo afecta, no después." },
    { pag: "/web", de: "¿Quién hace los textos y las imágenes del sitio?", a: "¿Quién hace los textos y las imágenes de la página web?" },
    { pag: "/web", de: "Cuando el cliente tiene contenido propio, lo usamos. Cuando no, podemos producir los textos a partir de entrevistas con tu equipo y conseguir o generar las imágenes según el tono del sitio. El contenido es parte del proyecto y se define al inicio, no se deja para último momento.", a: "Cuando el cliente tiene contenido propio, lo usamos. Cuando no, podemos producir los textos a partir de entrevistas con tu equipo y conseguir o generar las imágenes según el tono del diseño web. El contenido es parte del proyecto y se define al inicio, no se deja para último momento." },
    { pag: "/web", de: "¿Cómo funciona el soporte después de entregar el sitio?", a: "¿Cómo funciona el soporte después de entregar el sitio web?" },
    { pag: "/web", de: "Cada sitio se entrega con un año de garantía funcional. Durante ese período corregimos sin costo cualquier error que aparezca. Como el sitio se desarrolla, se prueba y se valida antes de salir, no necesita mantenimiento constante para seguir funcionando. Si más adelante necesitas un cambio o una nueva funcionalidad, cotizamos ese trabajo puntual. No tenemos cobros recurrentes por servicios que un sitio a medida no necesita.", a: "Cada sitio web se entrega con un año de garantía funcional. Durante ese período corregimos sin costo cualquier error que aparezca. Como el sitio se desarrolla, se prueba y se valida antes de salir, no necesita mantenimiento constante para seguir funcionando. Si más adelante necesitas un cambio o una nueva funcionalidad, cotizamos ese trabajo puntual. No tenemos cobros recurrentes por servicios que un sitio a medida no necesita." },
    { pag: "/web", de: "Sí. Los sitios incluyen un panel propio para que tu equipo actualice textos, imágenes, productos, novedades y lo que corresponda según el tipo de sitio. El panel se diseña para ser claro, sin necesidad de conocimientos técnicos. Para cambios estructurales o de diseño, nos encargamos nosotros.", a: "Sí. Las páginas web incluyen un panel propio para que tu equipo actualice textos, imágenes, productos, novedades y lo que corresponda según el tipo de sitio. El panel se diseña para ser claro, sin necesidad de conocimientos técnicos. Para cambios estructurales o de diseño web, nos encargamos nosotros." },
    { pag: "/web", de: "¿Cómo aseguran que el sitio aparezca bien en Google?", a: "¿Cómo aseguran que la página web aparezca bien en Google?" },
    { pag: "/web", de: "Aplicamos buenas prácticas de SEO técnico desde la arquitectura del sitio: velocidad de carga, estructura HTML semántica, metadatos, sitemap y datos estructurados. Esa base deja al sitio en condiciones óptimas para ser indexado. La estrategia de contenido y el posicionamiento por palabras clave son un servicio aparte que coordinamos con especialistas cuando el cliente lo necesita.", a: "Aplicamos buenas prácticas de SEO técnico desde la arquitectura del sitio web: velocidad de carga, estructura HTML semántica, metadatos, sitemap y datos estructurados. Esa base deja a la página web en condiciones óptimas para ser indexada y competir en las búsquedas de Costa Rica. La estrategia de contenido y el posicionamiento por palabras clave son un servicio aparte que coordinamos con especialistas cuando el cliente lo necesita." },
    { pag: "/web", de: "¿Pueden integrar el sitio con sistemas que ya usamos?", a: "¿Pueden integrar el sitio web con sistemas que ya usamos?" },
    { pag: "/web", de: "Sí. Conectamos el sitio con CRM, ERP, plataformas de email marketing, herramientas de analytics y otros sistemas según la integración que necesites. Cuando el sitio se construye a medida, corre sobre código propio (sin plugins de plataformas cerradas), así las integraciones quedan estables a largo plazo.", a: "Sí. Conectamos el sitio web con CRM, ERP, plataformas de email marketing, herramientas de analytics y otros sistemas según la integración que necesites. Cuando el desarrollo web se hace a medida, corre sobre código propio (sin plugins de plataformas cerradas), así las integraciones quedan estables a largo plazo." },
    { pag: "/en/web", de: "Real websites. Real code.", a: "Real web design. Real code." },
    { pag: "/en/web", de: "No templates. No shortcuts. No generic builders. Every site is built from code.", a: "No templates. No shortcuts. No generic builders. Custom web design and development in Costa Rica, every site built from code." },
    { pag: "/en/web", de: "What's behind every site.", a: "What's behind every website." },
    { pag: "/en/web", de: "Every design, from scratch.", a: "Every web design, from scratch." },
    { pag: "/en/web", de: "How we run a project.", a: "How we run a web development project." },
    { pag: "formulario", de: "Sitio web", a: "Página web" },
    { pag: "metadatos", meta: "no se ve en la página", de: "Software a medida para empresas | Link Design CR", a: "Desarrollo de software a medida | Link Design Costa Rica" },
    { pag: "metadatos", meta: "no se ve en la página", de: "Aplicaciones internas, automatización e integración tecnológica. Creamos software a medida que ordena procesos y mejora la productividad.", a: "Empresa de desarrollo de software en Costa Rica: aplicaciones internas, automatización e integración tecnológica que ordenan procesos y mejoran la productividad." },
    { pag: "metadatos", meta: "no se ve en la página", de: "Custom software for companies | Link Design CR", a: "Custom software development | Link Design Costa Rica" },
    { pag: "metadatos", meta: "no se ve en la página", de: "Internal apps, automation and tech integration. We build custom software that organizes processes and boosts productivity.", a: "Custom software development company in Costa Rica: internal apps, automation and tech integration that organize processes and boost productivity." },
    { pag: "metadatos", meta: "no se ve en la página", de: "Desarrollo web a medida | Link Design Costa Rica", a: "Diseño y desarrollo de páginas web | Link Design Costa Rica" },
    { pag: "metadatos", meta: "no se ve en la página", de: "Sitios web corporativos, e-commerce y landing pages a medida. Diseño moderno, rendimiento y escalabilidad para empresas en Costa Rica.", a: "Páginas web corporativas, e-commerce y landing pages a medida. Diseño y desarrollo web con rendimiento y escalabilidad para empresas en Costa Rica." },
    { pag: "metadatos", meta: "no se ve en la página", de: "Custom web development | Link Design Costa Rica", a: "Web design and development | Link Design Costa Rica" },
    { pag: "metadatos", meta: "no se ve en la página", de: "Custom corporate websites, e-commerce and landing pages. Modern design, performance and scalability for companies in Costa Rica.", a: "Custom web design and development in Costa Rica: corporate websites, e-commerce and landing pages, with performance and scalability for growing companies." }
  ];

  var VISIBLES = CAMBIOS.filter(function (c) { return !c.meta; })
    // los textos largos primero: evita que un fragmento corto marque de más
    .sort(function (a, b) { return b.a.length - a.a.length; });

  var CORTO = 25;                 // por debajo de esto exigimos que el nodo entero coincida
  var raiz = document.documentElement;

  // ── estilos ────────────────────────────────────────────────────────────────
  var css = document.createElement('style');
  css.textContent = [
    'mark.pvd{background:transparent;color:inherit;padding:0;border-radius:0;transition:background .15s}',
    'html.pvd-on mark.pvd{background:#ffe14d;color:#1c1400!important;',
    '  -webkit-box-decoration-break:clone;box-decoration-break:clone;',
    '  padding:.05em .12em;border-radius:2px;box-shadow:0 0 0 1px rgba(160,120,0,.35);cursor:help}',
    'html.pvd-on mark.pvd *{color:#1c1400!important}',
    '#pvd-tip{position:fixed;z-index:2147483647;max-width:min(34rem,88vw);display:none;',
    '  background:#101820;color:#f2f6fa;border:1px solid #3a4a5c;border-radius:4px;',
    '  padding:.6rem .8rem;font:400 13px/1.5 system-ui,sans-serif;box-shadow:0 8px 28px rgba(0,0,0,.45)}',
    '#pvd-tip b{display:block;font:600 10px/1 ui-monospace,monospace;letter-spacing:.12em;',
    '  text-transform:uppercase;color:#8fa6bd;margin-bottom:.4rem}',
    '#pvd-bar{position:fixed;left:16px;bottom:16px;z-index:2147483646;display:flex;gap:6px;',
    '  font:500 13px/1 system-ui,sans-serif}',
    '#pvd-bar button{border:1px solid #3a4a5c;background:#101820;color:#f2f6fa;border-radius:999px;',
    '  padding:.6rem .95rem;cursor:pointer;font:inherit;box-shadow:0 4px 16px rgba(0,0,0,.35)}',
    '#pvd-bar button:hover{background:#1b2836}',
    '#pvd-bar button[data-on="1"]{background:#ffe14d;color:#1c1400;border-color:#d9b400}',
    '#pvd-panel{position:fixed;inset:auto 16px 68px 16px;max-height:66vh;overflow:auto;z-index:2147483646;',
    '  display:none;background:#0d1620;color:#e8eff7;border:1px solid #33465a;border-radius:6px;',
    '  padding:1rem 1.1rem;font:400 13px/1.55 system-ui,sans-serif;box-shadow:0 12px 40px rgba(0,0,0,.5)}',
    '@media(min-width:56rem){#pvd-panel{inset:auto 16px 68px auto;width:44rem}}',
    '#pvd-panel h4{margin:0 0 .8rem;font:600 14px/1.3 system-ui,sans-serif}',
    '#pvd-panel .r{padding:.55rem 0;border-top:1px solid #22323f}',
    '#pvd-panel .p{font:600 10px/1 ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase;color:#7f97ae}',
    '#pvd-panel .d{color:#9fb0c2;text-decoration:line-through;text-decoration-color:#6b7c8e}',
    '#pvd-panel .a{color:#ffe14d}'
  ].join('');
  document.head.appendChild(css);

  // ── marcado ────────────────────────────────────────────────────────────────
  var esp = /\s+/g;
  function n(s) { return s.replace(esp, ' ').trim(); }

  function envolver(nodo, desde, largo, original) {
    var objetivo = nodo;
    if (desde > 0) objetivo = objetivo.splitText(desde);
    if (largo != null && objetivo.nodeValue.length > largo) objetivo.splitText(largo);
    var m = document.createElement('mark');
    m.className = 'pvd';
    m.setAttribute('data-pvd', original);
    objetivo.parentNode.replaceChild(m, objetivo);
    m.appendChild(objetivo);
    return m;
  }

  var VETADOS = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1, MARK: 1 };

  function marcar() {
    var vistos = 0;
    for (var i = 0; i < VISIBLES.length; i++) {
      var c = VISIBLES[i];
      var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode: function (t) {
          if (!t.nodeValue || !t.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          var p = t.parentNode;
          while (p && p !== document.body) {
            // ...y la propia herramienta no se marca a sí misma: el panel de la lista
            // contiene los textos nuevos y si no, se pinta entero de amarillo.
            if (VETADOS[p.nodeName] || (p.id && p.id.indexOf('pvd-') === 0)) return NodeFilter.FILTER_REJECT;
            p = p.parentNode;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      var pendientes = [], t;
      while ((t = w.nextNode())) pendientes.push(t);

      for (var j = 0; j < pendientes.length; j++) {
        var nodo = pendientes[j];
        if (!nodo.parentNode) continue;
        var crudo = nodo.nodeValue;
        var idx = crudo.indexOf(c.a);
        if (idx >= 0) {
          // el texto corto sólo cuenta si el nodo entero es ese texto
          if (c.a.length < CORTO && n(crudo) !== n(c.a)) continue;
          envolver(nodo, idx, c.a.length, c.de);
          vistos++;
        } else if (c.a.length >= CORTO && n(crudo).indexOf(n(c.a)) >= 0) {
          // mismo texto pero con espacios o saltos de línea de por medio
          envolver(nodo, 0, null, c.de);
          vistos++;
        }
      }
    }
    return vistos;
  }

  // ── tooltip con el texto original ──────────────────────────────────────────
  var tip = document.createElement('div');
  tip.id = 'pvd-tip';
  function mostrarTip(m) {
    tip.innerHTML = '';
    var b = document.createElement('b');
    b.textContent = 'Texto actual en producción';
    var s = document.createElement('span');
    s.textContent = m.getAttribute('data-pvd');
    tip.appendChild(b);
    tip.appendChild(s);
    tip.style.display = 'block';
    var r = m.getBoundingClientRect(), h = tip.offsetHeight, w = tip.offsetWidth;
    var top = r.top - h - 10;
    if (top < 8) top = Math.min(r.bottom + 10, window.innerHeight - h - 8);
    var left = Math.max(8, Math.min(r.left, window.innerWidth - w - 8));
    tip.style.top = top + 'px';
    tip.style.left = left + 'px';
  }
  document.addEventListener('mouseover', function (e) {
    var m = e.target && e.target.closest ? e.target.closest('mark.pvd') : null;
    if (m && raiz.classList.contains('pvd-on')) mostrarTip(m);
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target && e.target.closest && e.target.closest('mark.pvd')) tip.style.display = 'none';
  });
  document.addEventListener('scroll', function () { tip.style.display = 'none'; }, true);

  // ── barra y panel ──────────────────────────────────────────────────────────
  var barra = document.createElement('div');
  barra.id = 'pvd-bar';
  var bToggle = document.createElement('button');
  var bLista = document.createElement('button');
  bLista.textContent = 'Ver lista';
  barra.appendChild(bToggle);
  barra.appendChild(bLista);

  var panel = document.createElement('div');
  panel.id = 'pvd-panel';

  function pintarPanel() {
    panel.innerHTML = '';
    var h = document.createElement('h4');
    h.textContent = 'Todos los cambios de copy (' + CAMBIOS.length + ')';
    panel.appendChild(h);
    CAMBIOS.forEach(function (c) {
      var r = document.createElement('div'); r.className = 'r';
      var p = document.createElement('div'); p.className = 'p';
      p.textContent = c.pag + (c.meta ? ' · ' + c.meta : '');
      var d = document.createElement('div'); d.className = 'd'; d.textContent = c.de;
      var a = document.createElement('div'); a.className = 'a'; a.textContent = c.a;
      r.appendChild(p); r.appendChild(d); r.appendChild(a);
      panel.appendChild(r);
    });
  }

  function refrescarBoton() {
    var on = raiz.classList.contains('pvd-on');
    var n = document.querySelectorAll('mark.pvd').length;
    bToggle.textContent = (on ? '● ' : '○ ') + n + ' cambios en esta página';
    bToggle.setAttribute('data-on', on ? '1' : '0');
  }

  bToggle.addEventListener('click', function () {
    raiz.classList.toggle('pvd-on');
    tip.style.display = 'none';
    refrescarBoton();
  });
  bLista.addEventListener('click', function () {
    var abierto = panel.style.display === 'block';
    panel.style.display = abierto ? 'none' : 'block';
    bLista.textContent = abierto ? 'Ver lista' : 'Cerrar lista';
  });

  // ── arranque, y re-marcado cuando Angular cambia de página ────────────────
  var pendiente = null;
  function pasada() {
    marcar();
    refrescarBoton();
  }
  function agendar() {
    clearTimeout(pendiente);
    pendiente = setTimeout(pasada, 120);
  }

  function iniciar() {
    document.body.appendChild(tip);
    document.body.appendChild(barra);
    document.body.appendChild(panel);
    pintarPanel();
    raiz.classList.add('pvd-on');
    pasada();
    // Angular hidrata después del primer render y reescribe nodos al navegar.
    new MutationObserver(agendar).observe(document.body, { childList: true, subtree: true });
    setTimeout(pasada, 600);
    setTimeout(pasada, 1800);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
