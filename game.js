const SAVE_KEY = "ctgbt_beta19_save";

const defaultState = {
  score:0,
  clicks:0,
  clickUpgradeCounts:{},
  pointUpgradeCounts:{},
  autoClickCounts:{},
  autoPointCounts:{},
  bigPowerCounts:{},
  prestige:0,
  theme:"classic"
};

let state = loadState();
let selectedTrophyName = "";
let selectedExclusiveSeries = "";
let trophyFilter = "all";
let trophySearch = "";

const trophies = [
  {name:"Mini Trophy", icon:"🥉", need:10},
  {name:"Medium Trophy", icon:"🥈", need:50},
  {name:"Big Trophy", icon:"🥇", need:100},
  {name:"Giant Trophy", icon:"🏆", need:250},
  {name:"Mega Trophy", icon:"💎", need:500},
  {name:"King Trophy", icon:"👑", need:1000},
  {name:"Mountain Trophy", icon:"⛰️", need:1500},
  {name:"Crystal Trophy", icon:"🔷", need:2500},
  {name:"Dragon Trophy", icon:"🐉", need:5000},
  {name:"Galaxy Trophy", icon:"🌌", need:10000},
  {name:"God Trophy", icon:"🌟", need:25000},
  {name:"Hampus Tass", icon:"🐾", need:50000, exclusive:true},
  {name:"Hampus Sol", icon:"☀️", need:100000, exclusive:true},
  {name:"Hampus Hjärta", icon:"❤️", need:250000, exclusive:true},
  {name:"Hampus Legend", icon:"😺", need:500000, exclusive:true},
  {name:"Hampus Sista Färd", icon:"🌈", need:1000000, exclusive:true},
  {name:"The First Memory", icon:"📼", need:75000, nostalgia:true},
  {name:"Retro Gamer", icon:"🎮", need:250000, nostalgia:true},
  {name:"Memory Collector", icon:"📷", need:1000000, nostalgia:true},
  {name:"Old Save File", icon:"💾", need:5000000, nostalgia:true},
  {name:"Golden Memories", icon:"🌅", need:25000000, nostalgia:true},
{name:"Oskar's Beginning", icon:"🌱", need:100000, oskarlegacy:true},
{name:"Oskar's Journey", icon:"🎮", need:500000, oskarlegacy:true},
{name:"Oskar's Legacy", icon:"🏆", need:2500000, oskarlegacy:true},
{name:"Oskar's Triumph", icon:"👑", need:10000000, oskarlegacy:true},
{name:"Oskar's Eternal Legacy", icon:"🌟", need:50000000, oskarlegacy:true},
{name:"Hidden Rookie", icon:"🕶️", need:150000, undercover:true},
{name:"Secret Explorer", icon:"🕵️", need:750000, undercover:true},
{name:"Undercover Agent", icon:"🎯", need:3000000, undercover:true},
{name:"Elite Undercover", icon:"👑", need:12000000, undercover:true},
{name:"Undercover Legend", icon:"🌌", need:60000000, undercover:true},
  {name:"Rookie Hunter", icon:"🏅", need:250000, trophyhunter:true, info:"Alla stora trophyjägare börjar någonstans. Den här trofén symboliserar de första stegen mot att bli en mästare på att samla belöningar.", quote:"Every legend starts as a rookie."},
  {name:"Dedicated Hunter", icon:"🥈", need:1000000, trophyhunter:true, info:"Visar att spelaren fortsätter att samla utan att ge upp. Varje ny trophy är ett steg närmare den ultimata samlingen.", quote:"Persistence builds great collections."},
  {name:"Master Collector", icon:"🥇", need:5000000, trophyhunter:true, info:"Den här trofén tilldelas spelare som verkligen satsar på att samla och utveckla sitt konto under lång tid.", quote:"Collection becomes dedication."},
  {name:"Ultimate Trophy Hunter", icon:"💎", need:25000000, trophyhunter:true, info:"Ett bevis på att nästan hela spelets innehåll har utforskats och samlats.", quote:"Only the most determined reach this point."},
  {name:"Hall of Legends", icon:"👑", need:100000000, trophyhunter:true, info:"Den högsta utmärkelsen i Trophy Hunter Series. Endast de mest engagerade spelarna når hit och blir en del av spelets Hall of Legends.", quote:"A place reserved for true legends."},
  {name:"Teamwork Rookie", icon:"🤝", need:150000, teamwork:true, info:"Alla starka lag börjar med ett första steg. Den här trofén symboliserar viljan att hjälpa andra och att bygga förtroende tillsammans.", quote:"Great teams are built one step at a time."},
  {name:"Trusted Teammate", icon:"🫶", need:750000, teamwork:true, info:"Du har visat att andra kan lita på dig. Ett riktigt lag blir starkare när alla hjälper varandra.", quote:"Trust turns players into teammates."},
  {name:"Teamwork Expert", icon:"⭐", need:3000000, teamwork:true, info:"Du förstår att de största framgångarna ofta uppnås tillsammans. Samarbete är din största styrka.", quote:"Together, every challenge becomes smaller."},
  {name:"Teamwork Master", icon:"👑", need:12000000, teamwork:true, info:"Den här trofén tilldelas spelare som inspirerar andra och visar att samarbete leder till de största framgångarna.", quote:"A true leader helps the whole team succeed."},
  {name:"Teamwork Legend", icon:"🌍", need:60000000, teamwork:true, info:"Den högsta utmärkelsen i Teamwork Series. Den tilldelas spelare som alltid ställer upp för sina lagkamrater och visar att de bästa minnena skapas tillsammans.", quote:"Legends are remembered. Great teammates are never forgotten."},
  {name:"Frida's First Paw", icon:"🐾", need:200000, frida:true, info:"Frida Series börjar med de första tassavtrycken. Den här trophyn symboliserar början på ett liv fyllt av kärlek, nyfikenhet och fina minnen.", quote:"Every journey begins with a single pawprint."},
  {name:"Frida's Gentle Heart", icon:"🤍", need:1000000, frida:true, info:"En trophy som symboliserar Fridas lugna och vänliga personlighet. De finaste minnena lever kvar långt efter att tiden har gått.", quote:"Kindness leaves pawprints on every heart."},
  {name:"Frida's Silent Memory", icon:"🌙", need:5000000, frida:true, info:"Den här trophyn hedrar alla de små ögonblicken som aldrig glöms bort. Även i tystnaden finns minnena alltid kvar.", quote:"Memories speak even in silence."},
  {name:"Frida's Golden Spirit", icon:"🌟", need:25000000, frida:true, info:"Fridas glädje och personlighet fortsätter att lysa genom alla minnen som finns kvar. Ett bevis på att kärlek aldrig försvinner.", quote:"Love shines brighter than time."},
  {name:"Frida's Eternal Pawprint", icon:"👑", need:100000000, frida:true, info:"Den högsta trophyn i Frida Series. Ett evigt tassavtryck som symboliserar att Frida alltid kommer att vara en del av spelets historia och minnen.", quote:"Some pawprints stay forever."},
  {name:"Helge's Curious Paw", icon:"🐾", need:250000, helge:true, info:"Helge Series börjar med nyfikenhet och liv i tassarna. Den här trophyn symboliserar alla små äventyr som börjar hemma och växer till stora minnen.", quote:"Curiosity turns every corner into an adventure."},
  {name:"Helge's Cozy Guardian", icon:"💚", need:1250000, helge:true, info:"En trophy för trygghet, närhet och den där speciella känslan av att ha en katt som finns där i vardagen. Helge blir som en liten grön väktare av hemmet.", quote:"Home feels warmer with a loyal paw nearby."},
  {name:"Helge's Brave Explorer", icon:"🌳", need:6000000, helge:true, info:"Den här trophyn hyllar Helges mod och upptäckarglädje. Varje ny plats, varje liten spaning och varje tass-steg blir en del av hans egen berättelse.", quote:"A brave heart finds stories everywhere."},
  {name:"Helge's Golden Moment", icon:"🌟", need:30000000, helge:true, info:"En trophy för de fina ögonblicken som händer just nu. Helge Series handlar inte bara om minnen från förr, utan också om allt fint som fortfarande skapas varje dag.", quote:"The best memories are often being made right now."},
  {name:"Helge's Living Legend", icon:"👑", need:120000000, helge:true, info:"Den högsta trophyn i Helge Series. Den symboliserar Helges plats i spelets historia som en nuvarande katt, en levande legend och en viktig del av familjens minnen.", quote:"A living legend leaves pawprints in the present."},
  {name:"Svea's Soft Paw", icon:"🐾", need:300000, svea:true, info:"Svea Series börjar med ett mjukt tassavtryck. Den här trophyn symboliserar den lugna närvaron och den fina känslan av att ha Svea som en del av familjen.", quote:"A soft paw can leave the deepest mark."},
  {name:"Svea's Sweet Heart", icon:"💜", need:1500000, svea:true, info:"En trophy för värme, närhet och de små stunderna som gör vardagen finare. Svea påminner om att kärlek ofta finns i det stilla och enkla.", quote:"Small moments can hold the biggest love."},
  {name:"Svea's Moonlight Nap", icon:"🌙", need:7500000, svea:true, info:"Den här trophyn hyllar de lugna vilostunderna och den trygga känslan när allt blir stilla. Svea Series får en mjuk nattglöd här.", quote:"Peace is a treasure found in quiet places."},
  {name:"Svea's Shining Spirit", icon:"✨", need:35000000, svea:true, info:"En trophy som symboliserar Sveas personlighet och det lilla ljus som en katt kan sprida i ett hem. Varje minne blir som en liten stjärna i spelet.", quote:"Some spirits brighten every room they enter."},
  {name:"Svea's Royal Pawprint", icon:"👑", need:140000000, svea:true, info:"Den högsta trophyn i Svea Series. Ett kungligt tassavtryck som visar att Svea har en egen plats i spelets historia, bredvid de andra kattserierna.", quote:"A royal pawprint belongs in every legend."},
  {name:"Doris's Little Spark", icon:"✨", need:350000, doris:true, info:"Doris Series börjar med en liten gnista av personlighet. Den här trophyn symboliserar Doris plats som den sista katten i kattfamiljen här hemma och den energi hon tar med sig in i vardagen.", quote:"A little spark can warm an entire home."},
  {name:"Doris's Cozy Corner", icon:"🧡", need:1750000, doris:true, info:"En trophy för tryggheten i hemmets små favoritplatser. Doris påminner om att de finaste minnena ofta börjar i ett lugnt hörn där man bara får vara.", quote:"Every home has a corner where love rests."},
  {name:"Doris's Playful Spirit", icon:"🎀", need:9000000, doris:true, info:"Den här trophyn hyllar Doris lekfulla sida och alla små stunder som gör hemmet mer levande. Ett tass-steg, en blick eller en liten busig idé kan bli ett helt minne.", quote:"Playfulness turns ordinary days into stories."},
  {name:"Doris's Golden Home", icon:"🏡", need:40000000, doris:true, info:"En trophy som symboliserar Doris roll i familjen och känslan av att hemmet blir rikare när en katt finns där. Hon är en del av kattfamiljens sista kapitel, men också av allt som fortsätter framåt.", quote:"Home is richer when a paw belongs there."},
  {name:"Doris's Family Crown", icon:"👑", need:160000000, doris:true, info:"Den högsta trophyn i Doris Series. Den representerar Doris som den sista katten i kattfamiljen här hemma och ger henne en egen krona i spelets minneshall.", quote:"The final crown belongs to the heart that remains."},
  {name:"Ellie's Royal Beginning", icon:"👑", need:450000, ellie:true, info:"Första trophyn i Ellie the Queen Series. Den symboliserar början på Ellies kungliga väg i spelet och första steget in i drottningserien.", quote:"Every queen begins with a first crown."},
  {name:"Ellie's Purple Grace", icon:"💜", need:2250000, ellie:true, info:"En trophy för elegans, styrka och den lila drottningkraften. Ellie visar att progression också kan kännas exklusiv och ståtlig.", quote:"Grace is power wearing a crown."},
  {name:"Ellie's Shining Rule", icon:"✨", need:11000000, ellie:true, info:"Den här trophyn hyllar Ellies glittrande närvaro i spelet. Varje klick och varje poäng känns lite mer kunglig när drottningen styr.", quote:"A true queen makes every moment shine."},
  {name:"Ellie's Diamond Throne", icon:"💎", need:50000000, ellie:true, info:"En exklusiv trophy som symboliserar diamantnivån i Ellie the Queen Series. Här börjar serien kännas som riktig endgame-royalty.", quote:"The strongest throne is built from dedication."},
  {name:"Ellie's Eternal Crown", icon:"🌟", need:180000000, ellie:true, info:"Den högsta trophyn i Ellie the Queen Series. En evig krona för spelare som fortsätter framåt och låser upp Ellies fulla drottningkraft.", quote:"Some crowns are earned one click at a time."},
  {name:"Vilda's First Crown", icon:"👑", need:500000, vilda:true, info:"Första trophyn i Vilda the Next Queen Series. Den symboliserar början på Vildas kungliga väg och första steget mot att bli nästa drottning i spelet.", quote:"The next queen begins with courage."},
  {name:"Vilda's Brave Heart", icon:"❤️", need:2500000, vilda:true, info:"En trophy för mod, energi och hjärta. Vilda visar att en drottning inte bara glänser, hon vågar också ta plats.", quote:"A brave heart can wear any crown."},
  {name:"Vilda's Rising Throne", icon:"✨", need:12500000, vilda:true, info:"Den här trophyn hyllar Vildas väg uppåt. Varje klick och varje poäng bygger hennes tron starkare.", quote:"Every step upward makes the throne stronger."},
  {name:"Vilda's Royal Power", icon:"💎", need:60000000, vilda:true, info:"En exklusiv trophy som symboliserar Vildas kungliga kraft. Här börjar serien kännas som en riktig drottningboost i endgame.", quote:"Royal power grows through dedication."},
  {name:"Vilda's Next Queen Legacy", icon:"🌟", need:220000000, vilda:true, info:"Den högsta trophyn i Vilda the Next Queen Series. Den visar att Vilda har tagit sin plats som nästa drottning i spelets historia.", quote:"The next queen becomes a legend one click at a time."},
  {name:"Jullsta Beginner", icon:"🏘️", need:280000000, jullsta:true, info:"Varje resa börjar med ett första steg. Din resa genom Jullsta börjar här, med nyfikenhet, nya mål och de första minnena i serien.", quote:"Stora äventyr börjar alltid med ett första klick."},
  {name:"Jullsta Explorer", icon:"🌳", need:460000000, jullsta:true, info:"Du utforskar Jullsta och upptäcker nya platser, minnen och upplevelser längs vägen. Varje steg gör kartan lite större.", quote:"Den som fortsätter framåt hittar alltid något nytt."},
  {name:"Jullsta Legend", icon:"⭐", need:760000000, jullsta:true, info:"Ditt namn har blivit en del av Jullstas historia. Dina prestationer visar att uthållighet kan förvandla en vanlig resa till en legend.", quote:"Legender föds inte. De skapas genom uthållighet."},
  {name:"King of Jullsta", icon:"👑", need:1200000000, jullsta:true, info:"Du har nått toppen och blivit den obestridda härskaren över Jullsta Series. Kronan symboliserar allt du byggt upp på vägen.", quote:"En sann ledare visar vägen för andra."},
  {name:"Spirit of Jullsta", icon:"🏆", need:1850000000, jullsta:true, info:"Du bär Jullstas anda vidare och har fullbordat hela serien. Den här trophyn står för platsens minnen, berättelser och allt som lever kvar.", quote:"Andan lever vidare i varje steg du tar."},
  {name:"Stammis Rookie", icon:"🍺", need:650000, stammis:true, bonusText:"+250× Klick & Poäng", info:"Du har tagit dina första steg mot att bli en riktig stammis. Alla stora resor börjar med ett första besök.", quote:"Every regular starts with a first visit."},
  {name:"Stammis Regular", icon:"🥂", need:3250000, stammis:true, bonusText:"+500× Klick & Poäng", info:"Du är numera ett välkänt ansikte och börjar bli en självklar del av gemenskapen.", quote:"Consistency builds recognition."},
  {name:"Stammis Veteran", icon:"🏅", need:16000000, stammis:true, bonusText:"+1 000× Klick & Poäng", info:"Din erfarenhet och lojalitet gör dig till en spelare som alltid kan räknas med.", quote:"Experience is earned, one visit at a time."},
  {name:"Stammis Legend", icon:"👑", need:75000000, stammis:true, bonusText:"+2 500× Klick & Poäng", info:"Du har blivit en legend bland stammisarna. Ditt namn är välkänt och din resa inspirerar andra.", quote:"Legends are remembered because they never stop showing up."},
  {name:"Stammis King", icon:"🌟", need:260000000, stammis:true, bonusText:"+5 000× Klick & Poäng", info:"Den högsta utmärkelsen i Stammis Series. Endast de mest trogna och engagerade spelarna når den här nivån.", quote:"The true king is the one who never leaves the journey."},
  {name:"Stammis Remix Rookie", icon:"🍺", need:320000000, stammisremix:true, bonusText:"+7 500× Klick & Poäng", info:"Du har tagit nästa steg i Stammis Remix Series och kommer tillbaka starkare än tidigare. Det här är starten på remix-resan, där lojalitet blir till extra kraft.", quote:"Every comeback starts with a new beginning."},
  {name:"Stammis Remix Regular", icon:"🎵", need:520000000, stammisremix:true, bonusText:"+10 000× Klick & Poäng", info:"Du fortsätter resan och visar att en riktig stammis alltid hittar tillbaka. Den här trophyn är för spelare som känner igen rytmen och håller tempot uppe.", quote:"A familiar face always finds its way home."},
  {name:"Stammis Remix Veteran", icon:"🎧", need:850000000, stammisremix:true, bonusText:"+15 000× Klick & Poäng", info:"Erfarenhet, tålamod och lojalitet gör dig till en veteran i remix-serien. Här börjar Stammis Remix kännas som en egen legendarisk avdelning.", quote:"True loyalty never fades."},
  {name:"Stammis Remix Legend", icon:"🌟", need:1250000000, stammisremix:true, bonusText:"+25 000× Klick & Poäng", info:"Ditt namn har blivit en legend i Stammis Remix Series. Det här är trophyn för den som inte bara kommer tillbaka, utan gör comeback med stil.", quote:"Legends always return for one more adventure."},
  {name:"Stammis Remix King", icon:"👑", need:2000000000, stammisremix:true, bonusText:"+50 000× Klick & Poäng", info:"Den högsta utmärkelsen i Stammis Remix Series. Ett bevis på att du aldrig slutade utvecklas och alltid återvände starkare än förut.", quote:"The greatest kings are remembered for always coming back stronger."},
  {name:"Memory Trails I: First Footsteps", icon:"🌿", need:380000000, memorytrails:true, bonusText:"+10 000× Klick & Poäng", info:"Varje lång spelresa börjar med ett första steg. Den här trophyn är inspirerad av de första äventyren på PlayStation, där en enkel spelsession med en vän kunde bli början på något mycket större.", quote:"Every great journey begins with a single step that becomes a lifelong memory."},
  {name:"Memory Trails II: Forest Wanderer", icon:"🌲", need:650000000, memorytrails:true, bonusText:"+20 000× Klick & Poäng", info:"Genom skogar, stigar och okända platser fortsätter minnena att växa. Den här trophyn är inspirerad av naturkänslan i spelvärldar där man vandrat, utforskat och delat tysta men starka ögonblick tillsammans.", quote:"The forest remembers every path you've walked."},
  {name:"Memory Trails III: Campfire Memories", icon:"🏕️", need:1000000000, memorytrails:true, bonusText:"+40 000× Klick & Poäng", info:"Det är ofta de lugna stunderna som fastnar mest. Ett läger, en väntan, ett skratt i partychatten eller en paus mitt i kaoset kan bli ett minne som stannar kvar länge.", quote:"The warmest memories are often made beside the quietest fire."},
  {name:"Memory Trails IV: Endless Horizons", icon:"🌄", need:1600000000, memorytrails:true, bonusText:"+75 000× Klick & Poäng", info:"Varje horisont lovar ett nytt äventyr. Den här trophyn är inspirerad av alla öppna världar, hav, berg, galaxer och vägar som väntade på att upptäckas tillsammans på PlayStation.", quote:"Beyond every horizon waits another unforgettable story."},
  {name:"Memory Trails V: Nature Guardian", icon:"⭐", need:2600000000, memorytrails:true, bonusText:"+100 000× Klick & Poäng", info:"Du har blivit en väktare av minnena. Varje skog, strand, stig, lägerplats och spelvärld bär spår av en lång resa med en vän, och den resan fortsätter leva kvar i spelet.", quote:"Some places fade with time. The memories made there never do."},
  {name:"Frontier Memories I: First Ride", icon:"🐎", need:420000000, frontiermemories:true, bonusText:"+100 000× Klick & Poäng", info:"Det första äventyret var början på en resa fylld av skratt, upptäckter och oförglömliga stunder över den öppna prärien. Den här trophyn är inspirerad av fina minnen i Red Dead Online tillsammans med en vän på PlayStation.", quote:"Every trail begins with a single ride."},
  {name:"Frontier Memories II: Open Horizons", icon:"🌄", need:720000000, frontiermemories:true, bonusText:"+150 000× Klick & Poäng", info:"Varje ny horisont bjöd på ett nytt äventyr. Landskapet förändrades, men känslan av frihet och gemenskap fanns alltid kvar. Inspirerad av ridturer, utsikter och stunder i Red Dead Online på PlayStation.", quote:"Beyond every horizon waits another story."},
  {name:"Frontier Memories III: Campfire Bonds", icon:"🔥", need:1100000000, frontiermemories:true, bonusText:"+250 000× Klick & Poäng", info:"De lugna stunderna runt lägerelden blev lika värdefulla som de största uppdragen. Där skapades minnen som lever kvar, i samtal, skratt och små pauser mellan äventyren.", quote:"The warmest memories are made beside the quietest fires."},
  {name:"Frontier Memories IV: Legends of the Frontier", icon:"⭐", need:1750000000, frontiermemories:true, bonusText:"+400 000× Klick & Poäng", info:"Efter otaliga resor blev varje uppdrag en del av en större berättelse. Den här trophyn hyllar alla oväntade äventyr, kaosiga stunder och fina minnen från Red Dead Online.", quote:"Legends are written by the adventures we share."},
  {name:"Frontier Memories V: Forever on the Trail", icon:"👑", need:2850000000, frontiermemories:true, bonusText:"+750 000× Klick & Poäng", info:"Vissa resor tar slut, men minnena fortsätter att leva. Den här trophyn är den högsta utmärkelsen i Frontier Memories Series och en hyllning till alla fina stunder som skapades tillsammans i Red Dead Online på PlayStation.", quote:"The trail may end, but the memories ride on forever."},
  {name:"The Black Hole Special Trophy I", icon:"🕳️", need:2500000, blackhole:true},
  {name:"The Black Hole Special Trophy II", icon:"🕳️", need:5000000, blackhole:true},
  {name:"The Black Hole Special Trophy III", icon:"🕳️", need:10000000, blackhole:true},
  {name:"The Black Hole Special Trophy IV", icon:"🕳️", need:25000000, blackhole:true},
  {name:"The Black Hole Special Trophy V", icon:"🕳️", need:50000000, blackhole:true},
  {name:"Infinity Trophy I", icon:"♾️", need:100000000, infinity:true},
  {name:"Infinity Trophy II", icon:"♾️", need:250000000, infinity:true},
  {name:"Infinity Trophy III", icon:"♾️", need:500000000, infinity:true},
  {name:"Infinity Trophy IV", icon:"♾️", need:1000000000, infinity:true},
  {name:"Infinity Trophy V", icon:"🌟", need:2500000000, infinity:true}
];

