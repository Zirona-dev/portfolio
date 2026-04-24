const translations = {
  ko: {
    navHome: '홈',
    navPlugins: '개발한 플러그인',
    navCareer: '경력',
    eyebrow: 'ROBLOX DEV STYLE PORTFOLIO',
    heroTitle: '게임/툴 개발자 포트폴리오',
    heroText:
      '어두운 테마와 네온 포인트를 기반으로, 제가 만든 플러그인과 경력을 한눈에 볼 수 있도록 구성했습니다. 부드러운 스크롤 애니메이션과 DNA 나선형 3D 배경으로 역동적인 느낌을 더했습니다.',
    heroCta: '플러그인 보기',
    featureTitle: '개발한 플러그인',
    f1Title: '빌드 자동화 플러그인',
    f1Desc: '반복 작업을 줄이기 위해 배포/패키징 과정을 한 번에 처리하는 자동화 도구입니다.',
    f2Title: 'UI 생산성 플러그인',
    f2Desc: '컴포넌트 템플릿과 레이아웃 스냅 기능을 제공해 UI 제작 속도를 높입니다.',
    f3Title: '디버그 도우미 플러그인',
    f3Desc: '실행 로그와 상태 추적 패널을 통해 문제 원인을 빠르게 찾을 수 있습니다.',
    pricingTitle: '가격',
    p1Title: '유료 플러그인',
    p1i1: '1회 구매 / 평생 업데이트',
    p1i2: '기술 지원 포함',
    p1i3: '문서 및 예제 프로젝트 제공',
    p2Title: '커미션',
    p2Price: '협의',
    p2i1: '맞춤 기능 설계 및 개발',
    p2i2: '주간 진행 보고',
    p2i3: '출시 후 안정화 지원',
    careerTitle: '경력',
    c1Title: '프리랜스 툴/플러그인 개발자',
    c1Desc: '게임 제작 파이프라인 개선을 위한 플러그인 개발 및 유지보수 진행.',
    c2Title: '인디 게임 팀 클라이언트 개발',
    c2Desc: 'UI, 상호작용, 디버깅 도구를 담당하며 사용자 경험 개선에 기여.'
  },
  en: {
    navHome: 'Home',
    navPlugins: 'Plugins',
    navCareer: 'Career',
    eyebrow: 'ROBLOX DEV STYLE PORTFOLIO',
    heroTitle: 'Game/Tool Developer Portfolio',
    heroText:
      'Built with a dark theme and neon accents, this site highlights my plugins and career at a glance. Smooth transitions and an animated 3D DNA helix background add a dynamic feel.',
    heroCta: 'View Plugins',
    featureTitle: 'Developed Plugins',
    f1Title: 'Build Automation Plugin',
    f1Desc: 'An automation tool that handles packaging and deployment to reduce repetitive tasks.',
    f2Title: 'UI Productivity Plugin',
    f2Desc: 'Provides component templates and layout snap features for faster UI production.',
    f3Title: 'Debug Assistant Plugin',
    f3Desc: 'Quickly identify issues with runtime logs and a state-tracking panel.',
    pricingTitle: 'Pricing',
    p1Title: 'Paid Plugin',
    p1i1: 'One-time purchase / lifetime updates',
    p1i2: 'Technical support included',
    p1i3: 'Documentation + sample project',
    p2Title: 'Commission',
    p2Price: 'Negotiable',
    p2i1: 'Custom feature design and development',
    p2i2: 'Weekly progress reports',
    p2i3: 'Post-launch stabilization support',
    careerTitle: 'Career',
    c1Title: 'Freelance Tool/Plugin Developer',
    c1Desc: 'Developed and maintained plugins that improve game production pipelines.',
    c2Title: 'Indie Game Team Client Developer',
    c2Desc: 'Handled UI, interactions, and debugging tools to improve user experience.'
  }
};

let currentLanguage = 'ko';

const updateLanguage = (language) => {
  const dict = translations[language];
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    if (dict[key]) {
      node.textContent = dict[key];
    }
  });

  document.documentElement.lang = language;
  document.getElementById('lang-toggle').textContent = language === 'ko' ? 'EN' : 'KO';
};

document.getElementById('lang-toggle').addEventListener('click', () => {
  currentLanguage = currentLanguage === 'ko' ? 'en' : 'ko';
  updateLanguage(currentLanguage);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.fade-in').forEach((element) => observer.observe(element));

const canvas = document.getElementById('dna-bg');
const ctx = canvas.getContext('2d');

const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.addEventListener('resize', resize);
resize();

const strands = 24;
const pointsPerStrand = 56;
let time = 0;

const drawDNA = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width * 0.5;
  const spacingY = canvas.height / pointsPerStrand;
  const amplitude = Math.min(180, canvas.width * 0.22);

  for (let s = 0; s < strands; s += 1) {
    const layerDepth = s / strands;
    const alpha = 0.1 + layerDepth * 0.35;
    const hueShift = 190 + layerDepth * 22;

    for (let i = 0; i < pointsPerStrand; i += 1) {
      const y = i * spacingY;
      const phase = i * 0.35 + time + s * 0.28;

      const x1 = centerX + Math.sin(phase) * amplitude * (0.35 + layerDepth * 0.7);
      const x2 = centerX + Math.sin(phase + Math.PI) * amplitude * (0.35 + layerDepth * 0.7);

      const zScale = (Math.cos(phase) + 1.5) / 2.5;
      const r = 1.6 + zScale * 2.6;

      ctx.fillStyle = `hsla(${hueShift}, 95%, 60%, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x1, y, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x2, y, r, 0, Math.PI * 2);
      ctx.fill();

      if (i % 4 === 0) {
        ctx.strokeStyle = `hsla(${hueShift}, 90%, 55%, ${alpha * 0.8})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();
      }
    }
  }

  time += 0.015;
  requestAnimationFrame(drawDNA);
};

drawDNA();
updateLanguage(currentLanguage);
