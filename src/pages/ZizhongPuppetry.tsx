import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import heroVideo from '@media/video/hero-video.mp4'
import craftImg from '@/assets/zizhong-puppet-craft.jpg'
import stageImg from '@/assets/zizhong-puppet-stage.jpg'

type Lang = 'zh' | 'en'
type Bi = { zh: string; en: string }

const T: Record<string, Bi> = {
  badge: { zh: '国家级非物质文化遗产 · 四川资中', en: 'National Intangible Heritage · Zizhong, Sichuan' },
  titleZh: { zh: '资中木偶', en: 'Zizhong Puppetry' },
  titleEn: { zh: 'ZIZHONG PUPPETRY', en: '资中木偶 · 百年传承' },
  heroDesc: {
    zh: '百年杖头，一线牵动古今。源自沱江之滨的资中木偶戏，以中型杖头木偶为形、川剧五大声腔为韵，在艺人指掌之间，演尽千秋风云。',
    en: 'A century-old rod puppet tradition from the banks of the Tuo River. Mid-sized rod puppets brought to life by master artisans, voiced in the five tonal styles of Sichuan Opera — telling timeless stories from the palm of a hand.',
  },
  ctaTrace: { zh: '溯源百年', en: 'Trace the Heritage' },
  ctaCraft: { zh: '观其匠艺', en: 'Witness the Craft' },
  scroll: { zh: '向下滚动', en: 'SCROLL' },
  stat1: { zh: '传承年份', en: 'Years of Heritage' },
  stat2: { zh: '传统剧目', en: 'Classic Plays' },
  stat3: { zh: '巡演国家', en: 'Countries Toured' },
  stat4: { zh: '木偶身高', en: 'Puppet Height' },
  heritageOver: { zh: 'A Heritage Timeline', en: '百年时间线' },
  heritageTitle: { zh: '百年传承', en: 'A Century of Heritage' },
  craftOver: { zh: 'The Craft', en: '匠艺之心' },
  craftTitle: { zh: '一木一神，一线一魂', en: 'A Spirit in Every Wood, A Soul on Every String' },
  craftP1: {
    zh: '资中木偶以"中型杖头"为标志——偶高约一米二，既有大型木偶之气势，又具小型木偶之灵动。艺人立于幕后，左手执命杆，右手操签子，让木偶眨眼、张口、舞袖、挥剑，活灵活现。',
    en: 'Zizhong is defined by its mid-sized rod puppet — about 1.2 meters tall, balancing the grandeur of the large and the agility of the small. From behind the curtain, the artist guides the central rod with one hand and the control sticks with the other, making the puppet blink, speak, dance, and duel.',
  },
  craftP2: {
    zh: '偶头雕刻以樟木为材，经选料、开坯、雕刻、打磨、彩绘、装銮六道工序，方成一具传神偶身。',
    en: 'Each head is hand-carved from camphor wood through six painstaking stages — selection, roughing, carving, sanding, painting, and dressing — until a single soulful figure is born.',
  },
  repertoireOver: { zh: 'Signature Repertoire', en: '经典剧目' },
  repertoireTitle: { zh: '经典剧目', en: 'Signature Repertoire' },
  quote: { zh: '"偶动天地动，戏开众生开。"', en: '"When the puppet moves, the world stirs; when the play begins, all beings awaken."' },
  back: { zh: '返回首页', en: '← Back Home' },
  footer: { zh: '© 资中木偶剧团 · 国家级非物质文化遗产', en: '© Zizhong Puppet Troupe · National Intangible Cultural Heritage' },
}

const heritage: { year: Bi; title: Bi; desc: Bi }[] = [
  { year: { zh: '清·咸丰年间', en: 'Qing · Xianfeng Era' }, title: { zh: '源起资中', en: 'Origins in Zizhong' }, desc: { zh: '杖头木偶随川剧戏班传入资中，扎根于沱江之畔的乡野庙会。', en: 'Rod puppetry arrived with Sichuan Opera troupes and took root in the temple fairs along the Tuo River.' } },
  { year: { zh: '民国时期', en: 'Republican Era' }, title: { zh: '名班林立', en: 'Golden Age of Troupes' }, desc: { zh: '"金泰班""万寿班"等戏班走南闯北，把资中木偶带到川渝各地。', en: 'Famed troupes like Jintai and Wanshou toured across Sichuan and Chongqing, spreading the art far and wide.' } },
  { year: { zh: '1953 年', en: '1953' }, title: { zh: '剧团成立', en: 'Troupe Founded' }, desc: { zh: '资中木偶剧团组建，集中民间艺人，整理传统剧目近二百出。', en: 'The Zizhong Puppet Troupe was founded, gathering folk artists and preserving nearly 200 traditional plays.' } },
  { year: { zh: '2008 年', en: '2008' }, title: { zh: '国家级非遗', en: 'National Heritage Status' }, desc: { zh: '资中中型杖头木偶戏被列入国家级非物质文化遗产名录。', en: 'Inscribed on China\'s National Intangible Cultural Heritage list.' } },
  { year: { zh: '当代', en: 'Today' }, title: { zh: '走向世界', en: 'Onto the World Stage' }, desc: { zh: '远赴法国、德国、日本等四十余国巡演，被誉为"东方艺术瑰宝"。', en: 'Touring over 40 countries — France, Germany, Japan and beyond — hailed as a "treasure of Eastern art".' } },
]

