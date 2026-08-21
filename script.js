const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const header = document.querySelector('[data-header]');
const toggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const introSequence=document.querySelector('[data-intro-sequence]');
const introCanvas=document.querySelector('[data-intro-globe]');
const introSkip=document.querySelector('[data-intro-skip]');
if(introSequence&&introCanvas instanceof HTMLCanvasElement){
  let introFrame=0,start=0;
  const finish=()=>{cancelAnimationFrame(introFrame);introSequence.classList.add('is-complete');document.body.classList.remove('intro-active')};
  if(reducedMotion.matches)finish();else{
    document.body.classList.add('intro-active');
    const ctx=introCanvas.getContext('2d',{alpha:true});
    const points=Array.from({length:132},(_,i)=>{const y=1-i/131*2,r=Math.sqrt(1-y*y),a=Math.PI*(3-Math.sqrt(5))*i;return{x:Math.cos(a)*r,y,z:Math.sin(a)*r,seed:(i*37)%101}});
    const stars=Array.from({length:86},(_,i)=>({x:((i*73)%101)/101,y:((i*47)%97)/97,size:.4+(i%5)*.25,depth:.2+((i*31)%79)/79}));
    const resize=()=>{const d=Math.min(devicePixelRatio||1,1.5);introCanvas.width=Math.round(innerWidth*d);introCanvas.height=Math.round(innerHeight*d);ctx.setTransform(d,0,0,d,0,0)};
    const draw=t=>{if(!start)start=t;const e=t-start,w=innerWidth,h=innerHeight,back=Math.max(0,Math.min(1,(e-2700)/1800)),r=Math.min(w,h)*.235*(1-back*.18),cx=w*.5,cy=h*(.47-back*.025),rot=e*.00022;ctx.clearRect(0,0,w,h);stars.forEach((s,i)=>{const x=((s.x+e*.000012*(s.depth+.2))%1)*w,y=s.y*h+Math.sin(e*.0005+i)*3;ctx.fillStyle=`rgba(199,71,186,${.05+s.depth*.16})`;ctx.fillRect(x,y,s.size,s.size)});const glow=ctx.createRadialGradient(cx,cy,r*.12,cx,cy,r*1.45);glow.addColorStop(0,'rgba(225,65,210,.2)');glow.addColorStop(.45,'rgba(91,31,118,.09)');glow.addColorStop(1,'rgba(11,12,15,0)');ctx.fillStyle=glow;ctx.fillRect(cx-r*1.6,cy-r*1.6,r*3.2,r*3.2);const p=points.map(q=>{const x=q.x*Math.cos(rot)-q.z*Math.sin(rot),z=q.x*Math.sin(rot)+q.z*Math.cos(rot),s=.83+z*.17;return{x:cx+x*r*s,y:cy+q.y*r*s,z,seed:q.seed}});p.forEach((q,i)=>{if(q.z<-.35)return;const alpha=.12+(q.z+1)*.2;p.slice(i+1).forEach(o=>{const d=Math.hypot(q.x-o.x,q.y-o.y);if(o.z<-.35||Math.abs(q.z-o.z)>.2||d>r*.24)return;ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(o.x,o.y);ctx.strokeStyle=`rgba(199,71,186,${alpha*.16*(1-d/(r*.24))})`;ctx.lineWidth=.55;ctx.stroke()});const s=1+(q.seed%4)*.55+Math.max(0,q.z)*1.4;ctx.fillStyle=q.seed%7===0?`rgba(240,141,108,${alpha*1.35})`:`rgba(220,120,226,${alpha})`;ctx.fillRect(q.x-s/2,q.y-s/2,s,s)});ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.strokeStyle='rgba(230,148,232,.13)';ctx.lineWidth=.8;ctx.stroke();if(e<6200&&!introSequence.classList.contains('is-complete'))introFrame=requestAnimationFrame(draw);else finish()};
    introSkip?.addEventListener('click',finish);window.addEventListener('resize',resize,{passive:true});resize();introFrame=requestAnimationFrame(draw);
  }
}
const translations = {
  pt: {
    '.landcast .eyebrow': '<span></span> Ideias em movimento', '.landcast .display-title': 'Conversas sobre<br><span>tecnologia e futuro.</span>', '.landcast-channel': 'Ver canal no YouTube <span aria-hidden="true">↗</span>',
    '.main-nav a[href="#ia"]': 'IA', '.main-nav a[href="#solucoes"]': 'Soluções', '.main-nav a[href="#cases"]': 'Cases', '.main-nav a[href="#anthropic"]': 'Anthropic', '.main-nav a[href="#sobre"]': 'Sobre',
    '.nav-cta': 'Fale conosco <span aria-hidden="true">↗</span>',
    '.partner-banner-copy > p': '<span></span> Parceria oficial · Claude Partner Network', '.partner-banner-copy h2': 'Land IT <strong>+</strong> Anthropic', '.partner-banner-copy > span': 'Engenharia, agentes e soluções de IA para desafios empresariais reais.', '.partner-banner-action': 'Conheça a parceria <span aria-hidden="true">↘</span>',
    '.hero-copy .eyebrow': '<span></span> Parceira oficial Anthropic · Brasil', '.hero h1': '<span class="partner-name">Land IT <b>+</b> Anthropic</span><em>IA não é apenas o que fazemos. É como construímos.</em>', '.hero-lead': 'Inteligência artificial no centro da nossa engenharia, produtos e soluções.', '.hero-actions a:first-child': 'Conheça nossas soluções <span aria-hidden="true">↓</span>', '.hero-actions a:last-child': 'Fale com a Land IT <span aria-hidden="true">↗</span>', '.hero-foot span:nth-child(1)': 'Estratégia', '.hero-foot span:nth-child(3)': 'Engenharia', '.hero-foot span:nth-child(5)': 'Produto', '.hero-foot a': 'Explore <span aria-hidden="true">↓</span>', '.system-caption span:first-child': 'LAND / SISTEMA DE INTELIGÊNCIA', '.system-caption span:last-child': 'ATIVO', '.partnership-proof .eyebrow': '<span></span> Parceria oficial', '.partnership-proof h2': 'Land IT <b>+</b> <span>Anthropic</span>', '.partnership-proof-copy > p:last-child': 'Construindo a próxima geração de soluções empresariais com Claude.', '.partnership-flow': '<strong>Land IT</strong><i aria-hidden="true">→</i><strong>Claude</strong><i aria-hidden="true">→</i><strong>Soluções AI</strong>',
    '.future .section-index span:last-child': 'O futuro', '.future-kicker': 'A próxima geração de empresas não será definida por quem apenas usa IA.', '.future .display-title': 'Será definida por quem a coloca no <span>centro.</span>', '.future-note p': 'Conectamos visão de negócio, dados e engenharia para transformar potencial em sistemas que operam no mundo real.',
    '.foundation .section-index span:last-child': 'Inteligência', '.foundation .display-title': 'IA não é um recurso.<br><span>É a fundação.</span>', '.foundation-head > p': 'Da estratégia à implementação, construímos produtos em que inteligência artificial faz parte da arquitetura — não apenas da interface.',
    '.pillar-card:nth-child(1) h3': 'Estratégia de IA', '.pillar-card:nth-child(1) p': 'Descoberta, priorização e desenho de oportunidades viáveis para o negócio.', '.pillar-card:nth-child(2) h3': 'Engenharia de IA', '.pillar-card:nth-child(2) p': 'Arquitetura, integração e construção de soluções inteligentes e seguras.', '.pillar-card:nth-child(3) h3': 'Produtos de IA', '.pillar-card:nth-child(3) p': 'Produtos digitais preparados para aprender, evoluir e escalar.',
    '.solutions .section-index span:last-child': 'Soluções', '.solutions .eyebrow': '<span></span> O que construímos', '.solutions .display-title': 'Da ideia ao sistema.<br><span>Sem ruído.</span>', '.section-heading > p': 'Estratégia, engenharia e IA para colocar produtos reais em movimento.',
    '.solution-card:nth-child(1) h3': 'IA e Automação', '.solution-card:nth-child(2) h3': 'Dados e Inteligência', '.solution-card:nth-child(3) h3': 'Produtos Digitais', '.solution-card:nth-child(4) h3': 'IA Empresarial', '.solution-card:nth-child(5) h3': 'Engenharia de Software', '.solution-card:nth-child(6) h3': 'Agentes de IA',
    '.solution-card:nth-child(1) p': 'Automação inteligente aplicada a processos reais.', '.solution-card:nth-child(2) p': 'Dados estruturados para decisões rápidas e confiáveis.', '.solution-card:nth-child(3) p': 'Do conceito à operação: produtos inteligentes feitos para evoluir.', '.solution-card:nth-child(4) p': 'IA integrada a operações, governança e sistemas complexos.', '.solution-card:nth-child(5) p': 'Arquitetura e desenvolvimento de plataformas robustas.', '.solution-card:nth-child(6) p': 'Agentes conectados a fluxos, dados e objetivos de negócio.', '.solution-card a': 'Explorar solução <span>↗</span>', '.solution-card-featured a': 'Conheça o Land Flow <span>→</span>',
    '.signal-one strong': 'Raciocinar', '.signal-two strong': 'Construir', '.signal-three strong': 'Escalar', '.system-core small': 'NÚCLEO', '.system-partner-tag small': 'Land IT × Anthropic', '.system-partner-tag strong': 'Parceira oficial · Brasil',
    '.cases .section-index span:last-child': 'Resultados selecionados', '.cases .display-title': 'Da ideia à<br><span>inteligência.</span>', '.cases-heading > p': 'Resultados divulgados pela Land IT em projetos para operações complexas, com clientes preservados.', '.case-row:nth-child(1) .case-meta p': 'Auditoria e consultoria', '.case-row:nth-child(2) .case-meta p': 'Nuvem empresarial', '.case-row:nth-child(3) .case-meta p': 'Estratégia digital', '.evidence-note': 'Os resultados acima reproduzem informações publicadas no website institucional anterior da Land IT. Escopo e impacto variam conforme cada projeto.',
    '.case-flow div:nth-child(1) small': 'Problema', '.case-flow div:nth-child(3) small': 'Inteligência', '.case-flow div:nth-child(5) small': 'Impacto publicado', '.case-row:nth-child(1) .case-flow div:nth-child(1) strong': 'Cálculo manual de restituição', '.case-row:nth-child(1) .case-flow div:nth-child(3) strong': 'Automação algorítmica', '.case-row:nth-child(1) .case-flow div:nth-child(5) strong': 'De 6 meses para horas', '.case-row:nth-child(2) .case-flow div:nth-child(1) strong': 'Infraestrutura legada', '.case-row:nth-child(2) .case-flow div:nth-child(3) strong': 'Nuvem + modernização', '.case-row:nth-child(2) .case-flow div:nth-child(5) strong': 'Operação mais eficiente', '.case-row:nth-child(3) .case-flow div:nth-child(1) strong': 'Visão estratégica limitada', '.case-row:nth-child(3) .case-flow div:nth-child(3) strong': 'Estratégia orientada a dados', '.case-row:nth-child(3) .case-flow div:nth-child(5) strong': 'Crescimento mensurável', '.case-row:nth-child(1) .case-result span': 'de redução no tempo do projeto', '.case-row:nth-child(2) .case-result span': 'de redução de custos de TI', '.case-row:nth-child(3) .case-result span': 'de aumento de receita',
    '.anthropic-copy .eyebrow': '<span></span> Parceira oficial Anthropic · Brasil', '.anthropic-copy .display-title': 'Land IT +<br><span>Anthropic.</span>', '.anthropic-copy > p:not(.eyebrow):not(.partner-verified)': 'Como parceira oficial da Anthropic no Brasil, aplicamos Claude em soluções que combinam contexto, automação e engenharia de software para desafios empresariais reais.', '.partner-verified': '<span aria-hidden="true">✓</span> Parceria verificada no Claude Partner Network', '.anthropic-copy .button': 'Conheça Claude na Anthropic <span aria-hidden="true">↗</span>', '.scene-brand small': 'PARCEIRA OFICIAL · BRASIL', '.anthropic-scene > p': 'MOVA PARA EXPLORAR <span>↗</span>',
    '.why .section-index span:last-child': 'Por que Land IT', '.why .display-title': 'Estratégia para decidir.<br>Engenharia para <span>entregar.</span>', '.why-list article:nth-child(1) h3': 'Do problema à produção', '.why-list article:nth-child(1) p': 'Conectamos descoberta, POC, produto e evolução em uma jornada coerente.', '.why-list article:nth-child(2) h3': 'IA integrada ao negócio', '.why-list article:nth-child(2) p': 'Tecnologia desenhada em torno de processos, dados e decisões reais.', '.why-list article:nth-child(3) h3': 'Software com visão de futuro', '.why-list article:nth-child(3) p': 'Arquitetura preparada para operar hoje e continuar evoluindo amanhã.',
    '.manifesto .eyebrow': '<span></span> Nossa visão', '.manifesto-title': '<span class="reveal is-visible">O futuro não espera.</span><span class="reveal is-visible">Nós o construímos.</span>', '.manifesto-inner > p:last-child': 'A próxima geração de empresas será construída com inteligência artificial no centro. Nosso trabalho é transformar essa possibilidade em tecnologia real.',
    '.contact .eyebrow': '<span></span> Comece uma conversa', '.contact .display-title': 'Pronto para construir<br><span>o que vem a seguir?</span>', '.contact-inner > p:not(.eyebrow)': 'Vamos transformar sua próxima oportunidade em uma solução inteligente.', '.contact .button': 'Falar com a Land IT <span aria-hidden="true">↗</span>', '.footer-intro p': 'Conectando dados, sistemas e pessoas com inteligência aplicada.', '.footer-column:nth-child(2) h2': 'Empresa', '.footer-column:nth-child(3) h2': 'Recursos', '.footer-contact h2': 'Contato', '.footer-column:nth-child(2) a:nth-of-type(1)': 'Soluções', '.footer-column:nth-child(2) a:nth-of-type(2)': 'Resultados', '.footer-column:nth-child(2) a:nth-of-type(3)': 'Contato', '.footer-column:nth-child(3) a:nth-of-type(1)': 'Anthropic', '.footer-column:nth-child(3) a:nth-of-type(2)': 'Land Flow', '.footer-column:nth-child(3) a:nth-of-type(3)': 'rh@landtech.com.br', '.footer-bottom > span:first-child': '© <span data-year></span> Land IT. Todos os direitos reservados.', '.footer-legal a': 'Política de Privacidade'
  },
  en: {
    '.landcast .eyebrow': '<span></span> Ideas in motion', '.landcast .display-title': 'Conversations about<br><span>technology and the future.</span>', '.landcast-channel': 'View channel on YouTube <span aria-hidden="true">↗</span>',
    '.main-nav a[href="#ia"]': 'AI', '.main-nav a[href="#solucoes"]': 'Solutions', '.main-nav a[href="#cases"]': 'Cases', '.main-nav a[href="#anthropic"]': 'Anthropic', '.main-nav a[href="#sobre"]': 'About', '.nav-cta': 'Talk to us <span aria-hidden="true">↗</span>',
    '.partner-banner-copy > p': '<span></span> Official partnership · Claude Partner Network', '.partner-banner-copy h2': 'Land IT <strong>+</strong> Anthropic', '.partner-banner-copy > span': 'Engineering, agents and AI solutions for real enterprise challenges.', '.partner-banner-action': 'Explore the partnership <span aria-hidden="true">↘</span>',
    '.hero-copy .eyebrow': '<span></span> Official Anthropic Partner · Brazil', '.hero h1': '<span class="partner-name">Land IT <b>+</b> Anthropic</span><em>AI is not just what we do. It is how we build.</em>', '.hero-lead': 'Artificial intelligence at the core of our engineering, products and solutions.', '.hero-actions a:first-child': 'Explore our solutions <span aria-hidden="true">↓</span>', '.hero-actions a:last-child': 'Talk to Land IT <span aria-hidden="true">↗</span>', '.hero-foot span:nth-child(1)': 'Strategy', '.hero-foot span:nth-child(3)': 'Engineering', '.hero-foot span:nth-child(5)': 'Product', '.hero-foot a': 'Explore <span aria-hidden="true">↓</span>', '.system-caption span:first-child': 'LAND / INTELLIGENCE SYSTEM', '.system-caption span:last-child': 'ONLINE', '.partnership-proof .eyebrow': '<span></span> Official partnership', '.partnership-proof h2': 'Land IT <b>+</b> <span>Anthropic</span>', '.partnership-proof-copy > p:last-child': 'Building the next generation of enterprise solutions with Claude.', '.partnership-flow': '<strong>Land IT</strong><i aria-hidden="true">→</i><strong>Claude</strong><i aria-hidden="true">→</i><strong>AI Solutions</strong>',
    '.future .section-index span:last-child': 'The future', '.future-kicker': 'The next generation of companies will not be defined by those who simply use AI.', '.future .display-title': 'It will be defined by those who put it at the <span>core.</span>', '.future-note p': 'We connect business vision, data and engineering to turn potential into systems that operate in the real world.',
    '.foundation .section-index span:last-child': 'Intelligence', '.foundation .display-title': 'AI is not a feature.<br><span>It is the foundation.</span>', '.foundation-head > p': 'From strategy to implementation, we build products where artificial intelligence is part of the architecture — not just the interface.',
    '.pillar-card:nth-child(1) h3': 'AI Strategy', '.pillar-card:nth-child(1) p': 'Discovery, prioritization and design of viable business opportunities.', '.pillar-card:nth-child(2) h3': 'AI Engineering', '.pillar-card:nth-child(2) p': 'Architecture, integration and delivery of intelligent, secure solutions.', '.pillar-card:nth-child(3) h3': 'AI Products', '.pillar-card:nth-child(3) p': 'Digital products designed to learn, evolve and scale.',
    '.solutions .section-index span:last-child': 'Solutions', '.solutions .eyebrow': '<span></span> What we build', '.solutions .display-title': 'From idea to system.<br><span>No noise.</span>', '.section-heading > p': 'Strategy, engineering and AI to put real products in motion.', '.solution-card a': 'Explore solution <span>↗</span>', '.solution-card-featured a': 'Discover Land Flow <span>→</span>',
    '.solution-card:nth-child(1) h3': 'AI & Automation', '.solution-card:nth-child(2) h3': 'Data & Intelligence', '.solution-card:nth-child(3) h3': 'Digital Products', '.solution-card:nth-child(4) h3': 'Enterprise AI', '.solution-card:nth-child(5) h3': 'Software Engineering', '.solution-card:nth-child(6) h3': 'AI Agents', '.signal-one strong': 'Reason', '.signal-two strong': 'Build', '.signal-three strong': 'Scale', '.system-core small': 'CORE', '.system-partner-tag small': 'Land IT × Anthropic', '.system-partner-tag strong': 'Official Partner · Brazil',
    '.solution-card:nth-child(1) p': 'Intelligent automation applied to real processes.', '.solution-card:nth-child(2) p': 'Structured data for fast, reliable decisions.', '.solution-card:nth-child(3) p': 'Digital experiences built for performance and evolution.', '.solution-card:nth-child(4) p': 'AI integrated into operations, governance and complex systems.', '.solution-card:nth-child(5) p': 'Architecture and development of robust platforms.', '.solution-card:nth-child(6) p': 'Agents connected to workflows, data and business goals.',
    '.cases .section-index span:last-child': 'Selected outcomes', '.cases .display-title': 'From idea to<br><span>intelligence.</span>', '.cases-heading > p': 'Results published by Land IT from complex operations projects, with client identities protected.', '.case-row:nth-child(1) .case-meta p': 'Audit & consulting', '.case-row:nth-child(2) .case-meta p': 'Enterprise cloud', '.case-row:nth-child(3) .case-meta p': 'Digital strategy', '.case-flow div:nth-child(1) small': 'Problem', '.case-flow div:nth-child(3) small': 'Intelligence', '.case-flow div:nth-child(5) small': 'Published impact', '.case-row:nth-child(1) .case-flow div:nth-child(1) strong': 'Manual tax refund calculation', '.case-row:nth-child(1) .case-flow div:nth-child(3) strong': 'Algorithmic automation', '.case-row:nth-child(1) .case-flow div:nth-child(5) strong': 'From 6 months to hours', '.case-row:nth-child(2) .case-flow div:nth-child(1) strong': 'Legacy infrastructure', '.case-row:nth-child(2) .case-flow div:nth-child(3) strong': 'Cloud + modernization', '.case-row:nth-child(2) .case-flow div:nth-child(5) strong': 'More efficient operations', '.case-row:nth-child(3) .case-flow div:nth-child(1) strong': 'Limited strategic vision', '.case-row:nth-child(3) .case-flow div:nth-child(3) strong': 'Data-driven strategy', '.case-row:nth-child(3) .case-flow div:nth-child(5) strong': 'Measurable growth', '.case-row:nth-child(1) .case-result span': 'reduction in project delivery time', '.case-row:nth-child(2) .case-result span': 'reduction in IT costs', '.case-row:nth-child(3) .case-result span': 'increase in revenue', '.evidence-note': 'The results above reproduce information published on Land IT\'s previous institutional website. Scope and impact vary by project.',
    '.anthropic-copy .eyebrow': '<span></span> Official Anthropic Partner · Brazil', '.anthropic-copy .display-title': 'Land IT +<br><span>Anthropic.</span>', '.anthropic-copy > p:not(.eyebrow):not(.partner-verified)': 'As an official Anthropic partner in Brazil, we apply Claude to solutions combining context, automation and software engineering for real enterprise challenges.', '.partner-verified': '<span aria-hidden="true">✓</span> Partnership verified on the Claude Partner Network', '.anthropic-copy .button': 'Discover Claude at Anthropic <span aria-hidden="true">↗</span>', '.scene-brand small': 'OFFICIAL PARTNER · BRAZIL', '.anthropic-scene > p': 'MOVE TO EXPLORE <span>↗</span>',
    '.why .section-index span:last-child': 'Why Land IT', '.why .display-title': 'Strategy to decide.<br>Engineering to <span>deliver.</span>', '.why-list article:nth-child(1) h3': 'From problem to production', '.why-list article:nth-child(1) p': 'We connect discovery, POC, product and evolution in one coherent journey.', '.why-list article:nth-child(2) h3': 'AI integrated with business', '.why-list article:nth-child(2) p': 'Technology designed around real processes, data and decisions.', '.why-list article:nth-child(3) h3': 'Future-ready software', '.why-list article:nth-child(3) p': 'Architecture built to operate today and keep evolving tomorrow.',
    '.manifesto .eyebrow': '<span></span> Our point of view', '.manifesto-title': '<span class="reveal is-visible">The future is not waiting.</span><span class="reveal is-visible">We build it.</span>', '.manifesto-inner > p:last-child': 'The next generation of companies will be built with artificial intelligence at the core. Our work is to turn that possibility into real technology.',
    '.contact .eyebrow': '<span></span> Start a conversation', '.contact .display-title': 'Ready to build<br><span>what\'s next?</span>', '.contact-inner > p:not(.eyebrow)': 'Let us turn your next opportunity into an intelligent solution.', '.contact .button': 'Talk to Land IT <span aria-hidden="true">↗</span>', '.footer-intro p': 'Connecting data, systems and people through applied intelligence.', '.footer-column:nth-child(2) h2': 'Company', '.footer-column:nth-child(3) h2': 'Resources', '.footer-contact h2': 'Contact', '.footer-column:nth-child(2) a:nth-of-type(1)': 'Solutions', '.footer-column:nth-child(2) a:nth-of-type(2)': 'Outcomes', '.footer-column:nth-child(2) a:nth-of-type(3)': 'Contact', '.footer-column:nth-child(3) a:nth-of-type(1)': 'Anthropic', '.footer-column:nth-child(3) a:nth-of-type(2)': 'Land Flow', '.footer-column:nth-child(3) a:nth-of-type(3)': 'rh@landtech.com.br', '.footer-bottom > span:first-child': '© <span data-year></span> Land IT. All rights reserved.', '.footer-legal a': 'Privacy Policy'
  }
};

