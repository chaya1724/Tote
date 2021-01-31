import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { Email } from 'src/Models/Email';
import swal from 'sweetalert';
import { MailService } from '../mail.service';
import { UserService } from '../user.service';
import { from as observableFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-specifi',
  templateUrl: './specifi.component.html',
  styleUrls: ['./specifi.component.css']
})
export class SpecifiComponent implements OnInit {
  mySelect: any;
  hide: boolean = true;
  flag: any;
  masecesPerse: any;
  kindOfSO: number;
  simenFlag: number;
  AhlocesFlag: number;
  i: number;
  numOfSeif: number;
  hideSeif: boolean = true;
  hideSimen: boolean = true;
  nameSO: string;
  nameSimen: string;
  nameSeif: string;
  selected: any;
  flagMasechesSelected: boolean = false;
  flagPageCheckboxes: boolean = false;
  spezhifiSelected: boolean = false;
  items: any[] = [];
  hlocesList: string[];
  chackBoxselected: any[] = [];
  listOfSpzhifiPages: any[] = [];
  specifisListDB: any[] = [];
  hideSeifCheckboxes: boolean = false;
  pageList: string[] = ["ב", ":ב", ".ג", ":ג", ".ד", ":ד", ".ה", ":ה", ".ו", ":ו", ".ז", ":ז", ".ח", ":ח", ".ט", ":ט", ".י", ":י", ".יא", ":יא", ".יב", ":יב", ".יג", ":יג", ".יד", ":יד", ".טו", ":טו", ".טז", ":טז", ".יז", ":יז", ".יח", ":יח", ".יט", ":יט", ".כ", ":כ", ".כא", ":כא", ".כב", ":כב", ".כג", ":כג", ".כד", ":כד", ".כה", ":כה", ".כו", ":כו", ".כז", ":כז", ".כח", ":כח", ".כט", ":כט", ".ל", ":ל", ".לא", ":לא", ".לב", ":לב", ".לג", ":לג", ".לד", ":לד", ".לה", ":לה", ".לו", ":לו", ".לז", ":לז", ".לח", ":לח", ".לט", ":לט", ".מ", ":מ", ".מא", ":מא", ".מב", ":מב", ".מג", ":מג", ".מד", ":מד", ".מה", ":מה", ".מו", ":מו", ".מז", ":מז", ".מח", ":מח", ".מט", ":מט", ".נ", ":נ", ".נא", ":נא", ".נב", ":נב", ".נג", ":נג", ".נד", ":נד", ".נה", ":נה", ".נו", ":נו", ".נז", ":נז", ".נח", ":נח", ".נט", ":נט", ".ס", ":ס", ".סא", ":סא", ".סב", ":סב", ".סג", ":סג", ".סד", ":סד", ".סה", ":סה", ".סו", ":סו", ".סז", ":סז", ".סח", ":סח", ".סט", ":סט", ".ע", ":ע", ".עא", ":עא", ".עב", ":עב", ".עג", ":עג", ".עד", ":עד", ".עה", ":עה", ".עו", ":עו", ".עז", ":עז", ".עח", ":עח", ".עט", ":עט", ".פ", ":פ", ".פא", ":פא", ".פב", ":פב", ".פג", ":פג", ".פד", ":פד", ".פה", ":פה", ".פו", ":פו", ".פז", ":פז", ".פח", ":פח", ".פט", ":פט", ".צ", ":צ", ".צא", ":צא", ".צב", ":צב", ".צג", ":צג", ".צד", ":צד", ".צה", ":צה", ".צו", ":צו", ".צז", ":צז", ".צח", ":צח", ".צט", ":צט", ".ק", ":ק", ".קא", ":קא", ".קב", ":קב", ".קג", ":קג", ".קד", ":קד", ".קה", ":קה", ".קו", ":קו", ".קז", ":קז", ".קח", ":קח", ".קט", ":קט", ".קי", ":קי", ".קיא", ":קיא", ".קיב", ":קיב", ".קיג", ":קיג", ".קיד", ":קיד", ".קטו", ":קטו", ".קטז", ":קטז", ".קיז", ":קיז", ".קיח", ":קיח", ".קיט", ":קיט", ".קכ",
    ":קכ", ".קכא", ":קכא", ".קכב", ":קכב", ".קכג", ":קכג", ".קכד", ":קכד", ".קכה", ":קכה", ".קכו", ":קכו", ".קכז", ":קכז", ".קכח", ":קכח", ".קכט", ":קכט", ".קל", ":קל", ".קלא", ":קלא", ".קלב", ":קלב", ".קלג", ":קלג", ".קלד", ":קלד", ".קלה", ":קלה", ".קלו", ":קלו", ".קלז", ":קלז", ".קלח", ":קלח", ".קלט", ":קלט", ".קמ", ":קמ", ".קמא", ":קמא", ".קמב", ":קמב", ".קמג", ":קמג", ".קמד", ":קמד", ".קמה", ":קמה", ".קמו", ":קמו", ".קמז", ":קמז", ".קמח", ":קמח", ".קמט", ":קמט", ".קנ", ":קנ", ".קנא", ":קנא", ".קנב", ":קנב", ".קנג", ":קנג", ".קנד", ":קנד", ".קנה", ":קנה", ".קנו", ":קנו", ".קנז", ":קנז", ".קנח", ":קנח", ".קנט", ":קנט", ".קס", ":קס", ".קסא", ":קסא", ".קסב", ":קסב", ".קסג", ":קסג", ".קסד", ":קסד", ".קסה", ":קסה", ".קסו", ":קסו", ".קסז", ":קסז", ".קסח", ":קסח", ".קסט", ":קסט", ".קע", ":קע", , ".קעא", ":קעא", ".קעב", ":קעב", ".קעג", ":קעג", ".קעד", ":קעד", ".קעה", ":קעה", ".קעו", ":קעו", ".קעז", ":קעז",]
  simenList: string[] = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "יא", "יב", "יג", "יד", "טו", "טז", "יז", "יח", "יט", "כ", "כא", "כב", "כג", "כד", "כה", "כו", "כז", "כח", "כט", "ל", "לא", "לב", "לג", "לד", "לה", "לו", "לז", "לח", "לט", "מ", "מא", "מב", "מג", "מד", "מה", "מו", "מז", "מח", "מט", "נ", "נא", "נב", "נג", "נד", "נה", "נו", "נז", "נח", "נט",
    "ס", "סא", "סב", "סג", "סד", "סה", "סו", "סז", "סח", "סט", "ע", "עא", "עב", "עג", "עד", "עה", "עו", "עז", "עח", "עט", "פ", "פא", "פב", "פג", "פד", "פה", "פו", "פז", "פח", "פט", "צ", "צא", "צב", "צג", "צד", "צה", "צו", "צז", "צח", "צט", "ק", "קא", "קב", "קג", "קד", "קה", "קו", "קז", "קח", "קט", "קי", "קיא", "קיב",
    "קיג", "קיד", "קטו", "קטז", "קיז", "קיח", "קיט", "קכ", "קכא", "קכב", "קכג", "קכד", "קכה", "קכו", "קכז", "קכח", "קכט", "קל", "קלא", "קלב", "קלג", "קלד", "קלה", "קלו", "קלז", "קלח", "קלט", "קמ", "קמא", "קמב", "קמג", "קמד", "קמה", "קמו", "קמז", "קמח", "קמט", "קנ", "קנא", "קנב", "קנג", "קנד", "קנה", "קנו", "קנז", "קנח", "קנט", "קס",
    "קסא", "קסב", "קסג", "קסד", "קסה", "קסו", "קסז", "קסח", "קסט", "קע", "קעא", "קעב", "קעג", "קעד", "קעה", "קעו", "קעז", "קעח", "קעט", "קפ", "קפא", "קפב", "קפג", "קפד", "קפה", "קפו", "קפז", "קפח", "קפט", "קצ", "קצא", "קצב", "קצג", "קצד", "קצה", "קצו", "קצז", "קצח", "קצט", "ר", "רא", "רב", "רג", "רד", "רה", "רו", "רז", "רח", "רט",
    "רי", "ריא", "ריב", "ריג", "ריד", "רטו", "רטז", "ריז", "ריח", "ריט", "רכ", "רכא", "רכב", "רכג", "רכד", "רכה", "רכו", "רכז", "רכח", "רכט", "רל", "רלא", "רלב", "רלג", "רלד", "רלה", "רלו", "רלז", "רלח", "רלט", "רמ", "רמא", "רמב", "רמג", "רמד", "רמה", "רמו", "רמז", "רמח", "רמט", "רנ", "רנא", "רנב", "רנג", "רנד", "רנה", "רנו",
    "רנז", "רנח", "רנט", "רס", "רסא", "רסב", "רסג", "רסד", "רסה", "רסו", "רסז", "רסח", "רסט", "רע", "רעא", "רעב", "רעג", "רעד", "רעה", "רעו", "רעז", "רעח", "רעט", "רפ", "רפא", "רפב", "רפג", "רפד", "רפה", "רפו", "רפז", "רפח", "רפט", "רצ", "רצא", "רצב", "רצג", "רצד", "רצה", "רצו", "רצז", "רצח", "רצט", "ש", "שא", "שב", "שג", "שד",
    "שה", "שו", "שז", "שח", "שט", "שי", "שיא", "שיב", "שיג", "שיד", "שטו", "שטז", "שיז", "שיח", "שיט", "שכ", "שכא", "שכב", "שכג", "שכד", "שכה", "שכו", "שכז", "שכח", "שכט", "של", "שלא", "שלב", "שלג", "שלד", "שלה", "שלו", "שלז", "שלח", "שלט", "שמ", "שמא", "שמב", "שמג", "שמד", "שמה", "שמו", "שמז", "שמח", "שמט", "שנ", "שנא", "שנב",
    "שנג", "שנד", "שנה", "שנו", "שנז", "שנח", "שנט", "שס", "שסא", "שסב", "שסג", "שסד", "שסה", "שסו", "שסז", "שסח", "שסט", "שע", "שעא", "שעב", "שעג", "שעד", "שעה", "שעו", "שעז", "שעח", "שעט", "שפ", "שפא", "שפב", "שפג", "שפד", "שפה", "שפו", "שפז", "שפח", "שפט", "שצ", "שצא", "שצב", "שצג", "שצד", "שצה", "שצו", "שצז", "שצח", "שצט",
    "ת", "תא", "תב", "תג", "תד", "תה", "תו", "תז", "תח", "תט", "תי", "תיא", "תיב", "תיג", "תיד", "תטו", "תטז", "תיז", "תיח", "תיט", "תכ", "תכא", "תכב", "תכג", "תכד", "תכה", "תכו", "תכז", "תכח", "תכט", "תל", "תלא", "תלב", "תלג", "תלד", "תלה", "תלו", "תלז", "תלח", "תלט", "תמ", "תמא", "תמב",
    "תמג", "תמד", "תמה", "תמו", "תמז", "תמח", "תמט", "תנ", "תנא", "תנב", "תנג", "תנד", "תנה", "תנו", "תנז", "תנח", "תנט", "תס", "תסא", "תסב", "תסג", "תסד", "תסה", "תסו", "תסז", "תסח", "תסט", "תע", "תעא", "תעב", "תעג", "תעד", "תעה", "תעו", "תעז", "תעח", "תעט", "תפ", "תפא", "תפב", "תפג", "תפד", "תפה", "תפו", "תפז", "תפח", "תפט", "תצ",
    "תצא", "תצב", "תצג", "תצד", "תצה", "תצו", "תצז", "תצח", "תצט", "תק", "תקא", "תקב", "תקג", "תקד", "תקה", "תקו", "תקז", "תקח", "תקט", "תקי", "תקיא", "תקיב", "תקיג", "תקיד", "תקטו", "תקטז", "תקיז", "תקיח", "תקיט", "תקכ", "תקכא", "תקכב", "תקכג", "תקכד", "תקכה", "תקכו", "תקכז", "תקכח", "תקכט", "תקל", "תקלא", "תקלב", "תקלג", "תקלד",
    "תקלה", "תקלו", "תקלז", "תקלח", "תקלט", "תקמ", "תקמא", "תקמב", "תקמג", "תקמד", "תקמה", "תקמו", "תקמז", "תקמח", "תקמט", "תקנ", "תקנא", "תקנב", "תקנג", "תקנד", "תקנה", "תקנו", "תקנז", "תקנח", "תקנט", "תקס", "תקסא", "תקסב", "תקסג", "תקסד", "תקסה", "תקסו", "תקסז", "תקסח", "תקסט", "תקע", "תקעא", "תקעב", "תקעג", "תקעד", "תקעה",
    "תקעו", "תקעז", "תקעח", "תקעט", "תקפ", "תקפא", "תקפב", "תקפג", "תקפד", "תקפה", "תקפו", "תקפז", "תקפח", "תקפט", "תקצ", "תקצא", "תקצב", "תקצג", "תקצד", "תקצה", "תקצו", "תקצז", "תקצח", "תקצט", "תר", "תרא", "תרב", "תרג", "תרד", "תרה", "תרו", "תרז", "תרח", "תרט", "תרי", "תריא", "תריב", "תריג", "תריד", "תרטו", "תרטז", "תריז",
    "תריח", "תריט", "תרכ", "תרכא", "תרכב", "תרכג", "תרכד", "תרכה", "תרכו", "תרכז", "תרכח", "תרכט", "תרל", "תרלא", "תרלב", "תרלג", "תרלד", "תרלה", "תרלו", "תרלז", "תרלח", "תרלט", "תרמ", "תרמא", "תרמב", "תרמג", "תרמד", "תרמה", "תרמו", "תרמז", "תרמח", "תרמט", "תרנ", "תרנא", "תרנב", "תרנג", "תרנד", "תרנה", "תרנו", "תרנז",
    "תרנח", "תרנט", "תרס", "תרסא", "תרסב", "תרסג", "תרסד", "תרסה", "תרסו", "תרסז", "תרסח", "תרסט", "תרע", "תרעא", "תרעב", "תרעג", "תרעד", "תרעה", "תרעו", "תרעז", "תרעח", "תרעט", "תרפ", "תרפא", "תרפב", "תרפג", "תרפד", "תרפה", "תרפו", "תרפז", "תרפח", "תרפט", "תרצ", "תרצא", "תרצב", "תרצג", "תרצד", "תרצה", "תרצו", "תרצז"];
  mado: string[] = ["יסודי התורה", "דעות", "תלמוד תורה", "עבודת כוכבים וחקותיהם", "תשובה"];
  ahvo: string[] = ["קריאת שמע", "תפילה וברכת כהנים", "תפילין ומזוזה וספר תורה", "ציצית", "ברכות", "מילה,"];
  zmanim: string[] = ["שבת", "עירובין", "שביתת עשור", "שביתת יום טוב", "חמץ ומצה", "שופר וסוכה ולולב", "שקלים", "קידוש החודש", "תעניות", "מגילה וחנוכה"];
  noshim: string[] = ["אישות", "גירושין", "יבום וחליצה", "נערה בתולה", "סוטה"];
  kdushe: string[] = ["איסורי ביאה", "מאכלות אסורות", "שחיטה"];
  ahfloe: string[] = ["שבועות", "נדרים", "נזירות", "ערכיןוחרמין"];
  zroim: string[] = ["כלאים", "מתנות עניים", "תרומות", "מעשר", "מעשר שני ונטע רבעי", "ביכורים", "שמיטה ויובל"];
  avode: string[] = ["בית הבחירה", "כלי המקדש והעובדים בו", "ביאת המקדש", "איסורי מזבח", "מעשה הקרבנות", "תמידין ומוספין", "פסולי המוקדשין", "עבודת יום הכיפורים", "מעילה"];
  korbonos: string[] = ["קרבן פסח", "חגיגה", "בכורות", "שגגות", "מחוסרי כפרה", "תמורה"];
  tahre: string[] = ["טומאת מת", "", "פרה אדומה", "טומאת צרעת", "מטמאי משכב ומושב", "שאר אבות הטומאות", "טומאת אוכלין", "כלים", "מקואות"];
  nezikin: string[] = ["נזקי ממון", "גניבה", "גזילה ואבידה", "חובל ומזיק", "רוצח ושמירת נפש"];
  kinion: string[] = ["מכירה", "זכיה ומתנה", "שכנים", "שלוחין ושותפין", "עבדים"];
  mishpotim: string[] = ["שכירות", "שאלה ופקדון", "מלוה ולוה", "טוען ונטען", "נחלות"];
  shoiftim: string[] = ["סנהדרין והעונשין המסורין להם", "עדות", "ממרים", "אבל", "מלכים ומלחמותיהם"];
  alefbet: string[] = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "יא", "יב", "יג", "יד", "טו", "טז", "יז", "יח", "יט", "כ", "כא", "כב", "כג", "כד", "כה", "כו", "כז", "כח", "כט", "לו", "לא", "לב", "לג", "לד", "לה", "לו", "לז", "לח", "לט", "מ", "מא", "מב", "מג", "מד", "מה", "מו", "מז", "מח", "מט", "נ", "נא", "נב", "נג", "נד", "נה", "נו", "נז", "נח", "נט"
    , "ס", "סא", "סב", "סג", "סד", "סה", "סו", "סז", "סח", "סט", "ע", "עא", "עב", "עג", "עד", "עה", "עו", "עז", "עח", "עט", "פ", "פא", "פב", "פג", "פד", "פה", "פו", "פז", "פח", "פט", "צ", "צא", "צב", "צג", "צד", "צה", "צו", "צז", "צח", "צט", "ק", "קא", "קב", "קג", "קד", "קה", "קו"
    , "קז", "קח", "קט", "קי", "קיא", "קיב", "קיג", "קיד", "קיה", "קיו", "קיז", "קיח", "קיט", "קכ", "קכא", "קכב", "קכג", "קכד", "קכה", "קכו", "קכז", "קכח", "קכט", "קל", "קלא", "קלב", "קלג", "קלד", "קלה", "קלו", "קלז", "קלח", "קלט", "קקמ", "קמא", "קמב", "קמג", "קמד", "קמה", "קמו"];
  orachChaimSeifim: number[] = [9, 6, 17, 23, 1, 4, 4, 17, 6, 12, 15, 3, 3, 5, 6, 1, 3, 3, 2, 2, 4, 1, 3, 6, 13, 2, 11, 3, 1, 5, 2, 52, 5, 4, 1, 3, 3, 13, 10, 8, 1, 3, 9, 1, 2, 9, 14, 1, 1, 1, 9, 1, 26, 3, 22, 5, 2, 7, 5, 5, 26, 5, 9, 4, 3, 10, 1, 1, 2, 5, 7, 5, 4, 6, 6, 8, 2, 1, 9, 1, 2, 2, 5, 1, 2, 1, 3, 1, 8, 27, 6, 10, 4, 9, 4, 2, 5, 5, 3, 1, 4, 5, 3, 8, 1, 3, 4,
    12, 3, 8, 3, 2, 9, 9, 1, 1, 8, 1, 4, 1, 3, 3, 6, 12, 2, 4, 2, 45, 2, 1, 8, 2, 1, 2, 14, 1, 6, 1, 11, 3, 8, 2, 5, 4, 3, 4, 8, 1, 1, 5, 12, 1, 22, 15, 2, 1, 1, 13, 20, 15, 4, 10, 2, 2, 2, 1, 20, 17, 3, 22, 5, 2, 3, 8, 6, 1, 5, 7, 6, 5, 10, 7, 12, 6, 5, 2, 4, 10, 2, 5, 3, 2, 6, 3, 3, 4, 4, 1, 11, 2, 4, 18, 8, 13, 5, 6, 1, 18, 3, 2, 6, 2, 3, 1, 4, 14, 8, 9, 9, 2, 2, 4, 6, 13, 10,
    1, 3, 3, 2, 5, 1, 3, 2, 2, 4, 4, 1, 2, 2, 17, 1, 1, 2, 6, 6, , 6, 4, 4, 2, 2, 7, 8, 9, 3, 1, 8, 1, 7, 2, 4, 3, 17, 1, 4, 13, 3, 13, 1, 2, 17, 10, 7, 4, 12, 5, 5, 1, 7, 2, 1, 7, 1, 7, 7, 5, 1, 10, 2, 2, 6, 2, 3, 5, 1, 8, 5, 15, 10, 1, 51, 13, 27, 3, 23, 14, 22, 52, 5, 9, 9, 10, 10, 12, 13, 12, 7, 19, 17, 20, 19, 6, 10, 15, 16, 13, 4, 49, 9, 11, 10, 4, 3, 27, 5, 13, 4, 8, 7,
    14, 3, 1, 1, 2, 19, 3, 1, 1, 5, 3, 1, 2, 3, 2, 5, 2, 3, 14, 1, 3, 2, 12, 36, 5, 8, 15, 1, 5, 1, 8, 6, 19, 1, 4, 4, 4, 1, 5, 2, 4, 7, 20, 1, 2, 4, 9, 1, 1, 1, 2, 2, 8, 3, 3, 1, 2, 18, 11, 11, 1, 1, 1, 1, 1, 9, 1, 3, 4, 13, 3, 1, 1, 1, 2, 4, 5, 1, 5, 1, 2, 1, 7, 4, 1, 3, 4, 1, 8, 2, 1, 2, 2, 11, 4, 1, 3, 4, 2, 4, 4, 2, 11, 3, 8, 3, 4, 12, 7, 1, 7, 27, 7, 9, 4, 6, 3, 2, 1, 6, 7, 5, 7,
    3, 1, 3, 6, 16, 10, 1, 3, 3, 16, 7, 1, 7, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 1, 4, 3, 10, 9, 2, 1, 4, 3, 4, 3, 17, 20, 5, 6, 7, 4, 2, 4, 1, 9, 7, 2, 7, 11, 4, 3, 8, 11, 9, 3, 4, 9, 5, 1, 3, 4, 4, 2, 2, 12, 24, 2, 4, 1, 8, 2, 5, 3, 3, 4, 16, 6, 14, 8, 5, 2, 3, 2, 11, 5, 12, 20, 2, 4, 18, 12, 2, 25, 2, 1, 1, 1, 10, 5, 5, 13, 1, 1, 6, 8, 3, 12, 2, 3, 3, 3, 1, 5, 13, 16, 1, 1, 3, 3, 4, 9,
    2, 4, 5, 23, 3, 5, 9, 9, 8, 4, 2, 1, 1, 1, 3, 1, 1, 3, 2, 1, 1, 2, 1, 4, 6, 4, 1, 4, 2, 10, 12, 4, 2, 2, 4, 10, 6, 1, 6, 4, 6, 5, 1, 3, 4, 3, 19, 13, 10, 4, 10, 4, 1, 2, 3, 2, 8, 10, 1, 1, 3, 2, 9, 11, 2, 22, 6, 2, 15, 2, 2, 1, 1, 1, 1, 9, 1, 3, 1, 3, 3, 11, 2, 1, 1, 2, 1, 3, 8, 2, 4, 2, 3, 5, 4, 1, 1, 2, 2, 3, 1, 3, 7, 3, 2, 8, 6, 18, 11, 4, 4, 4, 4, 8, 1];
  yoreDeyeSeifim: number[] = [14, 11, 1, 7, 3, 4, 1, 1, 1, 3, 4, 2, 6, 6, 3, 12, 3, 20, 8, 4, 5, 2, 6, 20, 3, 2, 1, 24, 1, 2, 4, 8, 11, 10, 10, 17, 7, 5, 25, 6, 10, 9, 6, 10, 2, 6, 5, 12, 5, 3, 4, 7, 5, 5, 13, 10, 21, 12, 2, 3, 33, 4, 2, 21, 14, 10, 6, 15, 21, 6, 3, 4, 6, 1, 3, 6, 1, 1, 3, 6, 9, 5, 10, 17, 3, 10, 11, 2, 4, 4, 8, 9, 1, 9, 7, 5, 3, 9, 7, 4, 9, 4, 7, 3, 14,
    2, 2, 7, 2, 10, 7, 16, 16, 12, 3, 7, 1, 13, 20, 16, 7, 12, 26, 26, 11, 7, 4, 5, 20, 10, 2, 7, 7, 13, 16, 1, 6, 11, 15, 1, 8, 15, 6, 2, 9, 15, 5, 12, 5, 3, 14, 2, 4, 2, 3, 3, 3, 2, 3, 23, 11, 5, 3, 4, 1, 3, 1, 27, 27, 2, 1, 6, 19, 8, 8, 8, 40, 3, 19, 12, 12, 6, 1, 12, 4, 5, 14, 6, 34, 54, 1, 5, 1, 14, 17, 13, 5, 48, 13, 1, 75, 9, 7, 4, 2, 5, 1, 5, 1, 3, 4, 1, 3, 2, 6, 12, 48, 6,
    3, 23, 14, 1, 4, 1, 1, 3, 3, 51, 9, 1, 1, 20, 1, 72, 6, 6, 12, 23, 17, 25, 9, 36, 9, 18, 22, 26, 4, 8, 16, 5, 14, 12, 12, 2, 2, 6, 11, 13, 6, 1, 1, 7, 5, 6, 13, 14, 85, 12, 11, 2, 7, 4, 6, 7, 6, 13, 1, 4, 5, 2, 5, 19, 5, 2, 2, 23, 2, 15, 6, 1, 3, 13, 5, 28, 7, 69, 40, 16, 2, 2, 7, 15, 2, 2, 1, 31, 12, 3, 5, 2, 3, 1, 3, 7, 11, 7, 6, 3, 6, 4, 7, 23, 5, 1, 14, 2, 5, 5, 3, 10, 9,
    146, 1, 14, 48, 10, 3, 1, 2, 5, 39, 6, 1, 2, 20, 8, 1, 3, 3, 4, 1, 2, 4, 7, 1, 1, 1, 2, 3, 2, 1, 5, 6, 7, 7, 2, 4, 6, 3, 1, 1, 6, 2, 9, 11, 11, 4, 3, 13, 5, 25, 6, 5, 2, 5, 3, 1, 2, 2, 8, 7, 3, 3, 4, 6, 3, 3, 2, 1, 14, 2, 7, 12, 10];
  choshenMishpotSeifim: number[] = [6, 1, 4, 1, 5, 1, 12, 5, 8, 4, 6, 20, 7, 8, 5, 5, 12, 6, 3, 1, 1, 3, 1, 1, 5, 4, 2, 26, 3, 14, 4, 2, 18, 35, 14, 2, 22, 1, 17, 2, 4, 15, 29, 11, 23, 38, 2, 1, 10, 1, 7, 2, 1, 5, 2, 7, 2, 5, 1, 12, 16, 1, 2, 1, 24, 42, 38, 2, 6, 6, 23, 45, 20, 7, 25, 3, 11, 8, 14, 2, 32, 13, 4, 5, 7, 9, 39, 33, 6, 16, 9, 14, 18, 9, 6, 6, 30, 11, 8, 3,
    11, 5, 11, 16, 6, 3, 12, 21, 6, 11, 24, 5, 3, 7, 6, 2, 7, 4, 6, 2, 12, 9, 15, 1, 10, 23, 2, 2, 22, 7, 14, 6, 7, 6, 2, 2, 3, 8, 4, 15, 2, 3, 4, 4, 7, 25, 5, 2, 31, 7, 3, 1, 20, 32, 44, 7, 13, 9, 4, 3, 6, 7, 6, 20, 1, 1, 2, 2, 2, 2, 17, 9, 4, 5, 63, 51, 5, 3, 1, 1, 3, 12, 9, 2, 10, 2, 4, 6, 1, 18, 4, 16, 1, 3, 11, 5, 7, 15, 4, 12, 2, 15, 10, 11, 12, 4, 21, 1, 10, 3, 7, 9, 2, 13,
    8, 14, 7, 25, 6, 18, 1, 4, 5, 2, 6, 6, 39, 20, 2, 10, 28, 23, 1, 4, 28, 9, 2, 3, 2, 4, 12, 10, 25, 1, 11, 17, 5, 13, 5, 26, 2, 2, 33, 1, 9, 4, 7, 2, 9, 11, 4, 21, 3, 8, 1, 5, 27, 5, 6, 14, 5, 18, 18, 1, 31, 6, 15, 10, 6, 12, 10, 1, 3, 4, 10, 5, 3, 2, 5, 28, 28, 22, 4, 6, 3, 8, 1, 2, 1, 4, 10, 2, 15, 6, 7, 8, 7, 7, 5, 3, 6, 20, 4, 2, 4, 3, 4, 1, 1, 5, 2, 2, 1, 1, 1, 1, 2, 2, 1, 5,
    3, 6, 8, 4, 3, 4, 20, 9, 11, 8, 10, 1, 2, 4, 2, 19, 1, 8, 5, 1, 1, 1, 4, 6, 3, 10, 3, 12, 12, 10, 8, 13, 11, 9, 2, 4, 6, 1, 11, 7, 9, 3, 3, 6, 9, 1, 1, 9, 4, 4, 1, 1, 5, 4, 2, 4, 1, 16, 20, 12, 12, 1, 4, 6, 1, 10, 2, 5, 5, 4, 2, 1, 3, 2, 3, 5, 4, 2, 4, 38, 7, 5, 3, 2, 3, 1, 7, 18, 3, 44, 14, 2, 4, 11, 5, 1, 10];
  evenHoezerSeifim: number[] = [14, 11, 9, 37, 14, 15, 23, 5, 2, 7, 8, 4, 14, 1, 31, 6, 58, 1, 2, 2, 7, 20, 7, 1, 10, 4, 10, 23, 10, 11, 9, 4, 2, 4, 15, 12, 27, 39, 7, 8, 4, 5, 2, 12, 3, 8, 4, 7, 3, 7, 11, 3, 1, 7, 4, 1, 2, 4, 1, 2, 13, 2, 6, 4, 13, 11, 10, 7, 12, 4, 1, 9, 12, 5, 13, 5, 8, 3, 18, 2, 8, 2, 1, 19, 2, 2, 12, 4, 20, 5, 8, 32, 7, 7, 21, 2, 7, 2, 16, 4, 9, 8, 6,
    7, 2, 10, 3, 4, 2, 17, 18, 10, 12, 10, 6, 11, 19, 11, 11, 8, 2, 5, 9, 23, 50, 3, 7, 34, 22, 9, 4, 3, 10, 5, 7, 5, 4, 18, 11, 69, 19, 23, 7, 10, 5, 3, 2, 7, 4, 1, 12, 1, 24, 22, 13, 10, 6, 7, 8, 9, 5, 8, 8, 5, 9, 6, 9, 56, 57, 20, 10, 16, 17, 7, 14, 8, 5, 22];
  spezhifiSelected1: boolean = true;
  userData: any[] = [];
  specificId: number;
  baseSpecifisUrl = "https://tore20210118023949.azurewebsites.net/api/Specifis/";
  baseSpecifisUrl1 = "https://localhost:44307/api/Specifis/";
  flagSeifSpesifiOnChange: boolean=false;
  listOfSpzhificSeifim: any[];
  chackBoxselectedSeif: any[] = [];

  constructor(public mailService: MailService, public router: Router, public userService: UserService, private http: HttpClient) { }
  ngOnInit() {
    this.mailService.selectedMasechesAndPages = [];
    this.userService.pathRambam = null;
    this.userService.pathSO = null;
    this.userService.pathShas = null;
    this.userService.getAllQuestion().subscribe(
      questionListFromDB => {
        try {
          this.userService.questionList = JSON.parse(questionListFromDB);
        }
        catch (e) {
          questionListFromDB = this.userData;
          console.log(questionListFromDB);
          console.log("zv!");
        }
      });
  }
  selectOption(maseces) {
    this.hide = false;
    this.masecesPerse = JSON.parse(maseces);
    this.selected = this.masecesPerse.numOfPage;
    this.mailService.selectedMaseches = this.masecesPerse.maseces;
    if (this.userService.flagSelectedPage == true) {
      this.spezhifiSelected = true;
    } else {
      this.flagMasechesSelected = true;
      this.flagPageCheckboxes = true;
    }
  }
  PageSelect(page: any) {
    debugger
    this.mailService.selectedpage = page;
    this.userService.currentPath = "מסכת " + this.mailService.selectedMaseches + " דף " + this.mailService.selectedpage;
    this.router.navigate(['/question']);
  }
  SimenSelect(numOfSimonim) {
    this.hideSimen = false;
    this.kindOfSO = numOfSimonim;
  }
  SeifSelect(simen) {
    this.nameSimen = simen;
    this.hideSeif = false;
    this.hideSimen = true;
    this.hideSeifCheckboxes = true;
    this.simenFlag = simen;
    this.i = this.simenList.findIndex(x => x === simen);
    if (this.kindOfSO == 697) {
      this.numOfSeif = this.orachChaimSeifim[this.i];
    }
    if (this.kindOfSO == 403) {
      this.numOfSeif = this.yoreDeyeSeifim[this.i];
    }
    if (this.kindOfSO == 427) {
      this.numOfSeif = this.choshenMishpotSeifim[this.i];
    }
    if (this.kindOfSO == 178) {
      this.numOfSeif = this.evenHoezerSeifim[this.i];
    }
  }
  SeifSpesifiSelect(seif) {
    this.nameSeif = seif;
    if (this.kindOfSO == 697) {
      this.nameSO = "אורח חיים";
    }
    if (this.kindOfSO == 403) {
      this.nameSO = "יורה דעה";
    }
    if (this.kindOfSO == 427) {
      this.nameSO = "חושן משפט";
    }
    if (this.kindOfSO == 178) {
      this.nameSO = "אבן העזר";
    }
    this.userService.currentPath = "שולחן ערוך - " + this.nameSO + ", " + "סימן " + this.simenFlag + " " + "סעיף " + this.nameSeif;
    this.router.navigate(['/question']);
  }
  RambamSelect(num) {
    debugger
    this.AhlocesFlag = num;
    switch (num) {
      case "1": this.hlocesList = this.mado; break;
      case "2": this.hlocesList = this.ahvo; break;
      case "3": this.hlocesList = this.zmanim; break;
      case "4": this.hlocesList = this.noshim; break;
      case "5": this.hlocesList = this.kdushe; break;
      case "6": this.hlocesList = this.ahfloe; break;
      case "7": this.hlocesList = this.zroim; break;
      case "8": this.hlocesList = this.avode; break;
      case "9": this.hlocesList = this.korbonos; break;
      case "11": this.hlocesList = this.tahre; break;
      case "12": this.hlocesList = this.nezikin; break;
      case "13": this.hlocesList = this.kinion; break;
      case "14": this.hlocesList = this.mishpotim; break;
      case "15": this.hlocesList = this.shoiftim; break;
    }
  }
  HalocheSelect(page) {
  }
  lastQuestion(questionId: number) {
    debugger;
    for (let q of this.userService.questionList) {
      if (q.id == questionId) {
        this.userService.currentPath = q.questionPath;
      }
      else {
      }
    }
    this.router.navigate(['/question']);
  }
  // check if the item are selected
  checked(selectedpage) {
    if (this.chackBoxselected.indexOf(selectedpage) != -1) {
      return true;
    }
  }
  checkedSeif(selectedSeif){
    if (this.chackBoxselectedSeif.indexOf(selectedSeif) != -1) {
      return true;
    }
  }
  spezhifiPageSelected() {
    this.userService.flagSelectedPage = true;
    //  this.spezhifiSelected=true;
  }
  SeifSpesifiOnChange(checked, selectedSeif) {
    this.flagSeifSpesifiOnChange = true;
    // this.nameSeif = selectedSeif;
    if (this.kindOfSO == 697) {
      this.nameSO = "אורח חיים";
    }
    if (this.kindOfSO == 403) {
      this.nameSO = "יורה דעה";
    }
    if (this.kindOfSO == 427) {
      this.nameSO = "חושן משפט";
    }
    if (this.kindOfSO == 178) {
      this.nameSO = "אבן העזר";
    }
    if (checked) {debugger
      this.chackBoxselectedSeif.push(selectedSeif);
    } else {
      this.chackBoxselectedSeif.splice(this.chackBoxselectedSeif.indexOf(selectedSeif), 1)
    }
    this.listOfSpzhificSeifim = this.chackBoxselectedSeif;debugger
  }
    // when checkbox change, add/remove the item from the array
    onChange(checked, selectedpage) {
      if (checked) {
        this.chackBoxselected.push(selectedpage);
      } else {
        this.chackBoxselected.splice(this.chackBoxselected.indexOf(selectedpage), 1)
      }
      this.listOfSpzhifiPages = this.chackBoxselected;
    }
  spezhifiPagOk() {
    if (this.flagSeifSpesifiOnChange == true) {
      swal({
        title: "בחרת שולחן ערוך - " + this.nameSO + ", " + "סימן " + this.simenFlag + " " + "סעיפים " + this.listOfSpzhificSeifim,
        text: " ? אתה רוצה להמשיך",
        icon: "info",
        buttons: [' כן', ' לא']
      })
        .then((willDelete) => {
          if (willDelete) {//לא
            this.hideSimen = true;
            this.hideSeif = true;
            this.hideSeifCheckboxes = false;
            this.listOfSpzhificSeifim=[];
          }
          else { //כן
            debugger;
            this.mailService.selectedSOAndSeifim = [];
            for (let seif of this.listOfSpzhificSeifim) {
              this.mailService.selectedSOAndSeifim.push("שולחן ערוך - " + this.nameSO + ", " + "סימן " + this.simenFlag + " " + "סעיף " + seif);
            }

            this.userService.getAllSpecifis().subscribe(
              specifiListFromDB => {
                this.specifisListDB = JSON.parse(specifiListFromDB);
                this.specificId = this.specifisListDB.length + 1; debugger
                this.userService.specifisListSeifim = [];
                for (let seif of this.mailService.selectedSOAndSeifim) {
                  this.userService.specifisListSeifim.push({ "Id": this.specificId, "Email": this.userService.user.Email, "Path": seif });
                  this.specificId++;
                } debugger

                observableFrom(this.userService.specifisListSeifim).pipe(
                  // concatMap(entry => this.http.post(this.baseSpecifisUrl1 + 'PostSpecifi', entry))).
                  concatMap(entry => this.http.post(this.baseSpecifisUrl + 'PostSpecifi', entry))).
                  subscribe(response => {
                    swal(' שאלות מסעיפים אלו ישלחו בעז"ה למייל שלך')
                    this.hideSimen = true;
                    this.hideSeif = true;
                    this.hideSeifCheckboxes = false;
                  }, //do something with responses 
                    error => console.error(error), // so something on error
                    () => console.info("All requests done")); // do something when all requests are done   
              });
          }
        });
    }
    else {
      swal({
        title: "בחרת מסכת " + this.mailService.selectedMaseches + " " + "דפים " + this.listOfSpzhifiPages,
        text: " ?בסדר? אתה רוצה להמשיך",
        icon: "info",
        buttons: [' כן', ' לא']
      })
        .then((willDelete) => {
          if (willDelete) {//לא
            this.hide = true;
            this.flagMasechesSelected = false;
            this.flagPageCheckboxes = false;

          }
          else { //כן
            debugger;
            this.mailService.selectedMasechesAndPages = [];
            for (let page of this.listOfSpzhifiPages) {
              this.mailService.selectedMasechesAndPages.push("מסכת " + this.mailService.selectedMaseches + " דף " + page);
            }

            this.userService.getAllSpecifis().subscribe(
              specifiListFromDB => {
                this.specifisListDB = JSON.parse(specifiListFromDB);
                this.specificId = this.specifisListDB.length + 1; debugger
                this.userService.specifisList = [];
                for (let page of this.mailService.selectedMasechesAndPages) {
                  this.userService.specifisList.push({ "Id": this.specificId, "Email": this.userService.user.Email, "Path": page });
                  this.specificId++;
                } debugger

                observableFrom(this.userService.specifisList).pipe(
                  // concatMap(entry => this.http.post(this.baseSpecifisUrl1 + 'PostSpecifi', entry))).
                  concatMap(entry => this.http.post(this.baseSpecifisUrl + 'PostSpecifi', entry))).
                  subscribe(response => {
                    swal(' שאלות מדפים אלו ישלחו בעז"ה למייל שלך')
                    this.hide = true;
                    this.flagMasechesSelected = false;
                    this.flagPageCheckboxes = false;
                  }, //do something with responses 
                    error => console.error(error), // so something on error
                    () => console.info("All requests done")); // do something when all requests are done );
              });
          }
        });
    }
  }
  back() {
    if (this.userService.flagSelectedPage == true) {
      this.userService.flagSelectedPage = false;
      this.flagMasechesSelected = false;
      this.spezhifiSelected = false;
      this.spezhifiSelected1 = true;
      this.hide = true;
    }
    else {
      this.router.navigate(['/login']);
    }
  }
}
