/**
 * Di Grecco - Site Oficial & Shows
 * Pure Vanilla JavaScript served as a static asset in local and Vercel deployments.
 */

// ============================================================================
// 1. DATA & CONSTANTS
// ============================================================================
const DI_GRECCO_INFO = {
  name: "Di Grecco",
  members: ["Camilla Di Grecco", "Giovanna Di Grecco"],
  hometown: "Cuiabá, Mato Grosso / São Paulo, Brasil",
  genre: "Pop / Dance Pop / Latin Pop",
  tagline: "Da Arquitetura ao Topo do Pop Brasileiro",
  artistPhotoUrl: "https://image-cdn-fa.spotifycdn.com/image/ab6761610000e5eb25b14169b981ec08ff0637c6",
  whatsappNumber: "+55 11 97308-7302",
  whatsappPhoneRaw: "5511973087302",
  whatsappUrl: "https://wa.me/5511973087302?text=Ol%C3%A1%20equipe%20Di%20Grecco!%20Vim%20pelo%20site%20oficial%20e%20gostaria%20de%20informa%C3%A7%C3%B5es%20para%20contratar%20o%20Show%20de%2015%20Anos.",
  spotifyArtistUrl: "https://open.spotify.com/intl-es/artist/60IuUW9ZO7IiD4t1hwmO9d",
  instagramUrl: "https://www.instagram.com/digrecco/",
  youtubeUrl: "https://www.youtube.com/c/DIGRECCO",
  tiktokUrl: "https://www.tiktok.com/@digrecco",
  facebookUrl: "https://www.facebook.com/irmasdigrecco/",
};

const SONGS = [
  {
    id: "checkmate",
    spotifyTrackId: "05KtX6Rpt3KmPBox18Lgew",
    title: "Checkmate",
    releaseYear: "2022",
    duration: "2:54",
    genre: "Pop / Dance Pop",
    description: "O hit divisor de águas da Di Grecco. Clipe cinematográfico com mais de 344 mil views, combinando batidas pop enérgicas, estética inspirada nos anos 2000 e coreografias sincronizadas.",
    spotifyUrl: "https://open.spotify.com/intl-es/track/05KtX6Rpt3KmPBox18Lgew?si=77bb22edac964ac2",
    previewUrl: "./audio/checkmate.mp3",
    spotifyPreviewUrl: "https://p.scdn.co/mp3-preview/4b90c8f811d1fb5cfd2b73dea6cd4ddfaba82951",
    coverImage: "https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b273cdcd2604a8f571c25ed9abb9",
    bpm: 124,
    highlightText: "Hit Principal • Clipe Oficial",
    stats: "+344k Views no YouTube",
    type: "hits"
  },
  {
    id: "mi-amor",
    spotifyTrackId: "0TfLVMM2feYwMeQz7NXPUn",
    title: "Mi Amor",
    releaseYear: "2023",
    duration: "2:46",
    genre: "Latin Pop / Reggaeton Pop",
    description: "Faixa vibrante com tempero latino, refrão envolvente e ritmo contagiante que conquistou as pistas e os eventos de debutantes.",
    spotifyUrl: "https://open.spotify.com/intl-es/track/0TfLVMM2feYwMeQz7NXPUn?si=6e70a5ed091b4cf7",
    previewUrl: "./audio/mi-amor.mp3",
    spotifyPreviewUrl: "https://p.scdn.co/mp3-preview/8b9eab44ee8c8210c7a13f9bb78df60f81ce9788",
    coverImage: "https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b27399eef1202a17c5c57ebc0862",
    bpm: 105,
    highlightText: "Single Oficial • Pop Latino",
    stats: "Sucesso nas Pistas",
    type: "hits"
  },
  {
    id: "veneno",
    spotifyTrackId: "6kRQ0Sr6pPTzdbFeNDCVRs",
    title: "Veneno",
    releaseYear: "2023",
    duration: "2:48",
    genre: "Pop Urbano / Dance",
    description: "Single magnético com batida marcada e atmosfera sedutora. Destaque para o jogo vocal harmônico entre Camilla e Giovanna e o clipe com estética moderna.",
    spotifyUrl: "https://open.spotify.com/intl-es/track/6kRQ0Sr6pPTzdbFeNDCVRs?si=c05a811419fb4e35",
    previewUrl: "./audio/veneno.mp3",
    spotifyPreviewUrl: "https://p.scdn.co/mp3-preview/a56428c3ae5378d0d9344c81a76bea4ea9cbf42e",
    coverImage: "https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b273a06f836ec35d61bea005a375",
    bpm: 118,
    highlightText: "Single Oficial • Clipe em Alta",
    stats: "Top Streaming",
    type: "hits"
  },
  {
    id: "na-minha-mao",
    spotifyTrackId: "1gCOmE7L7i0cAxoyIBjN33",
    title: "Na Minha Mão",
    releaseYear: "2022",
    duration: "2:52",
    genre: "Electropop / Brazilian Pop",
    description: "Canção empoderada com baixo pulsante e sintetizadores modernos, que reflete o controle, atitude e energia das apresentações ao vivo da dupla.",
    spotifyUrl: "https://open.spotify.com/intl-es/track/1gCOmE7L7i0cAxoyIBjN33?si=59ee68bba7074ee9",
    previewUrl: "./audio/na-minha-mao.mp3",
    spotifyPreviewUrl: "https://p.scdn.co/mp3-preview/f7338b9dcb534b655fa73210292424941bd33236",
    coverImage: "https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b2731bb473da4dac614c88ccf5dd",
    bpm: 122,
    highlightText: "Pop Nacional • Groove Dançante",
    stats: "Favorita dos Fãs",
    type: "15"
  },
  {
    id: "lado-b",
    spotifyTrackId: "2qCOLWb67R5997SqY8qkcO",
    title: "Lado B",
    releaseYear: "2022",
    duration: "3:10",
    genre: "Pop Contemporâneo",
    description: "Explora o lado mais íntimo e maduro das artistas, com melodias ricas e versos sinceros sobre sentimentos reais e vulnerabilidade.",
    spotifyUrl: "https://open.spotify.com/intl-es/track/2qCOLWb67R5997SqY8qkcO?si=7512c2f35d8446fe",
    previewUrl: "./audio/lado-b.mp3",
    spotifyPreviewUrl: "https://p.scdn.co/mp3-preview/3e6b63c19dddf9e28b75f3eb96473c48ed206a61",
    coverImage: "/assets/images/regenerated_image_1790078400420.jpg",
    bpm: 112,
    highlightText: "Composição Autoral • Harmonia Vocal",
    stats: "Crítica Elogiada",
    type: "pop"
  },
  {
    id: "anjo-querubim",
    spotifyTrackId: "7EIUU7oUhM7jMokpfOITjB",
    title: "Anjo Querubim",
    releaseYear: "2023",
    duration: "3:25",
    genre: "Pop Emocional / Balada",
    description: "Uma das interpretações vocais mais doces e emocionantes da Di Grecco, ideal para o momento da valsa ou homenagens inesquecíveis em festas de 15 anos.",
    spotifyUrl: "https://open.spotify.com/intl-es/track/7EIUU7oUhM7jMokpfOITjB?si=ef75db58ff524633",
    previewUrl: "./audio/anjo-querubim.mp3",
    spotifyPreviewUrl: "https://p.scdn.co/mp3-preview/01529bba5902307cf03f5d1653870dacd062ef63",
    coverImage: "https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273500cfa122c93ebba7b274455",
    bpm: 94,
    highlightText: "Especial 15 Anos • Valsa & Emoção",
    stats: "Momento Clímax de Debutantes",
    type: "15"
  }
];