const setLanguage = (language) => {
  const selected = translations[language] ? language : 'pt';
  Object.entries(translations[selected]).forEach(([selector, value]) => {
    document.querySelectorAll(selector).forEach((element) => { element.innerHTML = value; });
  });
  document.documentElement.lang = selected === 'pt' ? 'pt-BR' : 'en';
  document.title = selected === 'pt' ? 'Land IT — Tecnologia centrada em IA' : 'Land IT — AI-first technology';
  document.querySelector('meta[name="description"]')?.setAttribute('content', selected === 'pt' ? 'A Land IT transforma inteligência artificial em produtos, plataformas e experiências digitais para desafios reais de negócio.' : 'Land IT turns artificial intelligence into products, platforms and digital experiences for real business challenges.');
  document.querySelectorAll('[data-year]').forEach((element) => { element.textContent = String(new Date().getFullYear()); });
  document.querySelector('.skip-link').textContent = selected === 'pt' ? 'Ir para o conteúdo' : 'Skip to content';
  document.querySelector('.main-nav')?.setAttribute('aria-label', selected === 'pt' ? 'Navegação principal' : 'Main navigation');
  document.querySelector('.language-switch')?.setAttribute('aria-label', selected === 'pt' ? 'Selecionar idioma' : 'Select language');
  document.querySelector('.footer-legal span:last-child').textContent = selected === 'pt' ? 'São Paulo · Brasil' : 'São Paulo · Brazil';
  document.querySelectorAll('[data-language]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.language === selected)));
  try { localStorage.setItem('land-language', selected); } catch {}
};

document.querySelectorAll('[data-language]').forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.language)));
let initialLanguage = 'pt';
try { initialLanguage = localStorage.getItem('land-language') || 'pt'; } catch {}
setLanguage(initialLanguage);