const clickUpgrades = [
  {id:"click10", name:"Klicksprång", icon:"👆", add:10, baseCost:50, desc:"Lägger till +10× klick per tryck."},
  {id:"click25", name:"Turbofinger", icon:"⚡", add:25, baseCost:180, desc:"Lägger till +25× klick per tryck."},
  {id:"click100", name:"Klickstorm", icon:"🌪️", add:100, baseCost:900, desc:"Lägger till +100× klick per tryck."},
  {id:"click500", name:"Trophy-hammare", icon:"🔨", add:500, baseCost:4500, desc:"Lägger till +500× klick per tryck."},
  {id:"click1000", name:"Titantryck", icon:"🗿", add:1000, baseCost:12000, desc:"Lägger till +1000× klick per tryck."},
  {id:"click2500", name:"Mega Finger Engine", icon:"🏎️", add:2500, baseCost:35000, desc:"Lägger till +2500× klick per tryck."},
  {id:"click5000", name:"Trophy Accelerator", icon:"🚀", add:5000, baseCost:85000, desc:"Lägger till +5000× klick per tryck."},
  {id:"click10000", name:"Mythic Click Core", icon:"🔮", add:10000, baseCost:220000, desc:"Lägger till +10000× klick per tryck."},
  {id:"click25000", name:"Legendary Trophy Press", icon:"🏛️", add:25000, baseCost:750000, desc:"Lägger till +25000× klick per tryck."},
  {id:"click100000", name:"Hampus Cosmic Paw Click", icon:"🐾", add:100000, baseCost:3000000, desc:"Lägger till +100000× klick per tryck."},
  {id:"click500000", name:"Quantum Click Reactor", icon:"⚛️", add:500000, baseCost:12000000, desc:"Lägger till +500000× klick per tryck."},
  {id:"click2500000", name:"Infinity Click Engine", icon:"♾️", add:2500000, baseCost:60000000, desc:"Lägger till +2500000× klick per tryck."},
{id:"nostalgiaClick25000", name:"📼 Nostalgia Click Upgrade", icon:"📼", add:25000, baseCost:500000, desc:"Nostalgia-seriens uppgradering. Ger +25000× klick per tryck."},
{id:"meteorClick",name:"🌠 Meteor Click",icon:"🌠",add:100000,baseCost:5000000,desc:"Varje klick slår ner som en meteor.",cosmic:true},
{id:"moonStrike",name:"🌙 Moon Strike",icon:"🌙",add:250000,baseCost:12000000,desc:"Månen förstärker varje tryck.",cosmic:true},
{id:"solarBurst",name:"☀️ Solar Burst",icon:"☀️",add:500000,baseCost:30000000,desc:"Solen laddar dina klick med enorm energi.",cosmic:true},
{id:"galaxyForce",name:"🌌 Galaxy Force",icon:"🌌",add:1000000,baseCost:70000000,desc:"En hel galax driver varje klick framåt.",cosmic:true},
{id:"universeEngine",name:"🪐 Universe Click Engine",icon:"🪐",add:2500000,baseCost:150000000,desc:"Den ultimata kosmiska klickmotorn.",cosmic:true}
];

const pointUpgrades = [
  {id:"point2", name:"Guldvärde", icon:"🟡", add:1, baseCost:75, desc:"Lägger till +1× poäng per tryck."},
  {id:"point5", name:"Diamantbonus", icon:"💎", add:5, baseCost:350, desc:"Lägger till +5× poäng per tryck."},
  {id:"point10", name:"Trophy-bank", icon:"🏦", add:10, baseCost:1200, desc:"Lägger till +10× poäng per tryck."},
  {id:"point25", name:"Kunglig multiplikator", icon:"👑", add:25, baseCost:6000, desc:"Lägger till +25× poäng per tryck."},
  {id:"point100", name:"Galaxvärde", icon:"🌌", add:100, baseCost:25000, desc:"Lägger till +100× poäng per tryck."},
  {id:"point250", name:"Kristallreserven", icon:"💠", add:250, baseCost:90000, desc:"Lägger till +250× poäng per tryck."},
  {id:"point500", name:"Skattkammaren", icon:"💰", add:500, baseCost:250000, desc:"Lägger till +500× poäng per tryck."},
  {id:"point1000", name:"Gyllene Valvet", icon:"🏛️", add:1000, baseCost:700000, desc:"Lägger till +1000× poäng per tryck."},
  {id:"point2500", name:"Kosmisk Belöning", icon:"🌠", add:2500, baseCost:2000000, desc:"Lägger till +2500× poäng per tryck."},
  {id:"point10000", name:"Hampus Minnesfond", icon:"🐾", add:10000, baseCost:10000000, desc:"Lägger till +10000× poäng per tryck."},
  {id:"point50000", name:"Quantum Vault", icon:"⚛️", add:50000, baseCost:50000000, desc:"Lägger till +50000× poäng per tryck."},
  {id:"point250000", name:"Infinity Treasury", icon:"♾️", add:250000, baseCost:250000000, desc:"Lägger till +250000× poäng per tryck."},
{id:"nostalgiaPoint25000", name:"📼 Nostalgia Point Upgrade", icon:"📼", add:25000, baseCost:500000, desc:"Nostalgia-seriens uppgradering. Ger +25000× poäng per tryck."},
{id:"meteorTreasury",name:"🌠 Meteor Treasury",icon:"🌠",add:50000,baseCost:5000000,desc:"Varje meteor för med sig nya rikedomar.",cosmic:true},
{id:"moonVault",name:"🌙 Moon Vault",icon:"🌙",add:125000,baseCost:12000000,desc:"Månens skattkammare fylls för varje klick.",cosmic:true},
{id:"solarFortune",name:"☀️ Solar Fortune",icon:"☀️",add:250000,baseCost:30000000,desc:"Solens kraft ger större belöningar.",cosmic:true},
{id:"galaxyBank",name:"🌌 Galaxy Bank",icon:"🌌",add:500000,baseCost:70000000,desc:"Galaxens största bank arbetar för dig.",cosmic:true},
{id:"universeFortune",name:"🪐 Universe Fortune",icon:"🪐",add:1000000,baseCost:150000000,desc:"Universums rikedomar blir dina.",cosmic:true}
];