// Multilingual Translations Dictionary
const TRANSLATIONS = {
  pt: {
    navHome: "Início",
    navMusic: "Músicas & Spotify",
    navDebutantes: "Shows 15 Anos",
    navCommunity: "Mural de Fãs",
    navBio: "Biografia",
    navVipChat: "DiGrecco Bot",
    navWhatsapp: "WhatsApp",
    backToHome: "Voltar ao Início",
    heroBadge: "DUPLA POP BRASILEIRA • CAMILLA & GIOVANNA",
    heroTitleMain: "A Nova Era do Pop",
    heroTitleAccent: "Brasileiro",
    heroDesc: "De arquitetas a fenômenos da dança e do pop. Camilla e Giovanna Di Grecco transformam palcos em verdadeiras obras de arte audiovisual com dança sincronizada, shows com canto ao vivo e projetos exclusivos para festas de 15 anos.",
    heroQuote: "“Unimos a precisão da arquitetura à vibração visceral do pop nacional.”",
    heroBookCta: "Contratar Show de 15 Anos",
    heroListenCta: "Ouvir Prévias das Músicas",
    heroChatCta: "Falar com DiGrecco Bot",
    musicBadge: "ÁUDIO REAL DE ESTÚDIO • 30S PREVIEW",
    musicTitle: "Músicas Oficiais da Di Grecco",
    musicSubtitle: "Ouça trechos 100% REAIS com as vozes autênticas de Camilla e Giovanna Di Grecco gravadas em estúdio. Para ouvir a faixa completa sem cortes, clique no link oficial do Spotify.",
    filterAll: "Todas as Músicas (6)",
    filterHits: "Hits & Singles",
    filter15: "Especial Debutantes",
    spotifyAlert: "Música completa no Spotify",
    btnPlaySnippet: "Reproduzir Audio Real (30s)",
    btnPauseSnippet: "Pausar Audio Real",
    playingSnippet: "Reproduzindo Vocal Original...",
    listenSnippet: "Ouvir Áudio Real (30s)",
    debutantesBadge: "ESPECIALISTAS EM DEBUTANTES",
    debutantesTitle: "Shows Eletrizantes para Festas de 15 Anos",
    debutantesSubtitle: "O momento mais mágico da sua vida merece o show de dança pop mais enérgico do Brasil. Camilla e Giovanna Di Grecco criam uma experiência inesquecível no palco, com dança sincronizada, corpo coreográfico profissional, abertura de pista e coreografia personalizada com a debutante.",
    videosTitle: "Vídeos Reais dos Shows de 15 Anos",
    videosSub: "Assista às apresentações reais gravadas diretamente nos eventos ao vivo",
    whyUsTitle: "Por que o Show da Di Grecco é Incomparável?",
    reason1Title: "Visão Arquitetônica de Palco",
    reason1Desc: "Formadas em arquitetura, as irmãs planejam a iluminação, cenografia e passarela para valorizar cada foto e vídeo da debutante.",
    reason2Title: "Coreografias Pop & Sincronismo",
    reason2Desc: "Corpo coreográfico de ponta e passos sincronizados milimetricamente que transformam a pista em um verdadeiro espetáculo pop.",
    reason3Title: "A Debutante Brilha no Palco",
    reason3Desc: "Ensaio e momento especial para a aniversariante dançar junto com a Di Grecco e seus bailarinos no momento clímax.",
    quoteFormTitle: "Solicitar Orçamento & Data no WhatsApp",
    quoteFormDesc: "Preencha os dados abaixo e clique para abrir diretamente o WhatsApp oficial da Di Grecco com sua mensagem pronta.",
    nameLabel: "Nome da Debutante ou Responsável *",
    namePlaceholder: "Ex: Maria Eduarda (ou Juliana - Mãe)",
    cityLabel: "Cidade e Estado do Evento *",
    cityPlaceholder: "Ex: São Paulo - SP ou Cuiabá - MT",
    dateLabel: "Data Prevista da Festa",
    guestLabel: "Estimativa de Convidados",
    phoneLabel: "WhatsApp / Telefone para Contato",
    notesLabel: "Observações ou Músicas Favoritas (opcional)",
    btnSendWhatsApp: "Enviar Solicitação para o WhatsApp Oficial",
    btnConsultChat: "Consultar no Chatbot IA",
    bookingBadge: "CONTRATAÇÕES OFICIAIS",
    bookingTitle: "Contratações Diretas para Festas de 15 Anos",
    bookingDesc: "Para contratações, disponibilidade de datas e orçamentos oficiais da Di Grecco, fale diretamente com a produção executiva pelo WhatsApp. Sem intermediários!",
    bookingDirectLabel: "Canal Oficial de Atendimento no WhatsApp:",
    navLogin: "Iniciar Sessão",
    tabLogin: "Iniciar Sessão",
    tabRegister: "Registrar-se",
    loginTitle: "Iniciar Sesión en Di Grecco",
    loginSubtitle: "Acesse sua conta para conferir orçamentos, preferências e conteúdos exclusivos.",
    registerTitle: "Criar Conta na Di Grecco",
    registerSubtitle: "Cadastre-se para interagir com a comunidade, salvar músicas e acompanhar a dupla.",
    loginWithGoogle: "Continuar com o Google",
    registerWithGoogle: "Continuar com o Google",
    loginDivider: "ou entre com seu e-mail",
    registerDivider: "ou cadastre-se com seu e-mail",
    loginEmailLabel: "E-mail",
    loginPasswordLabel: "Senha",
    registerNameLabel: "Nome completo",
    registerEmailLabel: "E-mail",
    registerPasswordLabel: "Senha",
    loginForgot: "Esqueceu a senha?",
    loginSubmit: "Iniciar Sessão",
    registerSubmit: "Criar Conta",
    loginNoAccount: "Não tem uma conta?",
    loginRegister: "Cadastre-se",
    registerHaveAccount: "Já tem uma conta?",
    registerLoginLink: "Iniciar sessão",
    loginNotice: "A área de usuários e administração estará disponível em breve na versão completa.",
    registerNotice: "O cadastro de contas e a área de usuários estarão disponíveis em breve na versão completa.",
    communityBadge: "MURAL PÚBLICO & AVALIAÇÕES",
    communityTitle: "Mural da Comunidade & Depoimentos de 15 Anos",
    communitySubtitle: "Espaço aberto para comentários públicos, relatos das debutantes e conversas entre fãs. Qualquer pessoa pode comentar e responder aos comentários de outros!",
    formTitle: "Deixar meu Comentário / Avaliação",
    formSubtitle: "Compartilhe sua experiência, sua música favorita ou deixe seu carinho para a Di Grecco.",
    commentNamePlaceholder: "Ex: Laura Silva (ou @laurinha_15anos)",
    commentTextPlaceholder: "Escreva aqui seu comentário, como foi o show na sua festa, ou recado para a Di Grecco...",
    btnPostComment: "Publicar Comentário",
    emptyCommentsTitle: "Nenhum comentário publicado ainda",
    emptyCommentsSub: "Seja a primeira pessoa a compartilhar seu relato de 15 anos, avaliar os shows ou deixar uma mensagem carinhosa para a Di Grecco!",
    commentsCount: (count) => `Comentários dos Fãs (${count})`,
    bioBadge: "HISTÓRIA REAL & TRAJETÓRIA",
    bioTitle: "Da Arquitetura ao Centro do Pop",
    bioSubtitle: "Conheça a história verídica das irmãs Camilla e Giovanna Di Grecco: como o olhar estético de arquitetas e a paixão por coreografias e música pop deram origem a um dos projetos artísticos mais vibrantes do país.",
    card1Title: "A Visão Arquitetônica",
    card1Desc: "Ambas formadas em Arquitetura e Urbanismo, Camilla e Giovanna desenham cada detalhe de palco, jogo de luzes e simetria com o rigor conceitual de um projeto estrutural de vanguarda.",
    card2Title: "Coreografia Pop & Presença Cênica",
    card2Desc: "Treinamento coreográfico intenso, sincronismo corporal de alto nível e presença de palco magnética trazem para os shows da Di Grecco uma energia contagiante que eletriza o público e as debutantes.",
    milestonesTitle: "Marcos Históricos da Di Grecco",
    chatPlaceholder: "Digite sua pergunta sobre Di Grecco ou shows...",
    chatChipShow15: "Como funciona o show de 15 anos?",
    chatChipBio: "História das artistas",
    chatChipWhatsapp: "Contratar no WhatsApp",
    chatGreeting: "Oi! Eu sou o DiGrecco Bot, o assistente virtual VIP oficial da dupla Di Grecco! 💖 Posso te passar informações reais e confirmadas sobre os shows com canto ao vivo e dança para Festas de 15 Anos, o ensaio com a debutante, músicas no Spotify ou te conectar diretamente à produção no WhatsApp!"
  },
  es: {
    navHome: "Inicio",
    navMusic: "Música & Spotify",
    navDebutantes: "Shows 15 Años",
    navCommunity: "Mural de Fans",
    navBio: "Biografía",
    navVipChat: "DiGrecco Bot",
    navWhatsapp: "WhatsApp",
    backToHome: "Volver al Inicio",
    heroBadge: "DUPLA POP BRASILEÑA • CAMILLA & GIOVANNA",
    heroTitleMain: "La Nueva Era del Pop",
    heroTitleAccent: "Brasileño",
    heroDesc: "De arquitectas a referentes de la danza y el pop brasileño. Camilla y Giovanna Di Grecco combinan coreografías sincronizadas de impacto, bailarines profesionales, espectáculos con canto en vivo y una puesta en escena inmersiva especializada en fiestas de 15 años.",
    heroQuote: "“Unimos la precisión de la arquitectura a la vibración visceral del pop.”",
    heroBookCta: "Contratar Show de 15 Años",
    heroListenCta: "Escuchar Adelantos de Canciones",
    heroChatCta: "Preguntar a DiGrecco Bot",
    musicBadge: "AUDIO REAL DE ESTUDIO • ADELANTO DE 30S",
    musicTitle: "Canciones Oficiales de Di Grecco",
    musicSubtitle: "Escucha fragmentos 100% REALES con las voces auténticas de Camilla y Giovanna Di Grecco grabadas en estudio. Para escuchar la canción completa sin cortes, haz clic en el enlace oficial de Spotify.",
    filterAll: "Todas las Canciones (6)",
    filterHits: "Hits & Singles",
    filter15: "Especial 15 Años",
    spotifyAlert: "Canción completa en Spotify",
    btnPlaySnippet: "Reproducir Audio Real (30s)",
    btnPauseSnippet: "Pausar Audio Real",
    playingSnippet: "Reproduciendo Voces Reales...",
    listenSnippet: "Escuchar Audio Real (30s)",
    debutantesBadge: "ESPECIALISTAS EN DEBUTANTES & 15 AÑOS",
    debutantesTitle: "Shows Electrizantes para Fiestas de 15 Años",
    debutantesSubtitle: "El momento cumbre de tus 15 años merece el show de baile más electrizante. Camilla y Giovanna Di Grecco ofrecen un espectáculo coreográfico de primer nivel con bailarines profesionales, apertura de pista y coreografía exclusiva ensayada junto a la quinceañera.",
    videosTitle: "Vídeos Reales de los Shows de 15 Años",
    videosSub: "Mira las presentaciones reales de Di Grecco grabadas en directo en fiestas de 15 años",
    whyUsTitle: "¿Por qué el Show de Di Grecco es Incomparable?",
    reason1Title: "Visión Arquitectónica de Escenario",
    reason1Desc: "Graduadas en arquitectura, planifican la iluminación, escenografía y visuales para fotos y videos de ensueño.",
    reason2Title: "Coreografías Pop & Sincronismo",
    reason2Desc: "Bailarines de primer nivel y movimientos pop sincronizados que encienden la pista y crean un show deslumbrante.",
    reason3Title: "La Quinceañera en el Escenario",
    reason3Desc: "Ensayo previo para que la cumpleañera protagonice una coreografía inolvidable con Di Grecco.",
    quoteFormTitle: "Cotizar Disponibilidad por WhatsApp",
    quoteFormDesc: "Completa los datos del evento y haz clic para abrir directamente WhatsApp con el mensaje estructurado para las artistas.",
    nameLabel: "Nombre de la Quinceañera o Responsable *",
    namePlaceholder: "Ej: Sofía Martínez (o Madre/Padre)",
    cityLabel: "Ciudad y País del Evento *",
    cityPlaceholder: "Ej: São Paulo, Asunción, Santa Cruz",
    dateLabel: "Fecha Prevista del Evento",
    guestLabel: "Cantidad Estimada de Invitados",
    phoneLabel: "Teléfono / WhatsApp de Contacto",
    notesLabel: "Comentarios o Canciones Especiales (opcional)",
    btnSendWhatsApp: "Enviar Consulta Directa a WhatsApp",
    btnConsultChat: "Consultar en el Chatbot IA",
    bookingBadge: "CONTRATACIONES & SHOWS",
    bookingTitle: "Contrataciones Directas para Fiestas de 15 Años",
    bookingDesc: "Para contrataciones, disponibilidad de fechas y presupuestos oficiales de la gira de Di Grecco, escribe directamente a la producción por WhatsApp. ¡Conversa en vivo con el equipo y coordina todos los detalles de tu fiesta sin intermediarios!",
    bookingDirectLabel: "WhatsApp Oficial de Producción:",
    navLogin: "Iniciar Sesión",
    tabLogin: "Iniciar Sesión",
    tabRegister: "Registrarse",
    loginTitle: "Iniciar Sesión en Di Grecco",
    loginSubtitle: "Accede a tu cuenta para consultar cotizaciones, novedades y contenidos exclusivos.",
    registerTitle: "Crear Cuenta en Di Grecco",
    registerSubtitle: "Regístrate para interactuar con los fans, guardar canciones y seguir a la dupla.",
    loginWithGoogle: "Continuar con Google",
    registerWithGoogle: "Continuar con Google",
    loginDivider: "o inicia sesión con tu correo",
    registerDivider: "o regístrate con tu correo",
    loginEmailLabel: "Correo electrónico",
    loginPasswordLabel: "Contraseña",
    registerNameLabel: "Nombre completo",
    registerEmailLabel: "Correo electrónico",
    registerPasswordLabel: "Contraseña",
    loginForgot: "¿Olvidaste tu contraseña?",
    loginSubmit: "Iniciar Sesión",
    registerSubmit: "Crear Cuenta",
    loginNoAccount: "¿No tienes cuenta?",
    loginRegister: "Regístrate",
    registerHaveAccount: "¿Ya tienes cuenta?",
    registerLoginLink: "Inicia sesión",
    loginNotice: "El área de usuarios y administración estará disponible próximamente en la versión completa.",
    registerNotice: "El registro de cuentas y el área de usuarios estarán disponibles próximamente en la versión completa.",
    communityBadge: "MURAL PÚBLICO & RESEÑAS",
    communityTitle: "Muro de la Comunidad & Reseñas de 15 Años",
    communitySubtitle: "Espacio abierto para comentarios públicos, testimonios de quinceañeras y charlas entre fans. ¡Cualquiera puede comentar y responder comentarios!",
    formTitle: "Dejar mi Comentario / Reseña",
    formSubtitle: "Comparte tu experiencia, tu canción favorita o tu saludo para Di Grecco.",
    commentNamePlaceholder: "Ej: Sofía Martínez (o @sofi_15anos)",
    commentTextPlaceholder: "Escribe aquí tu comentario, cómo fue el show en tu fiesta de 15 años o mensaje para Di Grecco...",
    btnPostComment: "Publicar Comentario",
    emptyCommentsTitle: "Aún no hay comentarios publicados",
    emptyCommentsSub: "¡Sé la primera persona en compartir tu experiencia de 15 años, calificar los shows o dejar un mensaje para Di Grecco!",
    commentsCount: (count) => `Comentarios de los Fans (${count})`,
    bioBadge: "HISTORIA REAL & TRAYECTORIA",
    bioTitle: "De la Arquitectura al Centro del Pop",
    bioSubtitle: "Conoce la historia verídica de las hermanas Camilla y Giovanna Di Grecco: cómo la visión de arquitectas y la pasión por las coreografías pop forjaron un show moderno e inolvidable.",
    card1Title: "Visión Arquitectónica",
    card1Desc: "Graduadas en Arquitectura y Urbanismo, conciben la escenografía, los juegos de luces y la simetría de sus shows con el rigor estético de una obra monumental.",
    card2Title: "Coreografía Pop & Presencia Escénica",
    card2Desc: "Entrenamiento coreográfico riguroso, sincronismo corporal de primer nivel y una presencia escénica magnética que transforma cada evento en una celebración pop vibrante.",
    milestonesTitle: "Hitos en la Carrera de Di Grecco",
    chatPlaceholder: "Escribe tu pregunta sobre Di Grecco o los shows...",
    chatChipShow15: "¿Cómo funciona el show de 15 años?",
    chatChipBio: "Historia de las artistas",
    chatChipWhatsapp: "Contratar en WhatsApp",
    chatGreeting: "¡Hola! Soy DiGrecco Bot, el asistente VIP oficial de la dupla pop Di Grecco 💖 Te cuento información real y verificada sobre sus espectáculos de baile para Fiestas de 15 Años, el ensayo con la debutante, sus canciones en Spotify o cómo contactar directamente a la producción oficial por WhatsApp. ¿En qué te puedo ayudar?"
  },
  en: {
    navHome: "Home",
    navMusic: "Music & Spotify",
    navDebutantes: "15th Birthday Shows",
    navCommunity: "Fan Guestbook",
    navBio: "Biography",
    navVipChat: "DiGrecco Bot",
    navWhatsapp: "WhatsApp",
    backToHome: "Back to Home",
    heroBadge: "BRAZILIAN POP DUO • CAMILLA & GIOVANNA",
    heroTitleMain: "The New Era of Brazilian",
    heroTitleAccent: "Pop",
    heroDesc: "From architects to pop stage sensations. Camilla and Giovanna Di Grecco craft high-energy synchronized pop spectacles with live singing, acclaimed hits, and signature 15th birthday dance performances.",
    heroQuote: "“We combine architectural precision with the vibrant electricity of pop.”",
    heroBookCta: "Book 15th Birthday Show",
    heroListenCta: "Listen to Song Snippets",
    heroChatCta: "Chat with DiGrecco Bot",
    musicBadge: "REAL MASTER AUDIO • 30S PREVIEW",
    musicTitle: "Official Di Grecco Songs",
    musicSubtitle: "Stream 100% REAL audio clips featuring Camilla and Giovanna Di Grecco's actual studio vocals and master tracks. To stream the complete uncut song, tap the official Spotify button.",
    filterAll: "All Songs (6)",
    filterHits: "Hits & Singles",
    filter15: "Debutante Favorites",
    spotifyAlert: "Full song on Spotify",
    btnPlaySnippet: "Play Real Audio (30s)",
    btnPauseSnippet: "Pause Real Audio",
    playingSnippet: "Playing Real Studio Vocals...",
    listenSnippet: "Play Real Audio (30s)",
    debutantesBadge: "15TH BIRTHDAY & SWEET 16 SPECIALISTS",
    debutantesTitle: "High-Energy Pop Shows for 15th Birthday Parties",
    debutantesSubtitle: "The milestone celebration deserves Brazil's most dazzling dance show. Camilla and Giovanna Di Grecco bring concert-level choreography, professional dancers, an electric dance floor opening, and custom routines rehearsed with the debutante.",
    videosTitle: "Real 15th Birthday Party Show Videos",
    videosSub: "Watch real performances filmed live at actual 15th birthday celebrations",
    whyUsTitle: "Why Di Grecco Makes the Difference",
    reason1Title: "Architectural Stage Vision",
    reason1Desc: "Trained architects designing bespoke lighting and stage geometry that make every photo and video look like a stadium concert.",
    reason2Title: "Pop Choreography & Synchronization",
    reason2Desc: "Synchronized professional choreography and vibrant dancers that transform the stage into a cinematic pop celebration.",
    reason3Title: "The Birthday Girl as the Star",
    reason3Desc: "Exclusive rehearsal so the debutante can perform a choreographed break center stage with Di Grecco and dancers.",
    quoteFormTitle: "Request Booking via WhatsApp",
    quoteFormDesc: "Fill in the details below to instantly open WhatsApp with your pre-formatted booking inquiry message.",
    nameLabel: "Debutante or Organizer Name *",
    namePlaceholder: "Ex: Emily Johnson (or Parent/Planner)",
    cityLabel: "Event City & Location *",
    cityPlaceholder: "Ex: São Paulo, Miami, or City",
    dateLabel: "Event Date",
    guestLabel: "Estimated Guests",
    phoneLabel: "Phone / WhatsApp Number",
    notesLabel: "Special Requests or Preferred Songs",
    btnSendWhatsApp: "Send Direct Inquiry via WhatsApp",
    btnConsultChat: "Consult AI Chatbot",
    bookingBadge: "OFFICIAL BOOKINGS",
    bookingTitle: "Direct Bookings for 15th Birthday Parties",
    bookingDesc: "For tour dates, calendar availability, and official quotes for Di Grecco 15th birthday party shows, contact official production directly on WhatsApp. Direct and personalized!",
    bookingDirectLabel: "Official WhatsApp Production Line:",
    navLogin: "Sign In",
    tabLogin: "Sign In",
    tabRegister: "Sign Up",
    loginTitle: "Sign In to Di Grecco",
    loginSubtitle: "Access your account to manage quote requests, preferences, and exclusive updates.",
    registerTitle: "Create Di Grecco Account",
    registerSubtitle: "Sign up to join the fan community, save tracks, and follow Camilla & Giovanna.",
    loginWithGoogle: "Continue with Google",
    registerWithGoogle: "Continue with Google",
    loginDivider: "or sign in with your email",
    registerDivider: "or sign up with your email",
    loginEmailLabel: "Email address",
    loginPasswordLabel: "Password",
    registerNameLabel: "Full name",
    registerEmailLabel: "Email address",
    registerPasswordLabel: "Password",
    loginForgot: "Forgot password?",
    loginSubmit: "Sign In",
    registerSubmit: "Create Account",
    loginNoAccount: "Don't have an account?",
    loginRegister: "Sign Up",
    registerHaveAccount: "Already have an account?",
    registerLoginLink: "Sign in",
    loginNotice: "The user and management area will be available soon in the full release.",
    registerNotice: "Account registration and user area will be available soon in the full release.",
    communityBadge: "PUBLIC GUESTBOOK & REVIEWS",
    communityTitle: "Community Wall & 15th Birthday Reviews",
    communitySubtitle: "Open public space for fan reviews, debutante testimonials, and discussions. Anyone can post comments and reply to each other!",
    formTitle: "Leave My Comment / Review",
    formSubtitle: "Share your experience, favorite song, or heartfelt message for Di Grecco.",
    commentNamePlaceholder: "Ex: Emily Davis (or @emily_sweet16)",
    commentTextPlaceholder: "Write your review, what you thought of the show at your party, or greeting for Di Grecco...",
    btnPostComment: "Post Comment",
    emptyCommentsTitle: "No comments published yet",
    emptyCommentsSub: "Be the first person to share your 15th birthday experience, review the shows, or leave a message for Di Grecco!",
    commentsCount: (count) => `Fan Comments (${count})`,
    bioBadge: "GENUINE BIOGRAPHY & ARTISTIC JOURNEY",
    bioTitle: "From Architecture to Pop Stardom",
    bioSubtitle: "Discover the real story of sisters Camilla and Giovanna Di Grecco: how architectural design and passion for upbeat choreography created one of Brazil's most thrilling pop duos.",
    card1Title: "Architectural Vision",
    card1Desc: "Both holding architecture and urbanism degrees, Camilla and Giovanna engineer stage lighting, geometry, and visuals like a living architectural masterpiece.",
    card2Title: "Pop Choreography & Stage Sync",
    card2Desc: "Intense dance training, synchronized pop routines, and charismatic live presence that electrify the audience and make every debutante feel like a true pop star.",
    milestonesTitle: "Di Grecco Career Milestones",
    chatPlaceholder: "Type your question about Di Grecco or shows...",
    chatChipShow15: "How does the 15th show work?",
    chatChipBio: "Artists biography",
    chatChipWhatsapp: "Book on WhatsApp",
    chatGreeting: "Hi! I am DiGrecco Bot, the official VIP assistant for Brazilian pop duo Di Grecco 💖 I can give you real, verified facts about their 15th birthday dance shows, rehearsals with the debutante, songs on Spotify, or connect you with executive booking on WhatsApp!"
  }
};

