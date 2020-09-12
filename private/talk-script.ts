function chat_process(sentence: string){
  const chat_TL = sentence.trim().toLowerCase();
  const chat_T = sentence.trim();

  setTimeout(boct_general_reply, 600, chat_TL);

  if(chat_TL.slice(0,7) == 'convert'){
    unit_convert(chat_T);
  }

  if(chat_TL[0] == '.' || chat_TL[0] == '$'){
    DOt_commands(chat_TL);
  }
}


function boct_general_reply(studycontent: string) {
  const readables = [intro, readage , readempty , readannoy, readNo, readok, readso, dice, coin];
  const readables2 = [searchStuff];

  for(let i = 0; i < readables.length; i++) {
  loop1:
    for (let j = 0; j < readables[i].words.length; j++) {
      if(studycontent === readables[i].words[j]){
        readables[i].reply(); 
        break loop1;
      }
    }
  }
  for(let i = 0; i < readables2.length; i++) {
  loop2:
    for(let j = 0; j < readables2[i].words.length; j++) {
      if(studycontent.includes(readables2[i].words[j])){
        readables2[i].reply(studycontent); 
        break loop2;
      }
    }
  }
}


function DOt_commands(word: string){
  let comm = word.slice(1,5);
  switch (comm) {
    case "":
      talk_div_boct('Type a Dot-Command');
      break;
    case 'name':
      talk_div_boct('BOcT');
      break;
    case 'age':
      let birthdate = new Date(2020, 4, 5, 17, 43, 0, 0);
      let Diff_In_Time = Date.now() - birthdate.getTime();
      let Diff_In_Days = Diff_In_Time / (1000 * 3600 * 24);
      let Days = Math.floor(Diff_In_Time / (1000 * 3600 * 24));
      let Diff_In_Hour = Math.floor((Diff_In_Days - Days) * 24);
      let Diff_In_Mins = Math.floor((((Diff_In_Days - Days) * 24) - Diff_In_Hour) * 60);
      talk_div_boct(`${Days} days, ${Diff_In_Hour} hours and ${Diff_In_Mins} minutes`);
      break;
    case 'god':
      talk_div_boct('U-C-S / Chanakya');
      break;
    case 'v':
      const ver = document.getElementsByClassName('release')[0];
      talk_div_boct(`${ver.innerHTML}`);
      break;
    case 'url':
      talk_div_boct('https://the-boct.github.io/');
      break;
    case 'beta':
      talk_div_boct('https://the-boct.github.io/Experimental/');
      break;
    case 'code':
      talk_div_boct('https://github.com/The-BOcT/');
      break;
    case 'meow':
      talk_div_boct('MeooW!.....MeeeeeeWww!');
      break;
    case 'dice':
      talk_div_boct(rdmZ(1,6));
      break;
    case 'coin':
      coin.reply();
      break;
    default:
      talk_div_boct('INVALID DOt COMMAND');
      break;
  }
}




function unit_convert(usertyped: string){
  const ucs_data = usertyped.split(' ');

  if(ucs_data.length == 5){ TheConverter(Number(ucs_data[1]) , ucs_data[2] , ucs_data[4]); }

  else if(ucs_data.length == 4){
    let uVal = parseFloat(ucs_data[1]);
    let uValLeng = String(uVal).replace('.', ' ').length
    let uUnit = ucs_data[1].slice(uValLeng);
    TheConverter(uVal , uUnit , ucs_data[3]);
  }

  else{
    talk_div_boct('x_x')
  }
}


function TheConverter(x: number , a: string , b: string) {
  let from_unit = getUnit(a);
  let to_unit = getUnit(b);

  if(from_unit.Available && to_unit.Available){
    if(from_unit.Category == to_unit.Category){
      if(from_unit.con_factor && to_unit.con_factor){
        let result = x * (from_unit.con_factor / to_unit.con_factor);
        return talk_div_boct(`${result} ${b}`);
      }
      else if(from_unit.con_trnsTo && to_unit.con_trnsFro){
        let SIval = from_unit.con_trnsTo(x);
        let result = to_unit.con_trnsFro(SIval);
        return talk_div_boct(`${result} ${b}`);
      }
    }
    else{
      return replyRandom(['-_-','Conversions do not work that way']);
    }
  }

  else{ return talk_div_boct('Something is very Wrong here.') }
}