const closeMenu = ({ restoreFocus = false } = {}) => {
  if (!toggle || !nav) return;
  nav.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menu');
  if (restoreFocus) toggle.focus();
};

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  if (open) return closeMenu();
  nav?.classList.add('is-open');
  document.body.classList.add('menu-open');
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Fechar menu');
  nav?.querySelector('a')?.focus();
});

nav?.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
    closeMenu({ restoreFocus: true });
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 820) closeMenu();
}, { passive: true });

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 24);
  const sampleY = Math.min(window.innerHeight - 1, header.getBoundingClientRect().bottom + 2);
  const surface = document.elementsFromPoint(window.innerWidth / 2, sampleY)
    .map((element) => element.closest?.('section'))
    .find(Boolean);
  header.classList.toggle('is-over-light', Boolean(surface?.classList.contains('section-light')));
};
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('resize', updateHeader, { passive: true });

const reveals = document.querySelectorAll('.reveal');
if (reducedMotion.matches || !('IntersectionObserver' in window)) {
  reveals.forEach((element) => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
  reveals.forEach((element) => revealObserver.observe(element));
}

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const landFlowVideo = document.querySelector('[data-land-flow-video]');
if (landFlowVideo instanceof HTMLVideoElement && !reducedMotion.matches && 'IntersectionObserver' in window) {
  const landFlowObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) landFlowVideo.play().catch(() => {});
    else landFlowVideo.pause();
  }, { threshold: .42 });
  landFlowObserver.observe(landFlowVideo);
}