// ============================================================================
// 2. APPLICATION STATE
// ============================================================================
function getInitialLanguage() {
  const saved = localStorage.getItem("digrecco_lang");
  if (saved && (saved === "es" || saved === "pt" || saved === "en")) {
    return saved;
  }
  const nav = (navigator.language || navigator.userLanguage || "").toLowerCase();
  if (nav.startsWith("es")) return "es";
  if (nav.startsWith("en")) return "en";
  if (nav.startsWith("pt")) return "pt";
  return "es";
}

let currentLang = getInitialLanguage();
let currentSong = SONGS[0];
let isAudioPlaying = false;
let isAudioMuted = false;
let audioElement = new Audio();
let audioProgressInterval = null;
let currentFilter = "all";

// Chatbot State
let chatHistory = [];
let selectedChatModel = "gemini-3.1-flash-lite";
let selectedChatRole = "VIP Concierge";
let isChatSearchGrounded = false;

// ============================================================================
// 2.1 MULTI-PAGE ROUTER (Independent Pages & Breadcrumb Navigation)
// ============================================================================
function navigateToPage(pageName) {
  const validPages = ["home", "musicas", "debutantes", "biografia"];
  const target = validPages.includes(pageName) ? pageName : "home";

  // Toggle pages visibility
  validPages.forEach((p) => {
    const el = document.getElementById(`page-${p}`);
    if (el) {
      if (p === target) {
        el.classList.add("page-active");
      } else {
        el.classList.remove("page-active");
      }
    }
  });

  // Highlight active links in navigation
  document.querySelectorAll(".nav-link").forEach((link) => {
    const linkPage = link.dataset.page;
    if (linkPage === target) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Close mobile dropdown if active
  const mobileMenu = document.getElementById("mobile-menu-dropdown");
  if (mobileMenu && mobileMenu.classList.contains("active")) {
    mobileMenu.classList.remove("active");
  }

  // Sync browser URL hash
  const expectedHash = target === "home" ? "#/" : `#/${target}`;
  if (window.location.hash !== expectedHash) {
    history.pushState(null, "", expectedHash);
  }

  // Smooth scroll to top of page
  window.scrollTo({ top: 0, behavior: "smooth" });
}
window.navigateToPage = navigateToPage;

function handleHashChange() {
  const rawHash = (window.location.hash || "").replace(/^#\/?/, "").toLowerCase().trim();
  if (!rawHash || rawHash === "" || rawHash === "home" || rawHash === "hero") {
    navigateToPage("home");
  } else if (rawHash.startsWith("musica")) {
    navigateToPage("musicas");
  } else if (rawHash.startsWith("debutante") || rawHash.startsWith("show") || rawHash.startsWith("15")) {
    navigateToPage("debutantes");
  } else if (rawHash.startsWith("bio")) {
    navigateToPage("biografia");
  } else {
    navigateToPage("home");
  }
}
window.addEventListener("hashchange", handleHashChange);
window.addEventListener("popstate", handleHashChange);

// ============================================================================
// 3. INITIALIZATION ON DOM CONTENT LOADED
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Audio Element
  audioElement.preload = "none";
  audioElement.addEventListener("timeupdate", onAudioTimeUpdate);
  audioElement.addEventListener("ended", onAudioEnded);

  // 2. Render Songs Grid
  renderSongsGrid();
  updateFeaturedPlayer(currentSong);

  // 3. Setup Language UI
  applyLanguage(currentLang);

  // 4. Setup Multi-Page Route
  handleHashChange();

  // 5. Setup Event Listeners
  setupEventListeners();
});

// ============================================================================
// 4. LANGUAGE SWITCHER
// ============================================================================
function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("digrecco_lang", lang);

  // Update active flags in all switchers (navbar, mobile, and modal)
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  const t = TRANSLATIONS[lang] || TRANSLATIONS.es;

  // Apply all data-i18n attributes
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // Apply input placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key]) {
      el.placeholder = t[key];
    }
  });

  // If chat is open and has only greeting or is empty, update the greeting
  if (chatHistory.length <= 1) {
    const chatContainer = document.getElementById("chat-messages-container");
    if (chatContainer) {
      chatContainer.innerHTML = "";
      chatHistory = [];
      const greeting = lang === "es"
        ? "¡Hola! Soy **DiGrecco Bot**, asistente oficial de la dupla pop **Di Grecco** (Camilla y Giovanna) 💖\n\nTe puedo informar con total veracidad y transparencia sobre:\n• Cómo es el show con canto en vivo de covers adaptados y coreografía para Fiestas de 15 Años.\n• El ensayo previo exclusivo con la debutante para brillar en el escenario.\n• Qué dicen las debutantes reales en redes sociales (@digrecco).\n• Sus canciones oficiales en Spotify y YouTube.\n• Contactar directamente a la producción oficial por WhatsApp.\n\n¿En qué te puedo ayudar hoy?"
        : lang === "en"
        ? "Hi! I am **DiGrecco Bot**, official VIP assistant for **Di Grecco** (Camilla & Giovanna) 💖\n\nI can share real facts about:\n• Their energetic 15th birthday live vocal covers & dance shows and rehearsal with the birthday girl.\n• Real testimonials from debutantes and families on Instagram (@digrecco).\n• Official songs on Spotify.\n• Direct WhatsApp contact with executive production.\n\nHow can I help you today?"
        : "Oi! Eu sou o **DiGrecco Bot**, assistente oficial da dupla pop **Di Grecco** (Camilla & Giovanna) 💖\n\nPosso te contar tudo com base nas informações reais das artistas e debutantes:\n• Como funciona o show com canto ao vivo de covers adaptados e coreografia para 15 anos e o ensaio com a debutante.\n• Depoimentos reais de debutantes nas redes sociais (@digrecco).\n• As músicas oficiais no Spotify.\n• Contato direto com a produção executiva no WhatsApp.\n\nComo posso te ajudar?";
      appendChatMessage("bot", greeting);
    }
  }

  // Re-render components with translated dynamic text
  updateFeaturedPlayer(currentSong);
}

