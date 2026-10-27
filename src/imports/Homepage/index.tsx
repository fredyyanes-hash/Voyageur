import svgPaths from "./svg-ns63ae808b";
import imgRectangle from "./hero-vineyard.jpg";
import imgWineMockUpCopy1 from "./wine-pairing-feature.jpg";
import imgStylishYoungGirlWithFoxyHairstyleInModernStrawHatAndCoolSummerOutfitPosingWithGlassWithChampagneOutdoor from "./wine-tasting-lifestyle.png";
import imgVisitUsImage from "./visit-vineyard.png";
import imgRectangle62 from "./header-texture.png";

function Frame1() {
  return (
    <div className="absolute bg-[rgba(64,73,97,0.6)] content-stretch flex gap-[22px] h-[161px] items-center justify-center left-[calc(16.67%+62px)] p-[10px] rounded-[12px] top-[643px] w-[837px]">
      <div className="[word-break:break-word] flex flex-col font-['Futura:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[37px] text-white whitespace-nowrap">
        <p className="leading-[50px]">Savor the journey</p>
      </div>
      <div className="flex h-[96px] items-center justify-center relative shrink-0 w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[96px]" data-name="Line">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 96 1">
                <line id="Line" stroke="var(--stroke-0, white)" x2="96" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="[word-break:break-word] flex flex-col font-['Lora:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#f1f6ff] text-[16px] w-[411px]">
        <p className="leading-[24px] whitespace-pre-wrap">{`Voyageur  invites you on a journey of true discovery.  Find the road to the source of perfection. Taste that limited source of everlasting  sun manifested into our fine wines,  Discover unearthing hidden gems and forgotten flavors that celebrate life.`}</p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[calc(33.33%-3px)] top-[230px]" data-name="Group">
      <div className="[word-break:break-word] absolute font-['Bodoni_72_Oldstyle:Bold',sans-serif] h-[345px] leading-[0] left-[calc(33.33%-3px)] not-italic text-[96px] text-white top-[230px] w-[487px]">
        <p className="leading-[normal] mb-0">{` VOYAGEUR`}</p>
        <p className="leading-[normal]">​</p>
      </div>
      <p className="[word-break:break-word] absolute font-['Futura:Condensed_Medium',sans-serif] h-[98px] leading-[normal] left-[calc(41.67%+39px)] not-italic text-[48px] text-white top-[434px] w-[269px]">Fine Wines</p>
      <div className="absolute flex h-[0.424px] items-center justify-center left-[calc(50%+101.99px)] top-[467.79px] w-[118.016px]">
        <div className="flex-none rotate-[-0.21deg]">
          <div className="h-0 relative w-[118.017px]">
            <div className="absolute inset-[-2px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 118.017 2">
                <line id="Line 1" stroke="var(--stroke-0, white)" strokeWidth="2" x2="118.017" y1="1" y2="1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[0.424px] items-center justify-center left-[calc(33.33%+15px)] top-[467.79px] w-[118.016px]">
        <div className="flex-none rotate-[-0.21deg]">
          <div className="h-0 relative w-[118.017px]">
            <div className="absolute inset-[-2px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 118.017 2">
                <line id="Line 2" stroke="var(--stroke-0, white)" strokeWidth="2" x2="118.017" y1="1" y2="1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VoyageurLogo1() {
  return (
    <div className="absolute contents left-[calc(33.33%-3px)] top-[230px]" data-name="Voyageur Logo">
      <Group />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[calc(33.33%-3px)] top-[230px]">
      <VoyageurLogo1 />
    </div>
  );
}

function VoyageurLogo() {
  return (
    <div className="absolute contents left-[calc(33.33%-3px)] top-[230px]" data-name="Voyageur Logo">
      <Group1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#404961] content-stretch flex h-[557px] items-center justify-center left-1/2 pb-[280px] pt-[10px] px-[10px] rounded-[12px] top-[calc(50%-172.5px)] w-[1440px]">
      <div className="[word-break:break-word] flex flex-col font-['Futura:Medium',sans-serif] h-[241px] justify-center leading-[0] not-italic relative shrink-0 text-[64px] text-center text-white w-[1113px] whitespace-pre-wrap">
        <p className="leading-[50px] mb-0">Become a Wine Club Member and</p>
        <p className="leading-[50px] mb-0">​</p>
        <p className="leading-[50px] mb-0">{`SAVE 33% on Every Order `}</p>
        <p className="leading-[50px]">​</p>
      </div>
    </div>
  );
}

function Shop() {
  return (
    <div className="absolute bg-[#87340e] h-[1010px] left-0 overflow-clip top-[932px] w-[1440px]" data-name="Shop">
      <Frame2 />
      <div className="absolute content-stretch flex gap-[10px] items-center justify-center left-[591px] px-[25px] py-[16px] top-[325px]" data-name="Sign up 2">
        <div className="absolute flex inset-[0_0_-0.03%_0] items-center justify-center" style={{ containerType: "size" }}>
          <div className="flex-none h-[hypot(-0.0340575cqw,99.4127cqh)] rotate-[0.09deg] skew-x-[0.02deg] w-[hypot(99.9659cqw,0.587317cqh)]">
            <div className="relative size-full">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 292.896 79.552">
                <path d={svgPaths.p19412b72} fill="var(--fill-0, #DD6D38)" id="Rectangle 60" stroke="var(--stroke-0, black)" strokeWidth="0.5" />
              </svg>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Futura:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#fef6f2] text-[36px] w-[243px]">LEARN MORE</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#404961] content-stretch flex h-[601px] items-center justify-center left-[calc(50%-0.5px)] pb-[280px] pt-[10px] px-[10px] rounded-[12px] top-[calc(50%+25px)] w-[1445px]">
      <div className="[word-break:break-word] flex flex-col font-['Futura:Medium',sans-serif] h-[241px] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-center text-white w-[1113px]">
        <p className="leading-[44px] mb-0">{` Our award-winning wines are crafted uniquely for every wine occasion, highlighted by our popular Diamond Collection and sparkling wines, to our winery exclusive and limited production Voyageur Fine Wines.`}</p>
        <p className="leading-[44px]">​</p>
      </div>
    </div>
  );
}

function Shop1() {
  return (
    <div className="absolute bg-[#87340e] h-[527px] left-0 overflow-clip top-[2480px] w-[1440px]" data-name="Shop">
      <Frame3 />
      <div className="absolute content-stretch drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] flex gap-[10px] h-[83px] items-center justify-center left-[604px] px-[25px] py-[16px] top-[283px] w-[293px]" data-name="Sign up 3">
        <div className="absolute flex inset-0 items-center justify-center" style={{ containerType: "size" }}>
          <div className="flex-none h-[hypot(-0.0357215cqw,99.4399cqh)] rotate-[0.09deg] skew-x-[0.01deg] w-[hypot(99.9643cqw,0.560101cqh)]">
            <div className="relative size-full">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 292.896 82.5352">
                <path d={svgPaths.p1f621880} fill="var(--fill-0, #FDD7C5)" id="Rectangle 60" stroke="var(--stroke-0, black)" strokeWidth="0.5" />
              </svg>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Futura:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#87340e] text-[36px] w-[243px]">SHOP WINES</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#404961] content-stretch flex h-[601px] items-center justify-center left-[calc(50%-0.5px)] pb-[280px] pt-[10px] px-[10px] rounded-[12px] top-[calc(50%+25px)] w-[1445px]">
      <div className="[word-break:break-word] flex flex-col font-['Futura:Medium',sans-serif] h-[241px] justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-center text-white w-[1113px]">
        <p className="leading-[44px] mb-0">{`Wine, Food & Adventure!`}</p>
        <p className="leading-[44px]">Join us for a variety of tasting experiences, culinary delights, and special events while touring the vineyard history and enjoying entertainment for the whole family.</p>
      </div>
    </div>
  );
}

function Shop2() {
  return (
    <div className="absolute bg-[#87340e] h-[687px] left-0 overflow-clip top-[3859px] w-[1440px]" data-name="Shop">
      <Frame4 />
      <div className="absolute content-stretch drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] flex gap-[10px] items-center justify-center left-[596px] px-[25px] py-[16px] top-[369px] w-[293px]" data-name="Sign up 3">
        <div className="absolute flex inset-0 items-center justify-center" style={{ containerType: "size" }}>
          <div className="flex-none h-[hypot(-0.0357215cqw,99.4399cqh)] rotate-[0.09deg] skew-x-[0.01deg] w-[hypot(99.9643cqw,0.560101cqh)]">
            <div className="relative size-full">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 292.896 79.552">
                <path d={svgPaths.p28501880} fill="var(--fill-0, #DD6D38)" id="Rectangle 60" stroke="var(--stroke-0, black)" strokeWidth="0.5" />
              </svg>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Futura:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#fef6f2] text-[36px] w-[150px]">VISIT US</p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="h-[24px] relative shrink-0 w-[100.556px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100.556 24">
        <g id="Frame ">
          <path d={svgPaths.p2845a700} fill="var(--fill-0, #1C2436)" id="Vector" />
          <path d={svgPaths.p11e7bb80} fill="var(--fill-0, #1C2436)" id="Vector_2" />
          <g id="fill/logos/twitter-fill">
            <path d={svgPaths.p1b612b80} fill="var(--fill-0, #1C2436)" id="Vector_3" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Frame">
      <Frame6 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0" data-name="Frame">
      <div className="[word-break:break-word] flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#787879] text-[0px] w-[442px]">
        <p className="text-[15px]">
          <span className="leading-[20px]">{`© 2024 - VOYAGER Fine Wines - Temecula -California- Phone · `}</span>
          <a className="[text-decoration-skip-ink:none] [text-underline-position:from-font] cursor-pointer decoration-from-font decoration-solid leading-[20px] text-[#787879] underline" href="tel:+39.071.7300032" target="_blank">
            <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid underline" href="tel:+39.071.7300032" target="_blank">
              +00.000000000 ·+00.00000000 ·
            </span>
          </a>
        </p>
      </div>
      <Frame5 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[61px] items-start relative shrink-0">
      <div className="[word-break:break-word] flex flex-col font-['Montserrat:Black',sans-serif] font-black justify-center leading-[0] relative shrink-0 text-[0px] text-black text-center whitespace-nowrap">
        <p className="not-italic text-[48px]">
          <span className="font-['Bodoni_72_Smallcaps:Book',sans-serif] leading-[68px] text-[#171511]">voyageur</span>
          <span className="font-['Bodoni_72_Oldstyle:Bold',sans-serif] leading-[68px] text-[#f2f9ff]">{` `}</span>
        </p>
      </div>
      <Frame />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
      <div className="flex flex-col font-['Futura:Condensed_Medium',sans-serif] justify-center not-italic relative shrink-0 text-[#6d819e] text-[24px] tracking-[2.4px]">
        <p className="leading-[34px]">SHOP</p>
      </div>
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[16px] text-black">
        <p className="leading-[34px]">WINE</p>
      </div>
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[16px] text-black">
        <p className="leading-[34px]">CLUB</p>
      </div>
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[16px] text-black">
        <p className="leading-[34px]">VISIT US</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
      <div className="flex flex-col font-['Futura:Condensed_Medium',sans-serif] justify-center not-italic relative shrink-0 text-[#6d819e] text-[24px] tracking-[2.4px]">
        <p className="leading-[34px]">LEGAL</p>
      </div>
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[16px] text-black">
        <p className="leading-[34px]">PROJECTS</p>
      </div>
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[16px] text-black">
        <p className="leading-[34px]">COLLECTIONS</p>
      </div>
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[16px] text-black">
        <p className="leading-[34px]">CONTACTS</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
      <div className="flex flex-col font-['Futura:Condensed_Medium',sans-serif] justify-center not-italic relative shrink-0 text-[#6d819e] text-[24px] tracking-[2.4px]">
        <p className="leading-[34px]">CONTACT US</p>
      </div>
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[16px] text-black">
        <p className="leading-[34px]">MY ACCOUNT</p>
      </div>
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[16px] text-black">
        <p className="leading-[34px]">STORE LOCATOR</p>
      </div>
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[16px] text-black">
        <p className="leading-[34px]">CAREERS</p>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[63px] items-start leading-[0] relative shrink-0 text-center whitespace-nowrap" data-name="Frame">
      <Frame10 />
      <Frame8 />
      <Frame9 />
    </div>
  );
}

function GrapeVoyageur() {
  return (
    <div className="absolute contents left-[calc(8.33%+43px)] top-[7px]" data-name="Grape/voyageur">
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Bodoni_72_Oldstyle:Bold',sans-serif] justify-center leading-[0] left-[calc(8.33%+157px)] not-italic text-[#f2f9ff] text-[48px] text-center text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] top-[41px] w-[228px]">
        <p>
          <span className="[word-break:break-word] font-['Bodoni_72_Smallcaps:Book',sans-serif] leading-[68px] not-italic text-black">voyageur</span>
          <span className="leading-[68px]">{` `}</span>
        </p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute contents right-[8.33%] top-[23px]" data-name="text">
      <div className="absolute content-stretch flex gap-[10px] h-[57px] items-center justify-center left-[calc(50%+6px)] px-[25px] py-[16px] top-[23px] w-[106px]" data-name="Shop">
        <div className="absolute flex inset-0 items-center justify-center" style={{ containerType: "size" }}>
          <div className="flex-none h-[hypot(-0.0357215cqw,99.4399cqh)] rotate-[0.09deg] skew-x-[0.01deg] w-[hypot(99.9643cqw,0.560101cqh)]">
            <div className="relative size-full">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                <g id="Rectangle 60" />
              </svg>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Futura:Medium',sans-serif] h-[48px] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white w-[243px]">Shop</p>
      </div>
      <div className="absolute content-stretch flex gap-[10px] h-[57px] items-center justify-center left-[calc(50%+105px)] px-[25px] py-[16px] top-[23px] w-[106px]" data-name="Visit">
        <div className="absolute flex inset-0 items-center justify-center" style={{ containerType: "size" }}>
          <div className="flex-none h-[hypot(-0.0357215cqw,99.4399cqh)] rotate-[0.09deg] skew-x-[0.01deg] w-[hypot(99.9643cqw,0.560101cqh)]">
            <div className="relative size-full">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                <g id="Rectangle 60" />
              </svg>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Futura:Medium',sans-serif] h-[48px] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white w-[243px]">Visit</p>
      </div>
      <div className="absolute content-stretch flex gap-[10px] h-[57px] items-center justify-center left-[calc(58.33%+102px)] px-[25px] py-[16px] top-[24px] w-[106px]" data-name="Wine Club">
        <div className="absolute flex inset-0 items-center justify-center" style={{ containerType: "size" }}>
          <div className="flex-none h-[hypot(-0.0357215cqw,99.4399cqh)] rotate-[0.09deg] skew-x-[0.01deg] w-[hypot(99.9643cqw,0.560101cqh)]">
            <div className="relative size-full">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                <g id="Rectangle 60" />
              </svg>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Futura:Medium',sans-serif] h-[48px] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white w-[243px]">Wine Club</p>
      </div>
      <button className="absolute content-stretch cursor-pointer flex gap-[10px] h-[57px] items-center justify-center left-[calc(75%+15px)] px-[25px] py-[16px] top-[24px] w-[106px]" data-name="About Us">
        <div className="absolute flex inset-0 items-center justify-center" style={{ containerType: "size" }}>
          <div className="flex-none h-[hypot(-0.0357215cqw,99.4399cqh)] rotate-[0.09deg] skew-x-[0.01deg] w-[hypot(99.9643cqw,0.560101cqh)]">
            <div className="relative size-full">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                <g id="Rectangle 60" />
              </svg>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Futura:Medium',sans-serif] h-[48px] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white w-[243px]">About Us</p>
      </button>
      <div className="absolute left-[calc(83.33%+23px)] size-[32px] top-[29px]" data-name="HandbagSimple">
        <div className="absolute inset-[6.25%_6.25%_15.62%_6.24%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.005 25">
            <path d={svgPaths.pb31df80} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[4995px] h-[32px] right-[8.33%] w-[50px]" data-name="User" />
    </div>
  );
}

function Header() {
  return (
    <div className="-translate-x-1/2 absolute contents left-1/2 top-0" data-name="Header">
      <div className="absolute h-[80px] left-0 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-0 w-[1440px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle62} />
      </div>
      <GrapeVoyageur />
      <div className="absolute inset-[0.65%_97.08%_98.9%_1.18%]" data-name="Search">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.9982 24.781">
          <path d={svgPaths.p3e0c4f00} fill="var(--fill-0, black)" id="Search" />
        </svg>
      </div>
      <div className="absolute inset-[0.53%_8.26%_98.98%_90%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 27.1163">
          <path d={svgPaths.p29661f00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0.53%_3.54%_98.98%_94.44%]" data-name="Hamburger menu">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29 27.1163">
          <path d={svgPaths.p2dee4a80} fill="var(--fill-0, white)" id="Hamburger menu" />
        </svg>
      </div>
      <Text />
      <div className="absolute inset-[0.54%_87.99%_98.97%_10.69%]" data-name="Black Grape Logo">
        <div className="absolute inset-[0_-21.05%_-29.89%_-21.05%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 34.7609">
            <g filter="url(#filter0_d_1_1622)" id="Black Grape Logo">
              <path d={svgPaths.pc3e600} fill="var(--fill-0, black)" />
              <path d={svgPaths.p3e839fc0} fill="var(--fill-0, black)" />
              <path d={svgPaths.p2fe270f0} fill="var(--fill-0, black)" />
              <path d={svgPaths.p23448180} fill="var(--fill-0, black)" />
              <path d={svgPaths.p30aef000} fill="var(--fill-0, black)" />
              <path d={svgPaths.p24f25d00} fill="var(--fill-0, black)" />
              <path d={svgPaths.p4549f00} fill="var(--fill-0, black)" />
              <path d={svgPaths.p35a00d00} fill="var(--fill-0, black)" />
              <path d={svgPaths.p2e8c1ff0} fill="var(--fill-0, black)" />
              <path d={svgPaths.p1cfae300} fill="var(--fill-0, black)" />
              <path d={svgPaths.p14590600} fill="var(--fill-0, black)" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="34.7609" id="filter0_d_1_1622" width="27" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_1622" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_1622" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Homepage() {
  return (
    <div className="relative size-full" style={{ backgroundImage: "linear-gradient(-0.612826deg, rgb(107, 112, 124) 1.0727%, rgb(153, 153, 153) 99.993%)" }} data-name="homepage">
      <div className="-translate-x-1/2 absolute h-[988px] left-[calc(62.5%-6.5px)] top-[-56px] w-[1829px]" data-name="Rectangle">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle} />
      </div>
      <div className="absolute inset-[6.74%_68.41%_92.3%_29.03%]" data-name="Vector">
        <div className="absolute inset-[0_-10.83%_-15.14%_-10.83%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44.9187 60.835">
            <g filter="url(#filter0_d_1_1624)" id="Vector">
              <path d={svgPaths.p15928000} fill="var(--fill-0, white)" />
              <path d={svgPaths.p32a5f680} fill="var(--fill-0, white)" />
              <path d={svgPaths.p3db8db00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p3491e580} fill="var(--fill-0, white)" />
              <path d={svgPaths.p389bf140} fill="var(--fill-0, white)" />
              <path d={svgPaths.pa23e300} fill="var(--fill-0, white)" />
              <path d={svgPaths.p37b8eb8} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1b327a00} fill="var(--fill-0, white)" />
              <path d={svgPaths.pff6c2e2} fill="var(--fill-0, white)" />
              <path d={svgPaths.p393efb80} fill="var(--fill-0, white)" />
              <path d={svgPaths.p31d41e00} fill="var(--fill-0, white)" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="60.835" id="filter0_d_1_1624" width="44.9187" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_1624" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_1624" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <Frame1 />
      <VoyageurLogo />
      <Shop />
      <Shop1 />
      <Shop2 />
      <div className="absolute h-[949px] left-0 top-[2910px] w-[1440px]" data-name="wine mock up copy 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgWineMockUpCopy1} />
      </div>
      <div className="absolute h-[1067px] left-[-21px] top-[1413px] w-[1554px]" data-name="Stylish young girl with foxy hairstyle in modern straw hat and cool summer outfit posing with glass with champagne outdoor">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgStylishYoungGirlWithFoxyHairstyleInModernStrawHatAndCoolSummerOutfitPosingWithGlassWithChampagneOutdoor} />
      </div>
      <div className="absolute h-[745px] left-[-180px] top-[4369px] w-[1695px]" data-name="VISIT US IMAGE">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[#7b818a] inset-0" />
          <img alt="" className="absolute max-w-none object-cover opacity-98 size-full" src={imgVisitUsImage} />
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-[#bdc0c4] content-stretch flex h-[250px] items-center justify-center left-1/2 opacity-50 p-[10px] top-[5176px] w-[1224px]" data-name="footer-03">
        <div className="bg-[#f1f2f3] content-stretch flex gap-[199px] items-center justify-center px-[200px] py-[70px] relative shrink-0 w-[1435px]" data-name="footer-03">
          <Frame11 />
          <Frame7 />
        </div>
      </div>
      <div className="absolute content-stretch drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] flex gap-[10px] items-center justify-center left-[calc(41.67%-4px)] px-[25px] py-[16px] top-[4993px] w-[293px]" data-name="Sign up 5">
        <div className="absolute flex inset-0 items-center justify-center" style={{ containerType: "size" }}>
          <div className="flex-none h-[hypot(-0.0357215cqw,99.4399cqh)] rotate-[0.09deg] skew-x-[0.01deg] w-[hypot(99.9643cqw,0.560101cqh)]">
            <div className="relative size-full">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 292.896 79.552">
                <path d={svgPaths.p28501880} fill="var(--fill-0, #FDD7C5)" id="Rectangle 60" stroke="var(--stroke-0, black)" strokeWidth="0.5" />
              </svg>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Futura:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#87340e] text-[36px] w-[243px] whitespace-pre-wrap">{`  ABOUT US`}</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Futura:Medium',sans-serif] h-[358px] justify-center leading-[0] left-[calc(58.33%+286px)] not-italic text-[36px] text-center text-white top-[4725px] w-[586px]">
        <p className="font-['Futura:Bold',sans-serif] leading-[44px] mb-0">Our Vision</p>
        <p className="leading-[44px] mb-0">With a deep commitment to quality, authenticity, and pleasure, Voyageur Winery is a unique destination to celebrate the best things in life.</p>
        <p className="leading-[44px]">​</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Futura:Medium',sans-serif] h-[241px] justify-center leading-[0] left-[387.5px] not-italic text-[0px] text-center text-white top-[3091.5px] w-[839px]">
        <p className="font-['Futura:Condensed_Medium',sans-serif] leading-[75px] mb-0 text-[40px] text-black">2010 Rioja - It Takes Time to Make a Diamond</p>
        <p className="font-['Futura:Condensed_Medium',sans-serif] leading-[75px] mb-0 text-[64px] text-black">It takes passion to create a classic.</p>
        <p className="leading-[50px] text-[64px]">​</p>
      </div>
      <div className="absolute inset-[94.78%_88.89%_4.25%_8.54%]" data-name="Vector">
        <div className="absolute inset-[0_-10.83%_-15.14%_-10.83%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44.9187 60.835">
            <g filter="url(#filter0_d_1_1634)" id="Vector">
              <path d={svgPaths.p2fa9ec00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p32a5f680} fill="var(--fill-0, white)" />
              <path d={svgPaths.p29fcfb00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p319ce500} fill="var(--fill-0, white)" />
              <path d={svgPaths.p389bf140} fill="var(--fill-0, white)" />
              <path d={svgPaths.p29dcda00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p3e1e0300} fill="var(--fill-0, white)" />
              <path d={svgPaths.p301cd6c0} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2b121500} fill="var(--fill-0, white)" />
              <path d={svgPaths.p37e47e00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2e7dc900} fill="var(--fill-0, white)" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="60.835" id="filter0_d_1_1634" width="44.9187" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_1634" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_1634" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <Header />
    </div>
  );
}