const canvas = document.querySelector('[data-neural-canvas]');
const heroSystem = document.querySelector('.hero-system');
const heroCamera = document.querySelector('[data-hero-camera]');

if (heroSystem && heroCamera && !reducedMotion.matches && window.matchMedia('(pointer: fine)').matches) {
  const camera = { x: 0, y: 0, targetX: 0, targetY: 0, frame: 0 };
  const renderCamera = () => {
    camera.x += (camera.targetX - camera.x) * .085;
    camera.y += (camera.targetY - camera.y) * .085;
    const x = camera.x;
    const y = camera.y;
    heroSystem.style.setProperty('--camera-rx', `${-y * 3.2}deg`);
    heroSystem.style.setProperty('--camera-ry', `${x * 3.2}deg`);
    heroSystem.style.setProperty('--pointer-x', `${(x + .5) * 100}%`);
    heroSystem.style.setProperty('--pointer-y', `${(y + .5) * 100}%`);
    heroSystem.style.setProperty('--far-x', `${x * 5}px`);
    heroSystem.style.setProperty('--far-y', `${y * 5}px`);
    heroSystem.style.setProperty('--mid-x', `${x * 15}px`);
    heroSystem.style.setProperty('--mid-y', `${y * 15}px`);
    heroSystem.style.setProperty('--core-x', `${x * 3}px`);
    heroSystem.style.setProperty('--core-y', `${y * 3}px`);
    heroSystem.style.setProperty('--near-x', `${x * 28}px`);
    heroSystem.style.setProperty('--near-y', `${y * 28}px`);
    heroSystem.style.setProperty('--panel-x', `${x * 19}px`);
    heroSystem.style.setProperty('--panel-y', `${y * 16}px`);
    if (Math.abs(camera.targetX - x) > .001 || Math.abs(camera.targetY - y) > .001) camera.frame = requestAnimationFrame(renderCamera);
    else camera.frame = 0;
  };
  const startCamera = () => { if (!camera.frame) camera.frame = requestAnimationFrame(renderCamera); };
  heroCamera.addEventListener('pointermove', (event) => {
    const rect = heroCamera.getBoundingClientRect();
    camera.targetX = Math.max(-.5, Math.min(.5, (event.clientX - rect.left) / rect.width - .5));
    camera.targetY = Math.max(-.5, Math.min(.5, (event.clientY - rect.top) / rect.height - .5));
    startCamera();
  }, { passive: true });
  heroCamera.addEventListener('pointerleave', () => {
    camera.targetX = 0;
    camera.targetY = 0;
    startCamera();
  });
}