// ============================================================================
// 5. AUDIO PLAYER LOGIC
// ============================================================================
function playSong(songId) {
  const song = SONGS.find((s) => s.id === songId);
  if (!song) return;

  if (currentSong.id === song.id && isAudioPlaying) {
    pauseAudio();
    return;
  }

  currentSong = song;
  updateFeaturedPlayer(song);

  // Update card UI highlight
  document.querySelectorAll(".song-card").forEach((card) => {
    card.classList.toggle("selected", card.dataset.id === song.id);
  });

  // Load and play audio
  audioElement.src = song.previewUrl;
  audioElement.play().then(() => {
    isAudioPlaying = true;
    updatePlayButtonsUI(true);
  }).catch((err) => {
    console.warn("Audio play error, trying remote Spotify preview fallback:", err);
    if (song.spotifyPreviewUrl) {
      audioElement.src = song.spotifyPreviewUrl;
      audioElement.play().then(() => {
        isAudioPlaying = true;
        updatePlayButtonsUI(true);
      }).catch((e) => console.error("Fallback error:", e));
    }
  });
}

function pauseAudio() {
  audioElement.pause();
  isAudioPlaying = false;
  updatePlayButtonsUI(false);
}

function togglePlayCurrent() {
  if (isAudioPlaying) {
    pauseAudio();
  } else {
    playSong(currentSong.id);
  }
}