const bigPowerUps = [
 {
 id:"helgeBigPower",
 name:"🐈⚡ Helge Big Power",
 icon:"🐈⚡",
 clickAdd:1000000,
 pointAdd:1000000,
 baseCost:500000000,
 desc:"Helges stora kraft förstärker både klick och poäng samtidigt. Ger +1 000 000× klick och +1 000 000× poäng per nivå.",
 css:"helgeBigPower",
 badgeClass:"helgeBigPowerBadge",
 badge:"🐈⚡ Helge Big Power",
 helgeBigPower:true
 },
 {
 id:"ellieQueen1",
 name:"👑 Ellie the Queen I",
 icon:"👑",
 clickAdd:250000,
 pointAdd:250000,
 baseCost:250000000,
 desc:"Ger +250 000× klick och +250 000× poäng per nivå. Första nivån i Ellie the Queen Series. En kunglig perk som stärker både klick och poäng.",
 css:"ellieQueen",
 badgeClass:"ellieQueenBadge",
 badge:"👑 Ellie the Queen"
 },
 {
 id:"ellieQueen2",
 name:"💜 Ellie the Queen II",
 icon:"💜",
 clickAdd:500000,
 pointAdd:500000,
 baseCost:600000000,
 desc:"Ger +500 000× klick och +500 000× poäng per nivå. Andra nivån i Ellie the Queen Series. Mer drottningkraft till både klick och poäng.",
 css:"ellieQueen",
 badgeClass:"ellieQueenBadge",
 badge:"👑 Ellie the Queen"
 },
 {
 id:"ellieQueen3",
 name:"✨ Ellie the Queen III",
 icon:"✨",
 clickAdd:1000000,
 pointAdd:1000000,
 baseCost:1500000000,
 desc:"Ger +1 000 000× klick och +1 000 000× poäng per nivå. Tredje nivån i Ellie the Queen Series. En glittrande power-up för starkare progression.",
 css:"ellieQueen",
 badgeClass:"ellieQueenBadge",
 badge:"👑 Ellie the Queen"
 },
 {
 id:"ellieQueen4",
 name:"💎 Ellie the Queen IV",
 icon:"💎",
 clickAdd:2500000,
 pointAdd:2500000,
 baseCost:4000000000,
 desc:"Ger +2 500 000× klick och +2 500 000× poäng per nivå. Fjärde nivån i Ellie the Queen Series. Diamantkraft som lyfter både klick och poäng rejält.",
 css:"ellieQueen",
 badgeClass:"ellieQueenBadge",
 badge:"👑 Ellie the Queen"
 },
 {
 id:"ellieQueen5",
 name:"🌟 Ellie the Queen V",
 icon:"🌟",
 clickAdd:5000000,
 pointAdd:5000000,
 baseCost:10000000000,
 desc:"Ger +5 000 000× klick och +5 000 000× poäng per nivå. Sista nivån i Ellie the Queen Series. Den kungliga topp-perken för både klick och poäng.",
 css:"ellieQueen",
 badgeClass:"ellieQueenBadge",
 badge:"👑 Ellie the Queen"
 },
 {
 id:"vildaQueen1",
 name:"👑 Vilda the Next Queen I",
 icon:"👑",
 clickAdd:300000,
 pointAdd:300000,
 baseCost:350000000,
 desc:"Ger +300 000× klick och +300 000× poäng per nivå. Första nivån i Vilda the Next Queen Series. En ny drottningperk som stärker både klick och poäng.",
 css:"vildaQueen",
 badgeClass:"vildaQueenBadge",
 badge:"👑 Vilda the Next Queen"
 },
 {
 id:"vildaQueen2",
 name:"❤️ Vilda the Next Queen II",
 icon:"❤️",
 clickAdd:700000,
 pointAdd:700000,
 baseCost:800000000,
 desc:"Ger +700 000× klick och +700 000× poäng per nivå. Andra nivån i Vilda the Next Queen Series. Mer kraft, mer krona och mer progression.",
 css:"vildaQueen",
 badgeClass:"vildaQueenBadge",
 badge:"👑 Vilda the Next Queen"
 },
 {
 id:"vildaQueen3",
 name:"✨ Vilda the Next Queen III",
 icon:"✨",
 clickAdd:1500000,
 pointAdd:1500000,
 baseCost:2000000000,
 desc:"Ger +1 500 000× klick och +1 500 000× poäng per nivå. Tredje nivån i Vilda the Next Queen Series. En stigande drottningboost för både klick och poäng.",
 css:"vildaQueen",
 badgeClass:"vildaQueenBadge",
 badge:"👑 Vilda the Next Queen"
 },
 {
 id:"vildaQueen4",
 name:"💎 Vilda the Next Queen IV",
 icon:"💎",
 clickAdd:3500000,
 pointAdd:3500000,
 baseCost:5500000000,
 desc:"Ger +3 500 000× klick och +3 500 000× poäng per nivå. Fjärde nivån i Vilda the Next Queen Series. Diamantkraft för riktigt tung progression.",
 css:"vildaQueen",
 badgeClass:"vildaQueenBadge",
 badge:"👑 Vilda the Next Queen"
 },
 {
 id:"vildaQueen5",
 name:"🌟 Vilda the Next Queen V",
 icon:"🌟",
 clickAdd:7500000,
 pointAdd:7500000,
 baseCost:14000000000,
 desc:"Ger +7 500 000× klick och +7 500 000× poäng per nivå. Sista nivån i Vilda the Next Queen Series. Den stora nästa-drottning-perken för både klick och poäng.",
 css:"vildaQueen",
 badgeClass:"vildaQueenBadge",
 badge:"👑 Vilda the Next Queen"
 },
 {
 id:"stammisRemixPerk1",
 name:"⚡ Stammis Remix Perk I",
 icon:"🍺⚡",
 clickAdd:7500,
 pointAdd:7500,
 baseCost:75000000,
 desc:"Första perken i Stammis Remix. Ger +7 500× klick och +7 500× poäng per nivå.",
 quote:"Every comeback starts with a new beginning.",
 css:"stammisRemixSeries",
 badgeClass:"stammisRemixBadge",
 badge:"🍻 Stammis Remix Perk",
 unlock:{type:"seriesComplete", key:"stammisremix"}
 },
 {
 id:"stammisRemixPerk2",
 name:"⚡ Stammis Remix Perk II",
 icon:"🎵⚡",
 clickAdd:10000,
 pointAdd:10000,
 baseCost:150000000,
 desc:"Andra perken i Stammis Remix. Ger +10 000× klick och +10 000× poäng per nivå.",
 quote:"A familiar face always finds its way home.",
 css:"stammisRemixSeries",
 badgeClass:"stammisRemixBadge",
 badge:"🍻 Stammis Remix Perk",
 unlock:{type:"trophies", need:60}
 },
 {
 id:"stammisRemixPerk3",
 name:"⚡ Stammis Remix Perk III",
 icon:"🎧⚡",
 clickAdd:15000,
 pointAdd:15000,
 baseCost:350000000,
 desc:"Tredje perken i Stammis Remix. Ger +15 000× klick och +15 000× poäng per nivå.",
 quote:"True loyalty never fades.",
 css:"stammisRemixSeries",
 badgeClass:"stammisRemixBadge",
 badge:"🍻 Stammis Remix Perk",
 unlock:{type:"prestige", need:5}
 },
 {
 id:"stammisRemixPerk4",
 name:"⚡ Stammis Remix Perk IV",
 icon:"🌟⚡",
 clickAdd:25000,
 pointAdd:25000,
 baseCost:900000000,
 desc:"Fjärde perken i Stammis Remix. Ger +25 000× klick och +25 000× poäng per nivå.",
 quote:"Legends always return for one more adventure.",
 css:"stammisRemixSeries",
 badgeClass:"stammisRemixBadge",
 badge:"🍻 Stammis Remix Perk",
 unlock:{type:"trophies", need:70}
 },
 {
 id:"stammisRemixPerk5",
 name:"⚡ Stammis Remix Perk V",
 icon:"👑⚡",
 clickAdd:50000,
 pointAdd:50000,
 baseCost:2500000000,
 desc:"Sista perken i Stammis Remix. Ger +50 000× klick och +50 000× poäng per nivå.",
 quote:"The greatest kings are remembered for always coming back stronger.",
 css:"stammisRemixSeries",
 badgeClass:"stammisRemixBadge",
 badge:"🍻 Stammis Remix Perk",
 unlock:{type:"prestige", need:15}
 },
 {
 id:"memoryTrailsPerk1",
 name:"🌿 Memory Trails Perk I",
 icon:"🌿⚡",
 clickAdd:10000,
 pointAdd:10000,
 baseCost:120000000,
 desc:"Första perken i Memory Trails Series. Inspirerad av första stegen i en lång PlayStation-resa med en vän. Ger +10 000× klick och +10 000× poäng per nivå.",
 quote:"Every great journey begins with a single step that becomes a lifelong memory.",
 css:"memoryTrailsSeries",
 badgeClass:"memoryTrailsBadge",
 badge:"🌲 Memory Trails Perk",
 unlock:{type:"prestige", need:111}
 },
 {
 id:"memoryTrailsPerk2",
 name:"🌲 Memory Trails Perk II",
 icon:"🌲⚡",
 clickAdd:20000,
 pointAdd:20000,
 baseCost:260000000,
 desc:"Ger +20 000× klick och +20 000× poäng per nivå. Andra perken i Memory Trails Series. En skogsdoftande boost för alla äventyr, stigar och naturminnen.",
 quote:"The forest remembers every path you've walked.",
 css:"memoryTrailsSeries",
 badgeClass:"memoryTrailsBadge",
 badge:"🌲 Memory Trails Perk",
 unlock:{type:"prestige", need:112}
 },
 {
 id:"memoryTrailsPerk3",
 name:"🏕️ Memory Trails Perk III",
 icon:"🏕️⚡",
 clickAdd:40000,
 pointAdd:40000,
 baseCost:600000000,
 desc:"Ger +40 000× klick och +40 000× poäng per nivå. Tredje perken i Memory Trails Series. En lägereldsboost för de lugna stunderna som blev starka minnen.",
 quote:"The warmest memories are often made beside the quietest fire.",
 css:"memoryTrailsSeries",
 badgeClass:"memoryTrailsBadge",
 badge:"🌲 Memory Trails Perk",
 unlock:{type:"prestige", need:113}
 },
 {
 id:"memoryTrailsPerk4",
 name:"🌄 Memory Trails Perk IV",
 icon:"🌄⚡",
 clickAdd:75000,
 pointAdd:75000,
 baseCost:1400000000,
 desc:"Ger +75 000× klick och +75 000× poäng per nivå. Fjärde perken i Memory Trails Series. En horisontboost för hav, berg, galaxer och alla världar ni fortsatte utforska tillsammans.",
 quote:"Beyond every horizon waits another unforgettable story.",
 css:"memoryTrailsSeries",
 badgeClass:"memoryTrailsBadge",
 badge:"🌲 Memory Trails Perk",
 unlock:{type:"prestige", need:114}
 },
 {
 id:"memoryTrailsPerk5",
 name:"⭐ Memory Trails Perk V",
 icon:"⭐⚡",
 clickAdd:100000,
 pointAdd:100000,
 baseCost:3200000000,
 desc:"Ger +100 000× klick och +100 000× poäng per nivå. Sista perken i Memory Trails Series. En väktarboost för alla minnen, naturmiljöer och spelkapitel från den långa PlayStation-resan.",
 quote:"Some places fade with time. The memories made there never do.",
 css:"memoryTrailsSeries",
 badgeClass:"memoryTrailsBadge",
 badge:"🌲 Memory Trails Perk",
 unlock:{type:"prestige", need:115}
 },
 {
 id:"frontierTrailBoost",
 name:"🐎 Frontier Perk I: Trail Boost",
 icon:"🐎⚡",
 clickAdd:100000,
 pointAdd:100000,
 baseCost:450000000,
 desc:"Första perken i Frontier Memories Series. Ger +100 000× klick och +100 000× poäng per nivå. Varje resa börjar med ett första steg och den här perken ger extra kraft till äventyret.",
 quote:"Every trail begins with a single ride.",
 css:"frontierMemoriesSeries",
 badgeClass:"frontierMemoriesBadge",
 badge:"🤠 Frontier Memories Perk",
 unlock:{type:"prestige", need:116}
 },
 {
 id:"frontierHorizonPower",
 name:"🌄 Frontier Perk II: Horizon Power",
 icon:"🌄⚡",
 clickAdd:200000,
 pointAdd:200000,
 baseCost:900000000,
 desc:"Andra perken i Frontier Memories Series. Ger +200 000× klick och +200 000× poäng per nivå. Horisonten ger ny kraft till resan och stärker varje tryck.",
 quote:"The horizon always rewards those who keep riding.",
 css:"frontierMemoriesSeries",
 badgeClass:"frontierMemoriesBadge",
 badge:"🤠 Frontier Memories Perk",
 unlock:{type:"prestige", need:117}
 },
 {
 id:"frontierCampfireStrength",
 name:"🔥 Frontier Perk III: Campfire Strength",
 icon:"🔥⚡",
 clickAdd:350000,
 pointAdd:350000,
 baseCost:1800000000,
 desc:"Tredje perken i Frontier Memories Series. Ger +350 000× klick och +350 000× poäng per nivå. De lugna kvällarna runt lägerelden blir till styrka.",
 quote:"The warmest fire creates the strongest memories.",
 css:"frontierMemoriesSeries",
 badgeClass:"frontierMemoriesBadge",
 badge:"🤠 Frontier Memories Perk",
 unlock:{type:"prestige", need:118}
 },
 {
 id:"frontierLegendBoost",
 name:"⭐ Frontier Perk IV: Legend Boost",
 icon:"⭐⚡",
 clickAdd:600000,
 pointAdd:600000,
 baseCost:3600000000,
 desc:"Fjärde perken i Frontier Memories Series. Ger +600 000× klick och +600 000× poäng per nivå. Alla äventyr blir berättelser och vissa berättelser blir legender.",
 quote:"Legends are built one adventure at a time.",
 css:"frontierMemoriesSeries",
 badgeClass:"frontierMemoriesBadge",
 badge:"🤠 Frontier Memories Perk",
 unlock:{type:"prestige", need:119}
 },
 {
 id:"frontierEternalTrail",
 name:"👑 Frontier Perk V: Eternal Trail",
 icon:"👑⚡",
 clickAdd:1000000,
 pointAdd:1000000,
 baseCost:7200000000,
 desc:"Sista perken i Frontier Memories Series. Ger +1 000 000× klick och +1 000 000× poäng per nivå. Ett bevis på att vissa resor aldrig riktigt tar slut.",
 quote:"Some trails end. Great memories never do.",
 css:"frontierMemoriesSeries",
 badgeClass:"frontierMemoriesBadge",
 badge:"🤠 Frontier Memories Perk",
 unlock:{type:"prestige", need:120}
 },
 {
 id:"jullstaSpirit",
 name:"🏘️ Jullsta Spirit",
 icon:"🏘️⚡",
 clickAdd:1000000,
 pointAdd:1000000,
 baseCost:850000000,
 bonusText:"Bonus: +1 000 000× klick & +1 000 000× poäng per nivå",
 desc:"Den första perken i Jullsta Series. Ger +1 000 000× klick och +1 000 000× poäng per nivå. En stadig början som bär Jullstas kraft in i varje klick.",
 quote:"The first step carries the spirit forward.",
 css:"jullstaSeries",
 badgeClass:"jullstaPerkBadge",
 badge:"🏘️ Jullsta Perk",
 unlock:{type:"seriesComplete", key:"jullsta", text:"Lås upp alla trophies i Jullsta Series"}
 },
 {
 id:"jullstaExplorersPath",
 name:"🌳 Explorer's Path",
 icon:"🌳⚡",
 clickAdd:1000000,
 pointAdd:1000000,
 baseCost:1250000000,
 bonusText:"Bonus: +1 000 000× klick & +1 000 000× poäng per nivå",
 desc:"Den andra perken i Jullsta Series. Ger +1 000 000× klick och +1 000 000× poäng per nivå. Din vilja att utforska öppnar vägen mot starkare progression.",
 quote:"Every path reveals a new possibility.",
 css:"jullstaSeries",
 badgeClass:"jullstaPerkBadge",
 badge:"🏘️ Jullsta Perk",
 unlock:{type:"seriesComplete", key:"jullsta", text:"Lås upp alla trophies i Jullsta Series"}
 },
 {
 id:"jullstaLegendsBlessing",
 name:"⭐ Legend's Blessing",
 icon:"⭐⚡",
 clickAdd:1000000,
 pointAdd:1000000,
 baseCost:1950000000,
 bonusText:"Bonus: +1 000 000× klick & +1 000 000× poäng per nivå",
 desc:"Den tredje perken i Jullsta Series. Ger +1 000 000× klick och +1 000 000× poäng per nivå. En legendarisk välsignelse som låter varje framsteg lämna ett tydligt avtryck.",
 quote:"A legend grows stronger with every remembered step.",
 css:"jullstaSeries",
 badgeClass:"jullstaPerkBadge",
 badge:"🏘️ Jullsta Perk",
 unlock:{type:"seriesComplete", key:"jullsta", text:"Lås upp alla trophies i Jullsta Series"}
 },
 {
 id:"jullstaKingsAuthority",
 name:"👑 King's Authority",
 icon:"👑⚡",
 clickAdd:1000000,
 pointAdd:1000000,
 baseCost:2850000000,
 bonusText:"Bonus: +1 000 000× klick & +1 000 000× poäng per nivå",
 desc:"Den fjärde perken i Jullsta Series. Ger +1 000 000× klick och +1 000 000× poäng per nivå. Kunglig auktoritet förvandlar uthållighet till ännu större kraft.",
 quote:"True authority is earned one victory at a time.",
 css:"jullstaSeries",
 badgeClass:"jullstaPerkBadge",
 badge:"🏘️ Jullsta Perk",
 unlock:{type:"seriesComplete", key:"jullsta", text:"Lås upp alla trophies i Jullsta Series"}
 },
 {
 id:"jullstaFullSpirit",
 name:"🏆 Spirit of Jullsta",
 icon:"🏆⚡",
 clickAdd:1000000,
 pointAdd:1000000,
 baseCost:4250000000,
 bonusText:"Bonus: +1 000 000× klick & +1 000 000× poäng per nivå",
 desc:"Den femte och sista perken i Jullsta Series. Ger +1 000 000× klick och +1 000 000× poäng per nivå. Jullstas fulla anda lever vidare i varje klick, poäng och trophy.",
 quote:"The spirit lives on in every click and every trophy.",
 css:"jullstaSeries",
 badgeClass:"jullstaPerkBadge",
 badge:"🏘️ Jullsta Perk",
 unlock:{type:"seriesComplete", key:"jullsta", text:"Lås upp alla trophies i Jullsta Series"}
 }
];