const anthropicScene = document.querySelector('[data-anthropic-scene]');
if (anthropicScene && !reducedMotion.matches && window.matchMedia('(pointer: fine)').matches) {
  anthropicScene.addEventListener('pointermove', (event) => {
    const rect = anthropicScene.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    anthropicScene.style.setProperty('--scene-x', `${x * 100}%`);
    anthropicScene.style.setProperty('--scene-y', `${y * 100}%`);
    anthropicScene.style.setProperty('--scene-rx', `${(y - .5) * -9}deg`);
    anthropicScene.style.setProperty('--scene-ry', `${(x - .5) * 9}deg`);
  }, { passive: true });
  anthropicScene.addEventListener('pointerleave', () => {
    anthropicScene.style.removeProperty('--scene-x');
    anthropicScene.style.removeProperty('--scene-y');
    anthropicScene.style.setProperty('--scene-rx', '0deg');
    anthropicScene.style.setProperty('--scene-ry', '0deg');
  });
}

const nodeCanvas = document.querySelector('[data-node-field]');
if (nodeCanvas instanceof HTMLCanvasElement) {
  const nodeContext = nodeCanvas.getContext('2d', { alpha: true });
  const nodePointer = { x: 0, y: 0, active: false };
  let dataNodes = [];
  let nodeFrame = 0;

  const resizeNodeField = () => {
    const rect = nodeCanvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    nodeCanvas.width = Math.round(rect.width * ratio);
    nodeCanvas.height = Math.round(rect.height * ratio);
    nodeContext.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.max(36, Math.min(68, Math.floor(rect.width / 8)));
    dataNodes = Array.from({ length: count }, (_, index) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = rect.width * (.12 + Math.random() * .46);
      return {
        angle,
        radius,
        baseRadius: radius,
        speed: (.00018 + Math.random() * .00042) * (index % 2 ? 1 : -1),
        size: 1.5 + Math.random() * 5,
        depth: .25 + Math.random() * .75,
        phase: Math.random() * Math.PI * 2,
        x: rect.width / 2,
        y: rect.height / 2
      };
    });
  };

  const drawNodeField = (time = 0) => {
    const rect = nodeCanvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    nodeContext.clearRect(0, 0, rect.width, rect.height);
    dataNodes.forEach((node) => {
      node.angle += node.speed * 16;
      const breathe = Math.sin(time * .00055 + node.phase) * 12;
      const targetRadius = node.baseRadius + breathe;
      node.radius += (targetRadius - node.radius) * .018;
      let x = centerX + Math.cos(node.angle) * node.radius;
      let y = centerY + Math.sin(node.angle) * node.radius * .72;
      if (nodePointer.active) {
        const dx = nodePointer.x - x;
        const dy = nodePointer.y - y;
        const distance = Math.hypot(dx, dy);
        if (distance < 150) {
          const pull = (1 - distance / 150) * .075;
          x += dx * pull;
          y += dy * pull;
          nodeContext.beginPath();
          nodeContext.moveTo(x, y);
          nodeContext.lineTo(nodePointer.x, nodePointer.y);
          nodeContext.strokeStyle = `rgba(240,141,108,${.17 * (1 - distance / 150)})`;
          nodeContext.lineWidth = .6;
          nodeContext.stroke();
        }
      }
      node.x = x; node.y = y;
    });

    dataNodes.forEach((node, index) => {
      dataNodes.slice(index + 1).forEach((other) => {
        const distance = Math.hypot(node.x - other.x, node.y - other.y);
        if (distance > 72) return;
        nodeContext.beginPath();
        nodeContext.moveTo(node.x, node.y);
        nodeContext.lineTo(other.x, other.y);
        nodeContext.strokeStyle = `rgba(173,121,255,${.09 * (1 - distance / 72)})`;
        nodeContext.lineWidth = .5;
        nodeContext.stroke();
      });
      const alpha = .18 + node.depth * .52;
      const size = node.size * (.55 + node.depth * .65);
      nodeContext.save();
      nodeContext.translate(node.x, node.y);
      nodeContext.rotate(node.angle * .35);
      nodeContext.shadowColor = node.depth > .65 ? 'rgba(240,141,108,.65)' : 'rgba(150,98,255,.4)';
      nodeContext.shadowBlur = node.depth * 9;
      nodeContext.strokeStyle = node.depth > .58 ? `rgba(240,141,108,${alpha})` : `rgba(171,130,255,${alpha})`;
      nodeContext.fillStyle = node.depth > .78 ? `rgba(240,141,108,${alpha * .35})` : 'transparent';
      nodeContext.lineWidth = .65;
      nodeContext.beginPath();
      nodeContext.rect(-size / 2, -size / 2, size, size);
      nodeContext.fill(); nodeContext.stroke(); nodeContext.restore();
    });
    if (!reducedMotion.matches) nodeFrame = requestAnimationFrame(drawNodeField);
  };

  nodeCanvas.parentElement?.addEventListener('pointermove', (event) => {
    const rect = nodeCanvas.getBoundingClientRect();
    nodePointer.x = event.clientX - rect.left;
    nodePointer.y = event.clientY - rect.top;
    nodePointer.active = true;
  }, { passive: true });
  nodeCanvas.parentElement?.addEventListener('pointerleave', () => { nodePointer.active = false; });
  window.addEventListener('resize', resizeNodeField, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(nodeFrame);
    else if (!reducedMotion.matches) drawNodeField();
  });
  resizeNodeField();
  drawNodeField();
}