function toggleMute() {
  isAudioMuted = !isAudioMuted;
  audioElement.muted = isAudioMuted;
  const muteBtn = document.getElementById("mute-toggle-btn");
  if (muteBtn) {
    muteBtn.innerHTML = isAudioMuted
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
  }
}

function onAudioTimeUpdate() {
  const current = audioElement.currentTime || 0;
  const duration = audioElement.duration || 30;
  const percent = Math.min(100, (current / duration) * 100);

  const curEl = document.getElementById("scrub-current-time");
  const durEl = document.getElementById("scrub-duration-time");
  const progEl = document.getElementById("scrub-progress-bar");

  if (curEl) curEl.textContent = formatAudioTime(current);
  if (durEl) durEl.textContent = formatAudioTime(duration);
  if (progEl) progEl.style.width = `${percent}%`;
}

function onAudioEnded() {
  isAudioPlaying = false;
  updatePlayButtonsUI(false);
  const progEl = document.getElementById("scrub-progress-bar");
  if (progEl) progEl.style.width = "0%";
}

function seekAudio(event) {
  const track = document.getElementById("scrub-track");
  if (!track) return;
  const rect = track.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
  const duration = audioElement.duration || 30;
  audioElement.currentTime = ratio * duration;
}

function formatAudioTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

function updatePlayButtonsUI(isPlaying) {
  const mainPlayBtn = document.getElementById("featured-play-btn");
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.pt;

  if (mainPlayBtn) {
    mainPlayBtn.classList.toggle("playing", isPlaying);
    mainPlayBtn.innerHTML = isPlaying
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg><span>${t.btnPauseSnippet}</span>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg><span>${t.btnPlaySnippet}</span>`;
  }

  const coverOverlay = document.getElementById("featured-cover-overlay");
  if (coverOverlay) {
    coverOverlay.style.display = isPlaying ? "flex" : "none";
  }

  // Update song card buttons
  document.querySelectorAll(".btn-card-play").forEach((btn) => {
    const cardId = btn.closest(".song-card")?.dataset.id;
    const isThisPlaying = cardId === currentSong.id && isPlaying;
    btn.classList.toggle("is-playing", isThisPlaying);
    btn.innerHTML = isThisPlaying
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="margin-left:2px"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
  });
}

function updateFeaturedPlayer(song) {
  document.getElementById("featured-song-title").textContent = song.title;
  document.getElementById("featured-song-year").textContent = song.releaseYear;
  document.getElementById("featured-song-desc").textContent = song.description;
  document.getElementById("featured-cover-img").src = song.coverImage;
  document.getElementById("featured-spotify-link").href = song.spotifyUrl;
  document.getElementById("featured-spotify-widget-link").href = song.spotifyUrl;

  const iframe = document.getElementById("spotify-embed-iframe");
  if (iframe) {
    iframe.src = `https://open.spotify.com/embed/track/${song.spotifyTrackId}?utm_source=generator&theme=0`;
  }
}