const features: { tag: Bi; title: Bi; desc: Bi; accent: string }[] = [
  { tag: { zh: '形', en: 'Form' }, title: { zh: '中型杖头', en: 'Mid-Sized Rod' }, desc: { zh: '木偶高约 1.2 米，介于大、小杖头之间，操纵灵巧又见气韵。', en: 'A 1.2m puppet — agile yet stately, the signature of Zizhong.' }, accent: 'accent-blue' },
  { tag: { zh: '艺', en: 'Art' }, title: { zh: '人偶同台', en: 'Artist & Puppet' }, desc: { zh: '艺人执杖与木偶共舞，"以人带偶、以偶传情"。', en: 'Artist and puppet share the stage — moving as one to convey emotion.' }, accent: 'accent-emerald' },
  { tag: { zh: '腔', en: 'Voice' }, title: { zh: '川剧声腔', en: 'Sichuan Opera Vocals' }, desc: { zh: '兼融高腔、胡琴、弹戏、灯调五大声腔，唱念做打俱全。', en: 'Blending the five vocal styles of Sichuan Opera — sung, spoken, and played in full.' }, accent: 'accent-purple' },
  { tag: { zh: '工', en: 'Craft' }, title: { zh: '一木一神', en: 'Hand-Carved Soul' }, desc: { zh: '头胎雕刻、彩绘、装銮全凭手工，一具偶头需月余方成。', en: 'Every head is carved, painted and dressed by hand — over a month for a single puppet.' }, accent: 'accent-blue' },
 ]

const plays: Bi[] = [
  { zh: '请神', en: 'Invoking the Gods' },
  { zh: '变脸吐火', en: 'Face-Changing & Fire-Spitting' },
  { zh: '钟馗嫁妹', en: "Zhong Kui Marries His Sister" },
  { zh: '人偶丑情', en: 'The Clown & His Puppet' },
  { zh: '化蝶', en: 'Becoming Butterflies' },
  { zh: '白蛇传', en: 'Legend of the White Snake' },
  { zh: '满江红', en: 'The Whole River Red' },
  { zh: '哪吒闹海', en: 'Nezha Stirs the Sea' },
  { zh: '三调芭蕉扇', en: 'Three Borrowings of the Banana Fan' },
]

// Apple-style silky easing
const silk = [0.22, 1, 0.36, 1] as const
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: silk } },
}

