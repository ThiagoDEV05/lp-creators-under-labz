import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Globe, Instagram, Linkedin, Music2, Youtube } from "lucide-react";

const socials = [
  { label: "YouTube", href: "https://www.youtube.com/@underlabzoficial", icon: Youtube },
  { label: "Instagram", href: "https://www.instagram.com/underlabzoficial", icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/underlabz", icon: Linkedin },
  { label: "TikTok", href: "https://www.tiktok.com/@underlabzoficial", icon: Music2 },
  { label: "Site", href: "https://underlabz.com.br", icon: Globe },
];

import { FloatingBullets } from "@/components/FloatingBullets";
import logoAsset from "@/assets/underlabz-logo-white.png";
import bannerDesktop from "@/assets/banner-desktop-4.png";
import bannerMobile from "@/assets/banner-mobile-4.png";
import img1 from "@/assets/como-funciona.png";
import img2 from "@/assets/time-underdogz.png";
import reelA from "@/assets/videos/reel-a.mp4";
import reelB from "@/assets/videos/reel-b.mp4";
import reelC from "@/assets/videos/reel-c.mp4";
import reelCaio from "@/assets/videos/reel-caio-tattoos.mp4";
import reelJulia2 from "@/assets/videos/reel-julia-gassen-2.mp4";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Underdogz | Time de Creators da Under Labz" },
      {
        name: "description",
        content:
          "Inscreva-se no Underdogz: o programa de creators da Under Labz. Produto, campanhas, cupom próprio, comissão e comunidade.",
      },
      { property: "og:title", content: "Underdogz | Time de Creators da Under Labz" },
      {
        property: "og:description",
        content:
          "Nem todo mundo nasce favorito. Faça parte do time de creators da Under Labz.",
      },
    ],
  }),
  component: Index,
});

/** Único lugar para trocar o destino do cadastro. */
const CTA_URL = "https://underlabz.pilea.app/influencers/cadastro";

type CtaLocation = "hero" | "beneficios" | "como_funciona" | "sticky_mobile" | "fechamento";

/** Preserva a sessão do GTM entre underlabz.com.br e underlabz.pilea.app. */
function withCrossDomain(url: string) {
  if (typeof window === "undefined") return url;
  try {
    const gl = new URLSearchParams(window.location.search).get("_gl");
    if (!gl) return url;
    const target = new URL(url);
    target.searchParams.set("_gl", gl);
    return target.toString();
  } catch {
    return url;
  }
}

function trackCta(location: CtaLocation) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: "click_cta_cadastro", cta_location: location });
}