function renderSongsGrid() {
  const container = document.getElementById("songs-grid-container");
  if (!container) return;

  const filtered = SONGS.filter((s) => {
    if (currentFilter === "hits") return s.id === "checkmate" || s.id === "veneno" || s.id === "mi-amor";
    if (currentFilter === "15") return s.id === "anjo-querubim" || s.id === "checkmate" || s.id === "na-minha-mao";
    return true;
  });

  container.innerHTML = filtered.map((song) => {
    const isSelected = song.id === currentSong.id;
    const isThisPlaying = isSelected && isAudioPlaying;

    return `
      <div class="song-card glass-panel ${isSelected ? "selected" : ""}" data-id="${song.id}" onclick="playSong('${song.id}')">
        <div>
          <div class="card-media-box">
            <img src="${song.coverImage}" alt="${song.title}">
            <div class="card-top-tag">${song.releaseYear} • ${song.genre}</div>
            <div class="card-audio-tag">Áudio Real</div>
            <button class="btn-card-play ${isThisPlaying ? "is-playing" : ""}" onclick="event.stopPropagation(); playSong('${song.id}')" aria-label="Play ${song.title}">
              ${
                isThisPlaying
                  ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`
                  : `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="margin-left:2px"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`
              }
            </button>
          </div>
          <div class="card-title-row">
            <h3 class="card-song-title">${song.title}</h3>
            <span class="card-duration">${song.duration}</span>
          </div>
          <p class="card-desc">${song.description}</p>
        </div>

        <div class="card-footer-strip">
          <div class="card-stats-line">
            <span class="highlight-green">${song.highlightText}</span>
            <span>BPM: ${song.bpm}</span>
          </div>
          <a href="${song.spotifyUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-spotify" onclick="event.stopPropagation()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.42c-.18.3-.57.39-.87.21-2.39-1.46-5.4-1.79-8.94-.98-.35.08-.69-.14-.77-.49-.08-.34.14-.68.49-.77 3.88-.89 7.21-.51 9.88 1.13.3.18.39.57.21.9zM17.8 13.7c-.23.37-.71.49-1.08.26-2.73-1.68-6.9-2.17-10.13-1.19-.42.13-.86-.11-.98-.53-.13-.42.11-.86.53-.98 3.7-1.12 8.31-.57 11.4 1.34.37.24.49.72.26 1.1zm.15-2.85c-3.28-1.95-8.7-2.13-11.83-1.18-.5.15-1.04-.13-1.19-.64-.15-.5.14-1.04.64-1.19 3.65-1.11 9.64-.89 13.43 1.36.45.27.6.86.33 1.31-.27.46-.86.6-1.38.34z"/></svg>
            <span>Canción completa en Spotify</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="21" y1="3" x2="10" y2="14"></line></svg>
          </a>
        </div>
      </div>
    `;
  }).join("");
}

function filterSongs(type) {
  currentFilter = type;
  document.querySelectorAll(".filter-btn").forEach((b) => {
    b.className = "filter-btn";
  });
  const activeBtn = document.getElementById(`filter-btn-${type}`);
  if (activeBtn) {
    activeBtn.classList.add(`active-${type}`);
  }
  renderSongsGrid();
}

// ============================================================================
// 6. 15 ANOS (DEBUTANTE) WHATSAPP QUOTE FORM
// ============================================================================
function handleWhatsAppQuoteSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("quote-name").value.trim();
  const city = document.getElementById("quote-city").value.trim();
  const date = document.getElementById("quote-date").value;
  const guests = document.getElementById("quote-guests").value;
  const phone = document.getElementById("quote-phone").value.trim();
  const notes = document.getElementById("quote-notes").value.trim();

  if (!name) {
    alert(currentLang === "es" ? "Por favor ingresa tu nombre." : "Por favor informe o nome.");
    return;
  }

  let text = "";
  if (currentLang === "es") {
    text = `Hola Di Grecco! Me llamo ${name}, quisiera consultar disponibilidad para un show de 15 años el día ${date || "[Fecha a definir]"} en ${city || "[Ciudad a definir]"}.\n\n` +
      `• Tipo de evento: Fiesta de 15 Años (Show Completo con Bailarines)\n` +
      `• Cantidad estimada de invitados: ${guests}\n` +
      (phone ? `• Teléfono de contacto: ${phone}\n` : "") +
      (notes ? `• Notas / Detalles: ${notes}\n` : "") +
      `\n¡Mensaje enviado desde el sitio web oficial de Di Grecco!`;
  } else if (currentLang === "en") {
    text = `Hello Di Grecco! My name is ${name}, I would like to check availability for a 15th birthday party show on ${date || "[Date to be defined]"} in ${city || "[City to be defined]"}.\n\n` +
      `• Event: 15th Birthday Celebration (Full Pop Show)\n` +
      `• Estimated Guests: ${guests}\n` +
      (phone ? `• Contact Phone: ${phone}\n` : "") +
      (notes ? `• Notes: ${notes}\n` : "") +
      `\nInquiry sent from the official Di Grecco website!`;
  } else {
    text = `Olá Di Grecco! Me chamo ${name}, gostaria de consultar disponibilidade para um show de 15 anos no dia ${date || "[Data a definir]"} em ${city || "[Cidade a definir]"}.\n\n` +
      `• Evento: Festa de 15 Anos (Show Coreográfico Pop & Abertura de Pista com a Debutante)\n` +
      `• Estimativa de convidados: ${guests}\n` +
      (phone ? `• Telefone de contato: ${phone}\n` : "") +
      (notes ? `• Observações: ${notes}\n` : "") +
      `\nMensagem enviada através do site oficial da Di Grecco!`;
  }

  const url = `https://wa.me/${DI_GRECCO_INFO.whatsappPhoneRaw}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

// ============================================================================
// 7. CHATBOT MODAL & MULTILINGUAL AI ASSISTANT
// ============================================================================
function detectClientLanguage(text) {
  const t = (text || "").toLowerCase().trim();
  const esMarkers = [
    /\b(hola|buenas|buenos dias|buenas tardes|buenas noches)\b/,
    /\b(quien|quién|quienes|quiénes|donde|dónde|como|cómo|cuanto|cuánto|cuesta|cuestan|precio|precios|costo|costos)\b/,
    /\b(que|qué|hacen|hace|hacer|tienen|tiene|pueden|puede|quiero|quisiera|saber|decir|decirme)\b/,
    /\b(canta|cantan|cantar|cancion|canción|canciones|baila|bailan|bailar|ensayo|ensayan|ensayos)\b/,
    /\b(fiesta|fiestas|quinceañera|quinceañeras|quince|cumpleaños|debutante|debutantes)\b/,
    /\b(ellas|ellos|usted|ustedes|nosotros|con ellas|de ellas)\b/,
    /\b(redes|sociales|dicen|dicho|comentarios|testimonios|reales|verdad|falso|falsa|informacion|información)\b/,
    /\b(por favor|gracias|muchas gracias|saludos|ayuda|ayúdame|ayudame|presupuesto|cotizacion|cotización)\b/,
    /[¿¡ñáéíóú]/
  ];

  const ptMarkers = [
    /\b(olá|ola|bom dia|boa tarde|boa noite)\b/,
    /\b(quanto|custa|custam|preço|preços|valor|valores|orçamento|orçamentos)\b/,
    /\b(quem|onde|como|fazer|fazem|faz|podem|pode|quero|gostaria|saber|dizer|dizer-me)\b/,
    /\b(canta|cantam|cantar|música|musica|músicas|musicas|canção|canções|dança|dançam|dançar|ensaio|ensaiam)\b/,
    /\b(festa|festas|aniversário|aniversario|debutante|debutantes)\b/,
    /\b(elas|eles|você|voce|vocês|voces|com elas|delas)\b/,
    /\b(redes|sociais|dizem|disseram|depoimentos|reais|verdade|informações|informacoes)\b/,
    /\b(por favor|obrigado|obrigada|muito obrigado|muito obrigada|valeu)\b/,
    /[ãõç]/
  ];

  const enMarkers = [
    /\b(hi|hello|hey|good morning|good afternoon|good evening)\b/,
    /\b(how much|price|cost|quote|booking|hire|rates)\b/,
    /\b(who|what|where|how|why|when|can they|do they|can i|would like)\b/,
    /\b(sing|songs|dance|dancing|routine|rehearsal|rehearse)\b/,
    /\b(party|birthday|15th|quinceanera|debutante|sweet 16)\b/,
    /\b(they|them|she|her|with them)\b/,
    /\b(reviews|testimonials|social media|real|instagram|facts)\b/,
    /\b(please|thank you|thanks)\b/
  ];

  let es = 0, pt = 0, en = 0;
  for (const m of esMarkers) if (m.test(t)) es += 2;
  for (const m of ptMarkers) if (m.test(t)) pt += 2;
  for (const m of enMarkers) if (m.test(t)) en += 2;

  if (/\b(ellas|cantan|quien|quienes|cuanto|cuánto|canciones|cancion|hacen|fiestas|quinceañera|precio|costo|buenas)\b/.test(t) || /[¿¡ñ]/.test(t)) es += 5;
  if (/\b(elas|cantam|quem|quanto|músicas|musicas|canções|fazem|festas|você|voce|orçamento|obrigado|obrigada|olá)\b/.test(t) || /[ãõç]/.test(t)) pt += 5;

  if (es > pt && es > en) return "es";
  if (pt > es && pt > en) return "pt";
  if (en > es && en > pt) return "en";

  return currentLang || "es";
}

function openChatModal() {
  const modal = document.getElementById("chatbot-modal");
  if (modal) {
    modal.classList.add("active");
    if (chatHistory.length === 0) {
      const greeting = currentLang === "es"
        ? "¡Hola! Soy **DiGrecco Bot**, el asistente VIP oficial de la dupla pop **Di Grecco** (Camilla y Giovanna) 💖\n\nTe puedo informar con total veracidad y transparencia sobre:\n• Cómo es el show con canto en vivo de covers adaptados y coreografía para Fiestas de 15 Años.\n• El ensayo previo exclusivo con la debutante para brillar en el escenario.\n• Qué dicen las debutantes reales en redes sociales (@digrecco).\n• Sus canciones oficiales en Spotify y YouTube.\n• Contactar directamente a la producción oficial por WhatsApp.\n\n¿En qué te puedo ayudar hoy?"
        : currentLang === "en"
        ? "Hi! I am **DiGrecco Bot**, official VIP assistant for **Di Grecco** (Camilla & Giovanna) 💖\n\nI can share real facts about:\n• Their energetic 15th birthday live vocal covers & dance shows and rehearsal with the birthday girl.\n• Real testimonials from debutantes and families on Instagram (@digrecco).\n• Official songs on Spotify.\n• Direct WhatsApp contact with executive production.\n\nHow can I help you today?"
        : "Oi! Eu sou o **DiGrecco Bot**, assistente oficial da dupla pop **Di Grecco** (Camilla & Giovanna) 💖\n\nPosso te contar tudo com base nas informações reais das artistas e debutantes:\n• Como funciona o show com canto ao vivo de covers adaptados e coreografia para 15 anos e o ensaio com a debutante.\n• Depoimentos reais de debutantes nas redes sociais (@digrecco).\n• As músicas oficiais no Spotify.\n• Contato direto com a produção executiva no WhatsApp.\n\nComo posso te ajudar?";
      appendChatMessage("bot", greeting);
    }
  }
}

function closeChatModal() {
  const modal = document.getElementById("chatbot-modal");
  if (modal) modal.classList.remove("active");
}

function formatChatText(rawText) {
  if (!rawText) return "";
  // Escape HTML entities to prevent injection
  let html = rawText
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Bold **text**
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  // Italic *text*
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  // Convert [text](url) to link
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#60a5fa; text-decoration:underline;">$1</a>');
  // Auto link whatsapp number
  html = html.replace(/(\+55\s*(?:11\s*)?97308-?7302)/g, '<a href="https://wa.me/5511973087302" target="_blank" rel="noopener noreferrer" style="color:#34d399; font-weight:700; text-decoration:underline;">$1</a>');
  // Format list bullet items
  html = html.replace(/\n\s*[•\-]\s*(.+)/g, '<div style="margin:3px 0 3px 10px; display:flex; align-items:flex-start; gap:6px;"><span style="color:#f472b6;">•</span><span>$1</span></div>');
  // Paragraphs and newlines
  html = html.replace(/\n\n/g, '<div style="height:8px;"></div>').replace(/\n/g, "<br>");

  return html;
}

function appendChatMessage(sender, text) {
  const container = document.getElementById("chat-messages-container");
  if (!container) return;

  const msgDiv = document.createElement("div");
  msgDiv.className = `msg-row ${sender}`;
  msgDiv.innerHTML = `<div class="msg-bubble ${sender}">${formatChatText(text)}</div>`;
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;

  chatHistory.push({ role: sender, text });
}

async function sendChatMessage(customText) {
  const input = document.getElementById("chat-input-text");
  const text = (customText || (input ? input.value : "")).trim();
  if (!text) return;

  appendChatMessage("user", text);
  if (input) input.value = "";

  const detectedLanguage = detectClientLanguage(text);

  // Show typing indicator in the appropriate language
  const container = document.getElementById("chat-messages-container");
  const typingDiv = document.createElement("div");
  typingDiv.className = "msg-row bot";
  typingDiv.id = "chat-typing-indicator";
  const typingLabel = detectedLanguage === "es"
    ? "DiGrecco Bot pensando..."
    : detectedLanguage === "en"
    ? "DiGrecco Bot typing..."
    : "DiGrecco Bot pensando...";
  typingDiv.innerHTML = `<div class="msg-bubble bot"><em>${typingLabel}</em></div>`;
  container.appendChild(typingDiv);
  container.scrollTop = container.scrollHeight;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        userLang: detectedLanguage,
        modelChoice: selectedChatModel,
        useSearchGrounding: isChatSearchGrounded,
        customRole: selectedChatRole,
        history: chatHistory.slice(-8)
      })
    });

    const data = await response.json();
    typingDiv.remove();

    if (data.reply) {
      appendChatMessage("bot", data.reply);
    } else {
      fallbackChatResponse(text);
    }
  } catch (err) {
    typingDiv.remove();
    fallbackChatResponse(text);
  }
}