const autoClickPacks = [
  {id:"starter", name:"Starter Pack Autoclicker", icon:"🤖", strength:10, baseCost:5000, desc:"Ger 10× automatisk klickstyrka varje sekund."},
  {id:"pro", name:"Pro Pack Autoclicker", icon:"⚙️", strength:50, baseCost:35000, desc:"Ger 50× automatisk klickstyrka varje sekund."},
  {id:"elite", name:"Elite Pack Autoclicker", icon:"🚀", strength:250, baseCost:200000, desc:"Ger 250× automatisk klickstyrka varje sekund."},
  {id:"quantum", name:"Quantum Autoclicker", icon:"🌌", strength:1000, baseCost:1500000, desc:"Ger 1000× automatisk klickstyrka varje sekund."},
  {id:"infinity", name:"Infinity Autoclicker", icon:"♾️", strength:5000, baseCost:15000000, desc:"Ger 5000× automatisk klickstyrka varje sekund."}
];

const autoPointPacks = [
  {id:"starter", name:"Starter Pack Autopoäng", icon:"💰", strength:10, baseCost:5000, desc:"Ger 10× automatisk poängstyrka varje sekund."},
  {id:"pro", name:"Pro Pack Autopoäng", icon:"💎", strength:50, baseCost:40000, desc:"Ger 50× automatisk poängstyrka varje sekund."},
  {id:"elite", name:"Elite Pack Autopoäng", icon:"🏦", strength:250, baseCost:250000, desc:"Ger 250× automatisk poängstyrka varje sekund."},
  {id:"quantum", name:"Quantum Autopoäng", icon:"🌠", strength:1000, baseCost:2000000, desc:"Ger 1000× automatisk poängstyrka varje sekund."},
  {id:"infinity", name:"Infinity Autopoäng", icon:"♾️", strength:5000, baseCost:25000000, desc:"Ger 5000× automatisk poängstyrka varje sekund."}
];

function loadState(){
  try{
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY)) || {};
    return {
      ...defaultState,
      ...saved,
      clickUpgradeCounts: saved.clickUpgradeCounts || {},
      pointUpgradeCounts: saved.pointUpgradeCounts || {},
      autoClickCounts: saved.autoClickCounts || {},
      autoPointCounts: saved.autoPointCounts || {},
      bigPowerCounts: saved.bigPowerCounts || {},
      prestige: Number(saved.prestige || 0)
    };
  }catch(e){
    return {...defaultState, clickUpgradeCounts:{}, pointUpgradeCounts:{}, autoClickCounts:{}, autoPointCounts:{}, bigPowerCounts:{}};
  }
}
function save(){ localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }
function fmt(n){ return Math.floor(n).toLocaleString("sv-SE"); }
function getCount(map,id){ return Number(map[id] || 0); }
function hampusMasterMultiplier(){
  const current = Number(state.prestige || 0);
  let bonus = 1;
  prestigeMilestones.forEach(p => {
    if(p.masterBonus && current >= p.level) bonus = p.masterBonus;
  });
  return bonus;
}

function prestigeMultiplier(){
  return (1 + Number(state.prestige || 0)) * hampusMasterMultiplier();
}

const prestigeMilestones = [
  {level:1, icon:"🥉", title:"Bronze Prestige", frame:"bronze"},
  {level:2, icon:"🥈", title:"Silver Prestige", frame:"silver"},
  {level:3, icon:"🥇", title:"Gold Prestige", frame:"gold"},
  {level:4, icon:"💎", title:"Diamond Prestige", frame:"diamond"},
  {level:5, icon:"⭐", title:"Master Prestige", frame:"master"},
  {level:6, icon:"🌌", title:"Galaxy Prestige", frame:"galaxy"},
  {level:7, icon:"🕳️", title:"Black Hole Prestige", frame:"blackhole"},
  {level:8, icon:"♾️", title:"Infinity Prestige", frame:"infinity"},
  {level:9, icon:"👑", title:"Legend Prestige", frame:"legend"},
  {level:10, icon:"🐾", title:"Hampus Eternal Prestige", frame:"hampus"},
  {level:15, icon:"🔥", title:"Mythic Prestige", frame:"mythic"},
  {level:20, icon:"🌠", title:"Celestial Prestige", frame:"celestial"},
  {level:25, icon:"⚛️", title:"Quantum Prestige", frame:"quantum"},
  {level:30, icon:"🌍", title:"Universal Prestige", frame:"universal"},
  {level:35, icon:"☄️", title:"Stellar Prestige", frame:"stellar"},
  {level:40, icon:"🌌", title:"Cosmic Emperor", frame:"emperor"},
  {level:45, icon:"🌟", title:"Eternal Champion", frame:"champion"},
  {level:50, icon:"👑", title:"The Trophy King", frame:"king"},

  {level:55, icon:"🐾", title:"Hampus Exclusive I", frame:"hampus"},
  {level:60, icon:"🐾", title:"Hampus Exclusive II", frame:"hampus"},
  {level:65, icon:"🐾", title:"Hampus Exclusive III", frame:"hampus"},
  {level:70, icon:"🐾", title:"Hampus Exclusive IV", frame:"hampus"},
  {level:75, icon:"👑", title:"Hampus Exclusive Edition", frame:"hampus"},
  {level:80, icon:"🐾", title:"Hampus Master I", frame:"hampusmaster", masterBonus:10},
  {level:85, icon:"🐾", title:"Hampus Master II", frame:"hampusmaster", masterBonus:20},
  {level:90, icon:"🐾", title:"Hampus Master III", frame:"hampusmaster", masterBonus:30},
  {level:95, icon:"🐾", title:"Hampus Master IV", frame:"hampusmaster", masterBonus:40},
  {level:100, icon:"👑", title:"Hampus Master V", frame:"hampusmaster", masterBonus:50},
  {level:101, icon:"🐾", title:"Hampus Grandmaster I", frame:"hampusmaster", masterBonus:100},
  {level:102, icon:"🐾", title:"Hampus Grandmaster II", frame:"hampusmaster", masterBonus:100},
  {level:103, icon:"🐾", title:"Hampus Grandmaster III", frame:"hampusmaster", masterBonus:100},
  {level:104, icon:"🐾", title:"Hampus Grandmaster IV", frame:"hampusmaster", masterBonus:100},
  {level:105, icon:"👑", title:"Hampus Grandmaster V", frame:"hampusmaster", masterBonus:100},

  {level:106, icon:"🟢", title:"Loyal Member I", frame:"loyal", masterBonus:100},
  {level:107, icon:"🟢", title:"Loyal Member II", frame:"loyal", masterBonus:100},
  {level:108, icon:"🟢", title:"Loyal Member III", frame:"loyal", masterBonus:100},
  {level:109, icon:"🟢", title:"Loyal Member IV", frame:"loyal", masterBonus:100},
  {level:110, icon:"👑", title:"Loyal Member V", frame:"loyal", masterBonus:100},

  {level:111, icon:"🌿", title:"Memory Trail Seeker", frame:"memorytrails", masterBonus:100},
  {level:112, icon:"🌲", title:"Memory Trail Wanderer", frame:"memorytrails", masterBonus:100},
  {level:113, icon:"🏕️", title:"Memory Trail Keeper", frame:"memorytrails", masterBonus:100},
  {level:114, icon:"🌄", title:"Memory Trail Guardian", frame:"memorytrails", masterBonus:100},
  {level:115, icon:"⭐", title:"Memory Trail Legend", frame:"memorytrails", masterBonus:100},
  {level:116, icon:"🐎", title:"Frontier Trail Rider", frame:"frontiermemories", masterBonus:100},
  {level:117, icon:"🌄", title:"Frontier Horizon Rider", frame:"frontiermemories", masterBonus:100},
  {level:118, icon:"🔥", title:"Frontier Campfire Keeper", frame:"frontiermemories", masterBonus:100},
  {level:119, icon:"⭐", title:"Frontier Legend Rider", frame:"frontiermemories", masterBonus:100},
  {level:120, icon:"👑", title:"Frontier Eternal Trail", frame:"frontiermemories", masterBonus:100}
];


// Fyll ut alla nivåer upp till 100 med standardnamn
for(let i=1;i<=120;i++){
  if(!prestigeMilestones.find(p=>p.level===i)){
    prestigeMilestones.push({
      level:i,
      icon:"⭐",
      title:"Prestige "+i,
      frame:"master"
    });
  }
}
prestigeMilestones.sort((a,b)=>a.level-b.level);

function prestigeTitle(level){
  const current = Number(level || 0);
  let best = {level:0, title:"Ingen"};
  prestigeMilestones.forEach(p => {
    if(current >= p.level) best = p;
  });
  return best.title;
}

function nextPrestigeMilestone(level){
  const current = Number(level || 0);
  return prestigeMilestones.find(p => p.level > current) || prestigeMilestones[prestigeMilestones.length - 1];
}

function clickPower(){
  let power = 1;
  let percentBonus = 0;
  clickUpgrades.forEach(u => power += getCount(state.clickUpgradeCounts,u.id) * u.add);
  bigPowerUps.forEach(u => {
    const count=getCount(state.bigPowerCounts,u.id);
    power += count * (u.clickAdd||0);
    percentBonus += count * (u.clickPercent||0);
  });
  return power * (1 + percentBonus/100) * prestigeMultiplier() * seriesCompletionMultiplier();
}
function basePointPower(){
  let power = 1;
  let percentBonus = 0;
  pointUpgrades.forEach(u => power += getCount(state.pointUpgradeCounts,u.id) * u.add);
  bigPowerUps.forEach(u => {
    const count=getCount(state.bigPowerCounts,u.id);
    power += count * (u.pointAdd||0);
    percentBonus += count * (u.pointPercent||0);
  });
  return power * (1 + percentBonus/100);
}
function pointPower(){ return basePointPower() * prestigeMultiplier() * seriesCompletionMultiplier(); }
function upgradeCost(u,map){ return Math.floor(u.baseCost * Math.pow(1.5, getCount(map,u.id))); }
function bigPowerCost(u){ return Math.floor(u.baseCost * Math.pow(2.2, getCount(state.bigPowerCounts,u.id))); }
function autoCost(pack,map){ return Math.floor(pack.baseCost * Math.pow(1.65, getCount(map,pack.id))); }

function autoClickRate(){
  let rate = 0;
  autoClickPacks.forEach(p => rate += getCount(state.autoClickCounts,p.id) * p.strength * clickPower());
  return rate;
}
function autoPointRate(){
  let rate = 0;
  autoPointPacks.forEach(p => rate += getCount(state.autoPointCounts,p.id) * p.strength * pointPower());
  return rate;
}

function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.style.display='none');
  document.getElementById(id).style.display='flex';
  render();
  if(id === "exclusiveSeriesScreen"){
    renderExclusiveSeries();
  }
  if(id === "themeScreen"){
    renderThemes();
  }
  if(id === "oskarAiScreen"){
    initOskarAI();
    setTimeout(()=>{ const input=document.getElementById('oskarAiInput'); if(input) input.focus(); }, 80);
  }
}
function clickGame(event){
  const cp = clickPower();
  const pp = pointPower();
  state.clicks += cp;
  state.score += pp;
  save();
  spawnPop(event.clientX || innerWidth/2, event.clientY || innerHeight/2, "+" + fmt(cp) + "× klick • +" + fmt(pp) + " poäng");
  render();
}
function spawnPop(x,y,text){
  const pop = document.createElement("div");
  pop.className = "pop";
  pop.textContent = text;
  pop.style.left = x + "px";
  pop.style.top = y + "px";
  document.body.appendChild(pop);
  setTimeout(()=>pop.remove(),850);
}
function buyUpgrade(id,type){
  const arr = type === "click" ? clickUpgrades : pointUpgrades;
  const map = type === "click" ? state.clickUpgradeCounts : state.pointUpgradeCounts;
  const u = arr.find(x=>x.id===id);
  const cost = upgradeCost(u,map);
  if(state.score < cost) return;
  state.score -= cost;
  map[id] = getCount(map,id) + 1;
  save(); render();
}
function buyAuto(id,type){
  const arr = type === "click" ? autoClickPacks : autoPointPacks;
  const map = type === "click" ? state.autoClickCounts : state.autoPointCounts;
  const p = arr.find(x=>x.id===id);
  const cost = autoCost(p,map);
  if(state.score < cost) return;
  state.score -= cost;
  map[id] = getCount(map,id) + 1;
  save(); render();
}

function bigPowerUnlocked(u){
  if(!u || !u.unlock) return true;
  if(u.unlock.type === "prestige") return Number(state.prestige || 0) >= u.unlock.need;
  if(u.unlock.type === "trophies") return unlockedCount() >= u.unlock.need;
  if(u.unlock.type === "seriesComplete"){
    return seriesGroups().some(g => g.key === u.unlock.key && g.items.length > 0 && g.items.every(t => state.clicks >= t.need));
  }
  return true;
}
function bigPowerUnlockText(u){
  if(!u || !u.unlock) return "Upplåst";
  if(u.unlock.type === "prestige") return "Låses upp vid Prestige " + u.unlock.need;
  if(u.unlock.type === "trophies") return "Låses upp vid " + u.unlock.need + " trophies";
  if(u.unlock.type === "seriesComplete") return u.unlock.text || ("Låses upp när hela " + trophySeriesName(u.unlock.key) + " är komplett");
  return "Låst";
}
function buyBigPower(id){
  const u = bigPowerUps.find(x=>x.id===id);
  if(!bigPowerUnlocked(u)){ alert(bigPowerUnlockText(u)); return; }
  const cost = bigPowerCost(u);
  if(state.score < cost) return;
  state.score -= cost;
  state.bigPowerCounts[id] = getCount(state.bigPowerCounts,id) + 1;
  save(); render();
}