if (canvas instanceof HTMLCanvasElement && !reducedMotion.matches && !heroCamera?.classList.contains('has-webgl-environment')) {
  const context = canvas.getContext('2d', { alpha: true });
  let nodes = [];
  let frame = 0;
  let running = true;
  let heroVisible = true;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: 0, targetActive: 0 };

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * ratio);
    canvas.height = Math.round(rect.height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    pointer.x = pointer.tx = rect.width * .68;
    pointer.y = pointer.ty = rect.height * .48;
    const count = rect.width < 820 ? Math.min(46, Math.max(32, Math.floor(rect.width / 18))) : Math.min(88, Math.max(58, Math.floor(rect.width / 22)));
    nodes = Array.from({ length: count }, (_, index) => {
      const layerSeed = index % 12;
      const layer = layerSeed < 3 ? 0 : layerSeed < 7 ? 1 : layerSeed < 10 ? 2 : 3;
      return {
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - .5) * (.035 + layer * .032),
        vy: (Math.random() - .5) * (.035 + layer * .032),
        r: Math.random() * 1.5 + .45,
        z: Math.random(),
        vz: Math.random() * .0008 + .00022,
        layer,
        phase: Math.random() * Math.PI * 2,
        kind: index % 4
      };
    });
  };

  const draw = (time = 0) => {
    if (!running || !heroVisible) { frame = 0; return; }
    const { width, height } = canvas.getBoundingClientRect();
    pointer.x += (pointer.tx - pointer.x) * .045;
    pointer.y += (pointer.ty - pointer.y) * .045;
    pointer.active += (pointer.targetActive - pointer.active) * .05;
    context.clearRect(0, 0, width, height);

    const haze = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, Math.min(width, height) * .48);
    haze.addColorStop(0, `rgba(185,58,170,${.045 + pointer.active * .035})`);
    haze.addColorStop(.45, 'rgba(91,31,118,.025)');
    haze.addColorStop(1, 'rgba(11,12,15,0)');
    context.fillStyle = haze;
    context.fillRect(0, 0, width, height);

    const projected = [];
    nodes.forEach((node, index) => {
      node.x += node.vx;
      node.y += node.vy;
      node.z += node.vz;
      if (node.z > 1) { node.z = .025; node.x = Math.random() * width; node.y = Math.random() * height; }
      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;
      const layerDepth = [.68,.88,1.08,1.32][node.layer];
      const depthScale = (.32 + node.z * 1.58) * layerDepth;
      const projectedX = width * .7 + (node.x - width * .7) * depthScale;
      const projectedY = height * .48 + (node.y - height * .48) * depthScale;
      const dxPointer = projectedX - pointer.x;
      const dyPointer = projectedY - pointer.y;
      const distancePointer = Math.hypot(dxPointer, dyPointer);
      const field = Math.exp(-(distancePointer * distancePointer) / (2 * 170 * 170)) * pointer.active;
      const pulse = Math.sin(time * .0012 + node.phase) * .5 + .5;
      const parallax = field * (node.layer + 1) * 5;
      const ripple = Math.sin(distancePointer * .038 - time * .0042 + node.phase * .25) * field * (node.layer + 1) * 1.7;
      const x = projectedX + (dxPointer / Math.max(distancePointer, 1)) * (parallax + ripple);
      const y = projectedY + (dyPointer / Math.max(distancePointer, 1)) * (parallax + ripple);
      const opacity = (.035 + node.z * .28 + node.layer * .025) * (.72 + pulse * .28) + field * .16;
      projected.push({ node, x, y, scale: depthScale, opacity });
    });

    projected.forEach(({ node, x, y, scale, opacity }, index) => {
      const size = node.r * (1.4 + node.layer * .55) * scale;
      context.save();
      context.translate(x, y);
      if (node.layer === 0) context.filter = 'blur(1.15px)';
      if (node.layer === 3) {
        context.filter = `blur(${node.z > .72 ? 1.8 : .45}px)`;
        context.shadowColor = `rgba(199,71,186,${opacity})`;
        context.shadowBlur = 9 + node.z * 15;
      }
      context.beginPath();
      if (node.kind === 0 || node.kind === 3) {
        context.strokeStyle = `rgba(214,126,225,${opacity})`;
        context.lineWidth = .45 + node.z * .45;
        context.rect(-size / 2, -size / 2, size, size);
        context.stroke();
      } else {
        context.fillStyle = `rgba(181,94,202,${opacity})`;
        context.arc(0, 0, Math.max(.35, size * .32), 0, Math.PI * 2);
        context.fill();
      }
      context.restore();

      if (node.layer === 3 && node.kind === 2) {
        context.save();
        context.globalAlpha = opacity * .42;
        context.fillStyle = '#c747ba';
        context.filter = `blur(${2 + node.z * 4}px)`;
        context.beginPath();
        context.arc(x, y, size * 2.8, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }

      projected.slice(index + 1).forEach(({ node: other, x: otherX, y: otherY }) => {
        const dx = x - otherX;
        const dy = y - otherY;
        const distance = Math.hypot(dx, dy);
        if (distance > 138 || Math.abs(node.z - other.z) > .17 || node.layer !== other.layer) return;
        context.beginPath();
        context.strokeStyle = `rgba(170,83,187,${.085 * (1 - distance / 138) * (.35 + node.z)})`;
        context.lineWidth = .45;
        context.moveTo(x, y);
        if ((index + other.kind) % 3 === 0) {
          const elbowX = x + (otherX - x) * .55;
          context.lineTo(elbowX, y);
          context.lineTo(elbowX, otherY);
        }
        context.lineTo(otherX, otherY);
        context.stroke();
      });
    });
    frame = requestAnimationFrame(draw);
  };

  canvas.parentElement?.addEventListener('pointermove', (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.tx = event.clientX - rect.left;
    pointer.ty = event.clientY - rect.top;
    pointer.targetActive = 1;
  }, { passive: true });
  canvas.parentElement?.addEventListener('pointerleave', () => {
    const rect = canvas.getBoundingClientRect();
    pointer.tx = rect.width * .68;
    pointer.ty = rect.height * .48;
    pointer.targetActive = 0;
  });
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) draw(); else cancelAnimationFrame(frame);
  });
  if ('IntersectionObserver' in window) {
    const heroCanvasObserver = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      if (heroVisible && running && !frame) frame = requestAnimationFrame(draw);
      else if (!heroVisible && frame) { cancelAnimationFrame(frame); frame = 0; }
    }, { threshold:.04 });
    heroCanvasObserver.observe(canvas);
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();
  draw();
}