function fallbackChatResponse(query) {
  const q = (query || "").toLowerCase();
  const targetLang = detectClientLanguage(q);

  let reply = "";

  if (targetLang === "es") {
    if (q.includes("canta") || q.includes("cover") || q.includes("cancion propia") || q.includes("canciones propias") || q.includes("voz en vivo") || q.includes("vocal")) {
      reply = "¡Sí, totalmente! Camilla y Giovanna **sí cantan en vivo** 🎤✨\n\nTe explico con total detalle y claridad cómo es su propuesta en las Fiestas de 15 Años:\n\n• **Cantan en vivo covers versionados**: En sus presentaciones interpretan en directo grandes éxitos y covers de otros artistas consagrados, adaptándolos a su propia voz, arreglos pop y armonías vocales.\n• **¿Y sus canciones propias?**: Normalmente en las fiestas de 15 años no cantan sus temas de autor propios (como *Checkmate*, *Veneno* o *Mi Amor*); esas canciones originales están disponibles en **Spotify** y **YouTube**.\n• **Show completo con baile y apertura de pista**: Su show combina voces en vivo con un electrizante show coreográfico con bailarines profesionales y el **ensayo exclusivo con la quinceañera** para que ella brille en el escenario.\n\nPara cotizaciones y agenda oficial, puedes escribir directamente a la producción por WhatsApp: **+55 11 97308-7302**.";
    } else if (q.includes("hacen") || q.includes("como es") || q.includes("show") || q.includes("15") || q.includes("fiesta") || q.includes("quinceañera")) {
      reply = "¡Hola! Con mucho gusto te cuento cómo es la presentación de **Di Grecco** en Fiestas de 15 Años 🎉\n\n• **Voces en Vivo con Covers**: Camilla y Giovanna cantan en vivo covers de grandes éxitos adaptados a sus voces y estilo pop.\n• **Show Coreográfico de Alto Impacto**: Junto a su cuerpo de bailarines profesionales, realizan una apertura de pista electrizante con los hits virales del momento.\n• **Ensayo con la Debutante**: Camilla y Giovanna ensayan previamente con la quinceañera para que ella protagonice un momento inolvidable bailando con ellas en el escenario.\n• **Lo que dicen las debutantes**: En redes sociales (@digrecco), elogian la paciencia y el cariño en los ensayos y la emoción de brillar con seguridad en su fiesta.\n\nPara cotizaciones y disponibilidad oficial, contacta a la producción por WhatsApp: **+55 11 97308-7302**.";
    } else if (q.includes("dicen") || q.includes("redes") || q.includes("testimonio") || q.includes("opinion") || q.includes("instagram")) {
      reply = "¡Los testimonios de debutantes y padres en sus redes sociales (@digrecco) son muy emotivos! ✨\n\n• **Las Debutantes**: Destacan el cariño y la paciencia de Camilla y Giovanna durante los ensayos, transformando los nervios en seguridad total sobre el escenario.\n• **Familias y Organizadores**: Aplauden su puntualidad, su talento vocal en vivo cantando covers adaptados y que la pista de baile estuvo encendida y llena de gente toda la noche.\n\nSu show combina canto en vivo, coreografías pop y la experiencia estelar para la quinceañera.";
    } else if (q.includes("precio") || q.includes("cuanto") || q.includes("costo") || q.includes("cotiz") || q.includes("presupuesto") || q.includes("contrat")) {
      reply = "¡Hola! Para presupuestos de las presentaciones de **Di Grecco** para Fiestas de 15 Años:\n\n• El valor depende de la ciudad del evento (logística de traslados/vuelos desde São Paulo) y la fecha.\n• Incluye el show con voces en vivo cantando covers adaptados, cuerpo de bailarines, apertura de pista y el ensayo exclusivo con la quinceañera.\n\nPara recibir una cotización oficial y consultar la agenda, escribe directamente a la producción por WhatsApp: **+55 11 97308-7302**.";
    } else if (q.includes("quien") || q.includes("arquitect") || q.includes("historia") || q.includes("biografia")) {
      reply = "**Camilla y Giovanna Di Grecco** son hermanas de Cuiabá (Mato Grosso) radicadas en São Paulo. Ambas se graduaron en **Arquitectura y Urbanismo**, y aplican su visión de diseño espacial, simetría y luces a cada espectáculo de danza pop junto a sus bailarines.";
    } else {
      reply = "¡Hola! Soy **DiGrecco Bot**, asistente oficial de **Di Grecco** 💖 Te respondo con información 100% verídica sobre sus shows en vivo de 15 años (covers adaptados a su voz + coreografía), el ensayo con la debutante, sus canciones en Spotify y contacto directo con la producción en WhatsApp (**+55 11 97308-7302**). ¿Qué deseas consultar?";
    }
  } else if (targetLang === "en") {
    if (q.includes("sing") || q.includes("cover") || q.includes("songs at party") || q.includes("own songs") || q.includes("live vocal")) {
      reply = "Yes, absolutely! Camilla and Giovanna **do sing live** 🎤✨\n\nAt 15th Birthday Parties, they sing live covers of crowd-favorite pop hits by other artists, uniquely adapted to their vocal style and harmonies!\n• **Their Original Songs**: They normally do not perform their own studio tracks (*Checkmate*, *Veneno*, *Mi Amor*) live at 15th birthday parties; those are available on Spotify & YouTube.\n• **Full Show**: Their show combines live singing with high-energy dance routines, dancers, and private rehearsals with the debutante.\n\nMessage production directly on WhatsApp: **+55 11 97308-7302**.";
    } else if (q.includes("price") || q.includes("cost") || q.includes("book") || q.includes("package") || q.includes("quote")) {
      reply = "Hi! Pricing for **Di Grecco** depends on your event city travel logistics (from São Paulo) and date. Real debutantes on social media (@digrecco) praise their vocal talent, choreography, patience in rehearsals, and how lively the dance floor remained. Message production directly on WhatsApp: **+55 11 97308-7302**.";
    } else {
      reply = "Hi! I am **DiGrecco Bot**, official VIP assistant for **Di Grecco**. I can share real facts about their live vocal covers, 15th birthday dance shows, rehearsals with the debutante, songs on Spotify, or connect you with executive booking on WhatsApp (**+55 11 97308-7302**). How can I help you?";
    }
  } else {
    // Portuguese
    if (q.includes("canta") || q.includes("cover") || q.includes("músicas próprias") || q.includes("musicas proprias") || q.includes("cantam") || q.includes("ao vivo")) {
      reply = "Sim, com certeza! A Camilla e a Giovanna **cantam ao vivo sim** 🎤✨\n\nNos shows e festas de 15 anos, elas cantam ao vivo grandes sucessos e covers de outros artistas consagrados, adaptando cada música ao estilo vocal, arranjos pop e harmonias próprias da dupla!\n\n• **Músicas autorais**: Normalmente nos 15 anos elas não cantam as músicas autorais próprias (como *Checkmate*, *Veneno* ou *Mi Amor*), que estão disponíveis no Spotify e YouTube.\n• **Show Completo**: Combina vocais ao vivo de covers contagiantes, corpo de balé profissional, abertura da pista e o ensaio com a debutante para ela brilhar no palco!\n\nProdução no WhatsApp: **+55 11 97308-7302**.";
    } else if (q.includes("preço") || q.includes("quanto") || q.includes("valor") || q.includes("orçamento") || q.includes("contratar")) {
      reply = "O show de 15 Anos da Di Grecco é focado em transformar a festa em um espetáculo pop inesquecível! 🎉\n\n• **Como funciona**: Canto ao vivo com covers adaptados, show coreográfico com bailarinos, abertura de pista e o ensaio especial com a debutante.\n• **Orçamento**: Os valores variam conforme a cidade (logística) e data. Fale diretamente com a produção no WhatsApp: **+55 11 97308-7302**!";
    } else if (q.includes("arquitetura") || q.includes("quem") || q.includes("historia")) {
      reply = "Camilla e Giovanna Di Grecco nasceram em Cuiabá (MT) e se formaram em Arquitetura e Urbanismo! Elas aplicam a visão espacial e o rigor estético da arquitetura em cada detalhe dos seus palcos, iluminação e figurinos pop!";
    } else {
      reply = "Oi! Sou o **DiGrecco Bot**, assistente oficial da dupla **Di Grecco** (Camilla & Giovanna) 💖\n\nPosso te contar tudo com base nas informações reais das artistas e debutantes: como funciona o show ao vivo com covers adaptados, dança com bailarinos, ensaio com a debutante, músicas no Spotify e contato com a produção no WhatsApp (+55 11 97308-7302)!";
    }
  }  appendChatMessage("bot", reply);
}

