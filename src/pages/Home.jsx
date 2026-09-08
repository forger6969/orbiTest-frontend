import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  MessagesSquare,
  Orbit,
  Radar,
} from "lucide-react";
import Header from "../Components/Header";
import logo from "../assets/logo.svg";

const Home = () => {
  const { t, i18n } = useTranslation();
  const isUzbek = i18n.language.startsWith("uz");

  const copy = isUzbek
    ? {
        label: "ORBITEST / O'QUV TIZIMI",
        hero: ["Faqat testdan", "o'tish emas.", "Yo'lingizni bilish."],
        intro:
          "O'quvchi, mentor va natijani bitta aniq trayektoriyaga birlashtiradigan IT ta'lim tizimi.",
        action: "Oqimni boshlash",
        scroll: "Tizimni ko'rish",
        orbitTitle: "O'quv orbitasi",
        orbit: ["Bilim", "Amaliyot", "Fikr-mulohaza"],
        principle: "Tartibsiz tayyorgarlik o'sishni yashiradi.",
        principleText:
          "OrbiTest har bir qadamni bitta kontekstda ushlab turadi: nimani o'rgandingiz, nimani qo'lladingiz va keyin nimani yaxshilash kerak.",
        sequence: [
          ["01", "Bilimni tekshirish", "Testlar boshlang'ich nuqtani ko'rsatadi — taxminlarni emas, aniq manzarani."],
          ["02", "Ish bilan isbotlash", "Loyiha havolasini yuboring va nazariyani amaliy natijaga aylantiring."],
          ["03", "O'sishni ko'rish", "Mentor bahosi va guruh konteksti keyingi qadamni aniq belgilaydi."],
        ],
        systemLabel: "Bitta o'quv makoni",
        systemTitle: "Keraksiz interfeyslarsiz, faqat muhim nuqtalar.",
        system: [
          ["Testlar", "Savollar, vaqt va natija. Bilimni haqiqiy ish rejimida tekshirish uchun."],
          ["Amaliy ishlar", "Loyiha havolasi, mezonlar va yuborish holati bir joyda."],
          ["Mentor bilan aloqa", "Natija tarixida saqlanadigan aniq teskari aloqa."],
        ],
        methodLabel: "Ritm emas, tizim",
        methodTitle: "O'quv jarayoni ortiqcha ma'muriyatsiz.",
        method: [
          ["Guruh", "Sizning dasturingiz, vazifalaringiz va mentorlaringiz bitta oqimda."],
          ["Tajriba", "Har bir topshiriq o'z o'rniga ega: sinov, ish, baholash."],
          ["Keyingi qadam", "Natija sizga qayerga harakat qilishni aytadi."],
        ],
        final: "O'sishni tasodifga qoldirmang.",
        finalText: "O'qishni faqat topshiriqlar ro'yxati emas, boshqariladigan jarayonga aylantiring.",
        footer: "IT-ta'lim uchun aniqroq o'quv jarayoni.",
      }
    : {
        label: "ORBITEST / УЧЕБНАЯ СИСТЕМА",
        hero: ["Не просто", "пройти тест.", "Понять свой путь."],
        intro:
          "Система для IT-обучения, которая собирает студента, ментора и результат в одну понятную траекторию.",
        action: "Начать путь",
        scroll: "Посмотреть систему",
        orbitTitle: "Учебная орбита",
        orbit: ["Знания", "Практика", "Обратная связь"],
        principle: "Хаотичная подготовка скрывает рост.",
        principleText:
          "OrbiTest удерживает каждый шаг в одном контексте: что вы изучили, как применили это в работе и что улучшать дальше.",
        sequence: [
          ["01", "Проверить знания", "Тесты показывают отправную точку — не догадки, а ясную картину."],
          ["02", "Подтвердить работой", "Отправьте ссылку на проект и превратите теорию в практический результат."],
          ["03", "Увидеть рост", "Оценка ментора и контекст группы точно определяют следующий шаг."],
        ],
        systemLabel: "Единое учебное пространство",
        systemTitle: "Без лишних интерфейсов. Только точки, которые двигают вперёд.",
        system: [
          ["Тесты", "Вопросы, время и результат — чтобы проверить знания в реальном рабочем ритме."],
          ["Практические работы", "Ссылка на проект, критерии и статус сдачи остаются в одном месте."],
          ["Диалог с ментором", "Конкретная обратная связь, которая сохраняется в истории результата."],
        ],
        methodLabel: "Не ритм, а система",
        methodTitle: "Учебный процесс без лишней административной нагрузки.",
        method: [
          ["Группа", "Ваша программа, задания и менторы находятся в одном потоке."],
          ["Практика", "У каждого задания есть своё место: проверка, работа, оценка."],
          ["Следующий шаг", "Результат сам подсказывает, куда двигаться дальше."],
        ],
        final: "Не оставляйте рост на волю случая.",
        finalText: "Превратите обучение из списка разрозненных заданий в управляемый процесс.",
        footer: "Более ясный учебный процесс для IT-образования.",
      };

  const systemIcons = [Radar, FileCheck2, MessagesSquare];

  return (
    <div className="orbit-page">
      <Header />
      <main>
        <section className="orbit-hero" id="top">
          <div className="orbit-hero__grid" aria-hidden="true" />
          <div className="orbit-container orbit-hero__layout">
            <aside className="orbit-hero__rail" aria-label="Раздел 1 из 3">
              <span>01</span>
              <i />
              <span>03</span>
            </aside>
            <div className="orbit-hero__copy">
              <p className="orbit-kicker">{copy.label}</p>
              <h1>
                {copy.hero.map((line, index) => <span key={line}>{line}{index === 1 && <em />}</span>)}
              </h1>
              <div className="orbit-hero__bottom">
                <p>{copy.intro}</p>
                <Link to="/SingUp" className="orbit-action">
                  {copy.action}<ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <figure className="orbit-map" aria-labelledby="orbit-map-title">
              <figcaption id="orbit-map-title">{copy.orbitTitle}</figcaption>
              <svg viewBox="0 0 480 480" aria-hidden="true">
                <circle cx="240" cy="240" r="205" />
                <circle cx="240" cy="240" r="146" />
                <circle cx="240" cy="240" r="78" />
                <path d="M63 122c80 48 158 47 235 0 52-31 96-34 145-11" />
                <path d="M80 371c83-58 175-56 270 1" />
                <circle className="orbit-map__point" cx="64" cy="122" r="9" />
                <circle className="orbit-map__point" cx="383" cy="121" r="9" />
                <circle className="orbit-map__point" cx="349" cy="371" r="9" />
              </svg>
              <span className="orbit-map__label orbit-map__label--one">{copy.orbit[0]}</span>
              <span className="orbit-map__label orbit-map__label--two">{copy.orbit[1]}</span>
              <span className="orbit-map__label orbit-map__label--three">{copy.orbit[2]}</span>
              <div className="orbit-map__core"><Orbit size={31} /><span>ORBI<br />TEST</span></div>
            </figure>
          </div>
          <a className="orbit-hero__scroll" href="#principle">
            <span>{copy.scroll}</span><ArrowDown size={17} aria-hidden="true" />
          </a>
          <div className="orbit-hero__cut" aria-hidden="true" />
        </section>

        <section className="orbit-principle" id="principle">
          <div className="orbit-container">
            <div className="orbit-principle__intro">
              <p className="orbit-section-index">01 / ПРИНЦИП</p>
              <h2>{copy.principle}</h2>
              <p>{copy.principleText}</p>
            </div>
            <div className="orbit-sequence">
              {copy.sequence.map(([number, title, text]) => (
                <article key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                  <i aria-hidden="true" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="orbit-system" id="features">
          <div className="orbit-system__arc" aria-hidden="true" />
          <div className="orbit-container orbit-system__layout">
            <div className="orbit-system__heading">
              <p className="orbit-section-index">02 / СИСТЕМА</p>
              <h2>{copy.systemTitle}</h2>
            </div>
            <div className="orbit-system__items">
              {copy.system.map(([title, text], index) => {
                const Icon = systemIcons[index];
                return (
                  <article key={title}>
                    <span className="orbit-system__number">0{index + 1}</span>
                    <Icon size={24} strokeWidth={1.65} />
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="orbit-method" id="about">
          <div className="orbit-container">
            <div className="orbit-method__head">
              <p className="orbit-section-index">03 / ПОДХОД</p>
              <div>
                <p className="orbit-kicker orbit-kicker--dark">{copy.methodLabel}</p>
                <h2>{copy.methodTitle}</h2>
              </div>
            </div>
            <div className="orbit-method__rows">
              {copy.method.map(([title, text], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <CheckCircle2 size={22} aria-hidden="true" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="orbit-closing">
          <div className="orbit-container">
            <div className="orbit-closing__surface">
              <div className="orbit-closing__ring" aria-hidden="true" />
              <p className="orbit-kicker">ORBITEST / START</p>
              <h2>{copy.final}</h2>
              <p>{copy.finalText}</p>
              <Link to="/SingUp" className="orbit-action orbit-action--light">
                {t("home.getStarted")}<ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="orbit-footer">
        <div className="orbit-container orbit-footer__layout">
          <div><img src={logo} alt="OrbiTest" /><p>{copy.footer}</p></div>
          <div className="orbit-footer__links">
            <a href="#principle">{copy.sequence[0][1]}</a>
            <a href="#features">{copy.systemLabel}</a>
            <Link to="/Register">{t("header.signIn")}</Link>
          </div>
          <p>© {new Date().getFullYear()} OrbiTest</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