export default function ZizhongPuppetry() {
  const [lang, setLang] = useState<Lang>('zh')
  const t = (b: Bi) => b[lang]

  // Parallax hero
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '30%'])
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.15])
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0])

  // Page-wide smooth scroll progress bar
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.001 })

  // Craft image parallax
  const craftRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: cp } = useScroll({ target: craftRef, offset: ['start end', 'end start'] })
  const craftY = useTransform(cp, [0, 1], ['-8%', '8%'])

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }, [lang])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Silky scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-50"
        style={{ scaleX: progress, background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-emerald), var(--accent-purple))' }}
      />

      {/* Floating language switch */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: silk, delay: 0.4 }}
        className="fixed top-6 right-6 z-50"
      >
        <div className="relative flex items-center p-1 rounded-full bg-card/60 backdrop-blur-xl border border-border shadow-lg">
          <motion.div
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-foreground"
            animate={{ x: lang === 'zh' ? 0 : '100%' }}
            transition={{ type: 'spring', stiffness: 200, damping: 28 }}
          />
          {(['zh', 'en'] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`relative z-10 px-5 py-1.5 text-xs font-semibold tracking-widest uppercase transition-colors duration-500 ${lang === l ? 'text-background' : 'text-muted-foreground hover:text-foreground'}`}
              aria-pressed={lang === l}
            >
              {l === 'zh' ? '中' : 'EN'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <video src={heroVideo} autoPlay loop muted playsInline className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </motion.div>
        {/* film grain */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)', backgroundSize: '3px 3px' }} />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div style={{ opacity: heroOpacity }} className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={lang}
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
                transition={{ duration: 1.1, ease: silk }}
              >
                <div className="inline-flex items-center gap-3 mb-8">
                  <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
                  <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">{t(T.badge)}</span>
                </div>
                <h1 className="font-bagel text-6xl sm:text-7xl lg:text-8xl leading-[0.95] mb-6"
                  style={{ textShadow: '0 8px 40px rgba(0,0,0,0.6)' }}>
                  {t(T.titleZh)}
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
                  {t(T.heroDesc)}
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    href="#heritage" className="px-8 py-4 rounded-full bg-foreground text-background font-semibold">
                    {t(T.ctaTrace)}
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    href="#craft" className="px-8 py-4 rounded-full border border-border backdrop-blur-md font-semibold hover:bg-card/50">
                    {t(T.ctaCraft)}
                  </motion.a>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs tracking-[0.4em] text-muted-foreground"
        >
          <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} className="inline-block">
            {t(T.scroll)} ↓
          </motion.span>
        </motion.div>
      </section>

      {/* INTRO STATS */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { n: '170+', l: T.stat1 },
              { n: '200', l: T.stat2 },
              { n: '40+', l: T.stat3 },
              { n: '1.2m', l: T.stat4 },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.1, ease: silk, delay: i * 0.12 }}
                className="text-center"
              >
                <div className="font-bagel text-5xl lg:text-6xl mb-2" style={{ color: 'var(--accent-purple)' }}>{s.n}</div>
                <div className="text-sm tracking-widest uppercase text-muted-foreground">{t(s.l)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HERITAGE TIMELINE */}
      <section id="heritage" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-card/20 via-background to-card/20" />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }} className="text-center mb-20">
            {lang === 'zh' && <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">{t(T.heritageOver)}</span>}
            <h2 className="font-bagel text-5xl lg:text-6xl mt-4">{t(T.heritageTitle)}</h2>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
            <div className="space-y-16">
              {heritage.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 60, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1.2, ease: silk }}
                  className={`relative flex items-start gap-6 md:gap-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <motion.div
                    initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: silk, delay: 0.2 }}
                    className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-accent-blue -translate-x-1/2 mt-2 ring-4 ring-background"
                  />
                  <div className="hidden md:block flex-1" />
                  <div className="flex-1 pl-12 md:pl-0">
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                      className={`p-8 rounded-2xl bg-card/60 backdrop-blur-md border border-border ${i % 2 === 0 ? 'md:ml-12' : 'md:mr-12'}`}
                    >
                      <div className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: 'var(--accent-emerald)' }}>{t(h.year)}</div>
                      <h3 className="font-bagel text-2xl mb-3">{t(h.title)}</h3>
                      <p className="text-muted-foreground leading-relaxed">{t(h.desc)}</p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CRAFT / FEATURES */}
      <section id="craft" className="py-24 relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
              {lang === 'zh' && <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">{t(T.craftOver)}</span>}
              <h2 className="font-bagel text-5xl lg:text-6xl mt-4 mb-6">{t(T.craftTitle)}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">{t(T.craftP1)}</p>
              <p className="text-lg text-muted-foreground leading-relaxed">{t(T.craftP2)}</p>
            </motion.div>
            <motion.div
              ref={craftRef}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.4, ease: silk }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-border">
                <motion.img
                  src={craftImg}
                  alt={lang === 'zh' ? '木偶操纵' : 'Puppet craftsmanship'}
                  style={{ y: craftY, scale: 1.15 }}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 px-6 py-3 rounded-full bg-foreground text-background text-sm tracking-widest">
                {lang === 'zh' ? '匠 · CRAFT' : 'CRAFTSMANSHIP'}
              </div>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1.1, ease: silk, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative p-8 rounded-2xl bg-card/60 backdrop-blur-md border border-border hover:border-foreground/30 transition-colors duration-700"
              >
                <div className="font-bagel text-6xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 mb-4" style={{ color: `var(--${f.accent})` }}>
                  {t(f.tag)}
                </div>
                <h3 className="font-bagel text-2xl mb-3">{t(f.title)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(f.desc)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STAGE / REPERTOIRE */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={stageImg} alt={lang === 'zh' ? '戏台' : 'Stage'} className="w-full h-full object-cover opacity-30" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
              {lang === 'zh' && <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">{t(T.repertoireOver)}</span>}
              <h2 className="font-bagel text-5xl lg:text-6xl mt-4 mb-12">{t(T.repertoireTitle)}</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {plays.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.9, ease: silk, delay: i * 0.05 }}
                  whileHover={{ scale: 1.04, y: -4 }}
                  className="px-6 py-5 rounded-xl bg-card/40 backdrop-blur-md border border-border hover:bg-card/70 transition-colors duration-500"
                >
                  <span className="font-bagel text-xl">{lang === 'zh' ? `《${p.zh}》` : p.en}</span>
                </motion.div>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 1.6, ease: silk }}
              className="mt-12 text-muted-foreground italic"
            >
              {t(T.quote)}
            </motion.p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-bagel text-2xl">{t(T.titleZh)}</div>
          <div className="text-sm text-muted-foreground">{t(T.footer)}</div>
          <a href="/" className="text-sm tracking-widest uppercase hover:text-foreground text-muted-foreground transition">{t(T.back)}</a>
        </div>
      </footer>
    </div>
  )
}