// Speech recognition helper for voice input in chat/comment
function startSpeechRecognition(targetInputId) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("O reconhecimento de voz não é suportado pelo seu navegador atual.");
    return;
  }
  const recognition = new SpeechRecognition();
  recognition.lang = currentLang === "es" ? "es-ES" : currentLang === "en" ? "en-US" : "pt-BR";
  recognition.interimResults = false;

  recognition.onstart = () => {
    console.log("Listening...");
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const target = document.getElementById(targetInputId);
    if (target) {
      target.value = target.value ? `${target.value} ${transcript}` : transcript;
    }
  };

  recognition.onerror = (e) => {
    console.warn("Speech recognition error:", e);
  };

  recognition.start();
}

// ============================================================================
// 9. EVENT LISTENERS SETUP
// ============================================================================
function setupEventListeners() {
  // 1. Close Modals on ESC Key Press
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeChatModal();
    }
  });

  // 2. Close on Backdrop Click
  const chatModal = document.getElementById("chatbot-modal");
  if (chatModal) {
    chatModal.addEventListener("click", (e) => {
      if (e.target === chatModal) {
        closeChatModal();
      }
    });
  }

  // 3. Mobile menu toggle
  const mobileToggleBtn = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu-dropdown");
  if (mobileToggleBtn && mobileMenu) {
    mobileToggleBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });
  }
}

function openDirectWhatsAppBooking() {
  const text = currentLang === "es"
    ? "¡Hola equipo Di Grecco! Ingresé desde el sitio oficial y quisiera consultar información y disponibilidad para la contratación del Show de 15 Años."
    : currentLang === "en"
    ? "Hello Di Grecco team! I am contacting you from the official website to inquire about booking the 15th Birthday Show."
    : "Olá equipe Di Grecco! Vim pelo site oficial e gostaria de informações e disponibilidade sobre a contratação do Show de 15 Anos.";
  const url = `https://wa.me/${DI_GRECCO_INFO.whatsappPhoneRaw}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function closeMobileMenu() {
  const menu = document.getElementById("mobile-menu-dropdown");
  if (menu) menu.classList.remove("open");
}

// Global functions for inline HTML calls
window.setLanguage = applyLanguage;
window.playSong = playSong;
window.togglePlayCurrent = togglePlayCurrent;
window.toggleMute = toggleMute;
window.seekAudio = seekAudio;
window.filterSongs = filterSongs;
window.openDirectWhatsAppBooking = openDirectWhatsAppBooking;
window.openChatModal = openChatModal;
window.closeChatModal = closeChatModal;
window.closeMobileMenu = closeMobileMenu;
window.sendChatMessage = sendChatMessage;
window.startSpeechRecognition = startSpeechRecognition;