const contactDepthCanvas = document.querySelector('[data-contact-depth-field]');

if (contactDepthCanvas instanceof HTMLCanvasElement) {
  const depthContext = contactDepthCanvas.getContext('2d', { alpha: true });
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const depthState = {
    width: 0, height: 0, ratio: 1, visible: true, frame: 0,
    pointerX: 0, pointerY: 0, targetX: 0, targetY: 0,
    strength: 0, targetStrength: 0, inside: false, tiles: []
  };

  const createDepthTiles = () => {
    const columns = depthState.width < 680 ? 8 : 11;
    const rows = depthState.width < 680 ? 6 : 8;
    const insetX = depthState.width * .08;
    const insetY = depthState.height * .09;
    const usableWidth = depthState.width - insetX * 2;
    const usableHeight = depthState.height - insetY * 2;
    depthState.tiles = [];
    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const index = row * columns + column;
        const layer = index % 7 < 2 ? 0 : index % 7 < 5 ? 1 : 2;
        const jitterX = (((index * 37) % 17) - 8) * .65;
        const jitterY = (((index * 53) % 19) - 9) * .55;
        depthState.tiles.push({
          x: insetX + (column / (columns - 1)) * usableWidth + jitterX,
          y: insetY + (row / (rows - 1)) * usableHeight + jitterY,
          layer,
          z: 0,
          phase: (index * .73) % (Math.PI * 2),
          direction: index % 5 === 0 ? -1 : 1,
          size: 2.4 + ((index * 29) % 5) * .72,
          alpha: .06 + layer * .025 + ((index * 13) % 4) * .012
        });
      }
    }
  };

  const resizeDepthField = () => {
    const rect = contactDepthCanvas.getBoundingClientRect();
    depthState.ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    depthState.width = rect.width;
    depthState.height = rect.height;
    contactDepthCanvas.width = Math.round(rect.width * depthState.ratio);
    contactDepthCanvas.height = Math.round(rect.height * depthState.ratio);
    depthContext.setTransform(depthState.ratio, 0, 0, depthState.ratio, 0, 0);
    depthState.pointerX = depthState.targetX = rect.width * .52;
    depthState.pointerY = depthState.targetY = rect.height * .5;
    createDepthTiles();
  };

  const smoothstep = (edge0, edge1, value) => {
    const amount = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)));
    return amount * amount * (3 - 2 * amount);
  };

  const drawDepthField = (time = 0) => {
    if (!depthState.visible) { depthState.frame = 0; return; }
    const width = depthState.width;
    const height = depthState.height;
    if (!width || !height) { depthState.frame = requestAnimationFrame(drawDepthField); return; }

    if (coarsePointer && !reducedMotion.matches && !depthState.inside) {
      depthState.targetX = width * (.52 + Math.sin(time * .00022) * .16);
      depthState.targetY = height * (.5 + Math.cos(time * .00017) * .12);
      depthState.targetStrength = .28;
    }

    depthState.pointerX += (depthState.targetX - depthState.pointerX) * .075;
    depthState.pointerY += (depthState.targetY - depthState.pointerY) * .075;
    depthState.strength += (depthState.targetStrength - depthState.strength) * .065;
    depthContext.clearRect(0, 0, width, height);

    const centerDistance = Math.hypot(depthState.pointerX - width / 2, depthState.pointerY - height / 2);
    const centerLimit = Math.hypot(width / 2, height / 2);
    const edgeStrength = .45 + .55 * (1 - smoothstep(.35, 1, centerDistance / centerLimit));
    const sigma = Math.min(width, height) * .24;

    depthState.tiles.forEach((tile) => {
      const dx = tile.x - depthState.pointerX;
      const dy = tile.y - depthState.pointerY;
      const distance = Math.hypot(dx, dy);
      const gaussian = Math.exp(-(distance * distance) / (2 * sigma * sigma));
      const ripple = Math.sin(distance * .045 - time * .006 + tile.phase) * gaussian;
      const layerPower = [.42, .72, 1][tile.layer];
      const targetZ = depthState.strength * edgeStrength * layerPower * tile.direction * (gaussian * 92 + ripple * 22);
      tile.z += (targetZ - tile.z) * (.055 + tile.layer * .018);

      const perspectiveScale = Math.max(.76, 1 + tile.z / 520);
      const parallax = depthState.strength * layerPower * gaussian;
      const projectedX = width / 2 + (tile.x - width / 2) * perspectiveScale - dx * parallax * .055;
      const projectedY = height / 2 + (tile.y - height / 2) * perspectiveScale - dy * parallax * .055;
      const size = tile.size * perspectiveScale * (1 + gaussian * depthState.strength * .35);
      const rising = Math.max(0, tile.z / 95);
      const sinking = Math.max(0, -tile.z / 95);
      const activity = gaussian * depthState.strength;
      const alpha = Math.min(.72, tile.alpha + activity * (.2 + tile.layer * .12) + rising * .18 - sinking * .035);

      depthContext.save();
      depthContext.translate(projectedX, projectedY);
      depthContext.rotate((tile.phase - Math.PI) * .025 + ripple * .035);
      depthContext.shadowColor = tile.layer === 2 ? `rgba(181,58,170,${alpha * .7})` : `rgba(75,55,91,${alpha * .45})`;
      depthContext.shadowBlur = rising * 13 + activity * 5;
      depthContext.lineWidth = .65 + rising * .65;
      depthContext.strokeStyle = `rgba(104,55,111,${alpha})`;
      depthContext.fillStyle = tile.z > 8
        ? `rgba(181,58,170,${alpha * .2})`
        : `rgba(32,28,36,${alpha * .09})`;
      depthContext.beginPath();
      depthContext.rect(-size / 2, -size / 2, size, size);
      depthContext.fill();
      depthContext.stroke();
      depthContext.restore();
    });

    depthState.frame = reducedMotion.matches ? 0 : requestAnimationFrame(drawDepthField);
  };

  const startDepthField = () => {
    if (!depthState.frame && !reducedMotion.matches && depthState.visible) {
      depthState.frame = requestAnimationFrame(drawDepthField);
    }
  };

  contactDepthCanvas.addEventListener('pointerenter', () => {
    depthState.inside = true;
    depthState.targetStrength = 1;
    startDepthField();
  }, { passive: true });
  contactDepthCanvas.addEventListener('pointermove', (event) => {
    const rect = contactDepthCanvas.getBoundingClientRect();
    depthState.targetX = event.clientX - rect.left;
    depthState.targetY = event.clientY - rect.top;
    depthState.targetStrength = 1;
    startDepthField();
  }, { passive: true });
  contactDepthCanvas.addEventListener('pointerleave', () => {
    depthState.inside = false;
    depthState.targetX = depthState.width * .52;
    depthState.targetY = depthState.height * .5;
    depthState.targetStrength = 0;
  }, { passive: true });

  if ('IntersectionObserver' in window) {
    const depthObserver = new IntersectionObserver(([entry]) => {
      depthState.visible = entry.isIntersecting;
      if (depthState.visible) startDepthField();
      else if (depthState.frame) {
        cancelAnimationFrame(depthState.frame);
        depthState.frame = 0;
      }
    }, { threshold: .05 });
    depthObserver.observe(contactDepthCanvas);
  }

  window.addEventListener('resize', resizeDepthField, { passive: true });
  resizeDepthField();
  if (reducedMotion.matches) drawDepthField();
  else startDepthField();
}