function Cta({
  children = "Quero participar",
  location,
  className = "",
}: {
  children?: string;
  location: CtaLocation;
  className?: string;
}) {
  return (
    <a
      href={CTA_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        trackCta(location);
        e.currentTarget.href = withCrossDomain(CTA_URL);
      }}
      className={`group inline-flex items-center gap-3 bg-primary px-7 py-3.5 font-display text-base uppercase tracking-wide text-primary-foreground rounded-full transition-all duration-300 ease-out hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.7)] active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}
    >
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
    </a>

  );
}

const steps = [
  {
    n: "01",
    t: "Inscreva-se",
    d: "Preencha o formulário com seus dados e perfil de creator. Após a análise e aprovação, você terá acesso à comunidade de creators da Under Labz.",
  },
  {
    n: "02",
    t: "Receba produto + briefing",
    d: "Você recebe produto e um briefing com os caminhos de conteúdo que funcionam: educativo, rotina, bastidor e comparativo. O formato é livre e a verdade é obrigatória.",
  },
  {
    n: "03",
    t: "Publique e marque a Under Labz",
    d: "Compartilhe o produto na sua rotina real e marque @underlabzoficial nas publicações.",
  },
  {
    n: "04",
    t: "Seja reconhecido",
    d: "Tenha acesso a comissões, recompensas, reposts nos canais da marca e oportunidades exclusivas em campanhas e lançamentos.",
  },
];

const perks = [
  {
    t: "Produto todo mês",
    d: "Você recebe produto da Under Labz para conhecer, usar e criar conteúdo em cima. A quantidade cresce conforme o seu nível dentro do time.",
  },
  {
    t: "Cupom de 10% com o seu nome",
    d: "O seu cupom é exclusivo e leva o seu nome. Quem usar ele ganha 10% de desconto na compra.",
  },
  {
    t: "Comissão progressiva",
    d: "Você ganha comissão sobre toda venda confirmada no seu cupom. Quanto mais alto o seu nível, maior a comissão — e ainda entram bônus em dinheiro por performance.",

  },
  {
    t: "20% off nas suas compras",
    d: "Você compra com desconto exclusivo uma vez por mês, e esse desconto chega a 30% nos níveis mais altos.",
  },
  {
    t: "Campanhas e visibilidade",
    d: "Você participa de todas as campanhas da marca e os seus melhores conteúdos podem ser repostados nos canais oficiais da Under Labz.",
  },
];

const creatorVideos = [
  { src: reelA, handle: "@julia_gassen" },
  { src: reelB, handle: "@vilela" },
  { src: reelC, handle: "@caduassayag" },
  { src: reelCaio, handle: "@caiotattoos" },
  { src: reelJulia2, handle: "@julia_gassen" },
];


/** Se o total de creators não for preenchido, deixe como string vazia para sumir a linha. */
const TOTAL_CREATORS = "1.000";

const ranking = [
  { pos: "1º", prize: "R$ 2.000", color: "text-gold", label: "Ouro" },
  { pos: "2º", prize: "R$ 1.000", color: "text-silver", label: "Prata" },
  { pos: "3º", prize: "R$ 500", color: "text-bronze", label: "Bronze" },
];

function Medal({ place, className = "" }: { place: string; className?: string }) {
  return (
    <span
      className={`inline-flex h-14 w-14 items-center justify-center rounded-full border border-current/40 bg-current/10 ${className}`}
    >
      <span className="font-display text-xl leading-none">{place}</span>
    </span>
  );
}





const faq = [
  {
    q: "Como funciona a remuneração?",
    a: "Você ganha comissão sobre toda venda confirmada no seu cupom, e a sua audiência ganha desconto ao usar ele. Conforme você sobe de nível, a comissão aumenta e entram bônus por performance, além do ranking mensal com premiação em dinheiro. Os valores e percentuais completos são apresentados para quem é aprovado na comunidade.",
  },
  {
    q: "Quem pode participar?",
    a: "Creators maiores de 18 anos, que se identificam com o universo da Under Labz, produzem conteúdos autênticos e têm interesse em construir uma parceria de longo prazo com a marca. Você não precisa ter milhões de seguidores, avaliamos principalmente a qualidade do conteúdo, a conexão com a audiência e o alinhamento com nossos valores.",
  },
  {
    q: "Como saber se fui aceita para participar?",
    a: "Após o envio da inscrição, nosso time analisará seu perfil. Caso você seja selecionada, entraremos em contato pelos dados informados no formulário com as orientações para os próximos passos e o acesso à comunidade.",
  },
  {
    q: "O que acontece se eu não bater a meta do mês?",
    a: "Você continua no time. O que muda é que não recebe produto novo no mês seguinte, e se passar dois ciclos sem entregar, você desce um nível. Também é preciso manter constância: quem fica 30 dias sem postar sai da comunidade.",
  },
  {
    q: "O que eu posso ou não fazer?",
    a: "Você pode criar conteúdos autênticos, compartilhar sua experiência real com os produtos e divulgar seu cupom ou link seguindo as orientações da Under Labz. Não são permitidas informações falsas, promessas de resultados, divulgação de benefícios não aprovados, uso indevido da marca ou qualquer conteúdo que desrespeite as diretrizes do programa.",
  },
  {
    q: "Há exclusividade?",
    a: "A participação no programa não exige exclusividade geral. Porém, algumas campanhas ou ações especiais podem ter condições específicas, que serão sempre informadas com antecedência.",
  },
  {
    q: "Caso eu não queira mais fazer parte do programa, o que devo fazer?",
    a: "Basta entrar em contato com nosso time e solicitar sua saída. O processo é simples, e você receberá as orientações necessárias para encerrar sua participação no programa.",
  },
];

function Index() {
  const [open, setOpen] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const finalRef = useRef<HTMLDivElement | null>(null);
  const [pastHero, setPastHero] = useState(false);
  const [finalVisible, setFinalVisible] = useState(false);
  const perksRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = perksRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let paused = false;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;
    let last = performance.now();
    const SPEED = 26; // px por segundo

    const pause = () => {
      paused = true;
      if (resumeTimer) clearTimeout(resumeTimer);
    };
    const resumeSoon = (delay: number) => {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        paused = false;
      }, delay);
    };

    const onDown = pause;
    const onUp = () => resumeSoon(2500);

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("touchstart", onDown, { passive: true });
    el.addEventListener("touchend", onUp, { passive: true });

    let offset = el.scrollLeft;
    const timer = window.setInterval(() => {
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const half = el.scrollWidth / 2;
      if (!paused && half > 0) {
        offset += SPEED * dt;
        if (offset >= half) offset -= half;
        el.scrollLeft = offset;
      } else {
        offset = el.scrollLeft;
      }
    }, 25);



    return () => {
      window.clearInterval(timer);
      if (resumeTimer) clearTimeout(resumeTimer);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);

      el.removeEventListener("touchstart", onDown);
      el.removeEventListener("touchend", onUp);
    };
  }, []);



  useEffect(() => {
    const obsHero = new IntersectionObserver(
      (entries) => setPastHero(!(entries[0]?.isIntersecting ?? true)),
      { threshold: 0 },
    );
    const obsFinal = new IntersectionObserver(
      (entries) => setFinalVisible(entries[0]?.isIntersecting ?? false),
      { threshold: 0 },
    );
    if (heroRef.current) obsHero.observe(heroRef.current);
    if (finalRef.current) obsFinal.observe(finalRef.current);
    return () => {
      obsHero.disconnect();
      obsFinal.disconnect();
    };
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((n) => n.classList.add("is-revealed"));
      return;
    }
    nodes.forEach((n) => n.classList.add("reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const showSticky = pastHero && !finalVisible;


  return (
    <div className="min-h-screen overflow-x-hidden">
      <header className="flex items-center justify-center border-b border-border px-6 py-5">
        <a href="/" className="inline-flex">
          <img src={logoAsset} alt="Under Labz" className="h-12 w-auto sm:h-14" />
        </a>

      </header>

      {/* HERO */}
      <section className="relative" ref={heroRef}>
        <picture>
          <source media="(min-width: 768px)" srcSet={bannerDesktop} />
          <img
            src={bannerMobile}
            alt="Underdogz — comunidade de creators da Under Labz reunida com o mascote"
            className="block w-full h-auto object-contain"
          />
        </picture>

        <div className="grain relative overflow-hidden px-6 py-14 sm:py-16">
          <FloatingBullets />
          <div data-reveal className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
            <p className="mb-6 font-display text-sm tracking-[0.3em] text-primary">
              FAÇA PARTE DO NOSSO TIME DE CREATORS
            </p>
            <h1 className="text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95] tracking-tight">
              <span className="block">NEM TODO MUNDO</span>
              <span className="block">
                NASCE <span className="tag-blue">FAVORITO</span>
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground">
              Sua história pode levar outras pessoas mais longe.
              <br />
              Receba produtos, compartilhe sua rotina com seu cupom exclusivo e transforme sua
              influência em reconhecimento, benefícios e ganhos.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              <Cta location="hero" />
              <span className="font-display text-base uppercase tracking-[0.2em] text-accent sm:text-lg">
                WE ARE UNDERDOGZ
              </span>
            </div>

            <p className="mt-5 flex max-w-xl items-start justify-center gap-2 text-sm text-muted-foreground">
              <span aria-hidden="true" className="text-primary">
                ✦
              </span>
              A gente olha o conteúdo e a conexão com a sua audiência, não o tamanho do seu
              perfil. Maiores de 18 anos.
            </p>
          </div>

        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-border bg-primary py-2.5">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k} className="flex shrink-0">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="px-3 font-display text-sm uppercase tracking-[0.2em] text-primary-foreground sm:text-base"
                >
                  BORN TO DISRUPT · WE ARE UNDERDOGZ ·
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* O QUE É */}
      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <p className="mb-4 font-display text-sm tracking-[0.3em] text-accent">O QUE É?</p>
            <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] tracking-tight">
              Conheça o Time Underdogz
            </h2>
            <img
              src={img2}
              alt="Atletas Under Labz com o mascote Underdogz"
              className="mt-8 w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </div>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              Transforme sua influência em resultados reais. Crie conteúdos, participe de
              campanhas exclusivas, divulgue seu cupom e evolua em uma comunidade que premia a
              sua constância.
            </p>
            <p>
              Se você busca crescimento de verdade, seu lugar é no Time Underdogz.
            </p>

            <p className="font-display text-lg tracking-wide text-foreground">Born to Disrupt. Together.</p>
          </div>
        </div>
      </section>


      {/* O QUE VOCÊ GANHA */}
      <section className="border-y border-border bg-card py-16 sm:py-20">
        <div data-reveal className="mx-auto max-w-6xl px-6">
          <h2 className="max-w-3xl text-[clamp(1.75rem,3.6vw,2.9rem)] tracking-tight">
            O que você ganha sendo <span className="tag-blue">creator</span>
          </h2>
        </div>

        <div
          ref={perksRef}
          className="mt-10 flex gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {[...perks, ...perks].map((p, i) => (
            <div
              key={`${p.t}-${i}`}
              aria-hidden={i >= perks.length}
              className="w-[78%] shrink-0 rounded-2xl border border-border bg-background/40 p-6 sm:w-[46%] lg:w-[31%]"
            >
              <h3 className="text-xl text-primary">{p.t}</h3>
              <p className="mt-3 text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>


        <div className="mx-auto mt-10 max-w-6xl px-6 text-center">
          <Cta location="beneficios">Fazer minha inscrição</Cta>
        </div>
      </section>


      {/* PROVA SOCIAL */}
      <section className="px-6 py-16 sm:py-20">
        <div data-reveal className="mx-auto max-w-6xl">
          <p className="mb-4 font-display text-sm tracking-[0.3em] text-primary">
            JÁ ESTÃO DENTRO
          </p>
          <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] tracking-tight">O time em movimento</h2>

          <CreatorReels />


          {TOTAL_CREATORS && (
            <p className="mt-10 text-center font-display text-lg">
              + de {TOTAL_CREATORS} creators já fazem parte do Time Underdogz.
            </p>
          )}
        </div>
      </section>

      {/* RANKING MENSAL */}
      <section className="border-y border-border px-6 py-16 sm:py-20">
        <div data-reveal className="mx-auto max-w-6xl">
          <p className="mb-4 font-display text-sm tracking-[0.3em] text-accent">TODO MÊS</p>
          <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] tracking-tight">Os três primeiros levam</h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:items-end">
            {ranking.map((r, i) => (
              <div
                key={r.pos}
                className={`relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-center ${
                  i === 0 ? "sm:order-2 sm:pb-10 sm:pt-10" : i === 1 ? "sm:order-1" : "sm:order-3"
                }`}
              >
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-1 ${
                    i === 0 ? "bg-gold" : i === 1 ? "bg-silver" : "bg-bronze"
                  }`}
                />
                <Medal place={r.pos} className={`${r.color} mx-auto`} />
                <span className="mt-4 block font-display text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {r.label} · {r.pos} lugar
                </span>
                <p className="mt-2 font-display text-[clamp(1.9rem,3.5vw,2.75rem)] text-primary">
                  {r.prize}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-lg text-muted-foreground">
            Todo mês o time acompanha vendas no cupom e conteúdos publicados para montar o
            ranking. Quem mantém constância e entrega resultado sobe de posição e concorre aos
            prêmios do ciclo.
          </p>


        </div>
      </section>





      {/* COMO FUNCIONA */}
      <section className="px-6 py-16 sm:py-20">
        <div data-reveal className="mx-auto max-w-6xl">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 font-display text-sm tracking-[0.3em] text-accent">FAÇA PARTE</p>
              <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] tracking-tight">Como funciona a parceria</h2>
            </div>
            <img
              src={img1}
              alt="Mascote Underdogz anotando o briefing"
              className="aspect-[4/3] w-full rounded-2xl border border-border object-cover md:aspect-[16/10]"
              loading="lazy"
            />
          </div>

          <div className="mt-12 grid gap-3">
            {steps.map((s) => (
              <div
                key={s.n}
                className="grid gap-3 rounded-2xl border border-border p-6 md:grid-cols-[auto_1fr_2fr] md:items-baseline md:gap-8"
              >
                <span className="font-display text-2xl text-primary">{s.n}</span>
                <h3 className="text-xl">{s.t}</h3>
                <p className="text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Cta location="como_funciona">Quero entrar no time</Cta>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border px-6 py-16 sm:py-20">
        <div data-reveal className="mx-auto max-w-4xl">
          <p className="mb-4 font-display text-sm tracking-[0.3em] text-primary">FAQ</p>
          <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] tracking-tight">Dúvidas frequentes</h2>
          <p className="mt-4 text-muted-foreground">
            Encontre respostas para as perguntas mais comuns e saiba tudo sobre o nosso
            programa.
          </p>
          <div className="mt-12 border-t border-border">
            {faq.map((f, i) => (
              <div key={f.q} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span className="font-display text-base uppercase sm:text-lg">{f.q}</span>
                  <span
                    aria-hidden="true"
                    className={`font-display text-2xl text-primary transition-transform ${
                      open === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {open === i && <p className="pb-6 text-muted-foreground">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        className="grain relative bg-primary px-6 py-16 sm:py-20 text-primary-foreground"
        ref={finalRef}
      >
        <div data-reveal className="mx-auto max-w-5xl text-center">
          <h2 className="text-[clamp(2rem,5vw,3.6rem)] leading-[1.25] tracking-tight sm:leading-tight">
            A comunidade Underdogz está aberta
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg opacity-90">
            Ninguém aqui foi escolhido por número. Foi escolhido por atitude.
          </p>
          <div className="mt-10">
            <a
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                trackCta("fechamento");
                e.currentTarget.href = withCrossDomain(CTA_URL);
              }}
              className="inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 font-display text-lg uppercase text-ink transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              Quero participar <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="px-6 py-10 pb-28 text-center text-sm text-muted-foreground md:pb-10">
        <img src={logoAsset} alt="Under Labz" className="mx-auto h-16 w-auto" loading="lazy" />
        <p className="mt-2">@underlabzoficial · #BORNTODISRUPT</p>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid size-11 place-items-center rounded-full border border-border bg-card/60 text-foreground transition hover:border-primary hover:text-primary"
              >
                <s.icon size={18} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          <a href="/politica-de-privacidade" className="hover:text-foreground">
            Política de Privacidade
          </a>
          <span aria-hidden="true"> · </span>
          <a href="/regulamento" className="hover:text-foreground">
            Regulamento do Programa
          </a>
          <span aria-hidden="true"> · </span>
          <a
            href="https://www.instagram.com/underlabzoficial"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            Fale com a gente
          </a>
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          Under Labz — CNPJ 34.168.239/0001-97
        </p>
      </footer>

      {/* CTA FIXO MOBILE */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur transition-transform md:hidden ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <a
          href={CTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            trackCta("sticky_mobile");
            e.currentTarget.href = withCrossDomain(CTA_URL);
          }}
          className="flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-primary px-6 font-display text-base uppercase text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Quero participar <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}

function CreatorReels() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-reel]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    const max = el.scrollWidth - el.clientWidth;
    let target = el.scrollLeft + dir * step;
    if (target > max - 4) target = dir === 1 ? 0 : max;
    if (target < 0) target = max;
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const pause = () => {
      pausedRef.current = true;
    };
    const resume = () => {
      window.setTimeout(() => {
        pausedRef.current = false;
      }, 4000);
    };

    el.addEventListener("pointerdown", pause);
    el.addEventListener("pointerup", resume);
    el.addEventListener("pointercancel", resume);
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume, { passive: true });

    const id = window.setInterval(() => {
      if (!pausedRef.current) scrollBy(1);
    }, 4000);

    return () => {
      window.clearInterval(id);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("pointerup", resume);
      el.removeEventListener("pointercancel", resume);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, []);

  return (
    <div className="relative mt-10">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >

        {creatorVideos.map((v) => (
          <figure
            key={v.src}
            data-reel
            className="w-[70%] shrink-0 snap-start sm:w-[38%] lg:w-[23%]"
          >
            <div className="aspect-[9/16] w-full overflow-hidden rounded-xl bg-secondary">
              <video
                src={v.src}
                className="size-full object-cover"
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                controls
              />
            </div>
            <figcaption className="mt-2 text-sm text-muted-foreground">{v.handle}</figcaption>
          </figure>
        ))}
      </div>

      <button
        type="button"
        aria-label="Vídeos anteriores"
        onClick={() => scrollBy(-1)}
        className="absolute left-0 top-1/2 hidden size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-card/90 text-foreground transition hover:bg-card md:grid"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Próximos vídeos"
        onClick={() => scrollBy(1)}
        className="absolute right-0 top-1/2 hidden size-10 -translate-y-1/2 translate-x-1/2 place-items-center rounded-full border border-border bg-card/90 text-foreground transition hover:bg-card md:grid"
      >
        ›
      </button>
    </div>
  );
}