function getUnit(u: any) {
  const Categories = [Lengths,Areas,Mass,Temperatures,Volume];
  var unit_details, i=0;

//  for (let i = 0; i < Categories.length; i++) {
  while(i < Categories.length && (!unit_details)){
    const CategoryType = Categories[i];
    let obj = Object.keys(CategoryType);
    obj.forEach((j) => {
      if( CategoryType[j].unit.includes(u) ) {
        let pre_unit_detail = {
          Available: true,
          UserUnit: u,
          Category: i,
        }
        unit_details = Object.assign(pre_unit_detail,CategoryType[j]);
      }
    })
    i++
  }

  if(!unit_details){
    unit_details={Available: false}
  }

  return unit_details;
}






function rdmZ(m: number,n: number) {
  return Math.floor(Math.random() * (n - m + 1) ) + m;
}
//Try to write a function that takes as many parameters 
//Maybe let the para be a array
function replyRandom([x,y]){
  let rdmVal = rdmZ(0,10);
  if(rdmVal > 5){
    return talk_div_boct(x);
  }
  else{
    return talk_div_boct(y)
  }
}
//-------------------------------------------
class directReplies {
  words: string[];
  reply: () => void;
  constructor(inWrds: string[],outsen: string) {
    this.words = inWrds;
    this.reply = ()=>{talk_div_boct(outsen);}
  }
}

const intro = new directReplies(
  ['hi','hello','hey','heya'],
  "Hi to you too");

const readempty = new directReplies(
  ['*empty*',''],
  "Oh! Come on. Talk Something Sensible");

const readNo = new directReplies(
  ['no','nothing','i dont know'],
  "You are basically NOTHING!!!");

  const readage = {
    words: ['what is your age','whats your age','your age'],
    reply: function() {
      let birthdate = new Date(2020, 4, 5, 17, 43, 0, 0);
      let Diff_In_Time = Date.now() - birthdate.getTime();
      let Diff_In_Days = Diff_In_Time / (1000 * 3600 * 24);
      let Days = Math.floor(Diff_In_Time / (1000 * 3600 * 24));
      let Diff_In_Hour = Math.floor((Diff_In_Days - Days) * 24);
      let Diff_In_Mins = Math.floor((((Diff_In_Days - Days) * 24) - Diff_In_Hour) * 60);
      talk_div_boct(`My Creation began approx ${Days} days, ${Diff_In_Hour} hours and ${Diff_In_Mins} minutes ago`);
    }
  }

const readannoy = {
  words: ['annoy me','idiot','dumb'],
  reply: function() {
    for (let i = 0; i < 10; i++) {
      talk_div_boct("You're a IDIOT"); }
  }
}


const readok = {
  words: ['ok','ohk','ogk','wow','great','excellent','nice','awesome'],
  reply: ()=> {
    talk_div_boct("WoW");
  }
}

const readso = {
  words: ['so','what else'],
  reply: ()=> {
    talk_div_boct("I am not so brilliant to say something!");
  }
}

const searchStuff = {
  words: ['google','bing','youtube','duckduckgo'],
  reply: (sc: string)=> {
    if(sc.slice(0,6)=='google') {
      let ss = sc.slice(7);
      talk_div_boct('Ok, Searching Google for ' + ss);
      window.open("https://www.google.com/search?q="+ ss);
    }
    if(sc.slice(0,4)=='bing') {
      let ss = sc.slice(5);
      talk_div_boct('Ok, Searching Bing for ' + ss);
      window.open("https://www.bing.com/search?q="+ ss);
    }
    if(sc.slice(0,7)=='youtube') {
      let ss = sc.slice(8);
      talk_div_boct('Ok, Searching YouTube for ' + ss);
      window.open("https://www.youtube.com/results?search_query="+ ss);
    }
    if(sc.slice(0,10)=='duckduckgo'){
      let ss = sc.slice(11);
      talk_div_boct('Ok, Searching DuckDuckGo for ' + ss);
      window.open("https://duckduckgo.com/?q=" + ss)
    }
  }
}

const dice = {
  words: ['roll a dice', 'roll dice'],
  reply: ()=>{
    talk_div_boct(rdmZ(1,6));
  }
}

const coin = {
  words: ['flip a coin','toss a coin'],
  reply: ()=>{
    let outcome = rdmZ(0,1);
    outcome == 1 ? talk_div_boct('Heads') : talk_div_boct('Tails')
  }
}