function unlockedCount(){ return trophies.filter(t => state.clicks >= t.need).length; }
function allTrophiesUnlocked(){ return unlockedCount() >= trophies.length; }
function nextGoal(){ return trophies.find(t => state.clicks < t.need); }

function hardReset(){
  if(!confirm("Är du säker? Detta rensar ALL progress, inklusive prestige.")) return;
  localStorage.removeItem(SAVE_KEY);
  state = {...defaultState, clickUpgradeCounts:{}, pointUpgradeCounts:{}, autoClickCounts:{}, autoPointCounts:{}, bigPowerCounts:{}};
  save();
  render();
  showScreen("menuScreen");
}
function prestigeReset(){
  if(!allTrophiesUnlocked()){
    alert("Du måste låsa upp alla trophies innan Prestige Reset.");
    return;
  }
  const currentPrestige = Number(state.prestige || 0);
  const nextPrestige = currentPrestige + 1;
  if(!confirm("Prestige Reset börjar om rundan men sparar Prestige Level " + nextPrestige + ". Fortsätta?")) return;

  state = {
    ...defaultState,
    prestige: nextPrestige,
    clickUpgradeCounts:{},
    pointUpgradeCounts:{},
    autoClickCounts:{},
    autoPointCounts:{},
    bigPowerCounts:{}
  };

  save();
  state = loadState(); // läs in direkt igen så nivån inte fastnar på gammalt värde
  render();
  showScreen("menuScreen");
}

function renderUpgradeGrid(gridId, upgrades, map, type, buttonClass){
  const grid=document.getElementById(gridId);
  grid.innerHTML="";
  upgrades.forEach(u=>{
    const count=getCount(map,u.id);
    const cost=upgradeCost(u,map);
    const canBuy=state.score>=cost;
    const div=document.createElement("div");
    div.className="card upgradeCard";
    div.innerHTML=`
      <div class="icon">${u.icon}</div>
      <div class="upgradeInfo">
        <b>${u.name}</b>
        <small>${u.desc}</small>${u.cosmic?'<br><span class="cosmicBadge">🌌 Cosmic Series</span>':''}<br>
        <span class="count">Nivå: ${fmt(count)}</span><br>
        <span class="cost">Nästa kostnad: ${fmt(cost)} poäng</span>
      </div>
      <button class="${buttonClass}" ${canBuy?"":"disabled"}>Köp +${fmt(u.add)}×</button>
    `;
    div.querySelector("button").onclick=()=>buyUpgrade(u.id,type);
    grid.appendChild(div);
  });
}
function appendAutoGrid(gridId, packs, map, type, buttonClass){
  const grid=document.getElementById(gridId);
  packs.forEach(p=>{
    const count=getCount(map,p.id);
    const cost=autoCost(p,map);
    const canBuy=state.score>=cost;
    const div=document.createElement("div");
    div.className="card upgradeCard";
    div.innerHTML=`
      <div class="icon">${p.icon}</div>
      <div class="upgradeInfo">
        <b>${p.name}</b>
        <small>${p.desc}</small><br>
        <span class="count">Nivå: ${fmt(count)}</span><br>
        <span class="cost">Nästa kostnad: ${fmt(cost)} poäng</span>
      </div>
      <button class="${buttonClass}" ${canBuy?"":"disabled"}>Köp ${fmt(p.strength)}× auto</button>
    `;
    div.querySelector("button").onclick=()=>buyAuto(p.id,type);
    grid.appendChild(div);
  });
}


function appendBigPowerGrid(gridId){
  const grid=document.getElementById(gridId);
  bigPowerUps.forEach(u=>{
    const count=getCount(state.bigPowerCounts,u.id);
    const cost=bigPowerCost(u);
    const canBuy=state.score>=cost;
    const div=document.createElement("div");
    div.className="card upgradeCard " + (u.css || "helgeBigPower");
    div.innerHTML=`
      <div class="icon">${u.icon}</div>
      <div class="upgradeInfo">
        <b>${u.name}</b><br><span class="${u.badgeClass || 'helgeBigPowerBadge'}">${u.badge || 'Big Power'}</span><br>
        <small>${u.desc}</small><br>
        <span class="count">Nivå: ${fmt(count)}</span><br>
        <span class="cost">Nästa kostnad: ${fmt(cost)} poäng</span>
      </div>
      <button class="primary" ${canBuy?"":"disabled"}>Köp +${fmt(u.clickAdd)}× klick & +${fmt(u.pointAdd)}× poäng</button>
    `;
    div.querySelector("button").onclick=()=>buyBigPower(u.id);
    grid.appendChild(div);
  });
}



function prestigeBonusText(p){
  if(p.title && p.title.startsWith("Hampus Grandmaster")) return "Hampus Grandmaster Bonus: " + p.masterBonus + "× Klick & Poäng";
  if(p.title && p.title.startsWith("Hampus Master")) return "Hampus Master Bonus: " + p.masterBonus + "× Klick & Poäng";
  if(p.title && p.title.startsWith("Loyal Member")) return "Loyal Member Bonus: 100× Klick & Poäng";
  if(p.title && p.title.startsWith("Memory Trail")) return "Memory Trails Bonus: " + (p.masterBonus || 100) + "× Klick & Poäng";
  if(p.title && p.title.startsWith("Frontier")) return "Frontier Memories Bonus: " + (p.masterBonus || 100) + "× Klick & Poäng";
  if(p.masterBonus) return p.title + " Bonus: " + p.masterBonus + "× Klick & Poäng";
  return "Bonus: vanlig prestige";
}

function renderPrestigeHall(){
  const hall = document.getElementById("prestigeHallGrid");
  if(!hall) return;

  const current = Number(state.prestige || 0);
  const next = nextPrestigeMilestone(current);

  document.getElementById("hallPrestigeLevel").textContent = fmt(current);
  document.getElementById("hallPrestigeTitle").textContent = prestigeTitle(current);
  document.getElementById("hallNextGoal").textContent = next.level > current ? "Prestige " + next.level : "Alla mål klara";

  hall.innerHTML = "";
  prestigeMilestones.forEach(p => {
    const unlocked = current >= p.level;
    const remaining = Math.max(0, p.level - current);
    const div = document.createElement("div");
    div.className = "card prestigeCard prestigeFrame-" + p.frame + " " + (unlocked ? "prestigeUnlocked" : "prestigeLocked");
    div.innerHTML = `
      <div class="icon">${unlocked ? p.icon : "🔒"}</div>
      <b>Prestige ${p.level}</b><br>
      <strong>${p.title}</strong><br>
      <small>Kräver: Prestige ${p.level}</small><br>
      <small>${unlocked ? "Upplåst ✅" : "Kvar: " + remaining + " prestiges"}</small><br>
      <small>${prestigeBonusText(p)}</small>
      <br><span class="lockBadge">${unlocked ? "Aktiv / upplåst" : "Låst"}</span>
    `;
    hall.appendChild(div);
  });
}


const exclusiveSeries = [
  {id:"hampus", icon:"🐾", title:"Hampus Exclusive", badge:"🐾 Hampus Exclusive", css:"exclusive", type:"Trophy-serie", text:"En personlig och känslosam serie inspirerad av Hampus. Den handlar om minne, värme och att vissa saker får leva kvar i spelet.", contains:"Hampus Tass, Hampus Sol, Hampus Hjärta, Hampus Legend och Hampus Sista Färd."},
  {id:"nostalgia", icon:"📼", title:"Nostalgia Series", badge:"📼 Nostalgia Series", css:"nostalgia", type:"Trophy-serie och upgrades", text:"En serie med retro- och minneskänsla. Den handlar om gamla spelminnen, sparfiler och känslan av att något från förr kommer tillbaka.", contains:"Nostalgia Trophies samt Nostalgia Click och Nostalgia Point Upgrade."},
  {id:"oskarlegacy", icon:"🟢", title:"Oskar Legacy Series", badge:"🟢 Oskar Legacy Series", css:"oskarLegacy", type:"Trophy-serie", text:"En personlig serie som bygger på Oskars spelresa och kreativa avtryck i projektet. Den symboliserar början, resan, arvet och triumfen.", contains:"Oskar's Beginning, Oskar's Journey, Oskar's Legacy, Oskar's Triumph och Oskar's Eternal Legacy."},
  {id:"undercover", icon:"🕶️", title:"Undercover Series", badge:"🕶️ Undercover Series", css:"undercoverSeries", type:"Trophy-serie", text:"En serie inspirerad av spelidentiteten Undercover. Den känns hemlig, agentlik och mystisk.", contains:"Hidden Rookie, Secret Explorer, Undercover Agent, Elite Undercover och Undercover Legend."},
  {id:"trophyhunter", icon:"🏆", title:"Trophy Hunter Series", badge:"🟡 Trophy Hunter Series", css:"trophyHunterSeries", type:"Trophy-serie med läsbar information", text:"Den första serien där spelaren kan trycka på varje trophy och läsa en egen beskrivning. Den handlar om att samla, fortsätta och bli en riktig trophyjägare.", contains:"Rookie Hunter, Dedicated Hunter, Master Collector, Ultimate Trophy Hunter och Hall of Legends."},
  {id:"teamwork", icon:"🤝", title:"Teamwork Series", badge:"🤝 Teamwork Series", css:"teamworkSeries", type:"Trophy-serie med läsbar information", text:"En samarbetsserie som handlar om att hjälpa varandra, bygga förtroende och skapa minnen tillsammans. Den fungerar som Trophy Hunter Series med beskrivning och citat på varje trophy.", contains:"Teamwork Rookie, Trusted Teammate, Teamwork Expert, Teamwork Master och Teamwork Legend."},
  {id:"frida", icon:"🐱", title:"Frida Series", badge:"🐱 Frida Series", css:"fridaSeries", type:"Trophy-serie med läsbar information", text:"En personlig minnesserie tillägnad katten Frida. Serien handlar om kärlek, värme och de minnen som aldrig försvinner. Varje trophy har en egen beskrivning och ett eget citat.", contains:"Frida's First Paw, Frida's Gentle Heart, Frida's Silent Memory, Frida's Golden Spirit och Frida's Eternal Pawprint."},
  {id:"helge", icon:"🐈", title:"Helge Series", badge:"🐈 Helge Series", css:"helgeSeries", type:"Trophy-serie med läsbar information", text:"En personlig serie tillägnad katten Helge, som finns med här och nu. Serien handlar om nyfikenhet, trygghet, äventyr och alla minnen som fortfarande skapas.", contains:"Helge's Curious Paw, Helge's Cozy Guardian, Helge's Brave Explorer, Helge's Golden Moment, Helge's Living Legend och Helge Big Power."},
  {id:"svea", icon:"🐱", title:"Svea Series", badge:"🐱 Svea Series", css:"sveaSeries", type:"Trophy-serie med läsbar information", text:"En personlig serie tillägnad katten Svea. Serien handlar om mjuka tassavtryck, lugna stunder, värme och den speciella känslan av en katt som hör hemma i familjen.", contains:"Svea's Soft Paw, Svea's Sweet Heart, Svea's Moonlight Nap, Svea's Shining Spirit och Svea's Royal Pawprint."},
  {id:"doris", icon:"🐱", title:"Doris Series", badge:"🐱 Doris Series", css:"dorisSeries", type:"Trophy-serie med läsbar information", text:"En personlig serie tillägnad katten Doris, den sista katten i kattfamiljen här hemma. Serien handlar om hemkänsla, lekfullhet, värme och att Doris får en egen krona i spelets historia.", contains:"Doris's Little Spark, Doris's Cozy Corner, Doris's Playful Spirit, Doris's Golden Home och Doris's Family Crown."},
  {id:"elliequeen", icon:"👑", title:"Ellie the Queen Series", badge:"👑 Ellie the Queen", css:"ellieQueen", type:"Exklusiv perk-serie", text:"En kunglig perk-serie med fem nivåer som förstärker både klick och poäng. Serien är tänkt som en exklusiv drottningserie med lila och gyllene tema.", contains:"Ellie the Queen I, Ellie the Queen II, Ellie the Queen III, Ellie the Queen IV och Ellie the Queen V."},
  {id:"vildaqueen", icon:"👑", title:"Vilda the Next Queen Series", badge:"👑 Vilda the Next Queen", css:"vildaQueen", type:"Exklusiv perk- och trophy-serie", text:"En ny drottningserie med fem trophies och fem perks som förstärker både klick och poäng. Serien är tänkt som nästa krona efter Ellie.", contains:"Vilda the Next Queen I till V samt Vilda's First Crown, Vilda's Brave Heart, Vilda's Rising Throne, Vilda's Royal Power och Vilda's Next Queen Legacy."},
  {id:"stammis", icon:"🍻", title:"Stammis Series", badge:"🍻 Stammis Series", css:"stammisSeries", type:"Exklusiv trophy-serie", text:"En exklusiv stammis-serie som handlar om lojalitet, igenkänning och att alltid komma tillbaka. Serien har fem klickbara trophies med egen beskrivning och citatkänsla.", contains:"Stammis Rookie, Stammis Regular, Stammis Veteran, Stammis Legend och Stammis King."},
  {id:"stammisremix", icon:"🍻🔥", title:"Stammis Remix Series", badge:"🍻 Stammis Remix", css:"stammisRemixSeries", type:"Exklusiv trophy- och perk-serie", text:"En remixad fortsättning på Stammis Series med orange/röd/guld-känsla. Trophy-serien handlar om comeback, lojalitet och att komma tillbaka starkare. Perksen finns endast i Perks-menyn.", contains:"Stammis Remix Rookie, Stammis Remix Regular, Stammis Remix Veteran, Stammis Remix Legend, Stammis Remix King samt Stammis Remix Perk I till V."},
  {id:"memorytrails", icon:"🌲", title:"Memory Trails Series", badge:"🌲 Memory Trails", css:"memoryTrailsSeries", type:"Exklusiv trophy- och perk-serie", text:"Memory Trails Series är inspirerad av en lång serie av spel som Oskar har spelat tillsammans med en nära vän på PlayStation. Serien hyllar äventyr, naturmiljöer och minnen från skogar, hav, berg, lägerplatser, öppna världar och galaxer. Den är inspirerad av bland annat The Forest, theHunter: Call of the Wild, No Man's Sky, Sea of Thieves, Raft, Smalland, ARK, Minecraft, Red Dead Online, GTA Online, Phasmophobia och Roblox. Varje trophy symboliserar ett kapitel i den resan och påminner om att de finaste spelminnena ofta handlar om vem man delar dem med.", contains:"Memory Trails I: First Footsteps, Memory Trails II: Forest Wanderer, Memory Trails III: Campfire Memories, Memory Trails IV: Endless Horizons, Memory Trails V: Nature Guardian samt Memory Trails Perk I till V."},
  {id:"frontiermemories", icon:"🤠", title:"Frontier Memories Series", badge:"🤠 Frontier Memories", css:"frontierMemoriesSeries", type:"Exklusiv trophy-serie & perk-serie", text:"Frontier Memories Series är inspirerad av de många timmar som tillbringats i Red Dead Online och de fina minnen som skapats tillsammans med en vän på PlayStation. Serien är en hyllning till lugna ridturer, vackra landskap, oväntade äventyr och alla de stunder som gjorde spelvärlden speciell. Den handlar inte bara om framgångar i spelet, utan om vänskapen och upplevelserna som växte fram längs vägen.", contains:"Trophies: Frontier Memories I till V. Perks: Trail Boost, Horizon Power, Campfire Strength, Legend Boost och Eternal Trail."},
  {id:"jullsta", icon:"🏘️", title:"Jullsta Series", badge:"🏘️ Jullsta Series", css:"jullstaSeries", type:"Exklusiv trophy- och perk-serie", text:"Jullsta Series är inspirerad av platsen Jullsta och de minnen, upplevelser och berättelser som hör dit. Serien följer resan från de första stegen till att bli en legend, bära kronan och till sist föra Jullstas anda vidare.", contains:"Trophies: Jullsta Beginner, Jullsta Explorer, Jullsta Legend, King of Jullsta och Spirit of Jullsta. Perks: Jullsta Spirit, Explorer's Path, Legend's Blessing, King's Authority och Spirit of Jullsta."},
  {id:"blackhole", icon:"🕳️", title:"Black Hole Special", badge:"🕳️ Black Hole Special", css:"blackhole", type:"Special trophies", text:"En mörk och tung endgame-serie för höga mål. Den ska kännas svår, exklusiv och nästan som att man dras in i ett svart hål av grind.", contains:"The Black Hole Special Trophy I till V."},
  {id:"infinity", icon:"♾️", title:"Infinity Series", badge:"♾️ Infinity Series", css:"infinity", type:"Endgame trophies", text:"En extrem sen-spelsserie för riktigt höga klickmål. Den står för det nästan oändliga slutmålet i spelet.", contains:"Infinity Trophy I till V."},
  {id:"cosmic", icon:"🌌", title:"Cosmic Series", badge:"🌌 Cosmic Series", css:"cosmicSeries", type:"Exklusiv upgrade-serie", text:"Spelets första exklusiva uppgraderingsserie. Den finns i både Click Upgrades och Point Upgrades och har kosmisk blå/lila stil.", contains:"Meteor, Moon, Solar, Galaxy och Universe-uppgraderingar för både klick och poäng."}
];


function trophySeriesKey(t){
  if(t.exclusive) return "hampus";
  if(t.frida) return "frida";
  if(t.helge) return "helge";
  if(t.svea) return "svea";
  if(t.doris) return "doris";
  if(t.ellie) return "elliequeen";
  if(t.vilda) return "vildaqueen";
  if(t.stammisremix) return "stammisremix";
  if(t.memorytrails) return "memorytrails";
  if(t.frontiermemories) return "frontiermemories";
  if(t.jullsta) return "jullsta";
  if(t.stammis) return "stammis";
  if(t.teamwork) return "teamwork";
  if(t.trophyhunter) return "trophyhunter";
  if(t.nostalgia) return "nostalgia";
  if(t.oskarlegacy) return "oskarlegacy";
  if(t.undercover) return "undercover";
  if(t.blackhole) return "blackhole";
  if(t.infinity) return "infinity";
  return "standard";
}
function trophySeriesName(key){
  const names={standard:"🏆 Vanliga trophies",hampus:"🐾 Hampus Exclusive",frida:"🐱 Frida Series",helge:"🐈 Helge Series",svea:"🐱 Svea Series",doris:"🐱 Doris Series",elliequeen:"👑 Ellie the Queen Series",vildaqueen:"👑 Vilda the Next Queen Series",stammis:"🍻 Stammis Series",stammisremix:"🍻🔥 Stammis Remix Series",memorytrails:"🌲 Memory Trails Series",frontiermemories:"🤠 Frontier Memories Series",jullsta:"🏘️ Jullsta Series",teamwork:"🤝 Teamwork Series",trophyhunter:"🏆 Trophy Hunter Series",nostalgia:"📼 Nostalgia Series",oskarlegacy:"🟢 Oskar Legacy Series",undercover:"🕶️ Undercover Series",blackhole:"🕳️ Black Hole Special",infinity:"♾️ Infinity Series"};
  return names[key] || key;
}
function isCatTrophy(t){ return t.exclusive || t.frida || t.helge || t.svea || t.doris; }
function isQueenTrophy(t){ return t.ellie || t.vilda; }
function isSpecialTrophy(t){ return t.stammisremix || t.memorytrails || t.frontiermemories || t.jullsta || t.stammis || t.trophyhunter || t.teamwork || t.nostalgia || t.oskarlegacy || t.undercover; }
function isEndgameTrophy(t){ return t.blackhole || t.infinity; }
function filterLabel(){ return ({all:"Alla",unlocked:"Upplåsta",locked:"Låsta",cats:"Kattserier",queens:"Queen Series",special:"Special",endgame:"Endgame"})[trophyFilter] || "Alla"; }
function setTrophyFilter(f){ trophyFilter=f; render(); }
function setTrophySearch(v){ trophySearch=(v||"").toLowerCase(); render(); }
function trophyMatchesFilter(t){
  const unlocked = state.clicks >= t.need;
  if(trophyFilter === "unlocked") return unlocked;
  if(trophyFilter === "locked") return !unlocked;
  if(trophyFilter === "cats") return isCatTrophy(t);
  if(trophyFilter === "queens") return isQueenTrophy(t);
  if(trophyFilter === "special") return isSpecialTrophy(t);
  if(trophyFilter === "endgame") return isEndgameTrophy(t);
  return true;
}
function trophyMatchesSearch(t){
  if(!trophySearch) return true;
  const hay = (t.name + " " + trophySeriesName(trophySeriesKey(t)) + " " + (t.info||"") + " " + (t.quote||"")).toLowerCase();
  return hay.includes(trophySearch);
}
function seriesGroups(){
  const order=["standard","hampus","frida","helge","svea","doris","elliequeen","vildaqueen","stammis","stammisremix","memorytrails","frontiermemories","jullsta","teamwork","trophyhunter","nostalgia","oskarlegacy","undercover","blackhole","infinity"];
  const groups={};
  trophies.forEach(t=>{ const k=trophySeriesKey(t); (groups[k] ||= []).push(t); });
  return order.filter(k=>groups[k]).map(k=>({key:k,name:trophySeriesName(k),items:groups[k]}));
}
function seriesCompletionMultiplier(){
  let bonus=1;
  const bonusMap={hampus:.10,frida:.10,helge:.25,svea:.15,doris:.15,elliequeen:.30,vildaqueen:.30,stammis:.15,stammisremix:.20,memorytrails:.20,frontiermemories:.20,teamwork:.10,trophyhunter:.10};
  seriesGroups().forEach(g=>{
    if(bonusMap[g.key] && g.items.every(t=>state.clicks>=t.need)) bonus += bonusMap[g.key];
  });
  return bonus;
}

function toggleExclusiveSeries(id){
  selectedExclusiveSeries = selectedExclusiveSeries === id ? "" : id;
  renderExclusiveSeries();
}

function renderExclusiveSeries(){
  const grid = document.getElementById("exclusiveSeriesGrid");
  if(!grid) return;
  grid.innerHTML = "";
  exclusiveSeries.forEach(s => {
    const open = selectedExclusiveSeries === s.id;
    const div = document.createElement("div");
    div.className = "card seriesLibraryCard " + s.css;
    div.onclick = () => toggleExclusiveSeries(s.id);
    div.innerHTML = `
      <div class="icon">${s.icon}</div>
      <b>${s.title}</b><br>
      <small>${s.type}</small><br>
      <span class="seriesLibraryBadge">${s.badge}</span>
      ${open ? `<div class="seriesInfoBox"><b>Vad är detta?</b><br>${s.text}<br><br><b>Innehåller</b><br>${s.contains}</div>` : ""}
    `;
    grid.appendChild(div);
  });
}

function toggleTrophyInfo(name){
  selectedTrophyName = selectedTrophyName === name ? "" : name;
  render();
}


function renderSeriesProgress(){
  const grid=document.getElementById("seriesProgressGrid");
  if(!grid) return;
  grid.innerHTML="";
  seriesGroups().filter(g=>g.key!=="standard").forEach(g=>{
    const got=g.items.filter(t=>state.clicks>=t.need).length;
    const div=document.createElement("div");
    div.className="card";
    div.innerHTML=`<b>${g.name}</b><br><div class="seriesProgress">${got}/${g.items.length} upplåsta</div>${got===g.items.length?'<span class="completeBadge">Serie komplett ✅ Bonus aktiv</span>':''}`;
    grid.appendChild(div);
  });
}
function perkBonusText(u){
  if(u.bonusText) return u.bonusText;
  return `Bonus: +${fmt(u.clickAdd||0)}× klick & +${fmt(u.pointAdd||0)}× poäng per nivå`;
}

function renderPerks(){
  const grid=document.getElementById("perkGrid");
  if(!grid) return;
  grid.innerHTML="";
  bigPowerUps.forEach(u=>{
    const count=getCount(state.bigPowerCounts,u.id);
    const cost=bigPowerCost(u);
    const unlocked = bigPowerUnlocked(u);
    const canBuy=unlocked && state.score>=cost;
    const div=document.createElement("div");
    div.className="card upgradeCard perkCard "+(u.css||"")+(unlocked?"":" locked");
    const unlockLine = unlocked ? "Upplåst ✅" : "🔒 " + bigPowerUnlockText(u);
    div.innerHTML=`
      <div class="icon">${unlocked ? u.icon : "🔒"}</div>
      <div class="upgradeInfo">
        <b>${u.name}</b>
        <small><b>${perkBonusText(u)}</b></small><br>
        <small>${u.desc}</small><br>
        ${u.quote ? '<small><i>"'+u.quote+'"</i></small><br>' : ''}
        <span class="count">Nivå: ${fmt(count)}</span><br>
        <span class="cost">Nästa kostnad: ${fmt(cost)} poäng</span><br>
        <span class="${u.badgeClass||'seriesLibraryBadge'}">${u.badge||'Big Power'}</span><br>
        <span class="lockBadge">${unlockLine}</span>
      </div>
      <button class="primary" ${canBuy?"":"disabled"}>${unlocked ? "Köp power" : "Låst"}</button>`;
    div.querySelector("button").onclick=()=>buyBigPower(u.id);
    grid.appendChild(div);
  });
}
function openSettingsSection(id){
  document.querySelectorAll('.settingsSection').forEach(section => section.classList.remove('active'));
  const target = document.getElementById(id);
  if(target) target.classList.add('active');
}

function exportSave(){
  document.getElementById("exportBox").value = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
}
function importSave(){
  try{
    const raw=document.getElementById("importBox").value.trim();
    if(!raw) return alert("Klistra in en sparfil först.");
    const imported=JSON.parse(decodeURIComponent(escape(atob(raw))));
    state={...defaultState,...imported,clickUpgradeCounts:imported.clickUpgradeCounts||{},pointUpgradeCounts:imported.pointUpgradeCounts||{},autoClickCounts:imported.autoClickCounts||{},autoPointCounts:imported.autoPointCounts||{},bigPowerCounts:imported.bigPowerCounts||{},prestige:Number(imported.prestige||0)};
    save(); render(); alert("Sparfil importerad ✅");
  }catch(e){ alert("Kunde inte importera sparfilen. Kontrollera att texten är rätt."); }
}
function toggleAnimations(){
  const off = localStorage.getItem("ctgbt_no_animations") === "1";
  localStorage.setItem("ctgbt_no_animations", off ? "0" : "1");
  applyAnimationSetting();
}
function applyAnimationSetting(){
  const off = localStorage.getItem("ctgbt_no_animations") === "1";
  document.body.classList.toggle("noAnim", off);
  const el=document.getElementById("animationStatus");
  if(el) el.textContent = "Animationer: " + (off ? "Av" : "På");
}


const themes = [
  {id:"classic", name:"Classic Theme", icon:"🏆", desc:"Det klassiska utseendet med mörk bakgrund och guldglöd."},
  {id:"helge", name:"Helge Theme", icon:"🐈", desc:"Grönt och varmt tema med Helges bild som bakgrund.", image:true},
  {id:"doris", name:"Doris Theme", icon:"🐱", desc:"Rosa och kungligt tema med Doris bild som bakgrund.", image:true},
  {id:"svea", name:"Svea Theme", icon:"✨", desc:"Guldigt och mjukt tema med Sveas bild som bakgrund.", image:true},
  {id:"cosmic", name:"Cosmic Theme", icon:"🌌", desc:"Rymdtema för Cosmic Series och endgame-känslan."},
  {id:"gold", name:"Golden Theme", icon:"👑", desc:"Lyxigt guldfärgat tema för prestige och trofékungar."},
  {id:"hampusmaster", name:"Hampus Master Theme", icon:"🐾👑", desc:"Låses upp vid Prestige 10. Rosa, guld och Hampus-känsla.", unlock:{type:"prestige", need:10}},
  {id:"trophyhunter", name:"Trophy Hunter Theme", icon:"🏆", desc:"Låses upp när du har 20 trophies. Ett guldtema för riktiga samlare.", unlock:{type:"trophies", need:20}},
  {id:"queencrown", name:"Queen Crown Theme", icon:"👑💜", desc:"Låses upp vid Prestige 25. Byggt för Ellie och Vilda-serierna.", unlock:{type:"prestige", need:25}},
  {id:"catfamily", name:"Cat Family Theme", icon:"🐱🐾", desc:"Låses upp när du har 40 trophies. Ett samlat tema för kattfamiljen.", unlock:{type:"trophies", need:40}},
  {id:"prestigeking", name:"Prestige King Theme", icon:"👑🌟", desc:"Låses upp vid Prestige 50. Ett kungligt endgame-tema.", unlock:{type:"prestige", need:50}},
  {id:"bronzechampion", name:"Bronze Champion Theme", icon:"🥉", desc:"Låses upp när du har 10 trophies. Ett varmt brons-tema för första stora samlingssteget.", unlock:{type:"trophies", need:10}},
  {id:"silverchampion", name:"Silver Champion Theme", icon:"🥈", desc:"Låses upp när du har 25 trophies. Silver, blå glöd och samlarkänsla.", unlock:{type:"trophies", need:25}},
  {id:"goldchampion", name:"Gold Champion Theme", icon:"🥇", desc:"Låses upp när du har 50 trophies. Ett gyllene tema för riktiga trophyjägare.", unlock:{type:"trophies", need:50}},
  {id:"diamondcollector", name:"Diamond Collector Theme", icon:"💎", desc:"Låses upp när du har 75 trophies. Diamantblått tema för hög samlarstatus.", unlock:{type:"trophies", need:75}},
  {id:"halloflegends", name:"Hall of Legends Theme", icon:"👑", desc:"Låses upp när du har alla trophies. Spelets mest exklusiva trophy-tema.", unlock:{type:"allTrophies"}}
];
const themeImages = {
  helge:"images/themes/helge.jpg",
  doris:"images/themes/doris.jpg",
  svea:"images/themes/svea.jpg"
};
function setTheme(id){
  if(!themes.find(t=>t.id===id)) id="classic";
  if(!themeUnlocked(id)){
    alert(themeUnlockText(themes.find(t=>t.id===id)));
    return;
  }
  state.theme=id;
  save();
  applyTheme();
  renderThemes();
}
function themeUnlocked(id){
  const t = themes.find(x=>x.id===id);
  if(!t || !t.unlock) return true;
  if(t.unlock.type === "prestige") return Number(state.prestige || 0) >= t.unlock.need;
  if(t.unlock.type === "trophies") return unlockedCount() >= t.unlock.need;
  if(t.unlock.type === "allTrophies") return allTrophiesUnlocked();
  return true;
}
function themeUnlockText(t){
  if(!t.unlock) return "Upplåst från början";
  if(t.unlock.type === "prestige") return "Låses upp vid Prestige " + t.unlock.need;
  if(t.unlock.type === "trophies") return "Låses upp vid " + t.unlock.need + " trophies";
  if(t.unlock.type === "allTrophies") return "Låses upp när alla trophies är upplåsta";
  return "Låst";
}
function applyTheme(){
  const known = themes.map(t=>t.id);
  let id=(state && state.theme) ? state.theme : "classic";
  if(!known.includes(id)) id="classic";
  if(!themeUnlocked(id)) id="classic";
  document.body.classList.remove(...known.map(t=>"theme-"+t));
  document.body.classList.add("theme-"+id);
  if(themeImages[id]){
    document.body.style.setProperty("--theme-photo", `url("${themeImages[id]}")`);
  }else{
    document.body.style.removeProperty("--theme-photo");
  }
}
function renderThemes(){
  const grid=document.getElementById("themeGrid");
  if(!grid) return;
  const known = themes.map(t=>t.id);
  let current=(state && state.theme) ? state.theme : "classic";
  if(!known.includes(current)) current="classic";
  const label=themes.find(t=>t.id===current)?.name || "Classic Theme";
  const activeText=document.getElementById("activeThemeText");
  if(activeText) activeText.textContent=label;
  grid.innerHTML="";
  themes.forEach(t=>{
    const unlocked = themeUnlocked(t.id);
    const div=document.createElement("div");
    div.className="themeCard"+(current===t.id?" activeTheme":"")+(unlocked?"":" lockedTheme");
    const hasPhoto = !!themeImages[t.id];
    const thumb = hasPhoto
      ? `<div class="themeThumb" style="background-image:url('${themeImages[t.id]}')"></div>`
      : `<div class="themeThumb themeThumb${t.id.charAt(0).toUpperCase()+t.id.slice(1)}"></div>`;
    const badge = current===t.id
      ? '<span class="themeActiveBadge">Aktivt tema ✅</span>'
      : (unlocked ? '<span class="seriesLibraryBadge">Tryck för att välja</span>' : '<span class="themeLockBadge">🔒 '+themeUnlockText(t)+'</span>');
    div.innerHTML=`${thumb}<div class="themeBody"><b>${t.icon} ${t.name}</b><small>${t.desc}</small><br>${badge}</div>`;
    div.onclick=()=>{ if(unlocked){ setTheme(t.id); } else { alert(themeUnlockText(t)); } };
    grid.appendChild(div);
  });
}

function render(){
  const cp=clickPower(), pp=pointPower(), pm=prestigeMultiplier();
  const trophyCount = unlockedCount()+"/"+trophies.length;
  const safeSet=(id,val)=>{ const el=document.getElementById(id); if(el) el.textContent=val; };

  safeSet("scoreText",fmt(state.score));
  safeSet("clickText",fmt(state.clicks));
  safeSet("clickPowerText",fmt(cp)+"×");
  safeSet("pointPowerText",fmt(pp)+"×");
  safeSet("prestigeBonusText",fmt(pm)+"×");
  safeSet("trophyMenuCountText",trophyCount);
  safeSet("activeFilterText",filterLabel());

  safeSet("clickUpgradeScoreText",fmt(state.score));
  safeSet("clickUpgradePowerText",fmt(cp)+"×");
  safeSet("autoClickRateText",fmt(autoClickRate())+"×");
  safeSet("pointUpgradeScoreText",fmt(state.score));
  safeSet("pointUpgradePowerText",fmt(pp)+"×");
  safeSet("autoPointRateText",fmt(autoPointRate())+"×");
  safeSet("perkScoreText",fmt(state.score));
  safeSet("perkClickPowerText",fmt(cp)+"×");
  safeSet("perkPointPowerText",fmt(pp)+"×");

  safeSet("prestigeLevelText",fmt(state.prestige));
  safeSet("prestigeTitleText",prestigeTitle(state.prestige));
  safeSet("resetPrestigeBonusText",fmt(pm)+"×");
  safeSet("nextPrestigeText",fmt(pm+1)+"×");
  safeSet("resetTrophyText",fmt(unlockedCount()));
  const prestigeBtn=document.getElementById("prestigeBtn");
  if(prestigeBtn) prestigeBtn.disabled=!allTrophiesUnlocked();

  document.querySelectorAll(".filterBtn").forEach(b=>b.classList.toggle("active", b.dataset.filter===trophyFilter));
  renderPrestigeHall();
  renderSeriesProgress();
  renderPerks();
  renderThemes();
  applyAnimationSetting();

  const next=nextGoal();
  safeSet("nextGoalText", next ? "Nästa trophy: "+next.name+" vid "+fmt(next.need)+" klick" : "Alla trophies upplåsta! Prestige är redo. 👑");

  const trophyGrid=document.getElementById("trophyGrid");
  if(trophyGrid){
    trophyGrid.innerHTML="";
    let any=false;
    seriesGroups().forEach(group=>{
      const visible=group.items.filter(t=>trophyMatchesFilter(t)&&trophyMatchesSearch(t));
      if(!visible.length) return;
      any=true;
      const got=group.items.filter(t=>state.clicks>=t.need).length;
      const header=document.createElement("div");
      header.className="seriesHeader";
      header.innerHTML=`${group.name}<div class="seriesProgress">${got}/${group.items.length} upplåsta${got===group.items.length?' • komplett bonus aktiv ✅':''}</div>`;
      trophyGrid.appendChild(header);
      visible.forEach(t=>{
        const unlocked=state.clicks>=t.need;
        const div=document.createElement("div");
        const cls=(t.frontiermemories?"frontierMemoriesSeries ":"")+(t.memorytrails?"memoryTrailsSeries ":"")+(t.stammisremix?"stammisRemixSeries ":"")+(t.stammis?"stammisSeries ":"")+(t.vilda?"vildaQueen ":"")+(t.ellie?"ellieQueen ":"")+(t.doris?"dorisSeries ":"")+(t.svea?"sveaSeries ":"")+(t.helge?"helgeSeries ":"")+(t.frida?"fridaSeries ":"")+(t.teamwork?"teamworkSeries ":"")+(t.trophyhunter?"trophyHunterSeries ":"")+(t.exclusive?"exclusive ":"")+(t.undercover?"undercoverSeries ":"")+(t.oskarlegacy?"oskarLegacy ":"")+(t.nostalgia?"nostalgia ":"")+(t.blackhole?"blackhole ":"")+(t.infinity?"infinity ":"")+(unlocked?"unlocked":"locked");
        div.className="card "+cls;
        if(t.info || t.quote){ div.style.cursor="pointer"; div.onclick=()=>toggleTrophyInfo(t.name); }
        const showInfo=(t.info||t.quote) && selectedTrophyName===t.name;
        div.innerHTML=`
          <div class="icon">${t.icon}</div>
          <b>${t.name}</b><br>
          <small>${fmt(t.need)} klick</small><br>
          <small>${unlocked ? "Upplåst ✅" : "Låst 🔒"}</small>
          ${t.trophyhunter?'<br><span class="trophyHunterBadge">🟡 Trophy Hunter Series</span>':''}
          ${t.teamwork?'<br><span class="teamworkBadge">🤝 Teamwork Series</span>':''}
          ${t.frida?'<br><span class="fridaBadge">🐱 Frida Series</span>':''}
          ${t.helge?'<br><span class="helgeBadge">🐈 Helge Series</span>':''}
          ${t.svea?'<br><span class="sveaBadge">🐱 Svea Series</span>':''}
          ${t.doris?'<br><span class="dorisBadge">🐱 Doris Series</span>':''}
          ${t.ellie?'<br><span class="ellieQueenBadge">👑 Ellie the Queen Series</span>':''}
          ${t.vilda?'<br><span class="vildaQueenBadge">👑 Vilda the Next Queen Series</span>':''}
          ${t.stammis?'<br><span class="stammisBadge">🍻 Stammis Series</span>':''}
          ${t.stammisremix?'<br><span class="stammisRemixBadge">🍻🔥 Stammis Remix Series</span>':''}
          ${t.memorytrails?'<br><span class="memoryTrailsBadge">🌲 Memory Trails Series</span>':''}
          ${t.frontiermemories?'<br><span class="frontierMemoriesBadge">🤠 Frontier Memories Series</span>':''}
          ${t.exclusive?'<br><span class="exclusiveBadge">Hampus Exclusive</span>':''}
          ${t.undercover?'<br><span class="undercoverBadge">🕶️ Undercover Series</span>':''}
          ${t.oskarlegacy?'<br><span class="oskarLegacyBadge">🟢 Oskar Legacy Series</span>':''}
          ${t.nostalgia?'<br><span class="nostalgiaBadge">Nostalgia Series</span>':''}
          ${t.blackhole?'<br><span class="blackholeBadge">Black Hole Special</span>':''}
          ${t.infinity?'<br><span class="infinityBadge">Infinity Series</span>':''}
          ${showInfo?'<div class="trophyInfoBox"><b>Beskrivning</b><br>'+(t.info||'Ingen beskrivning ännu.')+'<br><br><b>Citat</b><br><i>"'+(t.quote||'')+'"</i></div>':''}
        `;
        trophyGrid.appendChild(div);
      });
    });
    if(!any){
      const empty=document.createElement("div");
      empty.className="card";
      empty.innerHTML="<b>Inga trophies hittades</b><br><small>Testa ett annat filter eller sökord.</small>";
      trophyGrid.appendChild(empty);
    }
  }

  renderUpgradeGrid("clickUpgradeGrid", clickUpgrades, state.clickUpgradeCounts, "click", "green");
  appendAutoGrid("clickUpgradeGrid", autoClickPacks, state.autoClickCounts, "click", "green");
  renderUpgradeGrid("pointUpgradeGrid", pointUpgrades, state.pointUpgradeCounts, "point", "purple");
  appendAutoGrid("pointUpgradeGrid", autoPointPacks, state.autoPointCounts, "point", "purple");
}


function normalizeOskarQuestion(question){
  return String(question || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .replace(/[?!.,;:()[\]{}"'`´]/g,' ')
    .replace(/\s+/g,' ')
    .trim();
}

function matchesOskarIntent(q, phrases){
  return phrases.some(p => q.includes(p));
}

function oskarAIAnswer(question){
  const q = normalizeOskarQuestion(question);

  const intents = [
    {
      phrases:['vad ar detta for spel','vad ar spelet','vad gar spelet ut pa','beratta om spelet','hur fungerar spelet','hur funkar spelet','vad gor man i spelet','vad handlar spelet om','forklara spelet','beskriv spelet','vad ska man gora','vad ar clicker to get big trophies'],
      answer:'Clicker to Get Big Trophies är ett långsiktigt klickspel där du samlar klick och poäng, köper uppgraderingar och låser upp trophies, perks, teman och prestige-titlar 🏆. Spelet börjar enkelt, men växer till en stor samling av mål, serier och permanenta bonusar.'
    },
    {
      phrases:['hur borjar jag','hur kommer jag igang','hur startar jag','jag ar ny','hjalp mig komma igang','vad gor jag forst','hur spelar man','hur ska jag spela','ge mig en nyborjarguide','vad ska jag trycka pa','hur kommer man igang'],
      answer:'Tryck på Starta spelet och använd den stora klickknappen 👆. Varje tryck ger klick och poäng. Köp sedan Klick-upgrades och Poäng-upgrades, och fortsätt tills nya trophies låses upp.'
    },
    {
      phrases:['hur far jag poang','hur tjanar jag poang','vad ger poang','hur okar jag poangen','hur far man mer poang','poang per tryck','var kommer poangen fran'],
      answer:'Du får poäng när du trycker på den stora klickknappen. Poäng-upgrades, perks, prestige och automatiska funktioner kan öka hur mycket poäng du får per tryck eller per sekund.'
    },
    {
      phrases:['hur far jag klick','hur tjanar jag klick','vad ar klick','hur okar jag klicken','klick per tryck','hur far man fler klick'],
      answer:'Klick räknas när du trycker på den stora knappen. Klick-upgrades, perks och prestige kan öka klickstyrkan, medan auto-klick kan ge klick utan att du behöver trycka hela tiden.'
    },
    {
      phrases:['vad ar trophies','vad ar trofeer','hur far jag trophies','hur laser jag upp trophies','hur fungerar trophies','hur funkar trophies','nar far jag en trophy','vad gor trophies','beratta om trophies','hur manga trophies finns'],
      answer:'Trophies är spelets samlingsmål 🏆. De låses upp när du når bestämda mängder klick. Många tillhör egna serier med namn, beskrivningar, citat och särskilda teman.'
    },
    {
      phrases:['vad ar exklusiva serier','vad betyder exklusiva serier','hur fungerar serier','vad ar trophy serier','beratta om serierna','vad ar specialserier'],
      answer:'Exklusiva serier samlar trophies och ibland perks kring ett särskilt tema, en person eller ett spelminne. Där finns bland annat Hampus Exclusive, Memory Trails, Frontier Memories och Stammis Series.'
    },
    {
      phrases:['vad ar klick upgrades','vad ar klick uppgraderingar','hur fungerar klick upgrades','vad gor klick upgrades','vilka klick upgrades finns','hur koper jag klick upgrades'],
      answer:'Klick-upgrades ökar främst hur många klick du får per tryck. I samma del kan det också finnas auto-klick som fortsätter arbeta åt dig i bakgrunden.'
    },
    {
      phrases:['vad ar poang upgrades','vad ar poang uppgraderingar','hur fungerar poang upgrades','vad gor poang upgrades','hur koper jag poang upgrades'],
      answer:'Poäng-upgrades ökar hur många poäng du får per tryck. Auto-poäng kan dessutom ge poäng automatiskt varje sekund.'
    },
    {
      phrases:['vad ar auto klick','hur fungerar auto klick','vad gor auto klick','autoclick','automatiska klick','klick per sekund'],
      answer:'Auto-klick ger klick automatiskt varje sekund. Ju fler auto-klickpaket du köper, desto snabbare arbetar den osynliga klickfabriken.'
    },
    {
      phrases:['vad ar auto poang','hur fungerar auto poang','vad gor auto poang','automatiska poang','poang per sekund'],
      answer:'Auto-poäng ger poäng automatiskt varje sekund. Det hjälper progressionen även när du inte trycker lika intensivt.'
    },
    {
      phrases:['vad ar perks','vad ar en perk','hur fungerar perks','hur funkar perks','vad gor perks','beratta om perks','hur laser jag upp perks','var finns perks'],
      answer:'Perks är specialbonusar som stärker klick och poäng 👑. Många låses upp genom rätt trophy-serie eller prestige-nivå. Exakta bonusar och upplåsningskrav visas i Perks-menyn.'
    },
    {
      phrases:['vad ar prestige','hur fungerar prestige','hur funkar prestige','hur prestigar man','nar kan jag prestiga','vad hander vid prestige','vad gor prestige','forklara prestige','forlorar jag allt nar jag prestigar'],
      answer:'Prestige låses upp när du har nått spelets krav. Du börjar om med mycket av den vanliga progressionen, men behåller en permanent bonus och får nya prestige-titlar.'
    },
    {
      phrases:['vad ar prestige hall','hur fungerar prestige hall','vad finns i prestige hall','var ser jag prestige titlar','prestige titlar'],
      answer:'Prestige Hall visar alla prestige-nivåer och titlar. Låsta nivåer är nedtonade, medan nivåer du har nått markeras tydligare tillsammans med sina bonusar.'
    },
    {
      phrases:['vad ar reset','hur aterstaller jag spelet','hur nollstaller jag spelet','vad hander om jag resettar','vanlig reset','radera allt'],
      answer:'En vanlig reset rensar spelets progression, inklusive poäng, klick, upgrades och trophies. Prestige Reset är en annan funktion och ger permanent bonus.'
    },
    {
      phrases:['hur sparar jag','sparas spelet','automatisk sparning','var finns min sparfil','hur exporterar jag','hur importerar jag','sakerhetskopiera spelet','ladda sparfil'],
      answer:'Spelet sparar automatiskt i webbläsaren 💾. I Inställningar finns en sparmeny där du kan exportera din sparfil som säkerhetskopia och importera den igen senare.'
    },
    {
      phrases:['hur byter jag tema','vad ar teman','vilka teman finns','hur laser jag upp teman','andra utseende','morkt lage','ljust lage','utseende'],
      answer:'Teman ändrar spelets färger och bakgrund 🎨. Vissa är tillgängliga direkt och andra låses upp genom prestige eller särskilda prestationer.'
    },
    {
      phrases:['hur byter jag sprak','vilka sprak finns','finns engelska','kommer engelska','kommer fler sprak','svenska eller engelska','language','sprakinstallning'],
      answer:'Svenska är huvudspråket eftersom Oskar är svensktalande. Engelska är planerat, och förhoppningen är att fler språk kan läggas till i framtiden.'
    },
    {
      phrases:['vem skapade spelet','vem gjorde spelet','vem ar utvecklaren','vem har designat spelet','vem designade spelet','vem programmerade spelet','vem ligger bakom spelet','vem ar oskar','vem byggde spelet'],
      answer:'Oskar står för spelidén, den kreativa designen, serierna, namnen och riktningen. ChatGPT har hjälpt till med programmering, struktur och felsökning. Oskar håller ritningen, och kodverkstaden får svettas lite 🤖🏆.'
    },
    {
      phrases:['vem ar du','vad ar oskar ai','vem ar oskar ai','vad kan du gora','vad kan du hjalpa mig med','hur fungerar ai chatten','ar du en riktig ai'],
      answer:'Jag är Oskar AI, spelets inbyggda hjälpassistent. Jag kan svara på vanliga frågor om spelet, trophies, perks, prestige, uppdateringar, sparning, teman och hur du kommer igång.'
    },
    {
      phrases:['vilken version ar detta','vilken version','vad ar versionen','senaste versionen','ar detta 1 1','version 1 1','vilken beta'],
      answer:'Det här är Version 1.1 Beta 2. Den fokuserar på en smartare Oskar AI som känner igen många olika sätt att formulera samma fråga, samtidigt som custom-rösten bara används för hälsningen.'
    },
    {
      phrases:['vad ar nytt','vad har lagts till','senaste uppdateringen','vad andrades','uppdateringsnyheter','vad kom i uppdateringen','nyheter i 1 1','vad innehaller 1 1'],
      answer:'Version 1.1 Beta 2 bygger ut Oskar AI med en större kunskapsbank och många olika frågeformuleringar. Custom-rösten används bara för välkomsthälsningen.'
    },
    {
      phrases:['kommer fler uppdateringar','utvecklas spelet fortfarande','vad kommer sen','framtida uppdateringar','kommer version 1 2','framtidsplaner'],
      answer:'Ja, planen är att spelet ska fortsätta växa med fler serier, perks, prestige-nivåer, språk, förbättringar och nya AI-funktioner.'
    },
    {
      phrases:['vad ar stammis series','beratta om stammis series','stammis serien','vad betyder stammis','stammis trophies'],
      answer:'Stammis Series är en personlig och varm serie om gemenskap, återkommande spelstunder och känslan av att höra hemma. Bonusar visas separat i Perks.'
    },
    {
      phrases:['vad ar stammis remix','beratta om stammis remix','stammis remix series','vad betyder remix serien'],
      answer:'Stammis Remix Series är en starkare och mer intensiv fortsättning på Stammis Series. Den behåller gemenskapen men skruvar upp energin och firandet.'
    },
    {
      phrases:['vad ar memory trails','beratta om memory trails','memory trail serien','vad betyder memory trails'],
      answer:'Memory Trails är en serie om delade spelminnen, äventyr, natur och långa resor genom olika spelvärldar.'
    },
    {
      phrases:['vad ar frontier memories','beratta om frontier memories','frontier serien','vad betyder frontier memories'],
      answer:'Frontier Memories är en westerninspirerad serie om vägar, lägereldar, lojalitet och minnen från öppna gränsland.'
    },
    {
      phrases:['vad ar jullsta series','beratta om jullsta','jullsta serien','vad betyder jullsta','vilka jullsta trophies finns'],
      answer:'Jullsta Series är en exklusiv trophy-serie inspirerad av platsen Jullsta och dess minnen och berättelser. Serien innehåller Jullsta Beginner, Jullsta Explorer, Jullsta Legend, King of Jullsta och Spirit of Jullsta.'
    },
    {
      phrases:['vad ar hampus exclusive','beratta om hampus','hampus serien','vad betyder hampus exclusive'],
      answer:'Hampus Exclusive är en personlig serie inspirerad av Hampus. Den fokuserar på vänskap, minnen och värme.'
    },
    {
      phrases:['vilken serie ska jag borja med','vad ska jag satsa pa','vilken trophy forst','vad ar nasta mal','ge mig ett tips','vad rekommenderar du'],
      answer:'Börja med den vanliga progressionen: samla klick, köp grundläggande upgrades och följ nästa trophy som visas under klickknappen.'
    },
    {
      phrases:['hur kontaktar jag skaparen','kan jag kontakta oskar','var ger jag feedback','hur skickar jag forslag','rapportera en bugg'],
      answer:'Det finns ingen särskild kontaktfunktion i spelet ännu. Feedback kan tills vidare lämnas direkt till Oskar där han har delat spelet.'
    },
    {
      phrases:['kommer multiplayer','finns multiplayer','kan man spela tillsammans','online lage','spela med kompis'],
      answer:'Multiplayer finns inte just nu. Spelet är byggt som ett enspelar-clicker, men sociala funktioner kan undersökas i framtiden.'
    },
    {
      phrases:['kan jag installera spelet','lagg till pa hemskarmen','ar det en app','hur installerar jag','pwa','mobilapp'],
      answer:'Spelet är en webbapp och kan i många webbläsare läggas till på mobilens hemskärm. Då får det en egen ikon och öppnas mer som en vanlig app.'
    }
  ];

  for(const intent of intents){
    if(matchesOskarIntent(q, intent.phrases)){
      return intent.answer;
    }
  }

  return 'Jag känner inte riktigt igen den frågan ännu. Prova att fråga om hur man börjar, klick, poäng, trophies, upgrades, perks, prestige, sparning, teman, språk, serier, versionen, uppdateringen eller vem som skapade spelet. 🤖🏆';
}

const OSKAR_AI_WELCOME = 'Hej och välkommen! Jag är Oskar, din personliga spelassistent i Clicker to Get Big Trophies. Om du undrar över något, oavsett om det handlar om hur spelet fungerar, trophies, perks, prestige eller de senaste uppdateringarna, är det bara att fråga. Jag hjälper dig gärna på bästa sätt. Vad vill du veta? 🤖🏆';
let oskarVoiceEnabled = localStorage.getItem('oskarVoiceEnabled') !== 'false';
let oskarWelcomeSpoken = false;

function updateOskarVoiceStatus(){
  const status = document.getElementById('oskarVoiceStatus');
  const toggleBtn = document.getElementById('oskarVoiceToggleBtn');
  const welcomeBtn = document.getElementById('oskarWelcomeBtn');
  if(status) status.textContent = oskarVoiceEnabled ? 'På' : 'Av';
  if(toggleBtn) toggleBtn.textContent = oskarVoiceEnabled ? 'Stäng av röst' : 'Slå på röst';
  if(welcomeBtn){
    welcomeBtn.disabled = !oskarVoiceEnabled;
    welcomeBtn.textContent = oskarVoiceEnabled ? '▶ Spela upp hälsning' : '🔇 Hälsning avstängd';
    welcomeBtn.title = oskarVoiceEnabled ? 'Spelar upp hälsningsljudet.' : 'Slå på AI-röst först för att kunna spela hälsningen.';
  }
}


function playOskarWelcomeAudio(force=false){
  if(!oskarVoiceEnabled && !force){
    updateOskarVoiceStatus();
    return false;
  }
  const audio = document.getElementById('oskarWelcomeAudio');
  if(!audio) return false;
  try{
    audio.pause();
    audio.currentTime = 0;
    const playPromise = audio.play();
    if(playPromise && typeof playPromise.catch === 'function'){
      playPromise.catch(()=>{});
    }
    return true;
  }catch(e){
    return false;
  }
}


function toggleOskarVoice(){
  oskarVoiceEnabled = !oskarVoiceEnabled;
  localStorage.setItem('oskarVoiceEnabled', oskarVoiceEnabled ? 'true' : 'false');
  if(!oskarVoiceEnabled){
    const audio = document.getElementById('oskarWelcomeAudio');
    if(audio){
      audio.pause();
      audio.currentTime = 0;
    }
  }
  updateOskarVoiceStatus();
}

function addOskarAIMessage(text, who){
  const chat = document.getElementById('oskarAiChat');
  if(!chat) return;
  const div = document.createElement('div');
  div.className = 'aiMsg ' + (who === 'user' ? 'aiUser' : 'aiBot');
  const textDiv = document.createElement('div');
  textDiv.className = 'aiMsgText';
  textDiv.textContent = text;
  div.appendChild(textDiv);
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function askOskarAI(text){
  addOskarAIMessage(text, 'user');
  addOskarAIMessage(oskarAIAnswer(text), 'bot');
}

function sendOskarAI(){
  const input = document.getElementById('oskarAiInput');
  if(!input) return;
  const text = input.value.trim();
  if(!text) return;
  input.value = '';
  askOskarAI(text);
}

function resetOskarAIChat(){
  const chat = document.getElementById('oskarAiChat');
  if(!chat) return;
  chat.innerHTML = '';
  chat.dataset.started = '1';
  addOskarAIMessage(OSKAR_AI_WELCOME, 'bot');
  const input = document.getElementById('oskarAiInput');
  if(input) input.focus();
}

function initOskarAI(){
  updateOskarVoiceStatus();
  const chat = document.getElementById('oskarAiChat');
  if(chat && !chat.dataset.started){
    resetOskarAIChat();
    oskarWelcomeSpoken = true;
  }
}

setInterval(()=>{
  const acr=autoClickRate();
  const apr=autoPointRate();
  if(acr>0) state.clicks += acr;
  if(apr>0) state.score += apr;
  if(acr>0 || apr>0){ save(); render(); }
},1000);

document.getElementById("clickButton").addEventListener("click", clickGame);
applyTheme();
render();
renderThemes();
renderExclusiveSeries();


function formatMarittaTime(seconds){
  if(!Number.isFinite(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2,'0');
  return `${minutes}:${secs}`;
}

function getMarittaAudio(){
  return document.getElementById('marittaGuideAudio');
}

function openMarittaGuide(){
  const overlay = document.getElementById('marittaGuideOverlay');
  if(overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMarittaGuide(){
  const overlay = document.getElementById('marittaGuideOverlay');
  const audio = getMarittaAudio();
  if(audio) audio.pause();
  if(overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
  updateMarittaStatus(audio && audio.currentTime > 0 ? 'Guiden är pausad.' : 'Guiden är stängd.');
}

async function playMarittaGuide(){
  const audio = getMarittaAudio();
  if(!audio) return;
  try{
    await audio.play();
    updateMarittaStatus('Maritta läser guiden.');
  }catch(error){
    updateMarittaStatus('Ljudet kunde inte starta. Tryck på Spela guiden igen.');
  }
}

function pauseMarittaGuide(){
  const audio = getMarittaAudio();
  if(!audio) return;
  audio.pause();
  updateMarittaStatus(audio.currentTime > 0 ? 'Guiden är pausad. Tryck på Spela guiden för att fortsätta.' : 'Guiden har inte startat ännu.');
}



function updateMarittaStatus(message){
  const status = document.getElementById('marittaStatus');
  if(status) status.textContent = message;
}

function updateMarittaProgress(){
  const audio = getMarittaAudio();
  const progress = document.getElementById('marittaProgress');
  const current = document.getElementById('marittaCurrentTime');
  const duration = document.getElementById('marittaDuration');
  if(!audio) return;
  if(progress){
    progress.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  }
  if(current) current.textContent = formatMarittaTime(audio.currentTime);
  if(duration) duration.textContent = formatMarittaTime(audio.duration);
}


function toggleMarittaText(){
  const text = document.getElementById('marittaGuideText');
  const button = document.getElementById('marittaExpandBtn');
  if(!text || !button) return;

  const expanded = text.classList.toggle('marittaTextExpanded');
  text.classList.toggle('marittaTextCollapsed', !expanded);
  button.textContent = expanded ? 'Visa mindre text' : 'Visa hela texten';
}

function initMarittaGuide(){
  const audio = getMarittaAudio();
  const progress = document.getElementById('marittaProgress');
  const overlay = document.getElementById('marittaGuideOverlay');
  if(!audio) return;

  audio.addEventListener('loadedmetadata', updateMarittaProgress);
  audio.addEventListener('timeupdate', updateMarittaProgress);
  audio.addEventListener('ended', ()=>{
    updateMarittaStatus('Guiden är färdig. Lycka till i spelet! 🏆');
    updateMarittaProgress();
  });
  audio.addEventListener('error', ()=>{
    updateMarittaStatus('Det gick inte att läsa in guidens ljud.');
  });

  if(progress){
    progress.addEventListener('input', ()=>{
      if(audio.duration){
        audio.currentTime = (Number(progress.value) / 100) * audio.duration;
        updateMarittaProgress();
      }
    });
  }

  if(overlay){
    overlay.addEventListener('click', event=>{
      if(event.target === overlay) closeMarittaGuide();
    });
  }

  document.addEventListener('keydown', event=>{
    if(event.key === 'Escape' && overlay && overlay.classList.contains('open')){
      closeMarittaGuide();
    }
  });

  updateMarittaProgress();
}

initMarittaGuide();


/* Version 1.1 Beta 2: uppdateringsruta och GitHub Pages-stöd */
const UPDATE_SEEN_KEY = 'ctgbt_update_v1_1_beta2_seen';

function openUpdateOverlay(force=false){
  const overlay = document.getElementById('updateOverlay');
  if(!overlay) return;
  if(force || localStorage.getItem(UPDATE_SEEN_KEY) !== '1'){
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeUpdateOverlay(){
  const overlay = document.getElementById('updateOverlay');
  if(overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function continueFromUpdate(){
  const checkbox = document.getElementById('hideUpdateAgain');
  if(checkbox && checkbox.checked) localStorage.setItem(UPDATE_SEEN_KEY,'1');
  closeUpdateOverlay();
}

function initUpdateOverlay(){
  const overlay = document.getElementById('updateOverlay');
  if(overlay){
    overlay.addEventListener('click', event=>{
      if(event.target === overlay) closeUpdateOverlay();
    });
  }
  openUpdateOverlay(false);
}

if('serviceWorker' in navigator && location.protocol !== 'file:'){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('./sw.js').catch(()=>{});
  });
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', initUpdateOverlay);
}else{
  initUpdateOverlay();
}
